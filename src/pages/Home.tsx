import { Box } from '@mui/material';
import Hero from '../components/Hero';
import Clients from '../components/Clients';
import Interests from '../components/Interests';
import Journey from '../components/Journey';
import ExperienceTimeline from '../components/ExperienceTimeline';
import Contact from '../components/Contact';
import { clients, contact, experience, interests, journey, profile } from '../data/content';
import { usePageTitle } from '../hooks/usePageTitle';

const Home = () => {
  usePageTitle();

  return (
    <Box id="main-content">
      <Hero />
      <Clients title={clients.title} body={clients.body} names={clients.names} />
      <Interests title={interests.title} items={interests.items} />
      <Journey title={journey.title} body={journey.body} paths={journey.paths} />
      <ExperienceTimeline entries={experience} linkedinUrl={profile.linkedin} />
      <Contact
        title={contact.title}
        body={contact.body}
        email={profile.email}
        linkedinUrl={profile.linkedin}
        githubUrl={profile.github}
      />
    </Box>
  );
};

export default Home;
