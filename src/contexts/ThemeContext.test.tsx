import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useThemeContext } from './ThemeContext';
import { Button } from '@mui/material';

// Test component that uses the theme context
const TestComponent = () => {
  const { mode, themePreference, setThemePreference } = useThemeContext();

  return (
    <div>
      <div data-testid="mode">{mode}</div>
      <div data-testid="preference">{themePreference}</div>
      <Button onClick={() => setThemePreference('light')}>Set Light</Button>
      <Button onClick={() => setThemePreference('dark')}>Set Dark</Button>
      <Button onClick={() => setThemePreference('system')}>Set System</Button>
    </div>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => true,
      }),
    });
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should default to system preference', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('preference')).toHaveTextContent('system');
    expect(screen.getByTestId('mode')).toHaveTextContent('dark'); // matchMedia mocked to dark
  });

  it('should switch to light mode', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await user.click(screen.getByText('Set Light'));

    await waitFor(() => {
      expect(screen.getByTestId('preference')).toHaveTextContent('light');
      expect(screen.getByTestId('mode')).toHaveTextContent('light');
    });
  });

  it('should switch to dark mode', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await user.click(screen.getByText('Set Dark'));

    await waitFor(() => {
      expect(screen.getByTestId('preference')).toHaveTextContent('dark');
      expect(screen.getByTestId('mode')).toHaveTextContent('dark');
    });
  });

  it('should persist theme preference in localStorage', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await user.click(screen.getByText('Set Light'));

    await waitFor(() => {
      expect(localStorage.getItem('themePreference')).toBe('light');
    });
  });

  it('should load theme preference from localStorage', () => {
    localStorage.setItem('themePreference', 'dark');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('preference')).toHaveTextContent('dark');
    expect(screen.getByTestId('mode')).toHaveTextContent('dark');
  });

  it('should revert to system when system preference is selected', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // First set to light
    await user.click(screen.getByText('Set Light'));
    await waitFor(() => {
      expect(screen.getByTestId('mode')).toHaveTextContent('light');
    });

    // Then set back to system
    await user.click(screen.getByText('Set System'));
    await waitFor(() => {
      expect(screen.getByTestId('preference')).toHaveTextContent('system');
      expect(screen.getByTestId('mode')).toHaveTextContent('dark'); // matchMedia mocked to dark
    });
  });
});
