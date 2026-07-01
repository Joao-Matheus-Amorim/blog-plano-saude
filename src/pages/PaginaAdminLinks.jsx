import { useEffect, useMemo, useState } from 'react';
import AdminLogin from '../components/AdminLogin.jsx';

function groupLinkRows(rows = []) {
  const map = new Map();

  rows.forEach((row) => {
    const page = row.page_path || '/';
    const source = row.source_tag || 'site_organico';
    const key = `${page}|${source}`;
    const current = map.get(key) || {
      page_path: page,
      source_tag: source,
      plan_type: row.plan_type || 'Plano de saúde',
      page_view: 0,
      form_submit: 0,
      whatsapp_click: 0,
      total: 0,
      score: 0,
    };

    const amount = Number(row.total || 0);
    current[row.action_type] = (current[row.action_type] || 0) + amount;
    current.total += amount;
    current.score = current.form_submit * 50 + current.whatsapp_click * 35 + current.page_view * 2;
    map.set(key, current);
  });

  return Array.from(map.values()).sort((a, b) => b.score - a.score || b.total - a.total);
}

function percent(part, total) {
  if (!total) return '0%';
  return `${Math.round((part / total) * 100)}%`;
}

function channelLabel(sourceTag = '') {
  const tag = sourceTag.toLowerCase();
  if (tag.includes('whatsapp')) return 'WhatsApp Status';
  if (tag.includes('instagram')) return 'Instagram Bio';
  if (tag.includes('google')) return 'Google Perfil';
  if (tag.includes('facebook') || tag.includes('grupo')) return 'Grupos locais';
  if (tag.includes('radar')) return 'Radarplan B2B';
  return 'Orgânico geral';
}

function copyText(text, setCopied) {
  navigator.clipboard?.writeText(text).then(() => setCopied(text)).catch(() => setCopied(text));
}

