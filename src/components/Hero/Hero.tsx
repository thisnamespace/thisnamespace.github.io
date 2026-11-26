import DeliveryLoop from '../DeliveryLoop';
import LivingHeadline from '../LivingHeadline';
import { loopIntro, loopStages, profile } from '../../data/content';

const Hero = () => (
  <section className="hero" aria-labelledby="hero-heading">
    <div className="wrap hero__grid">
      <div>
        <p className="hero__name">
          {profile.name}, {profile.role.toLowerCase()}
        </p>
        <LivingHeadline id="hero-heading" text={profile.headline} pointerArea=".hero" />
        <p className="hero__lead">{profile.lead}</p>
        <div className="hero__actions">
          <a className="button button--gold" href="#interests">
            What I care about
          </a>
          <a className="button button--ghost" href="#contact">
            Get in touch
          </a>
        </div>
      </div>

      <DeliveryLoop
        title={loopIntro.title}
        stages={loopStages}
        closing={loopIntro.closing}
        runLabel={loopIntro.runLabel}
        rerunLabel={loopIntro.rerunLabel}
        stopLabel={loopIntro.stopLabel}
      />
    </div>
  </section>
);

export default Hero;
