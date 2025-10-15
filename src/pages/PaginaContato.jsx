import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jdrglgiyyjxyytjcfzbj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkcmdsZ2l5eWp4eXl0amNmemJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNDA2NTQsImV4cCI6MjA3NTkxNjY1NH0.RPoOtFDmxGSscfn1tIET055miHdOW25w0K7vqA7NT98';
const supabase = createClient(supabaseUrl, supabaseKey);

function PaginaContato() {
  const location = useLocation();
  const operadoraSelecionada = location.state?.operadora || '';

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    operadora: operadoraSelecionada,
    mensagem: ''
  });

  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);

    try {
      const { error } = await supabase.from('lead').insert([
        {
          nome: formData.nome,
          email: formData.email,
          telefone: formData.telefone,
          operadora: formData.operadora,
          mensagem: formData.mensagem,
          data_envio: new Date().toISOString()
        }
      ]);

      if (error) {
        console.error('Erro Supabase:', error);
        alert('Erro ao salvar lead: ' + error.message);
        setEnviando(false);
        return;
      }

      const mensagemWhatsApp = `Olá! Gostaria de solicitar uma cotação de plano de saúde.%0A%0ANome: ${formData.nome}%0AEmail: ${formData.email}%0ATelefone: ${formData.telefone}%0AOperadora: ${formData.operadora}%0AMensagem: ${formData.mensagem}`;
      window.open(`https://wa.me/5521977472141?text=${mensagemWhatsApp}`, '_blank');

      setFormData({
        nome: '',
        email: '',
        telefone: '',
        operadora: '',
        mensagem: ''
      });

      alert('Lead salvo com sucesso!');
    } catch (err) {
      console.error('Erro inesperado:', err);
      alert('Erro ao enviar. Tente novamente.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section style={{
      minHeight: '100vh',
      padding: 'clamp(140px, 15vh, 180px) clamp(40px, 8vw, 100px) clamp(80px, 10vh, 120px)',
      background: 'linear-gradient(180deg, #FAF8F5 0%, #F5F2ED 50%, #EDE9E3 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 60px)',
          fontWeight: '300',
          color: '#8B7E74',
          marginBottom: '40px',
          textAlign: 'center',
          fontFamily: "'Playfair Display', serif"
        }}>
          Solicite sua Cotação
        </h1>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          style={{
            background: 'rgba(255, 255, 255, 0.8)',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(139, 126, 116, 0.15)'
          }}
        >
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#8B7E74', marginBottom: '8px' }}>
              Nome Completo *
            </label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '14px 18px',
                fontSize: '16px',
                border: '1px solid rgba(197, 188, 181, 0.3)',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.6)',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#8B7E74', marginBottom: '8px' }}>
              E-mail *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '14px 18px',
                fontSize: '16px',
                border: '1px solid rgba(197, 188, 181, 0.3)',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.6)',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#8B7E74', marginBottom: '8px' }}>
              Telefone *
            </label>
            <input
              type="tel"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '14px 18px',
                fontSize: '16px',
                border: '1px solid rgba(197, 188, 181, 0.3)',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.6)',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#8B7E74', marginBottom: '8px' }}>
              Operadora de Preferência
            </label>
            <select
              name="operadora"
              value={formData.operadora}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '14px 18px',
                fontSize: '16px',
                border: '1px solid rgba(197, 188, 181, 0.3)',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.6)',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="">Selecione uma operadora</option>
              <option value="Unimed">Unimed</option>
              <option value="Bradesco Saúde">Bradesco Saúde</option>
              <option value="SulAmérica">SulAmérica</option>
              <option value="Amil">Amil</option>
              <option value="Outra">Outra</option>
            </select>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#8B7E74', marginBottom: '8px' }}>
              Mensagem
            </label>
            <textarea
              name="mensagem"
              value={formData.mensagem}
              onChange={handleChange}
              rows="4"
              style={{
                width: '100%',
                padding: '14px 18px',
                fontSize: '16px',
                border: '1px solid rgba(197, 188, 181, 0.3)',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.6)',
                outline: 'none',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={enviando}
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '16px',
              fontWeight: '600',
              color: '#FFFFFF',
              background: enviando ? '#ccc' : 'linear-gradient(135deg, #A8877A 0%, #8B7E74 100%)',
              border: 'none',
              borderRadius: '12px',
              cursor: enviando ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            {enviando ? 'Enviando...' : 'Enviar Solicitação →'}
          </button>
        </motion.form>
      </div>
    </section>
  );
}

export default PaginaContato;
