import { Box, Container, Typography, Stack, IconButton, useTheme } from '@mui/material';
import { GitHub, LinkedIn, Email } from '@mui/icons-material';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 3, sm: 4 },
        px: { xs: 2, sm: 3 },
        bgcolor: isDark ? '#0f172a' : 'primary.main',
        color: 'white',
        mt: 'auto',
        borderTop: `1px solid ${isDark ? '#334155' : 'rgba(255,255,255,0.1)'}`,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={{ xs: 1.5, sm: 2 }} alignItems="center">
          <Stack direction="row" spacing={{ xs: 1, sm: 2 }}>
            <IconButton
              color="inherit"
              href="https://github.com/thisnamespace"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit thisnamespace on GitHub"
              sx={{ p: { xs: 1, sm: 1.5 }, minWidth: 44, minHeight: 44 }}
            >
              <GitHub sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />
            </IconButton>
            <IconButton
              color="inherit"
              href="https://www.linkedin.com/in/michael-day-0b194246"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect with Michael Day on LinkedIn"
              sx={{ p: { xs: 1, sm: 1.5 }, minWidth: 44, minHeight: 44 }}
            >
              <LinkedIn sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />
            </IconButton>
            <IconButton
              color="inherit"
              href="mailto:info@thisnamespace.com"
              aria-label="Send email to info@thisnamespace.com"
              sx={{ p: { xs: 1, sm: 1.5 }, minWidth: 44, minHeight: 44 }}
            >
              <Email sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />
            </IconButton>
          </Stack>
          <Typography
            variant="body2"
            textAlign="center"
            sx={{
              opacity: 0.9,
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              px: 2,
            }}
          >
            {currentYear} thisnamespace · Built with React, TypeScript & Material-UI
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
