import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import PremiumLandingEffects from '../components/PremiumLandingEffects.jsx';

const whatsappUrl = 'https://wa.me/5521977472141?text=Olá!%20Gostaria%20de%20uma%20pré-análise%20de%20plano%20de%20saúde.';

const reveal = {
  hidden: { opacity: 0, y: 36, filter: 'blur(12px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.78, ease: [0.16, 1, 0.3, 1] } }
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } }
};

const metrics = [
  ['100+', 'famílias orientadas'],
  ['20+', 'empresas atendidas'],
  ['98%', 'satisfação consultiva'],
  ['24h', 'resposta humanizada']
];

const story = [
  'Comecei minha jornada no setor de saúde com o propósito de transformar escolhas confusas em decisões seguras. Vi de perto como famílias e empresas contratavam planos inadequados por falta de orientação clara.',
  'Hoje, meu trabalho combina análise de perfil, leitura de rede, entendimento de carências e comparação entre operadoras para entregar uma recomendação realmente alinhada à necessidade de cada cliente.',
  'Meu compromisso é unir tecnologia, atendimento humano e transparência para que cada pessoa entenda o que está contratando antes de tomar uma decisão importante para sua saúde.'
];

const values = [
  ['Transparência', 'Explicação clara sobre rede, carência, regras e limites antes da contratação.'],
  ['Curadoria', 'Filtro técnico das opções para encontrar o melhor equilíbrio entre preço, rede e perfil.'],
  ['Cuidado', 'Atendimento próximo, com suporte antes, durante e depois da escolha do plano.'],
  ['Ética', 'Recomendação baseada no que faz sentido para o cliente, não em promessa vazia.']
];

