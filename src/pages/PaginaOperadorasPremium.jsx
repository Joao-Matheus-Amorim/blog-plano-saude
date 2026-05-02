import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';

const whatsappUrl = 'https://wa.me/5521977472141?text=Olá!%20Gostaria%20de%20cotar%20um%20plano%20de%20saúde.';

const operadoras = [
  ['Bradesco Saúde', 'Rede nacional, referência corporativa e opções premium.'],
  ['Porto Seguro', 'Planos com tecnologia, prevenção e bom suporte digital.'],
  ['SulAmérica', 'Tradição, reembolso e rede ampla para diferentes perfis.'],
  ['Amil', 'Opções regionais e nacionais com boa presença hospitalar.'],
  ['Prevent Senior', 'Alternativas voltadas para público sênior e cuidado contínuo.'],
  ['Unimed', 'Rede cooperada extensa e presença forte em várias regiões.']
];

const benefits = ['Análise de perfil', 'Consulta de rede', 'Comparativo de preço', 'Orientação sobre carências'];

function PaginaOperadorasPremium() {
  return (
    <>
      <SEO
        title="Operadoras - Planos de Saúde"
        description="Compare operadoras de planos de saúde com consultoria especializada, análise de rede, carência e custo-benefício."
        keywords="operadoras plano saúde, Bradesco Saúde, SulAmérica, Amil, Unimed, Porto Seguro, Prevent Senior"
        url="https://consultoriadesaude.vercel.app/operadoras"
      />

      <style>{`
        .operators-page {
          --bg0: #080e06;
          --bg1: #0d160a;
          --g0: #2d4a24;
          --g1: #4a6b3a;
          --g2: #6b8c52;
          --g3: #8aab6e;
          --g4: #a8c48a;
          --text: #d8e8cc;
          --muted: rgba(216,232,204,.64);
          --gb: rgba(138,171,110,.28);
          --gb2: rgba(168,196,138,.40);
          --glow: rgba(106,140,82,.28);
          min-height: 100vh;
          padding: clamp(128px, 13vw, 170px) clamp(20px, 6vw, 72px) clamp(80px, 10vw, 124px);
          color: var(--text);
          background:
            radial-gradient(circle at 78% 8%, rgba(74,107,58,.24), transparent 35rem),
            radial-gradient(circle at 5% 18%, rgba(138,171,110,.14), transparent 31rem),
            linear-gradient(180deg, var(--bg0), var(--bg1) 52%, #070b05);
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }
        .operators-page::before {
          content: '';
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background-image: linear-gradient(rgba(138,171,110,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(138,171,110,.04) 1px, transparent 1px);
          background-size: 54px 54px;
          mask-image: linear-gradient(180deg, rgba(0,0,0,.72), transparent 82%);
        }
        .operators-inner { max-width: 1280px; margin: 0 auto; position: relative; z-index: 1; }
        .operators-kicker { display: inline-flex; align-items: center; gap: 12px; color: var(--g3); font-size: 12px; font-weight: 900; letter-spacing: .18em; text-transform: uppercase; margin-bottom: 22px; }
        .operators-kicker::before { content: ''; width: 34px; height: 1px; background: var(--g3); }
        .operators-title { color: var(--text); font-family: 'Playfair Display', serif; font-size: clamp(46px, 7vw, 92px); line-height: .92; letter-spacing: -.055em; max-width: 900px; margin: 0 0 24px; }
        .operators-title em { color: var(--g3); font-style: italic; font-weight: 500; }
        .operators-lead { max-width: 690px; color: var(--muted); font-size: clamp(16px, 1.7vw, 19px); line-height: 1.85; margin: 0 0 38px; }
        .operators-actions { display: flex; flex-wrap: wrap; gap: 14px; margin-bottom: clamp(52px, 7vw, 84px); }
        .operators-btn { min-height: 54px; padding: 0 28px; border-radius: 999px; display: inline-flex; align-items: center; justify-content: center; gap: 10px; text-decoration: none; font-size: 13px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; border: 1px solid var(--gb2); color: #eff8e7; background: linear-gradient(135deg, var(--g2), var(--g0)); box-shadow: 0 0 40px var(--glow), inset 0 1px 0 rgba(255,255,255,.12); }
        .operators-btn.ghost { background: rgba(13,22,10,.50); }
        .operators-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
        .operator-card { min-height: 280px; padding: 32px; border-radius: 30px; border: 1px solid var(--gb); background: linear-gradient(160deg, rgba(45,74,36,.30), rgba(13,22,10,.70)); backdrop-filter: blur(30px) saturate(160%); -webkit-backdrop-filter: blur(30px) saturate(160%); box-shadow: 0 30px 90px rgba(0,0,0,.38), inset 0 1px 0 rgba(255,255,255,.08); position: relative; overflow: hidden; text-decoration: none; display: flex; flex-direction: column; }
        .operator-card::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at var(--shine-x, 50%) var(--shine-y, 0%), rgba(168,196,138,.16), transparent 34%); pointer-events: none; }
        .operator-card h3 { color: var(--g3); margin: 0 0 14px; font-size: 28px; line-height: 1.05; position: relative; }
        .operator-card p { color: var(--muted); line-height: 1.75; margin: 0 0 26px; position: relative; }
        .operator-card ul { display: grid; gap: 10px; margin: auto 0 28px; padding: 0; list-style: none; position: relative; }
        .operator-card li { color: var(--text); font-size: 13px; display: flex; gap: 10px; align-items: center; }
        .operator-card li::before { content: '✓'; width: 20px; height: 20px; border-radius: 50%; display: grid; place-items: center; color: var(--g3); background: rgba(138,171,110,.10); border: 1px solid rgba(138,171,110,.24); font-size: 12px; flex: 0 0 20px; }
        .operator-card span { color: #eff8e7; font-size: 12px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; position: relative; }
        .operators-final { margin-top: 22px; padding: clamp(38px, 6vw, 64px); border-radius: 34px; border: 1px solid var(--gb2); background: linear-gradient(135deg, rgba(107,140,82,.28), rgba(13,22,10,.68)); backdrop-filter: blur(28px); }
        .operators-final h2 { color: var(--text); margin: 0 0 14px; font-size: clamp(32px, 4.5vw, 54px); }
        .operators-final p { color: var(--muted); line-height: 1.8; max-width: 700px; }
        @media (max-width: 980px) { .operators-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 620px) { .operators-page { padding-left: 18px; padding-right: 18px; } .operators-grid { grid-template-columns: 1fr; } .operators-actions .operators-btn { width: 100%; } }
      `}</style>

      <main className="operators-page">
        <div className="operators-inner">
          <motion.div initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: .78, ease: [0.16, 1, 0.3, 1] }}>
            <div className="operators-kicker">Operadoras Parceiras</div>
            <h1 className="operators-title">Escolha a operadora certa com <em>análise técnica</em></h1>
            <p className="operators-lead">Compare rede, elegibilidade, carência e custo-benefício com uma consultoria humana antes de contratar.</p>
            <div className="operators-actions">
              <Link className="operators-btn" to="/contato">Solicitar cotação <span>→</span></Link>
              <a className="operators-btn ghost" href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp direto</a>
            </div>
          </motion.div>

          <motion.div className="operators-grid" initial="hidden" whileInView="show" viewport={{ once: true, amount: .15 }} variants={{ hidden: {}, show: { transition: { staggerChildren: .08 } } }}>
            {operadoras.map(([nome, descricao]) => (
              <motion.div key={nome} variants={{ hidden: { opacity: 0, y: 34, filter: 'blur(10px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: .7, ease: [0.16, 1, 0.3, 1] } } }} whileHover={{ y: -10, rotateX: 3, scale: 1.01 }}>
                <Link className="operator-card elite-touch-card" to="/contato" state={{ operadora: nome }}>
                  <h3>{nome}</h3>
                  <p>{descricao}</p>
                  <ul>{benefits.map((item) => <li key={item}>{item}</li>)}</ul>
                  <span>Cotar essa operadora →</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="operators-final elite-touch-card" initial={{ opacity: 0, y: 38 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .8, ease: [0.16, 1, 0.3, 1] }}>
            <h2>Não encontrou a operadora?</h2>
            <p>Também faço pré-análise para outras opções disponíveis conforme região, idade, CNPJ, MEI, família e necessidade de rede hospitalar.</p>
            <Link className="operators-btn" to="/contato">Falar com especialista <span>→</span></Link>
          </motion.div>
        </div>
      </main>
    </>
  );
}

export default PaginaOperadorasPremium;
