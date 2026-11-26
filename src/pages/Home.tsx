import { Box } from '@mui/material';
import Hero from '../components/Hero';
import Clients from '../components/Clients';
import Craft from '../components/Craft';
import CaseStudyList from '../components/CaseStudyList';
import Approach from '../components/Approach';
import ExperienceTimeline from '../components/ExperienceTimeline';
import Contact from '../components/Contact';
import {
  approach,
  caseStudies,
  clients,
  contact,
  craft,
  experience,
  profile,
} from '../data/content';
import { usePageTitle } from '../hooks/usePageTitle';

const Home = () => {
  usePageTitle();

  return (
    <Box id="main-content">
      <Hero />
      <Clients title={clients.title} body={clients.body} names={clients.names} />
      <Craft
        title={craft.title}
        body={craft.body}
        pathLabel={craft.pathLabel}
        path={craft.path}
        focus={craft.focus}
      />
      <CaseStudyList studies={caseStudies} />
      <Approach title={approach.title} principles={approach.principles} />
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
