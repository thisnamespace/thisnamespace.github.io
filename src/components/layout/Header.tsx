import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  BrightnessAuto,
  Menu as MenuIcon,
  Close,
  MenuBook,
} from '@mui/icons-material';
import { useThemeContext } from '../../contexts/ThemeContext';
import Logo from '../Logo';
import { useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface NavItem {
  label: string;
  path: string;
  external?: boolean;
}

const Header = () => {
  const { mode, themePreference, setThemePreference } = useThemeContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeMenuAnchor, setThemeMenuAnchor] = useState<null | HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const navItems: NavItem[] = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '#about' },
    { label: 'Skills', path: '#skills' },
    { label: 'Experience', path: '#experience' },
    { label: 'Projects', path: '#projects' },
    { label: 'Contact', path: '#contact' },
    { label: 'Storybook', path: '/storybook', external: true },
  ];

  const handleNavClick = (path: string, external?: boolean) => {
    if (external) {
      window.open(path, '_blank', 'noopener,noreferrer');
    } else if (path === '/') {
      // Scroll to top for home
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    } else if (path.startsWith('#')) {
      const element = document.querySelector(path);
      element?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleThemeMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setThemeMenuAnchor(event.currentTarget);
  };

  const handleThemeMenuClose = () => {
    setThemeMenuAnchor(null);
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setThemePreference(newTheme);
    handleThemeMenuClose();
  };

  const getThemeIcon = () => {
    if (themePreference === 'system') {
      return <BrightnessAuto />;
    }
    return mode === 'dark' ? <Brightness7 /> : <Brightness4 />;
  };

  const getThemeAriaLabel = () => {
    if (themePreference === 'system') {
      return 'Theme set to system preference. Click to change theme.';
    }
    return mode === 'dark'
      ? 'Dark theme active. Click to change theme.'
      : 'Light theme active. Click to change theme.';
  };

  return (
    <>
      <Box
        component="a"
        href="#main-content"
        sx={{
          position: 'absolute',
          left: '-9999px',
          zIndex: 999999,
          padding: '1rem',
          backgroundColor: 'primary.main',
          color: 'white',
          textDecoration: 'none',
          '&:focus': {
            left: '1rem',
            top: '1rem',
          },
        }}
      >
        Skip to main content
      </Box>
      <AppBar position="sticky" color="default" elevation={1}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ px: { xs: 2, sm: 0 } }}>
            <Box
              onClick={() => handleNavClick('/')}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 1, sm: 2 },
                textDecoration: 'none',
                color: 'inherit',
                mr: 'auto',
                cursor: 'pointer',
              }}
            >
              <Logo
                variant="icon"
                transparent
                width={isMobile ? 40 : 50}
                height={isMobile ? 40 : 50}
              />
              <Box
                sx={{
                  display: { xs: 'none', sm: 'flex' },
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontFamily: '"Courier New", monospace',
                    letterSpacing: '0.5px',
                    fontSize: { xs: '1rem', sm: '1.25rem' },
                    lineHeight: 1.2,
                  }}
                >
                  thisnamespace
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: { xs: '0.7rem', sm: '0.75rem' },
                    color: 'text.secondary',
                    fontWeight: 500,
                    mt: -0.5,
                  }}
                >
                  Michael Day
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              {isMobile ? (
                <>
                  <IconButton
                    onClick={handleThemeMenuOpen}
                    color="inherit"
                    aria-label={getThemeAriaLabel()}
                    sx={{ minWidth: 44, minHeight: 44 }}
                  >
                    {getThemeIcon()}
                  </IconButton>
                  <IconButton
                    onClick={() => setMobileMenuOpen(true)}
                    color="inherit"
                    aria-label="Open navigation menu"
                    sx={{ minWidth: 44, minHeight: 44 }}
                  >
                    <MenuIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  {navItems.map((item) =>
                    item.external ? (
                      <IconButton
                        key={item.label}
                        onClick={() => handleNavClick(item.path, item.external)}
                        color="inherit"
                        aria-label={`Open ${item.label} in new tab`}
                        sx={{ minWidth: 44, minHeight: 44 }}
                      >
                        <MenuBook />
                      </IconButton>
                    ) : (
                      <Button
                        key={item.label}
                        onClick={() => handleNavClick(item.path, item.external)}
                        sx={{
                          color: 'text.primary',
                          fontSize: { xs: '0.75rem', md: '0.875rem' },
                          px: { xs: 1, md: 2 },
                        }}
                        aria-label={`Navigate to ${item.label} section`}
                      >
                        {item.label}
                      </Button>
                    )
                  )}
                  <IconButton
                    onClick={handleThemeMenuOpen}
                    color="inherit"
                    aria-label={getThemeAriaLabel()}
                    sx={{ minWidth: 44, minHeight: 44 }}
                  >
                    {getThemeIcon()}
                  </IconButton>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Menu
        anchorEl={themeMenuAnchor}
        open={Boolean(themeMenuAnchor)}
        onClose={handleThemeMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => handleThemeChange('light')} selected={themePreference === 'light'}>
          <ListItemIcon>
            <Brightness7 fontSize="small" />
          </ListItemIcon>
          <ListItemText>Light</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleThemeChange('dark')} selected={themePreference === 'dark'}>
          <ListItemIcon>
            <Brightness4 fontSize="small" />
          </ListItemIcon>
          <ListItemText>Dark</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => handleThemeChange('system')}
          selected={themePreference === 'system'}
        >
          <ListItemIcon>
            <BrightnessAuto fontSize="small" />
          </ListItemIcon>
          <ListItemText>System</ListItemText>
        </MenuItem>
      </Menu>

      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{
          sx: {
            width: '80%',
            maxWidth: 320,
            bgcolor: 'background.default',
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontFamily: '"Courier New", monospace', fontWeight: 700 }}>
            thisnamespace
          </Typography>
          <IconButton
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
            sx={{ minWidth: 44, minHeight: 44 }}
          >
            <Close />
          </IconButton>
        </Box>
        <List>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton onClick={() => handleNavClick(item.path, item.external)}>
                {item.external && (
                  <ListItemIcon>
                    <MenuBook />
                  </ListItemIcon>
                )}
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Header;
