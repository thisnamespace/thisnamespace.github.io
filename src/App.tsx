import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Shortcuts from './components/Shortcuts';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { shortcuts } from './data/content';

export type PageName = 'home' | 'not-found';

export interface AppProps {
  page: PageName;
}

/**
 * The whole site. There are two pages, each pre-built to HTML, so there is no router:
 * the server decides which file to send and the browser brings that page to life.
 */
const App = ({ page }: AppProps) => (
  <ErrorBoundary>
    <ThemeProvider>
      <Header />
      <main id="main-content">{page === 'home' ? <Home /> : <NotFound />}</main>
      <Footer />
      <Shortcuts
        title={shortcuts.title}
        toggleLabel={shortcuts.toggleLabel}
        keys={shortcuts.keys}
      />
    </ThemeProvider>
  </ErrorBoundary>
);

export default App;
