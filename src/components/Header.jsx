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
        className="liquid-header"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="liquid-header-orb" />

        <div className="liquid-header-inner">
          <motion.div
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.985 }}
            transition={{ duration: 0.25 }}
          >
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="liquid-brand"
            >
              <span className="liquid-brand-mark">
                <img
                  src="/logo.png"
                  alt="Maisa Valentim"
                />
              </span>

              <div>
                <strong>Maisa Valentim</strong>
                <span>Consultoria</span>
              </div>
            </Link>
          </motion.div>

          {isDesktop && (
            <motion.nav
              className="liquid-nav"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.48, delay: 0.12 }}
            >
              {links.map((link) => {
                const active = isActivePath(link.to);

                return (
                  <motion.div
                    key={link.to}
                    whileHover={{ y: -2, rotateX: 6 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <Link
                      to={link.to}
                      className={`liquid-nav-link${active ? ' is-active' : ''}`}
                    >
                      {active && (
                        <motion.span
                          layoutId="header-active-pill"
                          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                          className="liquid-nav-active"
                        />
                      )}
                      <span>{link.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>
          )}

          {isDesktop && (
            <motion.div
              whileHover={{ y: -3, scale: 1.012, rotateX: 4 }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.25 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Link
                to="/contato"
                className="magnetic-cta liquid-cta"
              >
                Pré-análise
                <span>→</span>
              </Link>
            </motion.div>
          )}

          {!isDesktop && (
            <motion.button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.94 }}
              className="liquid-menu-button"
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
            className="liquid-mobile-panel"
          >
            <span className="liquid-mobile-orb" />

            {[...links, { to: '/contato', label: 'Pré-análise' }].map((link) => {
              const active = isActivePath(link.to);

              return (
                <motion.div key={link.to} variants={mobileItemVariants}>
                  <Link
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`liquid-mobile-link${active ? ' is-active' : ''}`}
                  >
                    <span>{link.label}</span>
                    <span>{active ? 'Atual' : 'Abrir'}</span>
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
