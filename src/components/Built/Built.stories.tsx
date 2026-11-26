import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import Built from './Built';
import { built } from '../../data/content';

const meta = {
  title: 'Components/Features/Built',
  component: Built,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  args: { title: built.title, items: built.items },
} satisfies Meta<typeof Built>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const list = within(within(canvasElement).getByTestId('built-list'));
    await expect(list.getAllByRole('listitem')).toHaveLength(built.items.length);
    for (const link of list.getAllByRole('link')) {
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  },
};

/** Edge case: one project should not stretch across both columns awkwardly. */
export const OneItem: Story = {
  args: { items: built.items.slice(0, 1) },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};
