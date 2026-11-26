import { useEffect } from 'react';

const SITE_NAME = 'Michael Day';

/** Sets the document title for the current page. */
export const usePageTitle = (title?: string): void => {
  useEffect(() => {
    document.title = title
      ? `${title} | ${SITE_NAME}`
      : `${SITE_NAME}: engineering leader, AI in software development`;
  }, [title]);
};
