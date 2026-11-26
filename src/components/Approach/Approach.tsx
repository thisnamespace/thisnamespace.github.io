import { Box, Container, Typography } from '@mui/material';
import type { Principle } from '../../types';

export interface ApproachProps {
  title: string;
  principles: Principle[];
}

const Approach = ({ title, principles }: ApproachProps) => (
  <Box
    component="section"
    id="approach"
    aria-labelledby="approach-heading"
    sx={{
      bgcolor: 'background.paper',
      borderTop: 1,
      borderBottom: 1,
      borderColor: 'divider',
      py: { xs: 7, md: 11 },
    }}
  >
    <Container maxWidth="lg">
      <Typography id="approach-heading" variant="h2">
        {title}
      </Typography>
      <Box
        sx={{
          mt: { xs: 4, md: 6 },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
          columnGap: 10,
          rowGap: { xs: 4, md: 6 },
        }}
      >
        {principles.map((principle) => (
          <Box key={principle.id}>
            <Typography variant="h3">{principle.title}</Typography>
            <Typography sx={{ mt: 1.5, maxWidth: '32em' }}>{principle.body}</Typography>
          </Box>
        ))}
      </Box>
    </Container>
  </Box>
);

export default Approach;
