import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO.jsx';
import PremiumLandingEffects from '../components/PremiumLandingEffects.jsx';

const whatsappUrl = 'https://wa.me/5521977472141?text=Olá%20Maisa,%20quero%20uma%20consultoria%20gratuita%20para%20plano%20de%20saúde.';

const navItems = [
  ['Método', '#metodo'],
  ['Operadoras', '#operadoras'],
  ['Depoimentos', '#depoimentos'],
  ['FAQ', '#faq']
];

const steps = [
  ['01', 'Você me conta sua situação', 'Idade, cidade, dependentes, orçamento e hospitais importantes para sua rotina. Tudo pelo WhatsApp, sem formulário e sem burocracia.'],
  ['02', 'Eu filtro o mercado por você', 'Comparo operadoras, rede credenciada, carências, coparticipação, reembolso e custo-benefício antes de qualquer indicação.'],
  ['03', 'Você decide com segurança', 'Recebe opções claras, com vantagens e limitações explicadas em português simples. Sem pressão e sem letra miúda.'],
  ['04', 'Acompanhamento após contratar', 'O atendimento não acaba na venda. Você segue com suporte para dúvidas, regras do plano, carteirinha e primeiros usos.']
];

const operators = ['Unimed', 'Bradesco Saúde', 'SulAmérica', 'Amil', 'Porto Saúde', 'Hapvida', 'NotreDame', 'Care Plus', 'Sompo', 'Assim Saúde'];

const operatorCards = [
  ['Unimed', 'Cooperativa médica'],
  ['Bradesco Saúde', 'Rede nacional'],
  ['SulAmérica', 'Rede nacional'],
  ['Amil', 'Linha empresarial'],
  ['Porto Saúde', 'Perfil premium'],
  ['Hapvida', 'Acesso regional'],
  ['NotreDame', 'Rede integrada'],
  ['Care Plus', 'Alto padrão']
];

const testimonials = [
  ['AL', 'Ana Lima', 'São Paulo, SP', 'Eu estava perdida entre valores, carências e hospitais. A Maisa organizou tudo e mostrou uma opção que cabia no orçamento da minha família.'],
  ['CR', 'Carlos Rocha', 'Rio de Janeiro, RJ', 'O atendimento foi direto, elegante e honesto. Entendi o que cada plano entregava antes de fechar qualquer coisa.'],
  ['JP', 'Julia Pereira', 'Belo Horizonte, MG', 'Precisava de plano para minha mãe. A diferença foi a transparência sobre limitações, rede e carências. Me deu confiança.']
];

const faqs = [
  ['A consultoria é realmente gratuita?', 'Sim. A consultoria é gratuita para você. A remuneração vem da operadora quando uma contratação é concluída, sem aumentar o valor do seu plano.'],
  ['Em quanto tempo recebo as opções?', 'Normalmente no mesmo dia ou em até 24 horas após a conversa inicial, dependendo da cidade, perfil e tipo de contratação.'],
  ['Você atende em todo o Brasil?', 'Sim. O atendimento é online pelo WhatsApp e a indicação considera a rede credenciada da sua cidade antes de qualquer proposta.'],
  ['Já tenho plano. Posso pedir avaliação?', 'Pode. Muitas pessoas procuram a consultoria para descobrir se o plano atual ainda faz sentido ou se existe algo melhor pelo mesmo investimento.'],
  ['Atende MEI e empresas?', 'Sim. A consultoria também atende MEIs, famílias e empresas que precisam de plano coletivo para sócios, colaboradores ou dependentes.']
];

const reveal = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }
};

function MagneticCursor() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;
    const dot = document.querySelector('.maisa-cursor-dot');
    const ring = document.querySelector('.maisa-cursor-ring');
    if (!dot || !ring) return undefined;

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let raf = 0;

    const move = (event) => {
      mx = event.clientX;
      my = event.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
    };

    const tick = () => {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    const hot = (event) => {
      const active = event.target.closest('a, button, .maisa-touch');
      dot.classList.toggle('is-hot', Boolean(active));
      ring.classList.toggle('is-hot', Boolean(active));
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseover', hot);
    tick();

    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', hot);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="maisa-cursor-dot" />
      <div className="maisa-cursor-ring" />
    </>
  );
}

