import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import Header from './Header';

const meta = {
  title: 'Components/Layout/Header',
  component: Header,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('banner')).toBeInTheDocument();
    await expect(canvas.getByTestId('home-link')).toHaveAttribute('href', '/');
  },
};

/** Each press moves to the next theme setting: light, dark, then match system. */
export const ThemeCycle: Story = {
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByTestId('theme-button');
    const before = button.getAttribute('data-theme-setting');
    await userEvent.click(button);
    await expect(button).not.toHaveAttribute('data-theme-setting', before ?? '');
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};
