import { useEffect, useState } from 'react';

/**
 * The id of the page section that is crossing the reading line, a little above the
 * middle of the window. Returns '' before the first section, on a section with no id,
 * and on the server, so pre-built HTML and the first browser render agree.
 */
const useCurrentSection = (): string => {
  const [current, setCurrent] = useState('');

  useEffect(() => {
    const sections = document.querySelectorAll('main section');
    if (sections.length === 0 || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setCurrent(entry.target.id);
        }
      },
      // A one-pixel-high band 40% of the way down the window.
      { rootMargin: '-40% 0px -60% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return current;
};

export default useCurrentSection;
