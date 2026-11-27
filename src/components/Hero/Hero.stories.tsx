import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import Hero from './Hero';
import { profile } from '../../data/content';

const meta = {
  title: 'Components/Features/Hero',
  component: Hero,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // The headline is split into letters for the animation; its accessible name is the sentence.
    await expect(
      canvas.getByRole('heading', { level: 1, name: profile.headline })
    ).toBeInTheDocument();
    await expect(canvas.getByRole('link', { name: 'Get in touch' })).toHaveAttribute(
      'href',
      '#contact'
    );
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};
