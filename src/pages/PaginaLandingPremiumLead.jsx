import { useEffect, useRef, useState } from 'react';
import SEO from '../components/SEO.jsx';
import './PaginaLandingPremiumLead.css';

const phoneNumber = '5521977472141';
const directWhatsapp = `https://wa.me/${phoneNumber}?text=${encodeURIComponent('Olá Maisa, quero uma consultoria gratuita de plano de saúde.')}`;

const initialLead = {
  nome: '',
  telefone: '',
  cidade: '',
  tipo: '',
  vidas: '',
  observacao: ''
};

function buildMessage(lead) {
  return [
    'Olá Maisa! Quero uma consultoria gratuita de plano de saúde.',
    '',
    `Nome: ${lead.nome}`,
    `WhatsApp: ${lead.telefone}`,
    lead.cidade ? `Cidade/UF: ${lead.cidade}` : '',
    lead.tipo ? `Tipo de plano: ${lead.tipo}` : '',
    lead.vidas ? `Quantidade de vidas: ${lead.vidas}` : '',
    lead.observacao ? `Observação: ${lead.observacao}` : '',
    '',
    'Pode me chamar para fazer minha pré-análise?'
  ].filter(Boolean).join('\n');
}

function getNumericLives(value) {
  const text = String(value || '');
  if (!text) return null;
  if (text.includes('30')) return 30;
  if (text.includes('6')) return 6;
  if (text.includes('3')) return 3;
  if (text.includes('2')) return 2;
  if (text.includes('1')) return 1;
  return null;
}

function buildAdminMessage(lead) {
  return [
    lead.cidade ? `Cidade/UF: ${lead.cidade}` : '',
    lead.tipo ? `Tipo de plano: ${lead.tipo}` : '',
    lead.vidas ? `Quantidade de vidas: ${lead.vidas}` : '',
    lead.observacao ? `Detalhe: ${lead.observacao}` : '',
    'Origem: Landing premium de planos de saúde'
  ].filter(Boolean).join('\n');
}

async function saveLeadOnAdmin(lead) {
  const eventId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `lead-${Date.now()}`;

  const response = await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nome: lead.nome,
      telefone: lead.telefone,
      whatsapp: lead.telefone,
      email: null,
      operadora: lead.tipo || 'Não informado',
      vidas: getNumericLives(lead.vidas),
      mensagem: buildAdminMessage(lead),
      origem: 'Landing Premium Maisa',
      event_id: eventId
    })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Erro ao salvar lead');
  return data;
}

function LeadForm({ compact = false }) {
  const [lead, setLead] = useState(initialLead);
  const [sent, setSent] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const update = (field, value) => setLead((current) => ({ ...current, [field]: value }));

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setSent(false);
    setSaving(true);

    try {
      await saveLeadOnAdmin(lead);
      setSent(true);
      window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(buildMessage(lead))}`, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error('Erro ao enviar lead:', err);
      setError('Não consegui registrar no painel agora. O WhatsApp será aberto para não perder o contato.');
      window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(buildMessage(lead))}`, '_blank', 'noopener,noreferrer');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className={`pl-form ${compact ? 'compact' : ''}`} onSubmit={submit}>
      <div className="pl-form-badge">pré-análise gratuita</div>
      <h2>{compact ? 'Receba sua cotação' : 'Receba uma cotação personalizada'}</h2>
      <p>Obrigatório somente nome e WhatsApp. O restante é opcional.</p>

      <div className="pl-fields">
        <label>
          <span>Nome completo <b>obrigatório</b></span>
          <input required value={lead.nome} onChange={(e) => update('nome', e.target.value)} placeholder="Seu nome" />
        </label>
        <label>
          <span>WhatsApp <b>obrigatório</b></span>
          <input required inputMode="tel" value={lead.telefone} onChange={(e) => update('telefone', e.target.value)} placeholder="(21) 99999-9999" />
        </label>

        {!compact && (
          <>
            <label>
              <span>Cidade / UF <em>opcional</em></span>
              <input value={lead.cidade} onChange={(e) => update('cidade', e.target.value)} placeholder="Rio de Janeiro, RJ" />
            </label>
            <label>
              <span>Tipo de plano <em>opcional</em></span>
              <select value={lead.tipo} onChange={(e) => update('tipo', e.target.value)}>
                <option value="">Selecionar depois</option>
                <option>Individual</option>
                <option>Família</option>
                <option>MEI</option>
                <option>Empresa / PME</option>
                <option>Quero trocar meu plano atual</option>
              </select>
            </label>
            <label>
              <span>Quantas vidas? <em>opcional</em></span>
              <select value={lead.vidas} onChange={(e) => update('vidas', e.target.value)}>
                <option value="">Selecionar depois</option>
                <option>1 vida</option>
                <option>2 vidas</option>
                <option>3 a 5 vidas</option>
                <option>6 a 29 vidas</option>
                <option>30+ vidas</option>
              </select>
            </label>
            <label className="wide">
              <span>Hospital, bairro ou detalhe importante <em>opcional</em></span>
              <textarea rows="3" value={lead.observacao} onChange={(e) => update('observacao', e.target.value)} placeholder="Ex: Copa D'Or, Barra, parto, reembolso..." />
            </label>
          </>
        )}
      </div>

      <button className="pl-submit" type="submit" disabled={saving}>{saving ? 'Registrando...' : 'Receber cotação grátis'}</button>
      {sent && <small className="pl-success">Lead salvo no painel e WhatsApp aberto.</small>}
      {error && <small className="pl-error">{error}</small>}
    </form>
  );
}

function PremiumCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;

    const context = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let raf = 0;
    let time = 0;
    let pointerX = 0;
    let pointerY = 0;

    const particles = Array.from({ length: 58 }, (_, index) => ({
      x: Math.random(),
      y: Math.random(),
      z: 0.35 + Math.random() * 0.9,
      r: 0.7 + Math.random() * 1.8,
      speed: 0.15 + Math.random() * 0.55,
      phase: Math.random() * Math.PI * 2,
      warm: index % 3 === 0
    }));

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const handleMove = (event) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const drawBlob = (x, y, radius, colorA, colorB, alpha) => {
      const gradient = context.createRadialGradient(x, y, radius * 0.08, x, y, radius);
      gradient.addColorStop(0, colorA);
      gradient.addColorStop(0.48, colorB);
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      context.globalAlpha = alpha;
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
      context.globalAlpha = 1;
    };

    const animate = () => {
      time += 0.006;
      context.clearRect(0, 0, width, height);

      drawBlob(
        width * 0.78 + pointerX * 36,
        height * 0.2 + pointerY * 28,
        Math.min(width, height) * 0.42,
        'rgba(184,154,106,.32)',
        'rgba(61,90,71,.20)',
        0.95
      );
      drawBlob(
        width * 0.18 - pointerX * 24,
        height * 0.74 - pointerY * 24,
        Math.min(width, height) * 0.33,
        'rgba(61,90,71,.36)',
        'rgba(184,154,106,.10)',
        0.78
      );

      context.save();
      context.globalCompositeOperation = 'lighter';
      particles.forEach((particle) => {
        const driftX = Math.sin(time * particle.speed + particle.phase) * 30 * particle.z;
        const driftY = Math.cos(time * particle.speed * 0.8 + particle.phase) * 24 * particle.z;
        const x = particle.x * width + driftX + pointerX * 12 * particle.z;
        const y = particle.y * height + driftY + pointerY * 10 * particle.z;
        context.globalAlpha = particle.warm ? 0.18 : 0.12;
        context.fillStyle = particle.warm ? '#d4b88a' : '#9fb8a5';
        context.beginPath();
        context.arc(x, y, particle.r, 0, Math.PI * 2);
        context.fill();
      });
      context.restore();

      raf = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMove);
    };
  }, []);

  return <canvas className="pl-canvas" ref={canvasRef} aria-hidden="true" />;
}

function ParallaxShell() {
  const shellRef = useRef(null);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (reduceMotion || !finePointer) return undefined;

    const handleMove = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      shell.style.setProperty('--mx', x.toFixed(3));
      shell.style.setProperty('--my', y.toFixed(3));
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="pl-parallax" ref={shellRef} aria-hidden="true">
      <div className="pl-orb pl-orb-a" />
      <div className="pl-orb pl-orb-b" />
      <div className="pl-orb pl-orb-c" />
      <div className="pl-3d-card pl-3d-back"><span>rede</span><strong>Hospitais certos</strong></div>
      <div className="pl-3d-card pl-3d-mid"><span>carência</span><strong>Sem surpresa</strong></div>
      <div className="pl-3d-card pl-3d-front"><span>curadoria</span><strong>Plano ideal</strong><small>nome + WhatsApp</small></div>
    </div>
  );
}

