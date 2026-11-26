import type { CSSProperties } from 'react';
import type { Interest } from '../../types';

export interface InterestsProps {
  title: string;
  items: Interest[];
}

/** What Michael cares about: short statements, not a list of achievements. */
const Interests = ({ title, items }: InterestsProps) => (
  <section id="interests" className="section section--surface" aria-labelledby="interests-heading">
    <div className="wrap">
      <h2 id="interests-heading" className="reveal">
        {title}
      </h2>
      <ul className="interests__list reveal-list" data-testid="interest-list">
        {items.map((item, index) => (
          <li key={item.id} style={{ '--i': index % 3 } as CSSProperties}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Interests;
