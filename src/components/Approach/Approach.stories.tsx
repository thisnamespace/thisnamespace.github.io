import type { Meta, StoryObj } from '@storybook/react';
import Approach from './Approach';
import { approach } from '../../data/content';

const meta = {
  title: 'Components/Features/Approach',
  component: Approach,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  args: { title: approach.title, principles: approach.principles },
} satisfies Meta<typeof Approach>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Edge case: an odd number of principles leaves the last one on its own row. */
export const ThreePrinciples: Story = {
  args: { principles: approach.principles.slice(0, 3) },
};
