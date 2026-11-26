import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import LivingHeadline from './LivingHeadline';
import { profile } from '../../data/content';

const meta = {
  title: 'Components/Features/LivingHeadline',
  component: LivingHeadline,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: { text: profile.headline },
} satisfies Meta<typeof LivingHeadline>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Move the pointer over the headline: letters near it stay heavy, the rest thin out. */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const heading = within(canvasElement).getByRole('heading', { level: 1 });
    await expect(heading).toHaveAccessibleName(profile.headline);
  },
};

export const OneSentence: Story = {
  args: { text: 'Fast, clear products.' },
};

/** Edge case: text with no full stop is treated as a single line. */
export const NoPunctuation: Story = {
  args: { text: 'Front end is still home' },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};
