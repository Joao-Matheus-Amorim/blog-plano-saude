import { useState } from 'react';
import './LeadCaptureForm.css';

const phoneNumber = '5521977472141';
const directWhatsapp = `https://wa.me/${phoneNumber}?text=${encodeURIComponent('Olá Maisa, quero uma cotação de plano de saúde.')}`;

const emptyLead = {
  nome: '',
  telefone: '',
  cidade: '',
  tipo: '',
  vidas: '',
  observacao: '',
  consentimento: false,
};

function generateEventId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `lead-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getNumericLives(value) {
  const text = String(value || '').toLowerCase();

  if (!text) return null;
  if (text.includes('30')) return 30;
  if (text.includes('6')) return 6;
  if (text.includes('3')) return 3;
  if (text.includes('2')) return 2;
  if (text.includes('1')) return 1;

  const digits = text.match(/\d+/)?.[0];
  return digits ? Number(digits) : null;
}

function getSearchParam(name) {
  if (typeof window === 'undefined') return '';
  return new URLSearchParams(window.location.search).get(name) || '';
}

function getPageUrl() {
  if (typeof window === 'undefined') return '';
  return window.location.href;
}

function getReferrer() {
  if (typeof document === 'undefined') return '';
  return document.referrer || '';
}

function buildWhatsappMessage(lead, context) {
  return [
    context.whatsappIntro || 'Olá Maisa! Quero uma cotação de plano de saúde.',
    '',
    `Nome: ${lead.nome}`,
    `WhatsApp: ${lead.telefone}`,
    lead.cidade ? `Cidade/UF: ${lead.cidade}` : '',
    lead.tipo ? `Tipo de plano: ${lead.tipo}` : '',
    lead.vidas ? `Quantidade de vidas: ${lead.vidas}` : '',
    lead.observacao ? `Detalhe importante: ${lead.observacao}` : '',
    '',
    'Pode me chamar para fazer minha pré-análise?',
  ].filter(Boolean).join('\n');
}

function buildAdminMessage(lead, context) {
  return [
    context.intent ? `Intenção: ${context.intent}` : '',
    context.pageTitle ? `Página: ${context.pageTitle}` : '',
    lead.cidade ? `Cidade/UF: ${lead.cidade}` : '',
    lead.tipo ? `Tipo de plano: ${lead.tipo}` : '',
    lead.vidas ? `Quantidade de vidas: ${lead.vidas}` : '',
    lead.observacao ? `Observação: ${lead.observacao}` : '',
    `Página de origem: ${getPageUrl()}`,
    getReferrer() ? `Referência: ${getReferrer()}` : '',
    getSearchParam('utm_source') ? `UTM source: ${getSearchParam('utm_source')}` : '',
    getSearchParam('utm_medium') ? `UTM medium: ${getSearchParam('utm_medium')}` : '',
    getSearchParam('utm_campaign') ? `UTM campaign: ${getSearchParam('utm_campaign')}` : '',
    getSearchParam('utm_term') ? `UTM term: ${getSearchParam('utm_term')}` : '',
    'Consentimento: aceitou contato por WhatsApp para cotação.',
  ].filter(Boolean).join('\n');
}

function dispatchLeadEvents(eventId, lead, context) {
  if (typeof window === 'undefined') return;

  window.fbq?.('track', 'Lead', {
    content_name: context.pageTitle || lead.tipo || 'Cotação de plano de saúde',
  }, { eventID: eventId });

  window.dataLayer?.push({
    event: 'lead_salvo',
    event_id: eventId,
    origem: context.origin || 'site',
    tipo_plano: lead.tipo || context.defaultType || '',
    vidas: getNumericLives(lead.vidas),
  });
}

export default function LeadCaptureForm({
  compact = false,
  title = 'Receba sua cotação',
  subtitle = 'Nome e WhatsApp bastam para começar. Quanto mais contexto, melhor a pré-análise.',
  cta = 'Receber cotação grátis',
  origin = 'site',
  intent = '',
  pageTitle = '',
  defaultType = '',
  defaultCity = '',
  whatsappIntro = '',
  showAdvanced = true,
}) {
  const [lead, setLead] = useState({ ...emptyLead, tipo: defaultType, cidade: defaultCity });
  const [saving, setSaving] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const update = (field, value) => {
    setLead((current) => ({ ...current, [field]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setSent(false);

    if (!lead.consentimento) {
      setError('Para continuar, confirme que você autoriza o contato por WhatsApp para a cotação.');
      return;
    }

    const eventId = generateEventId();
    const context = { origin, intent, pageTitle, defaultType, whatsappIntro };
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(buildWhatsappMessage(lead, context))}`;

    try {
      setSaving(true);

      const response = await fetch('/api/leads/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: lead.nome,
          telefone: lead.telefone,
          whatsapp: lead.telefone,
          email: null,
          operadora: lead.tipo || defaultType || pageTitle || 'Plano de saúde',
          vidas: getNumericLives(lead.vidas),
          mensagem: buildAdminMessage(lead, context),
          origem: origin,
          event_id: eventId,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || 'Não foi possível salvar o lead.');
      }

      dispatchLeadEvents(eventId, lead, context);
      setSent(true);
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setLead({ ...emptyLead, tipo: defaultType, cidade: defaultCity });
    } catch (err) {
      console.error('Erro ao registrar lead:', err);
      setError(`Não consegui registrar no painel agora: ${err.message}. Vou abrir o WhatsApp para não perder o contato.`);
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className={`lead-capture ${compact ? 'compact' : ''}`} onSubmit={submit}>
      <div className="lead-capture__badge">pré-análise gratuita</div>
      <h2>{title}</h2>
      <p className="lead-capture__subtitle">{subtitle}</p>

      <div className="lead-capture__grid">
        <label>
          Nome completo
          <input required value={lead.nome} onChange={(event) => update('nome', event.target.value)} placeholder="Seu nome" />
        </label>

        <label>
          WhatsApp
          <input required inputMode="tel" value={lead.telefone} onChange={(event) => update('telefone', event.target.value)} placeholder="(21) 99999-9999" />
        </label>

        {showAdvanced && (
          <>
            <label>
              Cidade / UF <small>opcional</small>
              <input value={lead.cidade} onChange={(event) => update('cidade', event.target.value)} placeholder="Rio de Janeiro, RJ" />
            </label>

            <label>
              Tipo de plano <small>opcional</small>
              <select value={lead.tipo} onChange={(event) => update('tipo', event.target.value)}>
                <option value="">Selecionar depois</option>
                <option>Individual</option>
                <option>Família</option>
                <option>MEI</option>
                <option>Empresa / PME</option>
                <option>Quero trocar meu plano atual</option>
              </select>
            </label>

            <label>
              Quantas vidas? <small>opcional</small>
              <select value={lead.vidas} onChange={(event) => update('vidas', event.target.value)}>
                <option value="">Selecionar depois</option>
                <option>1 vida</option>
                <option>2 vidas</option>
                <option>3 a 5 vidas</option>
                <option>6 a 29 vidas</option>
                <option>30+ vidas</option>
              </select>
            </label>

            <label className="full">
              Hospital, bairro, idade ou detalhe importante <small>opcional</small>
              <textarea rows="3" value={lead.observacao} onChange={(event) => update('observacao', event.target.value)} placeholder="Ex: quero rede na Barra, plano para minha mãe, tenho MEI, quero trocar meu plano atual..." />
            </label>
          </>
        )}
      </div>

      <label className="lead-capture__consent">
        <input type="checkbox" checked={lead.consentimento} onChange={(event) => update('consentimento', event.target.checked)} />
        <span>Autorizo o contato por WhatsApp para receber cotação e orientação sobre planos de saúde. Não é contratação e não tem custo.</span>
      </label>

      <div className="lead-capture__actions">
        <button className="lead-capture__submit" type="submit" disabled={saving}>{saving ? 'Registrando...' : cta}</button>
        <a className="lead-capture__direct" href={directWhatsapp} target="_blank" rel="noopener noreferrer">Prefiro chamar direto no WhatsApp</a>
      </div>

      {sent && <small className="lead-capture__success">Lead salvo no painel e WhatsApp aberto.</small>}
      {error && <small className="lead-capture__error">{error}</small>}
    </form>
  );
}
