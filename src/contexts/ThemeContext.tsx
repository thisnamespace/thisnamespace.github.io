import { createContext, useContext, useState, useMemo, ReactNode, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { createAppTheme } from '../styles/theme';
import { PaletteMode } from '@mui/material';

type ThemePreference = 'light' | 'dark' | 'system';

interface ThemeContextType {
  mode: PaletteMode;
  themePreference: ThemePreference;
  setThemePreference: (preference: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  themePreference: 'system',
  setThemePreference: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useThemeContext = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

const getSystemTheme = (): PaletteMode => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [themePreference, setThemePreferenceState] = useState<ThemePreference>(() => {
    const savedPreference = localStorage.getItem('themePreference');
    if (
      savedPreference &&
      (savedPreference === 'light' || savedPreference === 'dark' || savedPreference === 'system')
    ) {
      return savedPreference as ThemePreference;
    }
    return 'system';
  });

  const [mode, setMode] = useState<PaletteMode>(() => {
    if (themePreference === 'system') {
      return getSystemTheme();
    }
    return themePreference;
  });

  useEffect(() => {
    if (themePreference === 'system') {
      setMode(getSystemTheme());

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        setMode(e.matches ? 'dark' : 'light');
      };
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      setMode(themePreference);
    }
  }, [themePreference]);

  const setThemePreference = (preference: ThemePreference) => {
    setThemePreferenceState(preference);
    localStorage.setItem('themePreference', preference);
  };

  const colorMode = useMemo(
    () => ({
      mode,
      themePreference,
      setThemePreference,
    }),
    [mode, themePreference]
  );

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
