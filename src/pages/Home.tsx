import Hero from '../components/Hero';
import Clients from '../components/Clients';
import Interests from '../components/Interests';
import Journey from '../components/Journey';
import PageSpeed from '../components/PageSpeed';
import ExperienceTimeline from '../components/ExperienceTimeline';
import Built from '../components/Built';
import Away from '../components/Away';
import Contact from '../components/Contact';
import {
  away,
  built,
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
      <Built title={built.title} items={built.items} />
      <ExperienceTimeline entries={experience} linkedinUrl={profile.linkedin} />
      <Away title={away.title} body={away.body} places={away.places} photo={away.photo} />
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