function PaginaLandingPremium() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <SEO
        title="Maisa Valentim | Consultoria Gratuita em Planos de Saúde"
        description="Consultoria gratuita e personalizada em planos de saúde. Compare operadoras, rede credenciada, carências e custo-benefício com orientação humana."
        keywords="consultoria plano de saúde, plano de saúde familiar, plano de saúde MEI, plano empresarial, Unimed, Bradesco Saúde, SulAmérica, Amil, Maisa Valentim"
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Outfit:wght@300;400;500;600;700;800&display=swap');

        .maisa-page {
          --ink: #0e0f0d;
          --sage: #3d5a47;
          --mist: #c8d5cc;
          --ivory: #f5f2ec;
          --gold: #b89a6a;
          --gold2: #d4b88a;
          --dim: #7a8a7e;
          min-height: 100vh;
          background: var(--ink);
          color: var(--ivory);
          overflow: hidden;
          position: relative;
          isolation: isolate;
          font-family: 'Outfit', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        .maisa-page * { box-sizing: border-box; }
        .maisa-page a { color: inherit; text-decoration: none; }
        .maisa-page button { font: inherit; }
        .maisa-page::before {
          content: '';
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse 80% 58% at 76% 18%, rgba(61,90,71,.34), transparent 62%),
            radial-gradient(ellipse 54% 74% at 6% 80%, rgba(184,154,106,.13), transparent 60%),
            linear-gradient(160deg, #0e0f0d 0%, #141a15 48%, #0e0f0d 100%);
        }
        .maisa-page::after {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          opacity: .85;
          background-image:
            linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
          background-size: 80px 80px;
          mask-image: radial-gradient(ellipse 75% 70% at 60% 35%, black 18%, transparent 78%);
        }
        .maisa-page section, .maisa-nav, .maisa-mobile-dock, .maisa-float { position: relative; z-index: 3; }
        .maisa-cursor-dot, .maisa-cursor-ring { display: none; position: fixed; left: 0; top: 0; pointer-events: none; z-index: 9999; will-change: transform; }
        .maisa-cursor-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--gold); mix-blend-mode: difference; transition: width .22s ease, height .22s ease; }
        .maisa-cursor-ring { width: 38px; height: 38px; border: 1px solid rgba(184,154,106,.48); border-radius: 50%; transition: width .28s ease, height .28s ease, border-color .28s ease; }
        .maisa-cursor-dot.is-hot { width: 18px; height: 18px; }
        .maisa-cursor-ring.is-hot { width: 58px; height: 58px; border-color: rgba(212,184,138,.78); }
        @media (pointer: fine) { .maisa-page, .maisa-page a, .maisa-page button, .maisa-touch { cursor: none; } .maisa-cursor-dot, .maisa-cursor-ring { display: block; } }

        .maisa-nav {
          position: fixed;
          top: 92px;
          left: 50%;
          transform: translateX(-50%);
          width: min(1120px, calc(100% - 32px));
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding: 12px 14px 12px 22px;
          border: 1px solid rgba(184,154,106,.26);
          border-radius: 999px;
          background: rgba(14,15,13,.66);
          box-shadow: 0 24px 70px rgba(0,0,0,.36), inset 0 1px 0 rgba(255,255,255,.06);
          backdrop-filter: blur(28px) saturate(170%);
          -webkit-backdrop-filter: blur(28px) saturate(170%);
        }
        .maisa-brand { font-family: 'Cormorant Garamond', serif; font-size: 21px; font-weight: 300; letter-spacing: .18em; text-transform: uppercase; white-space: nowrap; }
        .maisa-brand em { color: var(--gold); font-style: italic; }
        .maisa-nav-links { display: flex; align-items: center; gap: 4px; }
        .maisa-nav-links a { display: inline-flex; align-items: center; min-height: 40px; padding: 0 14px; border-radius: 999px; color: var(--dim); font-size: 11px; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; transition: color .25s ease, background .25s ease, transform .25s ease; }
        .maisa-nav-links a:hover { color: var(--ivory); background: rgba(184,154,106,.09); transform: translateY(-1px); }
        .maisa-nav-cta, .maisa-menu-btn { border: 1px solid rgba(184,154,106,.42); color: var(--gold2); background: rgba(14,15,13,.3); border-radius: 999px; min-height: 42px; display: inline-flex; align-items: center; justify-content: center; transition: background .3s ease, color .3s ease, border-color .3s ease, transform .3s ease; }
        .maisa-nav-cta { padding: 0 20px; font-size: 11px; font-weight: 800; letter-spacing: .11em; text-transform: uppercase; white-space: nowrap; }
        .maisa-nav-cta:hover { background: var(--gold); color: var(--ink); border-color: var(--gold); transform: translateY(-1px); }
        .maisa-menu-btn { display: none; width: 44px; font-size: 20px; }
        .maisa-mobile-panel { display: none; }

        .maisa-hero { min-height: calc(100vh - 76px); display: grid; grid-template-columns: minmax(0, 1fr) minmax(280px, .52fr); align-items: end; gap: clamp(42px, 7vw, 96px); max-width: 1320px; margin: 0 auto; padding: clamp(188px, 17vw, 228px) clamp(20px, 6vw, 76px) clamp(78px, 8vw, 112px); }
        .maisa-hero-copy { position: relative; }
        .maisa-hero-mark { position: absolute; right: -4vw; top: 50%; transform: translateY(-50%); font-family: 'Cormorant Garamond', serif; font-size: clamp(160px, 25vw, 330px); font-weight: 300; line-height: 1; color: transparent; -webkit-text-stroke: 1px rgba(184,154,106,.11); user-select: none; pointer-events: none; opacity: .92; }
        .maisa-eyebrow, .maisa-label { display: inline-flex; align-items: center; gap: 1rem; color: var(--gold2); font-size: 11px; font-weight: 700; letter-spacing: .21em; text-transform: uppercase; margin-bottom: 26px; }
        .maisa-eyebrow::before, .maisa-label::before { content: ''; width: 40px; height: 1px; background: var(--gold); opacity: .72; }
        .maisa-title, .maisa-section-title, .maisa-cta-title { font-family: 'Cormorant Garamond', serif; font-weight: 300; letter-spacing: -.035em; color: var(--ivory); margin: 0; }
        .maisa-title { font-size: clamp(3.65rem, 8.2vw, 8rem); line-height: .91; max-width: 920px; }
        .maisa-title em, .maisa-section-title em, .maisa-cta-title em { color: var(--gold); font-style: italic; }
        .maisa-sub { max-width: 510px; color: var(--mist); font-size: clamp(16px, 1.55vw, 19px); font-weight: 300; line-height: 1.85; margin: 34px 0 0; }
        .maisa-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 18px 34px; margin-top: 38px; }
        .maisa-btn { min-height: 54px; display: inline-flex; align-items: center; justify-content: center; gap: 12px; padding: 0 28px; border-radius: 6px; font-size: 12px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; transition: transform .3s ease, box-shadow .3s ease, background .3s ease, color .3s ease; position: relative; overflow: hidden; }
        .maisa-btn::after { content: ''; position: absolute; inset: -80% -35%; background: linear-gradient(120deg, transparent 36%, rgba(255,255,255,.28), transparent 64%); transform: translateX(-72%) rotate(12deg); transition: transform .65s cubic-bezier(.16,1,.3,1); }
        .maisa-btn:hover::after { transform: translateX(72%) rotate(12deg); }
        .maisa-btn span, .maisa-btn svg { position: relative; z-index: 1; }
        .maisa-btn svg { width: 18px; height: 18px; fill: currentColor; }
        .maisa-btn.primary { background: var(--gold); color: var(--ink); box-shadow: 0 20px 54px rgba(184,154,106,.2); }
        .maisa-btn.primary:hover { background: var(--gold2); transform: translateY(-3px); box-shadow: 0 28px 76px rgba(184,154,106,.32); }
        .maisa-link-down { color: var(--dim); font-size: 12px; font-weight: 800; letter-spacing: .13em; text-transform: uppercase; display: inline-flex; align-items: center; gap: 10px; transition: color .3s ease; }
        .maisa-link-down:hover { color: var(--ivory); }
        .maisa-link-down span { display: inline-block; animation: maisa-bob 1.8s ease-in-out infinite; }
        .maisa-hero-panel { display: grid; gap: 22px; align-self: center; }
        .maisa-stat { text-align: right; padding: 0 0 26px; border-bottom: 1px solid rgba(255,255,255,.07); }
        .maisa-stat:last-child { border-bottom: 0; }
        .maisa-stat strong { display: block; font-family: 'Cormorant Garamond', serif; font-size: clamp(42px, 6vw, 68px); font-weight: 300; line-height: .9; }
        .maisa-stat strong em { color: var(--gold); font-style: italic; }
        .maisa-stat span { display: block; margin-top: 8px; color: var(--dim); font-size: 11px; font-weight: 800; letter-spacing: .13em; text-transform: uppercase; }

        .maisa-divider { position: relative; z-index: 3; height: 1px; width: min(1180px, 90%); margin: 0 auto; background: linear-gradient(90deg, transparent, rgba(184,154,106,.32) 30%, rgba(184,154,106,.32) 70%, transparent); }
        .maisa-section { max-width: 1320px; margin: 0 auto; padding: clamp(90px, 10vw, 140px) clamp(20px, 6vw, 76px); }
        .maisa-section-title { font-size: clamp(2.65rem, 5.2vw, 5rem); line-height: 1.02; }
        .maisa-method-grid { display: grid; grid-template-columns: .92fr 1.08fr; gap: clamp(54px, 8vw, 112px); align-items: start; }
        .maisa-body { max-width: 530px; margin-top: 28px; color: var(--mist); font-size: 16px; font-weight: 300; line-height: 1.95; }
        .maisa-body p + p { margin-top: 18px; }
        .maisa-inline-cta { margin-top: 34px; display: inline-flex; align-items: center; gap: 10px; color: var(--gold2); font-size: 12px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; border-bottom: 1px solid rgba(184,154,106,.32); padding-bottom: 7px; }
        .maisa-steps { display: grid; gap: 0; }
        .maisa-step { display: grid; grid-template-columns: 64px 1fr; gap: 24px; padding: 30px 0; border-bottom: 1px solid rgba(255,255,255,.07); }
        .maisa-step:first-child { padding-top: 0; }
        .maisa-step:last-child { border-bottom: 0; padding-bottom: 0; }
        .maisa-step-n { font-family: 'Cormorant Garamond', serif; color: var(--gold); opacity: .55; letter-spacing: .11em; }
        .maisa-step h3 { margin: 0 0 10px; color: var(--ivory); font-size: 18px; font-weight: 500; }
        .maisa-step p { margin: 0; color: var(--dim); font-size: 15px; font-weight: 300; line-height: 1.75; }

        .maisa-operators { max-width: none; background: #111311; }
        .maisa-operators-inner { max-width: 1320px; margin: 0 auto; padding: clamp(90px, 10vw, 140px) clamp(20px, 6vw, 76px); }
        .maisa-op-marquee { overflow: hidden; margin-top: 58px; padding: 30px 0; border-top: 1px solid rgba(255,255,255,.07); border-bottom: 1px solid rgba(255,255,255,.07); }
        .maisa-op-track { display: flex; gap: 28px; width: max-content; animation: maisa-marquee 30s linear infinite; }
        .maisa-op-marquee:hover .maisa-op-track { animation-play-state: paused; }
        .maisa-op-name { font-family: 'Cormorant Garamond', serif; font-size: 23px; color: rgba(255,255,255,.25); white-space: nowrap; letter-spacing: .06em; transition: color .3s ease; }
        .maisa-op-name:hover { color: var(--gold2); }
        .maisa-op-dot { color: var(--gold); opacity: .7; }
        .maisa-op-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; margin-top: 58px; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.06); border-radius: 8px; overflow: hidden; }
        .maisa-op-card { background: #111311; padding: 38px 24px; text-align: center; transition: background .3s ease, transform .3s ease; }
        .maisa-op-card:hover { background: #171c18; transform: translateY(-2px); }
        .maisa-op-card strong { display: block; font-family: 'Cormorant Garamond', serif; color: var(--mist); font-size: 22px; font-weight: 300; letter-spacing: .04em; }
        .maisa-op-card span { display: block; margin-top: 8px; color: var(--dim); font-size: 11px; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; }

        .maisa-testimonials { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; margin-top: 70px; background: rgba(255,255,255,.045); }
        .maisa-testi { background: var(--ink); padding: clamp(34px, 4.5vw, 50px); position: relative; overflow: hidden; transition: background .35s ease, transform .35s ease; }
        .maisa-testi::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, var(--gold), transparent); transform: scaleX(0); transition: transform .5s ease; }
        .maisa-testi:hover { background: #111311; transform: translateY(-4px); }
        .maisa-testi:hover::before { transform: scaleX(1); }
        .maisa-stars { color: var(--gold); font-size: 13px; letter-spacing: .18em; margin-bottom: 28px; }
        .maisa-quote { font-family: 'Cormorant Garamond', serif; color: var(--ivory); font-size: clamp(21px, 2vw, 25px); font-weight: 300; font-style: italic; line-height: 1.6; margin: 0 0 32px; }
        .maisa-person { display: flex; align-items: center; gap: 14px; }
        .maisa-avatar { width: 42px; height: 42px; border-radius: 50%; border: 1px solid rgba(184,154,106,.28); display: grid; place-items: center; color: var(--gold2); font-size: 12px; font-weight: 800; letter-spacing: .06em; }
        .maisa-person strong { display: block; color: var(--ivory); font-size: 14px; font-weight: 500; }
        .maisa-person span { display: block; margin-top: 2px; color: var(--dim); font-size: 12px; }

        .maisa-faq-section { background: #111311; max-width: none; }
        .maisa-faq-inner { max-width: 920px; margin: 0 auto; padding: clamp(90px, 10vw, 140px) clamp(20px, 6vw, 76px); }
        .maisa-centered { text-align: center; }
        .maisa-centered .maisa-label { justify-content: center; }
        .maisa-faq-list { margin-top: 56px; }
        .maisa-faq-row { border-bottom: 1px solid rgba(255,255,255,.07); }
        .maisa-faq-head { width: 100%; border: 0; background: transparent; color: inherit; min-height: 82px; display: flex; align-items: center; justify-content: space-between; gap: 22px; text-align: left; }
        .maisa-faq-q { font-family: 'Cormorant Garamond', serif; font-size: clamp(22px, 2.6vw, 28px); font-weight: 400; color: var(--ivory); transition: color .3s ease; }
        .maisa-faq-row:hover .maisa-faq-q { color: var(--gold2); }
        .maisa-faq-icon { width: 32px; height: 32px; min-width: 32px; border: 1px solid rgba(255,255,255,.12); border-radius: 50%; display: grid; place-items: center; color: var(--dim); transition: transform .35s ease, color .3s ease, border-color .3s ease; }
        .maisa-faq-row.open .maisa-faq-icon { transform: rotate(135deg); color: var(--gold); border-color: rgba(184,154,106,.55); }
        .maisa-faq-body { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .38s ease; }
        .maisa-faq-row.open .maisa-faq-body { grid-template-rows: 1fr; }
        .maisa-faq-body > div { overflow: hidden; }
        .maisa-faq-body p { color: var(--dim); font-size: 15px; font-weight: 300; line-height: 1.86; margin: 0; padding: 0 56px 26px 0; }

        .maisa-cta { position: relative; overflow: hidden; min-height: 620px; display: grid; place-items: center; text-align: center; padding: clamp(96px, 12vw, 160px) clamp(20px, 6vw, 76px); }
        .maisa-cta::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 70% 62% at 50% 50%, rgba(61,90,71,.42), transparent 72%), var(--ink); }
        .maisa-cta::after { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.022) 1px, transparent 1px); background-size: 60px 60px; mask-image: radial-gradient(ellipse 60% 60% at 50% 50%, black 32%, transparent 72%); }
        .maisa-cta-content { position: relative; z-index: 2; max-width: 900px; }
        .maisa-cta-pre { color: var(--gold); font-size: 11px; font-weight: 800; letter-spacing: .25em; text-transform: uppercase; margin-bottom: 22px; }
        .maisa-cta-title { font-size: clamp(3.2rem, 7.6vw, 7rem); line-height: .98; }
        .maisa-cta p { color: var(--mist); max-width: 520px; margin: 28px auto 42px; font-size: 17px; font-weight: 300; line-height: 1.85; }
        .maisa-trust { margin-top: 28px; color: var(--dim); font-size: 11px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
        .maisa-float { position: fixed; right: 28px; bottom: 28px; z-index: 2000; display: flex; flex-direction: column; align-items: flex-end; gap: 10px; }
        .maisa-float-label { background: rgba(14,15,13,.86); border: 1px solid rgba(255,255,255,.09); color: var(--mist); font-size: 11px; font-weight: 700; letter-spacing: .09em; padding: 8px 14px; border-radius: 999px; backdrop-filter: blur(12px); opacity: 0; transform: translateX(10px); transition: opacity .3s ease, transform .3s ease; white-space: nowrap; }
        .maisa-float:hover .maisa-float-label { opacity: 1; transform: translateX(0); }
        .maisa-float-btn { width: 56px; height: 56px; border-radius: 50%; display: grid; place-items: center; background: #25d366; box-shadow: 0 8px 32px rgba(37,211,102,.34); animation: maisa-pulse 3s ease-in-out infinite; }
        .maisa-float-btn:hover { animation: none; transform: scale(1.08); }
        .maisa-float-btn svg { width: 27px; height: 27px; fill: #fff; }
        .maisa-mobile-dock { display: none; }

        @keyframes maisa-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes maisa-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(5px); } }
        @keyframes maisa-pulse { 0%, 100% { box-shadow: 0 8px 32px rgba(37,211,102,.32); } 50% { box-shadow: 0 8px 54px rgba(37,211,102,.54); } }

        @media (max-width: 1020px) {
          .maisa-nav { top: 84px; }
          .maisa-nav-links, .maisa-nav-cta { display: none; }
          .maisa-menu-btn { display: inline-flex; }
          .maisa-mobile-panel { display: grid; position: fixed; z-index: 1490; top: 150px; left: 16px; right: 16px; gap: 8px; padding: 14px; border-radius: 24px; background: rgba(14,15,13,.94); border: 1px solid rgba(184,154,106,.28); backdrop-filter: blur(26px); box-shadow: 0 30px 90px rgba(0,0,0,.48); }
          .maisa-mobile-panel a { min-height: 52px; display: flex; align-items: center; justify-content: space-between; padding: 0 16px; border-radius: 16px; background: rgba(184,154,106,.08); color: var(--ivory); font-weight: 800; }
          .maisa-mobile-panel a span { color: var(--gold); font-size: 12px; letter-spacing: .12em; text-transform: uppercase; }
          .maisa-hero, .maisa-method-grid { grid-template-columns: 1fr; }
          .maisa-hero { align-items: start; padding-top: 168px; }
          .maisa-hero-panel { grid-template-columns: repeat(3, 1fr); align-self: start; }
          .maisa-stat { text-align: left; padding-right: 18px; border-bottom: 0; border-right: 1px solid rgba(255,255,255,.07); }
          .maisa-stat:last-child { border-right: 0; }
          .maisa-op-grid { grid-template-columns: repeat(2, 1fr); }
          .maisa-testimonials { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .maisa-page { padding-bottom: 82px; }
          .maisa-nav { width: calc(100% - 24px); top: 76px; padding-left: 16px; }
          .maisa-brand { font-size: 16px; letter-spacing: .13em; }
          .maisa-mobile-panel { top: 136px; left: 12px; right: 12px; }
          .maisa-hero { padding: 150px 18px 70px; min-height: auto; }
          .maisa-title { font-size: clamp(3rem, 15vw, 4.9rem); }
          .maisa-eyebrow, .maisa-label { font-size: 10px; letter-spacing: .15em; gap: .75rem; }
          .maisa-eyebrow::before, .maisa-label::before { width: 28px; }
          .maisa-actions .maisa-btn { width: 100%; }
          .maisa-link-down { width: 100%; justify-content: center; }
          .maisa-hero-panel { grid-template-columns: 1fr; gap: 0; }
          .maisa-stat { border-right: 0; border-bottom: 1px solid rgba(255,255,255,.07); padding: 22px 0; }
          .maisa-section, .maisa-operators-inner, .maisa-faq-inner { padding-left: 18px; padding-right: 18px; }
          .maisa-step { grid-template-columns: 46px 1fr; gap: 16px; }
          .maisa-op-grid { grid-template-columns: 1fr 1fr; }
          .maisa-op-card { padding: 30px 12px; }
          .maisa-op-card strong { font-size: 19px; }
          .maisa-faq-body p { padding-right: 0; }
          .maisa-float { display: none; }
          .maisa-mobile-dock { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; position: fixed; left: 10px; right: 10px; bottom: 10px; z-index: 2000; padding: 8px; border-radius: 22px; background: rgba(14,15,13,.8); border: 1px solid rgba(184,154,106,.28); backdrop-filter: blur(26px); box-shadow: 0 18px 60px rgba(0,0,0,.42); }
          .maisa-mobile-dock a { min-height: 50px; display: grid; place-items: center; border-radius: 16px; font-size: 11px; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; color: var(--mist); background: rgba(184,154,106,.08); }
          .maisa-mobile-dock a:last-child { color: var(--ink); background: var(--gold); }
        }
        @media (prefers-reduced-motion: reduce) { .maisa-page *, .maisa-page *::before, .maisa-page *::after { animation: none !important; transition-duration: .01ms !important; scroll-behavior: auto !important; } }
      `}</style>

      <main className="maisa-page" id="topo">
        <PremiumLandingEffects />
        <MagneticCursor />

        <nav className="maisa-nav" aria-label="Navegação principal da landing">
          <a href="#topo" className="maisa-brand" onClick={closeMenu}>Maisa <em>Valentim</em></a>
          <div className="maisa-nav-links">
            {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          </div>
          <a className="maisa-nav-cta" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Consultoria gratuita</a>
          <button className="maisa-menu-btn" type="button" aria-label="Abrir menu" onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? '×' : '☰'}</button>
        </nav>

        {menuOpen && (
          <div className="maisa-mobile-panel">
            {navItems.map(([label, href]) => <a key={href} href={href} onClick={closeMenu}>{label}<span>ver</span></a>)}
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>WhatsApp<span>agora</span></a>
          </div>
        )}

        <section className="maisa-hero">
          <motion.div className="maisa-hero-copy" initial="hidden" animate="visible" variants={reveal}>
            <div className="maisa-hero-mark">✦</div>
            <div className="maisa-eyebrow">Consultoria em planos de saúde · 100% gratuita</div>
            <h1 className="maisa-title">A cobertura que você merece, <em>sem complicar.</em></h1>
            <p className="maisa-sub">Analiso sua situação, comparo operadoras e apresento a opção mais coerente para sua vida — com honestidade, clareza e zero pressão.</p>
            <div className="maisa-actions">
              <a className="maisa-btn primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /><span>Falar com a Maisa</span></a>
              <a className="maisa-link-down" href="#metodo">Como funciona <span>↓</span></a>
            </div>
          </motion.div>

          <motion.div className="maisa-hero-panel" initial={{ opacity: 0, x: 34 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .8, delay: .2, ease: [0.22, 1, 0.36, 1] }}>
            <div className="maisa-stat"><strong><em>+</em>200</strong><span>Clientes atendidos</span></div>
            <div className="maisa-stat"><strong>5<em>★</em></strong><span>Avaliação média</span></div>
            <div className="maisa-stat"><strong><em>0</em></strong><span>Custo da consultoria</span></div>
          </motion.div>
        </section>

        <div className="maisa-divider" />

        <section className="maisa-section" id="metodo">
          <div className="maisa-method-grid">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .25 }} variants={reveal}>
              <div className="maisa-label">O processo</div>
              <h2 className="maisa-section-title">Simples para você,<br /><em>criterioso por dentro.</em></h2>
              <div className="maisa-body">
                <p>Não existe indicação genérica. Antes de sugerir qualquer plano, eu entendo sua rotina, cidade, orçamento, dependentes e prioridades reais.</p>
                <p>O objetivo é tirar você do excesso de opções e entregar uma decisão limpa: plano certo, rede certa e contrato entendido antes de fechar.</p>
              </div>
              <a className="maisa-inline-cta" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Começar agora →</a>
            </motion.div>

            <motion.div className="maisa-steps" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .18 }} variants={reveal}>
              {steps.map(([n, title, text]) => (
                <div className="maisa-step" key={n}>
                  <div className="maisa-step-n">{n}</div>
                  <div><h3>{title}</h3><p>{text}</p></div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <div className="maisa-divider" />

        <section className="maisa-operators" id="operadoras">
          <div className="maisa-operators-inner">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .25 }} variants={reveal}>
              <div className="maisa-label">Parceiros</div>
              <h2 className="maisa-section-title">+20 operadoras<br /><em>comparadas por você.</em></h2>
            </motion.div>

            <div className="maisa-op-marquee" aria-label="Operadoras parceiras">
              <div className="maisa-op-track">
                {[...operators, ...operators].map((name, index) => <span className="maisa-op-name" key={`${name}-${index}`}>{name} <span className="maisa-op-dot">·</span></span>)}
              </div>
            </div>

            <motion.div className="maisa-op-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .18 }} variants={reveal}>
              {operatorCards.map(([name, tag]) => <div className="maisa-op-card maisa-touch" key={name}><strong>{name}</strong><span>{tag}</span></div>)}
            </motion.div>
          </div>
        </section>

        <div className="maisa-divider" />

        <section className="maisa-section" id="depoimentos">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .25 }} variants={reveal}>
            <div className="maisa-label">Depoimentos</div>
            <h2 className="maisa-section-title">O que dizem<br /><em>quem chegou aqui.</em></h2>
          </motion.div>

          <motion.div className="maisa-testimonials" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .15 }} variants={reveal}>
            {testimonials.map(([initials, name, city, quote]) => (
              <article className="maisa-testi maisa-touch" key={name}>
                <div className="maisa-stars">★★★★★</div>
                <p className="maisa-quote">“{quote}”</p>
                <div className="maisa-person"><div className="maisa-avatar">{initials}</div><div><strong>{name}</strong><span>{city}</span></div></div>
              </article>
            ))}
          </motion.div>
        </section>

        <div className="maisa-divider" />

        <section className="maisa-faq-section" id="faq">
          <div className="maisa-faq-inner">
            <motion.div className="maisa-centered" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .25 }} variants={reveal}>
              <div className="maisa-label">Dúvidas</div>
              <h2 className="maisa-section-title">Perguntas<br /><em>frequentes.</em></h2>
            </motion.div>

            <div className="maisa-faq-list">
              {faqs.map(([question, answer], index) => (
                <div className={`maisa-faq-row ${openFaq === index ? 'open' : ''}`} key={question}>
                  <button className="maisa-faq-head" type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                    <span className="maisa-faq-q">{question}</span><span className="maisa-faq-icon">+</span>
                  </button>
                  <div className="maisa-faq-body"><div><p>{answer}</p></div></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="maisa-cta" id="contato">
          <motion.div className="maisa-cta-content" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .25 }} variants={reveal}>
            <div className="maisa-cta-pre">Comece agora — é gratuito</div>
            <h2 className="maisa-cta-title">Saúde é decisão<br /><em>que não pode esperar.</em></h2>
            <p>Uma conversa rápida já é suficiente para entender seu perfil e apontar caminhos mais seguros para contratar ou trocar de plano.</p>
            <a className="maisa-btn primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /><span>Falar no WhatsApp agora</span></a>
            <div className="maisa-trust">Sem compromisso · Sem custo · Atendimento em todo o Brasil</div>
          </motion.div>
        </section>

        <div className="maisa-float">
          <div className="maisa-float-label">Consultoria gratuita</div>
          <a className="maisa-float-btn" href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Falar com Maisa Valentim no WhatsApp"><WhatsAppIcon /></a>
        </div>

        <div className="maisa-mobile-dock" aria-label="Ações rápidas">
          <a href="#metodo">Método</a>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
      </main>
    </>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.52 5.845L.057 23.885l6.165-1.616A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.795 9.795 0 01-5.003-1.373l-.359-.213-3.72.976.994-3.632-.234-.373A9.774 9.774 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
    </svg>
  );
}

export default PaginaLandingPremium;
