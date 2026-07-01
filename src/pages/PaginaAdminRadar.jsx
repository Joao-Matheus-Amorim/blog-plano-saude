import { useEffect, useMemo, useState } from 'react';
import AdminLogin from '../components/AdminLogin.jsx';

const statuses = ['Novo', 'Avaliar', 'Bom prospect', 'Abordado', 'Sem contato', 'Convertido', 'Descartado', 'Duplicado'];
const priorities = ['todas', 'alta', 'media', 'baixa'];

function priorityLabel(priority = '') {
  if (priority === 'alta') return 'Alta';
  if (priority === 'media') return 'Média';
  return 'Baixa';
}

function whatsappUrl(prospect) {
  const phone = String(prospect.whatsapp || prospect.telefone_publico || '').replace(/\D/g, '');
  const text = encodeURIComponent(`Olá! Vi a empresa ${prospect.nome_empresa} e gostaria de entender se vocês avaliam plano de saúde empresarial para equipe, sócios ou dependentes.`);
  return phone ? `https://wa.me/55${phone.replace(/^55/, '')}?text=${text}` : '';
}

function copyText(text, setCopied) {
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(() => setCopied(text)).catch(() => setCopied(text));
    return;
  }

  setCopied(text);
}

export default function PaginaAdminRadar() {
  const [autenticado, setAutenticado] = useState(false);
  const [adminToken, setAdminToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [payload, setPayload] = useState({ prospects: [], overview: {}, bySegment: [], byCity: [] });
  const [segmento, setSegmento] = useState('todos');
  const [prioridade, setPrioridade] = useState('todas');
  const [copied, setCopied] = useState('');

  const authHeaders = (token = adminToken) => ({ Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' });

  const handleAuthError = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminAutenticado');
    setAdminToken('');
    setAutenticado(false);
    setLoading(false);
  };

  const carregarRadar = async (token = adminToken) => {
    try {
      if (!token) throw new Error('Token admin ausente');
      setLoading(true);
      const res = await fetch('/api/radar?action=list', { headers: authHeaders(token) });
      if (res.status === 401) return handleAuthError();
      if (!res.ok) throw new Error('Erro ao buscar prospectos do Radar');
      const data = await res.json();
      setPayload(data || { prospects: [], overview: {}, bySegment: [], byCity: [] });
    } catch (error) {
      console.error('Erro ao carregar Radar:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setAdminToken(token);
      setAutenticado(true);
      carregarRadar(token);
    } else {
      setLoading(false);
    }
  }, []);

  const handleLoginSuccess = (token) => {
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminAutenticado', 'true');
    setAdminToken(token);
    setAutenticado(true);
    carregarRadar(token);
  };

  const segmentos = useMemo(() => {
    const unique = new Set((payload.prospects || []).map((item) => item.segmento || 'Sem segmento'));
    return ['todos', ...Array.from(unique).sort((a, b) => a.localeCompare(b))];
  }, [payload.prospects]);

  const prospects = useMemo(() => (payload.prospects || []).filter((item) => {
    const segmentOk = segmento === 'todos' || (item.segmento || 'Sem segmento') === segmento;
    const priorityOk = prioridade === 'todas' || item.prioridade === prioridade;
    return segmentOk && priorityOk;
  }), [payload.prospects, segmento, prioridade]);

  const updateStatus = async (prospect, status) => {
    const res = await fetch('/api/radar?action=update-status', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ id: prospect.id, status, observacao_interna: prospect.observacao_interna || '' }),
    });
    if (res.status === 401) return handleAuthError();
    await carregarRadar();
  };

  const convertProspect = async (prospect) => {
    const res = await fetch('/api/radar?action=convert', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ id: prospect.id }),
    });
    if (res.status === 401) return handleAuthError();
    await carregarRadar();
  };

  const copyApproach = (prospect) => {
    const text = prospect.abordagem || `Abordar ${prospect.nome_empresa} como empresa local de ${prospect.segmento || 'serviço'} em ${prospect.cidade || 'RJ'} para validar interesse em plano empresarial.`;
    copyText(text, setCopied);
  };

  if (!autenticado) return <AdminLogin onLoginSuccess={handleLoginSuccess} />;

  return (
    <main className="radar-admin-page">
      <style>{`
        .radar-admin-page { --bg0: #070d05; --bg1: #0d160a; --g0: #2d4a24; --g2: #6b8c52; --g3: #a8c48a; --text: #edf8e6; --muted: rgba(237,248,230,.64); min-height: 100vh; color: var(--text); background: radial-gradient(circle at 78% 8%, rgba(106,140,82,.24), transparent 34rem), linear-gradient(180deg, var(--bg0), var(--bg1)); padding: clamp(112px, 12vw, 148px) clamp(18px, 4vw, 52px) 86px; }
        .radar-shell { max-width: 1460px; margin: 0 auto; }
        .radar-topbar { display: grid; grid-template-columns: 1fr auto; gap: 22px; align-items: end; margin-bottom: 22px; }
        .radar-title { font-family: 'Playfair Display', serif; font-size: clamp(42px, 6vw, 78px); line-height: .92; letter-spacing: -.055em; margin: 0 0 12px; }
        .radar-title em { color: var(--g3); font-style: italic; font-weight: 500; }
        .radar-sub { color: var(--muted); margin: 0; line-height: 1.7; max-width: 820px; }
        .radar-actions { display: flex; flex-wrap: wrap; gap: 10px; justify-content: flex-end; }
        .radar-btn, .radar-select { min-height: 42px; padding: 0 16px; border-radius: 999px; border: 1px solid rgba(168,196,138,.34); color: #eff8e7; background: linear-gradient(135deg, var(--g2), var(--g0)); font-size: 12px; font-weight: 900; letter-spacing: .06em; text-transform: uppercase; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; }
        .radar-select, .radar-btn.secondary { background: rgba(5,8,5,.46); }
        .radar-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin-bottom: 22px; }
        .radar-stat, .radar-panel, .radar-card { border: 1px solid rgba(168,196,138,.24); background: linear-gradient(160deg, rgba(45,74,36,.30), rgba(13,22,10,.74)); box-shadow: 0 28px 90px rgba(0,0,0,.26), inset 0 1px 0 rgba(255,255,255,.08); }
        .radar-stat { border-radius: 28px; padding: 24px; min-height: 126px; }
        .radar-stat span { color: var(--muted); font-size: 11px; font-weight: 900; letter-spacing: .12em; text-transform: uppercase; }
        .radar-stat strong { display: block; color: var(--g3); font-family: 'Playfair Display', serif; font-size: clamp(30px, 4.2vw, 48px); line-height: 1; margin: 18px 0 8px; }
        .radar-panel { border-radius: 32px; padding: 20px; margin-bottom: 22px; }
        .radar-tabs { display: flex; flex-wrap: wrap; gap: 10px; }
        .radar-tab { min-height: 38px; padding: 0 14px; border-radius: 999px; border: 1px solid rgba(168,196,138,.22); background: rgba(255,255,255,.04); color: rgba(237,248,230,.76); cursor: pointer; font-weight: 800; }
        .radar-tab.active { background: rgba(168,196,138,.16); color: var(--g3); }
        .radar-cards { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
        .radar-card { border-radius: 30px; padding: 22px; }
        .radar-card-head { display: grid; grid-template-columns: 1fr auto; gap: 14px; align-items: start; }
        .radar-card h2 { margin: 0 0 8px; font-size: 22px; color: #fff; }
        .radar-meta { color: var(--muted); line-height: 1.6; font-size: 13px; }
        .radar-score { min-width: 84px; text-align: center; border-radius: 22px; padding: 12px; background: rgba(168,196,138,.10); border: 1px solid rgba(168,196,138,.24); }
        .radar-score strong { display: block; color: var(--g3); font-size: 30px; line-height: 1; }
        .radar-chips { display: flex; flex-wrap: wrap; gap: 8px; margin: 16px 0; }
        .radar-chip { display: inline-flex; align-items: center; min-height: 30px; padding: 0 11px; border-radius: 999px; background: rgba(168,196,138,.08); border: 1px solid rgba(168,196,138,.18); color: rgba(237,248,230,.78); font-size: 12px; font-weight: 800; }
        .radar-chip.high { color: #fff; background: rgba(168,196,138,.18); }
        .radar-reason { color: rgba(237,248,230,.72); line-height: 1.65; min-height: 44px; }
        .radar-card-actions { display: flex; flex-wrap: wrap; gap: 9px; margin-top: 18px; }
        .radar-empty { padding: 60px 24px; text-align: center; color: var(--muted); }
        .copied-toast { position: fixed; left: 50%; bottom: 22px; transform: translateX(-50%); background: #edf8e6; color: #13200f; padding: 12px 16px; border-radius: 999px; font-weight: 900; box-shadow: 0 18px 60px rgba(0,0,0,.28); z-index: 20; }
        @media (max-width: 980px) { .radar-topbar, .radar-cards { grid-template-columns: 1fr; } .radar-actions { justify-content: flex-start; } .radar-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 620px) { .radar-grid { grid-template-columns: 1fr; } .radar-btn, .radar-select { width: 100%; } }
      `}</style>

      <div className="radar-shell">
        <header className="radar-topbar">
          <div>
            <h1 className="radar-title">Radarplan <em>B2B</em></h1>
            <p className="radar-sub">Prospectos públicos importados pelo Python. Eles não são leads ainda: são oportunidades para avaliar, abordar manualmente e converter quando fizer sentido.</p>
          </div>
          <div className="radar-actions">
            <select className="radar-select" value={prioridade} onChange={(event) => setPrioridade(event.target.value)} aria-label="Filtrar prioridade">
              {priorities.map((item) => <option key={item} value={item}>{item === 'todas' ? 'Todas prioridades' : priorityLabel(item)}</option>)}
            </select>
            <button className="radar-btn" onClick={() => carregarRadar()}>Atualizar</button>
            <a className="radar-btn secondary" href="/admin">CRM</a>
            <a className="radar-btn secondary" href="/admin/links">Links</a>
          </div>
        </header>

        <section className="radar-grid" aria-label="Resumo Radarplan">
          <div className="radar-stat"><span>Prospectos</span><strong>{payload.overview?.total || 0}</strong><small>Total importado do Radarplan</small></div>
          <div className="radar-stat"><span>Alta prioridade</span><strong>{payload.overview?.alta || 0}</strong><small>Score forte para abordagem</small></div>
          <div className="radar-stat"><span>Novos</span><strong>{payload.overview?.novos || 0}</strong><small>Aguardando avaliação</small></div>
          <div className="radar-stat"><span>Convertidos</span><strong>{payload.overview?.convertidos || 0}</strong><small>Viraram lead no CRM</small></div>
        </section>

        <section className="radar-panel" aria-labelledby="abas-segmento">
          <h2 id="abas-segmento">Segmentos</h2>
          <div className="radar-tabs">
            {segmentos.map((item) => <button className={`radar-tab ${segmento === item ? 'active' : ''}`} key={item} onClick={() => setSegmento(item)}>{item}</button>)}
          </div>
        </section>

        {loading ? <div className="radar-empty">Carregando prospectos...</div> : prospects.length === 0 ? <div className="radar-empty">Ainda sem prospectos nesse filtro.</div> : (
          <section className="radar-cards" aria-label="Cards de prospectos Radarplan">
            {prospects.map((prospect) => {
              const whats = whatsappUrl(prospect);
              const priority = priorityLabel(prospect.prioridade);
              return (
                <article className="radar-card" key={prospect.id}>
                  <div className="radar-card-head">
                    <div>
                      <h2>{prospect.nome_empresa}</h2>
                      <div className="radar-meta">{prospect.segmento || 'Sem segmento'} · {prospect.cidade || '-'}, {prospect.uf || 'RJ'} · Origem: {prospect.origem || 'radarplan'}</div>
                    </div>
                    <div className="radar-score"><strong>{prospect.score || 0}</strong><span>{priority}</span></div>
                  </div>

                  <div className="radar-chips">
                    <span className={`radar-chip ${prospect.prioridade === 'alta' ? 'high' : ''}`}>Prioridade {priority}</span>
                    <span className="radar-chip">Status {prospect.status || 'Novo'}</span>
                    {prospect.telefone_publico && <span className="radar-chip">Telefone público</span>}
                    {prospect.site_url && <span className="radar-chip">Site/perfil</span>}
                  </div>

                  <p className="radar-reason">{prospect.score_motivos || 'Prospecto importado do Radarplan para avaliação comercial.'}</p>
                  <p className="radar-meta">Busca: {prospect.consulta_google || '-'}<br />Fonte: {prospect.fonte_url || prospect.site_url || '-'}</p>

                  <div className="radar-card-actions">
                    {prospect.fonte_url && <a className="radar-btn secondary" href={prospect.fonte_url} target="_blank" rel="noreferrer">Abrir fonte</a>}
                    {whats && <a className="radar-btn" href={whats} target="_blank" rel="noreferrer">WhatsApp</a>}
                    <button className="radar-btn secondary" onClick={() => copyApproach(prospect)}>Copiar abordagem</button>
                    <button className="radar-btn" onClick={() => convertProspect(prospect)}>Converter em lead</button>
                    <select className="radar-select" value={prospect.status || 'Novo'} onChange={(event) => updateStatus(prospect, event.target.value)} aria-label={`Status de ${prospect.nome_empresa}`}>
                      {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
                    </select>
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </div>

      {copied && <div className="copied-toast">Abordagem copiada</div>}
    </main>
  );
}
