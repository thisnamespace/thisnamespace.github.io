import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import Hero from './Hero';

const meta = {
  title: 'Components/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify main heading is present
    const heading = canvas.getByRole('heading', { name: /engineering leader/i, level: 1 });
    await expect(heading).toBeInTheDocument();

    // Verify tagline is present
    await expect(
      canvas.getByRole('heading', { name: /building high-performing front end teams/i, level: 2 })
    ).toBeInTheDocument();

    // Verify social links exist
    const linkedinLink = canvas.getByRole('link', { name: /linkedin/i });
    const githubLink = canvas.getByRole('link', { name: /github/i });
    const emailLink = canvas.getByRole('link', { name: /email/i });

    await expect(linkedinLink).toBeInTheDocument();
    await expect(githubLink).toBeInTheDocument();
    await expect(emailLink).toBeInTheDocument();

    // Verify links open in new tab (external)
    await expect(linkedinLink).toHaveAttribute('target', '_blank');
    await expect(githubLink).toHaveAttribute('target', '_blank');
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
