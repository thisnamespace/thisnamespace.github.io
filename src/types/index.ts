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
