import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import Skills from './Skills';

const meta = {
  title: 'Components/Skills',
  component: Skills,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Skills>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify section heading
    const heading = canvas.getByRole('heading', { name: /skills & expertise/i, level: 2 });
    await expect(heading).toBeInTheDocument();

    // Verify skill categories are present
    await expect(canvas.getByText(/frontend technologies/i)).toBeInTheDocument();
    await expect(canvas.getByText(/engineering leadership/i)).toBeInTheDocument();
    await expect(canvas.getByText(/architecture & strategy/i)).toBeInTheDocument();

    // Verify some key skills exist
    await expect(canvas.getByText('React')).toBeInTheDocument();
    await expect(canvas.getByText('TypeScript')).toBeInTheDocument();
    await expect(canvas.getByText(/team building/i)).toBeInTheDocument();
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
