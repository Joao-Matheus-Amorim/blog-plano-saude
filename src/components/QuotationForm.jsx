import { useState } from "react";

const WA = "5521977472141";

const C = {
  primary:   "#8B7E74",
  secondary: "#A8877A",
  light:     "#C5BCB5",
  bg:        "#FAF8F5",
  text:      "#6B6662",
  muted:     "#9B9289",
  border:    "#E5E7EB",
  green:     "#25D366",
  red:       "#E53E3E",
};

const font = "'Playfair Display', serif";

function input(hasError, filled) {
  return {
    width: "100%",
    padding: "14px 16px",
    border: `2px solid ${hasError ? C.red : filled ? C.primary : C.border}`,
    borderRadius: 12,
    fontSize: 16,
    background: "#fff",
    color: "#2D3748",
    outline: "none",
    fontFamily: "inherit",
    transition: "border 0.2s",
    boxSizing: "border-box",
  };
}

const select = {
  width: "100%",
  padding: "14px 16px",
  border: `2px solid ${C.border}`,
  borderRadius: 12,
  fontSize: 16,
  background: "#fff",
  color: "#2D3748",
  outline: "none",
  fontFamily: "inherit",
  cursor: "pointer",
  boxSizing: "border-box",
};

const label = {
  display: "block",
  fontSize: 14,
  fontWeight: 600,
  color: C.text,
  marginBottom: 8,
};

const err = { fontSize: 12, color: C.red, marginTop: 4 };

function BtnGrad({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "100%",
        padding: "18px",
        background: disabled
          ? C.border
          : `linear-gradient(135deg, ${C.secondary} 0%, ${C.primary} 100%)`,
        color: "#fff",
        border: "none",
        borderRadius: 12,
        fontSize: 18,
        fontWeight: 700,
        cursor: disabled ? "not-allowed" : "pointer",
        boxShadow: disabled ? "none" : "0 8px 24px rgba(139,126,116,0.3)",
        fontFamily: "inherit",
        transition: "opacity 0.2s",
      }}
    >
      {children}
    </button>
  );
}

function Progress({ step }) {
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
      {[1, 2].map(s => (
        <div
          key={s}
          style={{
            height: 4,
            flex: 1,
            borderRadius: 2,
            background: step >= s ? C.primary : C.border,
            transition: "background 0.3s",
          }}
        />
      ))}
    </div>
  );
}

function formatPhone(v) {
  const n = v.replace(/\D/g, "").slice(0, 11);
  if (n.length <= 2) return `(${n}`;
  if (n.length <= 7) return `(${n.slice(0,2)}) ${n.slice(2)}`;
  if (n.length <= 11) return `(${n.slice(0,2)}) ${n.slice(2,7)}-${n.slice(7)}`;
  return v;
}

function buildWAMessage(f) {
  return encodeURIComponent(
    `Olá Maisa! Me chamo *${f.name}* e gostaria de uma cotação.\n\n` +
    `📋 *Meus dados:*\n` +
    `• Tipo: ${f.planType}\n` +
    `• Nº de vidas: ${f.lives}\n` +
    `• Operadora de interesse: ${f.operator}\n` +
    `• Meu WhatsApp: ${f.whatsapp}`
  );
}

async function saveLeadToNeon(payload) {
  try {
    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (_) {
    // silently fail — não bloquear o fluxo do usuário
  }
}

function Step1({ form, setForm, onNext }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      e.name = "Por favor, informe seu nome completo";
    const nums = form.whatsapp.replace(/\D/g, "");
    if (nums.length < 10)
      e.whatsapp = "WhatsApp inválido — inclua DDD";
    return e;
  };

  const handleNext = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    if (window.fbq) window.fbq('track', 'InitiateCheckout');
    if (window.dataLayer) window.dataLayer.push({ event: 'lead_step1' });
    onNext();
  };

  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <label style={label}>Seu Nome Completo *</label>
        <input
          style={input(errors.name, form.name)}
          placeholder="Ex: João Silva"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          onFocus={e => (e.target.style.border = `2px solid ${C.primary}`)}
          onBlur={e => (e.target.style.border = `2px solid ${errors.name ? C.red : form.name ? C.primary : C.border}`)}
        />
        {errors.name && <p style={err}>{errors.name}</p>}
      </div>

      <div style={{ marginBottom: 28 }}>
        <label style={label}>WhatsApp com DDD *</label>
        <input
          style={input(errors.whatsapp, form.whatsapp)}
          placeholder="(21) 99999-9999"
          inputMode="numeric"
          value={form.whatsapp}
          onChange={e => setForm(f => ({ ...f, whatsapp: formatPhone(e.target.value) }))}
        />
        {errors.whatsapp && <p style={err}>{errors.whatsapp}</p>}
        <p style={{ fontSize: 12, color: C.muted, marginTop: 6 }}>
          🔒 Dados confidenciais — nunca compartilhados com terceiros.
        </p>
      </div>

      <BtnGrad onClick={handleNext}>Próximo passo →</BtnGrad>
    </>
  );
}

