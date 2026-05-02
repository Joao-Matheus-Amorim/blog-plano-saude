import { useState, useEffect } from 'react';
import AdminLogin from '../components/AdminLogin.jsx';

export default function PaginaAdmin() {
  const [autenticado, setAutenticado] = useState(false);
  const [adminToken, setAdminToken] = useState('');
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const legado = localStorage.getItem('adminAutenticado');

    if (token) {
      setAdminToken(token);
      setAutenticado(true);
      carregarLeads(token);
    } else if (legado === 'true') {
      localStorage.removeItem('adminAutenticado');
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const handleAuthError = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminAutenticado');
    setAdminToken('');
    setAutenticado(false);
    setLoading(false);
  };

  const carregarLeads = async (token = adminToken) => {
    try {
      if (!token) throw new Error('Token admin ausente');

      const res = await fetch('/api/leads/get', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.status === 401) {
        handleAuthError();
        return;
      }

      if (!res.ok) throw new Error('Erro ao buscar leads');
      const data = await res.json();
      setLeads(data || []);
    } catch (error) {
      console.error('Erro ao carregar leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = (token) => {
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminAutenticado', 'true');
    setAdminToken(token);
    setAutenticado(true);
    setLoading(true);
    carregarLeads(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminAutenticado');
    setAdminToken('');
    setAutenticado(false);
  };

  const getLeadDateValue = (lead) => lead.data_envio || lead.created_at || lead.data || null;

  const formatLeadDate = (lead) => {
    const dateValue = getLeadDateValue(lead);
    if (!dateValue) return 'Sem data';
    const date = new Date(dateValue);
    return Number.isNaN(date.getTime()) ? 'Sem data' : date.toLocaleString('pt-BR');
  };

  const isToday = (lead) => {
    const date = new Date(getLeadDateValue(lead));
    const today = new Date();
    return !Number.isNaN(date.getTime()) && date.toDateString() === today.toDateString();
  };

  const isLast7Days = (lead) => {
    const date = new Date(getLeadDateValue(lead));
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return !Number.isNaN(date.getTime()) && date >= weekAgo;
  };

  const deletarLead = async (id) => {
    if (!confirm('Tem certeza que deseja deletar este lead?')) return;

    try {
      const res = await fetch(`/api/leads/delete?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` }
      });

      if (res.status === 401) {
        handleAuthError();
        return;
      }

      if (!res.ok) throw new Error('Erro ao deletar');
      setLeads(leads.filter(lead => lead.id !== id));
    } catch (error) {
      console.error('Erro ao deletar lead:', error);
      alert('Erro ao deletar lead');
    }
  };

  const exportarCSV = () => {
    const csv = [
      ['Nome', 'Email', 'Telefone', 'Operadora', 'Mensagem', 'Vidas', 'Data'],
      ...leads.map(lead => [
        lead.nome || '',
        lead.email || '',
        lead.telefone || '',
        lead.operadora || '',
        lead.mensagem || '',
        lead.vidas || '',
        formatLeadDate(lead)
      ])
    ].map(row => row.map(item => `"${String(item).replaceAll('"', '""')}"`).join(';')).join('\n');

    const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads_${new Date().toLocaleDateString('pt-BR').replaceAll('/', '-')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const leadsFiltrados = leads.filter(lead =>
    lead.nome?.toLowerCase().includes(busca.toLowerCase()) ||
    lead.email?.toLowerCase().includes(busca.toLowerCase()) ||
    lead.telefone?.includes(busca) ||
    lead.operadora?.toLowerCase().includes(busca.toLowerCase())
  );

  const stats = [
    ['Total de leads', leads.length, 'Base completa'],
    ['Hoje', leads.filter(isToday).length, 'Novas entradas'],
    ['Últimos 7 dias', leads.filter(isLast7Days).length, 'Volume recente'],
    ['Filtrados', leadsFiltrados.length, 'Resultado atual']
  ];

  if (!autenticado) return <AdminLogin onLoginSuccess={handleLoginSuccess} />;

  return (
    <main className="admin-dashboard-page">
      <style>{`
        .admin-dashboard-page {
          --bg0: #070d05;
          --bg1: #0d160a;
          --g0: #2d4a24;
          --g1: #4a6b3a;
          --g2: #6b8c52;
          --g3: #8aab6e;
          --g4: #a8c48a;
          --text: #edf8e6;
          --muted: rgba(237,248,230,.62);
          min-height: 100vh;
          color: var(--text);
          background: radial-gradient(circle at 78% 8%, rgba(106,140,82,.24), transparent 34rem), radial-gradient(circle at 6% 18%, rgba(168,196,138,.13), transparent 30rem), linear-gradient(180deg, var(--bg0), var(--bg1) 54%, #050805);
          position: relative;
          overflow: hidden;
          padding: clamp(112px, 12vw, 148px) clamp(18px, 4vw, 52px) clamp(60px, 8vw, 96px);
        }
        .admin-dashboard-page::before {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          background-image: linear-gradient(rgba(168,196,138,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(168,196,138,.04) 1px, transparent 1px);
          background-size: 54px 54px;
          mask-image: linear-gradient(180deg, rgba(0,0,0,.76), transparent 84%);
        }
        .admin-shell { max-width: 1440px; margin: 0 auto; position: relative; z-index: 1; }
        .admin-topbar {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 22px;
          align-items: end;
          margin-bottom: 26px;
        }
        .admin-kicker { color: var(--g3); font-size: 12px; font-weight: 900; letter-spacing: .18em; text-transform: uppercase; margin-bottom: 14px; }
        .admin-title { font-family: 'Playfair Display', serif; font-size: clamp(42px, 6vw, 78px); line-height: .92; letter-spacing: -.055em; margin: 0 0 12px; }
        .admin-title em { color: var(--g3); font-style: italic; font-weight: 500; }
        .admin-sub { color: var(--muted); margin: 0; line-height: 1.7; max-width: 680px; }
        .admin-actions { display: flex; flex-wrap: wrap; gap: 12px; justify-content: flex-end; }
        .admin-btn {
          min-height: 48px;
          padding: 0 20px;
          border-radius: 999px;
          border: 1px solid rgba(168,196,138,.34);
          color: #eff8e7;
          background: linear-gradient(135deg, var(--g2), var(--g0));
          box-shadow: 0 0 28px rgba(106,140,82,.24), inset 0 1px 0 rgba(255,255,255,.13);
          font-size: 12px;
          font-weight: 900;
          letter-spacing: .08em;
          text-transform: uppercase;
          cursor: pointer;
        }
        .admin-btn.danger { background: linear-gradient(135deg, #b8453b, #6f1f1a); border-color: rgba(255,149,140,.28); box-shadow: 0 0 26px rgba(184,69,59,.22); }
        .admin-panel, .admin-card, .admin-table-wrap, .admin-empty {
          border: 1px solid rgba(168,196,138,.24);
          background: linear-gradient(160deg, rgba(45,74,36,.30), rgba(13,22,10,.74));
          backdrop-filter: blur(30px) saturate(160%);
          -webkit-backdrop-filter: blur(30px) saturate(160%);
          box-shadow: 0 28px 90px rgba(0,0,0,.36), inset 0 1px 0 rgba(255,255,255,.08);
          position: relative;
          overflow: hidden;
        }
        .admin-panel::before, .admin-card::before, .admin-table-wrap::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(circle at 18% 0%, rgba(168,196,138,.13), transparent 34%);
        }
        .admin-panel { border-radius: 32px; padding: clamp(20px, 3vw, 28px); margin-bottom: 22px; }
        .admin-search-row { display: grid; grid-template-columns: 1fr auto; gap: 14px; align-items: center; position: relative; z-index: 1; }
        .admin-search {
          width: 100%;
          min-height: 58px;
          border-radius: 20px;
          border: 1px solid rgba(168,196,138,.28);
          background: rgba(5,8,5,.46);
          color: var(--text);
          outline: none;
          padding: 0 20px;
          font-size: 16px;
          box-sizing: border-box;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.06);
        }
        .admin-search::placeholder { color: rgba(237,248,230,.38); }
        .admin-refresh { white-space: nowrap; }
        .admin-stats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin-bottom: 22px; }
        .admin-card { border-radius: 28px; padding: 24px; min-height: 138px; }
        .admin-card > * { position: relative; z-index: 1; }
        .admin-card span { color: var(--muted); font-size: 11px; font-weight: 900; letter-spacing: .12em; text-transform: uppercase; }
        .admin-card strong { display: block; color: var(--g3); font-family: 'Playfair Display', serif; font-size: clamp(38px, 5vw, 58px); line-height: 1; margin: 18px 0 8px; }
        .admin-card small { color: rgba(237,248,230,.48); }
        .admin-table-wrap { border-radius: 32px; overflow: hidden; }
        .admin-table-head {
          display: flex;
          justify-content: space-between;
          gap: 18px;
          align-items: center;
          padding: 22px 24px;
          border-bottom: 1px solid rgba(168,196,138,.16);
          position: relative;
          z-index: 1;
        }
        .admin-table-head h2 { margin: 0; font-size: 22px; color: var(--text); }
        .admin-table-head p { margin: 4px 0 0; color: var(--muted); font-size: 13px; }
        .admin-table-scroll { overflow-x: auto; position: relative; z-index: 1; }
        .admin-table { width: 100%; border-collapse: collapse; min-width: 940px; }
        .admin-table th {
          text-align: left;
          padding: 18px 18px;
          color: rgba(237,248,230,.62);
          font-size: 11px;
          letter-spacing: .12em;
          text-transform: uppercase;
          border-bottom: 1px solid rgba(168,196,138,.14);
          background: rgba(5,8,5,.24);
        }
        .admin-table td {
          padding: 18px;
          color: rgba(237,248,230,.78);
          border-bottom: 1px solid rgba(168,196,138,.10);
          font-size: 14px;
          vertical-align: top;
        }
        .admin-table tbody tr:hover { background: rgba(168,196,138,.055); }
        .admin-name { color: #fff; font-weight: 800; display: block; margin-bottom: 4px; }
        .admin-email { color: rgba(237,248,230,.48); font-size: 12px; }
        .admin-chip {
          display: inline-flex;
          align-items: center;
          min-height: 30px;
          padding: 0 12px;
          border-radius: 999px;
          background: rgba(168,196,138,.08);
          border: 1px solid rgba(168,196,138,.20);
          color: var(--g4);
          font-size: 12px;
          font-weight: 800;
        }
        .admin-message { max-width: 280px; color: rgba(237,248,230,.58); line-height: 1.55; }
        .admin-delete {
          min-height: 38px;
          padding: 0 14px;
          border: 1px solid rgba(255,149,140,.28);
          border-radius: 14px;
          color: #ffd5d1;
          background: rgba(184,69,59,.14);
          cursor: pointer;
          font-weight: 800;
        }
        .admin-empty { border-radius: 32px; padding: 60px 24px; text-align: center; color: var(--muted); }
        .admin-empty strong { display: block; color: var(--g3); font-size: 28px; margin-bottom: 10px; }
        @media (max-width: 980px) {
          .admin-topbar { grid-template-columns: 1fr; }
          .admin-actions { justify-content: flex-start; }
          .admin-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 620px) {
          .admin-dashboard-page { padding-left: 16px; padding-right: 16px; }
          .admin-actions, .admin-search-row { display: grid; grid-template-columns: 1fr; }
          .admin-btn { width: 100%; }
          .admin-stats { grid-template-columns: 1fr; }
          .admin-card { min-height: 112px; }
          .admin-table-head { display: block; }
        }
      `}</style>

      <div className="admin-shell">
        <header className="admin-topbar">
          <div>
            <div className="admin-kicker">Dashboard seguro</div>
            <h1 className="admin-title">Painel de <em>leads</em></h1>
            <p className="admin-sub">Central profissional para acompanhar cotações, contatos e oportunidades capturadas pelo site.</p>
          </div>

          <div className="admin-actions">
            <button className="admin-btn" onClick={exportarCSV}>Exportar CSV</button>
            <button className="admin-btn danger" onClick={handleLogout}>Sair</button>
          </div>
        </header>

        <section className="admin-panel">
          <div className="admin-search-row">
            <input
              className="admin-search"
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por nome, e-mail, telefone ou operadora..."
            />
            <button className="admin-btn admin-refresh" onClick={() => carregarLeads()}>Atualizar</button>
          </div>
        </section>

        <section className="admin-stats">
          {stats.map(([label, value, hint]) => (
            <div className="admin-card" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{hint}</small>
            </div>
          ))}
        </section>

        <section className="admin-table-wrap">
          <div className="admin-table-head">
            <div>
              <h2>Leads recebidos</h2>
              <p>{loading ? 'Carregando dados...' : `${leadsFiltrados.length} registro(s) encontrado(s)`}</p>
            </div>
          </div>

          {loading ? (
            <div className="admin-empty"><strong>Carregando...</strong><span>Buscando leads no banco de dados.</span></div>
          ) : leadsFiltrados.length === 0 ? (
            <div className="admin-empty"><strong>Nenhum lead encontrado</strong><span>{busca ? 'Tente ajustar a busca.' : 'Os novos contatos aparecerão aqui.'}</span></div>
          ) : (
            <div className="admin-table-scroll">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Telefone</th>
                    <th>Operadora</th>
                    <th>Vidas</th>
                    <th>Mensagem</th>
                    <th>Data</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {leadsFiltrados.map((lead) => (
                    <tr key={lead.id}>
                      <td>
                        <span className="admin-name">{lead.nome || 'Sem nome'}</span>
                        <span className="admin-email">{lead.email || 'Sem e-mail'}</span>
                      </td>
                      <td>{lead.telefone || '-'}</td>
                      <td><span className="admin-chip">{lead.operadora || 'Não informado'}</span></td>
                      <td>{lead.vidas || '-'}</td>
                      <td><div className="admin-message">{lead.mensagem || '-'}</div></td>
                      <td>{formatLeadDate(lead)}</td>
                      <td><button className="admin-delete" onClick={() => deletarLead(lead.id)}>Deletar</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
