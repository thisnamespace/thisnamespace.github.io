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
  /** How AI fits at this stage, in one sentence. */
  change: string;
  /** The belief behind it, revealed when the stage is opened. */
  detail: string;
}

/** Something Michael cares about: a title and a couple of sentences. */
export interface Interest {
  id: string;
  title: string;
  body: string;
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

export interface ExperienceEntry {
  id: string;
  company: string;
  title: string;
  period: string;
  note: string;
}
