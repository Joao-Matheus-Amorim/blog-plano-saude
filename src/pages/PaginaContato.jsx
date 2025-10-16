import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// ✅ CREDENCIAIS SUPABASE
const supabaseUrl = "https://jdrglgivyjxvytjcfzbj.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkcmdsZ2l2eWp4dnl0amNmemJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk1NTEwMjMsImV4cCI6MjA0NTEyNzAyM30.W5enb8d52I25enhSDo4-mJQY6QOj5hBKKs6hPB9zQWU";

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

    if (!formData.nome || !formData.email || !formData.telefone) {
      setError('Preencha todos os campos obrigatórios');
      setLoading(false);
      return;
    }

    console.log('📤 Enviando para tabela: lead');

    try {
      // ✅ INCLUIR operadora e data_envio
      const { data, error: insertError } = await supabase
        .from('lead')
        .insert([
          {
            nome: formData.nome,
            email: formData.email,
            telefone: formData.telefone,
            operadora: null, // ✅ Pode ser null
            mensagem: formData.mensagem || '',
            data_envio: new Date().toISOString() // ✅ Data atual
          }
        ])
        .select();

      if (insertError) {
        console.error('❌ Erro:', insertError);
        throw new Error(insertError.message);
      }

      console.log('✅ Lead salvo com sucesso:', data);
      
      const nomeAtual = formData.nome;
      setSuccess(true);
      setFormData({ nome: '', email: '', telefone: '', mensagem: '' });
      
      setTimeout(() => {
        window.open(
          `https://wa.me/5521977472141?text=${encodeURIComponent(`Olá! Meu nome é ${nomeAtual}. Acabei de preencher o formulário no site.`)}`,
          '_blank'
        );
      }, 2000);

    } catch (err) {
      console.error('❌ Erro completo:', err);
      setError(err.message || 'Erro ao enviar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%)',
      padding: 'clamp(60px, 10vw, 120px) clamp(20px, 5vw, 60px)'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
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
              ✅ Mensagem enviada com sucesso! Redirecionando para o WhatsApp...
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
            onMouseOver={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 36px rgba(139, 126, 116, 0.4)';
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 28px rgba(139, 126, 116, 0.3)';
            }}
          >
            {loading ? '⏳ Enviando...' : '📩 Enviar Mensagem →'}
          </button>
        </form>

        {/* OUTRAS FORMAS DE CONTATO */}
        <div style={{
          marginTop: '60px',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '24px',
            fontWeight: '500',
            color: '#2D3748',
            marginBottom: '32px',
            fontFamily: "'Playfair Display', serif"
          }}>
            Ou fale conosco diretamente
          </h3>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            maxWidth: '400px',
            margin: '0 auto'
          }}>
            {/* WhatsApp */}
            <a
              href="https://wa.me/5521977472141"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                padding: '16px 32px',
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                color: '#FFFFFF',
                textDecoration: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 24px rgba(37, 211, 102, 0.3)',
                minHeight: '56px'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>

            {/* Email */}
            <a
              href="mailto:maisarvalentim@gmail.com"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                padding: '16px 32px',
                background: 'linear-gradient(135deg, #A8877A 0%, #8B7E74 100%)',
                color: '#FFFFFF',
                textDecoration: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 24px rgba(168, 135, 122, 0.3)',
                minHeight: '56px'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              E-mail
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
