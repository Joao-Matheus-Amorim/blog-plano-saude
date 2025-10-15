import { useState } from 'react';
import { motion } from 'framer-motion';

function FormularioContato() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  async function enviarFormulario(evento) {
    evento.preventDefault();
    setEnviando(true);
    
    const lead = {
      nome, 
      email, 
      telefone, 
      mensagem,
      data: new Date().toISOString()
    };

    try {
      const resposta = await fetch('http://localhost:3333/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead)
      });

      if (resposta.ok) {
        setSucesso(true);
        setNome('');
        setEmail('');
        setTelefone('');
        setMensagem('');
        
        setTimeout(() => setSucesso(false), 5000);
      }
    } catch (erro) {
      alert('Erro ao enviar. Verifique sua conexão.');
    }
    
    setEnviando(false);
  }

  const inputStyle = {
    width: '100%',
    padding: '16px 20px',
    fontSize: '16px',
    border: '2px solid rgba(168, 218, 220, 0.3)',
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.8)',
    color: '#1D3557',
    fontFamily: 'Inter, sans-serif',
    transition: 'all 0.3s ease',
    outline: 'none'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '10px',
    fontSize: '15px',
    fontWeight: '600',
    color: '#1D3557',
    letterSpacing: '0.01em'
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ 
        maxWidth: '650px',
        margin: '0 auto',
        padding: 'clamp(32px, 5vw, 56px)',
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(30px)',
        borderRadius: '32px',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        boxShadow: '0 20px 60px rgba(29, 53, 87, 0.15)'
      }}
    >
      {sucesso ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{
            textAlign: 'center',
            padding: '50px 20px'
          }}
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            style={{ 
              fontSize: '80px', 
              marginBottom: '24px',
              filter: 'drop-shadow(0 4px 12px rgba(129, 195, 183, 0.3))'
            }}
          >
            ✓
          </motion.div>
          <h3 style={{ 
            fontSize: '28px', 
            color: '#81C3B7',
            marginBottom: '16px',
            fontWeight: '700'
          }}>
            Mensagem Enviada!
          </h3>
          <p style={{ 
            fontSize: '17px', 
            color: '#457B9D',
            lineHeight: 1.6
          }}>
            Recebi sua solicitação! Entrarei em contato em até 24 horas com uma proposta personalizada. Obrigada pela confiança! 💚
          </p>
        </motion.div>
      ) : (
        <form onSubmit={enviarFormulario}>
          <div style={{ marginBottom: '36px', textAlign: 'center' }}>
            <h2 style={{ 
              fontSize: 'clamp(28px, 4vw, 36px)',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #1D3557 0%, #457B9D 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '12px',
              letterSpacing: '-0.01em'
            }}>
              Solicite uma Cotação
            </h2>
            
            <p style={{ 
              fontSize: '16px', 
              color: '#457B9D',
              lineHeight: 1.7,
              fontWeight: '400'
            }}>
              Preencha seus dados e receba uma proposta personalizada em até 24 horas, sem compromisso!
            </p>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={labelStyle}>
              Nome Completo *
            </label>
            <input 
              type="text" 
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              disabled={enviando}
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = '#81C3B7';
                e.target.style.boxShadow = '0 0 0 4px rgba(129, 195, 183, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(168, 218, 220, 0.3)';
                e.target.style.boxShadow = 'none';
              }}
              placeholder="Digite seu nome completo"
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={labelStyle}>
              E-mail *
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={enviando}
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = '#81C3B7';
                e.target.style.boxShadow = '0 0 0 4px rgba(129, 195, 183, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(168, 218, 220, 0.3)';
                e.target.style.boxShadow = 'none';
              }}
              placeholder="seu@email.com"
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={labelStyle}>
              Telefone/WhatsApp *
            </label>
            <input 
              type="tel" 
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
              disabled={enviando}
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = '#81C3B7';
                e.target.style.boxShadow = '0 0 0 4px rgba(129, 195, 183, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(168, 218, 220, 0.3)';
                e.target.style.boxShadow = 'none';
              }}
              placeholder="(00) 00000-0000"
            />
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={labelStyle}>
              Mensagem (opcional)
            </label>
            <textarea 
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              rows="5"
              disabled={enviando}
              style={{
                ...inputStyle, 
                resize: 'vertical', 
                minHeight: '120px',
                fontFamily: 'Inter, sans-serif'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#81C3B7';
                e.target.style.boxShadow = '0 0 0 4px rgba(129, 195, 183, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(168, 218, 220, 0.3)';
                e.target.style.boxShadow = 'none';
              }}
              placeholder="Conte-me sobre suas necessidades de plano de saúde..."
            />
          </div>

          <motion.button 
            type="submit" 
            disabled={enviando}
            whileHover={{ scale: enviando ? 1 : 1.02 }}
            whileTap={{ scale: enviando ? 1 : 0.98 }}
            style={{ 
              width: '100%',
              padding: '20px',
              fontSize: '18px',
              fontWeight: '700',
              color: 'white',
              background: enviando 
                ? 'linear-gradient(135deg, #A8DADC 0%, #6B7280 100%)'
                : 'linear-gradient(135deg, #81C3B7 0%, #457B9D 100%)',
              border: 'none',
              borderRadius: '14px',
              cursor: enviando ? 'not-allowed' : 'pointer',
              boxShadow: enviando ? 'none' : '0 10px 30px rgba(129, 195, 183, 0.4)',
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '0.02em',
              transition: 'all 0.3s ease'
            }}
          >
            {enviando ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                <span style={{ 
                  width: '20px', 
                  height: '20px', 
                  border: '3px solid white',
                  borderTop: '3px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite'
                }}/>
                Enviando...
              </span>
            ) : (
              'Solicitar Cotação Gratuita →'
            )}
          </motion.button>

          <p style={{
            marginTop: '20px',
            textAlign: 'center',
            fontSize: '13px',
            color: '#6B7280',
            lineHeight: 1.6
          }}>
            Seus dados estão seguros e não serão compartilhados. Você receberá suporte vitalício após a contratação! 🔒
          </p>
        </form>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </motion.div>
  );
}

export default FormularioContato;
