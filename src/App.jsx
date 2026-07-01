import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header.jsx';
import PageTransition from './components/PageTransition.jsx';
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx';
import PopupSaida from './components/Popupsaida.jsx';
import PremiumMotion from './components/PremiumMotion.jsx';
import PaginaHomeConversao from './pages/PaginaHomeConversao.jsx';
import PaginaPlanoIntencao from './pages/PaginaPlanoIntencao.jsx';
import PaginaContato from './pages/PaginaContato.jsx';
import PaginaSobre from './pages/PaginaSobrePremium.jsx';
import PaginaOperadoras from './pages/PaginaOperadoras.jsx';
import PaginaDepoimentos from './pages/PaginaDepoimentos.jsx';
import PaginaFAQ from './pages/PaginaFAQ.jsx';
import PaginaAdmin from './pages/PaginaAdmin.jsx';
import PaginaAdminOrganico from './pages/PaginaAdminOrganico.jsx';
import PaginaBlog2 from './pages/PaginaBlog2.jsx';
import PaginaBlogPost from './pages/PaginaBlogPost.jsx';

const GA_TRACKING_ID = 'G-FY4Z9HBPD2';

function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    if (document.querySelector(`script[src*="${GA_TRACKING_ID}"]`)) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() {
      window.dataLayer.push(arguments);
    };

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    window.gtag('js', new Date());
    window.gtag('config', GA_TRACKING_ID, { page_path: window.location.pathname });
  }, []);

  useEffect(() => {
    const pagePath = location.pathname + location.search;
    window.gtag?.('event', 'page_view', {
      page_path: pagePath,
    });

    if (!location.pathname.startsWith('/admin')) {
      const params = new URLSearchParams(location.search);
      const sourceTag = params.get('origem') || params.get('tag_origem') || 'site_organico';
      fetch('/api/organic/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action_type: 'page_view',
          page_path: pagePath,
          source_tag: sourceTag,
          source_channel: sourceTag.includes('whatsapp') ? 'WhatsApp orgânico' : 'Direto/orgânico',
          plan_type: location.pathname.includes('/planos/mei') ? 'MEI' : 'Plano de saúde',
          target_key: 'pagina',
        }),
        keepalive: true,
      }).catch(() => {});
    }
  }, [location]);

  return null;
}

function useSmoothScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      requestAnimationFrame(() => {
        if (location.hash) {
          const target = document.getElementById(location.hash.slice(1));
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
          }
        }

        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      });
    }, 80);

    return () => clearTimeout(timer);
  }, [location.pathname, location.search, location.hash]);
}

function AnimatedRoutes() {
  const location = useLocation();
  const routeKey = `${location.pathname}${location.search}${location.hash}`;
  useSmoothScrollToTop();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={routeKey}>
        <Route path="/" element={<PageTransition><PaginaHomeConversao /></PageTransition>} />
        <Route path="/cotacao" element={<PageTransition><PaginaHomeConversao /></PageTransition>} />
        <Route path="/planos/mei" element={<PageTransition><PaginaPlanoIntencao tipo="mei" /></PageTransition>} />
        <Route path="/planos/familiar" element={<PageTransition><PaginaPlanoIntencao tipo="familiar" /></PageTransition>} />
        <Route path="/planos/empresarial" element={<PageTransition><PaginaPlanoIntencao tipo="empresarial" /></PageTransition>} />
        <Route path="/planos/portabilidade" element={<PageTransition><PaginaPlanoIntencao tipo="portabilidade" /></PageTransition>} />
        <Route path="/contato" element={<PageTransition><PaginaContato /></PageTransition>} />
        <Route path="/sobre" element={<PageTransition><PaginaSobre /></PageTransition>} />
        <Route path="/operadoras" element={<PageTransition><PaginaOperadoras /></PageTransition>} />
        <Route path="/depoimentos" element={<PageTransition><PaginaDepoimentos /></PageTransition>} />
        <Route path="/admin" element={<PageTransition><PaginaAdmin /></PageTransition>} />
        <Route path="/admin/organico" element={<PageTransition><PaginaAdminOrganico /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><PaginaBlog2 /></PageTransition>} />
        <Route path="/blog/:slug" element={<PageTransition><PaginaBlogPost /></PageTransition>} />
        <Route path="/faq" element={<PageTransition><PaginaFAQ /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function AppShell() {
  const location = useLocation();
  const isLanding = location.pathname === '/' || location.pathname === '/cotacao' || location.pathname.startsWith('/planos/');

  return (
    <>
      <GoogleAnalytics />
      {!isLanding && <PremiumMotion />}
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'hidden', position: 'relative' }}>
        {!isLanding && <Header />}
        <main style={{ flex: 1, width: '100%', position: 'relative', isolation: 'isolate', WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}>
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
