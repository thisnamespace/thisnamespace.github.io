import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Stack,
  useTheme,
} from '@mui/material';
import { GitHub, Launch } from '@mui/icons-material';
import { Project } from '../types';

const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'ScrollObserver',
    description:
      'Open source React component for infinite scroll and viewport detection. Published to npm with MIT license, enabling lazy-loading and callback execution when elements enter viewport.',
    technologies: ['React', 'JavaScript', 'Webpack', 'npm Package'],
    link: 'https://www.npmjs.com/package/@thisnamespace/scrollobserver',
    github: 'https://github.com/thisnamespace/ScrollObserver',
    image: '/project-screenshots/scrollobserver.png', // Placeholder - user will replace
  },
  {
    id: '2',
    title: 'Tachyon - 1E',
    description:
      'Created front end for industry-leading software using React.js framework. Took responsibility for entire presentation tier and contributed to development of commonly used components.',
    technologies: ['React', 'TypeScript', 'Component Libraries', 'Team Leadership'],
    link: 'https://www.1e.com/',
    image: '/project-screenshots/tachyon.png', // Placeholder - user will replace
  },
  {
    id: '3',
    title: 'Enterprise Retail & Travel',
    description:
      'Built digital solutions for major brands including Gatwick Airport, Tesco, Waitrose, and Virgin Holidays through embedded agile teams and cross-functional collaboration.',
    technologies: ['React', 'Agile', 'E-commerce', 'Performance Optimization'],
    image: '/project-screenshots/retail-travel.png', // Placeholder - user will replace
  },
  {
    id: '4',
    title: 'NHS Digital Solutions',
    description:
      'Developed healthcare digital solutions through rapid prototyping and iterative design collaboration with stakeholders, prioritizing accessibility and user-centric design.',
    technologies: ['React', 'Accessibility', 'User-Centric Design', 'Healthcare'],
    image: '/project-screenshots/nhs.png', // Placeholder - user will replace
  },
];

const Projects = () => {
  const theme = useTheme();

  return (
    <Box
      id="projects"
      sx={{
        py: { xs: 8, sm: 10 },
        bgcolor: 'background.default',
        px: { xs: 2, sm: 3 },
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
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
          Featured Projects
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: { xs: 6, sm: 8 }, maxWidth: '700px', mx: 'auto' }}
        >
          A selection of my work showcasing leadership in front-end development and technical
          innovation
        </Typography>
        <Grid container spacing={{ xs: 3, sm: 4 }}>
          {PROJECTS.map((project) => (
            <Grid size={{ xs: 12, md: 6 }} key={project.id}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 1,
                  border: `1px solid ${theme.palette.divider}`,
                  bgcolor: 'background.paper',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    borderColor: theme.palette.primary.main,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: { xs: 3, sm: 4 } }}>
                  <Typography
                    variant="h3"
                    component="h3"
                    gutterBottom
                    sx={{
                      fontSize: { xs: '1.25rem', sm: '1.5rem' },
                      fontWeight: 600,
                      mb: 2,
                      color: 'text.primary',
                    }}
                  >
                    {project.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.875rem', sm: '0.95rem' }, lineHeight: 1.7, mb: 3 }}
                  >
                    {project.description}
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                    {project.technologies.map((tech, idx) => (
                      <Chip
                        key={idx}
                        label={tech}
                        size="small"
                        variant="outlined"
                        sx={{
                          fontSize: { xs: '0.7rem', sm: '0.75rem' },
                          borderColor:
                            theme.palette.mode === 'dark'
                              ? 'rgba(6, 182, 212, 0.3)'
                              : 'rgba(14, 116, 144, 0.3)',
                          '&:hover': {
                            borderColor: 'primary.main',
                            bgcolor:
                              theme.palette.mode === 'dark'
                                ? 'rgba(6, 182, 212, 0.1)'
                                : 'rgba(14, 116, 144, 0.1)',
                          },
                        }}
                      />
                    ))}
                  </Stack>
                </CardContent>
                <CardActions
                  sx={{
                    p: { xs: 3, sm: 4 },
                    pt: 0,
                    gap: 1.5,
                    flexWrap: 'wrap',
                  }}
                >
                  {project.link && (
                    <Button
                      variant="contained"
                      size="medium"
                      startIcon={<Launch />}
                      href={project.link}
                      target="_blank"
                      sx={{
                        fontSize: { xs: '0.8rem', sm: '0.875rem' },
                        fontWeight: 600,
                        px: 3,
                        py: 1,
                        borderRadius: 1,
                        textTransform: 'none',
                        bgcolor: 'primary.main',
                        boxShadow: 'none',
                        '&:hover': {
                          bgcolor: 'primary.dark',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                        },
                      }}
                    >
                      View Project
                    </Button>
                  )}
                  {project.github && (
                    <Button
                      variant="outlined"
                      size="medium"
                      startIcon={<GitHub />}
                      href={project.github}
                      target="_blank"
                      sx={{
                        fontSize: { xs: '0.8rem', sm: '0.875rem' },
                        fontWeight: 600,
                        px: 3,
                        py: 1,
                        borderRadius: 1,
                        textTransform: 'none',
                        '&:hover': {
                          bgcolor: 'action.hover',
                        },
                      }}
                    >
                      Source Code
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Projects;
