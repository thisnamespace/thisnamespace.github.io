import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import Logo from './Logo';
import { Box, Stack, Typography } from '@mui/material';

const meta = {
  title: 'Components/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: { type: 'number', min: 20, max: 200, step: 10 },
      description: 'Width of the logo in pixels',
    },
    height: {
      control: { type: 'number', min: 20, max: 200, step: 10 },
      description: 'Height of the logo in pixels',
    },
    variant: {
      control: { type: 'select' },
      options: ['full', 'minimal', 'icon'],
      description: 'Logo variant to display',
    },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 50,
    height: 50,
    variant: 'minimal',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify canvas element is rendered
    const logoCanvas = canvas.getAllByRole('img', { hidden: true });
    expect(logoCanvas.length).toBeGreaterThan(0);
  },
};

export const IconOnly: Story = {
  args: {
    width: 60,
    height: 60,
    variant: 'icon',
  },
};

export const Minimal: Story = {
  args: {
    width: 80,
    height: 80,
    variant: 'minimal',
  },
};

export const Full: Story = {
  args: {
    width: 100,
    height: 100,
    variant: 'full',
  },
};

export const AllVariants: Story = {
  render: () => (
    <Stack spacing={4} alignItems="center">
      <Box textAlign="center">
        <Typography variant="h6" gutterBottom>
          Icon Only
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block" mb={2}>
          Best for small displays, app icons
        </Typography>
        <Logo variant="icon" width={60} height={60} />
      </Box>
      <Box textAlign="center">
        <Typography variant="h6" gutterBottom>
          Minimal
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block" mb={2}>
          Best for headers, medium displays
        </Typography>
        <Logo variant="minimal" width={80} height={80} />
      </Box>
      <Box textAlign="center">
        <Typography variant="h6" gutterBottom>
          Full
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block" mb={2}>
          Best for hero sections, full branding
        </Typography>
        <Logo variant="full" width={100} height={100} />
      </Box>
    </Stack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify all variant descriptions are present
    await expect(canvas.getByText(/icon only/i)).toBeInTheDocument();
    const minimalTexts = canvas.getAllByText(/minimal/i);
    expect(minimalTexts.length).toBeGreaterThan(0);
    const fullTexts = canvas.getAllByText(/full/i);
    expect(fullTexts.length).toBeGreaterThan(0);
  },
};

export const WithBackground: Story = {
  args: {
    width: 60,
    height: 60,
    variant: 'minimal',
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          p: 4,
          bgcolor: 'background.paper',
          borderRadius: 2,
          border: 1,
          borderColor: 'divider',
        }}
      >
        <Story />
      </Box>
    ),
  ],
};
