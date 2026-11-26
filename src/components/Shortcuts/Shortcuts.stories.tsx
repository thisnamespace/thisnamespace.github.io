import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import Shortcuts from './Shortcuts';
import { shortcuts } from '../../data/content';

const meta = {
  title: 'Components/Features/Shortcuts',
  component: Shortcuts,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { title: shortcuts.title, toggleLabel: shortcuts.toggleLabel, keys: shortcuts.keys },
  decorators: [
    (Story) => (
      <>
        <p>Press ? to open the list of shortcuts.</p>
        <Story />
      </>
    ),
  ],
} satisfies Meta<typeof Shortcuts>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Nothing is visible until the reader presses "?". */
export const Closed: Story = {};

export const Open: Story = {
  play: async () => {
    await userEvent.keyboard('?');
    const dialog = within(document.body);
    await expect(await dialog.findByRole('dialog')).toBeVisible();
    await expect(dialog.getByTestId('shortcut-list')).toBeVisible();
  },
};
