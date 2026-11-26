import { useEffect, useRef } from 'react';

export interface LivingHeadlineProps {
  id?: string;
  /** The headline. Each sentence is set on its own line. */
  text: string;
  /** CSS selector for the area whose pointer movement the letters follow. Defaults to the headline. */
  pointerArea?: string;
}

const HEAVY = 800;
const LIGHT = 300;
/** Distance from the pointer, in pixels, at which a letter is at its lightest. */
const REACH = 320;

/** "One. Two." becomes ["One.", "Two."] */
const toSentences = (text: string): string[] =>
  text.match(/[^.!?]+[.!?]+/g)?.map((part) => part.trim()) ?? [text];

/**
 * A headline whose letters change weight: once on load, then following the pointer,
 * or the scroll position on touch screens.
 *
 * Changing a letter's weight changes its width, which would push its neighbours around.
 * So each letter's box is measured at the heaviest weight and locked before anything
 * animates. The headline is drawn at that weight to begin with, which means locking the
 * widths moves nothing.
 */
const LivingHeadline = ({ id, text, pointerArea }: LivingHeadlineProps) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sentences = toSentences(text);
  let letterIndex = 0;

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading || typeof window.matchMedia !== 'function') {
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const letters = Array.from(heading.querySelectorAll<HTMLElement>('.headline__letter'));
    let cancelled = false;
    let frame = 0;
    let lastWidth = 0;

    const lockWidths = () => {
      heading.classList.remove('is-live');
      letters.forEach((letter) => {
        letter.style.width = '';
        letter.style.fontWeight = '';
      });
      // Read every width first, then write them, so the browser lays out once.
      const widths = letters.map((letter) => letter.getBoundingClientRect().width);
      letters.forEach((letter, index) => {
        letter.style.width = `${widths[index]}px`;
      });
      heading.classList.add('is-live');
    };

    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    fontsReady.then(() => {
      if (!cancelled) {
        lockWidths();
        lastWidth = heading.clientWidth;
      }
    });

    // Font size follows the viewport, so the locked widths go stale when the headline resizes.
    const resizeObserver =
      typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(() => {
            if (heading.classList.contains('is-live') && heading.clientWidth !== lastWidth) {
              lastWidth = heading.clientWidth;
              lockWidths();
            }
          });
    resizeObserver?.observe(heading);

    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const area = (pointerArea && heading.closest<HTMLElement>(pointerArea)) || heading;

    const handlePointerMove = (event: PointerEvent) => {
      if (!heading.classList.contains('is-live')) {
        return;
      }
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        letters.forEach((letter) => {
          const box = letter.getBoundingClientRect();
          const distance = Math.hypot(
            event.clientX - (box.left + box.width / 2),
            event.clientY - (box.top + box.height / 2)
          );
          const closeness = Math.max(0, 1 - distance / REACH);
          letter.style.fontWeight = String(Math.round(LIGHT + (HEAVY - LIGHT) * closeness));
        });
      });
    };

    const handlePointerLeave = () => {
      cancelAnimationFrame(frame);
      letters.forEach((letter) => {
        letter.style.fontWeight = '';
      });
    };

    if (canHover) {
      area.addEventListener('pointermove', handlePointerMove);
      area.addEventListener('pointerleave', handlePointerLeave);
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      area.removeEventListener('pointermove', handlePointerMove);
      area.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [pointerArea, text]);

  return (
    <h1 id={id} ref={headingRef} className="headline" aria-label={text}>
      <span aria-hidden="true">
        {sentences.map((sentence) => (
          <span className="headline__sentence" key={sentence}>
            {sentence.split(' ').map((word, wordIndex, words) => (
              <span key={`${word}-${wordIndex}`}>
                <span className="headline__word">
                  {Array.from(word).map((letter) => {
                    const index = letterIndex++;
                    return (
                      <span
                        className="headline__letter"
                        key={index}
                        style={{ '--i': index } as React.CSSProperties}
                      >
                        {letter}
                      </span>
                    );
                  })}
                </span>
                {wordIndex < words.length - 1 ? ' ' : null}
              </span>
            ))}
          </span>
        ))}
      </span>
    </h1>
  );
};

export default LivingHeadline;
