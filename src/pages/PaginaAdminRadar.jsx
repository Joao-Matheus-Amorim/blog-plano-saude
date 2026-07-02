import { useEffect, useMemo, useState } from 'react';
import AdminLogin from '../components/AdminLogin.jsx';

const statuses = ['Novo', 'Avaliar', 'Bom prospect', 'Abordado', 'Sem contato', 'Convertido', 'Descartado', 'Duplicado'];
const priorities = ['todas', 'alta', 'media', 'baixa'];
const serviceTabs = ['todos', 'saude_odonto', 'servicos_b2b', 'juridico', 'local'];

function priorityLabel(priority = '') {
  if (priority === 'alta') return 'Alta';
  if (priority === 'media') return 'Média';
  return 'Baixa';
}

function serviceLabel(value = '') {
  const labels = {
    todos: 'Todos',
    saude_odonto: 'Saúde / Odonto',
    servicos_b2b: 'Serviços B2B',
    juridico: 'Jurídico',
    local: 'Empresas locais',
  };
  return labels[value] || value;
}

function normalizeText(value = '') {
  return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function classifyService(prospect) {
  const text = normalizeText(`${prospect.segmento || ''} ${prospect.nome_empresa || ''} ${prospect.consulta_google || ''}`);
  if (/(odonto|dent|clinica|saude|medic|laboratorio|exame)/.test(text)) return 'saude_odonto';
  if (/(contab|contador|escritorio|consultoria|empresa|mei|rh|beneficio)/.test(text)) return 'servicos_b2b';
  if (/(advoc|jurid|direito)/.test(text)) return 'juridico';
  return 'local';
}

function originLabel(origin = '') {
  const value = normalizeText(origin);
  if (value.includes('google')) return 'Google Browser';
  if (value.includes('radar')) return 'Radarplan';
  return origin || 'Radarplan';
}

function hasDirectSource(prospect) {
  const url = normalizeText(prospect.fonte_url || prospect.site_url || '');
  return Boolean(url) && !/(guiamais|apontador|solutudo|doctoralia|telelistas|cnpj|econodata)/.test(url);
}

function whatsappUrl(prospect) {
  const phone = String(prospect.whatsapp || prospect.telefone_publico || '').replace(/\D/g, '');
  const text = encodeURIComponent(`Olá! Vi a empresa ${prospect.nome_empresa} e gostaria de entender se vocês avaliam plano de saúde empresarial para equipe, sócios ou dependentes.`);
  return phone ? `https://wa.me/55${phone.replace(/^55/, '')}?text=${text}` : '';
}

function scoreReasons(prospect) {
  const raw = String(prospect.score_motivos || '').split(',').map((item) => item.trim()).filter(Boolean);
  const tags = Array.isArray(prospect.tags) ? prospect.tags : [];
  return Array.from(new Set([...raw, ...tags])).slice(0, 8);
}

function reasonLabel(reason = '') {
  const value = normalizeText(reason);
  if (value.includes('contato')) return 'Contato público encontrado';
  if (value.includes('site_direto') || value.includes('lead_direto')) return 'Fonte direta, não só diretório';
  if (value.includes('rede_social')) return 'Canal social público';
  if (value.includes('segmento_confirmado')) return 'Segmento confirmado na busca';
  if (value.includes('diretorio') || value.includes('indireto')) return 'Fonte indireta: validar antes';
  if (value.includes('google')) return 'Coleta via Google Browser';
  if (value.includes('local:')) return `Praça ${reason.replace('local:', '')}`;
  return reason.replaceAll('_', ' ');
}

function engineeringGrade(prospect) {
  const score = Number(prospect.score || 0);
  const hasPhone = Boolean(prospect.telefone_publico || prospect.whatsapp);
  const direct = hasDirectSource(prospect);
  const confirmed = scoreReasons(prospect).some((reason) => normalizeText(reason).includes('segmento_confirmado'));

  if (score >= 90 && hasPhone && direct) return { label: 'Pronto para abordagem', className: 'grade-a', detail: 'Tem score alto, canal público e fonte auditável.' };
  if (score >= 80 && direct) return { label: 'Validar e abordar', className: 'grade-b', detail: 'Boa fonte e aderência, falta checagem rápida.' };
  if (score >= 65 || confirmed) return { label: 'Avaliação manual', className: 'grade-c', detail: 'Pode ser bom, mas precisa qualificação antes.' };
  return { label: 'Baixo sinal', className: 'grade-d', detail: 'Guardar ou descartar se não houver evidência.' };
}

function valueProfile(prospect) {
  const score = Number(prospect.score || 0);
  const hasPhone = Boolean(prospect.telefone_publico || prospect.whatsapp);
  const direct = hasDirectSource(prospect);
  const segment = classifyService(prospect);

  if (score >= 90 && hasPhone && direct) {
    return {
      label: 'Alto valor operacional',
      detail: segment === 'saude_odonto'
        ? 'Negócio local de saúde/odonto, bom encaixe para plano empresarial e benefício de equipe.'
        : 'Empresa com canal público e sinal comercial suficiente para abordagem direta.',
    };
  }

  if (score >= 75 || direct) {
    return { label: 'Valor médio', detail: 'Boa pista comercial, mas precisa confirmar responsável, equipe e interesse.' };
  }

  return { label: 'Valor incerto', detail: 'Dado público fraco. Use só para pesquisa ou descarte.' };
}

function nextAction(prospect) {
  if (prospect.status === 'Convertido') return 'Já convertido em lead. Continuar no CRM.';
  if (prospect.status === 'Descartado') return 'Descartado. Não abordar.';
  if (prospect.telefone_publico || prospect.whatsapp) return 'Abrir WhatsApp e fazer abordagem curta.';
  if (prospect.fonte_url || prospect.site_url) return 'Abrir fonte, validar telefone e responsável.';
  return 'Sem canal claro. Marcar como avaliação ou descartar.';
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
  const [service, setService] = useState('todos');
  const [prioridade, setPrioridade] = useState('todas');
  const [statusFiltro, setStatusFiltro] = useState('Todos');
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

  const rawProspects = payload.prospects || [];

  const segmentos = useMemo(() => {
    const unique = new Set(rawProspects.map((item) => item.segmento || 'Sem segmento'));
    return ['todos', ...Array.from(unique).sort((a, b) => a.localeCompare(b))];
  }, [rawProspects]);

  const prospects = useMemo(() => rawProspects.filter((item) => {
    const segmentOk = segmento === 'todos' || (item.segmento || 'Sem segmento') === segmento;
    const priorityOk = prioridade === 'todas' || item.prioridade === prioridade;
    const serviceOk = service === 'todos' || classifyService(item) === service;
    const statusOk = statusFiltro === 'Todos' || (item.status || 'Novo') === statusFiltro;
    return segmentOk && priorityOk && serviceOk && statusOk;
  }).sort((a, b) => Number(b.score || 0) - Number(a.score || 0)), [rawProspects, segmento, prioridade, service, statusFiltro]);

  const intelligence = useMemo(() => {
    const actionable = rawProspects.filter((item) => ['Novo', 'Avaliar', 'Bom prospect'].includes(item.status || 'Novo'));
    const withPhone = rawProspects.filter((item) => item.telefone_publico || item.whatsapp);
    const direct = rawProspects.filter(hasDirectSource);
    const avg = rawProspects.length ? Math.round(rawProspects.reduce((sum, item) => sum + Number(item.score || 0), 0) / rawProspects.length) : 0;
    return { actionable: actionable.length, withPhone: withPhone.length, direct: direct.length, avg };
  }, [rawProspects]);

  const statusStats = useMemo(() => Object.fromEntries(statuses.map((status) => [status, rawProspects.filter((item) => (item.status || 'Novo') === status).length])), [rawProspects]);

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
        .radar-admin-page { --bg0: #070d05; --bg1: #0d160a; --g0: #2d4a24; --g2: #6b8c52; --g3: #a8c48a; --text: #edf8e6; --muted: rgba(237,248,230,.64); min-height: 100vh; color: var(--text); background: radial-gradient(circle at 78% 8%, rgba(106,140,82,.24), transparent 34rem), linear-gradient(180deg, var(--bg0), var(--bg1)); padding: clamp(72px, 9vw, 104px) clamp(18px, 4vw, 52px) 86px; }
        .radar-shell { max-width: 1480px; margin: 0 auto; }
        .radar-topbar { display: grid; grid-template-columns: 1fr auto; gap: 22px; align-items: end; margin-bottom: 22px; }
        .radar-title { font-family: 'Playfair Display', serif; font-size: clamp(42px, 6vw, 78px); line-height: .92; letter-spacing: -.055em; margin: 0 0 12px; }
        .radar-title em { color: var(--g3); font-style: italic; font-weight: 500; }
        .radar-sub { color: var(--muted); margin: 0; line-height: 1.7; max-width: 880px; }
        .radar-actions, .radar-tabs, .radar-card-actions, .radar-chips, .radar-status-tabs { display: flex; flex-wrap: wrap; gap: 10px; }
        .radar-actions { justify-content: flex-end; }
        .radar-btn, .radar-select, .radar-tab { min-height: 42px; padding: 0 16px; border-radius: 999px; border: 1px solid rgba(168,196,138,.34); color: #eff8e7; background: linear-gradient(135deg, var(--g2), var(--g0)); font-size: 12px; font-weight: 900; letter-spacing: .06em; text-transform: uppercase; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; }
        .radar-select, .radar-btn.secondary, .radar-tab { background: rgba(5,8,5,.46); box-shadow: none; color: rgba(237,248,230,.72); }
        .radar-tab.active { color: #eff8e7; background: linear-gradient(135deg, var(--g2), var(--g0)); }
        .radar-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin-bottom: 22px; }
        .radar-stat, .radar-panel, .radar-card, .radar-intel { border: 1px solid rgba(168,196,138,.24); background: linear-gradient(160deg, rgba(45,74,36,.30), rgba(13,22,10,.74)); box-shadow: 0 28px 90px rgba(0,0,0,.26), inset 0 1px 0 rgba(255,255,255,.08); }
        .radar-stat { border-radius: 28px; padding: 24px; min-height: 126px; }
        .radar-stat span, .radar-label { color: var(--muted); font-size: 11px; font-weight: 900; letter-spacing: .12em; text-transform: uppercase; display: block; margin-bottom: 7px; }
        .radar-stat strong { display: block; color: var(--g3); font-family: 'Playfair Display', serif; font-size: clamp(30px, 4.2vw, 48px); line-height: 1; margin: 18px 0 8px; }
        .radar-panel { border-radius: 32px; padding: 20px; margin-bottom: 22px; }
        .radar-panel h2 { margin: 0 0 14px; font-size: 22px; }
        .radar-filter-grid { display: grid; grid-template-columns: 1fr auto; gap: 18px; align-items: end; }
        .radar-status-tabs { margin-top: 14px; }
        .radar-cards { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
        .radar-card { border-radius: 30px; padding: 22px; }
        .radar-card-head { display: grid; grid-template-columns: 1fr auto; gap: 14px; align-items: start; }
        .radar-card h2 { margin: 0 0 8px; font-size: 22px; color: #fff; }
        .radar-meta { color: var(--muted); line-height: 1.6; font-size: 13px; }
        .radar-score { min-width: 92px; text-align: center; border-radius: 22px; padding: 12px; background: rgba(168,196,138,.10); border: 1px solid rgba(168,196,138,.24); }
        .radar-score strong { display: block; color: var(--g3); font-size: 34px; line-height: 1; }
        .radar-chip { display: inline-flex; align-items: center; min-height: 30px; padding: 0 11px; border-radius: 999px; background: rgba(168,196,138,.08); border: 1px solid rgba(168,196,138,.18); color: rgba(237,248,230,.78); font-size: 12px; font-weight: 800; }
        .radar-chip.high, .radar-chip.grade-a { color: #fff; background: rgba(168,196,138,.18); }
        .radar-chip.grade-b { color: #dcf7c4; }
        .radar-chip.grade-c { color: #ffdca6; }
        .radar-chip.grade-d { color: #ffb2aa; }
        .radar-intel { border-radius: 24px; padding: 16px; margin: 16px 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
        .radar-intel strong { display: block; color: #fff; margin-bottom: 5px; }
        .radar-intel p { margin: 0; color: rgba(237,248,230,.66); line-height: 1.55; font-size: 13px; }
        .radar-reasons { display: grid; gap: 8px; margin-top: 12px; }
        .radar-reason-line { display: flex; gap: 8px; align-items: baseline; color: rgba(237,248,230,.72); font-size: 13px; }
        .radar-reason-line::before { content: '✓'; color: var(--g3); font-weight: 900; }
        .radar-card-actions { margin-top: 18px; }
        .radar-empty { padding: 60px 24px; text-align: center; color: var(--muted); }
        .copied-toast { position: fixed; left: 50%; bottom: 22px; transform: translateX(-50%); background: #edf8e6; color: #13200f; padding: 12px 16px; border-radius: 999px; font-weight: 900; box-shadow: 0 18px 60px rgba(0,0,0,.28); z-index: 20; }
        @media (max-width: 1120px) { .radar-topbar, .radar-filter-grid, .radar-cards { grid-template-columns: 1fr; } .radar-actions { justify-content: flex-start; } .radar-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 720px) { .radar-grid, .radar-intel { grid-template-columns: 1fr; } .radar-btn, .radar-select { width: 100%; } .radar-card-head { grid-template-columns: 1fr; } }
      `}</style>

      <div className="radar-shell">
        <header className="radar-topbar">
          <div>
            <h1 className="radar-title">Radarplan <em>B2B</em></h1>
            <p className="radar-sub">Mesa de inteligência para prospectos públicos. A tela separa oportunidade fria de lead real, mostra valor operacional, origem auditável e próxima ação antes de qualquer conversão para o CRM.</p>
          </div>
          <div className="radar-actions">
            <select className="radar-select" value={prioridade} onChange={(event) => setPrioridade(event.target.value)} aria-label="Filtrar prioridade">
              {priorities.map((item) => <option key={item} value={item}>{item === 'todas' ? 'Todas prioridades' : priorityLabel(item)}</option>)}
            </select>
            <select className="radar-select" value={statusFiltro} onChange={(event) => setStatusFiltro(event.target.value)} aria-label="Filtrar status">
              <option>Todos</option>
              {statuses.map((status) => <option key={status}>{status}</option>)}
            </select>
            <button className="radar-btn" onClick={() => carregarRadar()}>Atualizar</button>
          </div>
        </header>

        <section className="radar-grid" aria-label="Resumo Radarplan">
          <div className="radar-stat"><span>Prospectos</span><strong>{payload.overview?.total || 0}</strong><small>Total importado do Radarplan</small></div>
          <div className="radar-stat"><span>Fila acionável</span><strong>{intelligence.actionable}</strong><small>Novo, avaliar ou bom prospect</small></div>
          <div className="radar-stat"><span>Com telefone</span><strong>{intelligence.withPhone}</strong><small>Prontos para contato manual</small></div>
          <div className="radar-stat"><span>Score médio</span><strong>{intelligence.avg}</strong><small>Qualidade geral da coleta</small></div>
        </section>

        <section className="radar-panel" aria-labelledby="engenharia-radar">
          <h2 id="engenharia-radar">Engenharia de triagem</h2>
          <div className="radar-filter-grid">
            <div>
              <span className="radar-label">Tipo de serviço</span>
              <div className="radar-tabs">
                {serviceTabs.map((item) => <button className={`radar-tab ${service === item ? 'active' : ''}`} key={item} onClick={() => setService(item)}>{serviceLabel(item)}</button>)}
              </div>
            </div>
            <div>
              <span className="radar-label">Segmento bruto</span>
              <div className="radar-tabs">
                {segmentos.map((item) => <button className={`radar-tab ${segmento === item ? 'active' : ''}`} key={item} onClick={() => setSegmento(item)}>{item}</button>)}
              </div>
            </div>
          </div>
          <div className="radar-status-tabs" aria-label="Filtro por status Radarplan">
            <button className={`radar-tab ${statusFiltro === 'Todos' ? 'active' : ''}`} onClick={() => setStatusFiltro('Todos')}>Todos {rawProspects.length}</button>
            {statuses.map((status) => <button className={`radar-tab ${statusFiltro === status ? 'active' : ''}`} key={status} onClick={() => setStatusFiltro(status)}>{status} {statusStats[status] || 0}</button>)}
          </div>
        </section>

        {loading ? <div className="radar-empty">Carregando prospectos...</div> : prospects.length === 0 ? <div className="radar-empty">Ainda sem prospectos nesse filtro.</div> : (
          <section className="radar-cards" aria-label="Cards de prospectos Radarplan">
            {prospects.map((prospect) => {
              const whats = whatsappUrl(prospect);
              const priority = priorityLabel(prospect.prioridade);
              const grade = engineeringGrade(prospect);
              const value = valueProfile(prospect);
              const reasons = scoreReasons(prospect);
              return (
                <article className="radar-card" key={prospect.id}>
                  <div className="radar-card-head">
                    <div>
                      <h2>{prospect.nome_empresa}</h2>
                      <div className="radar-meta">{prospect.segmento || 'Sem segmento'} · {prospect.cidade || '-'}, {prospect.uf || 'RJ'} · Origem: {originLabel(prospect.origem)}</div>
                    </div>
                    <div className="radar-score"><strong>{prospect.score || 0}</strong><span>{priority}</span></div>
                  </div>

                  <div className="radar-chips">
                    <span className={`radar-chip ${prospect.prioridade === 'alta' ? 'high' : ''}`}>Prioridade {priority}</span>
                    <span className={`radar-chip ${grade.className}`}>{grade.label}</span>
                    <span className="radar-chip">Status {prospect.status || 'Novo'}</span>
                    <span className="radar-chip">{serviceLabel(classifyService(prospect))}</span>
                  </div>

                  <div className="radar-intel">
                    <div><span className="radar-label">Valor operacional</span><strong>{value.label}</strong><p>{value.detail}</p></div>
                    <div><span className="radar-label">Próxima ação</span><strong>{nextAction(prospect)}</strong><p>{grade.detail}</p></div>
                    <div><span className="radar-label">Origem auditável</span><strong>{originLabel(prospect.origem)}</strong><p>{prospect.consulta_google || 'Consulta não registrada'}<br />{prospect.fonte_url || prospect.site_url || 'Fonte ausente'}</p></div>
                  </div>

                  <div className="radar-reasons" aria-label={`Motivos do score de ${prospect.nome_empresa}`}>
                    {(reasons.length ? reasons : ['Prospecto importado do Radarplan']).slice(0, 5).map((reason) => <div className="radar-reason-line" key={reason}>{reasonLabel(reason)}</div>)}
                  </div>

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
