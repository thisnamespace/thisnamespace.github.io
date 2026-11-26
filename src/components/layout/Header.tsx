import { useRef } from 'react';
import Icon, { type IconName } from '../Icon';
import { useThemeContext, type ThemePreference } from '../../contexts/ThemeContext';

interface NavItem {
  label: string;
  hash: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Interests', hash: '#interests' },
  { label: 'Journey', hash: '#journey' },
  { label: 'Experience', hash: '#experience' },
  { label: 'Contact', hash: '#contact' },
];

const THEME_ORDER: ThemePreference[] = ['light', 'dark', 'system'];
const THEME_LABEL: Record<ThemePreference, string> = {
  light: 'light',
  dark: 'dark',
  system: 'match system',
};
const THEME_ICON: Record<ThemePreference, IconName> = {
  light: 'sun',
  dark: 'moon',
  system: 'auto',
};

// eslint-disable-next-line react-refresh/only-export-components
export const nextTheme = (current: ThemePreference): ThemePreference =>
  THEME_ORDER[(THEME_ORDER.indexOf(current) + 1) % THEME_ORDER.length];

const Header = () => {
  const { themePreference, setThemePreference } = useThemeContext();
  const drawerRef = useRef<HTMLDialogElement>(null);
  const upcoming = nextTheme(themePreference);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <header className="site-header">
        <div className="wrap site-header__bar">
          <a className="brand" href="/" data-testid="home-link">
            <svg className="brand__mark" viewBox="0 0 44 32" aria-hidden="true" focusable="false">
              <path
                d="M9 3H3v26h6M35 3h6v26h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g className="brand__dots">
                <circle cx="14" cy="16" r="2.6" />
                <circle cx="22" cy="16" r="2.6" />
                <circle cx="30" cy="16" r="2.6" />
              </g>
            </svg>
            <span>
              <span className="brand__name">thisnamespace</span>
              <span className="brand__person">Michael Day</span>
              <span className="visually-hidden">, home</span>
            </span>
          </a>

          <nav className="site-nav" aria-label="Main">
            {NAV_ITEMS.map((item) => (
              <a key={item.hash} href={`/${item.hash}`}>
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="icon-button"
            onClick={() => setThemePreference(upcoming)}
            aria-label={`Theme: ${THEME_LABEL[themePreference]}. Switch to ${THEME_LABEL[upcoming]}.`}
            data-testid="theme-button"
            data-theme-setting={themePreference}
          >
            <Icon name={THEME_ICON[themePreference]} />
          </button>

          <button
            type="button"
            className="icon-button menu-button"
            onClick={() => drawerRef.current?.showModal()}
            aria-label="Open navigation menu"
            data-testid="menu-button"
          >
            <Icon name="menu" />
          </button>
        </div>
      </header>

      <dialog ref={drawerRef} className="drawer" aria-label="Menu">
        <div className="drawer__close">
          <button
            type="button"
            className="icon-button"
            onClick={() => drawerRef.current?.close()}
            aria-label="Close navigation menu"
          >
            <Icon name="close" />
          </button>
        </div>
        <nav aria-label="Main, mobile">
          {NAV_ITEMS.map((item) => (
            <a key={item.hash} href={`/${item.hash}`} onClick={() => drawerRef.current?.close()}>
              {item.label}
            </a>
          ))}
        </nav>
      </dialog>
    </>
  );
};

export default Header;
