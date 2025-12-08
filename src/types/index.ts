export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  link?: string;
  github?: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  location?: string;
  employmentType?: string;
  description: string[];
  skills?: string[];
  current?: boolean;
}
