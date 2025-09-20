import { useEffect } from 'react';
import { analytics } from './Analytics';

// Pre-load critical resources
const preloadCriticalResources = () => {
  // Preload fonts
  const fontPreload = document.createElement('link');
  fontPreload.rel = 'preload';
  fontPreload.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap';
  fontPreload.as = 'style';
  fontPreload.onload = () => {
    fontPreload.rel = 'stylesheet';
  };
  document.head.appendChild(fontPreload);

  // Preload critical images
  const heroImagePreload = document.createElement('link');
  heroImagePreload.rel = 'preload';
  heroImagePreload.href = '/hero-background.webp';
  heroImagePreload.as = 'image';
  document.head.appendChild(heroImagePreload);

  // DNS prefetch for external resources
  const dnsPrefetches = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://api.codify.dev.br'
  ];

  dnsPrefetches.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  });
};

// Optimize images with lazy loading and WebP support
const optimizeImages = () => {
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          
          // Check WebP support
          const supportsWebP = (() => {
            const canvas = document.createElement('canvas');
            return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
          })();

          const originalSrc = img.dataset.src;
          if (originalSrc && supportsWebP && !originalSrc.endsWith('.webp')) {
            // Try to load WebP version first
            const webpSrc = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
            const webpImage = new Image();
            
            webpImage.onload = () => {
              img.src = webpSrc;
              img.classList.add('loaded');
            };
            
            webpImage.onerror = () => {
              img.src = originalSrc;
              img.classList.add('loaded');
            };
            
            webpImage.src = webpSrc;
          } else {
            img.src = originalSrc || '';
            img.classList.add('loaded');
          }
          
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px'
    });

    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for browsers without IntersectionObserver
    images.forEach(img => {
      const element = img as HTMLImageElement;
      element.src = element.dataset.src || '';
    });
  }
};

// Add critical CSS inlining
const inlineCriticalCSS = () => {
  const criticalCSS = `
    /* Critical CSS for above-the-fold content */
    body { 
      font-family: 'Space Grotesk', sans-serif; 
      background: hsl(240 10% 6%); 
      color: hsl(0 0% 98%); 
    }
    .hero-section { 
      min-height: 100vh; 
      display: flex; 
      align-items: center; 
      justify-content: center; 
    }
    .cyber-text {
      background: linear-gradient(45deg, hsl(262 100% 65%), hsl(183 100% 50%));
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
    }
  `;

  const style = document.createElement('style');
  style.innerHTML = criticalCSS;
  document.head.appendChild(style);
};

// Service Worker registration for caching
const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('SW registered: ', registration);
        
        analytics.track('service_worker_registered', {
          scope: registration.scope
        });
      } catch (registrationError) {
        console.log('SW registration failed: ', registrationError);
        
        analytics.track('service_worker_failed', {
          error: registrationError.toString()
        });
      }
    });
  }
};

// Resource hints optimization
const addResourceHints = () => {
  // Preconnect to critical third-party origins
  const preconnects = [
    { href: 'https://fonts.googleapis.com', crossorigin: 'anonymous' },
    { href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' }
  ];

  preconnects.forEach(({ href, crossorigin }) => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = href;
    if (crossorigin) link.crossOrigin = crossorigin;
    document.head.appendChild(link);
  });

  // Prefetch next pages
  const prefetchPages = ['/sobre', '/servicos', '/portfolio'];
  
  prefetchPages.forEach(page => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = page;
    document.head.appendChild(link);
  });
};

// Critical rendering path optimization
const optimizeCriticalRenderingPath = () => {
  // Remove render-blocking resources
  const nonCriticalCSS = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])');
  
  nonCriticalCSS.forEach(link => {
    const newLink = link.cloneNode(true) as HTMLLinkElement;
    newLink.rel = 'preload';
    newLink.as = 'style';
    newLink.onload = () => {
      newLink.rel = 'stylesheet';
    };
    
    link.parentNode?.insertBefore(newLink, link);
    link.remove();
  });
};

// Core Web Vitals optimization
const optimizeWebVitals = () => {
  // LCP optimization
  const lcpElements = document.querySelectorAll('img, video, [data-lcp]');
  lcpElements.forEach(element => {
    if (element.tagName === 'IMG') {
      (element as HTMLImageElement).loading = 'eager';
      (element as HTMLImageElement).fetchPriority = 'high';
    }
  });

  // CLS optimization - reserve space for dynamic content
  const dynamicElements = document.querySelectorAll('[data-dynamic]');
  dynamicElements.forEach(element => {
    const htmlElement = element as HTMLElement;
    if (!htmlElement.style.minHeight) {
      htmlElement.style.minHeight = '200px'; // Reserve space
    }
  });

  // FID optimization - delay non-critical JavaScript
  const nonCriticalScripts = document.querySelectorAll('script[data-non-critical]');
  
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      nonCriticalScripts.forEach(script => {
        const newScript = document.createElement('script');
        newScript.src = (script as HTMLScriptElement).src;
        newScript.async = true;
        document.body.appendChild(newScript);
      });
    });
  }
};

// Performance budget monitoring
const monitorPerformanceBudget = () => {
  const performanceBudget = {
    lcp: 2500, // 2.5s
    fid: 100,  // 100ms
    cls: 0.1,  // 0.1
    loadTime: 3000 // 3s
  };

  // Monitor and alert if budgets are exceeded
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.entryType === 'largest-contentful-paint') {
        if (entry.startTime > performanceBudget.lcp) {
          analytics.track('performance_budget_exceeded', {
            metric: 'lcp',
            value: entry.startTime,
            budget: performanceBudget.lcp
          });
        }
      }
    });
  });

  try {
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
  } catch (e) {
    console.warn('Performance observer not supported');
  }
};

const SEOOptimizer = () => {
  useEffect(() => {
    // Initialize all optimizations
    preloadCriticalResources();
    inlineCriticalCSS();
    optimizeImages();
    registerServiceWorker();
    addResourceHints();
    optimizeCriticalRenderingPath();
    optimizeWebVitals();
    monitorPerformanceBudget();

    // Track SEO optimization completion
    analytics.track('seo_optimization_complete', {
      timestamp: Date.now(),
      features: [
        'critical_resources_preloaded',
        'images_optimized',
        'service_worker_registered',
        'resource_hints_added',
        'web_vitals_optimized'
      ]
    });
  }, []);

  return null;
};

export default SEOOptimizer;