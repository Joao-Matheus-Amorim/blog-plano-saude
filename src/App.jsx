import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header.jsx';
import PageTransition from './components/PageTransition.jsx';
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx';
import PopupSaida from './components/Popupsaida.jsx';
import PremiumMotion from './components/PremiumMotion.jsx';
import PaginaLandingConversao from './pages/PaginaLandingConversao.jsx';
import PaginaContato from './pages/PaginaContato.jsx';
import PaginaSobre from './pages/PaginaSobrePremium.jsx';
import PaginaOperadoras from './pages/PaginaOperadoras.jsx';
import PaginaDepoimentos from './pages/PaginaDepoimentos.jsx';
import PaginaFAQ from './pages/PaginaFAQ.jsx';
import PaginaAdmin from './pages/PaginaAdmin.jsx';
import PaginaBlog2 from './pages/PaginaBlog2.jsx';
import PaginaBlogPost from './pages/PaginaBlogPost.jsx';

const GA_TRACKING_ID = 'G-FY4Z9HBPD2';

function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    if (document.querySelector(`script[src*="${GA_TRACKING_ID}"]`)) return;

    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_TRACKING_ID}', { page_path: window.location.pathname });
    `;
    document.head.appendChild(script2);
  }, []);

  useEffect(() => {
    window.gtag?.('event', 'page_view', {
      page_path: location.pathname + location.search,
    });
  }, [location]);

  return null;
}

function useSmoothScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);
}

function AnimatedRoutes() {
  const location = useLocation();
  useSmoothScrollToTop();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><PaginaLandingConversao /></PageTransition>} />
        <Route path="/contato" element={<PageTransition><PaginaContato /></PageTransition>} />
        <Route path="/sobre" element={<PageTransition><PaginaSobre /></PageTransition>} />
        <Route path="/operadoras" element={<PageTransition><PaginaOperadoras /></PageTransition>} />
        <Route path="/depoimentos" element={<PageTransition><PaginaDepoimentos /></PageTransition>} />
        <Route path="/admin" element={<PageTransition><PaginaAdmin /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><PaginaBlog2 /></PageTransition>} />
        <Route path="/blog/:slug" element={<PageTransition><PaginaBlogPost /></PageTransition>} />
        <Route path="/faq" element={<PageTransition><PaginaFAQ /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function AppShell() {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <>
      <GoogleAnalytics />
      {!isLanding && <PremiumMotion />}
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
        {!isLanding && <Header />}
        <main style={{ flex: 1, position: 'relative', isolation: 'isolate', WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}>
          <AnimatedRoutes />
        </main>
      </div>
      {!isLanding && <FloatingWhatsApp />}
      {!isLanding && <PopupSaida />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}

export default App;
