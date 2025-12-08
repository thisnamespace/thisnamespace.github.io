import { Box, useTheme } from '@mui/material';
import { useState } from 'react';

type LogoVariant = 'full' | 'minimal' | 'icon';

interface LogoProps {
  width?: number;
  height?: number;
  variant?: LogoVariant;
  transparent?: boolean;
}

const Logo = ({ width = 40, height = 40, variant = 'minimal', transparent = false }: LogoProps) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [imageError, setImageError] = useState(false);

  const getLogoPath = (): string => {
    const mode = isDark ? 'dark' : 'light';
    const transparentSuffix = transparent ? '-transparent' : '';

    switch (variant) {
      case 'icon':
        return `/logos/logo-${mode}-icon${transparentSuffix}.svg`;
      case 'minimal':
        return `/logos/logo-${mode}-minimal.svg`;
      case 'full':
      default:
        return `/logos/logo-${mode}.svg`;
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Box
      sx={{
        width,
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {imageError ? (
        <svg width={width} height={height} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="8" fill={theme.palette.primary.main} />
          <text
            x="20"
            y="28"
            textAnchor="middle"
            fill="white"
            fontFamily="monospace"
            fontSize="18"
            fontWeight="bold"
          >
            {'{}'}
          </text>
        </svg>
      ) : (
        <img
          src={getLogoPath()}
          alt="thisnamespace Logo"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          onError={handleImageError}
        />
      )}
    </Box>
  );
};

export default Logo;
