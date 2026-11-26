import { describe, expect, it } from 'vitest';
import {
  away,
  built,
  clients,
  experience,
  interests,
  journey,
  loopStages,
  profile,
} from './content';

const ids = (items: { id: string }[]) => items.map((item) => item.id);
const isUnique = (values: string[]) => new Set(values).size === values.length;

describe('site content', () => {
  it('has unique ids wherever items are rendered as lists', () => {
    expect(isUnique(ids(loopStages))).toBe(true);
    expect(isUnique(ids(interests.items))).toBe(true);
    expect(isUnique(ids(experience))).toBe(true);
    expect(isUnique(ids(journey.paths))).toBe(true);
    journey.paths.forEach((path) => expect(isUnique(ids(path.steps))).toBe(true));
    expect(isUnique(clients.names)).toBe(true);
    expect(isUnique(ids(built.items))).toBe(true);
    expect(isUnique(ids(away.places))).toBe(true);
    expect(isUnique(away.places.flatMap((group) => group.names))).toBe(true);
  });

  it('gives every built item at least one secure link', () => {
    built.items.forEach((item) => {
      expect(item.links.length).toBeGreaterThan(0);
      item.links.forEach((link) => expect(link.href).toMatch(/^https:\/\//));
    });
  });

  it('gives every interest a title and a body', () => {
    interests.items.forEach((item) => {
      expect(item.title).not.toBe('');
      expect(item.body).not.toBe('');
    });
  });

  it('keeps private detail off the site', () => {
    const everything = JSON.stringify({
      profile,
      loopStages,
      interests,
      journey,
      experience,
      built,
      away,
    });

    // Decided on 27 Nov 2026: no team sizes and no technology stack names.
    expect(everything).not.toMatch(/\b30 people\b/i);
    expect(everything).not.toMatch(/postgres|redis/i);
  });

  it('uses a contact address on the site domain', () => {
    expect(profile.email).toMatch(/@thisnamespace\.com$/);
  });
});
