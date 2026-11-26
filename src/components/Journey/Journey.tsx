import type { CSSProperties } from 'react';
import type { TechPath } from '../../types';

export interface JourneyProps {
  title: string;
  body: string;
  /** Sequences shown as timelines, for example technologies and kinds of product. */
  paths: TechPath[];
}

/** How the work has changed over time, shown as one timeline per path. */
const Journey = ({ title, body, paths }: JourneyProps) => (
  <section id="journey" className="section" aria-labelledby="journey-heading">
    <div className="wrap">
      <h2 id="journey-heading" className="reveal">
        {title}
      </h2>
      <p className="lede reveal">{body}</p>

      {paths.map((path) => (
        <div className="path" key={path.id}>
          <p id={`journey-path-${path.id}`} className="path__label">
            {path.label}
          </p>
          <ol
            className="path__steps"
            aria-labelledby={`journey-path-${path.id}`}
            data-testid={`path-${path.id}`}
            style={{ '--steps': path.steps.length } as CSSProperties}
          >
            {path.steps.map((step, index) => (
              <li className="path__step" key={step.id} style={{ '--i': index } as CSSProperties}>
                <p className="path__name">{step.name}</p>
                <p className="path__note">{step.note}</p>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  </section>
);

export default Journey;
