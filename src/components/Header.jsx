import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(197, 188, 181, 0.2)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.03)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: 'clamp(16px, 2.5vw, 24px) clamp(20px, 5vw, 60px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px'
        }}>
          {/* ✅ LOGO + NOME */}
          <Link 
            to="/" 
            onClick={() => setMobileMenuOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(12px, 2vw, 16px)',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              flex: '1'
            }}
          >
            <img 
              src="/logo.png" 
              alt="Maisa Valentim Logo" 
              style={{ 
                width: 'clamp(40px, 8vw, 56px)',
                height: 'clamp(40px, 8vw, 56px)',
                objectFit: 'contain',
                transition: 'all 0.3s ease'
              }} 
            />
            
            <div>
              <h1 style={{
                fontSize: 'clamp(18px, 4vw, 28px)',
                fontWeight: '400',
                background: 'linear-gradient(135deg, #8B7E74 0%, #A8877A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                margin: 0,
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                fontFamily: "'Playfair Display', serif"
              }}>
                Maisa Valentim
              </h1>
              <p style={{
                fontSize: 'clamp(9px, 1.8vw, 12px)',
                color: '#9B9289',
                margin: 0,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: '500',
                marginTop: '2px'
              }}>
                Consultoria Personalizada
              </p>
            </div>
          </Link>

          {/* ✅ MENU DESKTOP */}
          <nav style={{
            display: window.innerWidth >= 768 ? 'flex' : 'none',
            gap: 'clamp(20px, 3vw, 40px)',
            alignItems: 'center'
          }}>
            {[
              { to: '/', label: 'Início' },
              { to: '/sobre', label: 'Sobre' },
              { to: '/operadoras', label: 'Operadoras' },
              { to: '/depoimentos', label: 'Depoimentos' },
              { to: '/faq', label: 'FAQ' }
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  fontSize: 'clamp(14px, 1.6vw, 16px)',
                  color: location.pathname === link.to ? '#8B7E74' : '#6B6662',
                  textDecoration: 'none',
                  fontWeight: location.pathname === link.to ? '600' : '400',
                  position: 'relative',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#8B7E74'}
                onMouseOut={(e) => {
                  if (location.pathname !== link.to) {
                    e.currentTarget.style.color = '#6B6662';
                  }
                }}
              >
                {link.label}
                {location.pathname === link.to && (
                  <span style={{
                    position: 'absolute',
                    bottom: '-8px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, #8B7E74 0%, #A8877A 100%)',
                    borderRadius: '2px'
                  }} />
                )}
              </Link>
            ))}

            <Link
              to="/contato"
              style={{
                fontSize: 'clamp(13px, 1.5vw, 15px)',
                color: '#FFFFFF',
                textDecoration: 'none',
                fontWeight: '600',
                padding: 'clamp(10px, 1.5vw, 14px) clamp(20px, 3vw, 32px)',
                background: 'linear-gradient(135deg, #8B7E74 0%, #A8877A 100%)',
                borderRadius: '10px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 16px rgba(139, 126, 116, 0.25)',
                whiteSpace: 'nowrap',
                minHeight: '44px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              Solicitar Cotação
            </Link>
          </nav>

          {/* ✅ BOTÃO HAMBURGER (MOBILE) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: window.innerWidth >= 768 ? 'none' : 'flex',
              flexDirection: 'column',
              gap: '6px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '12px',
              minWidth: '44px',
              minHeight: '44px',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Menu"
          >
            <span style={{
              width: '28px',
              height: '3px',
              background: '#8B7E74',
              borderRadius: '2px',
              transition: 'all 0.3s ease',
              transform: mobileMenuOpen ? 'rotate(45deg) translateY(9px)' : 'none'
            }} />
            <span style={{
              width: '28px',
              height: '3px',
              background: '#8B7E74',
              borderRadius: '2px',
              transition: 'all 0.3s ease',
              opacity: mobileMenuOpen ? 0 : 1
            }} />
            <span style={{
              width: '28px',
              height: '3px',
              background: '#8B7E74',
              borderRadius: '2px',
              transition: 'all 0.3s ease',
              transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-9px)' : 'none'
            }} />
          </button>
        </div>
      </header>

      {/* ✅ MENU MOBILE (FULLSCREEN) */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 'clamp(72px, 15vw, 92px)',
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          zIndex: 999,
          padding: '40px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          animation: 'slideDown 0.3s ease',
          overflowY: 'auto'
        }}>
          {[
            { to: '/', label: 'Início' },
            { to: '/sobre', label: 'Sobre' },
            { to: '/operadoras', label: 'Operadoras' },
            { to: '/depoimentos', label: 'Depoimentos' },
            { to: '/faq', label: 'FAQ' },
            { to: '/contato', label: 'Contato' }
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '24px',
                color: location.pathname === link.to ? '#8B7E74' : '#6B6662',
                textDecoration: 'none',
                fontWeight: location.pathname === link.to ? '600' : '400',
                padding: '16px',
                borderBottom: '1px solid rgba(197, 188, 181, 0.2)',
                transition: 'all 0.3s ease',
                minHeight: '56px',
                display: 'flex',
                alignItems: 'center',
                fontFamily: "'Playfair Display', serif"
              }}
            >
              {link.label}
            </Link>
          ))}

          {/* Botão CTA Mobile */}
          <Link
            to="/contato"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              fontSize: '18px',
              color: '#FFFFFF',
              textDecoration: 'none',
              fontWeight: '600',
              padding: '18px 32px',
              background: 'linear-gradient(135deg, #8B7E74 0%, #A8877A 100%)',
              borderRadius: '12px',
              textAlign: 'center',
              boxShadow: '0 8px 24px rgba(139, 126, 116, 0.3)',
              marginTop: '20px',
              minHeight: '56px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            Solicitar Cotação →
          </Link>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
