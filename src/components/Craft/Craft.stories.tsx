import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import Craft from './Craft';
import { craft } from '../../data/content';

const meta = {
  title: 'Components/Features/Craft',
  component: Craft,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  args: {
    title: craft.title,
    body: craft.body,
    paths: craft.paths,
    focus: craft.focus,
  },
} satisfies Meta<typeof Craft>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const first = craft.paths[0];
    const path = within(canvas.getByTestId(`path-${first.id}`));
    await expect(path.getAllByRole('listitem')).toHaveLength(first.steps.length);
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};

/** Edge case: a single path still reads correctly. */
export const OnePath: Story = {
  args: { paths: craft.paths.slice(0, 1) },
};
