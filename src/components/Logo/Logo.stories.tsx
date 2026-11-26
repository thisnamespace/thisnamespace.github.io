import type { Meta, StoryObj } from '@storybook/react';
import { expect } from '@storybook/test';
import Logo from './Logo';

const meta = {
  title: 'Components/Brand/Logo',
  component: Logo,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '6rem', color: 'var(--brand)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    // Decorative: the name beside it is what screen readers announce.
    await expect(canvasElement.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  },
};

/** In the header the braces open and the dot drops in, once, on load. */
export const InHeader: Story = {
  decorators: [
    (Story) => (
      <span className="brand">
        <Story />
      </span>
    ),
  ],
  args: { className: 'brand__mark' },
};

/** On the green bands the braces are pale and the dot is the bright gold. */
export const OnGreen: Story = {
  decorators: [
    (Story) => (
      <div className="contact" style={{ padding: '1.5rem', color: 'var(--hero-text)' }}>
        <Story />
      </div>
    ),
  ],
};
