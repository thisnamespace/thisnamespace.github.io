import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import Journey from './Journey';
import { journey } from '../../data/content';

const meta = {
  title: 'Components/Features/Journey',
  component: Journey,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  args: { title: journey.title, body: journey.body, paths: journey.paths },
} satisfies Meta<typeof Journey>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const first = journey.paths[0];
    const path = within(canvas.getByTestId(`path-${first.id}`));
    await expect(path.getAllByRole('listitem')).toHaveLength(first.steps.length);
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};

/** Edge case: a single path still reads correctly. */
export const OnePath: Story = {
  args: { paths: journey.paths.slice(0, 1) },
};
