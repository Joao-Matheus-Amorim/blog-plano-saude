import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO.jsx';
import PremiumLandingEffects from '../components/PremiumLandingEffects.jsx';
import './PaginaLandingMasterpiece.css';

const whatsappUrl = 'https://wa.me/5521977472141?text=Olá%20Maisa,%20quero%20uma%20consultoria%20gratuita%20para%20plano%20de%20saúde.';

const navItems = [
  ['Curadoria', '#curadoria'],
  ['Método', '#metodo'],
  ['Operadoras', '#operadoras'],
  ['Prova social', '#depoimentos'],
  ['FAQ', '#faq']
];

const operators = ['Unimed', 'Bradesco Saúde', 'SulAmérica', 'Amil', 'Porto Saúde', 'Hapvida', 'NotreDame', 'Care Plus', 'Sompo', 'Assim Saúde'];

const methodSteps = [
  ['01', 'Diagnóstico real', 'Entendo cidade, idade, dependentes, hospitais desejados, uso médico e limite de investimento.'],
  ['02', 'Filtro técnico', 'Corto opções ruins antes de você ver: rede fraca, carência incoerente, coparticipação confusa e contrato desalinhado.'],
  ['03', 'Comparativo claro', 'Você recebe poucas opções, mas bem escolhidas, com prós, limites e indicação honesta do melhor caminho.'],
  ['04', 'Suporte depois', 'A contratação não encerra a relação. A Maisa segue disponível para dúvidas, carteirinha e primeiros usos.']
];

const proofCards = [
  ['+20', 'operadoras comparadas', 'mercado amplo, escolha mais precisa'],
  ['0', 'custo de consultoria', 'orientação gratuita e sem pressão'],
  ['5★', 'experiência percebida', 'clareza, cuidado e acompanhamento']
];

const testimonials = [
  ['AL', 'Ana Lima', 'São Paulo, SP', 'A Maisa transformou um assunto confuso em uma decisão simples. Pela primeira vez entendi carência, rede e preço antes de contratar.'],
  ['CR', 'Carlos Rocha', 'Rio de Janeiro, RJ', 'Eu queria economizar, mas sem perder hospital. Ela comparou tudo e me mostrou onde valia pagar e onde era desperdício.'],
  ['JP', 'Julia Pereira', 'Belo Horizonte, MG', 'Foi uma consultoria de verdade, não uma venda. A honestidade sobre as limitações dos planos foi o que me fez confiar.']
];

const faqs = [
  ['A consultoria é mesmo gratuita?', 'Sim. Você não paga pela consultoria. A remuneração vem da operadora quando há contratação, sem alterar o valor final do plano.'],
  ['Você atende fora do Rio de Janeiro?', 'Sim. O atendimento é online pelo WhatsApp e a análise considera a rede credenciada da sua cidade antes da indicação.'],
  ['Consigo avaliar meu plano atual?', 'Sim. A Maisa pode comparar seu plano atual com alternativas do mercado para ver se ainda faz sentido manter, trocar ou renegociar.'],
  ['Atende MEI, família e empresa?', 'Sim. A consultoria atende planos familiares, MEI, PME e empresas que precisam organizar benefícios para colaboradores.'],
  ['Quanto tempo demora?', 'Com as informações principais em mãos, normalmente a pré-análise sai no mesmo dia ou em até 24 horas úteis.']
];

const reveal = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.76, ease: [0.22, 1, 0.36, 1] } }
};

