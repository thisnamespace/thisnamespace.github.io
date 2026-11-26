import { Box, Container, Typography } from '@mui/material';
import type { CraftFocus, TechStep } from '../../types';
import { fonts } from '../../styles/theme';

export interface CraftProps {
  title: string;
  body: string;
  /** Accessible name and visible caption for the technology path. */
  pathLabel: string;
  path: TechStep[];
  focus: CraftFocus[];
}

/** Front-end craft: what Michael cares about, and the technologies that led here. */
const Craft = ({ title, body, pathLabel, path, focus }: CraftProps) => (
  <Box
    component="section"
    id="craft"
    aria-labelledby="craft-heading"
    sx={{
      bgcolor: 'background.paper',
      borderBottom: 1,
      borderColor: 'divider',
      py: { xs: 7, md: 11 },
    }}
  >
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 5fr) minmax(0, 7fr)' },
          columnGap: 10,
          rowGap: 5,
        }}
      >
        <Box>
          <Typography id="craft-heading" variant="h2">
            {title}
          </Typography>
          <Typography sx={{ mt: 2.5, maxWidth: '32em' }}>{body}</Typography>
        </Box>

        <Box sx={{ display: 'grid', rowGap: { xs: 3.5, md: 4 }, alignContent: 'start' }}>
          {focus.map((item) => (
            <Box key={item.id}>
              <Typography variant="h3">{item.title}</Typography>
              <Typography sx={{ mt: 1, maxWidth: '34em' }}>{item.body}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Typography
        id="craft-path-label"
        variant="body2"
        sx={{ mt: { xs: 6, md: 8 }, fontWeight: 600, color: 'secondary.main' }}
      >
        {pathLabel}
      </Typography>
      <Box
        component="ol"
        aria-labelledby="craft-path-label"
        data-testid="tech-path"
        sx={{
          listStyle: 'none',
          m: 0,
          mt: 2.5,
          p: 0,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: `repeat(${path.length}, minmax(0, 1fr))` },
        }}
      >
        {path.map((step) => (
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
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75, maxWidth: '22ch' }}>
              {step.note}
            </Typography>
          </Box>
        ))}
      </Box>
    </Container>
  </Box>
);

export default Craft;
