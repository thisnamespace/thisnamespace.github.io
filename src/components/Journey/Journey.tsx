import { Box, Container, Typography } from '@mui/material';
import type { TechPath } from '../../types';
import { fonts } from '../../styles/theme';

export interface JourneyProps {
  title: string;
  body: string;
  /** Sequences shown as timelines, for example technologies and kinds of product. */
  paths: TechPath[];
}

/** How the work has changed over time, shown as one timeline per path. */
const Journey = ({ title, body, paths }: JourneyProps) => (
  <Box
    component="section"
    id="journey"
    aria-labelledby="journey-heading"
    sx={{ py: { xs: 7, md: 11 } }}
  >
    <Container maxWidth="lg">
      <Typography id="journey-heading" variant="h2">
        {title}
      </Typography>
      <Typography sx={{ mt: 1.5, maxWidth: '38em' }} color="text.secondary">
        {body}
      </Typography>

      {paths.map((path, index) => (
        <Box key={path.id} sx={{ mt: index === 0 ? { xs: 5, md: 7 } : { xs: 5, md: 6 } }}>
          <Typography
            id={`journey-path-${path.id}`}
            variant="body2"
            sx={{ fontWeight: 600, color: 'secondary.main' }}
          >
            {path.label}
          </Typography>
          <Box
            component="ol"
            aria-labelledby={`journey-path-${path.id}`}
            data-testid={`path-${path.id}`}
            sx={{
              listStyle: 'none',
              m: 0,
              mt: 2.5,
              p: 0,
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: `repeat(${path.steps.length}, minmax(0, 1fr))`,
              },
            }}
          >
            {path.steps.map((step) => (
              <Box
                component="li"
                key={step.id}
                sx={{
                  position: 'relative',
                  // Desktop: a rail across the top with a dot per step. Mobile: the rail runs down the left.
                  pt: { xs: 0, md: 3.5 },
                  pl: { xs: 3.5, md: 0 },
                  pr: { md: 4 },
                  pb: { xs: 3, md: 0 },
                  borderTop: { xs: 'none', md: '2px solid' },
                  borderLeft: { xs: '2px solid', md: 'none' },
                  borderColor: { xs: 'divider', md: 'divider' },
                  '&:last-of-type': { pb: 0 },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    top: { xs: '0.55em', md: -7 },
                    left: { xs: -7, md: 0 },
                  },
                }}
              >
                <Typography
                  component="p"
                  sx={{
                    fontFamily: fonts.display,
                    fontWeight: 650,
                    fontSize: { xs: '1.5rem', md: '1.75rem' },
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {step.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.75, maxWidth: '26ch' }}
                >
                  {step.note}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Container>
  </Box>
);

export default Journey;
