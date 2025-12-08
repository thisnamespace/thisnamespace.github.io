import { useEffect, useRef } from 'react';

interface ParallaxOptions {
  speed?: number;
  disable?: boolean;
}

export const useParallax = (options: ParallaxOptions = {}) => {
  const { speed = 0.5, disable = false } = options;
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (disable) return;

    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrolled;
      const offset = (scrolled - elementTop) * speed;

      // Only apply transform when element is in viewport
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        element.style.transform = `translateY(${offset}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [disable, speed]);

  return { elementRef };
};
