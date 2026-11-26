import { Link as RouterLink, useParams } from 'react-router-dom';
import { Box, Container, Link, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { caseStudies, findCaseStudy } from '../data/content';
import { usePageTitle } from '../hooks/usePageTitle';
import NotFound from './NotFound';
import { fonts } from '../styles/theme';

const CaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();
  const study = findCaseStudy(slug);
  usePageTitle(study ? study.title : 'Page not found');

  if (!study) {
    return <NotFound />;
  }

  const index = caseStudies.findIndex((item) => item.slug === study.slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <Box id="main-content" component="article" sx={{ pt: { xs: 4, md: 6 }, pb: { xs: 8, md: 12 } }}>
      <Container maxWidth="md">
        <Link
          component={RouterLink}
          to={{ pathname: '/', hash: '#work' }}
          underline="hover"
          variant="body2"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.75,
            fontWeight: 600,
            minHeight: 44,
          }}
        >
          <ArrowBack fontSize="small" aria-hidden />
          All work
        </Link>

        <Typography
          variant="body2"
          sx={{ mt: { xs: 3, md: 5 }, color: 'secondary.main', fontWeight: 600 }}
        >
          {study.area}
        </Typography>
        <Typography
          variant="h1"
          sx={{ mt: 1.5, fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', lineHeight: 1.05 }}
        >
          {study.title}
        </Typography>
        <Typography
          sx={{ mt: 3, fontSize: { xs: '1.2rem', md: '1.35rem' }, lineHeight: 1.5 }}
          color="text.secondary"
        >
          {study.summary}
        </Typography>

        <Box sx={{ mt: { xs: 5, md: 7 }, maxWidth: '40em' }}>
          <Typography variant="h2" sx={{ fontSize: '1.6rem' }}>
            The short version
          </Typography>
          {study.overview.map((paragraph) => (
            <Typography key={paragraph} sx={{ mt: 2 }}>
              {paragraph}
            </Typography>
          ))}

          <Typography variant="h2" sx={{ fontSize: '1.6rem', mt: { xs: 5, md: 6 } }}>
            What I did
          </Typography>
          <Box component="ul" sx={{ mt: 2, pl: 2.75, '& li + li': { mt: 1 } }}>
            {study.actions.map((action) => (
              <Typography component="li" key={action}>
                {action}
              </Typography>
            ))}
          </Box>

          <Typography variant="h2" sx={{ fontSize: '1.6rem', mt: { xs: 5, md: 6 } }}>
            What I took from it
          </Typography>
          <Typography sx={{ mt: 2 }}>{study.takeaway}</Typography>
        </Box>

        <Box
          sx={{
            mt: { xs: 6, md: 9 },
            pt: { xs: 4, md: 5 },
            borderTop: 1,
            borderColor: 'divider',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 3,
            justifyContent: 'space-between',
            alignItems: { sm: 'center' },
          }}
        >
          <Box>
            <Typography variant="body2" color="text.secondary">
              Next
            </Typography>
            <Link
              component={RouterLink}
              to={`/work/${next.slug}`}
              underline="hover"
              data-testid="next-case-study"
              sx={{
                fontFamily: fonts.display,
                fontWeight: 620,
                fontSize: '1.3rem',
                lineHeight: 1.25,
              }}
            >
              {next.title}
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CaseStudy;
