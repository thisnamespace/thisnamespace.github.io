import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { MemoryRouter } from 'react-router-dom';
import Hero from './Hero';
import { profile } from '../../data/content';

const meta = {
  title: 'Components/Features/Hero',
  component: Hero,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', { level: 1 })).toHaveTextContent(profile.headline);
    await expect(canvas.getByRole('link', { name: 'Email me' })).toHaveAttribute(
      'href',
      `mailto:${profile.email}`
    );
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};
