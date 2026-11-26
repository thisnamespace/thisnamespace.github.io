import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource-variable/bricolage-grotesque';
import '@fontsource-variable/source-serif-4';
import App from './App.tsx';
import './index.css';

// A hello for anyone who opens the console.
// eslint-disable-next-line no-console -- deliberate greeting, not debug output
console.info(
  '%c[ ··· ] thisnamespace',
  'font-weight:700;color:#0E5C6B',
  '\nHello. Press ? on the page for keyboard shortcuts. The source is on GitHub: github.com/thisnamespace'
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
