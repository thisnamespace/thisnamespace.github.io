import type { Preview } from '@storybook/react';
import { ThemeProvider } from '../src/contexts/ThemeContext';
import { withTheme } from './withTheme';
import '../src/styles/fonts.css';
import '../src/styles/site.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
    },
    backgrounds: {
      disable: true, // Disable default backgrounds since we're using our theme
    },
    layout: 'fullscreen',
    options: {
      storySort: {
        order: ['Components', ['Layout', 'Features'], 'Pages'],
      },
    },
    docs: {
      toc: true,
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ minHeight: '100vh' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
    withTheme,
  ],
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'system',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
          { value: 'system', icon: 'browser', title: 'System' },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
