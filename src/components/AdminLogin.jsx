import { useState } from 'react';

export default function AdminLogin({ onLoginSuccess }) {
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(false);

  // ✅ DEFINA SUA SENHA AQUI (altere para algo seguro!)
  const SENHA_CORRETA = 'maisa2025';

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (senha === SENHA_CORRETA) {
      localStorage.setItem('adminAutenticado', 'true');
      onLoginSuccess();
    } else {
      setErro(true);
      setSenha('');
      setTimeout(() => setErro(false), 3000);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #FAF8F5 0%, #F0ECE6 100%)',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '400px',
        width: '100%',
        background: 'white',
        padding: 'clamp(40px, 6vw, 60px)',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(139, 126, 116, 0.15)',
        border: '1px solid rgba(197, 188, 181, 0.2)'
      }}>
        {/* Logo */}
        <div style={{
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          <img 
            src="/logo.png" 
            alt="Logo" 
            style={{ 
              width: '60px', 
              height: '60px',
              marginBottom: '16px'
            }} 
          />
          <h2 style={{
            fontSize: 'clamp(24px, 4vw, 32px)',
            color: '#8B7E74',
            fontWeight: '300',
            margin: '0 0 8px',
            fontFamily: "'Playfair Display', serif"
          }}>
            Área Admin
          </h2>
          <p style={{
            fontSize: '14px',
            color: '#9B9289',
            margin: 0
          }}>
            Digite a senha para acessar
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              color: '#6B6662',
              marginBottom: '8px',
              fontWeight: '500'
            }}>
              Senha de Acesso
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              style={{
                width: '100%',
                padding: '14px 16px',
                fontSize: '15px',
                border: erro ? '2px solid #E74C3C' : '2px solid rgba(197, 188, 181, 0.3)',
                borderRadius: '10px',
                outline: 'none',
                transition: 'all 0.3s ease',
                fontFamily: 'monospace'
              }}
              onFocus={(e) => e.target.style.borderColor = '#A8877A'}
              onBlur={(e) => {
                if (!erro) e.target.style.borderColor = 'rgba(197, 188, 181, 0.3)';
              }}
              autoFocus
            />
            {erro && (
              <p style={{
                fontSize: '13px',
                color: '#E74C3C',
                marginTop: '8px',
                marginBottom: 0
              }}>
                ❌ Senha incorreta. Tente novamente.
              </p>
            )}
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '16px',
              background: 'linear-gradient(135deg, #A8877A 0%, #8B7E74 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 16px rgba(168, 135, 122, 0.3)'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 24px rgba(168, 135, 122, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 16px rgba(168, 135, 122, 0.3)';
            }}
          >
            Entrar 🔒
          </button>
        </form>

        {/* Aviso */}
        <p style={{
          fontSize: '12px',
          color: '#C5BCB5',
          textAlign: 'center',
          marginTop: '24px',
          marginBottom: 0
        }}>
          Acesso restrito apenas para administradores
        </p>
      </div>
    </div>
  );
}
