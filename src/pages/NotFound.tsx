import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';
import { usePageTitle } from '../hooks/usePageTitle';

const NotFound = () => {
  usePageTitle('Page not found');

  return (
    <Box id="main-content" sx={{ py: { xs: 8, md: 14 } }}>
      <Container maxWidth="md">
        <Typography variant="h1" sx={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)' }}>
          That page does not exist.
        </Typography>
        <Typography sx={{ mt: 2.5 }} color="text.secondary">
          The link may be old, or the address may have a typo. The home page has everything.
        </Typography>
        <Button component={RouterLink} to="/" variant="contained" size="large" sx={{ mt: 4 }}>
          Go to the home page
        </Button>
      </Container>
    </Box>
  );
};

export default NotFound;
