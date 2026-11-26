import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App, { type PageName } from './App';
import bricolageUrl from '@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2?url';
import sourceSerifUrl from '@fontsource-variable/source-serif-4/files/source-serif-4-latin-wght-normal.woff2?url';

/** Fonts every visitor needs straight away, for preload links in the page head. */
export const preloadFonts = [bricolageUrl, sourceSerifUrl];

/** Renders one page to an HTML string at build time. */
export const render = (page: PageName): string =>
  renderToString(
    <StrictMode>
      <App page={page} />
    </StrictMode>
  );
