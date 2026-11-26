import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource-variable/bricolage-grotesque';
import '@fontsource-variable/source-serif-4';
import './styles/site.css';
import App, { type PageName } from './App';

const container = document.getElementById('root')!;
const prebuiltPage = container.dataset.page as PageName | undefined;

// Old case study addresses redirect on the server; this covers the dev server.
if (!prebuiltPage && window.location.pathname.startsWith('/work/')) {
  window.location.replace('/');
}

const page: PageName = prebuiltPage ?? (window.location.pathname === '/' ? 'home' : 'not-found');

const app = (
  <StrictMode>
    <App page={page} />
  </StrictMode>
);

if (prebuiltPage) {
  // The HTML is already there from the build. Attach behaviour to it.
  hydrateRoot(container, app);
} else {
  // Dev server: nothing is pre-built, so render from scratch.
  if (page === 'not-found') {
    document.title = 'Page not found | Michael Day';
  }
  createRoot(container).render(app);
}

// A hello for anyone who opens the console.
// eslint-disable-next-line no-console -- deliberate greeting, not debug output
console.info(
  '%c[ ··· ] thisnamespace',
  'font-weight:700;color:#0E5C6B',
  '\nHello. Press ? on the page for keyboard shortcuts. The source is on GitHub: github.com/thisnamespace'
);
