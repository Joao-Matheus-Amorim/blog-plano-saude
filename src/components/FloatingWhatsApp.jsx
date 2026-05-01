import { useState } from 'react';

export default function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <a
        href="https://wa.me/5521977472141?text=Olá!%20Gostaria%20de%20solicitar%20uma%20pré-análise%20de%20plano%20de%20saúde."
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="premium-floating-cta"
        aria-label="Solicitar pré-análise pelo WhatsApp"
      >
        <span className="premium-floating-cta__mark">MV</span>
        <span className="premium-floating-cta__content">
          <strong>Solicitar pré-análise</strong>
          <small>Atendimento via WhatsApp</small>
        </span>
        <span className="premium-floating-cta__arrow">→</span>
      </a>

      {isHovered && (
        <div className="premium-floating-cta__note">
          Consultoria humana, sem valor automático.
        </div>
      )}

      <style>{`
        .premium-floating-cta {
          position: fixed;
          right: 22px;
          bottom: 22px;
          z-index: 9999;
          display: grid;
          grid-template-columns: 46px 1fr 26px;
          align-items: center;
          gap: 13px;
          min-width: 318px;
          padding: 12px 14px 12px 12px;
          border-radius: 999px;
          background: rgba(37, 70, 35, 0.96);
          color: #FFFCF6;
          border: 1px solid rgba(194, 178, 128, 0.42);
          box-shadow: 0 22px 60px rgba(24, 53, 31, 0.30);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          transform: ${isHovered ? 'translateY(-4px)' : 'translateY(0)'};
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .premium-floating-cta__mark {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #FFFCF6;
          color: #254623;
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          letter-spacing: -0.05em;
        }

        .premium-floating-cta__content {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }

        .premium-floating-cta__content strong {
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .premium-floating-cta__content small {
          margin-top: 4px;
          font-size: 12px;
          color: rgba(255, 252, 246, 0.72);
        }

        .premium-floating-cta__arrow {
          font-size: 20px;
          line-height: 1;
          color: #C2B280;
        }

        .premium-floating-cta__note {
          position: fixed;
          right: 34px;
          bottom: 92px;
          z-index: 9998;
          padding: 10px 14px;
          border-radius: 999px;
          background: #FFFCF6;
          color: #254623;
          border: 1px solid rgba(37, 70, 35, 0.12);
          box-shadow: 0 18px 44px rgba(24, 53, 31, 0.16);
          font-size: 12px;
          font-weight: 800;
          animation: ctaNote 0.22s ease both;
        }

        @keyframes ctaNote {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .premium-floating-cta {
            left: 14px;
            right: 14px;
            bottom: 14px;
            min-width: 0;
            width: auto;
            grid-template-columns: 42px 1fr 22px;
            padding: 10px 12px 10px 10px;
          }

          .premium-floating-cta__mark {
            width: 42px;
            height: 42px;
          }

          .premium-floating-cta__content strong {
            font-size: 12px;
          }

          .premium-floating-cta__content small {
            font-size: 11px;
          }

          .premium-floating-cta__note {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
