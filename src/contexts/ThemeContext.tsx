import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from 'react';

export type ThemePreference = 'light' | 'dark' | 'system';
export type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  /** The theme actually shown. */
  mode: ThemeMode;
  /** What the reader chose; "system" follows the device. */
  themePreference: ThemePreference;
  setThemePreference: (preference: ThemePreference) => void;
}

const STORAGE_KEY = 'themePreference';
const DARK_QUERY = '(prefers-color-scheme: dark)';
const SERVER_SNAPSHOT = 'system:light';

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  themePreference: 'system',
  setThemePreference: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useThemeContext = () => useContext(ThemeContext);

const isPreference = (value: string | null): value is ThemePreference =>
  value === 'light' || value === 'dark' || value === 'system';

const readPreference = (): ThemePreference => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return isPreference(saved) ? saved : 'system';
  } catch {
    return 'system';
  }
};

const readSystemMode = (): ThemeMode =>
  typeof window.matchMedia === 'function' && window.matchMedia(DARK_QUERY).matches
    ? 'dark'
    : 'light';

const listeners = new Set<() => void>();

const subscribe = (onChange: () => void) => {
  listeners.add(onChange);
  window.addEventListener('storage', onChange);
  const query = typeof window.matchMedia === 'function' ? window.matchMedia(DARK_QUERY) : null;
  query?.addEventListener('change', onChange);

  return () => {
    listeners.delete(onChange);
    window.removeEventListener('storage', onChange);
    query?.removeEventListener('change', onChange);
  };
};

// A string snapshot keeps the store value stable between unrelated renders.
const getSnapshot = () => `${readPreference()}:${readSystemMode()}`;
const getServerSnapshot = () => SERVER_SNAPSHOT;

/**
 * The stylesheet does the theming through the data-theme attribute on <html>.
 * An inline script in index.html sets it before first paint; this keeps it in step afterwards.
 */
const applyToDocument = (preference: ThemePreference) => {
  if (preference === 'system') {
    delete document.documentElement.dataset.theme;
  } else {
    document.documentElement.dataset.theme = preference;
  }
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [themePreference, systemMode] = snapshot.split(':') as [ThemePreference, ThemeMode];
  const mode = themePreference === 'system' ? systemMode : themePreference;

  useEffect(() => {
    applyToDocument(themePreference);
  }, [themePreference]);

  const setThemePreference = useCallback((preference: ThemePreference) => {
    try {
      localStorage.setItem(STORAGE_KEY, preference);
    } catch {
      // Storage can be unavailable (private mode). The attribute still changes for this visit.
    }
    applyToDocument(preference);
    listeners.forEach((notify) => notify());
  }, []);

  const value = useMemo(
    () => ({ mode, themePreference, setThemePreference }),
    [mode, themePreference, setThemePreference]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
