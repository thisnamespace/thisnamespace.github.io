import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import Footer from './Footer';

const meta = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify footer content is present
    const footer = canvas.getByRole('contentinfo');
    await expect(footer).toBeInTheDocument();

    // Verify copyright text
    const currentYear = new Date().getFullYear();
    await expect(canvas.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
    await expect(canvas.getByText(/thisnamespace/i)).toBeInTheDocument();
    await expect(canvas.getByText(/react, typescript & material-ui/i)).toBeInTheDocument();

    // Verify social links exist
    const linkedinLink = canvas.getByRole('link', { name: /linkedin/i });
    const githubLink = canvas.getByRole('link', { name: /github/i });
    const emailLink = canvas.getByRole('link', { name: /email/i });

    await expect(linkedinLink).toBeInTheDocument();
    await expect(githubLink).toBeInTheDocument();
    await expect(emailLink).toBeInTheDocument();

    // Verify links have correct attributes
    await expect(linkedinLink).toHaveAttribute('target', '_blank');
    await expect(githubLink).toHaveAttribute('target', '_blank');
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
