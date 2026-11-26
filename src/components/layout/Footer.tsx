import Logo from '../Logo';
import { profile } from '../../data/content';
import { OPEN_SHORTCUTS_EVENT } from '../Shortcuts';

const Footer = () => (
  <footer className="site-footer">
    <div className="wrap site-footer__bar">
      {/* The year is fixed at build time, so the pre-built HTML and the browser agree. */}
      <p className="soft site-footer__sign">
        <Logo className="site-footer__mark" />© {__BUILD_YEAR__} {profile.name}
      </p>
      <nav aria-label="Elsewhere">
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href={profile.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href={`mailto:${profile.email}`}>Email</a>
        <button
          type="button"
          className="link-button shortcuts-link"
          data-testid="open-shortcuts"
          onClick={() => window.dispatchEvent(new Event(OPEN_SHORTCUTS_EVENT))}
        >
          Keyboard shortcuts
        </button>
      </nav>
    </div>
  </footer>
);

export default Footer;
