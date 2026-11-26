import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import PageSpeed from './PageSpeed';
import { pageSpeed } from '../../data/content';

const meta = {
  title: 'Components/Features/PageSpeed',
  component: PageSpeed,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  args: {
    title: pageSpeed.title,
    note: pageSpeed.note,
    labels: pageSpeed.labels,
    unavailable: pageSpeed.unavailable,
    cached: pageSpeed.cached,
    metrics: { loadMs: 640, paintMs: 820, layoutShift: 0, transferBytes: 214_000, settled: true },
  },
} satisfies Meta<typeof PageSpeed>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId('metric-load')).toHaveTextContent('0.64 s');
    await expect(canvas.getByTestId('metric-weight')).toHaveTextContent('214 kB');
  },
};

/** Before the page has finished loading, values show as pending. */
export const Loading: Story = {
  args: { metrics: { settled: false } },
};

/** A browser that reports load time only: the rest say so plainly. */
export const PartialSupport: Story = {
  args: { metrics: { loadMs: 910, transferBytes: 198_000, settled: true } },
};

/** A repeat visit where everything came from the browser cache. */
export const FromCache: Story = {
  args: { metrics: { loadMs: 120, paintMs: 180, layoutShift: 0, transferBytes: 0, settled: true } },
};

/** A slow connection: seconds show one decimal place past ten seconds. */
export const Slow: Story = {
  args: {
    metrics: {
      loadMs: 12_400,
      paintMs: 6_300,
      layoutShift: 0.18,
      transferBytes: 1_250_000,
      settled: true,
    },
  },
};
