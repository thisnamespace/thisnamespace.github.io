import Hero from '../components/Hero';
import Clients from '../components/Clients';
import Interests from '../components/Interests';
import Journey from '../components/Journey';
import PageSpeed from '../components/PageSpeed';
import ExperienceTimeline from '../components/ExperienceTimeline';
import Contact from '../components/Contact';
import {
  clients,
  contact,
  experience,
  interests,
  journey,
  pageSpeed,
  profile,
} from '../data/content';
import { usePageMetrics } from '../hooks/usePageMetrics';

const Home = () => {
  const metrics = usePageMetrics();

  return (
    <>
      <Hero />
      <Clients title={clients.title} body={clients.body} names={clients.names} />
      <Interests title={interests.title} items={interests.items} />
      <PageSpeed
        title={pageSpeed.title}
        note={pageSpeed.note}
        labels={pageSpeed.labels}
        unavailable={pageSpeed.unavailable}
        cached={pageSpeed.cached}
        metrics={metrics}
      />
      <Journey title={journey.title} body={journey.body} paths={journey.paths} />
      <ExperienceTimeline entries={experience} linkedinUrl={profile.linkedin} />
      <Contact
        title={contact.title}
        body={contact.body}
        email={profile.email}
        linkedinUrl={profile.linkedin}
        githubUrl={profile.github}
      />
    </>
  );
};

export default Home;
