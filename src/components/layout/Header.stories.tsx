import type { Meta, StoryObj } from '@storybook/react';
import { expect, within, userEvent } from '@storybook/test';
import Header from './Header';
import { BrowserRouter } from 'react-router-dom';

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify header is rendered
    const header = canvas.getByRole('banner');
    await expect(header).toBeInTheDocument();

    // Verify navigation buttons exist
    await expect(canvas.getByRole('button', { name: /about/i })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: /skills/i })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: /projects/i })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: /contact/i })).toBeInTheDocument();

    // Verify theme toggle button exists (with dynamic aria-label)
    const themeToggle = canvas.getByLabelText(/theme.*click to change theme/i);
    await expect(themeToggle).toBeInTheDocument();
  },
};

export const ThemeMenuInteraction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify theme toggle button exists and is clickable (with dynamic aria-label)
    const themeToggle = canvas.getByLabelText(/theme.*click to change theme/i);
    await expect(themeToggle).toBeInTheDocument();
    await expect(themeToggle).toBeEnabled();

    // Click the button (menu appears in a portal, tested separately in Playwright)
    await userEvent.click(themeToggle);
  },
};

export const LightMode: Story = {
  parameters: {
    backgrounds: { default: 'light' },
  },
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
