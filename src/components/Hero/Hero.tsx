import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import DeliveryLoop from '../DeliveryLoop';
import { loopIntro, loopStages, profile } from '../../data/content';
import { fonts } from '../../styles/theme';

/** "One. Two." becomes ["One.", "Two."] */
const headlineSentences = profile.headline.match(/[^.!?]+[.!?]+/g)?.map((part) => part.trim()) ?? [
  profile.headline,
];

const Hero = () => (
  <Box
    component="section"
    aria-labelledby="hero-heading"
    sx={{ pt: { xs: 6, md: 10 }, pb: { xs: 7, md: 11 } }}
  >
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 7fr) minmax(0, 5fr)' },
          gap: { xs: 6, md: 8 },
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: fonts.display,
              fontWeight: 600,
              fontSize: '1.1rem',
              color: 'primary.main',
              mb: { xs: 2, md: 2.5 },
            }}
          >
            {profile.name}, {profile.role.toLowerCase()}
          </Typography>
          <Typography id="hero-heading" variant="h1">
            {headlineSentences.map((sentence) => (
              // Each sentence starts on its own line so the break never lands mid-thought.
              <Box component="span" key={sentence} sx={{ display: 'block' }}>
                {sentence}
              </Box>
            ))}
          </Typography>
          <Typography
            sx={{
              mt: { xs: 3, md: 3.5 },
              maxWidth: '36em',
              fontSize: { xs: '1.125rem', md: '1.25rem' },
            }}
          >
            {profile.lead}
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            sx={{ mt: { xs: 4, md: 5 } }}
          >
            <Button
              component={RouterLink}
              to={{ pathname: '/', hash: '#interests' }}
              variant="contained"
              size="large"
            >
              What I care about
            </Button>
            <Button
              component={RouterLink}
              to={{ pathname: '/', hash: '#contact' }}
              variant="outlined"
              size="large"
            >
              Get in touch
            </Button>
          </Stack>
        </Box>

        <DeliveryLoop title={loopIntro.title} stages={loopStages} closing={loopIntro.closing} />
      </Box>
    </Container>
  </Box>
);

export default Hero;
