import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import Projects from './Projects';

const meta = {
  title: 'Components/Projects',
  component: Projects,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Projects>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify section heading
    const heading = canvas.getByRole('heading', { name: /featured projects/i, level: 2 });
    await expect(heading).toBeInTheDocument();

    // Verify key projects are present
    await expect(canvas.getByText(/scrollobserver/i)).toBeInTheDocument();
    await expect(canvas.getByText(/tachyon - 1e/i)).toBeInTheDocument();
    await expect(canvas.getByText(/enterprise retail & travel/i)).toBeInTheDocument();
    await expect(canvas.getByText(/nhs digital solutions/i)).toBeInTheDocument();

    // Verify project links exist (GitHub buttons where available)
    const sourceCodeLinks = canvas.getAllByRole('link', { name: /source code/i });
    expect(sourceCodeLinks.length).toBeGreaterThan(0);

    // Verify all project links have correct attributes
    sourceCodeLinks.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
    });
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
