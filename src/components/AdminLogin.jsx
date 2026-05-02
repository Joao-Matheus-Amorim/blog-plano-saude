import { useState } from 'react';

export default function AdminLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: senha }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.token) {
        throw new Error(data.error || 'Credenciais inválidas.');
      }

      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminAutenticado', 'true');
      onLoginSuccess(data.token);
    } catch (error) {
      setErro(error.message || 'Não foi possível entrar.');
      setSenha('');
      setTimeout(() => setErro(''), 4500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login-page">
      <style>{`
        .admin-login-page {
          --bg0: #070d05;
          --bg1: #0d160a;
          --g0: #2d4a24;
          --g1: #4a6b3a;
          --g2: #6b8c52;
          --g3: #8aab6e;
          --g4: #a8c48a;
          --text: #edf8e6;
          --muted: rgba(237, 248, 230, .62);
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: clamp(28px, 6vw, 72px);
          color: var(--text);
          background:
            radial-gradient(circle at 76% 12%, rgba(106, 140, 82, .25), transparent 32rem),
            radial-gradient(circle at 12% 18%, rgba(168, 196, 138, .14), transparent 28rem),
            linear-gradient(180deg, var(--bg0), var(--bg1) 54%, #050805);
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }
        .admin-login-page::before {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background-image:
            linear-gradient(rgba(168, 196, 138, .04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168, 196, 138, .04) 1px, transparent 1px);
          background-size: 54px 54px;
          mask-image: linear-gradient(180deg, rgba(0,0,0,.78), transparent 86%);
        }
        .admin-login-shell {
          width: min(1080px, 100%);
          display: grid;
          grid-template-columns: 1.05fr .95fr;
          gap: clamp(22px, 4vw, 38px);
          position: relative;
          z-index: 1;
        }
        .admin-login-hero,
        .admin-login-card {
          border: 1px solid rgba(168, 196, 138, .28);
          background: linear-gradient(160deg, rgba(45, 74, 36, .30), rgba(13, 22, 10, .74));
          backdrop-filter: blur(30px) saturate(165%);
          -webkit-backdrop-filter: blur(30px) saturate(165%);
          box-shadow: 0 34px 100px rgba(0,0,0,.42), inset 0 1px 0 rgba(255,255,255,.08);
          border-radius: 34px;
          overflow: hidden;
          position: relative;
        }
        .admin-login-hero {
          padding: clamp(34px, 6vw, 62px);
          min-height: 520px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .admin-login-hero::after,
        .admin-login-card::after {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(circle at 26% 8%, rgba(255,255,255,.13), transparent 36%), radial-gradient(circle at 100% 30%, rgba(168,196,138,.14), transparent 34%);
        }
        .admin-badge {
          width: 72px;
          height: 72px;
          border-radius: 24px;
          display: grid;
          place-items: center;
          color: #254623;
          background: radial-gradient(circle at 30% 18%, #fff, rgba(255,252,246,.9) 48%, rgba(168,196,138,.78));
          box-shadow: inset 0 1px 0 rgba(255,255,255,.9), inset 0 -10px 22px rgba(37,70,35,.14), 0 18px 42px rgba(0,0,0,.26);
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 900;
          letter-spacing: -.08em;
          position: relative;
          z-index: 1;
        }
        .admin-login-hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(44px, 7vw, 82px);
          line-height: .9;
          letter-spacing: -.055em;
          margin: 42px 0 20px;
          color: var(--text);
          position: relative;
          z-index: 1;
        }
        .admin-login-hero h1 em { color: var(--g3); font-style: italic; font-weight: 500; }
        .admin-login-hero p {
          color: var(--muted);
          line-height: 1.8;
          max-width: 520px;
          margin: 0;
          position: relative;
          z-index: 1;
        }
        .admin-login-strip {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          position: relative;
          z-index: 1;
        }
        .admin-login-strip span {
          min-height: 66px;
          border: 1px solid rgba(168,196,138,.18);
          border-radius: 20px;
          display: grid;
          place-items: center;
          text-align: center;
          color: rgba(237,248,230,.72);
          background: rgba(168,196,138,.06);
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .1em;
          text-transform: uppercase;
        }
        .admin-login-card { padding: clamp(30px, 5vw, 50px); align-self: stretch; display: flex; flex-direction: column; justify-content: center; }
        .admin-login-card > * { position: relative; z-index: 1; }
        .admin-login-card h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(32px, 4vw, 44px);
          color: var(--text);
          margin: 0 0 10px;
          letter-spacing: -.035em;
        }
        .admin-login-card p { color: var(--muted); line-height: 1.6; margin: 0 0 30px; }
        .admin-field { margin-bottom: 18px; }
        .admin-field label {
          display: block;
          color: rgba(237,248,230,.78);
          font-size: 12px;
          font-weight: 900;
          letter-spacing: .12em;
          text-transform: uppercase;
          margin-bottom: 9px;
        }
        .admin-field input {
          width: 100%;
          min-height: 56px;
          padding: 0 18px;
          border-radius: 18px;
          border: 1px solid ${erro ? 'rgba(231,76,60,.72)' : 'rgba(168,196,138,.28)'};
          background: rgba(5, 8, 5, .46);
          color: var(--text);
          outline: none;
          box-sizing: border-box;
          font-size: 16px;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.06), 0 14px 34px rgba(0,0,0,.18);
          transition: border-color .22s ease, box-shadow .22s ease, background .22s ease;
        }
        .admin-field input:focus {
          border-color: var(--g4);
          background: rgba(5, 8, 5, .62);
          box-shadow: 0 0 0 4px rgba(168,196,138,.10), 0 18px 38px rgba(0,0,0,.25);
        }
        .admin-field input::placeholder { color: rgba(237,248,230,.34); }
        .admin-error {
          padding: 12px 14px;
          border-radius: 16px;
          background: rgba(231,76,60,.10);
          border: 1px solid rgba(231,76,60,.24);
          color: #ffb5ac !important;
          font-size: 13px;
          margin: 4px 0 18px !important;
        }
        .admin-submit {
          width: 100%;
          min-height: 58px;
          border: 1px solid rgba(168,196,138,.42);
          border-radius: 18px;
          color: #eff8e7;
          background: linear-gradient(135deg, var(--g2), var(--g0));
          box-shadow: 0 0 38px rgba(106,140,82,.30), inset 0 1px 0 rgba(255,255,255,.13);
          font-size: 14px;
          font-weight: 900;
          letter-spacing: .1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: transform .22s ease, box-shadow .22s ease, opacity .22s ease;
        }
        .admin-submit:hover { transform: translateY(-2px); box-shadow: 0 18px 48px rgba(0,0,0,.28), 0 0 46px rgba(106,140,82,.36); }
        .admin-submit:disabled { cursor: wait; opacity: .68; transform: none; }
        .admin-login-foot { margin: 22px 0 0 !important; font-size: 12px; text-align: center; color: rgba(237,248,230,.42) !important; }
        @media (max-width: 860px) {
          .admin-login-page { padding: 20px; align-items: start; }
          .admin-login-shell { grid-template-columns: 1fr; }
          .admin-login-hero { min-height: auto; gap: 34px; }
          .admin-login-strip { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="admin-login-shell">
        <div className="admin-login-hero">
          <div>
            <div className="admin-badge">MV</div>
            <h1>Admin <em>Maisa Valentim</em></h1>
            <p>Painel profissional para acompanhar leads, contatos e oportunidades de cotação em uma interface segura e premium.</p>
          </div>
          <div className="admin-login-strip">
            <span>Leads</span>
            <span>Cotações</span>
            <span>Controle</span>
          </div>
        </div>

        <div className="admin-login-card">
          <h2>Acesso restrito</h2>
          <p>Entre com o e-mail e senha definidos nas variáveis de ambiente do projeto.</p>

          <form onSubmit={handleLogin}>
            <div className="admin-field">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@email.com"
                autoComplete="username"
                required
                autoFocus
              />
            </div>

            <div className="admin-field">
              <label>Senha</label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite sua senha"
                autoComplete="current-password"
                required
              />
            </div>

            {erro && <p className="admin-error">❌ {erro}</p>}

            <button className="admin-submit" type="submit" disabled={loading}>
              {loading ? 'Validando acesso...' : 'Entrar no dashboard'}
            </button>
          </form>

          <p className="admin-login-foot">Protegido por sessão administrativa e limite de tentativas.</p>
        </div>
      </section>
    </main>
  );
}
