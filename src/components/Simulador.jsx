import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://jdrglgiyyjxyytjcfzbj.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkcmdsZ2l5eWp4eXl0amNmemJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNDA2NTQsImV4cCI6MjA3NTkxNjY1NH0.RPoOtFDmxGSscfn1tIET055miHdOW25w0K7vqA7NT98";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Simulador() {
  // Estados para os dados da simulação
  const [vidas, setVidas] = useState(1);
  const [tipo, setTipo] = useState('PJ');
  const [operadora, setOperadora] = useState('Bradesco');
  
  // Estados para os dados do lead
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  
  // Estados de controle
  const [etapa, setEtapa] = useState(1); // 1 = simulação, 2 = dados pessoais, 3 = resultado
  const [custo, setCusto] = useState(0);
  const [enviando, setEnviando] = useState(false);

  const operadoras = { 
    Bradesco: 250, 
    Unimed: 220, 
    SulAmerica: 280,
    Amil: 260,
    NotreDame: 240
  };

  // Avança para a etapa de dados pessoais
  const avancarParaDados = () => {
    if (vidas < 1) {
      alert('Informe o número de vidas');
      return;
    }
    setEtapa(2);
  };

  // Calcula e salva no Supabase
  const calcularESalvar = async () => {
    // Validação
    if (!nome || !email || !telefone) {
      alert('Preencha todos os dados para ver o resultado!');
      return;
    }

    if (telefone.length < 10) {
      alert('Informe um telefone válido');
      return;
    }

    setEnviando(true);

    // Calcula o valor
    const base = operadoras[operadora] * vidas;
    const total = base * (tipo === 'Familiar' ? 0.9 : 1);
    setCusto(total);

    // Salva no Supabase
    const { error } = await supabase.from('lead').insert([
      { 
        nome,
        email,
        telefone,
        vidas, 
        tipo, 
        operadora, 
        custo: total,
        mensagem: `Simulação: ${tipo} - ${vidas} vidas - ${operadora}`,
        data_envio: new Date().toISOString() 
      }
    ]);
    
    if (error) {
      console.error('Erro ao salvar:', error.message);
      alert('Erro ao salvar. Tente novamente.');
      setEnviando(false);
      return;
    }

    console.log('✅ Lead salvo com sucesso!');
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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        padding: 'clamp(32px, 5vw, 48px)',
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        boxShadow: '0 20px 60px rgba(139, 126, 116, 0.15)',
        maxWidth: '550px',
        margin: '0 auto',
        border: '1px solid rgba(197, 188, 181, 0.2)'
      }}
    >
      {/* ETAPA 1: DADOS DA SIMULAÇÃO */}
      <AnimatePresence mode="wait">
        {etapa === 1 && (
          <motion.div
            key="etapa1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
          >
            <h3 style={{ 
              fontSize: 'clamp(22px, 3vw, 28px)', 
              fontWeight: '600', 
              marginBottom: '24px', 
              color: '#8B7E74',
              fontFamily: "'Playfair Display', serif",
              textAlign: 'center'
            }}>
              📋 Configure Sua Simulação
            </h3>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Tipo de Plano</label>
              <select 
                value={tipo} 
                onChange={e => setTipo(e.target.value)}
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#A8877A'}
                onBlur={(e) => e.target.style.borderColor = '#E5E5E5'}
              >
                <option value="PJ">Pessoa Jurídica (PJ)</option>
                <option value="Familiar">Plano Familiar</option>
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Número de Vidas</label>
              <input
                type="number"
                value={vidas}
                onChange={e => setVidas(Number(e.target.value))}
                placeholder="Quantas pessoas?"
                min="1"
                max="99"
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#A8877A'}
                onBlur={(e) => e.target.style.borderColor = '#E5E5E5'}
              />
            </div>

            <div style={{ marginBottom: '28px' }}>
              <label style={labelStyle}>Operadora</label>
              <select 
                value={operadora} 
                onChange={e => setOperadora(e.target.value)}
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#A8877A'}
                onBlur={(e) => e.target.style.borderColor = '#E5E5E5'}
              >
                <option value="Bradesco">Bradesco Saúde</option>
                <option value="Unimed">Unimed</option>
                <option value="SulAmerica">SulAmérica</option>
                <option value="Amil">Amil</option>
                <option value="NotreDame">Notre Dame Intermédica</option>
              </select>
            </div>

            <motion.button 
              onClick={avancarParaDados}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: '100%',
                padding: '18px',
                background: 'linear-gradient(135deg, #8B7E74 0%, #A8877A 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(139, 126, 116, 0.3)',
                transition: 'all 0.3s ease'
              }}
            >
              Continuar →
            </motion.button>
          </motion.div>
        )}

        {/* ETAPA 2: DADOS PESSOAIS */}
        {etapa === 2 && (
          <motion.div
            key="etapa2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
          >
            <h3 style={{ 
              fontSize: 'clamp(22px, 3vw, 28px)', 
              fontWeight: '600', 
              marginBottom: '24px', 
              color: '#8B7E74',
              fontFamily: "'Playfair Display', serif",
              textAlign: 'center'
            }}>
              📞 Seus Dados para Contato
            </h3>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Nome Completo *</label>
              <input
                type="text"
                value={nome}
                onChange={e => setNome(e.target.value)}
                placeholder="Digite seu nome"
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#A8877A'}
                onBlur={(e) => e.target.style.borderColor = '#E5E5E5'}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>E-mail *</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="seu@email.com"
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#A8877A'}
                onBlur={(e) => e.target.style.borderColor = '#E5E5E5'}
              />
            </div>

            <div style={{ marginBottom: '28px' }}>
              <label style={labelStyle}>WhatsApp *</label>
              <input
                type="tel"
                value={telefone}
                onChange={e => setTelefone(e.target.value)}
                placeholder="(00) 00000-0000"
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#A8877A'}
                onBlur={(e) => e.target.style.borderColor = '#E5E5E5'}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <motion.button 
                onClick={() => setEtapa(1)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  flex: 1,
                  padding: '18px',
                  background: 'rgba(139, 126, 116, 0.1)',
                  color: '#8B7E74',
                  border: '2px solid #E5E5E5',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                ← Voltar
              </motion.button>

              <motion.button 
                onClick={calcularESalvar}
                disabled={enviando}
                whileHover={{ scale: enviando ? 1 : 1.02 }}
                whileTap={{ scale: enviando ? 1 : 0.98 }}
                style={{
                  flex: 2,
                  padding: '18px',
                  background: enviando 
                    ? '#9B9289' 
                    : 'linear-gradient(135deg, #8B7E74 0%, #A8877A 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '18px',
                  fontWeight: '700',
                  cursor: enviando ? 'not-allowed' : 'pointer',
                  boxShadow: '0 8px 24px rgba(139, 126, 116, 0.3)',
                  transition: 'all 0.3s ease'
                }}
              >
                {enviando ? 'Calculando...' : 'Ver Resultado →'}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ETAPA 3: RESULTADO */}
        {etapa === 3 && (
          <motion.div
            key="etapa3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 style={{ 
              fontSize: 'clamp(22px, 3vw, 28px)', 
              fontWeight: '600', 
              marginBottom: '24px', 
              color: '#8B7E74',
              fontFamily: "'Playfair Display', serif",
              textAlign: 'center'
            }}>
              💰 Seu Valor Estimado
            </h3>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                padding: '32px',
                background: 'linear-gradient(135deg, #8B7E74 0%, #A8877A 100%)',
                borderRadius: '20px',
                marginBottom: '24px',
                textAlign: 'center',
                color: 'white',
                boxShadow: '0 12px 32px rgba(139, 126, 116, 0.3)'
              }}
            >
              <p style={{ fontSize: '16px', marginBottom: '12px', opacity: 0.95 }}>
                {tipo} • {operadora} • {vidas} {vidas === 1 ? 'vida' : 'vidas'}
              </p>
              <p style={{ 
                fontSize: 'clamp(40px, 7vw, 56px)', 
                fontWeight: '700',
                margin: '12px 0',
                fontFamily: "'Playfair Display', serif",
                textShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}>
                R$ {custo.toFixed(2)}
              </p>
              <p style={{ fontSize: '14px', opacity: 0.9 }}>
                valor aproximado/mês
              </p>
            </motion.div>

            <motion.a
              href={`https://wa.me/5521977472141?text=Olá!%20Fiz%20uma%20simulação%20no%20site:%0A${tipo}%20-%20${operadora}%20-%20${vidas}%20vidas%0AValor:%20R$%20${custo.toFixed(2)}%0A%0AGostaria%20de%20mais%20informações!`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                width: '100%',
                padding: '18px',
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(37, 211, 102, 0.3)',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Falar no WhatsApp
            </motion.a>

            <p style={{ 
              marginTop: '20px', 
              fontSize: '13px', 
              color: '#9B9289', 
              textAlign: 'center',
              lineHeight: 1.6
            }}>
              ✨ Entraremos em contato em até 24h com a cotação final!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
