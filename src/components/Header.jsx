import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header style={{
      background: scrolled 
        ? 'rgba(255, 255, 255, 0.85)' 
        : 'rgba(250, 248, 245, 0.7)',
      backdropFilter: scrolled ? 'blur(30px)' : 'blur(20px)',
      WebkitBackdropFilter: scrolled ? 'blur(30px)' : 'blur(20px)',
      borderBottom: scrolled ? '1px solid rgba(197, 188, 181, 0.15)' : 'none',
      padding: 'clamp(20px, 3vw, 28px) 0',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: scrolled ? '0 8px 32px rgba(139, 126, 116, 0.08)' : 'none'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 clamp(40px, 8vw, 100px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        
        <Link to="/" style={{
          textDecoration: 'none',
          color: 'inherit',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(10px, 1.5vw, 14px)'
        }}
        onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
        onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
        >
          {/* Diamante Emoji */}
          <span style={{
            fontSize: 'clamp(24px, 3.5vw, 32px)',
            filter: 'drop-shadow(0 2px 6px rgba(168, 135, 122, 0.3))',
            display: 'inline-block',
            lineHeight: 1
          }}>
            💎
          </span>

          <div>
            <h1 style={{ 
              fontSize: 'clamp(20px, 2.8vw, 28px)', 
              fontWeight: '400',
              background: 'linear-gradient(135deg, #8B7E74 0%, #A8877A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: 0,
              lineHeight: 1.2,
              letterSpacing: '0.02em',
              fontFamily: "'Playfair Display', serif"
            }}>
              Maisa Valentim
            </h1>
            <p style={{
              fontSize: 'clamp(9px, 1.2vw, 11px)',
              color: '#9B9289',
              margin: 0,
              fontWeight: '400',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginTop: '2px',
              fontFamily: 'Inter, sans-serif'
            }}>
              Consultoria Personalizada
            </p>
          </div>
        </Link>

        <nav style={{ 
          display: 'flex', 
          gap: 'clamp(36px, 5vw, 56px)', 
          alignItems: 'center'
        }}
        className="menu-desktop"
        >
          <Link to="/" style={{
            color: location.pathname === '/' ? '#8B7E74' : '#9B9289',
            textDecoration: 'none',
            fontSize: 'clamp(14px, 1.7vw, 16px)',
            fontWeight: '400',
            letterSpacing: '0.03em',
            transition: 'all 0.3s ease',
            position: 'relative'
          }}
          onMouseOver={(e) => {
            e.target.style.color = '#8B7E74';
          }}
          onMouseOut={(e) => {
            e.target.style.color = location.pathname === '/' ? '#8B7E74' : '#9B9289';
          }}
          >
            Início
          </Link>
          
          <Link to="/contato" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#FFFFFF',
            textDecoration: 'none',
            fontSize: 'clamp(13px, 1.6vw, 15px)',
            fontWeight: '500',
            padding: 'clamp(10px, 1.5vw, 14px) clamp(24px, 3.5vw, 36px)',
            background: 'linear-gradient(135deg, #A8877A 0%, #8B7E74 100%)',
            borderRadius: '10px',
            letterSpacing: '0.03em',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 4px 16px rgba(168, 135, 122, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            transform: 'perspective(500px) rotateX(0deg)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'perspective(500px) rotateX(-4deg) translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(168, 135, 122, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'perspective(500px) rotateX(0deg) translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(168, 135, 122, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)';
          }}
          >
            Contato
            <span style={{ fontSize: '14px' }}>→</span>
          </Link>
        </nav>

        <button 
          onClick={() => setMenuAberto(!menuAberto)}
          className="menu-mobile-btn"
          style={{
            display: 'none',
            background: 'transparent',
            border: 'none',
            color: '#8B7E74',
            fontSize: '22px',
            padding: '8px',
            cursor: 'pointer',
            transition: 'opacity 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.opacity = '0.6'}
          onMouseOut={(e) => e.target.style.opacity = '1'}
        >
          {menuAberto ? '✕' : '☰'}
        </button>

        {menuAberto && (
          <nav className="menu-mobile" style={{
            position: 'fixed',
            top: 'clamp(80px, 10vh, 100px)',
            left: 'clamp(20px, 4vw, 40px)',
            right: 'clamp(20px, 4vw, 40px)',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            borderRadius: '20px',
            padding: 'clamp(32px, 5vw, 48px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(20px, 3vw, 28px)',
            border: '1px solid rgba(197, 188, 181, 0.2)',
            boxShadow: '0 16px 48px rgba(139, 126, 116, 0.15)',
            animation: 'fadeIn 0.4s ease'
          }}>
            <Link to="/" onClick={() => setMenuAberto(false)} style={{
              color: '#8B7E74',
              textDecoration: 'none',
              fontSize: 'clamp(16px, 2.5vw, 18px)',
              fontWeight: '400',
              letterSpacing: '0.02em',
              transition: 'opacity 0.3s ease',
              fontFamily: "'Playfair Display', serif"
            }}
            onMouseOver={(e) => e.target.style.opacity = '0.6'}
            onMouseOut={(e) => e.target.style.opacity = '1'}
            >
              Início
            </Link>
            
            <Link to="/contato" onClick={() => setMenuAberto(false)} style={{
              color: '#8B7E74',
              textDecoration: 'none',
              fontSize: 'clamp(16px, 2.5vw, 18px)',
              fontWeight: '400',
              letterSpacing: '0.02em',
              transition: 'opacity 0.3s ease',
              fontFamily: "'Playfair Display', serif"
            }}
            onMouseOver={(e) => e.target.style.opacity = '0.6'}
            onMouseOut={(e) => e.target.style.opacity = '1'}
            >
              Contato
            </Link>
          </nav>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .menu-desktop {
            display: none !important;
          }
          .menu-mobile-btn {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}

export default Header;
