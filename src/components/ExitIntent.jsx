// ExitIntent.jsx
// Popup que aparece quando o usuário tenta fechar a aba

import { useState, useEffect, useRef } from "react";

const WA = "5521977472141";

const C = {
  primary:   "#8B7E74",
  secondary: "#A8877A",
  light:     "#C5BCB5",
  text:      "#6B6662",
  muted:     "#9B9289",
  border:    "#E5E7EB",
  green:     "#25D366",
};
const font = "'Playfair Display', serif";

function generateEventId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

async function saveLead(payload) {
  const eventId = generateEventId();
  const utm_source = new URLSearchParams(window.location.search).get("utm_source") || "direct";

  try {
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, origem: payload.origem || utm_source, event_id: eventId }),
    });
  } catch (_) {}

  if (window.fbq) {
    window.fbq("track", "Lead", {}, { eventID: eventId });
  }
  if (window.dataLayer) {
    window.dataLayer.push({ event: "lead_completo", event_id: eventId, source: payload.source });
  }
}

const formatPhone = (v) => {
  const n = v.replace(/\D/g, "").slice(0, 11);
  if (n.length <= 2) return `(${n}`;
  if (n.length <= 7) return `(${n.slice(0,2)}) ${n.slice(2)}`;
  return `(${n.slice(0,2)}) ${n.slice(2,7)}-${n.slice(7)}`;
};

export default function ExitIntent() {
  const [visible, setVisible] = useState(false);
  const [whatsapp, setWhatsapp] = useState("");
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const triggered = useRef(false);
  const dismissedKey = "exit_popup_dismissed";

  useEffect(() => {
    if (sessionStorage.getItem(dismissedKey)) return;

    const handleMouseLeave = (e) => {
      if (triggered.current) return;
      if (e.clientY <= 10) {
        triggered.current = true;
        setTimeout(() => setVisible(true), 200);
      }
    };

    let mobileTimer;
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    if (isMobile) {
      mobileTimer = setTimeout(() => {
        if (!triggered.current) {
          triggered.current = true;
          setVisible(true);
        }
      }, 40000);
    }

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (mobileTimer) clearTimeout(mobileTimer);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem(dismissedKey, "1");
  };

  const handleSend = async () => {
    const nums = whatsapp.replace(/\D/g, "");
    if (nums.length < 10 || !name.trim()) return;
    setLoading(true);

    await saveLead({ nome: name, telefone: whatsapp, origem: "exit_intent", source: "exit_intent" });

    const msg = encodeURIComponent(
      `Olá Maisa! Me chamo ${name}.\n` +
      `Estava no seu site e quero receber a comparação das operadoras.\n` +
      `Pode me ajudar? 😊`
    );
    window.open(`https://wa.me/${WA}?text=${msg}`, "_blank");
    setLoading(false);
    setSent(true);
    setTimeout(dismiss, 3000);
  };

  if (!visible) return null;

  return (
    <>
      <div
        onClick={dismiss}
        style={{
          position: "fixed", inset: 0, zIndex: 99998,
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(4px)",
          animation: "fadeIn 0.3s ease",
        }}
      />

      <div style={{
        position: "fixed",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 99999,
        width: "min(520px, 92vw)",
        background: "#fff",
        borderRadius: 24,
        padding: "clamp(32px, 5vw, 52px)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.2)",
        animation: "slideUp 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      }}>
        <button
          onClick={dismiss}
          aria-label="Fechar"
          style={{
            position: "absolute", top: 16, right: 16,
            background: "none", border: "none",
            fontSize: 22, cursor: "pointer",
            color: C.muted, lineHeight: 1, padding: 6,
          }}
        >×</button>

        {!sent ? (
          <>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ fontSize: 44, marginBottom: 12 }}>⏳</div>
              <h2 style={{
                fontFamily: font, color: C.primary,
                fontSize: "clamp(22px, 3.5vw, 30px)",
                fontWeight: 400, marginBottom: 12, lineHeight: 1.2,
              }}>
                Antes de você ir...
              </h2>
              <p style={{ color: C.text, lineHeight: 1.8, fontSize: 15 }}>
                Deixa eu te enviar uma comparação gratuita das <strong>4 melhores operadoras</strong> para o seu perfil.<br/>
                <span style={{ color: C.secondary, fontWeight: 600 }}>Só preciso do seu WhatsApp.</span>
              </p>
            </div>

            <div style={{
              display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center",
              marginBottom: 24,
            }}>
              {["✅ Comparação gratuita", "✅ Sem compromisso", "✅ Resposta em minutos"].map((b, i) => (
                <span key={i} style={{ fontSize: 13, color: C.text, fontWeight: 500 }}>{b}</span>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input
                placeholder="Seu primeiro nome"
                value={name}
                onChange={e => setName(e.target.value)}
                style={{
                  width: "100%", padding: "14px 16px",
                  border: `2px solid ${C.border}`, borderRadius: 12,
                  fontSize: 15, fontFamily: "inherit", outline: "none",
                  boxSizing: "border-box", color: "#2D3748",
                }}
              />
              <input
                placeholder="(21) 99999-9999"
                inputMode="numeric"
                value={whatsapp}
                onChange={e => setWhatsapp(formatPhone(e.target.value))}
                style={{
                  width: "100%", padding: "14px 16px",
                  border: `2px solid ${C.border}`, borderRadius: 12,
                  fontSize: 15, fontFamily: "inherit", outline: "none",
                  boxSizing: "border-box", color: "#2D3748",
                }}
              />
              <button
                onClick={handleSend}
                disabled={loading}
                style={{
                  padding: "16px", fontSize: 17, fontWeight: 700,
                  background: `linear-gradient(135deg, ${C.secondary}, ${C.primary})`,
                  color: "#fff", border: "none", borderRadius: 12,
                  cursor: loading ? "not-allowed" : "pointer",
                  fontFamily: "inherit",
                  boxShadow: "0 8px 20px rgba(139,126,116,0.25)",
                }}
              >
                {loading ? "Aguarde..." : "Receber comparação grátis →"}
              </button>
              <button
                onClick={dismiss}
                style={{
                  padding: "10px", background: "none", border: "none",
                  color: C.muted, cursor: "pointer", fontSize: 13,
                  fontFamily: "inherit",
                }}
              >
                Não, obrigado. Prefiro escolher sem orientação.
              </button>
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
            <h3 style={{ fontFamily: font, color: C.primary, fontSize: 24, marginBottom: 12 }}>
              Ótima escolha!
            </h3>
            <p style={{ color: C.text, lineHeight: 1.8 }}>
              Você foi redirecionado para o WhatsApp da Maisa. A comparação vem em minutos!
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translate(-50%, calc(-50% + 20px)); } to { opacity: 1; transform: translate(-50%, -50%); } }
      `}</style>
    </>
  );
}
