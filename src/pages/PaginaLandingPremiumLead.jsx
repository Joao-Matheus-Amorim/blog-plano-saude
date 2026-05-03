import { useState } from 'react';
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

function LeadForm({ compact = false }) {
  const [lead, setLead] = useState(initialLead);
  const [sent, setSent] = useState(false);
  const update = (field, value) => setLead((current) => ({ ...current, [field]: value }));

  const submit = (event) => {
    event.preventDefault();
    setSent(true);
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(buildMessage(lead))}`, '_blank', 'noopener,noreferrer');
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

      <button className="pl-submit" type="submit">Receber cotação grátis</button>
      {sent && <small className="pl-success">WhatsApp aberto com os dados do lead.</small>}
    </form>
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
          <div className="pl-marquee"><span>Unimed · Bradesco Saúde · SulAmérica · Amil · Porto Saúde · Hapvida · NotreDame · Care Plus · Sompo ·</span></div>
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
