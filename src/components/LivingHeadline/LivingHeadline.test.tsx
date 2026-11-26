import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import LivingHeadline from './LivingHeadline';

describe('LivingHeadline', () => {
  it('exposes the full text as the heading name', () => {
    render(<LivingHeadline text="Fast, clear products. AI adopted on purpose." />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Fast, clear products. AI adopted on purpose.',
      })
    ).toBeInTheDocument();
  });

  it('keeps the words readable as plain text content', () => {
    render(<LivingHeadline text="Fast, clear products. AI adopted on purpose." />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent).toBe('Fast, clear products.AI adopted on purpose.');
  });

  it('puts each sentence on its own line and numbers the letters in order', () => {
    const { container } = render(<LivingHeadline text="One two. Three." />);

    expect(container.querySelectorAll('.headline__sentence')).toHaveLength(2);
    const letters = Array.from(container.querySelectorAll<HTMLElement>('.headline__letter'));
    expect(letters.map((letter) => letter.textContent).join('')).toBe('Onetwo.Three.');
    expect(letters.map((letter) => letter.style.getPropertyValue('--i'))).toEqual(
      letters.map((_, index) => String(index))
    );
  });

  it('treats text without a full stop as one sentence', () => {
    const { container } = render(<LivingHeadline text="Front end is still home" />);

    expect(container.querySelectorAll('.headline__sentence')).toHaveLength(1);
  });
});
