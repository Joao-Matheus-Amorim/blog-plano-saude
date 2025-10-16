import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
  const location = useLocation();
  const [logoHover, setLogoHover] = useState(false);

  return (
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
        padding: 'clamp(16px, 2.5vw, 24px) clamp(24px, 5vw, 60px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '40px'
      }}>
        {/* ✅ LOGO + NOME COM HOVER */}
        <Link 
          to="/" 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            textDecoration: 'none',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={() => setLogoHover(true)}
          onMouseLeave={() => setLogoHover(false)}
        >
          {/* ✅ LOGO COM ANIMAÇÃO */}
          <img 
            src="/logo.png" 
            alt="Maisa Valentim Logo" 
            style={{ 
              width: 'clamp(48px, 6vw, 64px)',
              height: 'clamp(48px, 6vw, 64px)',
              objectFit: 'contain',
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transform: logoHover ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
              filter: logoHover ? 'drop-shadow(0 8px 16px rgba(168, 135, 122, 0.3))' : 'none'
            }} 
          />
          
          <div>
            <h1 style={{
              fontSize: 'clamp(20px, 3vw, 28px)',
              fontWeight: '400',
              background: 'linear-gradient(135deg, #8B7E74 0%, #A8877A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: 0,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              fontFamily: "'Playfair Display', serif",
              transition: 'all 0.3s ease'
            }}>
              Maisa Valentim
            </h1>
            <p style={{
              fontSize: 'clamp(10px, 1.3vw, 12px)',
              color: '#9B9289',
              margin: 0,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: '500',
              marginTop: '4px'
            }}>
              Consultoria Personalizada
            </p>
          </div>
        </Link>

        {/* ✅ MENU DE NAVEGAÇÃO */}
        <nav style={{
          display: 'flex',
          gap: 'clamp(24px, 3vw, 40px)',
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
                transition: 'all 0.3s ease',
                display: window.innerWidth < 768 ? 'none' : 'block'
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

          {/* ✅ BOTÃO CTA */}
          <Link
            to="/contato"
            style={{
              fontSize: 'clamp(13px, 1.5vw, 15px)',
              color: '#FFFFFF',
              textDecoration: 'none',
              fontWeight: '600',
              padding: 'clamp(12px, 1.5vw, 16px) clamp(24px, 3vw, 36px)',
              background: 'linear-gradient(135deg, #8B7E74 0%, #A8877A 100%)',
              borderRadius: '12px',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              letterSpacing: '0.03em',
              boxShadow: '0 6px 24px rgba(139, 126, 116, 0.25)',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              whiteSpace: 'nowrap'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 12px 36px rgba(139, 126, 116, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 6px 24px rgba(139, 126, 116, 0.25)';
            }}
          >
            Solicitar Cotação →
          </Link>
        </nav>
      </div>
    </header>
  );
}
