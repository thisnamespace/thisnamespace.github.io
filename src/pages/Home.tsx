import { Box } from '@mui/material';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <Box id="main-content">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </Box>
  );
};

export default Home;
