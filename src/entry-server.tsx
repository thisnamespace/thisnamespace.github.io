import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App, { type PageName } from './App';
import bricolageUrl from './assets/fonts/bricolage-grotesque.woff2?url';
import sourceSerifUrl from './assets/fonts/source-serif-4.woff2?url';

/** Fonts every visitor needs straight away, for preload links in the page head. */
export const preloadFonts = [bricolageUrl, sourceSerifUrl];

/** Renders one page to an HTML string at build time. */
export const render = (page: PageName): string =>
  renderToString(
    <StrictMode>
      <App page={page} />
    </StrictMode>
  );
