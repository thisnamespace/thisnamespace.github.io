import { Box, Container, Typography } from '@mui/material';
import { fonts } from '../../styles/theme';

export interface ClientsProps {
  title: string;
  body: string;
  names: string[];
}

/** Background band: the consumer and enterprise products behind the experience. */
const Clients = ({ title, body, names }: ClientsProps) => (
  <Box
    component="section"
    aria-labelledby="clients-heading"
    sx={{ borderTop: 1, borderBottom: 1, borderColor: 'divider', py: { xs: 6, md: 8 } }}
  >
    <Container maxWidth="lg">
      <Typography id="clients-heading" variant="h3" component="h2">
        {title}
      </Typography>
      <Typography sx={{ mt: 1.5, maxWidth: '40em', fontSize: '1.0625rem' }} color="text.secondary">
        {body}
      </Typography>
      <Box
        component="ul"
        aria-label="Companies and brands I have worked with"
        data-testid="brand-list"
        sx={{
          listStyle: 'none',
          m: 0,
          mt: { xs: 3.5, md: 4.5 },
          p: 0,
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, minmax(0, 1fr))',
            sm: 'repeat(3, minmax(0, 1fr))',
            md: 'repeat(5, minmax(0, 1fr))',
          },
          columnGap: 3,
          rowGap: { xs: 2, md: 3 },
        }}
      >
        {names.map((name) => (
          <Typography
            component="li"
            key={name}
            sx={{
              fontFamily: fonts.display,
              fontWeight: 620,
              fontSize: { xs: '1.15rem', md: '1.35rem' },
              letterSpacing: '-0.015em',
              lineHeight: 1.25,
            }}
          >
            {name}
          </Typography>
        ))}
      </Box>
    </Container>
  </Box>
);

export default Clients;
