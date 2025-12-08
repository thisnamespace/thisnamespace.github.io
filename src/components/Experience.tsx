import {
  Box,
  Container,
  Typography,
  Paper,
  Chip,
  useTheme,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { WorkOutline, LocationOn, ViewAgenda, ViewHeadline } from '@mui/icons-material';
import type { Experience } from '../types';
import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useReducedMotion } from '../hooks/useReducedMotion';

const experiences: Experience[] = [
  {
    id: '1',
    title: 'Team Manager: Software Development',
    company: 'TeamViewer',
    period: 'Jan 2025 - Present',
    location: 'London Area, United Kingdom (Remote)',
    employmentType: 'Full-time',
    current: true,
    description: [
      'Leading software development team in delivering cutting-edge solutions',
      'Driving technical strategy and team development initiatives',
    ],
    skills: ['Communication', 'React.js', 'Jira', 'Decision-Making', 'Coaching'],
  },
  {
    id: '2',
    title: 'Head of UI Engineering',
    company: '1E',
    period: 'Jun 2024 - Sep 2025',
    location: 'Remote',
    employmentType: 'Full-time',
    description: [
      'Spearheaded the UI strategy and frontend delivery during the transition from on-premise solutions to SaaS, enhancing user experience',
      'Guided and empowered team members to create innovative tech solutions, fostering a collaborative development environment',
      'Owned the architectural direction of core UI systems and component libraries, ensuring scalability and maintainability',
    ],
    skills: ['Management', 'Jira', 'Team Leadership', 'Problem Solving', 'Communication'],
  },
  {
    id: '3',
    title: 'Engineering Manager – Front-End',
    company: '1E',
    period: 'May 2021 - Apr 2025',
    employmentType: 'Full-time',
    description: [
      'Managed a team of front-end developers, fostering a collaborative environment to enhance technical skills',
      'Drove alignment between product, design, and platform engineering, streamlining processes for improved efficiency',
      'Mentored team members, enabling them to create innovative tech solutions that elevated user experience',
    ],
    skills: ['Unit Testing', 'Storybook', 'Sonarqube', 'Management', 'React.js', 'Jira'],
  },
  {
    id: '4',
    title: 'Senior Front-End Engineer',
    company: '1E',
    period: 'Apr 2020 - May 2021',
    location: 'Remote',
    employmentType: 'Full-time',
    description: [
      'Developed and maintained complex React applications with focus on performance and user experience',
      'Contributed to establishing frontend best practices and design system standards',
    ],
    skills: ['React.js', 'Storybook', 'Jira'],
  },
  {
    id: '5',
    title: 'Front-End Developer',
    company: 'AKQA',
    period: 'Jul 2019 - Sep 2019',
    location: 'Melbourne, Victoria, Australia (On-site)',
    employmentType: 'Contract',
    description: [
      'Developed custom websites tailored to client specifications, enhancing user engagement and satisfaction',
      'Collaborated with cross-functional teams to take feature requests from concept through design and testing phases',
      'Improved project quality through hands-on involvement, fostering a strong team environment',
    ],
    skills: ['Netlify', 'Content Management Systems (CMS)', 'React.js'],
  },
  {
    id: '6',
    title: 'Front-End Developer',
    company: 'Bliss Digital',
    period: 'Mar 2019 - May 2019',
    location: 'Melbourne, Victoria, Australia (On-site)',
    employmentType: 'Contract',
    description: [
      'Contributed to the successful delivery of a complex React/Redux project management application under tight deadlines',
      'Collaborated closely with designers and back-end developers to ensure seamless integration of all components',
      "Utilized styled-components for efficient styling, enhancing the application's user interface and experience",
    ],
    skills: ['styled-components', 'React.js', 'Redux.js', 'GraphQL'],
  },
  {
    id: '7',
    title: 'Front-End Developer',
    company: 'Traffic Brand Agency',
    period: 'Jan 2019 - Feb 2019',
    location: 'Melbourne, Victoria, Australia (On-site)',
    employmentType: 'Contract',
    description: [
      'Developed a themable React application by consolidating multiple bespoke projects for streamlined maintenance',
      'Enhanced responsiveness and performance, resulting in improved user experience across various websites',
      'Created reusable components and a structured data framework for RESTful APIs, facilitating easier updates',
    ],
    skills: ['React.js'],
  },
  {
    id: '8',
    title: 'Front-End Developer',
    company: '1E',
    period: 'Sep 2016 - Oct 2018',
    location: 'London Area, United Kingdom (On-site)',
    employmentType: 'Full-time',
    description: [
      'Collaborated with design and product teams to create the front end of Tachyon using React.js',
      'Developed reusable web application components, enhancing user experience and interaction',
      'Contributed to establishing a new HTML, CSS, and JavaScript standard, improving code maintainability',
      'Played a key role in a leading software company, 1E, known for innovative IT solutions',
    ],
    skills: ['React.js', 'HTML5'],
  },
  {
    id: '9',
    title: 'Lead Front-End Developer',
    company: 'Incentivated',
    period: 'Jan 2013 - Aug 2016',
    location: 'London Area, United Kingdom (On-site)',
    employmentType: 'Full-time',
    description: [
      'Led a small team in the execution of high-standard front-end projects for well-established brands',
      'Focused on innovative front-end technologies while transitioning away from back-end development',
      'Mentored team members on new techniques in mobile development, enhancing their skills and performance',
    ],
    skills: ['J2ME', 'iOS Development', 'jQuery'],
  },
  {
    id: '10',
    title: 'Mobile/Web Developer',
    company: 'Incentivated',
    period: 'Apr 2010 - Jan 2013',
    location: 'London Area, United Kingdom (On-site)',
    employmentType: 'Full-time',
    description: [
      'Developed custom website layouts and email newsletters for diverse clients, enhancing user engagement',
      'Created mobile-driven sites and transitioned to native and hybrid applications for multiple platforms',
      'Collaborated with cross-functional teams to deliver high-quality solutions, resulting in increased client satisfaction',
      'Contributed to the growth of a multi-award-winning mobile marketing agency, Incentivated, based in London',
    ],
    skills: ['Mobile Development', 'Web Development'],
  },
  {
    id: '11',
    title: 'Web Developer',
    company: 'Virtuacon',
    period: 'Oct 2008 - Dec 2009',
    location: 'Mount Edgecombe, South Africa (On-site)',
    employmentType: 'Full-time',
    description: [
      'Delivered custom website layouts and web applications, enhancing user experience and functionality',
      'Upgraded existing applications and created new ones, managing the entire lifecycle from design to implementation',
      "Developed plug-ins and features for the CMS 'store', improving site performance and user engagement",
    ],
    skills: ['Web Development', 'CMS'],
  },
];

