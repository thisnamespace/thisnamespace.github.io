import type { PageMetrics } from '../../hooks/usePageMetrics';

export interface PageSpeedLabels {
  load: string;
  paint: string;
  shift: string;
  weight: string;
}

export interface PageSpeedProps {
  title: string;
  note: string;
  labels: PageSpeedLabels;
  /** Shown when the browser does not report a metric. */
  unavailable: string;
  /** Shown as the download size when everything came from cache. */
  cached: string;
  metrics: PageMetrics;
}

const formatSeconds = (ms: number): string => `${(ms / 1000).toFixed(ms < 10_000 ? 2 : 1)} s`;
const formatBytes = (bytes: number): string =>
  bytes >= 1_000_000 ? `${(bytes / 1_000_000).toFixed(1)} MB` : `${Math.round(bytes / 1000)} kB`;

/** Live performance numbers for this visit, shown between the site's square brackets. */
const PageSpeed = ({ title, note, labels, unavailable, cached, metrics }: PageSpeedProps) => {
  const missing = metrics.settled ? unavailable : '…';

  const rows: { id: string; label: string; value: string; known: boolean }[] = [
    {
      id: 'load',
      label: labels.load,
      value: metrics.loadMs !== undefined ? formatSeconds(metrics.loadMs) : missing,
      known: metrics.loadMs !== undefined,
    },
    {
      id: 'paint',
      label: labels.paint,
      value: metrics.paintMs !== undefined ? formatSeconds(metrics.paintMs) : missing,
      known: metrics.paintMs !== undefined,
    },
    {
      id: 'shift',
      label: labels.shift,
      value: metrics.layoutShift !== undefined ? metrics.layoutShift.toFixed(2) : missing,
      known: metrics.layoutShift !== undefined,
    },
    {
      id: 'weight',
      label: labels.weight,
      value:
        metrics.transferBytes === undefined
          ? missing
          : metrics.transferBytes === 0
            ? cached
            : formatBytes(metrics.transferBytes),
      known: metrics.transferBytes !== undefined,
    },
  ];

  return (
    <section id="speed" className="speed section--ruled" aria-labelledby="speed-heading">
      <div className="wrap">
        <h2
          id="speed-heading"
          className="reveal"
          style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.6rem)' }}
        >
          {title}
        </h2>
        <p className="lede reveal">{note}</p>

        <dl className="speed__grid reveal" data-testid="page-speed">
          {rows.map((row) => (
            <div key={row.id} data-testid={`metric-${row.id}`}>
              <dt>{row.label}</dt>
              <dd className={row.known ? undefined : 'is-unknown'}>{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default PageSpeed;
