import { useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO.jsx';
import PremiumLandingEffects from '../components/PremiumLandingEffects.jsx';

const whatsappUrl = 'https://wa.me/5521977472141?text=Olá!%20Gostaria%20de%20uma%20pré-análise%20de%20plano%20de%20saúde.';

const navItems = [
  ['Planos', '#planos'],
  ['Cobertura', '#cobertura'],
  ['Rede', '#depoimentos'],
  ['Contato', '#contato']
];

const planCards = [
  {
    name: 'Essencial',
    price: 'Sob cotação',
    badge: 'Entrada',
    desc: 'Para quem precisa organizar consultas, exames e urgência com uma escolha mais segura.',
    features: ['Análise de perfil', 'Consulta de rede por cidade', 'Comparativo de operadoras', 'Atendimento via WhatsApp'],
    muted: ['Cobertura internacional']
  },
  {
    name: 'Família Plus',
    price: 'Mais buscado',
    badge: 'Popular',
    featured: true,
    desc: 'Ideal para famílias, MEI e pequenos negócios que precisam equilibrar rede, preço e segurança.',
    features: ['Tudo do Essencial', 'Orientação PJ/MEI', 'Avaliação de carências', 'Rede hospitalar estratégica', 'Suporte na contratação'],
    muted: []
  },
  {
    name: 'Premium Elite',
    price: 'Rede premium',
    badge: 'Alto padrão',
    desc: 'Para quem prioriza hospitais de referência, reembolso, conforto e atendimento consultivo.',
    features: ['Tudo do Plus', 'Curadoria de rede premium', 'Análise de reembolso', 'Foco em hospitais referência', 'Acompanhamento próximo'],
    muted: []
  }
];

const coverage = [
  ['Consultas e exames', 100],
  ['Rede hospitalar', 96],
  ['Planos PJ / MEI', 94],
  ['Carências e regras', 88],
  ['Reembolso e premium', 82]
];

const testimonials = [
  ['MF', 'Mariana Figueiredo', 'Plano familiar', 'A consultoria filtrou as opções e me explicou o que realmente fazia sentido para minha família. Foi muito mais seguro do que pesquisar sozinha.'],
  ['CS', 'Carlos Souza', 'MEI', 'Eu precisava de plano para mim e minha esposa. Recebi orientação rápida, clara e sem promessa vazia.'],
  ['RB', 'Renata Barros', 'Plano empresarial', 'A diferença foi entender rede, carência e preço antes de decidir. O atendimento pelo WhatsApp ajudou muito.']
];

function PaginaBlog() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <SEO
        title="Consultoria Premium de Planos de Saúde RJ"
        description="Consultoria especializada em planos de saúde no Rio de Janeiro. Pré-análise para planos PJ, MEI, familiar e individual, com atendimento humano via WhatsApp."
        keywords="plano de saúde RJ, consultoria plano de saúde, plano empresarial, plano familiar, plano MEI, Bradesco Saúde, Unimed, Amil, SulAmérica"
      />

      <style>{`
        .elite-page {
          --bg0: #080e06;
          --bg1: #0d160a;
          --g0: #2d4a24;
          --g1: #4a6b3a;
          --g2: #6b8c52;
          --g3: #8aab6e;
          --g4: #a8c48a;
          --text: #d8e8cc;
          --muted: rgba(216,232,204,.58);
          --glass: rgba(13,22,10,.58);
          --glass2: rgba(45,74,36,.25);
          --gb: rgba(106,140,82,.22);
          --gb2: rgba(138,171,110,.35);
          --glow: rgba(106,140,82,.28);
          background: radial-gradient(circle at 78% 10%, rgba(74,107,58,.22), transparent 34rem), radial-gradient(circle at 8% 16%, rgba(138,171,110,.12), transparent 28rem), linear-gradient(180deg, var(--bg0), var(--bg1) 54%, #070b05);
          color: var(--text);
          overflow: hidden;
          position: relative;
          isolation: isolate;
        }
        .elite-page::before {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background-image: linear-gradient(rgba(138,171,110,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(138,171,110,.035) 1px, transparent 1px);
          background-size: 54px 54px;
          mask-image: linear-gradient(180deg, rgba(0,0,0,.7), transparent 78%);
        }
        .elite-page::after {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          opacity: .36;
          background-image: radial-gradient(rgba(255,255,255,.08) 1px, transparent 1px);
          background-size: 3px 3px;
          mix-blend-mode: soft-light;
        }
        .elite-page section, .elite-nav, .elite-mobile-bar { position: relative; z-index: 2; }
        .elite-webgl {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
          opacity: .95;
        }
        .elite-cursor-dot, .elite-cursor-ring { position: fixed; pointer-events: none; z-index: 9999; display: none; }
        .elite-cursor-dot { width: 10px; height: 10px; border-radius: 999px; background: var(--g3); mix-blend-mode: screen; transition: transform .08s ease; }
        .elite-cursor-ring { width: 38px; height: 38px; border-radius: 999px; border: 1px solid rgba(138,171,110,.42); transition: transform .14s ease, border-color .2s ease; }
        .elite-cursor-dot.is-hot { transform: scale(2.6); }
        .elite-cursor-ring.is-hot { transform: scale(1.6); border-color: rgba(138,171,110,.75); }
        @media (pointer: fine) {
          .elite-cursor-dot, .elite-cursor-ring { display: block; }
          .elite-page a, .elite-page button, .elite-touch-card { cursor: none; }
        }
        .elite-nav {
          position: fixed;
          top: 92px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1500;
          display: flex;
          align-items: center;
          gap: 28px;
          padding: 12px 22px;
          border-radius: 999px;
          background: rgba(13,22,10,.64);
          border: 1px solid var(--gb2);
          backdrop-filter: blur(30px) saturate(180%);
          -webkit-backdrop-filter: blur(30px) saturate(180%);
          box-shadow: 0 18px 54px rgba(0,0,0,.38), inset 0 1px 0 rgba(168,196,138,.08);
          animation: elite-nav-float 5s ease-in-out infinite;
        }
        .elite-logo { font-family: 'Playfair Display', serif; color: var(--g3); font-size: 20px; font-weight: 700; letter-spacing: .04em; white-space: nowrap; }
        .elite-logo em { font-weight: 400; font-style: italic; }
        .elite-nav-links { display: flex; gap: 6px; align-items: center; }
        .elite-nav-links a { min-height: 40px; display: inline-flex; align-items: center; padding: 0 14px; border-radius: 999px; color: var(--muted); font-size: 11px; font-weight: 900; letter-spacing: .12em; text-transform: uppercase; transition: color .25s ease, background .25s ease, transform .25s ease; }
        .elite-nav-links a:hover { color: var(--g3); background: rgba(138,171,110,.08); transform: translateY(-1px); }
        .elite-nav-cta { min-height: 42px; padding: 0 18px; border-radius: 999px; border: 1px solid var(--gb2); color: #edf8e6; background: linear-gradient(135deg, var(--g2), var(--g0)); font-size: 11px; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; white-space: nowrap; box-shadow: 0 0 26px var(--glow); display: inline-flex; align-items: center; }
        .elite-menu-btn, .elite-mobile-panel, .elite-mobile-bar { display: none; }
        .elite-hero {
          min-height: calc(100vh - 80px);
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(320px, .86fr);
          align-items: center;
          gap: clamp(42px, 7vw, 96px);
          max-width: 1280px;
          margin: 0 auto;
          padding: clamp(152px, 14vw, 190px) clamp(20px, 6vw, 72px) clamp(74px, 9vw, 110px);
          transform-style: preserve-3d;
        }
        .elite-orb { position: absolute; width: 520px; height: 520px; right: -160px; top: 72px; border-radius: 50%; background: radial-gradient(circle, rgba(106,140,82,.28), transparent 70%); filter: blur(42px); animation: elite-float 8s ease-in-out infinite; }
        .elite-eyebrow, .elite-kicker { display: inline-flex; align-items: center; gap: 12px; color: var(--g3); font-size: 12px; font-weight: 900; letter-spacing: .18em; text-transform: uppercase; margin-bottom: 24px; }
        .elite-eyebrow::before, .elite-kicker::before { content: ''; width: 32px; height: 1px; background: var(--g3); }
        .elite-title { color: var(--text); font-family: 'Playfair Display', serif; font-size: clamp(52px, 8vw, 104px); line-height: .88; letter-spacing: -.06em; margin: 0 0 26px; }
        .elite-title em, .elite-section-title em { color: var(--g3); font-style: italic; font-weight: 500; }
        .elite-sub { max-width: 590px; color: var(--muted); font-size: clamp(16px, 1.7vw, 19px); line-height: 1.85; margin: 0 0 36px; }
        .elite-actions { display: flex; flex-wrap: wrap; gap: 14px; margin-bottom: 44px; }
        .elite-btn { display: inline-flex; align-items: center; justify-content: center; min-height: 54px; padding: 0 30px; border-radius: 999px; font-size: 13px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; transition: transform .3s ease, box-shadow .3s ease, border-color .3s ease, background .3s ease; position: relative; overflow: hidden; touch-action: manipulation; -webkit-tap-highlight-color: transparent; }
        .elite-btn::after { content: ''; position: absolute; inset: -80% -30%; background: linear-gradient(120deg, transparent 36%, rgba(255,255,255,.24), transparent 64%); transform: translateX(-70%) rotate(12deg); transition: transform .65s cubic-bezier(.16,1,.3,1); }
        .elite-btn:hover::after { transform: translateX(70%) rotate(12deg); }
        .elite-btn span { position: relative; z-index: 1; }
        .elite-btn.primary { color: #eff8e7; background: linear-gradient(135deg, var(--g2), var(--g0)); box-shadow: 0 0 40px var(--glow), inset 0 1px 0 rgba(255,255,255,.12); border: 1px solid var(--gb2); }
        .elite-btn.ghost { color: var(--text); background: var(--glass); border: 1px solid var(--gb2); backdrop-filter: blur(18px); }
        .elite-btn:hover { transform: translateY(-3px); box-shadow: 0 22px 54px rgba(0,0,0,.34), 0 0 54px var(--glow); }
        .elite-metrics { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); border-top: 1px solid var(--gb); max-width: 680px; }
        .elite-metric { padding: 28px 22px 0 0; border-right: 1px solid var(--gb); }
        .elite-metric:last-child { border-right: 0; padding-left: 22px; }
        .elite-metric strong { display: block; font-family: 'Playfair Display', serif; color: var(--g3); font-size: clamp(30px, 4vw, 46px); line-height: 1; }
        .elite-metric span { display: block; margin-top: 8px; color: var(--muted); font-size: 11px; text-transform: uppercase; letter-spacing: .1em; font-weight: 900; }
        .elite-card-scene { min-height: 520px; display: flex; align-items: center; justify-content: center; perspective: 1000px; }
        .elite-stack { width: min(390px, 88vw); height: 250px; position: relative; transform-style: preserve-3d; animation: elite-card-breath 7s ease-in-out infinite; transition: transform .08s ease; }
        .elite-stack::after { content: ''; position: absolute; bottom: -36px; left: 50%; width: 230px; height: 44px; transform: translateX(-50%); background: radial-gradient(ellipse, var(--glow), transparent 72%); filter: blur(12px); }
        .elite-glass-card { position: absolute; inset: 0; border-radius: 28px; padding: 30px; display: flex; flex-direction: column; justify-content: space-between; border: 1px solid var(--gb2); backdrop-filter: blur(30px) saturate(160%); box-shadow: 0 34px 90px rgba(0,0,0,.52), inset 0 1px 0 rgba(255,255,255,.1); transition: transform .48s cubic-bezier(.34,1.1,.64,1), opacity .3s ease; }
        .elite-card-a { background: rgba(13,22,10,.72); transform: rotateX(10deg) rotateY(-10deg) translate3d(-28px, 54px, -110px) scale(.9); opacity: .68; }
        .elite-card-b { background: rgba(29,46,22,.68); transform: rotateX(6deg) rotateY(-6deg) translate3d(-14px, 28px, -56px) scale(.95); opacity: .86; }
        .elite-card-c { background: linear-gradient(135deg, rgba(74,107,58,.62), rgba(45,74,36,.74)); transform: translateZ(0); }
        .elite-stack:hover .elite-card-a { transform: rotateX(12deg) rotateY(-12deg) translate3d(-36px, 66px, -128px) scale(.88); }
        .elite-stack:hover .elite-card-b { transform: rotateX(7deg) rotateY(-7deg) translate3d(-20px, 36px, -68px) scale(.94); }
        .elite-card-top { display: flex; justify-content: space-between; gap: 18px; }
        .elite-card-label { color: var(--muted); font-size: 11px; text-transform: uppercase; letter-spacing: .12em; font-weight: 900; }
        .elite-card-name { color: var(--g3); font-family: 'Playfair Display', serif; font-size: 25px; font-weight: 700; }
        .elite-chip { color: var(--g3); border: 1px solid var(--gb2); background: rgba(138,171,110,.1); border-radius: 999px; padding: 6px 12px; font-size: 10px; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; height: fit-content; }
        .elite-card-price { font-family: 'Playfair Display', serif; font-size: 38px; line-height: 1; color: var(--text); }
        .elite-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .elite-tag { padding: 5px 10px; border-radius: 999px; border: 1px solid rgba(138,171,110,.16); background: rgba(138,171,110,.08); color: var(--muted); font-size: 11px; }
        .elite-section { max-width: 1280px; margin: 0 auto; padding: clamp(80px, 10vw, 132px) clamp(20px, 6vw, 72px); }
        .elite-head { display: flex; justify-content: space-between; align-items: end; gap: 32px; margin-bottom: clamp(42px, 6vw, 72px); }
        .elite-section-title { color: var(--text); font-size: clamp(38px, 6vw, 76px); line-height: .95; margin: 0; }
        .elite-head p { max-width: 360px; color: var(--muted); line-height: 1.75; text-align: right; }
        .elite-plan-grid, .elite-testimonials { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
        .elite-plan, .elite-testi, .elite-mini, .elite-coverage-main, .elite-cta-box { background: var(--glass2); border: 1px solid var(--gb); border-radius: 28px; backdrop-filter: blur(28px) saturate(150%); box-shadow: inset 0 1px 0 rgba(255,255,255,.07); transition: transform .35s ease, border-color .35s ease, box-shadow .35s ease; }
        .elite-plan { padding: 38px; min-height: 540px; display: flex; flex-direction: column; gap: 24px; position: relative; overflow: hidden; }
        .elite-plan::before, .elite-mini::before, .elite-testi::before { content: ''; position: absolute; inset: 0; border-radius: inherit; opacity: 0; background: linear-gradient(135deg, rgba(138,171,110,.07), transparent 58%); transition: opacity .35s ease; pointer-events: none; }
        .elite-plan:hover::before, .elite-mini:hover::before, .elite-testi:hover::before { opacity: 1; }
        .elite-plan:hover, .elite-testi:hover, .elite-mini:hover, .elite-coverage-main:hover { transform: translateY(-8px); border-color: var(--gb2); box-shadow: 0 30px 80px rgba(0,0,0,.38), 0 0 46px rgba(138,171,110,.11); }
        .elite-plan.featured { background: linear-gradient(160deg, rgba(74,107,58,.38), rgba(45,74,36,.42)); border-color: var(--gb2); }
        .elite-plan-badge { position: absolute; top: 18px; right: 18px; padding: 6px 13px; border-radius: 999px; background: linear-gradient(135deg, var(--g2), var(--g1)); color: #edf8e6; font-size: 10px; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; }
        .elite-plan h3 { color: var(--g3); font-size: 32px; line-height: 1; margin: 0; }
        .elite-plan-price { color: var(--text); font-family: 'Playfair Display', serif; font-size: 34px; line-height: 1; }
        .elite-plan p { color: var(--muted); line-height: 1.75; margin: 0; }
        .elite-feature-list { display: grid; gap: 12px; flex: 1; }
        .elite-feature { color: var(--text); display: flex; gap: 12px; align-items: center; font-size: 14px; }
        .elite-feature::before { content: '✓'; width: 20px; height: 20px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; flex: 0 0 20px; color: var(--g3); background: rgba(138,171,110,.1); border: 1px solid rgba(138,171,110,.24); font-size: 12px; }
        .elite-feature.muted { color: var(--muted); }
        .elite-feature.muted::before { opacity: .35; }
        .elite-plan .elite-btn { width: 100%; margin-top: auto; }
        .elite-coverage-grid { display: grid; grid-template-columns: 1.15fr .85fr; gap: 20px; }
        .elite-coverage-main { padding: clamp(34px, 5vw, 54px); position: relative; overflow: hidden; }
        .elite-coverage-main::before { content: ''; position: absolute; top: -120px; right: -120px; width: 320px; height: 320px; border-radius: 50%; background: radial-gradient(circle, rgba(138,171,110,.16), transparent 70%); }
        .elite-coverage-main h3 { color: var(--text); font-size: clamp(32px, 4vw, 48px); line-height: 1.05; margin: 0 0 38px; position: relative; }
        .elite-bars { display: grid; gap: 18px; position: relative; }
        .elite-bar-label { display: flex; justify-content: space-between; color: var(--muted); font-size: 13px; margin-bottom: 8px; }
        .elite-bar-label strong { color: var(--g3); }
        .elite-track { height: 7px; border-radius: 999px; background: rgba(138,171,110,.11); overflow: hidden; }
        .elite-fill { height: 100%; border-radius: inherit; background: linear-gradient(90deg, var(--g0), var(--g2), var(--g3)); transform-origin: left; }
        .elite-mini-grid { display: grid; gap: 20px; }
        .elite-mini { padding: 30px; position: relative; overflow: hidden; }
        .elite-mini-icon { font-size: 32px; margin-bottom: 14px; }
        .elite-mini h4 { color: var(--g3); font-size: 24px; margin: 0 0 10px; }
        .elite-mini p { color: var(--muted); line-height: 1.7; margin: 0; }
        .elite-testi { padding: 34px; position: relative; overflow: hidden; }
        .elite-testi::after { content: '”'; position: absolute; top: 8px; right: 24px; color: rgba(138,171,110,.09); font-size: 96px; font-family: 'Playfair Display', serif; line-height: 1; }
        .elite-stars { color: var(--g3); letter-spacing: 3px; margin-bottom: 18px; }
        .elite-testi p { color: var(--text); font-family: 'Playfair Display', serif; font-style: italic; font-size: 18px; line-height: 1.65; margin: 0 0 24px; position: relative; z-index: 1; }
        .elite-author { display: flex; align-items: center; gap: 12px; position: relative; z-index: 1; }
        .elite-avatar { width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, var(--g2), var(--g0)); color: #edf8e6; display: grid; place-items: center; font-weight: 900; border: 1px solid var(--gb2); }
        .elite-author strong { display: block; color: var(--text); font-size: 14px; }
        .elite-author span { color: var(--muted); font-size: 12px; }
        .elite-cta { padding-bottom: clamp(80px, 10vw, 132px); }
        .elite-cta-box { max-width: 1280px; margin: 0 auto; padding: clamp(54px, 8vw, 92px); display: grid; grid-template-columns: 1fr auto; gap: 36px; align-items: center; overflow: hidden; position: relative; }
        .elite-cta-box::before { content: ''; position: absolute; right: -120px; top: -120px; width: 360px; height: 360px; background: radial-gradient(circle, rgba(138,171,110,.22), transparent 70%); filter: blur(12px); }
        .elite-cta-box::after { content: ''; position: absolute; left: 0; right: 0; top: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(138,171,110,.55), transparent); }
        .elite-cta-box > * { position: relative; z-index: 1; }
        .elite-cta h2 { color: var(--text); font-size: clamp(36px, 5vw, 64px); line-height: .98; margin: 0 0 18px; }
        .elite-cta p { color: var(--muted); max-width: 580px; line-height: 1.75; margin: 0; }
        .elite-cta-actions { display: grid; gap: 14px; min-width: 230px; }
        @keyframes elite-float { 0%,100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-24px) scale(1.04); } }
        @keyframes elite-card-breath { 0%,100% { transform: rotateY(-4deg) rotateX(2deg) translateY(0); } 50% { transform: rotateY(5deg) rotateX(-2deg) translateY(-14px); } }
        @keyframes elite-nav-float { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(-5px); } }
        @media (max-width: 980px) {
          .elite-nav { top: 84px; left: 14px; right: 14px; transform: none; justify-content: space-between; padding: 10px 12px; animation: none; }
          .elite-nav-links, .elite-nav-cta { display: none; }
          .elite-menu-btn { display: inline-flex; width: 46px; height: 46px; border-radius: 16px; border: 1px solid var(--gb2); background: rgba(138,171,110,.1); align-items: center; justify-content: center; color: var(--g3); font-weight: 900; font-size: 22px; }
          .elite-mobile-panel { display: grid; position: fixed; z-index: 1490; top: 150px; left: 14px; right: 14px; gap: 8px; padding: 14px; border-radius: 26px; background: rgba(13,22,10,.94); border: 1px solid var(--gb2); backdrop-filter: blur(28px); box-shadow: 0 30px 90px rgba(0,0,0,.44); }
          .elite-mobile-panel a { min-height: 52px; display: flex; align-items: center; justify-content: space-between; padding: 0 16px; border-radius: 16px; background: rgba(138,171,110,.07); color: var(--text); font-weight: 900; }
          .elite-mobile-panel a span { color: var(--g3); font-size: 12px; letter-spacing: .12em; text-transform: uppercase; }
          .elite-mobile-bar { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; position: fixed; left: 10px; right: 10px; bottom: 10px; z-index: 1500; padding: 8px; border-radius: 22px; background: rgba(13,22,10,.78); border: 1px solid var(--gb2); backdrop-filter: blur(26px) saturate(170%); box-shadow: 0 18px 60px rgba(0,0,0,.42), inset 0 1px 0 rgba(255,255,255,.07); }
          .elite-mobile-bar a { min-height: 48px; display: grid; place-items: center; border-radius: 16px; color: var(--muted); background: rgba(138,171,110,.05); font-size: 10px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; }
          .elite-mobile-bar a:last-child { color: #edf8e6; background: linear-gradient(135deg, var(--g2), var(--g0)); }
          .elite-hero, .elite-coverage-grid, .elite-cta-box { grid-template-columns: 1fr; }
          .elite-hero { padding-top: 166px; text-align: left; gap: 22px; }
          .elite-title { font-size: clamp(44px, 14vw, 72px); }
          .elite-actions .elite-btn { width: 100%; }
          .elite-card-scene { min-height: 360px; }
          .elite-head { display: block; }
          .elite-head p { text-align: left; margin-top: 18px; }
          .elite-plan-grid, .elite-testimonials { grid-template-columns: 1fr; }
          .elite-metrics { grid-template-columns: 1fr; }
          .elite-metric { border-right: 0; padding-left: 0 !important; border-bottom: 1px solid var(--gb); padding-bottom: 18px; }
          .elite-metric:last-child { border-bottom: 0; }
          .elite-section { padding-left: 18px; padding-right: 18px; }
          .elite-plan { min-height: auto; padding: 30px; }
          .elite-cta-actions { min-width: 0; }
          .elite-cta-actions .elite-btn { width: 100%; }
        }
        @media (max-width: 560px) {
          .elite-page { padding-bottom: 82px; }
          .elite-eyebrow, .elite-kicker { font-size: 10px; letter-spacing: .14em; }
          .elite-card-scene { transform: scale(.86); transform-origin: center; min-height: 300px; }
          .elite-stack { width: 330px; height: 224px; }
          .elite-glass-card { padding: 24px; }
          .elite-card-price { font-size: 30px; }
          .elite-coverage-main, .elite-mini, .elite-testi { border-radius: 24px; }
          .elite-mobile-panel { top: 142px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .elite-page *, .elite-page *::before, .elite-page *::after { animation: none !important; transition-duration: .01ms !important; scroll-behavior: auto !important; }
        }
      `}</style>

      <main className="elite-page">
        <PremiumLandingEffects />
        <div className="elite-orb" />

        <nav className="elite-nav" aria-label="Navegação da landing premium">
          <a className="elite-logo" href="#topo" onClick={closeMenu}>Maisa <em>Valentim</em></a>
          <div className="elite-nav-links">
            {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          </div>
          <a className="elite-nav-cta" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Pré-análise</a>
          <button className="elite-menu-btn" type="button" aria-label="Abrir menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? '×' : '≡'}</button>
        </nav>

        {menuOpen && (
          <div className="elite-mobile-panel">
            {navItems.map(([label, href], index) => <a key={href} href={href} onClick={closeMenu}>{label}<span>0{index + 1}</span></a>)}
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>WhatsApp<span>Agora</span></a>
          </div>
        )}

        <section className="elite-hero" id="topo">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
            <div className="elite-eyebrow">Consultoria premium em saúde</div>
            <h1 className="elite-title">Plano de saúde com escolha <em>inteligente</em>.</h1>
            <p className="elite-sub">Uma experiência consultiva para comparar operadoras, rede, carência e custo-benefício antes de contratar. Sem vitrine genérica, sem decisão no escuro.</p>
            <div className="elite-actions">
              <a className="elite-btn primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><span>Fazer pré-análise</span></a>
              <a className="elite-btn ghost" href="#planos"><span>Ver opções</span></a>
            </div>
            <div className="elite-metrics">
              <div className="elite-metric"><strong>3</strong><span>Perfis de contratação</span></div>
              <div className="elite-metric"><strong>1:1</strong><span>Orientação humana</span></div>
              <div className="elite-metric"><strong>0</strong><span>Pressão para fechar</span></div>
            </div>
          </motion.div>

          <motion.div className="elite-card-scene" initial={{ opacity: 0, y: 30, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .8, delay: .12 }}>
            <div className="elite-stack">
              {['Essencial', 'Plus', 'Elite'].map((name, index) => (
                <div key={name} className={`elite-glass-card elite-card-${['a', 'b', 'c'][index]}`}>
                  <div className="elite-card-top"><div><div className="elite-card-label">Plano</div><div className="elite-card-name">{name}</div></div><div className="elite-chip">{index === 2 ? 'Premium' : index === 1 ? 'Popular' : 'Base'}</div></div>
                  <div className="elite-card-price">{index === 2 ? 'Rede premium' : index === 1 ? 'Família/PJ' : 'Essencial'}</div>
                  <div className="elite-tags"><span className="elite-tag">Rede</span><span className="elite-tag">Carência</span><span className="elite-tag">Cotação</span></div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="elite-section" id="planos">
          <div className="elite-head"><div><div className="elite-kicker">Escolha com clareza</div><h2 className="elite-section-title">Proteção em <em>três perfis</em></h2></div><p>Não existe preço único sem análise. A consultoria entende seu cenário e indica o caminho mais coerente.</p></div>
          <div className="elite-plan-grid">
            {planCards.map((plan, index) => (
              <motion.article key={plan.name} className={`elite-plan elite-touch-card ${plan.featured ? 'featured' : ''}`} data-tilt="true" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .55, delay: index * .08 }}>
                {plan.featured && <div className="elite-plan-badge">Mais escolhido</div>}
                <div><h3>{plan.name}</h3><div className="elite-plan-price">{plan.price}</div></div>
                <p>{plan.desc}</p>
                <div className="elite-feature-list">{plan.features.map((item) => <div className="elite-feature" key={item}>{item}</div>)}{plan.muted.map((item) => <div className="elite-feature muted" key={item}>{item}</div>)}</div>
                <a className={`elite-btn ${plan.featured ? 'primary' : 'ghost'}`} href={whatsappUrl} target="_blank" rel="noopener noreferrer"><span>Solicitar análise</span></a>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="elite-section" id="cobertura">
          <div className="elite-head"><div><div className="elite-kicker">O que analisamos</div><h2 className="elite-section-title">Cobertura <em>sem surpresa</em></h2></div><p>A página vende percepção premium, mas mantém a promessa correta: análise, comparação e orientação.</p></div>
          <div className="elite-coverage-grid">
            <motion.div className="elite-coverage-main elite-touch-card" data-tilt="true" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3>Cada detalhe do plano precisa conversar com sua rotina.</h3>
              <div className="elite-bars">{coverage.map(([label, value]) => <div key={label}><div className="elite-bar-label"><span>{label}</span><strong>{value}%</strong></div><div className="elite-track"><motion.div className="elite-fill" initial={{ scaleX: 0 }} whileInView={{ scaleX: value / 100 }} viewport={{ once: true }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }} /></div></div>)}</div>
            </motion.div>
            <div className="elite-mini-grid">{[['🏥', 'Rede hospitalar', 'Comparação por cidade, hospitais desejados e perfil de uso.'], ['⚡', 'Cotação orientada', 'Você entende caminhos possíveis antes de receber proposta.'], ['📱', 'WhatsApp humano', 'Conversa direta para tirar dúvidas e evitar contratação por impulso.'], ['🛡️', 'Menos risco', 'Atenção a carências, elegibilidade, regras e documentos.']].map(([icon, title, text], index) => <motion.div key={title} className="elite-mini elite-touch-card" data-tilt="true" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }}><div className="elite-mini-icon">{icon}</div><h4>{title}</h4><p>{text}</p></motion.div>)}</div>
          </div>
        </section>

        <section className="elite-section" id="depoimentos">
          <div className="elite-head"><div><div className="elite-kicker">Depoimentos</div><h2 className="elite-section-title">Confiança antes da <em>contratação</em></h2></div><p>Textos curtos, premium e focados na dor real: escolher plano sem cair em comparação rasa de preço.</p></div>
          <div className="elite-testimonials">{testimonials.map(([initials, name, role, text], index) => <motion.article key={name} className="elite-testi elite-touch-card" data-tilt="true" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }}><div className="elite-stars">★★★★★</div><p>“{text}”</p><div className="elite-author"><div className="elite-avatar">{initials}</div><div><strong>{name}</strong><span>{role}</span></div></div></motion.article>)}</div>
        </section>

        <section className="elite-section elite-cta" id="contato">
          <div className="elite-cta-box elite-touch-card"><div><div className="elite-kicker">Comece hoje</div><h2>Receba uma pré-análise antes de contratar.</h2><p>Envie seu perfil pelo WhatsApp e receba uma orientação inicial para comparar operadoras, rede e cenário de contratação.</p></div><div className="elite-cta-actions"><a className="elite-btn primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><span>Chamar no WhatsApp</span></a><a className="elite-btn ghost" href="/contato"><span>Página de contato</span></a></div></div>
        </section>

        <div className="elite-mobile-bar" aria-label="Ações rápidas mobile"><a href="#topo">Topo</a><a href="#planos">Planos</a><a href="#cobertura">Rede</a><a href={whatsappUrl} target="_blank" rel="noopener noreferrer">Whats</a></div>
      </main>
    </>
  );
}

export default PaginaBlog;
