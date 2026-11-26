import type { ExperienceEntry, Interest, LoopStage, Profile, TechPath } from '../types';

/**
 * All site copy lives in this file.
 * Edit here to change wording; components only handle layout.
 *
 * The site is a presence, not a CV: it shows what Michael cares about.
 * Keep team sizes, technology stacks and employer-specific detail out of it.
 */

export const profile: Profile = {
  name: 'Michael Day',
  role: 'Engineering leader',
  email: 'michael@thisnamespace.com',
  linkedin: 'https://www.linkedin.com/in/michael-day-0b194246',
  github: 'https://github.com/thisnamespace',
  siteUrl: 'https://thisnamespace.com',
  headline: 'Fast, clear products. AI adopted on purpose.',
  lead: 'I lead software teams, and I care most about the front end: great user experiences and performance, on web and mobile. Lately I am just as absorbed by how AI should fit into the way teams design, build and ship.',
};

export const loopIntro = {
  title: 'How I like AI to fit into building software',
  closing: 'What the measurements show shapes the next round.',
};

export const loopStages: LoopStage[] = [
  {
    id: 'design',
    name: 'Design',
    change: 'Designers working in code, building the first layer themselves.',
  },
  {
    id: 'build',
    name: 'Build',
    change: 'AI coding tools, with agents and skills written for the work at hand.',
  },
  {
    id: 'review',
    name: 'Review',
    change: 'Shared practices, so quality holds as usage grows.',
  },
  {
    id: 'measure',
    name: 'Measure',
    change: 'Cost against what was delivered, and what reached customers.',
  },
];

export const clients = {
  title: 'Brands I have worked with',
  body: 'I started as a developer in 2008 and spent my early career building for consumer brands people use every day. Since then I have led teams at 1E and now TeamViewer.',
  names: [
    'TeamViewer',
    '1E',
    'Gatwick Airport',
    'Tesco',
    'Waitrose',
    'Virgin Holidays',
    'NHS',
    'Mitsubishi Motors',
    'Peroni',
    'AKQA',
  ],
};

export const interests = {
  title: 'What I care about',
  items: [
    {
      id: 'experience',
      title: 'Great user experiences',
      body: 'To the person using it, the interface is the product. I love the clarity, accessibility and small details that make something feel right.',
    },
    {
      id: 'performance',
      title: 'Performance',
      body: 'People feel a fast product before they notice anything else about it. I treat speed as a requirement, not something to polish at the end.',
    },
    {
      id: 'ai',
      title: 'AI, used on purpose',
      body: 'I am fascinated by how AI changes the way software gets built: coding tools, agents, skills and the orchestration between them. Smart use matters more to me than more use, and I want to know whether it paid off.',
    },
    {
      id: 'design-in-code',
      title: 'Design and engineering in one medium',
      body: 'I like it when designers work in code and hand over something that already runs. The handover stops being a translation step, and the details survive.',
    },
    {
      id: 'platforms',
      title: 'Simple, cohesive platforms',
      body: 'I have seen software go from on-premise installs to SaaS shipped continuously, and I have a soft spot for one well-built platform over a sprawl of small services.',
    },
    {
      id: 'teams',
      title: 'Teams that enjoy the work',
      body: 'Mentoring, clear expectations and room to grow are what make a team good. The best tools in the world do not replace having one.',
    },
  ] satisfies Interest[],
};

export const journey = {
  title: 'The route here',
  body: 'I have worked on web and mobile throughout. The tools changed along the way, and so did the kind of product.',
  paths: [
    {
      id: 'technology',
      label: 'The technology',
      steps: [
        { id: 'j2me', name: 'J2ME', note: 'Apps for feature phones, back in the day.' },
        {
          id: 'phonegap',
          name: 'PhoneGap',
          note: 'Hybrid apps: one web codebase on several platforms.',
        },
        { id: 'angular', name: 'Angular', note: 'Some early Angular for web applications.' },
        { id: 'react', name: 'React', note: 'Swiftly onto React, and I have stayed.' },
      ],
    },
    {
      id: 'products',
      label: 'The products',
      steps: [
        {
          id: 'brands',
          name: 'Brand sites and apps',
          note: 'Web and mobile work for consumer brands.',
        },
        {
          id: 'on-premise',
          name: 'On-premise platforms',
          note: 'Enterprise software installed and run by the customer.',
        },
        {
          id: 'saas',
          name: 'SaaS with CI/CD',
          note: 'Fully hosted platforms, shipped continuously.',
        },
        {
          id: 'one-platform',
          name: 'One cohesive platform',
          note: 'Many small services brought together into one.',
        },
      ],
    },
  ] satisfies TechPath[],
};

export const experience: ExperienceEntry[] = [
  {
    id: 'teamviewer',
    company: 'TeamViewer',
    title: 'Team Manager, Software Development',
    period: 'Jan 2025 to now',
    note: '1E became part of TeamViewer in 2025. Leading software development teams.',
  },
  {
    id: '1e-head',
    company: '1E',
    title: 'Head of UI Engineering',
    period: 'Jun 2024 to Sep 2025',
    note: 'UI strategy and front-end delivery through the move from on-premise to SaaS.',
  },
  {
    id: '1e-em',
    company: '1E',
    title: 'Engineering Manager, Front-End',
    period: 'May 2021 to Apr 2025',
    note: 'Managed and mentored the front-end team; aligned product, design and platform engineering.',
  },
  {
    id: '1e-senior',
    company: '1E',
    title: 'Senior Front-End Engineer',
    period: 'Apr 2020 to May 2021',
    note: 'Complex React applications, front-end standards and the design system.',
  },
  {
    id: 'melbourne',
    company: 'AKQA, Bliss Digital, Traffic',
    title: 'Front-End Developer (contract)',
    period: '2019',
    note: 'Agency contracts in Melbourne, building React applications for client brands.',
  },
  {
    id: '1e-dev',
    company: '1E',
    title: 'Front-End Developer',
    period: 'Sep 2016 to Oct 2018',
    note: 'Built the front end of Tachyon in React with design and product.',
  },
  {
    id: 'incentivated',
    company: 'Incentivated',
    title: 'Mobile and Web Developer, then Lead Front-End Developer',
    period: 'Apr 2010 to Aug 2016',
    note: 'Mobile and web products for well-known consumer brands; led a small team from 2013.',
  },
  {
    id: 'virtuacon',
    company: 'Virtuacon',
    title: 'Web Developer',
    period: 'Oct 2008 to Dec 2009',
    note: 'Websites and web applications, from design through to release.',
  },
];

export const contact = {
  title: 'Get in touch',
  body: 'I enjoy comparing notes with other people who care about the same things. Email or LinkedIn is the best way to reach me.',
};
