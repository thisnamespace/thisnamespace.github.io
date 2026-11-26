import type { Photo, PlaceGroup } from '../../types';

export interface AwayProps {
  title: string;
  body: string;
  places: PlaceGroup[];
  /** Portrait shown beside the text. The section works without one. */
  photo?: Photo;
}

/** A little of Michael's life outside work: travel, rugby and the places he has been. */
const Away = ({ title, body, places, photo }: AwayProps) => (
  <section id="away" className="section" aria-labelledby="away-heading">
    <div className={`wrap away__grid${photo ? ' away__grid--photo' : ''}`}>
      {photo ? (
        <img
          className="away__photo reveal"
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          loading="lazy"
          decoding="async"
        />
      ) : null}
      <div>
        <h2 id="away-heading" className="reveal">
          {title}
        </h2>
        <p className="away__body reveal">{body}</p>
        <dl className="places" data-testid="places">
          {places.map((group) => (
            <div className="places__group reveal" key={group.id} data-testid={`places-${group.id}`}>
              <dt>{group.label}</dt>
              <dd>{group.names.join(', ')}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  </section>
);

export default Away;
