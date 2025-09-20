import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface AnalyticsEvent {
  event: string;
  page?: string;
  timestamp: number;
  user_agent: string;
  referrer: string;
  session_id: string;
  metadata?: Record<string, any>;
}

class Analytics {
  private sessionId: string;
  private events: AnalyticsEvent[] = [];

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initializeAnalytics();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private initializeAnalytics() {
    // Track page load time
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      this.track('page_load_complete', {
        load_time: Math.round(loadTime),
        timing: performance.getEntriesByType('navigation')[0]
      });
    });

    // Track user engagement
    this.trackEngagement();
    
    // Track errors
    this.trackErrors();
  }

  private trackEngagement() {
    let scrollDepth = 0;
    let maxScrollDepth = 0;
    let timeOnPage = 0;
    const startTime = Date.now();

    // Scroll tracking
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      scrollDepth = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);
      maxScrollDepth = Math.max(maxScrollDepth, scrollDepth);
    };

    // Time on page tracking
    const handleBeforeUnload = () => {
      timeOnPage = Math.round((Date.now() - startTime) / 1000);
      this.track('page_engagement', {
        time_on_page: timeOnPage,
        max_scroll_depth: maxScrollDepth,
        interactions: this.events.filter(e => e.event.includes('click')).length
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);
  }

  private trackErrors() {
    window.addEventListener('error', (error) => {
      this.track('javascript_error', {
        message: error.message,
        filename: error.filename,
        line: error.lineno,
        column: error.colno,
        stack: error.error?.stack
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.track('promise_rejection', {
        reason: event.reason?.toString(),
        stack: event.reason?.stack
      });
    });
  }

  track(event: string, metadata?: Record<string, any>) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      page: window.location.pathname,
      timestamp: Date.now(),
      user_agent: navigator.userAgent,
      referrer: document.referrer,
      session_id: this.sessionId,
      metadata
    };

    this.events.push(analyticsEvent);
    this.sendEvent(analyticsEvent);
  }

  private async sendEvent(event: AnalyticsEvent) {
    try {
      // Send to your analytics endpoint
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
    } catch (error) {
      // Fallback to localStorage for offline tracking
      const storedEvents = JSON.parse(localStorage.getItem('analytics_events') || '[]');
      storedEvents.push(event);
      localStorage.setItem('analytics_events', JSON.stringify(storedEvents.slice(-100))); // Keep last 100 events
    }
  }

  // Performance metrics
  trackPerformance(name: string, duration: number) {
    this.track('performance_metric', {
      metric_name: name,
      duration,
      memory_usage: (performance as any).memory ? {
        used: (performance as any).memory.usedJSHeapSize,
        total: (performance as any).memory.totalJSHeapSize,
        limit: (performance as any).memory.jsHeapSizeLimit
      } : null
    });
  }

  // Business metrics
  trackConversion(type: string, value?: number) {
    this.track('conversion', {
      conversion_type: type,
      value,
      page: window.location.pathname
    });
  }

  // User interactions
  trackClick(element: string, metadata?: Record<string, any>) {
    this.track('click', {
      element,
      ...metadata
    });
  }

  trackFormSubmission(formName: string, success: boolean) {
    this.track('form_submission', {
      form_name: formName,
      success,
      page: window.location.pathname
    });
  }
}

// Global analytics instance
export const analytics = new Analytics();

// React component for page view tracking
const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page views
    analytics.track('page_view', {
      page: location.pathname,
      search: location.search,
      hash: location.hash
    });

    // Track performance metrics for this page
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'largest-contentful-paint') {
          analytics.trackPerformance('lcp', entry.startTime);
        }
        if (entry.entryType === 'first-input') {
          analytics.trackPerformance('fid', (entry as any).processingStart - entry.startTime);
        }
        if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
          analytics.trackPerformance('cls', (entry as any).value);
        }
      });
    });

    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });

    return () => {
      observer.disconnect();
    };
  }, [location]);

  return null;
};

export default AnalyticsTracker;