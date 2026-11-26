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
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 5fr) minmax(0, 7fr)' },
          gap: { xs: 4, md: 8 },
        }}
      >
        <Box>
          <Typography id="clients-heading" variant="h3" component="h2">
            {title}
          </Typography>
          <Typography sx={{ mt: 2, fontSize: '1.0625rem' }} color="text.secondary">
            {body}
          </Typography>
        </Box>
        <Box
          component="ul"
          aria-label="Companies and brands I have built for"
          sx={{
            listStyle: 'none',
            m: 0,
            p: 0,
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, minmax(0, 1fr))',
              sm: 'repeat(3, minmax(0, 1fr))',
            },
            columnGap: 3,
            rowGap: { xs: 1.5, md: 2 },
            alignContent: 'center',
          }}
        >
          {names.map((name) => (
            <Typography
              component="li"
              key={name}
              sx={{
                fontFamily: fonts.display,
                fontWeight: 620,
                fontSize: { xs: '1.1rem', md: '1.3rem' },
                letterSpacing: '-0.015em',
                lineHeight: 1.25,
              }}
            >
              {name}
            </Typography>
          ))}
        </Box>
      </Box>
    </Container>
  </Box>
);

export default Clients;
