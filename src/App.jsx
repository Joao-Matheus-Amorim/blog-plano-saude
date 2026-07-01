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
import PaginaLinksOrganicos from './pages/PaginaLinksOrganicos.jsx';
import PaginaContato from './pages/PaginaContato.jsx';
import PaginaSobre from './pages/PaginaSobrePremium.jsx';
import PaginaOperadoras from './pages/PaginaOperadoras.jsx';
import PaginaDepoimentos from './pages/PaginaDepoimentos.jsx';
import PaginaFAQ from './pages/PaginaFAQ.jsx';
import PaginaAdmin from './pages/PaginaAdmin.jsx';
import PaginaAdminOrganico from './pages/PaginaAdminOrganico.jsx';
import PaginaAdminLinks from './pages/PaginaAdminLinks.jsx';
import PaginaAdminRadar from './pages/PaginaAdminRadar.jsx';
import PaginaBlog2 from './pages/PaginaBlog2.jsx';
import PaginaBlogPost from './pages/PaginaBlogPost.jsx';

const GA_TRACKING_ID = 'G-FY4Z9HBPD2';
const ORGANIC_SESSION_KEY = 'maisa_organic_session_key';
const ORGANIC_SESSION_DEPTH_KEY = 'maisa_organic_page_depth';

function inferSourceTag(search = '') {
  const params = new URLSearchParams(search);
  return params.get('origem') || params.get('tag_origem') || params.get('ref') || params.get('canal') || 'site_organico';
}

function inferSourceChannel(sourceTag = '') {
  const value = sourceTag.toLowerCase();
  if (value.includes('whatsapp')) return 'WhatsApp orgânico';
  if (value.includes('instagram')) return 'Instagram orgânico';
  if (value.includes('facebook') || value.includes('grupo')) return 'Facebook/grupos';
  if (value.includes('google')) return 'Google orgânico';
  if (value.includes('radar')) return 'Radar B2B';
  if (value.includes('indicacao') || value.includes('referencia')) return 'Indicação';
  return 'Direto/orgânico';
}

function inferPlanType(pathname = '') {
  if (pathname.includes('/planos/mei')) return 'MEI';
  if (pathname.includes('/planos/familiar')) return 'Família';
  if (pathname.includes('/planos/empresarial')) return 'Empresarial';
  if (pathname.includes('/planos/portabilidade')) return 'Portabilidade';
  if (pathname.includes('/planos/individual')) return 'Individual';
  if (pathname.includes('/planos/idoso')) return 'Sênior';
  if (pathname.includes('/planos/gestante')) return 'Gestante';
  if (pathname.includes('/plano-saude-mage')) return 'Magé';
  if (pathname.includes('/plano-saude-piabeta')) return 'Piabetá';
  return 'Plano de saúde';
}

function getOrganicSessionKey() {
  try {
    const existing = sessionStorage.getItem(ORGANIC_SESSION_KEY);
    if (existing) return existing;

    const key = `sess_${crypto?.randomUUID?.() || `${Date.now()}_${Math.random().toString(36).slice(2)}`}`;
    sessionStorage.setItem(ORGANIC_SESSION_KEY, key);
    return key;
  } catch {
    return `sess_${Date.now()}`;
  }
}

function nextPageDepth() {
  try {
    const current = Number(sessionStorage.getItem(ORGANIC_SESSION_DEPTH_KEY) || 0) + 1;
    sessionStorage.setItem(ORGANIC_SESSION_DEPTH_KEY, String(current));
    return current;
  } catch {
    return 1;
  }
}

function postOrganicSession(payload) {
  fetch('/api/organic/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {});
}

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
      const sourceTag = inferSourceTag(location.search);
      const sourceChannel = inferSourceChannel(sourceTag);
      const planType = inferPlanType(location.pathname);
      const payload = {
        action_type: 'page_view',
        page_path: pagePath,
        source_tag: sourceTag,
        source_channel: sourceChannel,
        plan_type: planType,
        target_key: 'pagina',
      };

      fetch('/api/organic/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {});

      postOrganicSession({
        ...payload,
        session_key: getOrganicSessionKey(),
        page_depth: nextPageDepth(),
      });
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
        <Route path="/links" element={<PageTransition><PaginaLinksOrganicos /></PageTransition>} />
        <Route path="/planos/mei" element={<PageTransition><PaginaPlanoIntencao tipo="mei" /></PageTransition>} />
        <Route path="/planos/familiar" element={<PageTransition><PaginaPlanoIntencao tipo="familiar" /></PageTransition>} />
        <Route path="/planos/empresarial" element={<PageTransition><PaginaPlanoIntencao tipo="empresarial" /></PageTransition>} />
        <Route path="/planos/individual" element={<PageTransition><PaginaPlanoIntencao tipo="individual" /></PageTransition>} />
        <Route path="/planos/idoso" element={<PageTransition><PaginaPlanoIntencao tipo="idoso" /></PageTransition>} />
        <Route path="/planos/gestante" element={<PageTransition><PaginaPlanoIntencao tipo="gestante" /></PageTransition>} />
        <Route path="/planos/portabilidade" element={<PageTransition><PaginaPlanoIntencao tipo="portabilidade" /></PageTransition>} />
        <Route path="/plano-saude-mage" element={<PageTransition><PaginaPlanoIntencao tipo="mage" /></PageTransition>} />
        <Route path="/plano-saude-piabeta" element={<PageTransition><PaginaPlanoIntencao tipo="piabeta" /></PageTransition>} />
        <Route path="/contato" element={<PageTransition><PaginaContato /></PageTransition>} />
        <Route path="/sobre" element={<PageTransition><PaginaSobre /></PageTransition>} />
        <Route path="/operadoras" element={<PageTransition><PaginaOperadoras /></PageTransition>} />
        <Route path="/depoimentos" element={<PageTransition><PaginaDepoimentos /></PageTransition>} />
        <Route path="/admin" element={<PageTransition><PaginaAdmin /></PageTransition>} />
        <Route path="/admin/organico" element={<PageTransition><PaginaAdminOrganico /></PageTransition>} />
        <Route path="/admin/links" element={<PageTransition><PaginaAdminLinks /></PageTransition>} />
        <Route path="/admin/radar" element={<PageTransition><PaginaAdminRadar /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><PaginaBlog2 /></PageTransition>} />
        <Route path="/blog/:slug" element={<PageTransition><PaginaBlogPost /></PageTransition>} />
        <Route path="/faq" element={<PageTransition><PaginaFAQ /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function AppShell() {
  const location = useLocation();
  const isLanding = location.pathname === '/' || location.pathname === '/cotacao' || location.pathname.startsWith('/planos/') || location.pathname.startsWith('/plano-saude-') || location.pathname === '/links';

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
