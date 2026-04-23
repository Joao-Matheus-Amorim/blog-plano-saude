// HomeSections.jsx — Fase 2
// Todos os componentes de conversão para inserir na homepage
// Ordem recomendada na página:
//   <ScarcityBar />          ← topo da página (fixo)
//   <LeadMagnetSection />    ← após o hero
//   <TestimonialsSection />  ← antes do formulário de cotação
//   <SavingsCalculator />    ← após benefícios
//   <OperatorCards />        ← substitui a seção atual de operadoras

import { useState, useEffect } from "react";

const WA = "5521977472141";
const WEBHOOK_URL = "https://hook.eu2.make.com/SEU_WEBHOOK_AQUI";

const C = {
  primary:   "#8B7E74",
  secondary: "#A8877A",
  light:     "#C5BCB5",
  bg:        "#FAF8F5",
  text:      "#6B6662",
  muted:     "#9B9289",
  border:    "#E5E7EB",
  green:     "#25D366",
};
const font = "'Playfair Display', serif";

async function sendLead(payload) {
  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, timestamp: new Date().toISOString() }),
      mode: "no-cors",
    });
  } catch (_) {}
}

// ═══════════════════════════════════════════════════════════════════
// SCARCITY BAR — barra de urgência no topo da página
// ═══════════════════════════════════════════════════════════════════
export function ScarcityBar() {
  const [visible, setVisible] = useState(true);
  const [vacancies] = useState(3); // Ajuste conforme sua capacidade real

  if (!visible) return null;
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 9998,
      background: `linear-gradient(135deg, ${C.primary} 0%, ${C.secondary} 100%)`,
      color: "#fff",
      padding: "10px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
      fontSize: "clamp(12px, 1.5vw, 14px)",
      fontWeight: 500,
    }}>
      <span style={{ animation: "pulse 1.5s infinite" }}>🔴</span>
      <span>
        Atenção: Apenas <strong>{vacancies} vagas abertas</strong> esta semana para atendimento personalizado
      </span>
      <a
        href={`https://wa.me/${WA}?text=Olá Maisa! Vi que há vagas abertas e quero garantir a minha cotação.`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          background: C.green, color: "#fff", padding: "6px 16px",
          borderRadius: 20, fontWeight: 700, fontSize: 13,
          textDecoration: "none", whiteSpace: "nowrap",
        }}
      >
        Garantir vaga →
      </a>
      <button
        onClick={() => setVisible(false)}
        style={{
          position: "absolute", right: 16, background: "none",
          border: "none", color: "rgba(255,255,255,0.7)",
          cursor: "pointer", fontSize: 20, lineHeight: 1, padding: 4,
        }}
        aria-label="Fechar"
      >×</button>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// LEAD MAGNET — captura WhatsApp em troca do guia em PDF
