import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// ✅ CREDENCIAIS SUPABASE (SUBSTITUA COM AS SUAS REAIS)
const supabaseUrl = "https://jdrglgivyjxvytjcfzbj.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkcmdsZ2l2eWp4dnl0amNmemJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk1NTEwMjMsImV4cCI6MjA0NTEyNzAyM30.W5enb8d52I25enhSDo4-mJQY6QOj5hBKKs6hPB9zQWU"; // ← COLOQUE A KEY COMPLETA AQUI

const supabase = createClient(supabaseUrl, supabaseKey);

export default function PaginaContato() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    mensagem: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    // ✅ VALIDAÇÃO
    if (!formData.nome || !formData.email || !formData.telefone) {
      setError('Por favor, preencha todos os campos obrigatórios');
      setLoading(false);
      return;
    }

    console.log('📤 Enviando dados para o Supabase:', formData);

    try {
      // ✅ TESTE DE CONEXÃO
      const { data: testConnection, error: connectionError } = await supabase
        .from('leads')
        .select('count')
        .limit(1);

      if (connectionError) {
        console.error('❌ Erro de conexão:', connectionError);
        throw new Error(`Erro de conexão: ${connectionError.message}`);
      }

      console.log('✅ Conexão OK');

      // ✅ INSERIR LEAD
      const { data, error: insertError } = await supabase
        .from('leads')
        .insert([
          {
            nome: formData.nome,
            email: formData.email,
            telefone: formData.telefone,
            mensagem: formData.mensagem || ''
          }
        ])
        .select();

      if (insertError) {
        console.error('❌ Erro ao inserir:', insertError);
        throw insertError;
      }

      console.log('✅ Lead salvo com sucesso:', data);
      
      setSuccess(true);
      
      // ✅ LIMPAR FORMULÁRIO
      setFormData({ nome: '', email: '', telefone: '', mensagem: '' });
      
      // ✅ REDIRECIONAR PARA WHATSAPP
      setTimeout(() => {
        const msg = `Olá! Acabei de preencher o formulário no site. Meu nome é ${formData.nome}.`;
        window.open(
          `https://wa.me/5521977472141?text=${encodeURIComponent(msg)}`,
          '_blank'
        );
      }, 2000);

    } catch (err) {
      console.error('❌ Erro completo:', err);
      setError(`Erro: ${err.message || 'Tente novamente mais tarde'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%)',
      padding: 'clamp(60px, 10vw, 120px) clamp(20px, 5vw, 60px)'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {/* TÍTULO */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: '300',
            color: '#2D3748',
            marginBottom: '16px',
            fontFamily: "'Playfair Display', serif"
          }}>
            Entre em Contato
          </h1>
          <p style={{
            fontSize: 'clamp(16px, 2vw, 18px)',
            color: '#6B6662',
            lineHeight: 1.8
          }}>
            Preencha o formulário e receba uma cotação personalizada
          </p>
        </div>

        {/* FORMULÁRIO */}
        <form onSubmit={handleSubmit} style={{
          background: '#FFFFFF',
          padding: 'clamp(40px, 6vw, 60px)',
          borderRadius: '24px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(197, 188, 181, 0.2)'
        }}>
          {/* Nome */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              color: '#2D3748',
              fontWeight: '600',
              marginBottom: '12px'
            }}>
              Nome Completo *
            </label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              placeholder="Digite seu nome completo"
              style={{
                width: '100%',
                padding: '16px 20px',
                fontSize: '16px',
                border: '2px solid rgba(197, 188, 181, 0.3)',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#A8877A'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(197, 188, 181, 0.3)'}
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              color: '#2D3748',
              fontWeight: '600',
              marginBottom: '12px'
            }}>
              E-mail *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="seu@email.com"
              style={{
                width: '100%',
                padding: '16px 20px',
                fontSize: '16px',
                border: '2px solid rgba(197, 188, 181, 0.3)',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#A8877A'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(197, 188, 181, 0.3)'}
            />
          </div>

          {/* Telefone */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              color: '#2D3748',
              fontWeight: '600',
              marginBottom: '12px'
            }}>
              Telefone/WhatsApp *
            </label>
            <input
              type="tel"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              required
              placeholder="(21) 97747-2141"
              style={{
                width: '100%',
                padding: '16px 20px',
                fontSize: '16px',
                border: '2px solid rgba(197, 188, 181, 0.3)',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#A8877A'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(197, 188, 181, 0.3)'}
            />
          </div>

          {/* Mensagem */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              color: '#2D3748',
              fontWeight: '600',
              marginBottom: '12px'
            }}>
              Mensagem
            </label>
            <textarea
              name="mensagem"
              value={formData.mensagem}
              onChange={handleChange}
              rows="5"
              placeholder="Conte-nos sobre suas necessidades..."
              style={{
                width: '100%',
                padding: '16px 20px',
                fontSize: '16px',
                border: '2px solid rgba(197, 188, 181, 0.3)',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                resize: 'vertical',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#A8877A'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(197, 188, 181, 0.3)'}
            />
          </div>

          {/* SUCESSO */}
          {success && (
            <div style={{
              padding: '16px',
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '12px',
              marginBottom: '24px',
              color: '#15803d',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              ✅ Mensagem enviada com sucesso! Redirecionando...
            </div>
          )}

          {/* ERRO */}
          {error && (
            <div style={{
              padding: '16px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '12px',
              marginBottom: '24px',
              color: '#dc2626',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              ❌ {error}
            </div>
          )}

          {/* BOTÃO */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '18px 32px',
              fontSize: '16px',
              fontWeight: '600',
              color: '#FFFFFF',
              background: loading 
                ? 'linear-gradient(135deg, #9B9289 0%, #8B7E74 100%)'
                : 'linear-gradient(135deg, #8B7E74 0%, #A8877A 100%)',
              border: 'none',
              borderRadius: '12px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 28px rgba(139, 126, 116, 0.3)',
              minHeight: '56px'
            }}
          >
            {loading ? '⏳ Enviando...' : '📩 Enviar Mensagem →'}
          </button>
        </form>
      </div>
    </div>
  );
}
