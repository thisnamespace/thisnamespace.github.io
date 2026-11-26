import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import ExperienceTimeline from './ExperienceTimeline';
import { experience, profile } from '../../data/content';

const meta = {
  title: 'Components/Features/ExperienceTimeline',
  component: ExperienceTimeline,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  args: { entries: experience, linkedinUrl: profile.linkedin },
} satisfies Meta<typeof ExperienceTimeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByTestId('experience-entry')).toHaveLength(experience.length);
  },
};

export const RecentOnly: Story = {
  args: { entries: experience.slice(0, 3) },
};
