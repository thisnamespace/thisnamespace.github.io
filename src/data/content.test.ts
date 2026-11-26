import { describe, expect, it } from 'vitest';
import { caseStudies, experience, findCaseStudy, loopStages } from './content';

describe('site content', () => {
  it('gives every case study a unique, URL-safe slug', () => {
    const slugs = caseStudies.map((study) => study.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((slug) => expect(slug).toMatch(/^[a-z0-9-]+$/));
  });

  it('gives every case study the content the page needs', () => {
    caseStudies.forEach((study) => {
      expect(study.title).not.toBe('');
      expect(study.summary).not.toBe('');
      expect(study.overview.length).toBeGreaterThan(0);
      expect(study.actions.length).toBeGreaterThan(0);
      expect(study.takeaway).not.toBe('');
    });
  });

  it('finds a case study by slug and returns undefined for unknown slugs', () => {
    expect(findCaseStudy(caseStudies[0].slug)).toBe(caseStudies[0]);
    expect(findCaseStudy('does-not-exist')).toBeUndefined();
    expect(findCaseStudy(undefined)).toBeUndefined();
  });

  it('has unique ids for loop stages and experience entries', () => {
    const stageIds = loopStages.map((stage) => stage.id);
    const entryIds = experience.map((entry) => entry.id);
    expect(new Set(stageIds).size).toBe(stageIds.length);
    expect(new Set(entryIds).size).toBe(entryIds.length);
  });
});
