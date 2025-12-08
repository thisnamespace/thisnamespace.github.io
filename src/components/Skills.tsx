import { Box, Container, Typography, Grid, Chip, Paper, useTheme } from '@mui/material';
import { Skill } from '../types';

const SKILLS: Skill[] = [
  {
    category: 'Frontend Technologies',
    items: [
      'React',
      'TypeScript',
      'JavaScript',
      'HTML5',
      'CSS3',
      'Material-UI',
      'Responsive Design',
    ],
  },
  {
    category: 'Engineering Leadership',
    items: [
      'Team Building',
      'Technical Mentoring',
      'Performance Management',
      'Career Development',
      'Technical Recruiting',
      '1-on-1s',
    ],
  },
  {
    category: 'Architecture & Strategy',
    items: [
      'System Architecture',
      'Technical Roadmaps',
      'Component Design Systems',
      'Performance Optimization',
      'Scalability Planning',
    ],
  },
  {
    category: 'Agile & Delivery',
    items: [
      'Scrum/Kanban',
      'Sprint Planning',
      'Cross-functional Collaboration',
      'DevOps Practices',
      'CI/CD Pipeline Management',
    ],
  },
  {
    category: 'Quality & Standards',
    items: [
      'Code Review',
      'Testing Strategy',
      'Accessibility Standards',
      'Code Quality Metrics',
      'Technical Documentation',
    ],
  },
  {
    category: 'Tools & Platforms',
    items: ['Git', 'Jira', 'GitHub', 'Vite', 'Webpack', 'Storybook', 'Playwright', 'npm'],
  },
  {
    category: 'Business & Communication',
    items: [
      'Stakeholder Management',
      'Technical Communication',
      'Budget Planning',
      'Risk Management',
      'Resource Allocation',
    ],
  },
  {
    category: 'Modern Practices',
    items: [
      'Mobile-First Design',
      'AI-Assisted Development',
      'Open Source Contribution',
      'Rapid Prototyping',
      'Iterative Development',
    ],
  },
];

const Skills = () => {
  const theme = useTheme();

  return (
    <Box
      id="skills"
      sx={{
        py: { xs: 8, sm: 10 },
        bgcolor: 'background.paper',
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
          Skills & Expertise
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: { xs: 6, sm: 8 }, maxWidth: '700px', mx: 'auto' }}
        >
          A comprehensive blend of technical expertise and leadership capabilities
        </Typography>
        <Grid container spacing={{ xs: 3, sm: 4 }}>
          {SKILLS.map((skillGroup, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, sm: 4 },
                  height: '100%',
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
                <Typography
                  variant="h3"
                  component="h3"
                  gutterBottom
                  sx={{
                    mb: 3,
                    fontSize: { xs: '1.25rem', sm: '1.5rem' },
                    fontWeight: 600,
                    color: 'text.primary',
                  }}
                >
                  {skillGroup.category}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 1, sm: 1.25 } }}>
                  {skillGroup.items.map((skill, idx) => (
                    <Chip
                      key={idx}
                      label={skill}
                      variant="outlined"
                      size="medium"
                      sx={{
                        fontWeight: 500,
                        fontSize: { xs: '0.75rem', sm: '0.8125rem' },
                        height: { xs: 32, sm: 36 },
                        px: 0.5,
                        borderRadius: 1,
                        borderColor: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'rgba(6, 182, 212, 0.3)'
                            : 'rgba(14, 116, 144, 0.3)',
                        transition: 'all 0.15s ease',
                        '&:hover': {
                          borderColor: 'primary.main',
                          bgcolor: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(6, 182, 212, 0.08)'
                              : 'rgba(14, 116, 144, 0.08)',
                        },
                      }}
                    />
                  ))}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Skills;
