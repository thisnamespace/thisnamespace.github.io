import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { Email, GitHub, LinkedIn } from '@mui/icons-material';

export interface ContactProps {
  title: string;
  body: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
}

const Contact = ({ title, body, email, linkedinUrl, githubUrl }: ContactProps) => (
  <Box
    component="section"
    id="contact"
    aria-labelledby="contact-heading"
    sx={{ bgcolor: '#0A3F4A', color: '#FFFFFF', py: { xs: 8, md: 12 } }}
  >
    <Container maxWidth="lg">
      <Typography id="contact-heading" variant="h2" sx={{ maxWidth: '18em' }}>
        {title}
      </Typography>
      <Typography sx={{ mt: 2.5, maxWidth: '34em', color: '#CFE6E8' }}>{body}</Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: { xs: 4, md: 5 } }}>
        <Button
          href={`mailto:${email}`}
          size="large"
          startIcon={<Email />}
          data-testid="contact-email"
          sx={{
            bgcolor: '#F2B24C',
            color: '#1F1400',
            '&:hover': { bgcolor: '#FFC566' },
          }}
        >
          {email}
        </Button>
        <Button
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          size="large"
          variant="outlined"
          startIcon={<LinkedIn />}
          sx={{
            color: '#FFFFFF',
            borderColor: 'rgba(255,255,255,0.6)',
            '&:hover': { borderColor: '#FFFFFF' },
          }}
        >
          LinkedIn
        </Button>
        <Button
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          size="large"
          variant="outlined"
          startIcon={<GitHub />}
          sx={{
            color: '#FFFFFF',
            borderColor: 'rgba(255,255,255,0.6)',
            '&:hover': { borderColor: '#FFFFFF' },
          }}
        >
          GitHub
        </Button>
      </Stack>
    </Container>
  </Box>
);

export default Contact;
