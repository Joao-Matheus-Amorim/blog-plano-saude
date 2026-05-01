import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Simulador() {
  const [vidas, setVidas] = useState(1);
  const [tipo, setTipo] = useState('PJ');
  const [operadora, setOperadora] = useState('Sem preferência');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [etapa, setEtapa] = useState(1);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');

  const avancarParaDados = () => {
    if (vidas < 1) {
      setErro('Informe o número de vidas para continuar.');
      return;
    }

    setErro('');
    setEtapa(2);
  };

  const salvarLead = async () => {
    setErro('');

    if (!nome || !email || !telefone) {
      setErro('Preencha nome, e-mail e WhatsApp para continuar.');
      return;
    }

    if (telefone.replace(/\D/g, '').length < 10) {
      setErro('Informe um WhatsApp válido com DDD.');
      return;
    }

    setEnviando(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          email,
          telefone,
          vidas,
          operadora,
          mensagem: `Pré-análise: ${tipo} - ${vidas} vidas - ${operadora}`,
          origem: 'Site - formulário de pré-análise',
        }),
      });

      if (!response.ok) {
        throw new Error('Não foi possível enviar agora.');
      }
    } catch (error) {
      console.error('Erro ao salvar lead:', error);
      setErro('Não foi possível enviar agora. Você ainda pode falar conosco pelo WhatsApp.');
      setEnviando(false);
      return;
    }

    setEnviando(false);
    setEtapa(3);
  };

  const inputStyle = {
    width: '100%',
    padding: '15px 16px',
    border: '1px solid rgba(37, 70, 35, 0.16)',
    borderRadius: '16px',
    fontSize: '15px',
    background: 'rgba(255, 252, 246, 0.78)',
    transition: 'all 0.25s ease',
    fontWeight: '700',
    color: '#254623',
    outline: 'none',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.78)'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '11px',
    fontWeight: '900',
    color: '#6B7C53',
    marginBottom: '8px',
    letterSpacing: '0.10em',
    textTransform: 'uppercase'
  };

  const primaryButtonStyle = {
    width: '100%',
    padding: '17px',
    background: '#254623',
    color: '#FFFCF6',
    border: '1px solid rgba(255, 252, 246, 0.20)',
    borderRadius: '999px',
    fontSize: '13px',
    fontWeight: '900',
    cursor: 'pointer',
    letterSpacing: '0.10em',
    textTransform: 'uppercase',
    boxShadow: '0 18px 36px rgba(37, 70, 35, 0.24)'
  };

  const whatsappMsg = encodeURIComponent(
    `Olá, Maisa. Solicitei uma pré-análise pelo site.\n\n` +
    `Tipo: ${tipo}\n` +
    `Vidas: ${vidas}\n` +
    `Operadora de interesse: ${operadora}\n\n` +
    `Pode seguir com a análise do meu perfil?`
  );

  return (
    <motion.div
      className="float-mirror"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      style={{
        padding: 'clamp(28px, 4.4vw, 42px)',
        borderRadius: '30px',
        maxWidth: '540px',
        margin: '0 auto'
      }}
    >
      <div style={{ position: 'absolute', inset: '0 0 auto 0', height: '7px', background: 'linear-gradient(90deg, #254623, #8FA185, #C2B280)', zIndex: 2 }} />

      <AnimatePresence mode="wait">
        {etapa === 1 && (
          <motion.div key="etapa1" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.3 }} style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontSize: '11px', color: '#6B7C53', fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '12px' }}>
              Pré-análise gratuita
            </p>
            <h3 style={{ fontSize: 'clamp(27px, 3vw, 36px)', fontWeight: 600, marginBottom: '10px', color: '#254623', fontFamily: "'Playfair Display', serif", lineHeight: 1.02 }}>
              Receba uma recomendação consultiva.
            </h3>
            <p style={{ color: '#67715F', fontSize: '14px', lineHeight: 1.7, marginBottom: '28px' }}>
              Não exibimos preço automático. Uma consultora avalia o perfil e retorna com as melhores possibilidades.
            </p>

            <div style={{ marginBottom: '18px' }}>
              <label style={labelStyle}>Tipo de plano</label>
              <select value={tipo} onChange={e => setTipo(e.target.value)} style={inputStyle}>
                <option value="PJ">Pessoa Jurídica</option>
                <option value="Familiar">Familiar</option>
                <option value="Individual">Individual ou MEI</option>
              </select>
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={labelStyle}>Número de vidas</label>
              <input type="number" value={vidas} onChange={e => setVidas(Number(e.target.value))} placeholder="Quantas pessoas?" min="1" max="99" style={inputStyle} />
            </div>

            <div style={{ marginBottom: '26px' }}>
              <label style={labelStyle}>Operadora de interesse</label>
              <select value={operadora} onChange={e => setOperadora(e.target.value)} style={inputStyle}>
                <option value="Sem preferência">Sem preferência</option>
                <option value="Bradesco">Bradesco Saúde</option>
                <option value="Unimed">Unimed</option>
                <option value="SulAmerica">SulAmérica</option>
                <option value="Amil">Amil</option>
                <option value="NotreDame">Notre Dame Intermédica</option>
              </select>
            </div>

            <button onClick={avancarParaDados} style={primaryButtonStyle}>
              Continuar análise
            </button>

            {erro && <p style={{ marginTop: '14px', fontSize: '13px', color: '#8A4B3D', lineHeight: 1.5, textAlign: 'center' }}>{erro}</p>}
          </motion.div>
        )}

        {etapa === 2 && (
          <motion.div key="etapa2" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.3 }} style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontSize: '11px', color: '#6B7C53', fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '12px' }}>
              Dados para contato
            </p>
            <h3 style={{ fontSize: 'clamp(27px, 3vw, 36px)', fontWeight: 600, marginBottom: '10px', color: '#254623', fontFamily: "'Playfair Display', serif", lineHeight: 1.02 }}>
              Para onde enviamos o retorno?
            </h3>
            <p style={{ color: '#67715F', fontSize: '14px', lineHeight: 1.7, marginBottom: '28px' }}>
              Usaremos seus dados apenas para contato sobre a pré-análise solicitada.
            </p>

            <div style={{ marginBottom: '18px' }}>
              <label style={labelStyle}>Nome completo</label>
              <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Seu nome" style={inputStyle} />
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={labelStyle}>E-mail</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" style={inputStyle} />
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={labelStyle}>WhatsApp</label>
              <input type="tel" value={telefone} onChange={e => setTelefone(e.target.value)} placeholder="(21) 99999-9999" style={inputStyle} />
            </div>

            <p style={{ fontSize: '12px', color: '#7B846F', marginBottom: '22px', lineHeight: 1.6 }}>
              Seus dados são tratados com confidencialidade e usados somente para atendimento da solicitação.
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setEtapa(1)} style={{ flex: 1, padding: '16px', background: 'rgba(245,240,230,0.74)', color: '#254623', border: '1px solid rgba(37, 70, 35, 0.16)', borderRadius: '999px', fontSize: '13px', fontWeight: '900', cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Voltar
              </button>

              <button onClick={salvarLead} disabled={enviando} style={{ ...primaryButtonStyle, flex: 2, background: enviando ? '#8FA185' : '#254623' }}>
                {enviando ? 'Enviando' : 'Solicitar contato'}
              </button>
            </div>

            {erro && <p style={{ marginTop: '14px', fontSize: '13px', color: '#8A4B3D', lineHeight: 1.5, textAlign: 'center' }}>{erro}</p>}
          </motion.div>
        )}

        {etapa === 3 && (
          <motion.div key="etapa3" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }} style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontSize: '11px', color: '#6B7C53', fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '12px' }}>
              Solicitação recebida
            </p>
            <h3 style={{ fontSize: 'clamp(28px, 3vw, 38px)', fontWeight: 600, color: '#254623', fontFamily: "'Playfair Display', serif", lineHeight: 1.04, marginBottom: '16px' }}>
              Sua pré-análise foi enviada.
            </h3>

            <div style={{ background: 'rgba(245,240,230,0.76)', border: '1px solid rgba(37, 70, 35, 0.12)', borderRadius: '20px', padding: '22px', marginBottom: '22px' }}>
              <p style={{ fontSize: '15px', color: '#4C5A45', lineHeight: 1.75, margin: 0 }}>
                Recebemos seus dados. A consultoria vai avaliar o perfil informado e entrar em contato pelo WhatsApp para orientar os próximos passos.
              </p>
            </div>

            <a href={`https://wa.me/5521977472141?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer" style={{ ...primaryButtonStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
              Falar agora pelo WhatsApp
            </a>

            <p style={{ marginTop: '16px', fontSize: '13px', color: '#7B846F', textAlign: 'center', lineHeight: 1.5 }}>
              Também entraremos em contato pelo número informado.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
