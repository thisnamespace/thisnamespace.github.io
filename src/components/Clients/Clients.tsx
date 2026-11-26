import type { CSSProperties } from 'react';

export interface ClientsProps {
  title: string;
  body: string;
  names: string[];
}

/** The brands and employers behind the experience. */
const Clients = ({ title, body, names }: ClientsProps) => (
  <section className="section section--ruled" aria-labelledby="clients-heading">
    <div className="wrap">
      <h2
        id="clients-heading"
        className="reveal"
        style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.6rem)' }}
      >
        {title}
      </h2>
      <p className="lede reveal">{body}</p>
      <ul
        className="brands__list reveal-list"
        aria-label="Companies and brands I have worked with"
        data-testid="brand-list"
      >
        {names.map((name, index) => (
          <li key={name} style={{ '--i': index % 5 } as CSSProperties}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Clients;
