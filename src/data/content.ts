import type {
  CaseStudy,
  CraftFocus,
  ExperienceEntry,
  LoopStage,
  Principle,
  Profile,
  TechPath,
} from '../types';

/**
 * All site copy lives in this file.
 * Edit here to change wording; components only handle layout.
 */

export const profile: Profile = {
  name: 'Michael Day',
  role: 'Engineering leader',
  email: 'michael@thisnamespace.com',
  linkedin: 'https://www.linkedin.com/in/michael-day-0b194246',
  github: 'https://github.com/thisnamespace',
  siteUrl: 'https://thisnamespace.com',
  headline: 'Fast, clear products. AI adopted on purpose.',
  lead: 'I lead three software teams across multiple continents, and I care most about the front end: great user experiences and performance, on web and mobile. I am also the person who gets AI into how those teams design, build and ship, and who measures whether it paid off.',
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
      'Designers work in code with AI instead of static mock-ups, and build the first layer themselves.',
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

export const craft = {
  title: 'Front end is still home',
  body: 'I am passionate about front-end technology, and about two things in particular: great user experiences and performance. I have worked on web and mobile throughout, and followed the tools from J2ME handsets through PhoneGap hybrids and early Angular to React. The products changed along the way too: from brand sites and apps, to on-premise platforms, to fully SaaS platforms shipped through CI/CD, and then to one cohesive platform in place of many small services.',
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
          note: 'Microservices and modules brought together into a single monolith.',
        },
      ],
    },
  ] satisfies TechPath[],
  focus: [
    {
      id: 'experience',
      title: 'Experience first',
      body: 'To the person using it, the interface is the product. I push for clarity, accessibility and the small details that make something feel right.',
    },
    {
      id: 'performance',
      title: 'Performance is a feature',
      body: 'People feel a fast product before they notice anything else about it. I treat speed as a requirement, not something to polish at the end.',
    },
  ] satisfies CraftFocus[],
};

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

export const caseStudies: CaseStudy[] = [
  {
    slug: 'ai-adoption',
    area: 'AI adoption, at TeamViewer',
    title: 'Rolling out AI in an engineering department, and measuring it',
    summary:
      'Tools, practices and policy introduced together, with reporting that sets cost against what was delivered.',
    overview: [
      'Giving engineers an AI coding tool is the easy part. At TeamViewer, in one department working across the DEX enterprise platform, I rolled the tools out alongside the practices and policy that tell people when to reach for them. I also keep making the case for wider adoption across the organisation.',
      'The aim is smart use, not more use. Usage figures say how much AI a team consumes; they do not say what the business got for it. So I built reporting that sets what we spend on AI against the features it helped deliver, and I am taking that further, towards real-world conversions.',
    ],
    actions: [
      'Introduced AI coding tools to the engineers in my department.',
      'Set the practices and policy for AI-assisted work.',
      'Built reports that set AI cost against features delivered.',
      'Extended the measurement towards real-world conversions.',
      'Keep pushing for wider adoption across the organisation, judged on how well the tools are used.',
    ],
    takeaway:
      'Adoption is a leadership job, not a procurement one. The tools only pay off when people know where they help, the rules are clear, and somebody is checking the return.',
  },
  {
    slug: 'design-in-code',
    area: 'Design and engineering, at TeamViewer',
    title: 'A design team that builds the first layer',
    summary:
      'Designers moved from static design tools to designing in code with AI, so engineers start from something that already works.',
    overview: [
      'The handover from design to engineering is where product teams lose the most time. A static mock-up gets redrawn in code, and the detail that mattered gets lost along the way.',
      'I moved the design team from static design tools to designing in code with AI. They now design and build the first layer in code themselves, which gives engineering a working starting point and makes development both faster and better.',
    ],
    actions: [
      'Moved the design team from static design tools to designing in code with AI.',
      'Made code the shared medium between design and engineering.',
      'Had designers build the first layer of the interface themselves.',
      'Let engineers pick up from working code instead of a static mock-up.',
    ],
    takeaway:
      'When designers and engineers work in the same material, the handover stops being a translation step. That matters most in consumer products, where the small details are the product.',
  },
  {
    slug: 'agents-and-skills',
    area: 'Hands-on tooling, at TeamViewer',
    title: 'Agents, skills and the orchestration between them',
    summary:
      'Custom agents, reusable skills and the layers that coordinate them, built by me and not delegated.',
    overview: [
      'I do not ask teams to work in a way I have not worked myself. At TeamViewer I use AI heavily for my own coding and day-to-day tasks, and I build the pieces that make it useful at team scale.',
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
    area: 'Platform, at 1E and TeamViewer',
    title: 'On-premise to SaaS, then one cohesive platform',
    summary:
      'UI strategy and front-end delivery through 1E’s move from on-premise software to SaaS, then, at TeamViewer, microservices consolidated into a single platform.',
    overview: [
      'As Head of UI Engineering at 1E I led the UI strategy and front-end delivery while the product moved from on-premise installations to a fully SaaS platform shipped through CI/CD.',
      'I owned the architectural direction of the core UI systems and component libraries, and kept product, design and platform engineering pulling in the same direction while the ground moved under them.',
      'After 1E became part of TeamViewer, I took the platform from a spread of microservices and modules to one cohesive platform: a monolith on Postgres and Redis, so there is one system to build on, ship and run.',
    ],
    actions: [
      'Led UI strategy and front-end delivery through the transition.',
      'Owned the architecture of the core UI systems and component libraries.',
      'At TeamViewer, took the SaaS platform from microservices and modules to one cohesive monolith on Postgres and Redis.',
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
    note: '1E became part of TeamViewer in 2025. I manage three teams across multiple continents, in one department working across the DEX enterprise platform.',
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
  body: 'I enjoy comparing notes with other people working out how AI fits into the way software gets built. Email or LinkedIn is the best way to reach me.',
};

export const findCaseStudy = (slug: string | undefined): CaseStudy | undefined =>
  caseStudies.find((study) => study.slug === slug);
