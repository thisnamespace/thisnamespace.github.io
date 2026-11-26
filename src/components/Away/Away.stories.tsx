import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import Away from './Away';
import { away } from '../../data/content';

const meta = {
  title: 'Components/Features/Away',
  component: Away,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  args: { title: away.title, body: away.body, places: away.places },
} satisfies Meta<typeof Away>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId('places-worked')).toHaveTextContent('South Africa');
  },
};

/** With a portrait: the text moves to the right of it on wide screens. */
export const WithPhoto: Story = {
  args: {
    photo: {
      src: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 4 5%22%3E%3Crect width=%224%22 height=%225%22 fill=%22%230e5c6b%22/%3E%3C/svg%3E',
      alt: 'Placeholder portrait',
      width: 448,
      height: 560,
    },
  },
};

/** Edge case: a single group of places. */
export const OneGroup: Story = {
  args: { places: away.places.slice(0, 1) },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};