interface ExperienceItemProps {
  exp: Experience;
  index: number;
  viewMode: 'expanded' | 'minimized';
}

const ExperienceItem = ({ exp, index, viewMode }: ExperienceItemProps) => {
  const theme = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const { elementRef, isVisible } = useScrollReveal({
    threshold: 0.3,
    rootMargin: '0px 0px 100px 0px',
  });

  return (
    <Box
      ref={elementRef}
      sx={{
        position: 'relative',
        mb: viewMode === 'minimized' ? 3 : 6,
        display: 'flex',
        flexDirection: { xs: 'column', md: index % 2 === 0 ? 'row' : 'row-reverse' },
        alignItems: { xs: 'flex-start', md: 'center' },
        gap: { xs: 2, md: 4 },
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: prefersReducedMotion
          ? 'none'
          : 'opacity 0.6s ease-out, transform 0.6s ease-out',
      }}
    >
      {/* Timeline dot */}
      <Box
        sx={{
          position: 'absolute',
          left: { xs: '11px', md: '50%' },
          top: { xs: '20px', md: '50%' },
          transform: { xs: 'none', md: 'translate(-50%, -50%)' },
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          bgcolor: exp.current ? 'primary.main' : 'background.paper',
          border: `3px solid ${exp.current ? theme.palette.primary.main : theme.palette.divider}`,
          boxShadow: exp.current
            ? `0 0 0 4px ${theme.palette.mode === 'dark' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(6, 182, 212, 0.3)'}`
            : 'none',
          zIndex: 1,
        }}
      />

      {/* Content card */}
      <Box
        sx={{
          flex: 1,
          width: { xs: 'calc(100% - 60px)', md: 'calc(50% - 40px)' },
          ml: { xs: '60px', md: 0 },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: viewMode === 'minimized' ? { xs: 2, md: 2.5 } : { xs: 3, md: 4 },
            borderRadius: 1,
            transition: 'all 0.2s ease',
            border: exp.current
              ? `2px solid ${theme.palette.primary.main}`
              : `1px solid ${theme.palette.divider}`,
            bgcolor: exp.current
              ? theme.palette.mode === 'dark'
                ? 'rgba(6, 182, 212, 0.03)'
                : 'rgba(14, 116, 144, 0.03)'
              : 'background.paper',
            '&:hover': {
              boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
              borderColor: theme.palette.primary.main,
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
            <WorkOutline sx={{ color: 'primary.main', mt: 0.5 }} />
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h3"
                component="h3"
                sx={{
                  fontWeight: 600,
                  mb: 0.5,
                  fontSize: '1.5rem',
                  color: exp.current ? 'primary.main' : 'text.primary',
                }}
              >
                {exp.title}
              </Typography>
              <Typography
                variant="h4"
                component="h4"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 500,
                  mb: 1,
                  fontSize: '1.1rem',
                }}
              >
                {exp.company}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                <Chip
                  label={exp.period}
                  size="small"
                  variant={exp.current ? 'filled' : 'outlined'}
                  color={exp.current ? 'primary' : 'default'}
                  sx={{ fontWeight: 500 }}
                />
                {exp.employmentType && (
                  <Chip label={exp.employmentType} size="small" variant="outlined" />
                )}
              </Box>
              {exp.location && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
                  <LocationOn sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {exp.location}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>

          {/* Description - Only show in expanded mode */}
          {viewMode === 'expanded' && (
            <Box component="ul" sx={{ pl: 2, mb: 2 }}>
              {exp.description.map((item, idx) => (
                <Typography
                  key={idx}
                  component="li"
                  variant="body2"
                  sx={{
                    mb: 1,
                    color: 'text.secondary',
                    lineHeight: 1.7,
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          )}

          {/* Skills - Only show in expanded mode */}
          {viewMode === 'expanded' && exp.skills && exp.skills.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {exp.skills.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  size="small"
                  sx={{
                    fontSize: '0.75rem',
                    height: '24px',
                    bgcolor:
                      theme.palette.mode === 'dark'
                        ? 'rgba(148, 163, 184, 0.1)'
                        : 'rgba(148, 163, 184, 0.15)',
                    '&:hover': {
                      bgcolor:
                        theme.palette.mode === 'dark'
                          ? 'rgba(148, 163, 184, 0.2)'
                          : 'rgba(148, 163, 184, 0.25)',
                    },
                  }}
                />
              ))}
            </Box>
          )}
        </Paper>
      </Box>

      {/* Spacer for alternating layout on desktop */}
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          flex: 1,
          width: 'calc(50% - 40px)',
        }}
      />
    </Box>
  );
};

const ExperienceSection = () => {
  const theme = useTheme();
  const [viewMode, setViewMode] = useState<'expanded' | 'minimized'>('minimized');

  const handleViewModeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newMode: 'expanded' | 'minimized' | null
  ) => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
  };

  return (
    <Box
      id="experience"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'background.paper',
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{
            mb: 2,
            textAlign: 'center',
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
          Experience
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: '700px', mx: 'auto' }}
        >
          My professional journey from hands-on development to engineering leadership
        </Typography>

        {/* View Mode Toggle */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewModeChange}
            aria-label="Experience timeline view mode"
            size="small"
          >
            <ToggleButton
              value="minimized"
              aria-label="Switch to minimized view showing only job titles and companies"
            >
              <ViewHeadline sx={{ mr: 1, fontSize: '1.2rem' }} />
              <Typography variant="body2">Minimized</Typography>
            </ToggleButton>
            <ToggleButton
              value="expanded"
              aria-label="Switch to expanded view showing full job descriptions and skills"
            >
              <ViewAgenda sx={{ mr: 1, fontSize: '1.2rem' }} />
              <Typography variant="body2">Expanded</Typography>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box
          sx={{
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              left: { xs: '20px', md: '50%' },
              top: 0,
              bottom: 0,
              width: '2px',
              bgcolor:
                theme.palette.mode === 'dark'
                  ? 'rgba(6, 182, 212, 0.2)'
                  : 'rgba(14, 116, 144, 0.2)',
              transform: { xs: 'none', md: 'translateX(-1px)' },
            },
          }}
        >
          {experiences.map((exp, index) => (
            <ExperienceItem key={exp.id} exp={exp} index={index} viewMode={viewMode} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default ExperienceSection;
