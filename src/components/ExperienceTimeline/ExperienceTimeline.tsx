import type { ExperienceEntry } from '../../types';

export interface ExperienceTimelineProps {
  entries: ExperienceEntry[];
  linkedinUrl: string;
}

const ExperienceTimeline = ({ entries, linkedinUrl }: ExperienceTimelineProps) => (
  <section
    id="experience"
    className="section section--surface"
    aria-labelledby="experience-heading"
  >
    <div className="wrap">
      <h2 id="experience-heading" className="reveal">
        Experience
      </h2>

      <ol className="timeline" reversed>
        {entries.map((entry) => (
          <li className="timeline__entry reveal" key={entry.id} data-testid="experience-entry">
            <p className="timeline__period">{entry.period}</p>
            <div>
              <h3>
                {entry.title}, {entry.company}
              </h3>
              <p>{entry.note}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="timeline__more">
        The full history is on{' '}
        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        .
      </p>
    </div>
  </section>
);

export default ExperienceTimeline;
