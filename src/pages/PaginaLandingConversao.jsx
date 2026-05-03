import { useState } from 'react';
import SEO from '../components/SEO.jsx';
import './PaginaLandingConversao.css';

const phoneNumber = '5521977472141';
const directWhatsapp = `https://wa.me/${phoneNumber}?text=${encodeURIComponent('Olá Maisa, quero uma cotação gratuita de plano de saúde.')}`;

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
    'Olá Maisa! Quero uma cotação gratuita de plano de saúde.',
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
    <form className={`lc-form ${compact ? 'compact' : ''}`} onSubmit={submit}>
      <div className="lc-form-tag">Cotação gratuita</div>
      <h2>{compact ? 'Receba sua cotação' : 'Peça sua pré-análise gratuita'}</h2>
      <p>Obrigatório só nome e WhatsApp. O restante é opcional.</p>

      <div className="lc-fields">
        <label>
          Nome completo <strong>obrigatório</strong>
          <input value={lead.nome} onChange={(e) => update('nome', e.target.value)} required placeholder="Seu nome" />
        </label>
        <label>
          WhatsApp <strong>obrigatório</strong>
          <input value={lead.telefone} onChange={(e) => update('telefone', e.target.value)} required inputMode="tel" placeholder="(21) 99999-9999" />
        </label>

        {!compact && (
          <>
            <label>
              Cidade / UF <span>opcional</span>
              <input value={lead.cidade} onChange={(e) => update('cidade', e.target.value)} placeholder="Rio de Janeiro, RJ" />
            </label>
            <label>
              Tipo de plano <span>opcional</span>
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
              Quantas vidas? <span>opcional</span>
              <select value={lead.vidas} onChange={(e) => update('vidas', e.target.value)}>
                <option value="">Selecionar depois</option>
                <option>1 vida</option>
                <option>2 vidas</option>
                <option>3 a 5 vidas</option>
                <option>6 a 29 vidas</option>
                <option>30+ vidas</option>
              </select>
            </label>
            <label className="full">
              Hospital, bairro ou detalhe importante <span>opcional</span>
              <textarea value={lead.observacao} onChange={(e) => update('observacao', e.target.value)} placeholder="Ex: quero rede com Copa D'Or, Barra, parto, reembolso..." rows="3" />
            </label>
          </>
        )}
      </div>

      <button type="submit" className="lc-primary">Receber cotação grátis</button>
      {sent && <small className="lc-success">WhatsApp aberto com seus dados formatados.</small>}
    </form>
  );
}

export default function PaginaLandingConversao() {
  return (
    <>
      <SEO
        title="Maisa Valentim | Cotação Gratuita de Plano de Saúde"
        description="Preencha nome e WhatsApp para receber uma cotação gratuita de plano de saúde com Maisa Valentim."
        keywords="cotação plano de saúde, consultoria plano de saúde, Maisa Valentim, plano de saúde familiar, plano MEI, plano empresarial"
      />

      <main className="lc-page" id="topo">
        <header className="lc-nav">
          <a href="#topo" className="lc-logo">Maisa <em>Valentim</em></a>
          <a href="#cotacao" className="lc-nav-cta">Cotação grátis</a>
        </header>

        <section className="lc-hero">
          <div className="lc-copy">
            <div className="lc-kicker">Planos de saúde · consultoria gratuita</div>
            <h1>Cote seu plano de saúde com uma especialista.</h1>
            <p>Preencha nome e WhatsApp. A Maisa te chama com uma pré-análise clara, humana e sem compromisso.</p>

            <div className="lc-actions">
              <a href="#cotacao" className="lc-primary as-link">Quero minha cotação</a>
              <a href={directWhatsapp} target="_blank" rel="noopener noreferrer" className="lc-whatsapp">WhatsApp direto</a>
            </div>

            <div className="lc-trust">
              <span>Sem custo</span>
              <span>Sem pressão</span>
              <span>Resposta rápida</span>
            </div>
          </div>

          <div id="cotacao" className="lc-form-wrap">
            <LeadForm compact />
          </div>
        </section>

        <section className="lc-proof">
          <div><strong>+20</strong><span>operadoras analisadas</span></div>
          <div><strong>0</strong><span>custo de consultoria</span></div>
          <div><strong>24h</strong><span>pré-análise rápida</span></div>
        </section>

        <section className="lc-section lc-full-form">
          <div className="lc-section-copy">
            <span>Mais detalhes, melhor cotação</span>
            <h2>Quer enviar informações extras?</h2>
            <p>Nome e WhatsApp bastam. Mas cidade, tipo de plano e quantidade de vidas ajudam a Maisa a chegar mais rápido na opção certa.</p>
          </div>
          <LeadForm />
        </section>

        <section className="lc-section lc-method">
          <span>Como funciona</span>
          <h2>Simples para você. Criterioso por dentro.</h2>
          <div className="lc-steps">
            <article><b>01</b><h3>Você envia o contato</h3><p>Nome e WhatsApp já são suficientes para iniciar o atendimento.</p></article>
            <article><b>02</b><h3>A Maisa entende seu perfil</h3><p>Cidade, hospitais, dependentes e orçamento entram na análise.</p></article>
            <article><b>03</b><h3>Você recebe opções claras</h3><p>Sem confusão de tabela, sem pressão e sem letra miúda.</p></article>
          </div>
        </section>

        <section className="lc-final">
          <h2>Pronto para cotar?</h2>
          <p>Fale agora com a Maisa e receba uma orientação gratuita.</p>
          <a href="#cotacao" className="lc-primary as-link">Preencher formulário</a>
        </section>

        <div className="lc-mobile-dock">
          <a href="#cotacao">Cotação grátis</a>
          <a href={directWhatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
      </main>
    </>
  );
}
