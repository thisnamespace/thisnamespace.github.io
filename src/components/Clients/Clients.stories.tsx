import type { Meta, StoryObj } from '@storybook/react';
import Clients from './Clients';
import { clients } from '../../data/content';

const meta = {
  title: 'Components/Features/Clients',
  component: Clients,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  args: { title: clients.title, body: clients.body, names: clients.names },
} satisfies Meta<typeof Clients>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Edge case: a short list should not leave the grid looking broken. */
export const FewNames: Story = {
  args: { names: clients.names.slice(0, 3) },
};
