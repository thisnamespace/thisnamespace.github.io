import { Box, Container, Typography } from '@mui/material';
import type { Interest } from '../../types';

export interface InterestsProps {
  title: string;
  items: Interest[];
}

/** What Michael cares about: short statements, not a list of achievements. */
const Interests = ({ title, items }: InterestsProps) => (
  <Box
    component="section"
    id="interests"
    aria-labelledby="interests-heading"
    sx={{
      bgcolor: 'background.paper',
      borderBottom: 1,
      borderColor: 'divider',
      py: { xs: 7, md: 11 },
    }}
  >
    <Container maxWidth="lg">
      <Typography id="interests-heading" variant="h2">
        {title}
      </Typography>
      <Box
        component="ul"
        data-testid="interest-list"
        sx={{
          listStyle: 'none',
          m: 0,
          p: 0,
          mt: { xs: 4, md: 6 },
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, minmax(0, 1fr))',
            lg: 'repeat(3, minmax(0, 1fr))',
          },
          columnGap: { sm: 6, lg: 8 },
          rowGap: { xs: 4, md: 6 },
        }}
      >
        {items.map((item) => (
          <Box component="li" key={item.id}>
            <Typography variant="h3">{item.title}</Typography>
            <Typography sx={{ mt: 1.5, maxWidth: '30em' }}>{item.body}</Typography>
          </Box>
        ))}
      </Box>
    </Container>
  </Box>
);

export default Interests;
