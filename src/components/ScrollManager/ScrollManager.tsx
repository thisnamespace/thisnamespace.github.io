import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Keeps scroll position in step with the route:
 * a hash scrolls to that section, a new page starts at the top.
 */
const ScrollManager = () => {
  const { pathname, hash } = useLocation();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash, prefersReducedMotion]);

  return null;
};

export default ScrollManager;
