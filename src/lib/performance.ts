import { useEffect } from 'react';

export interface PerformanceMetrics {
  ttfb: number;        // Time to First Byte
  fcp: number;         // First Contentful Paint
  lcp: number;         // Largest Contentful Paint
  fid: number;         // First Input Delay
  cls: number;         // Cumulative Layout Shift
  navigationTime: number;
  resourceTime: number;
}

interface LayoutShift extends PerformanceEntry {
  hadRecentInput: boolean;
  value: number;
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number[]>;
  private listeners: Set<(metrics: PerformanceMetrics) => void>;

  private constructor() {
    this.metrics = new Map();
    this.listeners = new Set();
    this.initializeObservers();
  }

  public static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  private initializeObservers(): void {
    if (typeof window === 'undefined') return;

    // Observe LCP
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      if (entries.length > 0) {
        const lcp = entries[entries.length - 1];
        this.recordMetric('lcp', lcp.startTime);
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // Observe FID
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        if (entry instanceof PerformanceEventTiming) {
          this.recordMetric('fid', entry.processingStart - entry.startTime);
        }
      });
    }).observe({ entryTypes: ['first-input'] });

    // Observe CLS
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        if (!(entry as LayoutShift).hadRecentInput) {
          clsValue += (entry as LayoutShift).value;
          this.recordMetric('cls', clsValue);
        }
      });
    }).observe({ entryTypes: ['layout-shift'] });

    // Navigation Timing
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          this.recordMetric('ttfb', navigation.responseStart - navigation.requestStart);
          this.recordMetric('navigationTime', navigation.loadEventEnd - navigation.fetchStart);
        }

        // Resource Timing
        const resources = performance.getEntriesByType('resource');
        const totalResourceTime = resources.reduce((total, resource) => {
          return total + ((resource as PerformanceResourceTiming).responseEnd - resource.startTime);
        }, 0);
        this.recordMetric('resourceTime', totalResourceTime);
      }, 0);
    });
  }

  private recordMetric(name: string, value: number): void {
    const values = this.metrics.get(name) || [];
    values.push(value);
    this.metrics.set(name, values);
    this.notifyListeners();
  }

  private notifyListeners(): void {
    const metrics = this.getAverageMetrics();
    this.listeners.forEach(listener => listener(metrics));
  }

  public getAverageMetrics(): PerformanceMetrics {
    return {
      ttfb: this.getAverageValue('ttfb'),
      fcp: this.getAverageValue('fcp'),
      lcp: this.getAverageValue('lcp'),
      fid: this.getAverageValue('fid'),
      cls: this.getAverageValue('cls'),
      navigationTime: this.getAverageValue('navigationTime'),
      resourceTime: this.getAverageValue('resourceTime'),
    };
  }

  private getAverageValue(metricName: string): number {
    const values = this.metrics.get(metricName) || [];
    if (values.length === 0) return 0;
    return values.reduce((a, b) => a + b, 0) / values.length;
  }

  public addListener(callback: (metrics: PerformanceMetrics) => void): void {
    this.listeners.add(callback);
  }

  public removeListener(callback: (metrics: PerformanceMetrics) => void): void {
    this.listeners.delete(callback);
  }

  public clearMetrics(): void {
    this.metrics.clear();
  }
}

// Hook to use performance monitoring in components
export function usePerformanceMonitoring(callback: (metrics: PerformanceMetrics) => void): PerformanceMetrics | undefined {
  if (typeof window === 'undefined') return;

  const monitor = PerformanceMonitor.getInstance();
  
  useEffect(() => {
    monitor.addListener(callback);
    return () => monitor.removeListener(callback);
  }, [callback]);

  return monitor.getAverageMetrics();
}