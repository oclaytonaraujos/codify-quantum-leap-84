import { Suspense, lazy, ComponentType, useState, useEffect, useRef } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Enhanced lazy loading with preloading
export function createLazyComponent<T = {}>(
  importFn: () => Promise<{ default: ComponentType<T> }>,
  options: {
    preload?: boolean;
    fallback?: React.ReactNode;
    name?: string;
  } = {}
) {
  const Component = lazy(importFn);

  // Preload component on idle
  if (options.preload && 'requestIdleCallback' in window) {
    requestIdleCallback(() => {
      importFn().catch(() => {
        // Silently fail preloading
      });
    });
  }

  const WrappedComponent = (props: T) => (
    <Suspense 
      fallback={
        options.fallback || 
        <ComponentSkeleton name={options.name} />
      }
    >
      <Component {...(props as any)} />
    </Suspense>
  );

  WrappedComponent.displayName = `LazyComponent(${options.name || 'Unknown'})`;
  WrappedComponent.preload = importFn;

  return WrappedComponent;
}

// Smart image loading with intersection observer
interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  onLoad?: () => void;
  onError?: () => void;
}

export const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height, 
  priority = false,
  quality = 85,
  onLoad,
  onError 
}: LazyImageProps) => {
  const imgRef = useIntersectionObserver<HTMLImageElement>({
    triggerOnce: true,
    skip: priority
  });

  return (
    <img
      ref={imgRef.ref}
      src={imgRef.inView || priority ? src : undefined}
      alt={alt}
      className={`transition-opacity duration-300 ${
        imgRef.inView || priority ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      onLoad={onLoad}
      onError={onError}
      style={{
        aspectRatio: width && height ? `${width}/${height}` : undefined
      }}
    />
  );
};

// Custom hook for intersection observer
function useIntersectionObserver<T extends Element>({
  triggerOnce = false,
  threshold = 0.1,
  rootMargin = '50px',
  skip = false
}: {
  triggerOnce?: boolean;
  threshold?: number;
  rootMargin?: string;
  skip?: boolean;
} = {}) {
  const [inView, setInView] = useState(skip);
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const elementRef = useRef<T>(null);

  useEffect(() => {
    if (skip) return;

    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        setEntry(entry);
        
        if (entry.isIntersecting && triggerOnce) {
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, skip]);

  return {
    ref: elementRef,
    inView,
    entry
  };
}

// Resource preloader utility
export class ResourcePreloader {
  private static preloadedResources = new Set<string>();

  static preloadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.preloadedResources.has(src)) {
        resolve();
        return;
      }

      const img = new Image();
      img.onload = () => {
        this.preloadedResources.add(src);
        resolve();
      };
      img.onerror = reject;
      img.src = src;
    });
  }

  static preloadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.preloadedResources.has(src)) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.onload = () => {
        this.preloadedResources.add(src);
        resolve();
      };
      script.onerror = reject;
      script.src = src;
      script.async = true;
      document.head.appendChild(script);
    });
  }

  static preloadCSS(href: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.preloadedResources.has(href)) {
        resolve();
        return;
      }

      const link = document.createElement('link');
      link.onload = () => {
        this.preloadedResources.add(href);
        resolve();
      };
      link.onerror = reject;
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    });
  }

  static preloadFont(family: string, weight = '400', display = 'swap'): Promise<void> {
    return new Promise((resolve, reject) => {
      const fontKey = `${family}-${weight}`;
      if (this.preloadedResources.has(fontKey)) {
        resolve();
        return;
      }

      const link = document.createElement('link');
      link.onload = () => {
        this.preloadedResources.add(fontKey);
        resolve();
      };
      link.onerror = reject;
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      link.href = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}:wght@${weight}&display=${display}`;
      document.head.appendChild(link);
    });
  }
}

// Performance-optimized component skeleton
function ComponentSkeleton({ name }: { name?: string }) {
  return (
    <div className="space-y-4 p-4 animate-pulse">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      {name && (
        <div className="text-xs text-muted-foreground opacity-50">
          Loading {name}...
        </div>
      )}
    </div>
  );
}

// Bundle splitting utilities
export const PageComponents = {
  Home: createLazyComponent(
    () => import('@/pages/Home'),
    { preload: true, name: 'Home' }
  ),
  About: createLazyComponent(
    () => import('@/pages/About'),
    { name: 'About' }
  ),
  Services: createLazyComponent(
    () => import('@/pages/Services'),
    { name: 'Services' }
  ),
  Portfolio: createLazyComponent(
    () => import('@/pages/Portfolio'),
    { name: 'Portfolio' }
  ),
  Blog: createLazyComponent(
    () => import('@/pages/Blog'),
    { name: 'Blog' }
  ),
  Contact: createLazyComponent(
    () => import('@/pages/Contact'),
    { name: 'Contact' }
  ),
  Quote: createLazyComponent(
    () => import('@/pages/Quote'),
    { name: 'Quote' }
  )
};

// Progressive enhancement hook
export function useProgressiveEnhancement() {
  const [isEnhanced, setIsEnhanced] = useState(false);

  useEffect(() => {
    // Wait for initial load before enabling enhancements
    const timer = setTimeout(() => {
      setIsEnhanced(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return isEnhanced;
}
