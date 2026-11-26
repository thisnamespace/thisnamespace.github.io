import { useEffect, useState } from 'react';

export interface PageMetrics {
  /** Time until the load event finished, in milliseconds. */
  loadMs?: number;
  /** Largest Contentful Paint, in milliseconds. */
  paintMs?: number;
  /** Cumulative Layout Shift score. */
  layoutShift?: number;
  /** Bytes transferred for the page and its resources. Zero means served from cache. */
  transferBytes?: number;
  /** True once the browser has had the chance to report everything it supports. */
  settled: boolean;
}

interface LayoutShiftEntry extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

const supports = (type: string): boolean =>
  typeof PerformanceObserver !== 'undefined' &&
  (PerformanceObserver.supportedEntryTypes ?? []).includes(type);

/**
 * Reads real performance numbers for the current visit from the browser:
 * load time, largest paint, layout shift and download size.
 * Values the browser does not report stay undefined.
 */
export const usePageMetrics = (): PageMetrics => {
  // Starts empty so the first render matches the pre-built HTML, which has no numbers yet.
  const [metrics, setMetrics] = useState<PageMetrics>({ settled: false });

  useEffect(() => {
    if (typeof performance === 'undefined') {
      return;
    }
    const observers: PerformanceObserver[] = [];
    let settleTimer: number | undefined;

    const readNavigation = () => {
      const [navigation] = performance.getEntriesByType(
        'navigation'
      ) as PerformanceNavigationTiming[];
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      const transferBytes = [navigation, ...resources].reduce(
        (total, entry) => total + (entry?.transferSize ?? 0),
        0
      );
      setMetrics((current) => ({
        ...current,
        loadMs: navigation && navigation.loadEventEnd > 0 ? navigation.loadEventEnd : undefined,
        transferBytes,
        // Chromium reports "no shift" by sending no entries, so absence means zero there.
        layoutShift: current.layoutShift ?? (supports('layout-shift') ? 0 : undefined),
      }));
    };

    if (supports('largest-contentful-paint')) {
      const paintObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const last = entries[entries.length - 1];
        if (last) {
          setMetrics((current) => ({ ...current, paintMs: last.startTime }));
        }
      });
      paintObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      observers.push(paintObserver);
    }

    if (supports('layout-shift')) {
      let total = 0;
      const shiftObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as LayoutShiftEntry[]) {
          if (!entry.hadRecentInput) {
            total += entry.value;
          }
        }
        setMetrics((current) => ({ ...current, layoutShift: total }));
      });
      shiftObserver.observe({ type: 'layout-shift', buffered: true });
      observers.push(shiftObserver);
    }

    const handleLoaded = () => {
      // loadEventEnd is only filled in after the load handlers return.
      settleTimer = window.setTimeout(() => {
        readNavigation();
        setMetrics((current) => ({ ...current, settled: true }));
      }, 0);
    };

    if (document.readyState === 'complete') {
      handleLoaded();
    } else {
      window.addEventListener('load', handleLoaded, { once: true });
    }

    return () => {
      observers.forEach((observer) => observer.disconnect());
      window.removeEventListener('load', handleLoaded);
      window.clearTimeout(settleTimer);
    };
  }, []);

  return metrics;
};
