import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const mobilePanelVariants = {
  hidden: { opacity: 0, y: -18, scale: 0.98, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.38,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.045
    }
  },
  exit: {
    opacity: 0,
    y: -12,
    scale: 0.98,
    filter: 'blur(8px)',
    transition: { duration: 0.24, ease: 'easeInOut' }
  }
};

const mobileItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } }
};

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => (
    typeof window === 'undefined' ? true : window.innerWidth >= 768
  ));

  useEffect(() => {
    const handleResize = () => {
      const nextIsDesktop = window.innerWidth >= 768;
      setIsDesktop(nextIsDesktop);

      if (nextIsDesktop) {
        setMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const links = [
    { to: '/', label: 'Início' },
    { to: '/sobre', label: 'Sobre' },
    { to: '/operadoras', label: 'Operadoras' },
    { to: '/depoimentos', label: 'Depoimentos' },
    { to: '/blog', label: 'Blog' },
    { to: '/faq', label: 'FAQ' }
  ];

  const isActivePath = (path) => (
    path === '/'
      ? location.pathname === '/'
      : location.pathname === path || location.pathname.startsWith(`${path}/`)
  );

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: 'rgba(255, 252, 246, 0.76)',
          backdropFilter: 'blur(26px) saturate(160%)',
          WebkitBackdropFilter: 'blur(26px) saturate(160%)',
          borderBottom: '1px solid rgba(37, 70, 35, 0.10)',
          boxShadow: '0 18px 55px rgba(24, 53, 31, 0.08)',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          overflow: 'hidden'
        }}
      >
        <span style={{
          position: 'absolute',
          width: '160px',
          height: '160px',
          right: '8%',
          top: '-118px',
          borderRadius: '999px',
          background: 'radial-gradient(circle, rgba(143,161,133,0.22), transparent 68%)',
          filter: 'blur(10px)',
          pointerEvents: 'none'
        }} />

        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '14px clamp(18px, 5vw, 64px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 'clamp(14px, 3vw, 24px)',
          position: 'relative',
          zIndex: 1
        }}>
          <motion.div
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.985 }}
            transition={{ duration: 0.25 }}
          >
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '13px',
                textDecoration: 'none',
                minWidth: 'fit-content'
              }}
            >
              <span style={{
                width: '48px',
                height: '48px',
                borderRadius: '18px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255,255,255,0.70)',
                border: '1px solid rgba(37,70,35,0.10)',
                boxShadow: '0 16px 36px rgba(24,53,31,0.10), inset 0 1px 0 rgba(255,255,255,0.80)'
              }}>
                <img
                  src="/logo.png"
                  alt="Maisa Valentim"
                  style={{
                    width: '38px',
                    height: '38px',
                    objectFit: 'contain'
                  }}
                />
              </span>

              <div>
                <strong style={{
                  display: 'block',
                  fontSize: '18px',
                  lineHeight: 1,
                  color: '#254623',
                  letterSpacing: '-0.035em',
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700
                }}>
                  Maisa Valentim
                </strong>
                <span style={{
                  display: 'block',
                  marginTop: '6px',
                  fontSize: '10px',
                  color: '#6B7C53',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  fontWeight: 900
                }}>
                  Consultoria
                </span>
              </div>
            </Link>
          </motion.div>

          {isDesktop && (
            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.48, delay: 0.12 }}
              style={{
                display: 'flex',
                gap: '4px',
                alignItems: 'center',
                padding: '6px',
                background: 'rgba(255, 255, 255, 0.58)',
                border: '1px solid rgba(37, 70, 35, 0.10)',
                borderRadius: '999px',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.84), 0 12px 32px rgba(24,53,31,0.07)'
              }}
            >
              {links.map((link) => {
                const active = isActivePath(link.to);

                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    style={{
                      position: 'relative',
                      overflow: 'hidden',
                      fontSize: '13px',
                      color: active ? '#FFFCF6' : '#536B4E',
                      textDecoration: 'none',
                      fontWeight: 800,
                      padding: '10px 14px',
                      borderRadius: '999px',
                      transition: 'color 0.22s ease, transform 0.22s ease',
                      transform: active ? 'translateY(-1px)' : 'translateY(0)'
                    }}
                  >
                    {active && (
                      <motion.span
                        layoutId="header-active-pill"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '999px',
                          background: 'linear-gradient(135deg, #254623 0%, #6B7C53 100%)',
                          boxShadow: '0 12px 30px rgba(37,70,35,0.24)'
                        }}
                      />
                    )}
                    <span style={{ position: 'relative', zIndex: 1 }}>
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </motion.nav>
          )}

          {isDesktop && (
            <motion.div
              whileHover={{ y: -3, scale: 1.012 }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.25 }}
            >
              <Link
                to="/contato"
                className="magnetic-cta"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  fontSize: '12px',
                  color: '#FFFCF6',
                  textDecoration: 'none',
                  fontWeight: 900,
                  padding: '13px 20px',
                  background: 'linear-gradient(135deg, #254623 0%, #6B7C53 100%)',
                  borderRadius: '999px',
                  letterSpacing: '0.09em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  border: '1px solid rgba(255,255,255,0.24)',
                  boxShadow: '0 20px 42px rgba(37,70,35,0.20), inset 0 1px 0 rgba(255,255,255,0.25)'
                }}
              >
                Pré-análise
                <span style={{ fontSize: '16px', lineHeight: 1 }}>→</span>
              </Link>
            </motion.div>
          )}

          {!isDesktop && (
            <motion.button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.94 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
                background: 'linear-gradient(135deg, #254623 0%, #6B7C53 100%)',
                border: '1px solid rgba(255,255,255,0.24)',
                cursor: 'pointer',
                padding: '12px',
                minWidth: '48px',
                minHeight: '48px',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '18px',
                boxShadow: '0 18px 38px rgba(37,70,35,0.20), inset 0 1px 0 rgba(255,255,255,0.20)'
              }}
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={mobileMenuOpen}
            >
              {[0, 1, 2].map((item) => (
                <motion.span
                  key={item}
                  animate={{
                    opacity: mobileMenuOpen && item === 1 ? 0 : 1,
                    rotate: mobileMenuOpen && item === 0 ? 45 : mobileMenuOpen && item === 2 ? -45 : 0,
                    y: mobileMenuOpen && item === 0 ? 7 : mobileMenuOpen && item === 2 ? -7 : 0
                  }}
                  transition={{ duration: 0.22 }}
                  style={{
                    width: '19px',
                    height: '2px',
                    background: '#FFFCF6',
                    borderRadius: '2px',
                    transformOrigin: 'center'
                  }}
                />
              ))}
            </motion.button>
          )}
        </div>
      </motion.header>

      <AnimatePresence>
        {!isDesktop && mobileMenuOpen && (
          <motion.div
            variants={mobilePanelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: 'fixed',
              top: '82px',
              left: '14px',
              right: '14px',
              background: 'linear-gradient(160deg, rgba(37,70,35,0.96) 0%, rgba(24,53,31,0.96) 100%)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              zIndex: 999,
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '7px',
              borderRadius: '28px',
              border: '1px solid rgba(255,252,246,0.16)',
              boxShadow: '0 34px 90px rgba(16, 24, 32, 0.34), inset 0 1px 0 rgba(255,255,255,0.18)',
              overflow: 'hidden'
            }}
          >
            <span style={{
              position: 'absolute',
              width: '180px',
              height: '180px',
              right: '-72px',
              top: '-86px',
              borderRadius: '999px',
              background: 'radial-gradient(circle, rgba(194,178,128,0.24), transparent 70%)',
              pointerEvents: 'none'
            }} />

            {[...links, { to: '/contato', label: 'Pré-análise' }].map((link) => {
              const active = isActivePath(link.to);

              return (
                <motion.div key={link.to} variants={mobileItemVariants}>
                  <Link
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      position: 'relative',
                      zIndex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '14px',
                      fontSize: '17px',
                      color: '#FFFCF6',
                      textDecoration: 'none',
                      fontWeight: 800,
                      padding: '15px 15px',
                      borderRadius: '17px',
                      background: active ? 'rgba(255,252,246,0.14)' : 'rgba(255,252,246,0.04)',
                      border: active ? '1px solid rgba(255,252,246,0.16)' : '1px solid transparent'
                    }}
                  >
                    <span>{link.label}</span>
                    <span style={{
                      fontSize: '11px',
                      letterSpacing: '0.10em',
                      textTransform: 'uppercase',
                      color: active ? '#E8DCA8' : 'rgba(255,252,246,0.58)'
                    }}>
                      {active ? 'Atual' : 'Abrir'}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
