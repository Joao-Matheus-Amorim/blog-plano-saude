import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { to: '/', label: 'Início' },
    { to: '/sobre', label: 'Sobre' },
    { to: '/operadoras', label: 'Operadoras' },
    { to: '/depoimentos', label: 'Depoimentos' },
    { to: '/blog', label: 'Blog' },
    { to: '/faq', label: 'FAQ' }
  ];

  return (
    <>
      <header style={{
        background: 'rgba(246, 241, 234, 0.84)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderBottom: '1px solid rgba(16, 24, 32, 0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '16px clamp(20px, 5vw, 64px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '24px'
        }}>
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
            <img
              src="/logo.png"
              alt="Maisa Valentim"
              style={{
                width: '44px',
                height: '44px',
                objectFit: 'contain'
              }}
            />
            <div>
              <strong style={{
                display: 'block',
                fontSize: '18px',
                lineHeight: 1,
                color: '#101820',
                letterSpacing: '-0.02em',
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700
              }}>
                Maisa Valentim
              </strong>
              <span style={{
                display: 'block',
                marginTop: '5px',
                fontSize: '10px',
                color: '#8A6F5A',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontWeight: 800
              }}>
                Consultoria
              </span>
            </div>
          </Link>

          <nav style={{
            display: window.innerWidth >= 768 ? 'flex' : 'none',
            gap: '6px',
            alignItems: 'center',
            padding: '6px',
            background: 'rgba(255, 255, 255, 0.52)',
            border: '1px solid rgba(16, 24, 32, 0.07)',
            borderRadius: '999px'
          }}>
            {links.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    fontSize: '13px',
                    color: active ? '#FFFFFF' : '#536170',
                    textDecoration: 'none',
                    fontWeight: 700,
                    padding: '10px 14px',
                    borderRadius: '999px',
                    background: active ? '#101820' : 'transparent',
                    transition: 'all 0.22s ease'
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <Link
            to="/contato"
            style={{
              display: window.innerWidth >= 768 ? 'inline-flex' : 'none',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              color: '#FFFFFF',
              textDecoration: 'none',
              fontWeight: 800,
              padding: '13px 20px',
              background: '#101820',
              borderRadius: '999px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap'
            }}
          >
            Pré-análise
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: window.innerWidth >= 768 ? 'none' : 'flex',
              flexDirection: 'column',
              gap: '5px',
              background: '#101820',
              border: 'none',
              cursor: 'pointer',
              padding: '12px',
              minWidth: '46px',
              minHeight: '46px',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%'
            }}
            aria-label="Menu"
          >
            {[0, 1, 2].map((item) => (
              <span
                key={item}
                style={{
                  width: '18px',
                  height: '2px',
                  background: '#FFFFFF',
                  borderRadius: '2px',
                  transition: 'all 0.25s ease',
                  opacity: mobileMenuOpen && item === 1 ? 0 : 1,
                  transform: mobileMenuOpen && item === 0
                    ? 'rotate(45deg) translateY(5px)'
                    : mobileMenuOpen && item === 2
                      ? 'rotate(-45deg) translateY(-5px)'
                      : 'none'
                }}
              />
            ))}
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '76px',
          left: '16px',
          right: '16px',
          background: '#101820',
          zIndex: 999,
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          borderRadius: '24px',
          boxShadow: '0 30px 80px rgba(16, 24, 32, 0.28)'
        }}>
          {[...links, { to: '/contato', label: 'Pré-análise' }].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '17px',
                color: '#FFFFFF',
                textDecoration: 'none',
                fontWeight: 700,
                padding: '15px 14px',
                borderRadius: '14px',
                background: location.pathname === link.to ? 'rgba(255,255,255,0.12)' : 'transparent'
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
