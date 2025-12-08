import { Box, Container, Typography, Button, Stack, useTheme } from '@mui/material';
import { GitHub, LinkedIn, Email } from '@mui/icons-material';
import Logo from './Logo';
import { useReducedMotion } from '../hooks/useReducedMotion';

const Hero = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const prefersReducedMotion = useReducedMotion();

  return (
    <Box
      sx={{
        minHeight: { xs: '85vh', sm: '90vh' },
        display: 'flex',
        alignItems: 'center',
        background: isDark ? '#0f172a' : '#0e7490',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        px: { xs: 2, sm: 3 },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            minHeight: { xs: '75vh', sm: '80vh' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Spacer for top */}
          <Box sx={{ flex: 1 }} />

          {/* Logo - centered in the space */}
          <Box
            id="hero-logo"
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Logo variant="minimal" width={280} height={280} />
          </Box>

          {/* Title and content */}
          <Box sx={{ flex: 2, textAlign: 'center' }}>
            <Typography
              variant="h1"
              gutterBottom
              sx={{
                fontSize: { xs: '2.25rem', sm: '3rem', md: '3.75rem' },
                fontWeight: 600,
                lineHeight: { xs: 1.15, sm: 1.15 },
                mb: { xs: 2, sm: 3 },
                letterSpacing: '-0.02em',
              }}
            >
              Engineering Leader
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.25rem', sm: '1.75rem', md: '2rem' },
                fontWeight: 500,
                mb: { xs: 2, sm: 3 },
                opacity: 0.95,
                px: { xs: 1, sm: 2 },
                lineHeight: 1.3,
              }}
            >
              Building High-Performing Front End Teams
            </Typography>
            <Typography
              variant="h3"
              component="p"
              sx={{
                mb: { xs: 3, sm: 4 },
                opacity: 0.85,
                fontSize: { xs: '0.95rem', sm: '1.15rem', md: '1.25rem' },
                px: { xs: 2, sm: 3 },
                maxWidth: '900px',
                mx: 'auto',
                lineHeight: 1.6,
                fontWeight: 400,
              }}
            >
              Driving technical strategy and product innovation across enterprise solutions. Proven
              track record in React, TypeScript, and modern web architectures.
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="center"
              sx={{ mb: { xs: 3, sm: 4 }, px: { xs: 2, sm: 0 } }}
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: 'white',
                  color: isDark ? '#06b6d4' : '#0891b2',
                  fontWeight: 600,
                  px: { xs: 3, sm: 4 },
                  py: { xs: 1.25, sm: 1.5 },
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  borderRadius: 1,
                  boxShadow: 'none',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.9)',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                  },
                  transition: prefersReducedMotion ? 'none' : 'all 0.15s ease',
                }}
                onClick={() => {
                  document
                    .querySelector('#projects')
                    ?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
                }}
              >
                View Projects
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  fontWeight: 600,
                  px: { xs: 3, sm: 4 },
                  py: { xs: 1.25, sm: 1.5 },
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  borderRadius: 1,
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                  },
                  transition: prefersReducedMotion ? 'none' : 'all 0.15s ease',
                }}
                onClick={() => {
                  document
                    .querySelector('#contact')
                    ?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
                }}
              >
                Contact Me
              </Button>
            </Stack>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 1.5, sm: 2 }}
              justifyContent="center"
              alignItems="center"
            >
              <Button
                startIcon={<GitHub />}
                sx={{
                  color: 'white',
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  minWidth: { xs: 140, sm: 'auto' },
                }}
                href="https://github.com/thisnamespace"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit thisnamespace GitHub profile"
              >
                GitHub
              </Button>
              <Button
                startIcon={<LinkedIn />}
                sx={{
                  color: 'white',
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  minWidth: { xs: 140, sm: 'auto' },
                }}
                href="https://www.linkedin.com/in/michael-day-0b194246"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect on LinkedIn with Michael Day"
              >
                LinkedIn
              </Button>
              <Button
                startIcon={<Email />}
                sx={{
                  color: 'white',
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  minWidth: { xs: 140, sm: 'auto' },
                }}
                href="mailto:info@thisnamespace.com"
                aria-label="Send email to info@thisnamespace.com"
              >
                Email
              </Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
