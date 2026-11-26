import { Box, Container, Link, Stack, Typography } from '@mui/material';
import { profile } from '../../data/content';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{ borderTop: 1, borderColor: 'divider', py: { xs: 3, md: 4 }, mt: 'auto' }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1.5, sm: 4 }}
          sx={{ justifyContent: 'space-between', alignItems: { sm: 'center' } }}
        >
          <Typography variant="body2" color="text.secondary">
            © {currentYear} {profile.name}
          </Typography>
          <Stack direction="row" spacing={3} component="nav" aria-label="Elsewhere">
            <Link href={profile.linkedin} target="_blank" rel="noopener noreferrer" variant="body2">
              LinkedIn
            </Link>
            <Link href={profile.github} target="_blank" rel="noopener noreferrer" variant="body2">
              GitHub
            </Link>
            <Link href={`mailto:${profile.email}`} variant="body2">
              Email
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
