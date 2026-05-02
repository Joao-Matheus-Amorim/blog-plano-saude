import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const whatsappUrl = 'https://wa.me/5521977472141?text=Olá!%20Gostaria%20de%20uma%20pré-análise%20de%20plano%20de%20saúde.';

export default function PremiumFooterPortal() {
  const [target, setTarget] = useState(null);

  useEffect(() => {
    setTarget(document.querySelector('.elite-page'));
  }, []);

  if (!target) return null;

  return createPortal(
    <>
      <style>{`
        .elite-footer {
          position: relative;
          z-index: 2;
          max-width: 1260px;
          margin: 0 auto;
          padding: 0 60px 42px;
        }
        .elite-footer-card {
          position: relative;
          overflow: hidden;
          display: grid;
          grid-template-columns: 1.35fr .7fr .7fr .95fr;
          gap: 34px;
          padding: 44px;
          border: 1px solid var(--gb2);
          border-radius: 34px;
          background: linear-gradient(160deg, rgba(45,74,36,.27), rgba(13,22,10,.72));
          backdrop-filter: blur(34px) saturate(160%);
          -webkit-backdrop-filter: blur(34px) saturate(160%);
          box-shadow: 0 34px 100px rgba(0,0,0,.44), 0 0 90px rgba(45,74,36,.18), inset 0 1px 0 rgba(168,196,138,.1);
        }
        .elite-footer-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(138,171,110,.55), transparent);
          pointer-events: none;
        }
        .elite-footer-glow {
          position: absolute;
          width: 360px;
          height: 360px;
          right: -120px;
          top: -160px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(138,171,110,.2), transparent 70%);
          filter: blur(8px);
          pointer-events: none;
        }
        .elite-footer-brand,
        .elite-footer-col,
        .elite-footer-info {
          position: relative;
          z-index: 1;
        }
        .elite-footer-logo {
          display: inline-block;
          color: var(--g3);
          font-family: 'Playfair Display', serif;
          font-size: 1.55rem;
          font-weight: 700;
          letter-spacing: .04em;
          margin-bottom: 16px;
        }
        .elite-footer-logo em {
          font-style: italic;
          font-weight: 400;
        }
        .elite-footer-brand p,
        .elite-footer-info p {
          color: var(--muted);
          line-height: 1.72;
          font-size: .9rem;
          max-width: 370px;
          margin: 0;
        }
        .elite-footer-whats {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-top: 22px;
          min-height: 44px;
          padding: 0 18px;
          border-radius: 999px;
          border: 1px solid var(--gb2);
          color: var(--g4);
          background: linear-gradient(135deg,var(--g2),var(--g0));
          box-shadow: 0 0 28px var(--glow);
          font-size: .72rem;
          font-weight: 800;
          letter-spacing: .08em;
          text-transform: uppercase;
          transition: transform .3s ease, box-shadow .3s ease;
        }
        .elite-footer-whats:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 44px rgba(106,140,82,.5);
        }
        .elite-footer-col,
        .elite-footer-info {
          display: flex;
          flex-direction: column;
          gap: 11px;
        }
        .elite-footer-col span,
        .elite-footer-info span {
          color: var(--g3);
          font-size: .68rem;
          font-weight: 900;
          letter-spacing: .18em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .elite-footer-col a {
          color: var(--muted);
          font-size: .86rem;
          transition: color .25s ease, transform .25s ease;
        }
        .elite-footer-col a:hover {
          color: var(--g3);
          transform: translateX(3px);
        }
        .elite-footer-info strong {
          color: var(--text);
          font-family: 'Playfair Display', serif;
          font-size: 1.35rem;
          line-height: 1;
        }
        .elite-footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 18px;
          padding: 20px 6px 0;
          color: var(--muted);
          font-size: .75rem;
        }
        .elite-footer-bottom div {
          display: flex;
          gap: 20px;
        }
        .elite-footer-bottom a {
          color: var(--muted);
          transition: color .25s ease;
        }
        .elite-footer-bottom a:hover {
          color: var(--g3);
        }
        @media(max-width:980px) {
          .elite-footer {
            padding: 0 28px 110px;
          }
          .elite-footer-card {
            grid-template-columns: 1fr 1fr;
            padding: 34px;
            border-radius: 28px;
          }
          .elite-footer-brand,
          .elite-footer-info {
            grid-column: 1 / -1;
          }
          .elite-footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }
        @media(max-width:560px) {
          .elite-footer {
            padding-left: 18px;
            padding-right: 18px;
          }
          .elite-footer-card {
            grid-template-columns: 1fr;
            padding: 28px;
          }
          .elite-footer-bottom div {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>

      <footer className="elite-footer" id="footer">
        <div className="elite-footer-card elite-touch-card">
          <div className="elite-footer-glow" />

          <div className="elite-footer-brand">
            <a className="elite-footer-logo" href="#topo">Maisa <em>Valentim</em></a>
            <p>Consultoria premium para escolher plano de saúde com clareza, rede certa e menos risco antes da contratação.</p>
            <a className="elite-footer-whats" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Falar no WhatsApp</a>
          </div>

          <div className="elite-footer-col">
            <span>Navegação</span>
            <a href="#planos">Planos</a>
            <a href="#cobertura">Cobertura</a>
            <a href="#depoimentos">Depoimentos</a>
            <a href="#contato">Contato</a>
          </div>

          <div className="elite-footer-col">
            <span>Perfis</span>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">Família</a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">MEI</a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">Empresa</a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">Premium</a>
          </div>

          <div className="elite-footer-info">
            <span>Atendimento</span>
            <strong>RJ · Consultivo</strong>
            <p>Pré-análise sem pressão para fechar. As condições finais dependem de operadora, perfil, região e elegibilidade.</p>
          </div>
        </div>

        <div className="elite-footer-bottom">
          <span>© 2026 Maisa Valentim. Todos os direitos reservados.</span>
          <div>
            <a href="/politica-de-privacidade">Privacidade</a>
            <a href="/contato">Contato</a>
          </div>
        </div>
      </footer>
    </>,
    target
  );
}
