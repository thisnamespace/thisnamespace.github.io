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

/** Something Michael made, with links to it. */
export interface BuiltItem {
  id: string;
  name: string;
  body: string;
  links: { label: string; href: string }[];
}

/** A group of places, such as countries worked in. */
export interface PlaceGroup {
  id: string;
  label: string;
  names: string[];
}

/** Optional portrait for the "away from work" section. */
export interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  title: string;
  period: string;
  note: string;
}
