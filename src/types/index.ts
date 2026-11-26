export interface Profile {
  name: string;
  role: string;
  email: string;
  linkedin: string;
  github: string;
  siteUrl: string;
  headline: string;
  lead: string;
}

/** One stage of the delivery loop shown in the hero. */
export interface LoopStage {
  id: string;
  name: string;
  /** What changed at this stage, in one sentence. */
  change: string;
}

/** One step in a path. */
export interface TechStep {
  id: string;
  name: string;
  note: string;
}

/** A named sequence of steps, such as the technologies or kinds of product worked on. */
export interface TechPath {
  id: string;
  label: string;
  steps: TechStep[];
}

export interface CraftFocus {
  id: string;
  title: string;
  body: string;
}

export interface CaseStudy {
  /** URL segment: /work/:slug */
  slug: string;
  /** Short description of the kind of work, shown beside the title. */
  area: string;
  title: string;
  summary: string;
  overview: string[];
  actions: string[];
  takeaway: string;
}

export interface Principle {
  id: string;
  title: string;
  body: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  title: string;
  period: string;
  note: string;
}
