import type { CaseStudy, ExperienceEntry, LoopStage, Principle, Profile } from '../types';

/**
 * All site copy lives in this file.
 * Edit here to change wording; components only handle layout.
 */

export const profile: Profile = {
  name: 'Michael Day',
  role: 'Engineering leader',
  email: 'info@thisnamespace.com',
  linkedin: 'https://www.linkedin.com/in/michael-day-0b194246',
  github: 'https://github.com/thisnamespace',
  siteUrl: 'https://thisnamespace.com',
  headline: 'AI in engineering, adopted on purpose.',
  lead: 'I lead software teams, and I am the person who gets AI into how they design, build and ship. Then I measure whether it paid off: what it cost against the features it delivered, and what reached customers.',
};

export const loopIntro = {
  title: 'Where AI sits in my teams’ delivery loop',
  closing: 'What the measurements show shapes the next round.',
};

export const loopStages: LoopStage[] = [
  {
    id: 'design',
    name: 'Design',
    change:
      'Designers work in code with Claude instead of Figma, and build the first layer themselves.',
  },
  {
    id: 'build',
    name: 'Build',
    change:
      'AI coding tools across the team, with agents, skills and orchestration written for our own work.',
  },
  {
    id: 'review',
    name: 'Review',
    change: 'Shared practices and policy for AI-assisted work, so quality holds as usage grows.',
  },
  {
    id: 'measure',
    name: 'Measure',
    change:
      'Reports on cost against features delivered, followed through to real-world conversions.',
  },
];

export const clients = {
  title: 'Products people use every day',
  body: 'I started as a developer in 2008 and spent years building for consumer brands before leading teams on enterprise software. That is where my attention to the person on the other side of the screen comes from.',
  names: [
    'TeamViewer',
    '1E',
    'AKQA',
    'Gatwick Airport',
    'Tesco',
    'Waitrose',
    'Virgin Holidays',
    'NHS',
    'Mitsubishi Motors',
    'Peroni',
  ],
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'ai-adoption',
    area: 'AI adoption',
    title: 'Rolling out AI across engineering, and measuring it',
    summary:
      'Tools, practices and policy introduced together, with reporting that sets cost against what was delivered.',
    overview: [
      'Giving engineers an AI coding tool is the easy part. I rolled the tools out alongside the practices and policy that tell people when to reach for them, and I keep pushing adoption across the wider organisation.',
      'The aim is smart use, not more use. Usage figures say how much AI a team consumes; they do not say what the business got for it. So I built reporting that sets what we spend on AI against the features it helped deliver, and I am taking that further, towards real-world conversions.',
    ],
    actions: [
      'Introduced AI coding tools to the engineering team.',
      'Set the practices and policy for AI-assisted work.',
      'Built reports that set AI cost against features delivered.',
      'Extended the measurement towards real-world conversions.',
      'Kept raising adoption across the organisation, judged on how well the tools are used.',
    ],
    takeaway:
      'Adoption is a leadership job, not a procurement one. The tools only pay off when people know where they help, the rules are clear, and somebody is checking the return.',
  },
  {
    slug: 'design-in-code',
    area: 'Design and engineering',
    title: 'A design team that builds the first layer',
    summary:
      'Designers moved from Figma to Claude and now design in code, so engineers start from something that already works.',
    overview: [
      'The handover from design to engineering is where product teams lose the most time. A static mock-up gets redrawn in code, and the detail that mattered gets lost along the way.',
      'I moved the design team from Figma to designing with Claude. They now design and build the first layer in code themselves, which gives engineering a working starting point and makes development both faster and better.',
    ],
    actions: [
      'Moved the design team from Figma to designing with Claude.',
      'Made code the shared medium between design and engineering.',
      'Had designers build the first layer of the interface themselves.',
      'Let engineers pick up from working code instead of a static mock-up.',
    ],
    takeaway:
      'When designers and engineers work in the same material, the handover stops being a translation step. That matters most in consumer products, where the small details are the product.',
  },
  {
    slug: 'agents-and-skills',
    area: 'Hands-on tooling',
    title: 'Agents, skills and the orchestration between them',
    summary:
      'Custom agents, reusable skills and the layers that coordinate them, built by me and not delegated.',
    overview: [
      'I do not ask teams to work in a way I have not worked myself. I use AI heavily for my own coding and day-to-day tasks, and I build the pieces that make it useful at team scale.',
      'That means agents for specific jobs, skills that capture how we do things so they can be reused, and orchestration layers that coordinate them across multi-step work.',
    ],
    actions: [
      'Created agents for specific engineering tasks.',
      'Wrote reusable skills that package how the team works.',
      'Built orchestration layers to coordinate agents across longer pieces of work.',
      'Use AI daily for my own coding and management work.',
    ],
    takeaway:
      'A leader who builds with these tools can tell a real gain from a demo. That judgement is what turns AI enthusiasm into a sensible plan.',
  },
  {
    slug: 'on-premise-to-saas',
    area: 'Platform, at 1E',
    title: 'Taking an on-premise product to SaaS',
    summary:
      'UI strategy and front-end delivery through 1E’s move from on-premise software to SaaS.',
    overview: [
      'As Head of UI Engineering at 1E I led the UI strategy and front-end delivery while the product moved from on-premise installations to SaaS.',
      'I owned the architectural direction of the core UI systems and component libraries, and kept product, design and platform engineering pulling in the same direction while the ground moved under them.',
    ],
    actions: [
      'Led UI strategy and front-end delivery through the transition.',
      'Owned the architecture of the core UI systems and component libraries.',
      'Aligned product, design and platform engineering.',
      'Managed and mentored the front-end engineers doing the work.',
    ],
    takeaway:
      'A platform move is a people problem as much as an architecture one. Shared components and a clear direction let teams keep shipping while everything else changes.',
  },
];

export const approach = {
  title: 'How I lead',
  principles: [
    {
      id: 'smart-use',
      title: 'Smart use beats more use',
      body: 'I judge AI adoption on what it changes, not on how many people have a licence. Some work gets much better with it. Some does not, and saying so is part of the job.',
    },
    {
      id: 'measure',
      title: 'If it is not measured, it is a hunch',
      body: 'Cost on one side, features delivered on the other, and customer outcomes as the real test. That is the report I want before I ask for more budget.',
    },
    {
      id: 'hands-on',
      title: 'Leaders should use the tools',
      body: 'I build agents and skills myself and code with AI every day. It keeps my judgement honest and my advice specific.',
    },
    {
      id: 'people',
      title: 'People first, still',
      body: 'Mentoring, career development and clear expectations are what make a team good. AI raises what a good team can do; it does not replace having one.',
    },
  ] satisfies Principle[],
};

export const experience: ExperienceEntry[] = [
  {
    id: 'teamviewer',
    company: 'TeamViewer',
    title: 'Team Manager, Software Development',
    period: 'Jan 2025 to now',
    note: 'Leading a software development team; technical strategy and team development.',
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
  title: 'Talk to me about your engineering organisation',
  body: 'I am interested in conversations about leading engineering in consumer products, and about making AI a working part of how software gets built.',
};

export const findCaseStudy = (slug: string | undefined): CaseStudy | undefined =>
  caseStudies.find((study) => study.slug === slug);
