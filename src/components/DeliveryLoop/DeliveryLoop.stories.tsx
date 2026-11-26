import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import DeliveryLoop from './DeliveryLoop';
import { loopIntro, loopStages } from '../../data/content';

const meta = {
  title: 'Components/Features/DeliveryLoop',
  component: DeliveryLoop,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: { title: loopIntro.title, stages: loopStages, closing: loopIntro.closing },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 460 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DeliveryLoop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByRole('listitem')).toHaveLength(loopStages.length);
  },
};

/** Edge case: a loop with only two stages still reads correctly. */
export const TwoStages: Story = {
  args: { stages: loopStages.slice(0, 2) },
};

/** Edge case: long stage copy wraps inside the brackets. */
export const LongCopy: Story = {
  args: {
    stages: loopStages.map((stage) => ({
      ...stage,
      change: `${stage.change} ${stage.change}`,
    })),
  },
};
