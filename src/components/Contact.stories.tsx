import type { Meta, StoryObj } from '@storybook/react';
import { expect, within, userEvent } from '@storybook/test';
import Contact from './Contact';

const meta = {
  title: 'Components/Contact',
  component: Contact,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Contact>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify form elements are rendered
    const nameInput = canvas.getByRole('textbox', { name: /name/i });
    const emailInput = canvas.getByRole('textbox', { name: /email/i });
    const messageInput = canvas.getByRole('textbox', { name: /message/i });
    const submitButton = canvas.getByRole('button', { name: /send message/i });

    await expect(nameInput).toBeInTheDocument();
    await expect(emailInput).toBeInTheDocument();
    await expect(messageInput).toBeInTheDocument();
    await expect(submitButton).toBeInTheDocument();
  },
};

export const FormInteraction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Fill out the form
    const nameInput = canvas.getByRole('textbox', { name: /name/i });
    const emailInput = canvas.getByRole('textbox', { name: /email/i });
    const messageInput = canvas.getByRole('textbox', { name: /message/i });

    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@example.com');
    await userEvent.type(messageInput, 'This is a test message.');

    // Verify values are entered
    await expect(nameInput).toHaveValue('John Doe');
    await expect(emailInput).toHaveValue('john@example.com');
    await expect(messageInput).toHaveValue('This is a test message.');
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