export default function PaginaLandingPremiumLead() {
  return (
    <>
      <SEO
        title="Maisa Valentim | Consultoria Gratuita em Planos de Saúde"
        description="Consultoria gratuita e personalizada em planos de saúde. Envie nome e WhatsApp para receber uma pré-análise com Maisa Valentim."
        keywords="consultoria plano de saúde, cotação plano de saúde, Maisa Valentim, plano de saúde familiar, plano MEI, plano empresarial"
      />

      <main className="pl-page" id="topo">
        <PremiumCanvas />
        <ParallaxShell />

        <header className="pl-nav">
          <a href="#topo" className="pl-brand">Maisa <em>Valentim</em></a>
          <a href="#cotacao" className="pl-nav-cta">Cotação gratuita</a>
        </header>

        <section className="pl-hero">
          <div className="pl-copy">
            <div className="pl-eyebrow"><span /> Consultoria em Planos de Saúde · 100% Gratuita</div>
            <h1>A cobertura que você merece, <em>sem complicar.</em></h1>
            <p>Analiso sua situação, comparo operadoras e te apresento a melhor opção — com honestidade, sem custo e sem pressão.</p>
            <div className="pl-actions">
              <a className="pl-main-cta" href="#cotacao">Quero minha cotação</a>
              <a className="pl-ghost-cta" href={directWhatsapp} target="_blank" rel="noopener noreferrer">WhatsApp direto</a>
            </div>
            <div className="pl-trust"><span>Sem custo</span><span>Sem compromisso</span><span>Atendimento humano</span></div>
          </div>

          <div className="pl-hero-form" id="cotacao">
            <LeadForm compact />
          </div>

          <div className="pl-symbol" aria-hidden="true">✦</div>
        </section>

        <section className="pl-proof">
          <div><strong>+20</strong><span>operadoras comparadas</span></div>
          <div><strong>0</strong><span>custo da consultoria</span></div>
          <div><strong>24h</strong><span>pré-análise rápida</span></div>
        </section>

        <section className="pl-section pl-method">
          <div>
            <div className="pl-label">O processo</div>
            <h2>Simples para você, <em>criterioso por dentro.</em></h2>
            <p>Você envia o contato, a Maisa entende seu perfil e filtra o mercado para evitar escolhas ruins, carências confusas e rede incompatível.</p>
          </div>
          <div className="pl-steps">
            <article><b>01</b><h3>Contato rápido</h3><p>Nome e WhatsApp já iniciam o atendimento.</p></article>
            <article><b>02</b><h3>Análise real</h3><p>Cidade, hospitais, dependentes e orçamento entram no filtro.</p></article>
            <article><b>03</b><h3>Escolha clara</h3><p>Você recebe opções com vantagens e limitações explicadas.</p></article>
          </div>
        </section>

        <section className="pl-full-lead">
          <div className="pl-full-copy">
            <div className="pl-label">Lead qualificado</div>
            <h2>Quer enviar mais detalhes?</h2>
            <p>Nome e WhatsApp bastam. Os campos opcionais ajudam a Maisa a preparar uma cotação mais certeira.</p>
          </div>
          <LeadForm />
        </section>

        <section className="pl-operators">
          <div className="pl-label">Parceiros</div>
          <h2>+20 operadoras <em>comparadas por você.</em></h2>
          <div className="pl-marquee"><span>Unimed · Bradesco Saúde · SulAmérica · Amil · Porto Saúde · Hapvida · NotreDame · Care Plus · Sompo · Unimed · Bradesco Saúde · SulAmérica · Amil · Porto Saúde · Hapvida · NotreDame · Care Plus · Sompo ·</span></div>
        </section>

        <section className="pl-final">
          <div className="pl-label">Comece agora</div>
          <h2>Saúde é decisão <em>que não pode esperar.</em></h2>
          <p>Uma conversa rápida já mostra o melhor caminho para contratar, trocar ou revisar seu plano.</p>
          <a className="pl-main-cta" href="#cotacao">Preencher cotação</a>
        </section>

        <div className="pl-dock">
          <a href="#cotacao">Cotação</a>
          <a href={directWhatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
      </main>
    </>
  );
}
