import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Switch,
  Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useThemeContext } from '../../contexts/ThemeContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';

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

const THEME_ORDER = ['light', 'dark', 'system'] as const;

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

/**
 * Single-key shortcuts for getting around the page, with a dialog that lists them.
 * They can be switched off, because single-key shortcuts get in the way of some
 * assistive technology (WCAG 2.1.4).
 */
const Shortcuts = ({ title, toggleLabel, keys }: ShortcutsProps) => {
  const navigate = useNavigate();
  const { themePreference, setThemePreference } = useThemeContext();
  const prefersReducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [enabled, setEnabled] = useState(readEnabled);

  const handleToggle = (next: boolean) => {
    setEnabled(next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? 'on' : 'off');
    } catch {
      // Storage can be unavailable (private mode); the choice then lasts for this visit only.
    }
  };

  const goTo = useCallback(
    (hash: string) => {
      if (window.location.pathname === '/' && window.location.hash === hash) {
        // Already on this hash, so the router will not scroll. Do it directly.
        document
          .getElementById(hash.slice(1))
          ?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        return;
      }
      navigate({ pathname: '/', hash });
    },
    [navigate, prefersReducedMotion]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!enabled || event.metaKey || event.ctrlKey || event.altKey || isTyping(event.target)) {
        return;
      }
      if (event.key === '?') {
        event.preventDefault();
        setOpen(true);
        return;
      }
      if (event.key.toLowerCase() === 't') {
        const next = THEME_ORDER[(THEME_ORDER.indexOf(themePreference) + 1) % THEME_ORDER.length];
        setThemePreference(next);
        return;
      }
      const match = keys.find((item) => item.hash && item.key === event.key);
      if (match?.hash) {
        setOpen(false);
        goTo(match.hash);
      }
    };

    const handleOpenRequest = () => setOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener(OPEN_SHORTCUTS_EVENT, handleOpenRequest);
    // Lets tests (and anyone debugging) see when the shortcuts are listening.
    document.body.dataset.shortcuts = enabled ? 'on' : 'off';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener(OPEN_SHORTCUTS_EVENT, handleOpenRequest);
    };
  }, [enabled, goTo, keys, setThemePreference, themePreference]);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="shortcuts-title"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="shortcuts-title" sx={{ pr: 7, fontWeight: 650 }}>
        {title}
        <IconButton
          onClick={() => setOpen(false)}
          aria-label="Close keyboard shortcuts"
          sx={{ position: 'absolute', right: 8, top: 8, width: 44, height: 44 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box component="dl" data-testid="shortcut-list" sx={{ m: 0, opacity: enabled ? 1 : 0.5 }}>
          {keys.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: 'grid',
                gridTemplateColumns: '3rem 1fr',
                alignItems: 'center',
                py: 0.75,
              }}
            >
              <Box component="dt">
                <Box
                  component="kbd"
                  sx={{
                    display: 'inline-block',
                    minWidth: '2rem',
                    px: 1,
                    py: 0.25,
                    textAlign: 'center',
                    fontFamily: 'inherit',
                    fontWeight: 650,
                    border: 1,
                    borderBottomWidth: 3,
                    borderColor: 'divider',
                    borderRadius: 1,
                  }}
                >
                  {item.key}
                </Box>
              </Box>
              <Typography component="dd" variant="body2" sx={{ m: 0 }}>
                {item.action}
              </Typography>
            </Box>
          ))}
        </Box>
        <FormControlLabel
          sx={{ mt: 2 }}
          control={
            <Switch
              checked={enabled}
              onChange={(event) => handleToggle(event.target.checked)}
              slotProps={{ input: { 'data-testid': 'shortcuts-toggle' } as object }}
            />
          }
          label={<Typography variant="body2">{toggleLabel}</Typography>}
        />
      </DialogContent>
    </Dialog>
  );
};

export default Shortcuts;
