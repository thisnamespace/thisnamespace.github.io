/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
// The production build swaps React for Preact, which offers the same API at a quarter of the
// size: 18 kB of script for visitors in place of 71 kB. The build script sets PREACT=1.
// The dev server, unit tests and Storybook keep React, for its warnings and dev tools; the
// Playwright tests run against the Preact build, so what visitors get is what gets tested.
const preactAliases = {
  'react/jsx-runtime': 'preact/jsx-runtime',
  'react/jsx-dev-runtime': 'preact/jsx-dev-runtime',
  'react-dom/client': 'preact/compat/client',
  'react-dom/server': 'preact/compat/server',
  'react-dom': 'preact/compat',
  react: 'preact/compat',
};

export default defineConfig({
  plugins: [react()],
  resolve: { alias: process.env.PREACT === '1' ? preactAliases : {} },
  ssr: process.env.PREACT === '1' ? { noExternal: true } : {},
  define: {
    // Fixed at build time so the pre-built HTML and the browser render the same year.
    __BUILD_YEAR__: new Date().getFullYear(),
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        'dist/**',
        '**/*.stories.tsx',
        '**/*.config.*',
        '**/vitest.setup.ts',
        '.storybook/**',
      ],
    },
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          include: ['src/**/*.{test,spec}.{ts,tsx}'],
          exclude: ['**/*.stories.{test,spec}.{ts,tsx}'],
        },
      },
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
});