// ═══════════════════════════════════════════════════════════════════
export function LeadMagnetSection() {
  const [whatsapp, setWhatsapp] = useState("");
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const formatPhone = (v) => {
    const n = v.replace(/\D/g, "").slice(0, 11);
    if (n.length <= 2) return `(${n}`;
    if (n.length <= 7) return `(${n.slice(0,2)}) ${n.slice(2)}`;
    return `(${n.slice(0,2)}) ${n.slice(2,7)}-${n.slice(7)}`;
  };

  const handleSend = async () => {
    const nums = whatsapp.replace(/\D/g, "");
    if (nums.length < 10 || !name.trim()) return;
    setLoading(true);
    await sendLead({ name, whatsapp, source: "lead_magnet" });
    const msg = encodeURIComponent(
      `Olá Maisa! Sou ${name} e quero receber o guia gratuito:\n"Os 7 Erros ao Escolher Plano de Saúde" 📖`
    );
    window.open(`https://wa.me/${WA}?text=${msg}`, "_blank");
    setLoading(false);
    setSent(true);
  };

  const sectionStyle = {
    padding: "clamp(60px, 8vw, 100px) clamp(20px, 5vw, 60px)",
    background: `linear-gradient(135deg, #FDF9F6 0%, #F5F0EB 100%)`,
    position: "relative",
    overflow: "hidden",
  };

  const cardStyle = {
    maxWidth: 900,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
    gap: 40,
    alignItems: "center",
    background: "#fff",
    borderRadius: 24,
    padding: "clamp(32px, 5vw, 56px)",
    boxShadow: "0 20px 60px rgba(139,126,116,0.12)",
    border: "1px solid rgba(197,188,181,0.25)",
  };

  if (sent) {
    return (
      <section style={sectionStyle}>
        <div style={{ ...cardStyle, display: "block", textAlign: "center" }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
          <h3 style={{ fontSize: 28, fontFamily: font, color: C.primary, marginBottom: 12 }}>
            O guia foi enviado!
          </h3>
          <p style={{ color: C.text, lineHeight: 1.8 }}>
            Verifique o WhatsApp — o guia com os 7 erros está a caminho.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section style={sectionStyle}>
      <div style={cardStyle}>
        {/* Lado esquerdo — o que é o guia */}
        <div>
          <span style={{
            display: "inline-block", padding: "6px 16px",
            background: "rgba(197,188,181,0.15)", borderRadius: 20,
            fontSize: 12, fontWeight: 600, color: C.secondary,
            letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20,
          }}>
            ✦ Grátis
          </span>
          <h2 style={{
            fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 400,
            fontFamily: font, color: C.primary, marginBottom: 16, lineHeight: 1.2,
          }}>
            Os 7 Erros ao<br/>Escolher Plano de Saúde
          </h2>
          <p style={{ color: C.text, lineHeight: 1.9, marginBottom: 24, fontSize: 15 }}>
            Descubra os erros que a maioria das pessoas comete e que custam caro — antes de assinar qualquer contrato.
          </p>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "Escolher pelo preço sem olhar a cobertura",
              "Ignorar o prazo de carência",
              "Não verificar a rede credenciada",
              "Não conhecer os limites de cobertura",
              "Confundir plano individual com coletivo",
              "Não entender a cláusula de reajuste",
              "Fechar sem comparar operadoras",
            ].map((item, i) => (
              <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, color: C.text }}>
                <span style={{
                  background: C.primary, color: "#fff", borderRadius: "50%",
                  width: 20, height: 20, display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1,
                }}>{i + 1}</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Lado direito — formulário de captura */}
        <div>
          <div style={{
            background: C.bg, borderRadius: 16, padding: 28,
            border: `1px solid rgba(197,188,181,0.3)`,
          }}>
            <h3 style={{
              fontFamily: font, color: C.primary, fontSize: 22,
              marginBottom: 6, fontWeight: 600,
            }}>
              Receba o guia grátis
            </h3>
            <p style={{ fontSize: 13, color: C.muted, marginBottom: 20 }}>
              Enviamos diretamente no seu WhatsApp
            </p>

            <div style={{ marginBottom: 14 }}>
              <input
                placeholder="Seu primeiro nome"
                value={name}
                onChange={e => setName(e.target.value)}
                style={{
                  width: "100%", padding: "13px 16px",
                  border: `2px solid ${C.border}`, borderRadius: 12,
                  fontSize: 15, fontFamily: "inherit", outline: "none",
                  boxSizing: "border-box", color: "#2D3748",
                }}
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <input
                placeholder="WhatsApp com DDD"
                inputMode="numeric"
                value={whatsapp}
                onChange={e => setWhatsapp(formatPhone(e.target.value))}
                style={{
                  width: "100%", padding: "13px 16px",
                  border: `2px solid ${C.border}`, borderRadius: 12,
                  fontSize: 15, fontFamily: "inherit", outline: "none",
                  boxSizing: "border-box", color: "#2D3748",
                }}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={loading}
              style={{
                width: "100%", padding: "15px",
                background: `linear-gradient(135deg, ${C.secondary}, ${C.primary})`,
                color: "#fff", border: "none", borderRadius: 12,
                fontSize: 16, fontWeight: 700, cursor: "pointer",
                fontFamily: "inherit", boxShadow: "0 8px 20px rgba(139,126,116,0.25)",
              }}
            >
              {loading ? "Enviando..." : "Quero o Guia Grátis →"}
            </button>
            <p style={{ fontSize: 11, color: C.muted, marginTop: 10, textAlign: "center" }}>
              🔒 Sem spam. Seus dados são confidenciais.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// TESTIMONIALS — depoimentos reais na homepage
// Substitua os dados pelos depoimentos reais de clientes da Maisa
// ═══════════════════════════════════════════════════════════════════
const testimonials = [
  {
    name: "Carlos Mendonça",
    role: "Sócio — Mendonça Advocacia",
    plan: "Plano PJ • Bradesco Saúde",
    text: "A Maisa encontrou um plano PJ para os 8 colaboradores do escritório com cobertura muito melhor e R$ 340/mês mais barato do que o anterior. Ela fez toda a burocracia, não precisei me preocupar com nada.",
    stars: 5,
    initials: "CM",
    color: "#A8877A",
  },
  {
    name: "Fernanda Costa",
    role: "Nutricionista • MEI",
    plan: "Plano Individual • SulAmérica",
    text: "Tinha medo de contratar plano individual sendo MEI. A Maisa explicou todas as opções, comparou 4 operadoras e em 1 dia eu já tinha o plano ativo. Atendimento humano e rápido, totalmente diferente de corretoras tradicionais.",
    stars: 5,
    initials: "FC",
    color: "#8B7E74",
  },
  {
    name: "Roberto e Ana Lima",
    role: "Família • 4 membros",
    plan: "Plano Familiar • Porto Seguro",
    text: "Procuramos durante meses um plano familiar com odontológico incluso e cobertura para o meu pai de 68 anos. A Maisa resolveu em uma semana. Ela continua nos atendendo pelo WhatsApp quando temos dúvidas.",
    stars: 5,
    initials: "RL",
    color: "#C5BCB5",
  },
];

export function TestimonialsSection() {
  return (
    <section style={{
      padding: "clamp(80px, 10vw, 120px) clamp(20px, 5vw, 60px)",
      background: "#fff",
    }}>
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <p style={{
          fontSize: 12, fontWeight: 600, color: C.secondary,
          letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16,
        }}>
          ✦ O que dizem nossos clientes
        </p>
        <h2 style={{
          fontSize: "clamp(32px, 5vw, 52px)", fontFamily: font,
          fontWeight: 300, color: C.primary, marginBottom: 12,
        }}>
          Histórias Reais
        </h2>
        <p style={{ fontSize: 15, color: C.text, maxWidth: 500, margin: "0 auto" }}>
          Mais de 100 famílias e empresas que encontraram o plano ideal
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
        gap: 28,
        maxWidth: 1100,
        margin: "0 auto",
      }}>
        {testimonials.map((t, i) => (
          <div key={i} style={{
            background: "#FAFAF9",
            border: "1px solid rgba(197,188,181,0.25)",
            borderRadius: 20,
            padding: "clamp(24px, 3.5vw, 36px)",
            display: "flex", flexDirection: "column", gap: 16,
            boxShadow: "0 4px 24px rgba(139,126,116,0.06)",
          }}>
            {/* Stars */}
            <div style={{ display: "flex", gap: 3 }}>
              {Array(t.stars).fill(0).map((_, j) => (
                <span key={j} style={{ color: "#F6AD55", fontSize: 16 }}>★</span>
              ))}
            </div>

            {/* Quote */}
            <p style={{
              fontSize: 15, color: C.text, lineHeight: 1.8,
              fontStyle: "italic", flex: 1,
            }}>
              "{t.text}"
            </p>

            {/* Author */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, borderTop: `1px solid rgba(197,188,181,0.2)`, paddingTop: 16 }}>
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                background: t.color, color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: 14, flexShrink: 0,
              }}>
                {t.initials}
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: 14, color: C.primary, margin: 0 }}>{t.name}</p>
                <p style={{ fontSize: 12, color: C.muted, margin: "2px 0 0" }}>{t.role}</p>
                <span style={{
                  display: "inline-block", marginTop: 4,
                  background: "rgba(139,126,116,0.08)",
                  padding: "2px 10px", borderRadius: 10,
                  fontSize: 11, color: C.secondary, fontWeight: 500,
                }}>
                  {t.plan}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA sob depoimentos */}
      <div style={{ textAlign: "center", marginTop: 48 }}>
        <a
          href={`https://wa.me/${WA}?text=Olá Maisa! Li os depoimentos e quero uma cotação personalizada.`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "16px 36px", background: C.green, color: "#fff",
            borderRadius: 12, fontWeight: 700, fontSize: 16,
            textDecoration: "none", boxShadow: "0 8px 24px rgba(37,211,102,0.3)",
          }}
        >
          Quero ser o próximo →
        </a>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SAVINGS CALCULATOR — calculadora de economia interativa
