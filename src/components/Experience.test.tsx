import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import userEvent from '@testing-library/user-event';
import Experience from './Experience';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Experience', () => {
  beforeEach(() => {
    // Mock window.matchMedia for useReducedMotion hook
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    // Mock IntersectionObserver for useScrollReveal hook
    global.IntersectionObserver = class IntersectionObserver {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    } as any;
  });

  it('should render the Experience section heading', () => {
    renderWithTheme(<Experience />);
    expect(screen.getByRole('heading', { name: /experience/i, level: 2 })).toBeInTheDocument();
  });

  it('should render current position with TeamViewer', () => {
    renderWithTheme(<Experience />);
    expect(screen.getByText('Team Manager: Software Development')).toBeInTheDocument();
    expect(screen.getByText('TeamViewer')).toBeInTheDocument();
    expect(screen.getByText('Jan 2025 - Present')).toBeInTheDocument();
  });

  it('should render all major companies', () => {
    renderWithTheme(<Experience />);

    // Check for key companies in career history
    expect(screen.getByText('TeamViewer')).toBeInTheDocument();
    expect(screen.getAllByText('1E').length).toBeGreaterThan(0); // Multiple positions at 1E
    expect(screen.getByText('AKQA')).toBeInTheDocument();
    expect(screen.getByText('Bliss Digital')).toBeInTheDocument();
    expect(screen.getAllByText('Incentivated').length).toBeGreaterThan(0); // Multiple positions
    expect(screen.getByText('Virtuacon')).toBeInTheDocument();
  });

  it('should display employment type chips', () => {
    renderWithTheme(<Experience />);

    // Check for employment type indicators
    const fullTimeChips = screen.getAllByText('Full-time');
    const contractChips = screen.getAllByText('Contract');

    expect(fullTimeChips.length).toBeGreaterThan(0);
    expect(contractChips.length).toBeGreaterThan(0);
  });

  it('should display location information', () => {
    renderWithTheme(<Experience />);

    expect(screen.getByText(/London Area, United Kingdom \(Remote\)/i)).toBeInTheDocument();
    // Multiple positions in Melbourne, use getAllByText
    const melbourneLocations = screen.getAllByText(/Melbourne, Victoria, Australia/i);
    expect(melbourneLocations.length).toBeGreaterThan(0);
  });

  it('should render job descriptions', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Experience />);

    // Click expanded button to show descriptions
    const expandedButton = screen.getByRole('button', { name: /expanded view/i });
    await user.click(expandedButton);

    // Check for key responsibilities
    expect(screen.getByText(/Spearheaded the UI strategy/i)).toBeInTheDocument();
    expect(screen.getByText(/Managed a team of front-end developers/i)).toBeInTheDocument();
  });

  it('should display skills for positions', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Experience />);

    // Click expanded button to show skills
    const expandedButton = screen.getByRole('button', { name: /expanded view/i });
    await user.click(expandedButton);

    // Check for key skills - use getAllByText since multiple positions may have same skills
    expect(screen.getAllByText(/React\.js/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Jira/i).length).toBeGreaterThan(0);
    // Storybook appears multiple times (skill and navigation)
    expect(screen.getAllByText(/Storybook/i).length).toBeGreaterThan(0);
  });

  it('should render multiple positions at the same company', () => {
    renderWithTheme(<Experience />);

    // 1E has 4 positions: Head of UI, Engineering Manager, Senior FE, FE Developer
    const oneEPositions = screen.getAllByText('1E');
    expect(oneEPositions.length).toBe(4);
  });

  it('should render leadership progression', () => {
    renderWithTheme(<Experience />);

    // Check career progression titles
    expect(screen.getByText(/Team Manager/i)).toBeInTheDocument();
    expect(screen.getByText(/Head of UI Engineering/i)).toBeInTheDocument();
    expect(screen.getByText(/Engineering Manager/i)).toBeInTheDocument();
    expect(screen.getByText(/Lead Front-End Developer/i)).toBeInTheDocument();
  });

  it('should have accessible structure with proper headings', () => {
    renderWithTheme(<Experience />);

    const mainHeading = screen.getByRole('heading', { name: /experience/i, level: 2 });
    expect(mainHeading).toBeInTheDocument();

    // All job titles should be h3 headings
    const jobHeadings = screen.getAllByRole('heading', { level: 3 });
    expect(jobHeadings.length).toBeGreaterThan(0);
  });

  it('should render experience section with correct id for navigation', () => {
    const { container } = renderWithTheme(<Experience />);
    const section = container.querySelector('#experience');
    expect(section).toBeInTheDocument();
  });
});
