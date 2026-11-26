import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import Interests from './Interests';
import { interests } from '../../data/content';

const meta = {
  title: 'Components/Features/Interests',
  component: Interests,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  args: { title: interests.title, items: interests.items },
} satisfies Meta<typeof Interests>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const list = within(within(canvasElement).getByTestId('interest-list'));
    await expect(list.getAllByRole('listitem')).toHaveLength(interests.items.length);
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};

/** Edge case: an odd number of items leaves a gap in the last row without breaking the grid. */
export const FourItems: Story = {
  args: { items: interests.items.slice(0, 4) },
};
