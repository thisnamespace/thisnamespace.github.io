import { createTheme, type PaletteMode, type Theme } from '@mui/material/styles';

/**
 * Brand tokens.
 * Petrol and amber come from the thisnamespace logo (teal brackets, amber dots).
 */
export const tokens = {
  light: {
    paper: '#F1F5F3',
    surface: '#FFFFFF',
    ink: '#0F2A30',
    inkSoft: '#3F5A60',
    petrol: '#0E5C6B',
    petrolDeep: '#0A3F4A',
    amber: '#9A5A00',
    leaf: '#1B7F56',
    line: '#C8D4D0',
  },
  dark: {
    paper: '#0B1E23',
    surface: '#11292F',
    ink: '#E4EEEB',
    inkSoft: '#A6BAB6',
    petrol: '#6CCBD9',
    petrolDeep: '#0A3F4A',
    amber: '#F2B24C',
    leaf: '#5FD0A0',
    line: '#27454C',
  },
} as const;

export const fonts = {
  display: '"Bricolage Grotesque Variable", "Segoe UI", system-ui, sans-serif',
  prose: '"Source Serif 4 Variable", Georgia, "Times New Roman", serif',
} as const;

export const createAppTheme = (mode: PaletteMode): Theme => {
  const t = tokens[mode];

  return createTheme({
    palette: {
      mode,
      primary: {
        main: t.petrol,
        dark: mode === 'light' ? t.petrolDeep : '#3FB2C3',
        contrastText: mode === 'light' ? '#FFFFFF' : '#06242A',
      },
      secondary: { main: t.amber },
      success: { main: t.leaf },
      background: { default: t.paper, paper: t.surface },
      text: { primary: t.ink, secondary: t.inkSoft },
      divider: t.line,
    },
    shape: { borderRadius: 6 },
    typography: {
      fontFamily: fonts.display,
      h1: {
        fontFamily: fonts.display,
        fontWeight: 700,
        fontSize: 'clamp(2.6rem, 6.2vw, 4.75rem)',
        lineHeight: 1.02,
        letterSpacing: '-0.035em',
      },
      h2: {
        fontFamily: fonts.display,
        fontWeight: 650,
        fontSize: 'clamp(1.85rem, 3.4vw, 2.6rem)',
        lineHeight: 1.1,
        letterSpacing: '-0.025em',
      },
      h3: {
        fontFamily: fonts.display,
        fontWeight: 620,
        fontSize: 'clamp(1.3rem, 2.2vw, 1.6rem)',
        lineHeight: 1.2,
        letterSpacing: '-0.015em',
      },
      h4: { fontFamily: fonts.display, fontWeight: 600, fontSize: '1.2rem', lineHeight: 1.3 },
      // Running prose is set in the serif; interface text stays in the grotesque.
      body1: { fontFamily: fonts.prose, fontSize: '1.125rem', lineHeight: 1.65 },
      body2: { fontFamily: fonts.display, fontSize: '0.975rem', lineHeight: 1.5 },
      button: { fontFamily: fonts.display, fontWeight: 600, textTransform: 'none' },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: { backgroundColor: t.paper, color: t.ink },
          '::selection': {
            backgroundColor: t.petrol,
            color: mode === 'light' ? '#fff' : '#06242A',
          },
          'a:focus-visible, button:focus-visible': {
            outline: `3px solid ${t.amber}`,
            outlineOffset: 3,
            borderRadius: 4,
          },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: { borderRadius: 6, fontSize: '1rem', padding: '11px 22px', minHeight: 44 },
          outlined: { borderWidth: 1.5, '&:hover': { borderWidth: 1.5 } },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: t.paper,
            color: t.ink,
            backgroundImage: 'none',
            boxShadow: 'none',
            borderBottom: `1px solid ${t.line}`,
          },
        },
      },
      MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
    },
  });
};
