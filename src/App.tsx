import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollManager from './components/ScrollManager';
import Shortcuts from './components/Shortcuts';
import { shortcuts } from './data/content';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <CssBaseline />
        <Router>
          <ScrollManager />
          <Shortcuts
            title={shortcuts.title}
            toggleLabel={shortcuts.toggleLabel}
            keys={shortcuts.keys}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Box component="main" sx={{ flexGrow: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                {/* The site used to have case study pages; send old links home. */}
                <Route path="/work/*" element={<Navigate to="/" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Box>
            <Footer />
          </Box>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
