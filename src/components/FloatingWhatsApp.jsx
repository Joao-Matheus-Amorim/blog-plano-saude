import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';

const whatsappHref = 'https://wa.me/5521977472141?text=Olá!%20Gostaria%20de%20falar%20direto%20pelo%20WhatsApp%20sobre%20plano%20de%20saúde.';

export default function FloatingWhatsApp() {
  const [hovered, setHovered] = useState(null);
  const [portalTarget, setPortalTarget] = useState(null);

  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  const floatingButtons = (
    <>
      <div className="premium-floating-actions" aria-label="Ações rápidas">
        <Link
          to="/contato"
          onMouseEnter={() => setHovered('quote')}
          onMouseLeave={() => setHovered(null)}
          className="premium-float-orb premium-float-orb--quote"
          aria-label="Abrir formulário de cotação"
        >
          <span className="premium-float-orb__shine" />
          <span className="premium-float-orb__mark">MV</span>
          <span className="premium-float-orb__label">Cotação</span>
        </Link>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHovered('whats')}
          onMouseLeave={() => setHovered(null)}
          className="premium-float-orb premium-float-orb--whats"
          aria-label="Falar direto no WhatsApp"
        >
          <span className="premium-float-orb__shine" />
          <svg className="premium-float-orb__icon" width="27" height="27" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </div>

      {hovered && (
        <div className="premium-floating-tooltip">
          {hovered === 'quote' ? 'Pegar dados para cotação' : 'Ir direto para o WhatsApp'}
        </div>
      )}

      <style>{`
        .premium-floating-actions {
          position: fixed !important;
          right: 18px !important;
          bottom: 18px !important;
          z-index: 2147483647 !important;
          display: grid !important;
          gap: 12px;
          justify-items: end;
          perspective: 900px;
          opacity: 1 !important;
          visibility: visible !important;
          pointer-events: auto !important;
          transform: none !important;
          filter: none !important;
          isolation: isolate;
          animation: premiumFloatingEnter 420ms cubic-bezier(.16, 1, .3, 1) both;
        }

        .premium-float-orb {
          position: relative;
          width: 62px;
          height: 62px;
          border-radius: 22px;
          display: grid;
          place-items: center;
          color: #eff8e7;
          text-decoration: none;
          overflow: hidden;
          border: 1px solid rgba(168, 196, 138, 0.34);
          background:
            radial-gradient(circle at 30% 18%, rgba(255, 255, 255, 0.30), transparent 34%),
            linear-gradient(145deg, rgba(45, 74, 36, 0.84), rgba(8, 14, 6, 0.78));
          box-shadow:
            0 18px 40px rgba(0, 0, 0, 0.34),
            0 0 28px rgba(106, 140, 82, 0.28),
            inset 0 1px 0 rgba(255, 255, 255, 0.22),
            inset 0 -12px 28px rgba(0, 0, 0, 0.22);
          backdrop-filter: blur(22px) saturate(170%);
          -webkit-backdrop-filter: blur(22px) saturate(170%);
          transform: translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg);
          transition: transform 260ms cubic-bezier(.16, 1, .3, 1), box-shadow 260ms ease, border-color 260ms ease;
          animation: premiumFloatSimple 4.2s ease-in-out infinite;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
          opacity: 1 !important;
          visibility: visible !important;
          pointer-events: auto !important;
        }

        .premium-float-orb::before {
          content: '';
          position: absolute;
          inset: 5px;
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          pointer-events: none;
        }

        .premium-float-orb::after {
          content: '';
          position: absolute;
          left: 13%;
          right: 13%;
          bottom: 8px;
          height: 10px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          filter: blur(6px);
          pointer-events: none;
        }

        .premium-float-orb:hover {
          transform: translate3d(0, -5px, 0) rotateX(8deg) rotateY(-8deg) scale(1.04);
          border-color: rgba(168, 196, 138, 0.66);
          box-shadow:
            0 24px 54px rgba(0, 0, 0, 0.42),
            0 0 44px rgba(106, 140, 82, 0.42),
            inset 0 1px 0 rgba(255, 255, 255, 0.30),
            inset 0 -14px 30px rgba(0, 0, 0, 0.26);
        }

        .premium-float-orb:active {
          transform: translate3d(0, -1px, 0) scale(0.96);
        }

        .premium-float-orb__shine {
          position: absolute;
          inset: -60% -45%;
          background: linear-gradient(115deg, transparent 38%, rgba(255, 255, 255, 0.28), transparent 62%);
          transform: translateX(-62%) rotate(14deg);
          animation: premiumOrbSweep 4.8s ease-in-out infinite;
          pointer-events: none;
        }

        .premium-float-orb__mark {
          position: relative;
          z-index: 1;
          width: 41px;
          height: 41px;
          border-radius: 16px;
          display: grid;
          place-items: center;
          color: #254623;
          background:
            radial-gradient(circle at 30% 18%, #ffffff, rgba(255, 252, 246, 0.88) 48%, rgba(168, 196, 138, 0.74));
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.9),
            inset 0 -8px 18px rgba(37, 70, 35, 0.14),
            0 8px 22px rgba(0, 0, 0, 0.26);
          font-family: 'Playfair Display', serif;
          font-size: 17px;
          font-weight: 800;
          letter-spacing: -0.07em;
          text-shadow: 0 1px 0 rgba(255, 255, 255, 0.56);
        }

        .premium-float-orb__label {
          position: absolute;
          right: 72px;
          top: 50%;
          transform: translateY(-50%) translateX(6px);
          opacity: 0;
          pointer-events: none;
          white-space: nowrap;
          padding: 8px 12px;
          border-radius: 999px;
          color: rgba(237, 248, 230, 0.90);
          background: rgba(13, 22, 10, 0.78);
          border: 1px solid rgba(168, 196, 138, 0.24);
          box-shadow: 0 16px 36px rgba(0,0,0,.28);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .08em;
          text-transform: uppercase;
          transition: opacity 220ms ease, transform 220ms ease;
        }

        .premium-float-orb:hover .premium-float-orb__label {
          opacity: 1;
          transform: translateY(-50%) translateX(0);
        }

        .premium-float-orb__icon {
          position: relative;
          z-index: 1;
          filter: drop-shadow(0 8px 12px rgba(0, 0, 0, 0.28));
        }

        .premium-float-orb--whats {
          width: 56px;
          height: 56px;
          border-radius: 20px;
          background:
            radial-gradient(circle at 30% 18%, rgba(255, 255, 255, 0.28), transparent 34%),
            linear-gradient(145deg, rgba(37, 211, 102, 0.92), rgba(18, 140, 126, 0.82) 58%, rgba(37, 70, 35, 0.88));
          color: white;
          animation-delay: .42s;
        }

        .premium-floating-tooltip {
          position: fixed !important;
          right: 88px !important;
          bottom: 28px !important;
          z-index: 2147483646 !important;
          padding: 10px 14px;
          border-radius: 999px;
          color: rgba(237, 248, 230, 0.90);
          background: rgba(13, 22, 10, 0.82);
          border: 1px solid rgba(168, 196, 138, 0.28);
          box-shadow: 0 18px 44px rgba(0, 0, 0, 0.30);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          font-size: 12px;
          font-weight: 800;
          animation: premiumTooltipIn 180ms ease both;
          opacity: 1 !important;
          visibility: visible !important;
        }

        @keyframes premiumFloatingEnter {
          from { opacity: 0; transform: translate3d(12px, 18px, 0) scale(.92); }
          to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
        }

        @keyframes premiumFloatSimple {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -4px, 0); }
        }

        @keyframes premiumOrbSweep {
          0%, 68%, 100% { transform: translateX(-65%) rotate(14deg); opacity: 0; }
          36% { transform: translateX(65%) rotate(14deg); opacity: 1; }
        }

        @keyframes premiumTooltipIn {
          from { opacity: 0; transform: translateY(6px) scale(.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @media (max-width: 768px) {
          .premium-floating-actions {
            right: 14px !important;
            bottom: calc(14px + env(safe-area-inset-bottom)) !important;
            gap: 10px;
          }

          .premium-float-orb {
            width: 56px;
            height: 56px;
            border-radius: 20px;
          }

          .premium-float-orb--whats {
            width: 52px;
            height: 52px;
          }

          .premium-float-orb__mark {
            width: 38px;
            height: 38px;
            border-radius: 15px;
            font-size: 16px;
          }

          .premium-float-orb__label,
          .premium-floating-tooltip {
            display: none;
          }
        }
      `}</style>
    </>
  );

  if (!portalTarget) return null;

  return createPortal(floatingButtons, portalTarget);
}
