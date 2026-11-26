import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '../contexts/ThemeContext';
import CaseStudy from './CaseStudy';
import { caseStudies } from '../data/content';

const renderAt = (path: string) =>
  render(
    <ThemeProvider>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/work/:slug" element={<CaseStudy />} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
  );

describe('CaseStudy page', () => {
  it('renders the requested case study', () => {
    const study = caseStudies[0];
    renderAt(`/work/${study.slug}`);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(study.title);
    study.actions.forEach((action) => expect(screen.getByText(action)).toBeInTheDocument());
    expect(document.title).toContain(study.title);
  });

  it('links to the next case study, wrapping from the last to the first', () => {
    const last = caseStudies[caseStudies.length - 1];
    renderAt(`/work/${last.slug}`);

    expect(screen.getByTestId('next-case-study')).toHaveAttribute(
      'href',
      `/work/${caseStudies[0].slug}`
    );
  });

  it('shows the not-found page for an unknown slug', () => {
    renderAt('/work/nope');

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'That page does not exist.'
    );
  });
});
