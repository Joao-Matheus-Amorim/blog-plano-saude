import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header.jsx';
import PageTransition from './components/PageTransition.jsx';
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx';
import PaginaBlog from './pages/PaginaBlog.jsx';
import PaginaContato from './pages/PaginaContato.jsx';
import PaginaSobre from './pages/PaginaSobre.jsx';
import PaginaOperadoras from './pages/PaginaOperadoras.jsx';
import PaginaDepoimentos from './pages/PaginaDepoimentos.jsx';
import PaginaFAQ from './pages/PaginaFAQ.jsx';
import PopUp from './components/Simulador.jsx';
// ✅ COMPONENTE GOOGLE ANALYTICS
function GoogleAnalytics() {
  const location = useLocation();
  const GA_TRACKING_ID = 'G-FY4Z9HBPD2';

  useEffect(() => {
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_TRACKING_ID}', {
        page_path: window.location.pathname,
      });
    `;
    document.head.appendChild(script2);
  }, []);

  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
}

// ✅ SCROLL ULTRA SUAVE PARA O TOPO
function useSmoothScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);
}

// ✅ COMPONENTE DE ROTAS COM TRANSIÇÕES ULTRA FLUIDAS
function AnimatedRoutes() {
  const location = useLocation();
  useSmoothScrollToTop();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><PaginaBlog /></PageTransition>} />
        <Route path="/contato" element={<PageTransition><PaginaContato /></PageTransition>} />
        <Route path="/sobre" element={<PageTransition><PaginaSobre /></PageTransition>} />
        <Route path="/operadoras" element={<PageTransition><PaginaOperadoras /></PageTransition>} />
        <Route path="/depoimentos" element={<PageTransition><PaginaDepoimentos /></PageTransition>} />
        <Route path="/faq" element={<PageTransition><PaginaFAQ /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Router>
      <GoogleAnalytics />
      
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <Header />
        
        <main style={{ 
          flex: 1,
          position: 'relative',
          isolation: 'isolate',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        }}>
          <AnimatedRoutes />
        </main>

        {/* ✅ FOOTER COM LOGO */}
        <footer style={{ 
          background: 'linear-gradient(180deg, #FAF8F5 0%, #F0ECE6 100%)',
          padding: 'clamp(100px, 12vw, 140px) clamp(40px, 8vw, 100px) clamp(50px, 6vw, 70px)',
          borderTop: '1px solid rgba(197, 188, 181, 0.15)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-200px',
            right: '10%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(197, 188, 181, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(100px)',
            pointerEvents: 'none'
          }}/>

          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: 'clamp(48px, 7vw, 80px)',
              marginBottom: 'clamp(80px, 10vw, 120px)'
            }}>
              {/* ✅ Coluna 1: Branding COM LOGO */}
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: 'clamp(20px, 3vw, 28px)'
                }}>
                  {/* ✅ LOGO COM LAZY LOADING */}
                  <img 
                    src="/logo.png" 
                    alt="Maisa Valentim Logo" 
                    loading="lazy"
                    style={{ 
                      width: '40px', 
                      height: '40px',
                      objectFit: 'contain'
                    }} 
                  />
                  <h3 style={{
                    fontSize: 'clamp(26px, 3.8vw, 38px)',
                    fontWeight: '300',
                    background: 'linear-gradient(135deg, #8B7E74 0%, #A8877A 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    margin: 0,
                    lineHeight: 1,
                    letterSpacing: '-0.01em',
                    fontFamily: "'Playfair Display', serif"
                  }}>
                    Maisa Valentim
                  </h3>
                </div>
                <p style={{
                  fontSize: 'clamp(13px, 1.6vw, 15px)',
                  color: '#6B6662',
                  lineHeight: 2,
                  fontWeight: '300',
                  maxWidth: '360px',
                  marginBottom: 'clamp(24px, 3vw, 32px)'
                }}>
                  Consultoria especializada em planos de saúde com atendimento humanizado e suporte vitalício.
                </p>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: 'rgba(197, 188, 181, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(197, 188, 181, 0.2)',
                  borderRadius: '8px',
                  fontSize: 'clamp(11px, 1.3vw, 13px)',
                  color: '#9B9289',
                  fontWeight: '500',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase'
                }}>
                  <span style={{ fontSize: '14px' }}>✦</span>
                  Domingo a Domingo
                </div>
              </div>

              {/* Coluna 2: Links */}
              <div>
                <h4 style={{
                  fontSize: 'clamp(11px, 1.4vw, 13px)',
                  fontWeight: '600',
                  color: '#9B9289',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: 'clamp(28px, 4vw, 40px)'
                }}>
                  Navegação
                </h4>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'clamp(14px, 2vw, 18px)'
                }}>
                  {[
                    { to: '/', label: 'Início' },
                    { to: '/sobre', label: 'Sobre' },
                    { to: '/operadoras', label: 'Operadoras' },
                    { to: '/depoimentos', label: 'Depoimentos' },
                    { to: '/faq', label: 'FAQ' },
                    { to: '/contato', label: 'Contato' }
                  ].map((link, i) => (
                    <Link 
                      key={i} 
                      to={link.to}
                      onClick={scrollToTop}
                      style={{
                        fontSize: 'clamp(15px, 1.9vw, 17px)',
                        color: '#6B6662',
                        textDecoration: 'none',
                        fontWeight: '300',
                        transition: 'all 0.3s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.color = '#8B7E74';
                        e.currentTarget.style.transform = 'translateX(6px)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.color = '#6B6662';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      <span style={{ fontSize: '12px' }}>→</span> {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Coluna 3: Redes Sociais */}
              <div>
                <h4 style={{
                  fontSize: 'clamp(11px, 1.4vw, 13px)',
                  fontWeight: '600',
                  color: '#9B9289',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: 'clamp(28px, 4vw, 40px)'
                }}>
                  Conecte-se
                </h4>
                
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'clamp(12px, 1.8vw, 16px)'
                }}>
                  {/* Botão Instagram */}
                  <a href="https://www.instagram.com/planosdesaudemaisavalentim/" target="_blank" rel="noopener noreferrer" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: 'clamp(13px, 1.6vw, 15px)',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    fontWeight: '500',
                    padding: 'clamp(12px, 1.8vw, 15px) clamp(24px, 3.5vw, 32px)',
                    background: 'linear-gradient(135deg, #E4405F 0%, #C13584 100%)',
                    borderRadius: '12px',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    letterSpacing: '0.03em',
                    boxShadow: '0 8px 28px rgba(228, 64, 95, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transform: 'perspective(1000px) rotateX(0deg)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'perspective(1000px) rotateX(-4deg) translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 16px 48px rgba(228, 64, 95, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 28px rgba(228, 64, 95, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)';
                  }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    Instagram
                  </a>

                  {/* Botão WhatsApp */}
                  <a href="https://wa.me/5521977472141?text=Olá!%20Gostaria%20de%20uma%20cotação%20de%20plano%20de%20saúde." target="_blank" rel="noopener noreferrer" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: 'clamp(13px, 1.6vw, 15px)',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    fontWeight: '500',
                    padding: 'clamp(12px, 1.8vw, 15px) clamp(24px, 3.5vw, 32px)',
                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                    borderRadius: '12px',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    letterSpacing: '0.03em',
                    boxShadow: '0 8px 28px rgba(37, 211, 102, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transform: 'perspective(1000px) rotateX(0deg)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'perspective(1000px) rotateX(-4deg) translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 16px 48px rgba(37, 211, 102, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 28px rgba(37, 211, 102, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)';
                  }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                  </a>

                  {/* Botão E-mail */}
                  <a href="mailto:maisarvalentim@gmail.com" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: 'clamp(13px, 1.6vw, 15px)',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    fontWeight: '500',
                    padding: 'clamp(12px, 1.8vw, 15px) clamp(24px, 3.5vw, 32px)',
                    background: 'linear-gradient(135deg, #A8877A 0%, #8B7E74 100%)',
                    borderRadius: '12px',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    letterSpacing: '0.03em',
                    boxShadow: '0 8px 28px rgba(168, 135, 122, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transform: 'perspective(1000px) rotateX(0deg)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'perspective(1000px) rotateX(-4deg) translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 16px 48px rgba(168, 135, 122, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 28px rgba(168, 135, 122, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)';
                  }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    E-mail
                  </a>
                </div>
              </div>
            </div>

            {/* Linha divisória */}
            <div style={{
              width: '100%',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(197, 188, 181, 0.3), transparent)',
              marginBottom: 'clamp(32px, 4vw, 48px)'
            }}/>

            {/* Copyright */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px'
            }}>
              <p style={{ 
                fontSize: 'clamp(12px, 1.5vw, 14px)', 
                color: '#9B9289',
                fontWeight: '300',
                margin: 0,
                letterSpacing: '0.02em'
              }}>
                © 2025 Maisa Valentim. Todos os direitos reservados.
              </p>
              <p style={{ 
                fontSize: 'clamp(11px, 1.4vw, 13px)', 
                color: '#C5BCB5',
                fontWeight: '300',
                margin: 0,
                fontStyle: 'italic',
                letterSpacing: '0.02em'
              }}>
                Cuidando da sua saúde com dedicação ✦
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* ✅ BOTÃO FLUTUANTE WHATSAPP */}
      <FloatingWhatsApp />
    </Router>
  );
}

export default App;
