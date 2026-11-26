import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import Footer from './Footer';

const meta = {
  title: 'Components/Layout/Footer',
  component: Footer,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('contentinfo')).toBeInTheDocument();
    await expect(canvas.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'target',
      '_blank'
    );
  },
};
