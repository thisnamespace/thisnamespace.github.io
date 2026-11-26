import { Box, Container, Typography } from '@mui/material';
import type { PageMetrics } from '../../hooks/usePageMetrics';
import { fonts } from '../../styles/theme';

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

const bracket = (side: 'left' | 'right') => ({
  content: '""',
  position: 'absolute' as const,
  top: 0,
  bottom: 0,
  [side]: 0,
  width: 16,
  border: '3px solid',
  borderColor: 'primary.main',
  [side === 'left' ? 'borderRight' : 'borderLeft']: 'none',
  borderRadius: side === 'left' ? '4px 0 0 4px' : '0 4px 4px 0',
  pointerEvents: 'none' as const,
});

/** Live performance numbers for this visit, shown between the site's square brackets. */
const PageSpeed = ({ title, note, labels, unavailable, cached, metrics }: PageSpeedProps) => {
  const pending = '…';
  const missing = metrics.settled ? unavailable : pending;

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
    <Box
      component="section"
      id="speed"
      aria-labelledby="speed-heading"
      sx={{ borderBottom: 1, borderColor: 'divider', py: { xs: 6, md: 8 } }}
    >
      <Container maxWidth="lg">
        <Typography id="speed-heading" variant="h3" component="h2">
          {title}
        </Typography>
        <Typography
          sx={{ mt: 1.5, maxWidth: '40em', fontSize: '1.0625rem' }}
          color="text.secondary"
        >
          {note}
        </Typography>

        <Box
          component="dl"
          data-testid="page-speed"
          sx={{
            position: 'relative',
            m: 0,
            mt: { xs: 3.5, md: 4.5 },
            px: { xs: 4, md: 5 },
            py: { xs: 2.5, md: 3 },
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, minmax(0, 1fr))',
              md: 'repeat(4, minmax(0, 1fr))',
            },
            columnGap: 3,
            rowGap: 3,
            '&::before': bracket('left'),
            '&::after': bracket('right'),
          }}
        >
          {rows.map((row) => (
            <Box key={row.id} data-testid={`metric-${row.id}`}>
              <Typography component="dt" variant="body2" color="text.secondary">
                {row.label}
              </Typography>
              <Typography
                component="dd"
                sx={{
                  m: 0,
                  mt: 0.25,
                  fontFamily: fonts.display,
                  fontWeight: 650,
                  fontSize: row.known ? { xs: '1.6rem', md: '2rem' } : '1rem',
                  lineHeight: row.known ? 1.15 : 1.5,
                  letterSpacing: row.known ? '-0.02em' : 0,
                  fontVariantNumeric: 'tabular-nums',
                  color: row.known ? 'text.primary' : 'text.secondary',
                }}
              >
                {row.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default PageSpeed;
