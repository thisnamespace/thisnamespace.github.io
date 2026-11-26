import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../contexts/ThemeContext';
import PageSpeed from './PageSpeed';
import type { PageMetrics } from '../../hooks/usePageMetrics';
import { pageSpeed } from '../../data/content';

const renderWith = (metrics: PageMetrics) =>
  render(
    <ThemeProvider>
      <PageSpeed
        title={pageSpeed.title}
        note={pageSpeed.note}
        labels={pageSpeed.labels}
        unavailable={pageSpeed.unavailable}
        cached={pageSpeed.cached}
        metrics={metrics}
      />
    </ThemeProvider>
  );

describe('PageSpeed', () => {
  it('formats the reported metrics', () => {
    renderWith({
      loadMs: 640,
      paintMs: 1234,
      layoutShift: 0.014,
      transferBytes: 214_400,
      settled: true,
    });

    expect(screen.getByTestId('metric-load')).toHaveTextContent('0.64 s');
    expect(screen.getByTestId('metric-paint')).toHaveTextContent('1.23 s');
    expect(screen.getByTestId('metric-shift')).toHaveTextContent('0.01');
    expect(screen.getByTestId('metric-weight')).toHaveTextContent('214 kB');
  });

  it('shows a pending mark until the page has settled', () => {
    renderWith({ settled: false });

    expect(screen.getByTestId('metric-load')).toHaveTextContent('…');
  });

  it('says so when the browser does not report a metric', () => {
    renderWith({ loadMs: 900, settled: true });

    expect(screen.getByTestId('metric-paint')).toHaveTextContent(pageSpeed.unavailable);
  });

  it('labels a fully cached visit instead of showing zero', () => {
    renderWith({ loadMs: 120, transferBytes: 0, settled: true });

    expect(screen.getByTestId('metric-weight')).toHaveTextContent(pageSpeed.cached);
  });

  it('switches to megabytes for heavy pages', () => {
    renderWith({ transferBytes: 1_250_000, settled: true });

    expect(screen.getByTestId('metric-weight')).toHaveTextContent('1.3 MB');
  });
});