export default function PaginaAdminLinks() {
  const [autenticado, setAutenticado] = useState(false);
  const [adminToken, setAdminToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(7);
  const [metrics, setMetrics] = useState({ byPage: [], bySource: [], byAction: [], topJourneys: [] });
  const [copied, setCopied] = useState('');

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
      if (!res.ok) throw new Error('Erro ao buscar ranking de links');
      const data = await res.json();
      setMetrics(data || { byPage: [], bySource: [], byAction: [], topJourneys: [] });
    } catch (error) {
      console.error('Erro ao carregar ranking de links:', error);
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

  const ranking = useMemo(() => groupLinkRows(metrics.byPage), [metrics.byPage]);
  const topLink = ranking[0];
  const topOrigin = useMemo(() => {
    const map = new Map();
    (metrics.bySource || []).forEach((row) => {
      const source = row.source_tag || 'site_organico';
      const current = map.get(source) || { source_tag: source, visits: 0, forms: 0, whatsapp: 0, score: 0 };
      const amount = Number(row.total || 0);
      if (row.action_type === 'page_view') current.visits += amount;
      if (row.action_type === 'form_submit') current.forms += amount;
      if (row.action_type === 'whatsapp_click') current.whatsapp += amount;
      current.score = current.forms * 50 + current.whatsapp * 35 + current.visits * 2;
      map.set(source, current);
    });
    return Array.from(map.values()).sort((a, b) => b.score - a.score)[0];
  }, [metrics.bySource]);

  if (!autenticado) return <AdminLogin onLoginSuccess={handleLoginSuccess} />;

  return (
    <main className="admin-links-page">
      <style>{`
        .admin-links-page { --bg0: #070d05; --bg1: #0d160a; --g0: #2d4a24; --g2: #6b8c52; --g3: #a8c48a; --text: #edf8e6; --muted: rgba(237,248,230,.62); min-height: 100vh; color: var(--text); background: radial-gradient(circle at 80% 8%, rgba(106,140,82,.24), transparent 34rem), linear-gradient(180deg, var(--bg0), var(--bg1)); padding: clamp(112px, 12vw, 148px) clamp(18px, 4vw, 52px) 86px; }
        .links-admin-shell { max-width: 1440px; margin: 0 auto; }
        .links-admin-topbar { display: grid; grid-template-columns: 1fr auto; gap: 22px; align-items: end; margin-bottom: 22px; }
        .links-admin-title { font-family: 'Playfair Display', serif; font-size: clamp(42px, 6vw, 78px); line-height: .92; letter-spacing: -.055em; margin: 0 0 12px; }
        .links-admin-title em { color: var(--g3); font-style: italic; font-weight: 500; }
        .links-admin-sub { color: var(--muted); margin: 0; line-height: 1.7; max-width: 760px; }
        .links-admin-actions { display: flex; flex-wrap: wrap; gap: 10px; justify-content: flex-end; }
        .links-admin-btn, .links-admin-select { min-height: 42px; padding: 0 16px; border-radius: 999px; border: 1px solid rgba(168,196,138,.34); color: #eff8e7; background: linear-gradient(135deg, var(--g2), var(--g0)); font-size: 12px; font-weight: 900; letter-spacing: .06em; text-transform: uppercase; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; }
        .links-admin-select, .links-admin-btn.secondary { background: rgba(5,8,5,.46); }
        .links-admin-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin-bottom: 22px; }
        .links-admin-card, .links-admin-panel { border: 1px solid rgba(168,196,138,.24); background: linear-gradient(160deg, rgba(45,74,36,.30), rgba(13,22,10,.74)); box-shadow: 0 28px 90px rgba(0,0,0,.26), inset 0 1px 0 rgba(255,255,255,.08); }
        .links-admin-card { border-radius: 28px; padding: 24px; min-height: 126px; }
        .links-admin-card span { color: var(--muted); font-size: 11px; font-weight: 900; letter-spacing: .12em; text-transform: uppercase; }
        .links-admin-card strong { display: block; color: var(--g3); font-family: 'Playfair Display', serif; font-size: clamp(30px, 4.2vw, 48px); line-height: 1; margin: 18px 0 8px; word-break: break-word; }
        .links-admin-card small, .links-admin-muted { color: rgba(237,248,230,.48); }
        .links-admin-panel { border-radius: 32px; overflow: hidden; margin-bottom: 22px; }
        .links-admin-head { padding: 22px 24px; border-bottom: 1px solid rgba(168,196,138,.16); }
        .links-admin-head h2 { margin: 0; font-size: 22px; }
        .links-admin-head p { margin: 4px 0 0; color: var(--muted); font-size: 13px; line-height: 1.6; }
        .links-admin-table-wrap { overflow-x: auto; }
        .links-admin-table { width: 100%; min-width: 940px; border-collapse: collapse; }
        .links-admin-table th { text-align: left; padding: 18px; color: rgba(237,248,230,.62); font-size: 11px; letter-spacing: .12em; text-transform: uppercase; border-bottom: 1px solid rgba(168,196,138,.14); background: rgba(5,8,5,.24); }
        .links-admin-table td { padding: 18px; color: rgba(237,248,230,.78); border-bottom: 1px solid rgba(168,196,138,.10); font-size: 14px; vertical-align: top; }
        .links-admin-name { color: #fff; font-weight: 900; display: block; margin-bottom: 4px; }
        .links-admin-chip { display: inline-flex; align-items: center; min-height: 30px; padding: 0 12px; border-radius: 999px; background: rgba(168,196,138,.08); border: 1px solid rgba(168,196,138,.20); color: var(--g3); font-size: 12px; font-weight: 800; }
        .links-admin-empty { padding: 60px 24px; text-align: center; color: var(--muted); }
        .copied-toast { position: fixed; left: 50%; bottom: 22px; transform: translateX(-50%); background: #edf8e6; color: #13200f; padding: 12px 16px; border-radius: 999px; font-weight: 900; box-shadow: 0 18px 60px rgba(0,0,0,.28); z-index: 20; }
        @media (max-width: 980px) { .links-admin-topbar { grid-template-columns: 1fr; } .links-admin-actions { justify-content: flex-start; } .links-admin-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 620px) { .links-admin-grid { grid-template-columns: 1fr; } .links-admin-btn, .links-admin-select { width: 100%; } }
      `}</style>

      <div className="links-admin-shell">
        <header className="links-admin-topbar">
          <div>
            <h1 className="links-admin-title">Ranking de <em>links</em></h1>
            <p className="links-admin-sub">Mostra quais links orgânicos trazem visitas, WhatsApp e formulários. O placar usa sinais agregados, sem identificar visitante anônimo.</p>
          </div>
          <div className="links-admin-actions">
            <select className="links-admin-select" value={days} onChange={(event) => handlePeriodChange(event.target.value)}>
              <option value="1">Hoje</option>
              <option value="7">7 dias</option>
              <option value="30">30 dias</option>
              <option value="90">90 dias</option>
            </select>
            <button className="links-admin-btn" onClick={() => carregarMetricas()}>Atualizar</button>
            <a className="links-admin-btn secondary" href="/links">Abrir central</a>
            <a className="links-admin-btn secondary" href="/admin/organico">Radar orgânico</a>
          </div>
        </header>

        <section className="links-admin-grid">
          <div className="links-admin-card"><span>Melhor link</span><strong>{topLink?.page_path || '-'}</strong><small>por score comercial</small></div>
          <div className="links-admin-card"><span>Melhor origem</span><strong>{topOrigin?.source_tag || '-'}</strong><small>{topOrigin ? channelLabel(topOrigin.source_tag) : 'sem dados'}</small></div>
          <div className="links-admin-card"><span>Cliques WhatsApp</span><strong>{ranking.reduce((sum, row) => sum + row.whatsapp_click, 0)}</strong><small>dos links rastreados</small></div>
          <div className="links-admin-card"><span>Formulários</span><strong>{ranking.reduce((sum, row) => sum + row.form_submit, 0)}</strong><small>dos links rastreados</small></div>
        </section>

        <section className="links-admin-panel">
          <div className="links-admin-head"><h2>Placar por link</h2><p>Priorize links com mais WhatsApp, formulário e conversão. Visita sozinha pesa pouco.</p></div>
          {loading ? <div className="links-admin-empty">Carregando ranking...</div> : ranking.length === 0 ? <div className="links-admin-empty">Ainda sem links rastreados.</div> : (
            <div className="links-admin-table-wrap"><table className="links-admin-table"><thead><tr><th>Link</th><th>Origem</th><th>Tipo</th><th>Visitas</th><th>WhatsApp</th><th>Formulários</th><th>Conversão</th><th>Score</th><th>Ação</th></tr></thead><tbody>{ranking.map((row, index) => <tr key={`${row.page_path}-${row.source_tag}-${index}`}><td><span className="links-admin-name">{row.page_path}</span></td><td><span className="links-admin-chip">{row.source_tag}</span><br /><small className="links-admin-muted">{channelLabel(row.source_tag)}</small></td><td>{row.plan_type || '-'}</td><td>{row.page_view}</td><td>{row.whatsapp_click}</td><td>{row.form_submit}</td><td>{percent(row.form_submit + row.whatsapp_click, row.page_view)}</td><td>{row.score}</td><td><button className="links-admin-btn secondary" type="button" onClick={() => copyText(row.page_path, setCopied)}>Copiar</button></td></tr>)}</tbody></table></div>
          )}
        </section>

        <section className="links-admin-panel">
          <div className="links-admin-head"><h2>Como ler o ranking</h2><p>O ranking não mede vaidade. Ele dá mais peso para WhatsApp e formulário, porque são sinais próximos de venda.</p></div>
          <div className="links-admin-empty">Score = formulário × 50 + WhatsApp × 35 + visita × 2. Se um link tem poucas visitas e muito WhatsApp, ele merece mais atenção que uma página com muitas visitas frias.</div>
        </section>
      </div>

      {copied && <div className="copied-toast">Copiado</div>}
    </main>
  );
}
