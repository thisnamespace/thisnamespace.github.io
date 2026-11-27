import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import App from '../../App';
import charset from './charset.json';

const ranges = charset.ranges.map(([start, end]) => [parseInt(start, 16), parseInt(end, 16)]);
const inCharset = (character: string) => {
  const code = character.codePointAt(0)!;
  return ranges.some(([start, end]) => code >= start && code <= end);
};

/** The words a visitor reads, without tags, attributes or entities. */
const visibleText = (page: 'home' | 'not-found') => {
  const holder = document.createElement('div');
  holder.innerHTML = renderToStaticMarkup(<App page={page} />);
  holder.querySelectorAll('script, style').forEach((node) => node.remove());
  return holder.textContent ?? '';
};

describe('trimmed fonts', () => {
  it.each(['home', 'not-found'] as const)('have every character the %s page shows', (page) => {
    const missing = [...new Set(visibleText(page))].filter(
      (character) => !/\s/.test(character) && !inCharset(character)
    );
    // If this fails, add the characters to charset.json and run scripts/subset-fonts.py.
    expect(missing).toEqual([]);
  });

  it('declares the same character ranges in fonts.css as in charset.json', () => {
    const expected = charset.ranges
      .map(([start, end]) => (start === end ? `U+${start}` : `U+${start}-${end}`))
      .join(', ');
    // Read from disk: the test runner replaces imported stylesheets with nothing.
    const fontsCss = readFileSync('src/styles/fonts.css', 'utf8');
    const declared = [...fontsCss.matchAll(/unicode-range:\s*([^;]+);/g)].map((match) =>
      match[1].replace(/\s+/g, ' ').trim()
    );
    expect(declared).toEqual([expected, expected]);
  });
});