function Step2({ form, setForm, onBack, onSubmit, loading }) {
  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <label style={label}>Tipo de Plano</label>
        <select
          style={select}
          value={form.planType}
          onChange={e => setForm(f => ({ ...f, planType: e.target.value }))}
        >
          <option value="PJ">Pessoa Jurídica (PJ) — empresas</option>
          <option value="Familiar">Plano Familiar</option>
          <option value="Individual/MEI">Individual / MEI</option>
          <option value="Adesão">Plano por Adesão</option>
        </select>
      </div>

      <div style={{ marginBottom: 20 }}>
        <label style={label}>Número de Vidas (pessoas)</label>
        <input
          type="number"
          min="1"
          max="500"
          style={input(false, form.lives !== "1")}
          value={form.lives}
          onChange={e => setForm(f => ({ ...f, lives: e.target.value }))}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label style={label}>Operadora de Interesse</label>
        <select
          style={select}
          value={form.operator}
          onChange={e => setForm(f => ({ ...f, operator: e.target.value }))}
        >
          <option>Sem preferência — quero a melhor opção</option>
          <option>Bradesco Saúde</option>
          <option>Porto Seguro</option>
          <option>SulAmérica</option>
          <option>Amil</option>
          <option>Unimed</option>
          <option>Assim Saúde</option>
          <option>Prevent Senior</option>
          <option>Notre Dame Intermédica</option>
        </select>
      </div>

      <div style={{
        display: "flex", gap: 12, marginBottom: 20, padding: "12px 16px",
        background: "#F0FFF4", borderRadius: 10,
        border: "1px solid rgba(37,211,102,0.25)", alignItems: "center",
      }}>
        <span style={{ fontSize: 22 }}>⭐</span>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#276749", margin: 0 }}>
            +100 famílias atendidas com sucesso
          </p>
          <p style={{ fontSize: 12, color: "#48BB78", margin: "2px 0 0" }}>
            Resposta em minutos pelo WhatsApp
          </p>
        </div>
      </div>

      <BtnGrad onClick={onSubmit} disabled={loading}>
        {loading ? "Enviando..." : "Receber Cotação pelo WhatsApp →"}
      </BtnGrad>

      <button
        onClick={onBack}
        style={{
          width: "100%", padding: "12px", background: "transparent",
          border: "none", color: C.muted, cursor: "pointer", marginTop: 10,
          fontSize: 14, fontFamily: "inherit",
        }}
      >
        ← Voltar
      </button>
    </>
  );
}

function Step3({ form }) {
  const firstName = form.name.split(" ")[0];
  const waUrl = `https://wa.me/${WA}?text=${buildWAMessage(form)}`;
  return (
    <div style={{ textAlign: "center", padding: "20px 0" }}>
      <div style={{ fontSize: 60, marginBottom: 16 }}>✅</div>
      <h3 style={{ fontSize: 24, fontWeight: 600, color: C.primary, fontFamily: font, marginBottom: 12 }}>
        Perfeito, {firstName}!
      </h3>
      <p style={{ color: C.text, lineHeight: 1.8, marginBottom: 24, fontSize: 15 }}>
        Suas informações foram enviadas. O WhatsApp deve ter aberto automaticamente.
        Se não abriu, clique no botão abaixo:
      </p>
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          padding: "16px 32px", background: C.green, color: "#fff",
          borderRadius: 12, fontWeight: 700, fontSize: 16,
          textDecoration: "none", boxShadow: "0 8px 24px rgba(37,211,102,0.35)",
          fontFamily: "inherit",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Abrir WhatsApp da Maisa
      </a>
    </div>
  );
}

export default function QuotationForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    whatsapp: "",
    planType: "PJ",
    lives: "1",
    operator: "Sem preferência — quero a melhor opção",
  });

  const handleSubmit = async () => {
    setLoading(true);

    const utm_source = new URLSearchParams(window.location.search).get('utm_source') || 'direct';

    await saveLeadToNeon({
      nome: form.name,
      telefone: form.whatsapp,
      operadora: form.operator,
      vidas: parseInt(form.lives) || 1,
      mensagem: `Tipo de plano: ${form.planType}`,
      origem: utm_source,
    });

    if (window.fbq) window.fbq('track', 'Lead');
    if (window.fbq) window.fbq('track', 'Contact');
    if (window.dataLayer) window.dataLayer.push({ event: 'lead_completo' });
    if (window.dataLayer) window.dataLayer.push({ event: 'whatsapp_opened' });

    const waUrl = `https://wa.me/${WA}?text=${buildWAMessage(form)}`;
    window.open(waUrl, '_blank');

    setLoading(false);
    setStep(3);
  };

  const wrap = {
    padding: "clamp(28px, 5vw, 48px)",
    background: "rgba(255,255,255,0.92)",
    backdropFilter: "blur(20px)",
    borderRadius: 24,
    boxShadow: "0 20px 60px rgba(139,126,116,0.15)",
    maxWidth: 550,
    margin: "0 auto",
    border: "1px solid rgba(197,188,181,0.2)",
  };

  const title = {
    fontSize: "clamp(20px, 3vw, 26px)",
    fontWeight: 600,
    marginBottom: 6,
    color: C.primary,
    fontFamily: font,
    textAlign: "center",
  };

  const subtitle = {
    textAlign: "center",
    color: C.muted,
    fontSize: 14,
    marginBottom: 24,
  };

  if (step === 3) return <div style={wrap}><Step3 form={form} /></div>;

  return (
    <div style={wrap}>
      <Progress step={step} />
      <h3 style={title}>
        {step === 1 ? "📋 Seus Dados de Contato" : "🏥 Detalhes do Plano"}
      </h3>
      <p style={subtitle}>
        {step === 1
          ? "Passo 1 de 2 — Como podemos te chamar?"
          : "Passo 2 de 2 — Qual plano você precisa?"}
      </p>

      {step === 1 && (
        <Step1 form={form} setForm={setForm} onNext={() => setStep(2)} />
      )}
      {step === 2 && (
        <Step2
          form={form}
          setForm={setForm}
          onBack={() => setStep(1)}
          onSubmit={handleSubmit}
          loading={loading}
        />
      )}
    </div>
  );
}
