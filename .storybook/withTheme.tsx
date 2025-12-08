import { useEffect } from 'react';
import { DecoratorFunction } from '@storybook/types';
import { useThemeContext } from '../src/contexts/ThemeContext';

const ThemeWrapper = ({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: 'light' | 'dark' | 'system';
}) => {
  const { setThemePreference } = useThemeContext();

  useEffect(() => {
    setThemePreference(theme);
  }, [theme, setThemePreference]);

  return <>{children}</>;
};

export const withTheme: DecoratorFunction = (Story, context) => {
  const theme = context.globals.theme || 'system';

  return (
    <ThemeWrapper theme={theme}>
      <Story />
    </ThemeWrapper>
  );
};
