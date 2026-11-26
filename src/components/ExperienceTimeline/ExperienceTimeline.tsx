import { Box, Container, Link, Typography } from '@mui/material';
import type { ExperienceEntry } from '../../types';

export interface ExperienceTimelineProps {
  entries: ExperienceEntry[];
  linkedinUrl: string;
}

const ExperienceTimeline = ({ entries, linkedinUrl }: ExperienceTimelineProps) => (
  <Box
    component="section"
    id="experience"
    aria-labelledby="experience-heading"
    sx={{
      bgcolor: 'background.paper',
      borderTop: 1,
      borderColor: 'divider',
      py: { xs: 7, md: 11 },
    }}
  >
    <Container maxWidth="lg">
      <Typography id="experience-heading" variant="h2">
        Experience
      </Typography>

      <Box component="ol" reversed sx={{ listStyle: 'none', m: 0, p: 0, mt: { xs: 3, md: 5 } }}>
        {entries.map((entry) => (
          <Box
            component="li"
            key={entry.id}
            data-testid="experience-entry"
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 3fr) minmax(0, 9fr)' },
              columnGap: 5,
              rowGap: 0.5,
              py: { xs: 2.5, md: 3 },
              borderTop: 1,
              borderColor: 'divider',
            }}
          >
            <Typography variant="body2" color="text.secondary" sx={{ pt: { md: 0.5 } }}>
              {entry.period}
            </Typography>
            <Box>
              <Typography variant="h4" component="h3">
                {entry.title}, {entry.company}
              </Typography>
              <Typography
                sx={{ mt: 0.5, fontSize: '1.0625rem', maxWidth: '38em' }}
                color="text.secondary"
              >
                {entry.note}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Typography variant="body2" sx={{ mt: 3 }}>
        The full history is on{' '}
        <Link href={linkedinUrl} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </Link>
        .
      </Typography>
    </Container>
  </Box>
);

export default ExperienceTimeline;
