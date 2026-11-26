import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import Contact from './Contact';
import { contact, profile } from '../../data/content';

const meta = {
  title: 'Components/Features/Contact',
  component: Contact,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  args: {
    title: contact.title,
    body: contact.body,
    email: profile.email,
    linkedinUrl: profile.linkedin,
    githubUrl: profile.github,
  },
} satisfies Meta<typeof Contact>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId('contact-email')).toHaveAttribute(
      'href',
      `mailto:${profile.email}`
    );
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};
