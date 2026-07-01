import { useEffect, useMemo, useState } from 'react';
import AdminLogin from '../components/AdminLogin.jsx';

function labelAction(action = '') {
  const labels = {
    page_view: 'Visitas',
    form_submit: 'Formulários',
    whatsapp_click: 'Cliques WhatsApp',
    link_click: 'Cliques em links',
  };
  return labels[action] || action || 'Ação';
}

function groupBySource(rows = []) {
  const map = new Map();

  rows.forEach((row) => {
    const key = `${row.source_tag || 'site_organico'}|${row.source_channel || 'Direto/orgânico'}`;
    const current = map.get(key) || {
      source_tag: row.source_tag || 'site_organico',
      source_channel: row.source_channel || 'Direto/orgânico',
      page_view: 0,
      form_submit: 0,
      whatsapp_click: 0,
      total: 0,
    };

    current[row.action_type] = (current[row.action_type] || 0) + Number(row.total || 0);
    current.total += Number(row.total || 0);
    map.set(key, current);
  });

  return Array.from(map.values()).sort((a, b) => b.total - a.total);
}

export default function PaginaAdminOrganico() {
  const [autenticado, setAutenticado] = useState(false);
  const [adminToken, setAdminToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(7);
  const [metrics, setMetrics] = useState({ bySource: [], byPage: [], byAction: [], recent: [] });

  const authHeaders = (token = adminToken) => ({ Authorization: `Bearer ${token}` });

  const handleAuthError = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminAutenticado');
    setAdminToken('');
    setAutenticado(false);
    setLoading(false);
  };

  const carregarMetricas = async (token = adminToken, period = days) => {
    try {
      if (!token) throw new Error('Token admin ausente');
      setLoading(true);
      const res = await fetch(`/api/organic/get?days=${period}`, { headers: authHeaders(token) });
      if (res.status === 401) return handleAuthError();
      if (!res.ok) throw new Error('Erro ao buscar métricas orgânicas');
      const data = await res.json();
      setMetrics(data || { bySource: [], byPage: [], byAction: [], recent: [] });
    } catch (error) {
      console.error('Erro ao carregar métricas orgânicas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const legado = localStorage.getItem('adminAutenticado');

    if (token) {
      setAdminToken(token);
      setAutenticado(true);
      carregarMetricas(token, days);
    } else if (legado === 'true') {
      localStorage.removeItem('adminAutenticado');
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const handleLoginSuccess = (token) => {
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminAutenticado', 'true');
    setAdminToken(token);
    setAutenticado(true);
    carregarMetricas(token, days);
  };

  const handlePeriodChange = (value) => {
    const period = Number(value);
    setDays(period);
    carregarMetricas(adminToken, period);
  };

  const sourceRows = useMemo(() => groupBySource(metrics.bySource), [metrics.bySource]);
  const visits = metrics.byAction.find((item) => item.action_type === 'page_view')?.total || 0;
  const forms = metrics.byAction.find((item) => item.action_type === 'form_submit')?.total || 0;
  const whatsapp = metrics.byAction.find((item) => item.action_type === 'whatsapp_click')?.total || 0;
  const conversion = visits ? `${Math.round((forms / visits) * 100)}%` : '0%';

  if (!autenticado) return <AdminLogin onLoginSuccess={handleLoginSuccess} />;

  return (
    <main className="admin-organic-page">
      <style>{`
        .admin-organic-page { --bg0: #070d05; --bg1: #0d160a; --g0: #2d4a24; --g2: #6b8c52; --g3: #a8c48a; --text: #edf8e6; --muted: rgba(237,248,230,.62); min-height: 100vh; color: var(--text); background: radial-gradient(circle at 78% 8%, rgba(106,140,82,.24), transparent 34rem), linear-gradient(180deg, var(--bg0), var(--bg1)); padding: clamp(112px, 12vw, 148px) clamp(18px, 4vw, 52px) clamp(60px, 8vw, 96px); }
        .organic-shell { max-width: 1440px; margin: 0 auto; }
        .organic-topbar { display: grid; grid-template-columns: 1fr auto; gap: 22px; align-items: end; margin-bottom: 22px; }
        .organic-title { font-family: 'Playfair Display', serif; font-size: clamp(42px, 6vw, 78px); line-height: .92; letter-spacing: -.055em; margin: 0 0 12px; }
        .organic-title em { color: var(--g3); font-style: italic; font-weight: 500; }
        .organic-sub { color: var(--muted); margin: 0; line-height: 1.7; max-width: 760px; }
        .organic-actions { display: flex; flex-wrap: wrap; gap: 10px; justify-content: flex-end; }
        .organic-btn, .organic-select { min-height: 42px; padding: 0 16px; border-radius: 999px; border: 1px solid rgba(168,196,138,.34); color: #eff8e7; background: linear-gradient(135deg, var(--g2), var(--g0)); font-size: 12px; font-weight: 900; letter-spacing: .06em; text-transform: uppercase; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; }
        .organic-select { background: rgba(5,8,5,.46); }
        .organic-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin-bottom: 22px; }
        .organic-card, .organic-panel { border: 1px solid rgba(168,196,138,.24); background: linear-gradient(160deg, rgba(45,74,36,.30), rgba(13,22,10,.74)); box-shadow: 0 28px 90px rgba(0,0,0,.26), inset 0 1px 0 rgba(255,255,255,.08); }
        .organic-card { border-radius: 28px; padding: 24px; min-height: 126px; }
        .organic-card span, .organic-label { color: var(--muted); font-size: 11px; font-weight: 900; letter-spacing: .12em; text-transform: uppercase; }
        .organic-card strong { display: block; color: var(--g3); font-family: 'Playfair Display', serif; font-size: clamp(36px, 5vw, 54px); line-height: 1; margin: 18px 0 8px; }
        .organic-card small, .organic-muted { color: rgba(237,248,230,.48); }
        .organic-panel { border-radius: 32px; overflow: hidden; margin-bottom: 22px; }
        .organic-head { padding: 22px 24px; border-bottom: 1px solid rgba(168,196,138,.16); }
        .organic-head h2 { margin: 0; font-size: 22px; }
        .organic-head p { margin: 4px 0 0; color: var(--muted); font-size: 13px; line-height: 1.6; }
        .organic-table-wrap { overflow-x: auto; }
        .organic-table { width: 100%; min-width: 840px; border-collapse: collapse; }
        .organic-table th { text-align: left; padding: 18px; color: rgba(237,248,230,.62); font-size: 11px; letter-spacing: .12em; text-transform: uppercase; border-bottom: 1px solid rgba(168,196,138,.14); background: rgba(5,8,5,.24); }
        .organic-table td { padding: 18px; color: rgba(237,248,230,.78); border-bottom: 1px solid rgba(168,196,138,.10); font-size: 14px; vertical-align: top; }
        .organic-name { color: #fff; font-weight: 900; display: block; margin-bottom: 4px; }
        .organic-chip { display: inline-flex; align-items: center; min-height: 30px; padding: 0 12px; border-radius: 999px; background: rgba(168,196,138,.08); border: 1px solid rgba(168,196,138,.20); color: var(--g3); font-size: 12px; font-weight: 800; }
        .organic-empty { padding: 60px 24px; text-align: center; color: var(--muted); }
        @media (max-width: 980px) { .organic-topbar { grid-template-columns: 1fr; } .organic-actions { justify-content: flex-start; } .organic-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 620px) { .organic-grid { grid-template-columns: 1fr; } .organic-btn, .organic-select { width: 100%; justify-content: center; } }
      `}</style>

      <div className="organic-shell">
        <header className="organic-topbar">
          <div>
            <h1 className="organic-title">Radar <em>orgânico</em></h1>
            <p className="organic-sub">Métricas agregadas de visitas, formulários e cliques no WhatsApp por origem gratuita. Não identifica visitante anônimo.</p>
          </div>
          <div className="organic-actions">
            <select className="organic-select" value={days} onChange={(event) => handlePeriodChange(event.target.value)}>
              <option value="1">Hoje</option>
              <option value="7">7 dias</option>
              <option value="30">30 dias</option>
              <option value="90">90 dias</option>
            </select>
            <button className="organic-btn" onClick={() => carregarMetricas()}>Atualizar</button>
            <a className="organic-btn" href="/admin">Voltar ao CRM</a>
          </div>
        </header>

        <section className="organic-grid">
          <div className="organic-card"><span>Visitas</span><strong>{visits}</strong><small>page_view</small></div>
          <div className="organic-card"><span>Formulários</span><strong>{forms}</strong><small>form_submit</small></div>
          <div className="organic-card"><span>WhatsApp direto</span><strong>{whatsapp}</strong><small>whatsapp_click</small></div>
          <div className="organic-card"><span>Conversão bruta</span><strong>{conversion}</strong><small>formulário / visita</small></div>
        </section>

        <section className="organic-panel">
          <div className="organic-head"><h2>Origem orgânica</h2><p>Mostra quais etiquetas grátis estão trazendo movimento.</p></div>
          {loading ? <div className="organic-empty">Carregando métricas...</div> : sourceRows.length === 0 ? <div className="organic-empty">Ainda sem resumo orgânico.</div> : (
            <div className="organic-table-wrap"><table className="organic-table"><thead><tr><th>Origem</th><th>Canal</th><th>Visitas</th><th>Formulários</th><th>WhatsApp</th><th>Total</th></tr></thead><tbody>{sourceRows.map((row) => <tr key={`${row.source_tag}-${row.source_channel}`}><td><span className="organic-name">{row.source_tag}</span></td><td><span className="organic-chip">{row.source_channel}</span></td><td>{row.page_view || 0}</td><td>{row.form_submit || 0}</td><td>{row.whatsapp_click || 0}</td><td>{row.total}</td></tr>)}</tbody></table></div>
          )}
        </section>

        <section className="organic-panel">
          <div className="organic-head"><h2>Páginas e intenção</h2><p>Mostra quais páginas atraem mais atenção no período.</p></div>
          {metrics.byPage.length === 0 ? <div className="organic-empty">Nenhuma página registrada.</div> : (
            <div className="organic-table-wrap"><table className="organic-table"><thead><tr><th>Página</th><th>Tipo</th><th>Ação</th><th>Total</th></tr></thead><tbody>{metrics.byPage.slice(0, 40).map((row, index) => <tr key={`${row.page_path}-${row.action_type}-${index}`}><td><span className="organic-name">{row.page_path}</span></td><td>{row.plan_type || '-'}</td><td>{labelAction(row.action_type)}</td><td>{row.total}</td></tr>)}</tbody></table></div>
          )}
        </section>

        <section className="organic-panel">
          <div className="organic-head"><h2>Eventos recentes agregados</h2><p>Linhas resumidas por dia, origem, página e ação.</p></div>
          {metrics.recent.length === 0 ? <div className="organic-empty">Nenhum evento agregado recente.</div> : (
            <div className="organic-table-wrap"><table className="organic-table"><thead><tr><th>Dia</th><th>Ação</th><th>Origem</th><th>Página</th><th>Alvo</th><th>Total</th></tr></thead><tbody>{metrics.recent.map((row, index) => <tr key={`${row.summary_day}-${row.action_type}-${index}`}><td>{row.summary_day}</td><td>{labelAction(row.action_type)}</td><td>{row.source_tag || '-'}</td><td>{row.page_path || '-'}</td><td>{row.target_key || '-'}</td><td>{row.total}</td></tr>)}</tbody></table></div>
          )}
        </section>
      </div>
    </main>
  );
}
