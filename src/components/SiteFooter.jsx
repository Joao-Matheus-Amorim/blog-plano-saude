import { Link } from 'react-router-dom';

const links = [
  { to: '/', label: 'Início' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/operadoras', label: 'Operadoras' },
  { to: '/depoimentos', label: 'Depoimentos' },
  { to: '/faq', label: 'FAQ' },
  { to: '/blog', label: 'Blog' },
  { to: '/contato', label: 'Contato' }
];

const socialLinks = [
  {
    href: 'https://www.instagram.com/planosdesaudemaisavalentim/',
    label: 'Instagram',
    background: 'linear-gradient(135deg, #E4405F 0%, #C13584 100%)',
    shadow: 'rgba(228, 64, 95, 0.25)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    )
  },
  {
    href: 'https://wa.me/5521977472141?text=Olá!%20Gostaria%20de%20uma%20cotação%20de%20plano%20de%20saúde.',
    label: 'WhatsApp',
    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
    shadow: 'rgba(37, 211, 102, 0.25)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    )
  },
  {
    href: 'mailto:maisarvalentim@gmail.com',
    label: 'E-mail',
    background: 'linear-gradient(135deg, #A8877A 0%, #8B7E74 100%)',
    shadow: 'rgba(168, 135, 122, 0.25)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    )
  }
];

function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <style>{`
        .site-footer {
          background: linear-gradient(180deg, #FAF8F5 0%, #F0ECE6 100%);
          padding: clamp(72px, 9vw, 110px) clamp(28px, 7vw, 90px) clamp(44px, 6vw, 68px);
          border-top: 1px solid rgba(197, 188, 181, 0.15);
          position: relative;
          overflow: hidden;
        }
        .site-footer::before {
          content: '';
          position: absolute;
          top: -220px;
          right: 8%;
          width: 560px;
          height: 560px;
          background: radial-gradient(circle, rgba(197, 188, 181, 0.15) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
        }
        .site-footer__inner {
          max-width: 1180px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .site-footer__grid {
          display: grid;
          grid-template-columns: minmax(260px, 1.2fr) minmax(180px, .75fr) minmax(220px, .85fr);
          gap: clamp(36px, 6vw, 72px);
          margin-bottom: clamp(44px, 6vw, 72px);
          align-items: start;
        }
        .site-footer__brand-title {
          font-size: clamp(30px, 4vw, 42px);
          font-weight: 300;
          background: linear-gradient(135deg, #8B7E74 0%, #A8877A 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 22px;
          line-height: 1;
          letter-spacing: -0.01em;
          font-family: 'Playfair Display', serif;
        }
        .site-footer__text {
          font-size: clamp(14px, 1.45vw, 16px);
          color: #6B6662;
          line-height: 1.85;
          font-weight: 300;
          max-width: 390px;
          margin: 0 0 24px;
        }
        .site-footer__badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          background: rgba(197, 188, 181, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(197, 188, 181, 0.2);
          border-radius: 999px;
          font-size: 12px;
          color: #9B9289;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .site-footer__heading {
          font-size: 12px;
          font-weight: 700;
          color: #9B9289;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin: 0 0 24px;
        }
        .site-footer__nav,
        .site-footer__social {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .site-footer__link {
          font-size: 16px;
          color: #6B6662;
          text-decoration: none;
          font-weight: 300;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          width: fit-content;
        }
        .site-footer__link:hover {
          color: #8B7E74;
          transform: translateX(6px);
        }
        .site-footer__social-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-height: 46px;
          padding: 0 24px;
          color: #FFFFFF;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          border-radius: 12px;
          transition: all 0.3s ease;
          letter-spacing: 0.03em;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 24px var(--shadow), inset 0 1px 0 rgba(255, 255, 255, 0.15);
        }
        .site-footer__social-link:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 38px var(--shadow), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
        .site-footer__divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(197, 188, 181, 0.3), transparent);
          margin-bottom: 28px;
        }
        .site-footer__bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        .site-footer__copy {
          font-size: 13px;
          color: #9B9289;
          font-weight: 300;
          margin: 0;
          letter-spacing: 0.02em;
        }
        .site-footer__tagline {
          font-size: 12px;
          color: #C5BCB5;
          font-weight: 300;
          margin: 0;
          font-style: italic;
          letter-spacing: 0.02em;
        }
        @media (max-width: 760px) {
          .site-footer {
            padding: 48px 24px 104px;
          }
          .site-footer__grid {
            grid-template-columns: 1fr;
            gap: 34px;
            margin-bottom: 38px;
          }
          .site-footer__brand-title {
            font-size: 32px;
            margin-bottom: 18px;
          }
          .site-footer__text {
            font-size: 15px;
            line-height: 1.75;
            margin-bottom: 20px;
          }
          .site-footer__heading {
            margin-bottom: 16px;
          }
          .site-footer__nav {
            gap: 12px;
          }
          .site-footer__social {
            gap: 12px;
          }
          .site-footer__social-link {
            width: 100%;
            max-width: 340px;
          }
          .site-footer__bottom {
            display: grid;
            gap: 10px;
          }
        }
      `}</style>

      <div className="site-footer__inner">
        <div className="site-footer__grid">
          <div>
            <h3 className="site-footer__brand-title">Maisa Valentim</h3>
            <p className="site-footer__text">
              Consultoria especializada em planos de saúde com atendimento humanizado e suporte vitalício.
            </p>
            <div className="site-footer__badge">
              <span>✦</span>
              Segunda a Sexta
            </div>
          </div>

          <div>
            <h4 className="site-footer__heading">Navegação</h4>
            <div className="site-footer__nav">
              {links.map((link) => (
                <Link key={link.to} to={link.to} onClick={scrollToTop} className="site-footer__link">
                  <span>→</span> {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="site-footer__heading">Conecte-se</h4>
            <div className="site-footer__social">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="site-footer__social-link"
                  style={{ background: item.background, '--shadow': item.shadow }}
                >
                  {item.icon}
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="site-footer__divider" />

        <div className="site-footer__bottom">
          <p className="site-footer__copy">© 2026 Maisa Valentim. Todos os direitos reservados.</p>
          <p className="site-footer__tagline">Cuidando da sua saúde com dedicação ✦</p>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
