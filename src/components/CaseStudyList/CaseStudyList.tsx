import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import type { CaseStudy } from '../../types';

export interface CaseStudyListProps {
  studies: CaseStudy[];
}

const CaseStudyList = ({ studies }: CaseStudyListProps) => (
  <Box component="section" id="work" aria-labelledby="work-heading" sx={{ py: { xs: 7, md: 11 } }}>
    <Container maxWidth="lg">
      <Typography id="work-heading" variant="h2">
        Work
      </Typography>
      <Typography sx={{ mt: 1.5, maxWidth: '38em' }} color="text.secondary">
        Four pieces of work that show how I lead: what the situation was, what I did, and what I
        took from it.
      </Typography>

      <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, mt: { xs: 4, md: 6 } }}>
        {studies.map((study) => (
          <Box component="li" key={study.slug} sx={{ borderTop: 1, borderColor: 'divider' }}>
            <Box
              component={RouterLink}
              to={`/work/${study.slug}`}
              data-testid={`case-study-link-${study.slug}`}
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 3fr) minmax(0, 8fr) auto' },
                columnGap: 5,
                rowGap: 1,
                alignItems: 'baseline',
                py: { xs: 3, md: 4 },
                color: 'text.primary',
                textDecoration: 'none',
                '&:hover h3, &:focus-visible h3': {
                  color: 'primary.main',
                  textDecoration: 'underline',
                  textDecorationThickness: '2px',
                  textUnderlineOffset: '5px',
                },
              }}
            >
              <Typography variant="body2" sx={{ color: 'secondary.main', fontWeight: 600 }}>
                {study.area}
              </Typography>
              <Box>
                <Typography variant="h3">{study.title}</Typography>
                <Typography
                  sx={{ mt: 1, maxWidth: '36em', fontSize: '1.0625rem' }}
                  color="text.secondary"
                >
                  {study.summary}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                aria-hidden
                sx={{
                  display: { xs: 'none', md: 'block' },
                  fontWeight: 600,
                  color: 'primary.main',
                }}
              >
                Read
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  </Box>
);

export default CaseStudyList;
