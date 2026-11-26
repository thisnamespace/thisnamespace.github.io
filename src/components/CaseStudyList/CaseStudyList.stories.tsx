import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { MemoryRouter } from 'react-router-dom';
import CaseStudyList from './CaseStudyList';
import { caseStudies } from '../../data/content';

const meta = {
  title: 'Components/Features/CaseStudyList',
  component: CaseStudyList,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  args: { studies: caseStudies },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof CaseStudyList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const first = caseStudies[0];
    await expect(canvas.getByTestId(`case-study-link-${first.slug}`)).toHaveAttribute(
      'href',
      `/work/${first.slug}`
    );
  },
};

export const SingleStudy: Story = {
  args: { studies: caseStudies.slice(0, 1) },
};
