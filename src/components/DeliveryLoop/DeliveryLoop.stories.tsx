import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import DeliveryLoop from './DeliveryLoop';
import { loopIntro, loopStages } from '../../data/content';

const meta = {
  title: 'Components/Features/DeliveryLoop',
  component: DeliveryLoop,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    title: loopIntro.title,
    stages: loopStages,
    closing: loopIntro.closing,
    runLabel: loopIntro.runLabel,
    rerunLabel: loopIntro.rerunLabel,
    stopLabel: loopIntro.stopLabel,
  },
  argTypes: {
    stepMs: { control: { type: 'range', min: 200, max: 3000, step: 100 } },
  },
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

/** Opening a stage reveals the belief behind it; opening another closes the first. */
export const StageOpen: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const build = canvas.getByTestId('loop-stage-build');
    await userEvent.click(build);
    await expect(build).toHaveAttribute('aria-expanded', 'true');
    await expect(canvas.getByText(loopStages[1].detail)).toBeVisible();
  },
};

/** Running the loop steps through every stage and offers to run again. */
export const Running: Story = {
  args: { stepMs: 300 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId('loop-run'));
    await expect(canvas.getByTestId('loop-run')).toHaveTextContent(loopIntro.stopLabel);
    await expect(
      await canvas.findByText(loopIntro.rerunLabel, {}, { timeout: 4000 })
    ).toBeVisible();
  },
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
