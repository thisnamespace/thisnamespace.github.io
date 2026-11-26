export interface LogoProps {
  /** Sizing and colour come from the parent's class. The braces use the text colour. */
  className?: string;
}

/**
 * The thisnamespace mark: curly braces around one dot.
 * The braces are the namespace and the dot is "this". Decorative, so it is hidden
 * from screen readers; the text next to it carries the name.
 */
const Logo = ({ className }: LogoProps) => (
  <svg
    className={className ? `logo ${className}` : 'logo'}
    viewBox="0 0 44 32"
    aria-hidden="true"
    focusable="false"
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        className="logo__left"
        d="M13 3c-4 0-5 2-5 5v4c0 2.5-1.5 4-4 4 2.5 0 4 1.5 4 4v4c0 3 1 5 5 5"
      />
      <path
        className="logo__right"
        d="M31 3c4 0 5 2 5 5v4c0 2.5 1.5 4 4 4-2.5 0-4 1.5-4 4v4c0 3-1 5-5 5"
      />
    </g>
    <circle className="logo__dot" cx="22" cy="16" r="3.6" />
  </svg>
);

export default Logo;
