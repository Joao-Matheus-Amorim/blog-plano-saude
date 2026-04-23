import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Simulador() {
  const [vidas, setVidas] = useState(1);
  const [tipo, setTipo] = useState('PJ');
  const [operadora, setOperadora] = useState('Bradesco');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [etapa, setEtapa] = useState(1);
  const [enviando, setEnviando] = useState(false);

  const avancarParaDados = () => {
    if (vidas < 1) { alert('Informe o número de vidas'); return; }
    setEtapa(2);
  };

  const salvarLead = async () => {
    if (!nome || !email || !telefone) {
      alert('Preencha todos os dados para receber sua cotação!');
      return;
    }
    if (telefone.replace(/\D/g, '').length < 10) {
      alert('Informe um WhatsApp válido com DDD');
      return;
    }

    setEnviando(true);

    try {
      const response = await fetch('/api/leads/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          email,
          telefone,
          vidas,
          operadora,
          mensagem: `Simulação: ${tipo} - ${vidas} vidas - ${operadora}`,
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error || 'Erro ao salvar lead');
      }
    } catch (error) {
      console.error('Erro ao salvar lead:', error);
      alert('Erro ao enviar. Tente novamente.');
      setEnviando(false);
      return;
    }

    setEnviando(false);
    setEtapa(3);
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    border: '2px solid #E5E5E5',
    borderRadius: '12px',
    fontSize: '16px',
    background: 'white',
    transition: 'all 0.3s ease',
    fontWeight: '500',
    color: '#2D3748'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#6B6662',
    marginBottom: '8px'
  };

  const whatsappMsg = encodeURIComponent(
    `Olá, Maisa! 👋\nSolicitei uma cotação pelo site:\n\n` +
    `📋 Tipo: ${tipo}\n` +
    `👥 Vidas: ${vidas}\n` +
    `🏥 Operadora preferida: ${operadora}\n\n` +
    `Pode me enviar a cotação personalizada?`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        padding: 'clamp(32px, 5vw, 48px)',
        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        boxShadow: '0 20px 60px rgba(139,126,116,0.15)',
        maxWidth: '550px',
        margin: '0 auto',
        border: '1px solid rgba(197,188,181,0.2)'
      }}
    >
      <AnimatePresence mode="wait">

        {/* ETAPA 1 — Dados da simulação */}
        {etapa === 1 && (
          <motion.div key="etapa1"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.4 }}
          >
            <h3 style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: '600', marginBottom: '8px', color: '#8B7E74', fontFamily: "'Playfair Display', serif", textAlign: 'center' }}>
              📋 Configure Sua Cotação
            </h3>
            <p style={{ textAlign: 'center', color: '#9B9289', fontSize: '14px', marginBottom: '28px' }}>
              Preencha abaixo e receba sua cotação real em até 24h
            </p>

            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Tipo de Plano</label>
              <select value={tipo} onChange={e => setTipo(e.target.value)} style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#A8877A'}
                onBlur={e => e.target.style.borderColor = '#E5E5E5'}>
                <option value="PJ">Pessoa Jurídica (PJ)</option>
                <option value="Familiar">Plano Familiar</option>
                <option value="Individual">Individual / MEI</option>
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Número de Vidas</label>
              <input type="number" value={vidas} onChange={e => setVidas(Number(e.target.value))}
                placeholder="Quantas pessoas?" min="1" max="99" style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#A8877A'}
                onBlur={e => e.target.style.borderColor = '#E5E5E5'} />
            </div>

            <div style={{ marginBottom: '28px' }}>
              <label style={labelStyle}>Operadora de Interesse</label>
              <select value={operadora} onChange={e => setOperadora(e.target.value)} style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#A8877A'}
                onBlur={e => e.target.style.borderColor = '#E5E5E5'}>
                <option value="Bradesco">Bradesco Saúde</option>
                <option value="Unimed">Unimed</option>
                <option value="SulAmerica">SulAmérica</option>
                <option value="Amil">Amil</option>
                <option value="NotreDame">Notre Dame Intermédica</option>
                <option value="Sem preferência">Sem preferência — quero a melhor opção</option>
              </select>
            </div>

            <motion.button onClick={avancarParaDados}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              style={{ width: '100%', padding: '18px', background: 'linear-gradient(135deg, #8B7E74 0%, #A8877A 100%)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '18px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 8px 24px rgba(139,126,116,0.3)' }}>
              Continuar →
            </motion.button>
          </motion.div>
        )}

        {/* ETAPA 2 — Dados de contato */}
        {etapa === 2 && (
          <motion.div key="etapa2"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.4 }}
          >
            <h3 style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: '600', marginBottom: '8px', color: '#8B7E74', fontFamily: "'Playfair Display', serif", textAlign: 'center' }}>
              📞 Onde enviamos sua cotação?
            </h3>
            <p style={{ textAlign: 'center', color: '#9B9289', fontSize: '14px', marginBottom: '28px' }}>
              Cotação gratuita e personalizada — sem compromisso
            </p>

            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Nome Completo *</label>
              <input type="text" value={nome} onChange={e => setNome(e.target.value)}
                placeholder="Seu nome" style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#A8877A'}
                onBlur={e => e.target.style.borderColor = '#E5E5E5'} />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>E-mail *</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="seu@email.com" style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#A8877A'}
                onBlur={e => e.target.style.borderColor = '#E5E5E5'} />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>WhatsApp *</label>
              <input type="tel" value={telefone} onChange={e => setTelefone(e.target.value)}
                placeholder="(21) 99999-9999" style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#A8877A'}
                onBlur={e => e.target.style.borderColor = '#E5E5E5'} />
            </div>

            {/* Aviso LGPD */}
            <p style={{ fontSize: '12px', color: '#B0AAA5', marginBottom: '24px', lineHeight: 1.5 }}>
              🔒 Seus dados são protegidos pela LGPD e usados apenas para envio da cotação. Sem spam.
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <motion.button onClick={() => setEtapa(1)}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                style={{ flex: 1, padding: '18px', background: 'rgba(139,126,116,0.1)', color: '#8B7E74', border: '2px solid #E5E5E5', borderRadius: '12px', fontSize: '16px', fontWeight: '700', cursor: 'pointer' }}>
                ← Voltar
              </motion.button>

              <motion.button onClick={salvarLead} disabled={enviando}
                whileHover={{ scale: enviando ? 1 : 1.02 }} whileTap={{ scale: enviando ? 1 : 0.98 }}
                style={{ flex: 2, padding: '18px', background: enviando ? '#9B9289' : 'linear-gradient(135deg, #8B7E74 0%, #A8877A 100%)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '18px', fontWeight: '700', cursor: enviando ? 'not-allowed' : 'pointer', boxShadow: '0 8px 24px rgba(139,126,116,0.3)' }}>
                {enviando ? 'Enviando...' : 'Receber Cotação →'}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ETAPA 3 — Confirmação */}
        {etapa === 3 && (
          <motion.div key="etapa3"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Ícone de sucesso animado */}
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
              style={{ textAlign: 'center', marginBottom: '24px' }}
            >
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #8B7E74 0%, #A8877A 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 12px 32px rgba(139,126,116,0.3)' }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: '600', color: '#8B7E74', fontFamily: "'Playfair Display', serif" }}>
                Cotação Solicitada!
              </h3>
            </motion.div>

            {/* Card de confirmação */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              style={{ background: '#FAF8F6', border: '1px solid #EDE9E5', borderRadius: '16px', padding: '20px 24px', marginBottom: '24px' }}
            >
              <p style={{ fontSize: '15px', color: '#5A5450', lineHeight: 1.7, margin: 0 }}>
                Recebemos seu pedido! A <strong>Maisa Valentim</strong> vai analisar seu perfil e enviar uma cotação personalizada com os <strong>melhores planos e preços reais</strong> para você.
              </p>
              <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#8B7E74', fontWeight: '600' }}>
                  <span>⏱</span> Resposta em até 24h úteis
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#8B7E74', fontWeight: '600' }}>
                  <span>🎯</span> Cotação personalizada para seu perfil
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#8B7E74', fontWeight: '600' }}>
                  <span>💸</span> 100% gratuito e sem compromisso
                </div>
              </div>
            </motion.div>

            {/* Botão WhatsApp */}
            <motion.a
              href={`https://wa.me/5521977472141?text=${whatsappMsg}`}
              target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', width: '100%', padding: '18px', background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '17px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 8px 24px rgba(37,211,102,0.3)', textDecoration: 'none' }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Falar com a Maisa agora
            </motion.a>

            <p style={{ marginTop: '16px', fontSize: '13px', color: '#B0AAA5', textAlign: 'center', lineHeight: 1.5 }}>
              Prefere esperar? Entraremos em contato pelo WhatsApp <strong>{telefone || 'informado'}</strong>
            </p>
          </motion.div>
        )}

      </AnimatePresence>
    </motion.div>
  );
}
