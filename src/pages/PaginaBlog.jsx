import { motion } from 'framer-motion';
import SEO from '../components/SEO.jsx';

const whatsappUrl = 'https://wa.me/5521977472141?text=Olá!%20Gostaria%20de%20uma%20pré-análise%20de%20plano%20de%20saúde.';

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
        .elite-page section { position: relative; z-index: 1; }
        .elite-hero {
          min-height: calc(100vh - 80px);
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(320px, .86fr);
          align-items: center;
          gap: clamp(42px, 7vw, 96px);
          max-width: 1280px;
          margin: 0 auto;
          padding: clamp(104px, 12vw, 160px) clamp(20px, 6vw, 72px) clamp(74px, 9vw, 110px);
        }
        .elite-orb {
          position: absolute;
          width: 520px;
          height: 520px;
          right: -160px;
          top: 72px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(106,140,82,.28), transparent 70%);
          filter: blur(42px);
          animation: elite-float 8s ease-in-out infinite;
        }
        .elite-eyebrow, .elite-kicker {
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
        .elite-eyebrow::before, .elite-kicker::before { content: ''; width: 32px; height: 1px; background: var(--g3); }
        .elite-title {
          color: var(--text);
          font-family: 'Playfair Display', serif;
          font-size: clamp(52px, 8vw, 104px);
          line-height: .88;
          letter-spacing: -.06em;
          margin: 0 0 26px;
        }
        .elite-title em, .elite-section-title em { color: var(--g3); font-style: italic; font-weight: 500; }
        .elite-sub {
          max-width: 590px;
          color: var(--muted);
          font-size: clamp(16px, 1.7vw, 19px);
          line-height: 1.85;
          margin: 0 0 36px;
        }
        .elite-actions { display: flex; flex-wrap: wrap; gap: 14px; margin-bottom: 44px; }
        .elite-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 52px;
          padding: 0 30px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: .08em;
          text-transform: uppercase;
          transition: transform .3s ease, box-shadow .3s ease, border-color .3s ease;
        }
        .elite-btn.primary { color: #eff8e7; background: linear-gradient(135deg, var(--g2), var(--g0)); box-shadow: 0 0 40px var(--glow), inset 0 1px 0 rgba(255,255,255,.12); border: 1px solid var(--gb2); }
        .elite-btn.ghost { color: var(--text); background: var(--glass); border: 1px solid var(--gb2); backdrop-filter: blur(18px); }
        .elite-btn:hover { transform: translateY(-3px); box-shadow: 0 22px 54px rgba(0,0,0,.34), 0 0 54px var(--glow); }
        .elite-metrics { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); border-top: 1px solid var(--gb); max-width: 680px; }
        .elite-metric { padding: 28px 22px 0 0; border-right: 1px solid var(--gb); }
        .elite-metric:last-child { border-right: 0; padding-left: 22px; }
        .elite-metric strong { display: block; font-family: 'Playfair Display', serif; color: var(--g3); font-size: clamp(30px, 4vw, 46px); line-height: 1; }
        .elite-metric span { display: block; margin-top: 8px; color: var(--muted); font-size: 11px; text-transform: uppercase; letter-spacing: .1em; font-weight: 900; }
        .elite-card-scene { min-height: 520px; display: flex; align-items: center; justify-content: center; perspective: 1000px; }
        .elite-stack { width: min(390px, 88vw); height: 250px; position: relative; transform-style: preserve-3d; animation: elite-card-breath 7s ease-in-out infinite; }
        .elite-glass-card {
          position: absolute;
          inset: 0;
          border-radius: 28px;
          padding: 30px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border: 1px solid var(--gb2);
          backdrop-filter: blur(30px) saturate(160%);
          box-shadow: 0 34px 90px rgba(0,0,0,.52), inset 0 1px 0 rgba(255,255,255,.1);
        }
        .elite-card-a { background: rgba(13,22,10,.72); transform: rotateX(10deg) rotateY(-10deg) translate3d(-28px, 54px, -110px) scale(.9); opacity: .68; }
        .elite-card-b { background: rgba(29,46,22,.68); transform: rotateX(6deg) rotateY(-6deg) translate3d(-14px, 28px, -56px) scale(.95); opacity: .86; }
        .elite-card-c { background: linear-gradient(135deg, rgba(74,107,58,.62), rgba(45,74,36,.74)); transform: translateZ(0); }
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
        .elite-plan, .elite-testi, .elite-mini, .elite-coverage-main, .elite-cta-box {
          background: var(--glass2);
          border: 1px solid var(--gb);
          border-radius: 28px;
          backdrop-filter: blur(28px) saturate(150%);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.07);
          transition: transform .35s ease, border-color .35s ease, box-shadow .35s ease;
        }
        .elite-plan { padding: 38px; min-height: 540px; display: flex; flex-direction: column; gap: 24px; position: relative; overflow: hidden; }
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
        .elite-coverage-main { padding: clamp(34px, 5vw, 54px); }
        .elite-coverage-main h3 { color: var(--text); font-size: clamp(32px, 4vw, 48px); line-height: 1.05; margin: 0 0 38px; }
        .elite-bars { display: grid; gap: 18px; }
        .elite-bar-label { display: flex; justify-content: space-between; color: var(--muted); font-size: 13px; margin-bottom: 8px; }
        .elite-bar-label strong { color: var(--g3); }
        .elite-track { height: 7px; border-radius: 999px; background: rgba(138,171,110,.11); overflow: hidden; }
        .elite-fill { height: 100%; border-radius: inherit; background: linear-gradient(90deg, var(--g0), var(--g2), var(--g3)); transform-origin: left; }
        .elite-mini-grid { display: grid; gap: 20px; }
        .elite-mini { padding: 30px; }
        .elite-mini-icon { font-size: 32px; margin-bottom: 14px; }
        .elite-mini h4 { color: var(--g3); font-size: 24px; margin: 0 0 10px; }
        .elite-mini p { color: var(--muted); line-height: 1.7; margin: 0; }
        .elite-testi { padding: 34px; }
        .elite-stars { color: var(--g3); letter-spacing: 3px; margin-bottom: 18px; }
        .elite-testi p { color: var(--text); font-family: 'Playfair Display', serif; font-style: italic; font-size: 18px; line-height: 1.65; margin: 0 0 24px; }
        .elite-author { display: flex; align-items: center; gap: 12px; }
        .elite-avatar { width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, var(--g2), var(--g0)); color: #edf8e6; display: grid; place-items: center; font-weight: 900; border: 1px solid var(--gb2); }
        .elite-author strong { display: block; color: var(--text); font-size: 14px; }
        .elite-author span { color: var(--muted); font-size: 12px; }
        .elite-cta { padding-bottom: clamp(80px, 10vw, 132px); }
        .elite-cta-box { max-width: 1280px; margin: 0 auto; padding: clamp(54px, 8vw, 92px); display: grid; grid-template-columns: 1fr auto; gap: 36px; align-items: center; overflow: hidden; position: relative; }
        .elite-cta-box::before { content: ''; position: absolute; right: -120px; top: -120px; width: 360px; height: 360px; background: radial-gradient(circle, rgba(138,171,110,.22), transparent 70%); filter: blur(12px); }
        .elite-cta-box > * { position: relative; z-index: 1; }
        .elite-cta h2 { color: var(--text); font-size: clamp(36px, 5vw, 64px); line-height: .98; margin: 0 0 18px; }
        .elite-cta p { color: var(--muted); max-width: 580px; line-height: 1.75; margin: 0; }
        .elite-cta-actions { display: grid; gap: 14px; min-width: 230px; }
        @keyframes elite-float { 0%,100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-24px) scale(1.04); } }
        @keyframes elite-card-breath { 0%,100% { transform: rotateY(-4deg) rotateX(2deg) translateY(0); } 50% { transform: rotateY(5deg) rotateX(-2deg) translateY(-14px); } }
        @media (max-width: 980px) {
          .elite-hero, .elite-coverage-grid, .elite-cta-box { grid-template-columns: 1fr; }
          .elite-card-scene { min-height: 380px; }
          .elite-head { display: block; }
          .elite-head p { text-align: left; margin-top: 18px; }
          .elite-plan-grid, .elite-testimonials { grid-template-columns: 1fr; }
          .elite-metrics { grid-template-columns: 1fr; }
          .elite-metric { border-right: 0; padding-left: 0 !important; border-bottom: 1px solid var(--gb); padding-bottom: 18px; }
          .elite-metric:last-child { border-bottom: 0; }
        }
      `}</style>

      <main className="elite-page">
        <div className="elite-orb" />

        <section className="elite-hero">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
            <div className="elite-eyebrow">Consultoria premium em saúde</div>
            <h1 className="elite-title">Plano de saúde com escolha <em>inteligente</em>.</h1>
            <p className="elite-sub">
              Uma experiência consultiva para comparar operadoras, rede, carência e custo-benefício antes de contratar. Sem vitrine genérica, sem decisão no escuro.
            </p>
            <div className="elite-actions">
              <a className="elite-btn primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Fazer pré-análise</a>
              <a className="elite-btn ghost" href="#planos">Ver opções</a>
            </div>
            <div className="elite-metrics">
              <div className="elite-metric"><strong>RJ</strong><span>Atendimento consultivo</span></div>
              <div className="elite-metric"><strong>PJ</strong><span>MEI, família e empresa</span></div>
              <div className="elite-metric"><strong>1:1</strong><span>Orientação humana</span></div>
            </div>
          </motion.div>

          <motion.div className="elite-card-scene" initial={{ opacity: 0, y: 30, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .8, delay: .12 }}>
            <div className="elite-stack">
              {['Essencial', 'Plus', 'Elite'].map((name, index) => (
                <div key={name} className={`elite-glass-card elite-card-${['a', 'b', 'c'][index]}`}>
                  <div className="elite-card-top">
                    <div><div className="elite-card-label">Plano</div><div className="elite-card-name">{name}</div></div>
                    <div className="elite-chip">{index === 2 ? 'Premium' : index === 1 ? 'Popular' : 'Base'}</div>
                  </div>
                  <div className="elite-card-price">{index === 2 ? 'Rede premium' : index === 1 ? 'Família/PJ' : 'Essencial'}</div>
                  <div className="elite-tags">
                    <span className="elite-tag">Rede</span><span className="elite-tag">Carência</span><span className="elite-tag">Cotação</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="elite-section" id="planos">
          <div className="elite-head">
            <div>
              <div className="elite-kicker">Escolha com clareza</div>
              <h2 className="elite-section-title">Proteção em <em>três perfis</em></h2>
            </div>
            <p>Não existe preço único sem análise. A consultoria entende seu cenário e indica o caminho mais coerente.</p>
          </div>

          <div className="elite-plan-grid">
            {planCards.map((plan, index) => (
              <motion.article
                key={plan.name}
                className={`elite-plan ${plan.featured ? 'featured' : ''}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .55, delay: index * .08 }}
              >
                {plan.featured && <div className="elite-plan-badge">Mais escolhido</div>}
                <div>
                  <h3>{plan.name}</h3>
                  <div className="elite-plan-price">{plan.price}</div>
                </div>
                <p>{plan.desc}</p>
                <div className="elite-feature-list">
                  {plan.features.map((item) => <div className="elite-feature" key={item}>{item}</div>)}
                  {plan.muted.map((item) => <div className="elite-feature muted" key={item}>{item}</div>)}
                </div>
                <a className={`elite-btn ${plan.featured ? 'primary' : 'ghost'}`} href={whatsappUrl} target="_blank" rel="noopener noreferrer">Solicitar análise</a>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="elite-section" id="cobertura">
          <div className="elite-head">
            <div>
              <div className="elite-kicker">O que analisamos</div>
              <h2 className="elite-section-title">Cobertura <em>sem surpresa</em></h2>
            </div>
            <p>A página agora vende percepção premium, mas mantém a promessa correta: análise, comparação e orientação.</p>
          </div>

          <div className="elite-coverage-grid">
            <motion.div className="elite-coverage-main" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3>Cada detalhe do plano precisa conversar com sua rotina.</h3>
              <div className="elite-bars">
                {coverage.map(([label, value]) => (
                  <div key={label}>
                    <div className="elite-bar-label"><span>{label}</span><strong>{value}%</strong></div>
                    <div className="elite-track"><motion.div className="elite-fill" initial={{ scaleX: 0 }} whileInView={{ scaleX: value / 100 }} viewport={{ once: true }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }} /></div>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="elite-mini-grid">
              {[
                ['🏥', 'Rede hospitalar', 'Comparação por cidade, hospitais desejados e perfil de uso.'],
                ['⚡', 'Cotação orientada', 'Você entende caminhos possíveis antes de receber proposta.'],
                ['📱', 'WhatsApp humano', 'Conversa direta para tirar dúvidas e evitar contratação por impulso.'],
                ['🛡️', 'Menos risco', 'Atenção a carências, elegibilidade, regras e documentos.']
              ].map(([icon, title, text], index) => (
                <motion.div key={title} className="elite-mini" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }}>
                  <div className="elite-mini-icon">{icon}</div>
                  <h4>{title}</h4>
                  <p>{text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="elite-section" id="depoimentos">
          <div className="elite-head">
            <div>
              <div className="elite-kicker">Depoimentos</div>
              <h2 className="elite-section-title">Confiança antes da <em>contratação</em></h2>
            </div>
            <p>Textos curtos, premium e focados na dor real: escolher plano sem cair em comparação rasa de preço.</p>
          </div>
          <div className="elite-testimonials">
            {testimonials.map(([initials, name, role, text], index) => (
              <motion.article key={name} className="elite-testi" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }}>
                <div className="elite-stars">★★★★★</div>
                <p>“{text}”</p>
                <div className="elite-author"><div className="elite-avatar">{initials}</div><div><strong>{name}</strong><span>{role}</span></div></div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="elite-section elite-cta" id="contato">
          <div className="elite-cta-box">
            <div>
              <div className="elite-kicker">Comece hoje</div>
              <h2>Receba uma pré-análise antes de contratar.</h2>
              <p>Envie seu perfil pelo WhatsApp e receba uma orientação inicial para comparar operadoras, rede e cenário de contratação.</p>
            </div>
            <div className="elite-cta-actions">
              <a className="elite-btn primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Chamar no WhatsApp</a>
              <a className="elite-btn ghost" href="/contato">Página de contato</a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default PaginaBlog;
