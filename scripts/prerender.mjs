/* global console */
// Turns the two pages into HTML files after `vite build`, and writes the web server's config.
//   dist/index.html    the home page
//   dist/404.html      served by `serve` for any address that does not exist
//   serve.build.json   serve.config.json plus a Content-Security-Policy made for this build
import { createHash } from 'node:crypto';
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

const pages = {
  'index.html': build('home'),
  '404.html': build('not-found', { title: 'Page not found | Michael Day', noindex: true }),
};
for (const [file, html] of Object.entries(pages)) {
  await writeFile(path.join(dist, file), html);
}
await rm(path.join(root, 'dist-ssr'), { recursive: true, force: true });

// The policy only lets the browser run scripts that are in this build. Inline scripts are
// allowed by the hash of their exact text, so a change to one changes the policy with it.
// Data blocks such as JSON-LD are never run, so they need no entry.
const inlineScriptHashes = new Set();
for (const html of Object.values(pages)) {
  for (const [, attributes, body] of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/\bsrc=/.test(attributes) || /type="application\/(ld\+)?json"/.test(attributes)) continue;
    inlineScriptHashes.add(`'sha256-${createHash('sha256').update(body).digest('base64')}'`);
  }
}

// static.cloudflareinsights.com and cloudflareinsights.com are Cloudflare Web Analytics.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' ${[...inlineScriptHashes].join(' ')} https://static.cloudflareinsights.com`,
  // Inline styles: the stylesheet is put in the page, and list items carry a --i variable.
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self' https://cloudflareinsights.com",
  "manifest-src 'self'",
  "base-uri 'self'",
  "form-action 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
].join('; ');

const serveConfig = JSON.parse(await readFile(path.join(root, 'serve.config.json'), 'utf8'));
const everyResponse = serveConfig.headers.find((rule) => rule.source === '**');
if (!everyResponse) {
  throw new Error('serve.config.json needs a headers rule with source "**".');
}
everyResponse.headers.push({ key: 'Content-Security-Policy', value: contentSecurityPolicy });
await writeFile(path.join(root, 'serve.build.json'), `${JSON.stringify(serveConfig, null, 2)}\n`);

console.log('Pre-built dist/index.html and dist/404.html, and wrote serve.build.json');