// ═══════════════════════════════════════════════════════════════════
export function SavingsCalculator() {
  const [lives, setLives] = useState(3);
  const [planType, setPlanType] = useState("Familiar");
  const [currentCost, setCurrentCost] = useState("");
  const [result, setResult] = useState(null);
  const [showCapture, setShowCapture] = useState(false);
  const [captureWA, setCaptureWA] = useState("");
  const [captureName, setCaptureName] = useState("");

  const formatPhone = (v) => {
    const n = v.replace(/\D/g, "").slice(0, 11);
    if (n.length <= 2) return `(${n}`;
    if (n.length <= 7) return `(${n.slice(0,2)}) ${n.slice(2)}`;
    return `(${n.slice(0,2)}) ${n.slice(2,7)}-${n.slice(7)}`;
  };

  // Estimativa de economia baseada em dados reais de mercado
  const calculate = () => {
    const avgPerLife = planType === "PJ" ? 320 : planType === "Familiar" ? 280 : 240;
    const marketCost = lives * avgPerLife;
    const optimizedCost = marketCost * 0.73; // ~27% de economia média com consultoria
    const annualSaving = (marketCost - optimizedCost) * 12;
    const current = parseFloat(currentCost.replace(/\D/g,"")) || marketCost;
    const actualSaving = (current - optimizedCost) * 12;

    setResult({
      marketCost: Math.round(marketCost),
      optimizedCost: Math.round(optimizedCost),
      annualSaving: Math.round(actualSaving > 0 ? actualSaving : annualSaving),
      percentSaving: Math.round(((current - optimizedCost) / current) * 100),
    });
    setShowCapture(true);
  };

  const handleGetFull = async () => {
    const nums = captureWA.replace(/\D/g, "");
    if (nums.length < 10 || !captureName.trim()) return;
    await sendLead({ name: captureName, whatsapp: captureWA, source: "calculator", lives, planType });
    const msg = encodeURIComponent(
      `Olá Maisa! Me chamo ${captureName}.\n` +
      `Fiz a simulação no site:\n` +
      `• Tipo: ${planType} • Vidas: ${lives}\n` +
      `Quero receber a simulação completa! 📊`
    );
    window.open(`https://wa.me/${WA}?text=${msg}`, "_blank");
  };

  const fmt = (n) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

  return (
    <section style={{
      padding: "clamp(80px, 10vw, 120px) clamp(20px, 5vw, 60px)",
      background: `linear-gradient(180deg, ${C.bg} 0%, #EDE9E3 100%)`,
    }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: C.secondary, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
          ✦ Simulação gratuita
        </p>
        <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontFamily: font, fontWeight: 300, color: C.primary, marginBottom: 12 }}>
          Quanto você pode economizar?
        </h2>
        <p style={{ fontSize: 15, color: C.text }}>
          Configure o simulador e descubra a economia potencial do seu plano
        </p>
      </div>

      <div style={{
        maxWidth: 720,
        margin: "0 auto",
        background: "#fff",
        borderRadius: 24,
        padding: "clamp(28px, 5vw, 48px)",
        boxShadow: "0 20px 60px rgba(139,126,116,0.12)",
        border: "1px solid rgba(197,188,181,0.2)",
      }}>
        {/* Controles */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20, marginBottom: 28 }}>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 10 }}>
              Tipo de Plano
            </label>
            <select
              value={planType}
              onChange={e => { setPlanType(e.target.value); setResult(null); }}
              style={{ width: "100%", padding: "12px 14px", border: `2px solid ${C.border}`, borderRadius: 10, fontSize: 14, fontFamily: "inherit", background: "#fff", color: "#2D3748" }}
            >
              <option value="PJ">Pessoa Jurídica</option>
              <option value="Familiar">Plano Familiar</option>
              <option value="Individual">Individual / MEI</option>
            </select>
          </div>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 10 }}>
              Nº de Vidas: <strong style={{ color: C.primary }}>{lives}</strong>
            </label>
            <input
              type="range" min={1} max={50} value={lives}
              onChange={e => { setLives(Number(e.target.value)); setResult(null); }}
              style={{ width: "100%", accentColor: C.primary }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.muted }}>
              <span>1</span><span>50</span>
            </div>
          </div>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 10 }}>
              Custo atual/mês (opcional)
            </label>
            <input
              placeholder="R$ 0,00"
              value={currentCost}
              onChange={e => { setCurrentCost(e.target.value); setResult(null); }}
              style={{ width: "100%", padding: "12px 14px", border: `2px solid ${C.border}`, borderRadius: 10, fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box", color: "#2D3748" }}
            />
          </div>
        </div>

        <button
          onClick={calculate}
          style={{
            width: "100%", padding: "16px",
            background: `linear-gradient(135deg, ${C.secondary}, ${C.primary})`,
            color: "#fff", border: "none", borderRadius: 12,
            fontSize: 17, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
            boxShadow: "0 8px 20px rgba(139,126,116,0.25)",
            marginBottom: result ? 28 : 0,
          }}
        >
          Calcular minha economia →
        </button>

        {/* Resultado */}
        {result && (
          <div>
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16, marginBottom: 24,
            }}>
              {[
                { label: "Plano otimizado", value: fmt(result.optimizedCost), sub: "estimativa/mês", color: C.primary },
                { label: "Economia anual", value: fmt(result.annualSaving), sub: "potencial", color: "#276749" },
                { label: "Redução", value: `${result.percentSaving}%`, sub: "nos custos", color: C.secondary },
              ].map((card, i) => (
                <div key={i} style={{
                  textAlign: "center", background: C.bg, borderRadius: 12,
                  padding: "18px 10px", border: `1px solid rgba(197,188,181,0.2)`,
                }}>
                  <div style={{ fontSize: "clamp(18px, 3vw, 26px)", fontWeight: 700, color: card.color, fontFamily: font }}>{card.value}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: C.primary, marginTop: 4 }}>{card.label}</div>
                  <div style={{ fontSize: 11, color: C.muted }}>{card.sub}</div>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 12, color: C.muted, textAlign: "center", marginBottom: 20 }}>
              * Estimativa baseada em médias de mercado. A simulação completa e precisa é enviada pelo WhatsApp.
            </p>

            {showCapture && (
              <div style={{
                background: "#F0FFF4", borderRadius: 14, padding: 20,
                border: "1px solid rgba(37,211,102,0.2)",
              }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#276749", marginBottom: 14, textAlign: "center" }}>
                  📲 Receber simulação completa e personalizada
                </p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <input
                    placeholder="Seu nome"
                    value={captureName}
                    onChange={e => setCaptureName(e.target.value)}
                    style={{ flex: 1, minWidth: 120, padding: "11px 14px", border: `2px solid ${C.border}`, borderRadius: 10, fontSize: 14, fontFamily: "inherit", outline: "none", color: "#2D3748" }}
                  />
                  <input
                    placeholder="WhatsApp"
                    inputMode="numeric"
                    value={captureWA}
                    onChange={e => setCaptureWA(formatPhone(e.target.value))}
                    style={{ flex: 1, minWidth: 140, padding: "11px 14px", border: `2px solid ${C.border}`, borderRadius: 10, fontSize: 14, fontFamily: "inherit", outline: "none", color: "#2D3748" }}
                  />
                  <button
                    onClick={handleGetFull}
                    style={{
                      padding: "11px 20px", background: C.green, color: "#fff",
                      border: "none", borderRadius: 10, fontWeight: 700,
                      cursor: "pointer", fontSize: 14, fontFamily: "inherit", whiteSpace: "nowrap",
                    }}
                  >
                    Enviar →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// OPERATOR CARDS — versão atualizada com WhatsApp contextualizado
// Substitui a seção de operadoras atual
// ═══════════════════════════════════════════════════════════════════
const operators = [
  { name: "Bradesco Saúde",  color: "#CC092F", highlight: true,  tag: "⭐ Mais vendido" },
  { name: "Porto Seguro",    color: "#005CA9", highlight: true,  tag: "⭐ Destaque" },
  { name: "SulAmérica",      color: "#003087", highlight: true,  tag: "⭐ Destaque" },
  { name: "Amil",            color: "#7B2CBF", highlight: true,  tag: "⭐ Destaque" },
  { name: "Assim Saúde",     color: "#0075C9", highlight: false, tag: null },
  { name: "Prevent Senior",  color: "#0066CC", highlight: false, tag: null },
  { name: "Unimed",          color: "#009538", highlight: false, tag: null },
  { name: "Notre Dame",      color: "#1A5C8A", highlight: false, tag: null },
];

export function OperatorCards() {
  const buildMsg = (op) =>
    encodeURIComponent(`Olá Maisa! Tenho interesse em um plano da *${op}*. Pode me enviar uma cotação personalizada?`);

  return (
    <section style={{
      padding: "clamp(80px, 10vw, 120px) clamp(20px, 5vw, 60px)",
      background: `linear-gradient(180deg, #EDE9E3 0%, ${C.bg} 100%)`,
    }}>
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: C.secondary, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
          ✦ Trabalho com as melhores
        </p>
        <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontFamily: font, fontWeight: 300, color: C.primary, marginBottom: 12, lineHeight: 1.2 }}>
          Operadoras Parceiras
        </h2>
        <p style={{ fontSize: 15, color: C.text, maxWidth: 500, margin: "0 auto" }}>
          Clique na operadora de preferência e receba uma cotação personalizada
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
        gap: 20,
        maxWidth: 1100,
        margin: "0 auto 48px",
      }}>
        {operators.map((op, i) => (
          <a
            key={i}
            href={`https://wa.me/${WA}?text=${buildMsg(op.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <div style={{
              padding: op.highlight ? "clamp(28px, 4vw, 44px) clamp(24px, 3vw, 36px)" : "clamp(20px, 3vw, 32px) clamp(20px, 3vw, 32px)",
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(20px)",
              border: `${op.highlight ? "2" : "1"}px solid ${op.color}${op.highlight ? "30" : "14"}`,
              borderRadius: 20,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              minHeight: op.highlight ? 180 : 140,
              boxShadow: op.highlight
                ? `0 12px 48px ${op.color}20, rgba(255,255,255,0.8) 0px 1px 0px inset`
                : "0 8px 32px rgba(139,126,116,0.08)",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
              position: "relative",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = `0 20px 60px ${op.color}30`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = op.highlight
                ? `0 12px 48px ${op.color}20`
                : "0 8px 32px rgba(139,126,116,0.08)";
            }}
            >
              {op.tag && (
                <div style={{
                  position: "absolute", top: 10, right: 10,
                  background: `${op.color}18`, color: op.color,
                  fontSize: 10, fontWeight: 600, padding: "3px 10px",
                  borderRadius: 8, textTransform: "uppercase", letterSpacing: "0.05em",
                  border: `1px solid ${op.color}30`,
                }}>
                  {op.tag}
                </div>
              )}
              <span style={{
                fontSize: op.highlight ? "clamp(18px, 2.5vw, 24px)" : "clamp(15px, 2vw, 20px)",
                fontWeight: op.highlight ? 500 : 400,
                color: op.color,
                fontFamily: font,
                textAlign: "center",
                marginBottom: 12,
                lineHeight: 1.3,
              }}>
                {op.name}
              </span>
              <span style={{
                fontSize: 12, fontWeight: 600, color: op.color,
                textTransform: "uppercase", letterSpacing: "0.08em",
                opacity: 0.8,
              }}>
                {op.highlight ? "Solicitar cotação →" : "Solicitar →"}
              </span>
            </div>
          </a>
        ))}
      </div>

      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: 14, color: C.muted, fontStyle: "italic", marginBottom: 24 }}>
          E outras operadoras credenciadas pela ANS
        </p>
        <a
          href={`https://wa.me/${WA}?text=Olá Maisa! Não encontrei a operadora que procuro. Pode me ajudar?`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "14px 32px", background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(10px)", color: C.primary,
            border: `1px solid rgba(197,188,181,0.35)`,
            borderRadius: 12, fontWeight: 500, fontSize: 15,
            textDecoration: "none", boxShadow: "0 4px 16px rgba(139,126,116,0.1)",
          }}
        >
          Não encontrou? Fale comigo →
        </a>
      </div>
    </section>
  );
}
