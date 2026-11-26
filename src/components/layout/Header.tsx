import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  BrightnessAuto,
  Close,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useThemeContext } from '../../contexts/ThemeContext';
import { fonts } from '../../styles/theme';

type ThemePreference = 'light' | 'dark' | 'system';

interface NavItem {
  label: string;
  hash: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Work', hash: '#work' },
  { label: 'Approach', hash: '#approach' },
  { label: 'Experience', hash: '#experience' },
  { label: 'Contact', hash: '#contact' },
];

const THEME_OPTIONS: { value: ThemePreference; label: string; icon: React.ReactNode }[] = [
  { value: 'light', label: 'Light', icon: <Brightness7 fontSize="small" /> },
  { value: 'dark', label: 'Dark', icon: <Brightness4 fontSize="small" /> },
  { value: 'system', label: 'Match system', icon: <BrightnessAuto fontSize="small" /> },
];

const Header = () => {
  const { mode, themePreference, setThemePreference } = useThemeContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeMenuAnchor, setThemeMenuAnchor] = useState<null | HTMLElement>(null);

  const themeIcon =
    themePreference === 'system' ? (
      <BrightnessAuto />
    ) : mode === 'dark' ? (
      <Brightness4 />
    ) : (
      <Brightness7 />
    );

  const handleThemeChange = (preference: ThemePreference) => {
    setThemePreference(preference);
    setThemeMenuAnchor(null);
  };

  return (
    <>
      <Box
        component="a"
        href="#main-content"
        sx={{
          position: 'absolute',
          left: '-9999px',
          zIndex: 2000,
          p: 2,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          fontFamily: fonts.display,
          textDecoration: 'none',
          '&:focus': { left: '1rem', top: '1rem' },
        }}
      >
        Skip to main content
      </Box>

      <AppBar position="sticky" component="header">
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 }, gap: 2 }}>
            <Link
              component={RouterLink}
              to="/"
              underline="none"
              color="inherit"
              aria-label="thisnamespace, Michael Day: home"
              data-testid="home-link"
              sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mr: 'auto' }}
            >
              <Box
                component="svg"
                viewBox="0 0 44 32"
                aria-hidden
                sx={{ width: 40, height: 29, flexShrink: 0, color: 'primary.main' }}
              >
                <path
                  d="M9 3H3v26h6M35 3h6v26h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Box component="g" sx={{ fill: (theme) => theme.palette.secondary.main }}>
                  <circle cx="14" cy="16" r="2.6" />
                  <circle cx="22" cy="16" r="2.6" />
                  <circle cx="30" cy="16" r="2.6" />
                </Box>
              </Box>
              <Box>
                <Typography
                  component="span"
                  sx={{
                    display: 'block',
                    fontFamily: fonts.display,
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    lineHeight: 1.1,
                    letterSpacing: '-0.01em',
                  }}
                >
                  thisnamespace
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    display: 'block',
                    fontFamily: fonts.display,
                    fontSize: '0.85rem',
                    color: 'text.secondary',
                  }}
                >
                  Michael Day
                </Typography>
              </Box>
            </Link>

            <Stack
              component="nav"
              aria-label="Main"
              direction="row"
              spacing={3.5}
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.hash}
                  component={RouterLink}
                  to={{ pathname: '/', hash: item.hash }}
                  underline="none"
                  color="text.primary"
                  sx={{
                    fontFamily: fonts.display,
                    fontWeight: 550,
                    fontSize: '1rem',
                    py: 1.25,
                    borderBottom: '2px solid transparent',
                    '&:hover': { borderBottomColor: 'primary.main' },
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </Stack>

            <IconButton
              onClick={(event) => setThemeMenuAnchor(event.currentTarget)}
              color="inherit"
              aria-label={`Change theme. Current setting: ${themePreference}`}
              aria-haspopup="menu"
              aria-expanded={Boolean(themeMenuAnchor)}
              data-testid="theme-button"
              sx={{ width: 44, height: 44 }}
            >
              {themeIcon}
            </IconButton>

            <IconButton
              onClick={() => setMobileMenuOpen(true)}
              color="inherit"
              aria-label="Open navigation menu"
              data-testid="menu-button"
              sx={{ display: { xs: 'inline-flex', md: 'none' }, width: 44, height: 44 }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Menu
        anchorEl={themeMenuAnchor}
        open={Boolean(themeMenuAnchor)}
        onClose={() => setThemeMenuAnchor(null)}
      >
        {THEME_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={themePreference === option.value}
            onClick={() => handleThemeChange(option.value)}
          >
            <ListItemIcon>{option.icon}</ListItemIcon>
            <ListItemText>{option.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>

      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        slotProps={{ paper: { sx: { width: 'min(84vw, 320px)', bgcolor: 'background.default' } } }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1.5 }}>
          <IconButton
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
            sx={{ width: 44, height: 44 }}
          >
            <Close />
          </IconButton>
        </Box>
        <List component="nav" aria-label="Main, mobile" sx={{ px: 1 }}>
          {NAV_ITEMS.map((item) => (
            <ListItemButton
              key={item.hash}
              component={RouterLink}
              to={{ pathname: '/', hash: item.hash }}
              onClick={() => setMobileMenuOpen(false)}
              sx={{ minHeight: 52, borderRadius: 1 }}
            >
              <ListItemText
                primary={item.label}
                slotProps={{
                  primary: {
                    sx: { fontFamily: fonts.display, fontSize: '1.35rem', fontWeight: 600 },
                  },
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Header;
