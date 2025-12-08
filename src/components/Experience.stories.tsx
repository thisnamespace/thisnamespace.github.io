import type { Meta, StoryObj } from '@storybook/react';
import { expect, within, userEvent } from '@storybook/test';
import Experience from './Experience';

const meta = {
  title: 'Components/Experience',
  component: Experience,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Experience>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify section heading
    const heading = canvas.getByRole('heading', { name: /experience/i, level: 2 });
    await expect(heading).toBeInTheDocument();

    // Verify view mode toggle exists
    const minimizedButton = canvas.getByRole('button', { name: /minimized view/i });
    const expandedButton = canvas.getByRole('button', { name: /expanded view/i });
    await expect(minimizedButton).toBeInTheDocument();
    await expect(expandedButton).toBeInTheDocument();

    // Verify current position is displayed
    await expect(canvas.getByText(/team manager: software development/i)).toBeInTheDocument();
    await expect(canvas.getByText(/teamviewer/i)).toBeInTheDocument();
  },
};

export const ExpandedView: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click expanded button
    const expandedButton = canvas.getByRole('button', { name: /expanded view/i });
    await user.click(expandedButton);

    // Wait for animation/transition
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Verify job descriptions are visible
    await expect(canvas.getByText(/driving technical strategy/i)).toBeInTheDocument();

    // Verify skills are visible (multiple instances exist)
    const communicationSkills = canvas.getAllByText(/communication/i);
    expect(communicationSkills.length).toBeGreaterThan(0);
    const reactSkills = canvas.getAllByText(/react\.js/i);
    expect(reactSkills.length).toBeGreaterThan(0);
  },
};

export const LightMode: Story = {
  parameters: {
    backgrounds: { default: 'light' },
  },
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
