import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import About from './About';

const meta = {
  title: 'Components/About',
  component: About,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof About>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify section heading
    const heading = canvas.getByRole('heading', { name: /about me/i, level: 2 });
    await expect(heading).toBeInTheDocument();

    // Verify all highlight cards are present
    await expect(
      canvas.getByRole('heading', { name: /team leadership/i, level: 3 })
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('heading', { name: /technical strategy/i, level: 3 })
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('heading', { name: /cross-functional impact/i, level: 3 })
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('heading', { name: /innovation & scale/i, level: 3 })
    ).toBeInTheDocument();

    // Verify main content
    await expect(canvas.getByText(/engineering leader/i)).toBeInTheDocument();
    await expect(canvas.getByText(/react, typescript/i)).toBeInTheDocument();
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