function PaginaSobrePremium() {
  const { scrollYProgress } = useScroll();
  const orbY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);

  return (
    <>
      <SEO
        title="Sobre Maisa Valentim - Consultoria Premium em Planos de Saúde"
        description="Conheça a trajetória, valores e método consultivo da Maisa Valentim em planos de saúde para famílias, MEI e empresas."
        keywords="Maisa Valentim, sobre consultoria plano de saúde, consultora plano de saúde RJ, plano familiar, plano empresarial"
        url="https://consultoriadesaude.vercel.app/sobre"
      />

      <style>{`
        .about-fluid-page {
          --bg0: #080e06;
          --bg1: #0d160a;
          --g0: #2d4a24;
          --g1: #4a6b3a;
          --g2: #6b8c52;
          --g3: #8aab6e;
          --g4: #a8c48a;
          --text: #d8e8cc;
          --muted: rgba(216,232,204,.62);
          --glass: rgba(13,22,10,.58);
          --glass2: rgba(45,74,36,.25);
          --gb: rgba(106,140,82,.24);
          --gb2: rgba(138,171,110,.38);
          --glow: rgba(106,140,82,.30);
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          isolation: isolate;
          padding-top: clamp(118px, 13vw, 160px);
          color: var(--text);
          background:
            radial-gradient(circle at 78% 8%, rgba(74,107,58,.24), transparent 35rem),
            radial-gradient(circle at 5% 18%, rgba(138,171,110,.14), transparent 31rem),
            linear-gradient(180deg, var(--bg0), var(--bg1) 52%, #070b05);
        }
        .about-fluid-page::before {
          content: '';
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(138,171,110,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(138,171,110,.04) 1px, transparent 1px);
          background-size: 54px 54px;
          mask-image: linear-gradient(180deg, rgba(0,0,0,.72), transparent 82%);
        }
        .about-fluid-page::after {
          content: '';
          position: fixed;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          opacity: .32;
          background-image: radial-gradient(rgba(255,255,255,.08) 1px, transparent 1px);
          background-size: 3px 3px;
          mix-blend-mode: soft-light;
        }
        .about-webgl-wrap { position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: .92; }
        .about-orb {
          position: fixed;
          width: min(58vw, 620px);
          height: min(58vw, 620px);
          right: -180px;
          top: 100px;
          z-index: 0;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(138,171,110,.22), rgba(74,107,58,.12) 36%, transparent 72%);
          filter: blur(42px);
          pointer-events: none;
        }
        .about-water-nav {
          position: sticky;
          top: 92px;
          z-index: 10;
          max-width: 920px;
          margin: 0 auto clamp(38px, 5vw, 68px);
          padding: 8px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          border: 1px solid var(--gb2);
          border-radius: 999px;
          background: rgba(13,22,10,.58);
          backdrop-filter: blur(28px) saturate(180%);
          -webkit-backdrop-filter: blur(28px) saturate(180%);
          box-shadow: 0 22px 70px rgba(0,0,0,.38), inset 0 1px 0 rgba(255,255,255,.08);
        }
        .about-water-nav a {
          min-height: 46px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          color: var(--muted);
          text-decoration: none;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .12em;
          text-transform: uppercase;
          position: relative;
          overflow: hidden;
        }
        .about-water-nav a::before {
          content: '';
          position: absolute;
          inset: -70% -35%;
          background: linear-gradient(115deg, transparent 36%, rgba(255,255,255,.20), transparent 64%);
          transform: translateX(-70%) rotate(12deg);
          transition: transform .75s cubic-bezier(.16,1,.3,1);
        }
        .about-water-nav a:hover::before { transform: translateX(70%) rotate(12deg); }
        .about-water-nav a:hover,
        .about-water-nav a.is-hot {
          color: #edf8e6;
          background: linear-gradient(135deg, rgba(107,140,82,.88), rgba(45,74,36,.92));
          box-shadow: 0 0 30px var(--glow), inset 0 1px 0 rgba(255,255,255,.13);
        }
        .about-section {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
          padding: clamp(70px, 9vw, 118px) clamp(20px, 6vw, 72px);
        }
        .about-hero {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(300px, .82fr);
          gap: clamp(36px, 7vw, 96px);
          align-items: center;
          padding-top: 0;
        }
        .about-kicker {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: var(--g3);
          font-size: 12px;
          font-weight: 900;
          letter-spacing: .18em;
          text-transform: uppercase;
          margin-bottom: 24px;
        }
        .about-kicker::before { content: ''; width: 34px; height: 1px; background: var(--g3); }
        .about-title {
          color: var(--text);
          font-family: 'Playfair Display', serif;
          font-size: clamp(48px, 8vw, 104px);
          line-height: .9;
          letter-spacing: -.06em;
          margin: 0 0 28px;
        }
        .about-title em { color: var(--g3); font-style: italic; font-weight: 500; }
        .about-lead {
          max-width: 650px;
          color: var(--muted);
          font-size: clamp(16px, 1.7vw, 20px);
          line-height: 1.85;
          margin: 0 0 34px;
        }
        .about-actions { display: flex; flex-wrap: wrap; gap: 14px; }
        .about-btn {
          min-height: 54px;
          padding: 0 28px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: .08em;
          text-transform: uppercase;
          position: relative;
          overflow: hidden;
          border: 1px solid var(--gb2);
          color: #eff8e7;
          background: linear-gradient(135deg, var(--g2), var(--g0));
          box-shadow: 0 0 40px var(--glow), inset 0 1px 0 rgba(255,255,255,.12);
        }
        .about-btn.ghost { background: rgba(13,22,10,.48); color: var(--text); }
        .about-portrait-card,
        .about-glass-card,
        .about-value-card,
        .about-story-card,
        .about-cta-card {
          border: 1px solid var(--gb);
          background: linear-gradient(160deg, rgba(45,74,36,.28), rgba(13,22,10,.68));
          backdrop-filter: blur(30px) saturate(160%);
          -webkit-backdrop-filter: blur(30px) saturate(160%);
          box-shadow: 0 34px 100px rgba(0,0,0,.42), inset 0 1px 0 rgba(255,255,255,.08);
          position: relative;
          overflow: hidden;
        }
        .about-portrait-card::before,
        .about-glass-card::before,
        .about-value-card::before,
        .about-story-card::before,
        .about-cta-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at var(--shine-x, 50%) var(--shine-y, 0%), rgba(168,196,138,.16), transparent 34%);
          pointer-events: none;
        }
        .about-portrait-card {
          border-radius: 34px;
          padding: clamp(26px, 4vw, 42px);
          transform-style: preserve-3d;
        }
        .about-photo-shell {
          width: min(320px, 74vw);
          aspect-ratio: 1;
          margin: 0 auto 28px;
          border-radius: 32px;
          overflow: hidden;
          border: 1px solid rgba(168,196,138,.30);
          box-shadow: 0 28px 82px rgba(0,0,0,.38), 0 0 0 8px rgba(168,196,138,.04);
          transform: translateZ(40px);
        }
        .about-photo-shell img {
          width: 100%; height: 100%; object-fit: cover; object-position: center 30%; transform: scale(1.12);
          filter: saturate(1.08) contrast(1.04) brightness(.96);
        }
        .about-signature { text-align: center; position: relative; z-index: 1; }
        .about-signature strong { display: block; font-family: 'Playfair Display', serif; color: var(--g3); font-size: 30px; line-height: 1; }
        .about-signature span { display: block; color: var(--muted); margin-top: 10px; font-size: 13px; letter-spacing: .08em; text-transform: uppercase; font-weight: 800; }
        .about-metrics {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
        }
        .about-glass-card { border-radius: 28px; padding: clamp(26px, 4vw, 38px); }
        .about-glass-card strong { display: block; font-family: 'Playfair Display', serif; color: var(--g3); font-size: clamp(42px, 6vw, 68px); line-height: 1; }
        .about-glass-card span { display: block; color: var(--muted); margin-top: 12px; font-size: 12px; letter-spacing: .1em; text-transform: uppercase; font-weight: 900; }
        .about-head { max-width: 760px; margin-bottom: clamp(42px, 6vw, 72px); }
        .about-section-title { margin: 0; color: var(--text); font-size: clamp(38px, 6vw, 78px); line-height: .96; letter-spacing: -.04em; }
        .about-section-title em { color: var(--g3); font-style: italic; font-weight: 500; }
        .about-head p { color: var(--muted); line-height: 1.8; font-size: 17px; }
        .about-story-grid { display: grid; grid-template-columns: .78fr 1.22fr; gap: 20px; align-items: stretch; }
        .about-story-index { border-radius: 30px; padding: 34px; background: linear-gradient(135deg, rgba(107,140,82,.30), rgba(45,74,36,.18)); border: 1px solid var(--gb); min-height: 100%; }
        .about-story-index b { display: block; font-family: 'Playfair Display', serif; color: var(--g3); font-size: clamp(54px, 7vw, 92px); line-height: .85; }
        .about-story-index span { color: var(--muted); text-transform: uppercase; letter-spacing: .14em; font-size: 12px; font-weight: 900; }
        .about-story-list { display: grid; gap: 18px; }
        .about-story-card { border-radius: 28px; padding: clamp(26px, 4vw, 36px); color: var(--muted); line-height: 1.85; font-size: 16px; }
        .about-values { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 18px; }
        .about-value-card { border-radius: 28px; padding: 30px; min-height: 230px; }
        .about-value-card i { width: 46px; height: 46px; display: grid; place-items: center; border-radius: 16px; font-style: normal; color: #edf8e6; background: linear-gradient(135deg, var(--g2), var(--g0)); box-shadow: 0 18px 42px rgba(0,0,0,.24); margin-bottom: 24px; }
        .about-value-card h3 { color: var(--g3); margin: 0 0 12px; font-size: 24px; }
        .about-value-card p { color: var(--muted); line-height: 1.72; margin: 0; font-size: 14px; }
        .about-cta-card { border-radius: 36px; padding: clamp(46px, 7vw, 86px); display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 34px; }
        .about-cta-card h2 { color: var(--text); font-size: clamp(36px, 5.5vw, 70px); line-height: .98; margin: 0 0 18px; }
        .about-cta-card p { color: var(--muted); max-width: 640px; line-height: 1.8; margin: 0; }
        @media (max-width: 980px) {
          .about-fluid-page { padding-top: 110px; }
          .about-water-nav { top: 82px; margin-left: 14px; margin-right: 14px; grid-template-columns: repeat(4, 1fr); }
          .about-hero, .about-story-grid, .about-cta-card { grid-template-columns: 1fr; }
          .about-metrics, .about-values { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .about-actions .about-btn { width: 100%; }
        }
        @media (max-width: 560px) {
          .about-fluid-page { padding-top: 94px; }
          .about-water-nav { overflow-x: auto; grid-template-columns: repeat(4, minmax(104px, 1fr)); border-radius: 24px; padding: 7px; }
          .about-water-nav a { min-height: 42px; font-size: 10px; }
          .about-section { padding-left: 18px; padding-right: 18px; }
          .about-metrics, .about-values { grid-template-columns: 1fr; }
          .about-portrait-card, .about-cta-card { border-radius: 28px; }
        }
      `}</style>

      <main className="about-fluid-page">
        <div className="about-webgl-wrap"><PremiumLandingEffects /></div>
        <motion.div className="about-orb" style={{ y: orbY }} />
        <motion.div style={{ y: gridY }} />

        <motion.nav
          className="about-water-nav"
          initial={{ opacity: 0, y: -18, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: .72, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Navegação da página sobre"
        >
          <a className="is-hot" href="#sobre-hero">Perfil</a>
          <a href="#historia">História</a>
          <a href="#valores">Valores</a>
          <a href="#contato-sobre">Contato</a>
        </motion.nav>

        <motion.section id="sobre-hero" className="about-section about-hero" variants={container} initial="hidden" animate="show">
          <div>
            <motion.div className="about-kicker" variants={reveal}>Sobre Mim</motion.div>
            <motion.h1 className="about-title" variants={reveal}>Maisa <em>Valentim</em></motion.h1>
            <motion.p className="about-lead" variants={reveal}>
              Consultoria premium em planos de saúde com análise humana, tecnologia, curadoria de rede e orientação transparente para famílias, MEI e empresas.
            </motion.p>
            <motion.div className="about-actions" variants={reveal}>
              <Link className="about-btn" to="/contato">Agendar consultoria <span>→</span></Link>
              <a className="about-btn ghost" href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </motion.div>
          </div>

          <motion.div
            className="about-portrait-card elite-touch-card"
            variants={reveal}
            whileHover={{ y: -10, rotateX: 4, rotateY: -4 }}
            transition={{ type: 'spring', stiffness: 190, damping: 22 }}
          >
            <div className="about-photo-shell">
              <img src="/images/maisa1.jpg" alt="Maisa Valentim - Consultora de Planos de Saúde" />
            </div>
            <div className="about-signature">
              <strong>Consultoria com clareza</strong>
              <span>Rede · Perfil · Carência · Custo-benefício</span>
            </div>
          </motion.div>
        </motion.section>

        <section className="about-section">
          <motion.div className="about-metrics" variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: .25 }}>
            {metrics.map(([number, label]) => (
              <motion.div className="about-glass-card elite-touch-card" variants={reveal} whileHover={{ y: -8, scale: 1.02 }} key={label}>
                <strong>{number}</strong>
                <span>{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section id="historia" className="about-section">
          <motion.div className="about-head" variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: .25 }}>
            <motion.div className="about-kicker" variants={reveal}>Trajetória</motion.div>
            <motion.h2 className="about-section-title" variants={reveal}>Minha história em <em>planos de saúde</em></motion.h2>
            <motion.p variants={reveal}>Uma página mais tecnológica, fluida e coerente com a identidade verde premium da landing inicial.</motion.p>
          </motion.div>

          <div className="about-story-grid">
            <motion.div className="about-story-index elite-touch-card" initial={{ opacity: 0, x: -34 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .8, ease: [0.16, 1, 0.3, 1] }}>
              <b>5+</b>
              <span>anos conectando pessoas a escolhas mais seguras</span>
            </motion.div>
            <motion.div className="about-story-list" variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: .22 }}>
              {story.map((paragraph, index) => (
                <motion.div className="about-story-card elite-touch-card" variants={reveal} whileHover={{ x: 8 }} key={paragraph}>
                  <strong style={{ color: 'var(--g3)', marginRight: 10 }}>0{index + 1}</strong>
                  {paragraph}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="valores" className="about-section">
          <motion.div className="about-head" variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: .25 }}>
            <motion.div className="about-kicker" variants={reveal}>Método</motion.div>
            <motion.h2 className="about-section-title" variants={reveal}>Valores que guiam a <em>consultoria</em></motion.h2>
          </motion.div>

          <motion.div className="about-values" variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: .2 }}>
            {values.map(([title, description], index) => (
              <motion.article className="about-value-card elite-touch-card" variants={reveal} whileHover={{ y: -10, rotateX: 3 }} key={title}>
                <i>{index + 1}</i>
                <h3>{title}</h3>
                <p>{description}</p>
              </motion.article>
            ))}
          </motion.div>
        </section>

        <section id="contato-sobre" className="about-section">
          <motion.div className="about-cta-card elite-touch-card" initial={{ opacity: 0, y: 46, scale: .97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .84, ease: [0.16, 1, 0.3, 1] }}>
            <div>
              <h2>Vamos encontrar o plano certo?</h2>
              <p>Envie seu perfil e receba uma pré-análise consultiva, sem pressão e com foco em rede, elegibilidade, carências e custo-benefício.</p>
            </div>
            <a className="about-btn" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Solicitar pré-análise <span>→</span></a>
          </motion.div>
        </section>
      </main>
    </>
  );
}

export default PaginaSobrePremium;
