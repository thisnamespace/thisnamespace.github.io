/* global console */
// Turns the two pages into HTML files after `vite build`.
//   dist/index.html  the home page
//   dist/404.html    served by `serve` for any address that does not exist
import { readFile, writeFile, rm } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const serverEntry = path.join(root, 'dist-ssr', 'entry-server.js');

const { render, preloadFonts } = await import(pathToFileURL(serverEntry).href);
const template = await readFile(path.join(dist, 'index.html'), 'utf8');

const EMPTY_ROOT = '<div id="root"></div>';
if (!template.includes(EMPTY_ROOT)) {
  throw new Error(`index.html must contain ${EMPTY_ROOT} for the pages to be inserted into.`);
}

// Put the stylesheet in the page itself. It is about 5 kB compressed, and inlining it
// saves the round trip that would otherwise hold up the first paint.
const stylesheetTag = template.match(/<link rel="stylesheet"[^>]*href="([^"]+\.css)"[^>]*>/);
if (!stylesheetTag) {
  throw new Error('Could not find the stylesheet link in index.html.');
}
const css = await readFile(path.join(dist, stylesheetTag[1]), 'utf8');
const inlineStyles = `<style>${css}</style>`;

const preloads = preloadFonts
  .map((href) => `<link rel="preload" href="${href}" as="font" type="font/woff2" crossorigin />`)
  .join('\n    ');

const build = (page, { title, noindex = false } = {}) => {
  let html = template
    .replace(stylesheetTag[0], () => inlineStyles)
    .replace(EMPTY_ROOT, () => `<div id="root" data-page="${page}">${render(page)}</div>`)
    .replace('</title>', `</title>\n    ${preloads}`);
  if (title) {
    html = html.replace(/<title>.*?<\/title>/s, `<title>${title}</title>`);
  }
  if (noindex) {
    html = html.replace('content="index, follow"', 'content="noindex"');
  }
  return html;
};

await writeFile(path.join(dist, 'index.html'), build('home'));
await writeFile(
  path.join(dist, '404.html'),
  build('not-found', { title: 'Page not found | Michael Day', noindex: true })
);
await rm(path.join(root, 'dist-ssr'), { recursive: true, force: true });

console.log('Pre-built dist/index.html and dist/404.html');