function useLuxuryCursor() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;
    const dot = document.querySelector('.mv-cursor-dot');
    const ring = document.querySelector('.mv-cursor-ring');
    if (!dot || !ring) return undefined;

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let raf = 0;

    const move = (event) => {
      mx = event.clientX;
      my = event.clientY;
      dot.style.transform = `translate3d(${mx}px,${my}px,0) translate(-50%,-50%)`;
    };

    const loop = () => {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      ring.style.transform = `translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };

    const hot = (event) => {
      const isHot = Boolean(event.target.closest('a, button, .mv-touch'));
      dot.classList.toggle('is-hot', isHot);
      ring.classList.toggle('is-hot', isHot);
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseover', hot);
    loop();

    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', hot);
      cancelAnimationFrame(raf);
    };
  }, []);
}

export default function PaginaLandingMasterpiece() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const marquee = useMemo(() => [...operators, ...operators, ...operators], []);

  useLuxuryCursor();

  return (
    <>
      <SEO
        title="Maisa Valentim | Curadoria Premium em Planos de Saúde"
        description="Consultoria gratuita em planos de saúde com curadoria humana, comparação de operadoras, rede credenciada, carências e suporte pós-contratação."
        keywords="Maisa Valentim, consultoria plano de saúde, plano de saúde RJ, plano de saúde familiar, plano MEI, plano empresarial, Unimed, Bradesco Saúde, SulAmérica, Amil"
      />

      <main className="mv-page" id="topo">
        <PremiumLandingEffects />
        <div className="mv-cursor-dot" />
        <div className="mv-cursor-ring" />
        <div className="mv-aurora mv-aurora-a" />
        <div className="mv-aurora mv-aurora-b" />

        <nav className="mv-nav" aria-label="Navegação principal">
          <a className="mv-brand" href="#topo" onClick={() => setMenuOpen(false)}>Maisa <em>Valentim</em></a>
          <div className="mv-nav-links">
            {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          </div>
          <a className="mv-nav-cta" href={whatsappUrl} target="_blank" rel="noopener noreferrer">consultoria gratuita</a>
          <button className="mv-menu" type="button" aria-label="Abrir menu" onClick={() => setMenuOpen((state) => !state)}>{menuOpen ? '×' : '☰'}</button>
        </nav>

        {menuOpen && (
          <div className="mv-mobile-panel">
            {navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<span>explorar</span></a>)}
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>WhatsApp<span>agora</span></a>
          </div>
        )}

        <section className="mv-hero">
          <motion.div className="mv-hero-copy" initial="hidden" animate="visible" variants={reveal}>
            <div className="mv-overline"><span /> Consultoria em planos de saúde · sem custo</div>
            <h1>Plano de saúde escolhido com <em>critério, beleza e calma.</em></h1>
            <p>
              Uma curadoria personalizada para você parar de comparar no escuro. A Maisa entende sua rotina, lê o mercado por trás das propostas e te guia até a cobertura certa.
            </p>
            <div className="mv-actions">
              <a className="mv-btn mv-btn-gold" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><WhatsIcon /> falar com a Maisa</a>
              <a className="mv-scroll" href="#curadoria">ver a experiência <span>↓</span></a>
            </div>
          </motion.div>

          <motion.div className="mv-hero-art" initial={{ opacity: 0, x: 42, rotateY: -12 }} animate={{ opacity: 1, x: 0, rotateY: 0 }} transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}>
            <div className="mv-orbit" />
            <div className="mv-card-stack mv-touch">
              <div className="mv-card mv-card-back">
                <small>rede analisada</small>
                <strong>Hospitais certos</strong>
                <span>não apenas nomes famosos</span>
              </div>
              <div className="mv-card mv-card-mid">
                <small>carência & regras</small>
                <strong>Sem surpresa</strong>
                <span>antes de assinar</span>
              </div>
              <div className="mv-card mv-card-front">
                <div className="mv-card-top">
                  <div><small>curadoria Maisa</small><strong>Plano ideal</strong></div>
                  <span className="mv-chip">gratuita</span>
                </div>
                <div className="mv-card-price">clareza antes do contrato</div>
                <div className="mv-tags"><span>rede</span><span>carência</span><span>custo</span><span>suporte</span></div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mv-proof-strip" aria-label="Números da consultoria">
          {proofCards.map(([number, label, caption]) => (
            <div className="mv-proof" key={label}>
              <strong>{number}</strong>
              <span>{label}</span>
              <p>{caption}</p>
            </div>
          ))}
        </section>

        <section className="mv-section mv-curadoria" id="curadoria">
          <motion.div className="mv-section-head" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={reveal}>
            <div className="mv-kicker">A diferença</div>
            <h2>Não é cotação. É <em>curadoria.</em></h2>
            <p>O visual é premium, mas o que vende é confiança: cada bloco explica que a Maisa não empurra plano, ela protege a decisão.</p>
          </motion.div>

          <div className="mv-curadoria-grid">
            <motion.article className="mv-editorial-card mv-touch" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={reveal}>
              <span>01</span>
              <h3>O plano precisa caber na sua vida, não só no boleto.</h3>
              <p>A análise considera uso real, hospitais relevantes, dependentes, rotina de exames, perfil da cidade e tolerância a coparticipação.</p>
            </motion.article>
            <motion.article className="mv-editorial-card featured mv-touch" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={reveal}>
              <span>02</span>
              <h3>Menos opções. Mais precisão.</h3>
              <p>Em vez de despejar tabela, a experiência entrega um comparativo enxuto, bonito e honesto para acelerar a decisão.</p>
            </motion.article>
            <motion.article className="mv-editorial-card mv-touch" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={reveal}>
              <span>03</span>
              <h3>Suporte humano depois da escolha.</h3>
              <p>A contratação é só o começo: carteirinha, dúvidas de rede e primeiros usos continuam assistidos pela consultoria.</p>
            </motion.article>
          </div>
        </section>

        <section className="mv-section mv-method" id="metodo">
          <div className="mv-method-left">
            <div className="mv-kicker">O método</div>
            <h2>Simples por fora, <em>cirúrgico por dentro.</em></h2>
            <p>Esta área mistura o refinamento editorial do seu HTML com a pegada premium do projeto antigo: passos limpos, hierarquia forte e microinterações sem poluição.</p>
            <a className="mv-inline" href={whatsappUrl} target="_blank" rel="noopener noreferrer">iniciar diagnóstico →</a>
          </div>
          <div className="mv-method-steps">
            {methodSteps.map(([number, title, text]) => (
              <motion.div className="mv-step" key={number} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal}>
                <span>{number}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mv-operators" id="operadoras">
          <div className="mv-section-head left">
            <div className="mv-kicker">Operadoras</div>
            <h2>O mercado inteiro vira <em>um mapa claro.</em></h2>
            <p>Grandes nomes, linhas regionais, premium, PME e MEI — a consultoria compara o que importa antes de indicar.</p>
          </div>

          <div className="mv-marquee" aria-hidden="true">
            <div className="mv-track">
              {marquee.map((name, index) => <span key={`${name}-${index}`}>{name}<em>·</em></span>)}
            </div>
          </div>

          <div className="mv-op-grid">
            {operators.slice(0, 8).map((name, index) => (
              <div className="mv-op mv-touch" key={name}>
                <strong>{name}</strong>
                <span>{index < 4 ? 'rede estratégica' : 'perfil selecionado'}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mv-section" id="depoimentos">
          <div className="mv-section-head">
            <div className="mv-kicker">Prova social</div>
            <h2>Confiança se constrói <em>na clareza.</em></h2>
          </div>
          <div className="mv-testimonials">
            {testimonials.map(([initials, name, city, quote]) => (
              <article className="mv-testi mv-touch" key={name}>
                <div className="mv-stars">★★★★★</div>
                <p>“{quote}”</p>
                <div><span>{initials}</span><strong>{name}</strong><small>{city}</small></div>
              </article>
            ))}
          </div>
        </section>

        <section className="mv-faq" id="faq">
          <div className="mv-faq-inner">
            <div className="mv-section-head">
              <div className="mv-kicker">Dúvidas</div>
              <h2>Perguntas <em>frequentes.</em></h2>
            </div>
            <div className="mv-faq-list">
              {faqs.map(([question, answer], index) => (
                <div className={`mv-faq-row ${openFaq === index ? 'open' : ''}`} key={question}>
                  <button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                    <span>{question}</span><i>+</i>
                  </button>
                  <div className="mv-faq-answer"><p>{answer}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mv-final">
          <div>
            <span>Comece agora — sem compromisso</span>
            <h2>Sua saúde merece uma decisão <em>bem guiada.</em></h2>
            <p>Uma conversa rápida já mostra se existe um plano mais inteligente para sua fase de vida, família ou empresa.</p>
            <a className="mv-btn mv-btn-gold" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><WhatsIcon /> falar no WhatsApp agora</a>
            <small>Sem custo · Sem pressão · Atendimento humano</small>
          </div>
        </section>

        <a className="mv-float" href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp"><WhatsIcon /></a>
        <div className="mv-mobile-dock"><a href="#metodo">Método</a><a href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a></div>
      </main>
    </>
  );
}

function WhatsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.52 5.845L.057 23.885l6.165-1.616A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.795 9.795 0 01-5.003-1.373l-.359-.213-3.72.976.994-3.632-.234-.373A9.774 9.774 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
    </svg>
  );
}
