import { useEffect, useId, useRef, useState } from 'react';
import Icon from '../Icon';
import { nextTheme } from '../layout/Header';
import { useThemeContext } from '../../contexts/ThemeContext';

export interface ShortcutKey {
  id: string;
  /** The key as shown to the reader, for example "1" or "T". */
  key: string;
  action: string;
  /** Section to jump to, for example "#journey". */
  hash?: string;
}

export interface ShortcutsProps {
  title: string;
  toggleLabel: string;
  keys: ShortcutKey[];
}

const STORAGE_KEY = 'shortcutsEnabled';
/** Fired by other components (the footer button) to open the list. */
export const OPEN_SHORTCUTS_EVENT = 'thisnamespace:open-shortcuts';

const readEnabled = (): boolean => {
  try {
    return localStorage.getItem(STORAGE_KEY) !== 'off';
  } catch {
    return true;
  }
};

const isTyping = (target: EventTarget | null): boolean =>
  target instanceof HTMLElement &&
  (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));

const goTo = (hash: string) => {
  const target = document.getElementById(hash.slice(1));
  if (!target) {
    // Not on the home page: go there.
    window.location.assign(`/${hash}`);
    return;
  }
  history.replaceState(null, '', hash);
  target.scrollIntoView();
};

/**
 * Single-key shortcuts for getting around the page, with a dialog that lists them.
 * They can be switched off, because single-key shortcuts get in the way of some
 * assistive technology (WCAG 2.1.4).
 */
const Shortcuts = ({ title, toggleLabel, keys }: ShortcutsProps) => {
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { themePreference, setThemePreference } = useThemeContext();
  // Starts on, the same as the pre-built HTML, then picks up the saved choice once mounted.
  const [enabled, setEnabled] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Reading storage has to wait for the browser; the pre-built HTML cannot know the saved choice.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(readEnabled());
    setReady(true);
  }, []);

  const handleToggle = (next: boolean) => {
    setEnabled(next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? 'on' : 'off');
    } catch {
      // Storage can be unavailable (private mode); the choice then lasts for this visit only.
    }
  };

  useEffect(() => {
    if (!ready) {
      return;
    }
    const open = () => {
      const dialog = dialogRef.current;
      if (dialog && !dialog.open) {
        dialog.showModal?.();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!enabled || event.metaKey || event.ctrlKey || event.altKey || isTyping(event.target)) {
        return;
      }
      if (event.key === '?') {
        event.preventDefault();
        open();
        return;
      }
      if (event.key.toLowerCase() === 't') {
        setThemePreference(nextTheme(themePreference));
        return;
      }
      const match = keys.find((item) => item.hash && item.key === event.key);
      if (match?.hash) {
        dialogRef.current?.close();
        goTo(match.hash);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener(OPEN_SHORTCUTS_EVENT, open);
    // Lets tests (and anyone debugging) see when the shortcuts are listening.
    document.body.dataset.shortcuts = enabled ? 'on' : 'off';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener(OPEN_SHORTCUTS_EVENT, open);
    };
  }, [enabled, keys, ready, setThemePreference, themePreference]);

  return (
    <dialog ref={dialogRef} className="shortcuts" aria-labelledby={titleId}>
      <div className="shortcuts__head">
        <h2 id={titleId}>{title}</h2>
        <button
          type="button"
          className="icon-button"
          onClick={() => dialogRef.current?.close()}
          aria-label="Close keyboard shortcuts"
        >
          <Icon name="close" />
        </button>
      </div>
      <dl className={`shortcuts__list${enabled ? '' : ' is-off'}`} data-testid="shortcut-list">
        {keys.map((item) => (
          <div className="shortcuts__row" key={item.id}>
            <dt>
              <kbd>{item.key}</kbd>
            </dt>
            <dd>{item.action}</dd>
          </div>
        ))}
      </dl>
      <label className="shortcuts__toggle">
        <input
          type="checkbox"
          role="switch"
          checked={enabled}
          onChange={(event) => handleToggle(event.target.checked)}
        />
        {toggleLabel}
      </label>
    </dialog>
  );
};

export default Shortcuts;
