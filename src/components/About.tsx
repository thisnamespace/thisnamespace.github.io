import { Box, Container, Typography, Grid, Paper, useTheme } from '@mui/material';
import { People, Code, TrendingUp, Psychology } from '@mui/icons-material';

interface Highlight {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const HIGHLIGHTS: Highlight[] = [
  {
    icon: <People fontSize="large" />,
    title: 'Team Leadership',
    description:
      'Building and scaling engineering teams through mentoring, performance management, and career development',
  },
  {
    icon: <Code fontSize="large" />,
    title: 'Technical Strategy',
    description:
      'Driving technical roadmaps, architecture decisions, and engineering best practices across organizations',
  },
  {
    icon: <TrendingUp fontSize="large" />,
    title: 'Cross-functional Impact',
    description:
      'Leading agile delivery with embedded collaboration across product, design, and engineering teams',
  },
  {
    icon: <Psychology fontSize="large" />,
    title: 'Innovation & Scale',
    description:
      'Implementing modern technologies and practices to deliver enterprise solutions at scale',
  },
];

const About = () => {
  const theme = useTheme();

  return (
    <Box
      id="about"
      sx={{
        py: { xs: 8, sm: 10 },
        bgcolor: 'background.default',
        px: { xs: 2, sm: 3 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h2"
          gutterBottom
          textAlign="center"
          sx={{
            mb: 2,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 600,
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #06b6d4 30%, #64748b 100%)'
                : 'linear-gradient(135deg, #0e7490 30%, #475569 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          About Me
        </Typography>
        <Typography
          variant="body1"
          component="p"
          textAlign="center"
          color="text.secondary"
          sx={{
            mb: { xs: 6, sm: 8 },
            maxWidth: '800px',
            mx: 'auto',
            px: { xs: 2, sm: 3 },
            fontSize: { xs: '1rem', sm: '1.15rem', md: '1.25rem' },
            lineHeight: 1.8,
          }}
        >
          Engineering leader who transitioned from hands-on development to building and scaling
          high-performing front end teams. I drive technical strategy and product innovation while
          maintaining strong engineering fundamentals in React, TypeScript, and modern web
          architectures. My approach combines strategic planning with embedded collaboration,
          working alongside teams to deliver enterprise solutions for healthcare, e-commerce, and
          travel industries. Proven track record of establishing engineering best practices,
          mentoring developers, and aligning technical roadmaps with business objectives.
        </Typography>
        <Grid container spacing={{ xs: 3, sm: 4 }}>
          {HIGHLIGHTS.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, sm: 4 },
                  height: '100%',
                  textAlign: 'center',
                  borderRadius: 1,
                  border: `1px solid ${theme.palette.divider}`,
                  bgcolor: 'background.paper',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                    borderColor: theme.palette.primary.main,
                  },
                }}
              >
                <Box
                  className="icon-wrapper"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 70,
                    height: 70,
                    borderRadius: '50%',
                    background: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(6, 182, 212, 0.1)'
                        : 'rgba(14, 116, 144, 0.1)',
                    mb: 2,
                  }}
                  aria-hidden="true"
                >
                  <Box sx={{ color: 'primary.main' }}>{item.icon}</Box>
                </Box>
                <Typography
                  variant="h3"
                  component="h3"
                  gutterBottom
                  sx={{
                    fontSize: { xs: '1.1rem', sm: '1.25rem' },
                    fontWeight: 600,
                    mb: 2,
                    color: 'text.primary',
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: { xs: '0.875rem', sm: '0.9rem' }, lineHeight: 1.7 }}
                >
                  {item.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
