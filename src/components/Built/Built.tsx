import type { CSSProperties } from 'react';
import type { BuiltItem } from '../../types';

export interface BuiltProps {
  title: string;
  items: BuiltItem[];
}

/** Michael's own projects, each with links out to it. */
const Built = ({ title, items }: BuiltProps) => (
  <section id="built" className="section section--ruled" aria-labelledby="built-heading">
    <div className="wrap">
      <h2 id="built-heading" className="reveal">
        {title}
      </h2>
      <ul className="built__list reveal-list" data-testid="built-list">
        {items.map((item, index) => (
          <li key={item.id} style={{ '--i': index } as CSSProperties}>
            <h3>{item.name}</h3>
            <p>{item.body}</p>
            <div className="built__links">
              {item.links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Built;
