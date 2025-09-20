import { useEffect, useState } from 'react';
import { analytics } from './Analytics';

interface PerformanceMetrics {
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  fcp?: number; // First Contentful Paint
  ttfb?: number; // Time to First Byte
  loadTime?: number;
  memoryUsage?: {
    used: number;
    total: number;
    limit: number;
  };
}

const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});

  useEffect(() => {
    // Core Web Vitals monitoring
    const observeWebVitals = () => {
      // LCP Observer
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        const lcp = lastEntry.startTime;
        
        setMetrics(prev => ({ ...prev, lcp }));
        analytics.trackPerformance('lcp', lcp);
        
        // Disconnect after getting the value
        lcpObserver.disconnect();
      });

      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.warn('LCP observer not supported');
      }

      // FID Observer
      const fidObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          const fid = (entry as any).processingStart - entry.startTime;
          setMetrics(prev => ({ ...prev, fid }));
          analytics.trackPerformance('fid', fid);
        });
      });

      try {
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        console.warn('FID observer not supported');
      }

      // CLS Observer
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
            setMetrics(prev => ({ ...prev, cls: clsValue }));
            analytics.trackPerformance('cls', clsValue);
          }
        });
      });

      try {
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.warn('CLS observer not supported');
      }

      // FCP Observer
      const fcpObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          const fcp = entry.startTime;
          setMetrics(prev => ({ ...prev, fcp }));
          analytics.trackPerformance('fcp', fcp);
        });
        fcpObserver.disconnect();
      });

      try {
        fcpObserver.observe({ entryTypes: ['paint'] });
      } catch (e) {
        console.warn('FCP observer not supported');
      }

      return () => {
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
        fcpObserver.disconnect();
      };
    };

    // Navigation timing
    const trackNavigationTiming = () => {
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (navigation) {
          const ttfb = navigation.responseStart - navigation.fetchStart;
          const loadTime = navigation.loadEventEnd - navigation.fetchStart;
          
          setMetrics(prev => ({ ...prev, ttfb, loadTime }));
          analytics.trackPerformance('ttfb', ttfb);
          analytics.trackPerformance('load_time', loadTime);
        }
      });
    };

    // Memory usage monitoring
    const trackMemoryUsage = () => {
      if ('memory' in performance) {
        const memoryInfo = (performance as any).memory;
        const memoryUsage = {
          used: memoryInfo.usedJSHeapSize,
          total: memoryInfo.totalJSHeapSize,
          limit: memoryInfo.jsHeapSizeLimit
        };
        
        setMetrics(prev => ({ ...prev, memoryUsage }));
        analytics.trackPerformance('memory_usage', memoryUsage.used);
      }
    };

    // Resource timing monitoring
    const trackResourceTiming = () => {
      window.addEventListener('load', () => {
        const resources = performance.getEntriesByType('resource');
        
        // Track slow resources
        resources.forEach((resource) => {
          const duration = resource.duration;
          if (duration > 1000) { // Resources taking more than 1s
            analytics.track('slow_resource', {
              name: resource.name,
              duration,
              type: (resource as any).initiatorType
            });
          }
        });

        // Track total resource size and count
        const totalSize = resources.reduce((sum, resource) => 
          sum + ((resource as any).transferSize || 0), 0
        );
        
        analytics.track('resource_stats', {
          total_resources: resources.length,
          total_size: totalSize,
          avg_duration: resources.reduce((sum, r) => sum + r.duration, 0) / resources.length
        });
      });
    };

    // Error monitoring
    const trackErrors = () => {
      window.addEventListener('error', (event) => {
        analytics.track('javascript_error', {
          message: event.message,
          filename: event.filename,
          line: event.lineno,
          column: event.colno,
          stack: event.error?.stack,
          timestamp: Date.now()
        });
      });

      window.addEventListener('unhandledrejection', (event) => {
        analytics.track('promise_rejection', {
          reason: event.reason?.toString(),
          stack: event.reason?.stack,
          timestamp: Date.now()
        });
      });
    };

    // User engagement tracking
    const trackEngagement = () => {
      let startTime = Date.now();
      let isVisible = true;
      let maxScrollDepth = 0;

      // Visibility API
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          isVisible = false;
          analytics.track('page_hidden', {
            time_visible: Date.now() - startTime,
            scroll_depth: maxScrollDepth
          });
        } else {
          isVisible = true;
          startTime = Date.now();
        }
      });

      // Scroll depth tracking
      const trackScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const scrollDepth = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);
        
        maxScrollDepth = Math.max(maxScrollDepth, scrollDepth);
      };

      window.addEventListener('scroll', trackScroll, { passive: true });

      // Rage clicks detection
      let clickCount = 0;
      let clickTimer: NodeJS.Timeout;
      
      document.addEventListener('click', (event) => {
        clickCount++;
        
        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => {
          if (clickCount >= 3) {
            analytics.track('rage_clicks', {
              element: (event.target as Element)?.tagName || 'unknown',
              click_count: clickCount,
              timestamp: Date.now()
            });
          }
          clickCount = 0;
        }, 1000);
      });
    };

    // Initialize all monitoring
    const cleanup = observeWebVitals();
    trackNavigationTiming();
    trackMemoryUsage();
    trackResourceTiming();
    trackErrors();
    trackEngagement();

    // Periodic memory monitoring
    const memoryInterval = setInterval(trackMemoryUsage, 30000); // Every 30 seconds

    return () => {
      cleanup?.();
      clearInterval(memoryInterval);
    };
  }, []);

  // Development mode performance warning
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const now = performance.now();
      if (now > 3000) { // More than 3 seconds
        console.warn(`🐌 Slow page load detected: ${Math.round(now)}ms`);
      }
    }
  }, []);

  return null;
};

export default PerformanceMonitor;