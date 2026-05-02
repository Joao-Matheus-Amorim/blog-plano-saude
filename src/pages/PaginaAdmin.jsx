import { useState, useEffect } from 'react';
import AdminLogin from '../components/AdminLogin.jsx';

const emptyPost = {
  id: null,
  titulo: '',
  slug: '',
  categoria: 'MEI',
  resumo: '',
  conteudo: '',
  imagem_url: '',
  autor: 'Maisa Valentim',
  seo_title: '',
  seo_description: '',
  status: 'published',
};

function slugify(text = '') {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function PaginaAdmin() {
  const [autenticado, setAutenticado] = useState(false);
  const [adminToken, setAdminToken] = useState('');
  const [leads, setLeads] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(false);
  const [busca, setBusca] = useState('');
  const [postBusca, setPostBusca] = useState('');
  const [activeTab, setActiveTab] = useState('leads');
  const [postForm, setPostForm] = useState(emptyPost);
  const [savingPost, setSavingPost] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const legado = localStorage.getItem('adminAutenticado');

    if (token) {
      setAdminToken(token);
      setAutenticado(true);
      carregarLeads(token);
      carregarPosts(token);
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

  const authHeaders = (token = adminToken) => ({ Authorization: `Bearer ${token}` });

  const carregarLeads = async (token = adminToken) => {
    try {
      if (!token) throw new Error('Token admin ausente');
      const res = await fetch('/api/leads/get', { headers: authHeaders(token) });
      if (res.status === 401) return handleAuthError();
      if (!res.ok) throw new Error('Erro ao buscar leads');
      const data = await res.json();
      setLeads(data || []);
    } catch (error) {
      console.error('Erro ao carregar leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const carregarPosts = async (token = adminToken) => {
    try {
      if (!token) throw new Error('Token admin ausente');
      setPostsLoading(true);
      const res = await fetch('/api/admin/blog/list', { headers: authHeaders(token) });
      if (res.status === 401) return handleAuthError();
      if (!res.ok) throw new Error('Erro ao buscar posts');
      const data = await res.json();
      setPosts(data || []);
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
    } finally {
      setPostsLoading(false);
    }
  };

  const handleLoginSuccess = (token) => {
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminAutenticado', 'true');
    setAdminToken(token);
    setAutenticado(true);
    setLoading(true);
    carregarLeads(token);
    carregarPosts(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminAutenticado');
    setAdminToken('');
    setAutenticado(false);
  };

  const getLeadDateValue = (lead) => lead.data_envio || lead.created_at || lead.data || null;

  const formatDate = (dateValue) => {
    if (!dateValue) return 'Sem data';
    const date = new Date(dateValue);
    return Number.isNaN(date.getTime()) ? 'Sem data' : date.toLocaleString('pt-BR');
  };

  const formatLeadDate = (lead) => formatDate(getLeadDateValue(lead));

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
        headers: authHeaders(),
      });
      if (res.status === 401) return handleAuthError();
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

  const handlePostChange = (field, value) => {
    setPostForm((current) => ({
      ...current,
      [field]: value,
      ...(field === 'titulo' && !current.id ? { slug: slugify(value), seo_title: value } : {}),
      ...(field === 'resumo' && !current.id ? { seo_description: value } : {}),
    }));
  };

  const novoPost = () => {
    setPostForm(emptyPost);
    setActiveTab('blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const editarPost = (post) => {
    setPostForm({ ...emptyPost, ...post });
    setActiveTab('blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const salvarPost = async (event) => {
    event.preventDefault();

    try {
      setSavingPost(true);
      const payload = {
        ...postForm,
        slug: slugify(postForm.slug || postForm.titulo),
      };

      const res = await fetch('/api/admin/blog/save', {
        method: postForm.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders(),
        },
        body: JSON.stringify(payload),
      });

      if (res.status === 401) return handleAuthError();
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Erro ao salvar post');

      setPostForm(emptyPost);
      await carregarPosts();
      alert('Post salvo com sucesso.');
    } catch (error) {
      console.error('Erro ao salvar post:', error);
      alert(error.message || 'Erro ao salvar post');
    } finally {
      setSavingPost(false);
    }
  };

  const deletarPost = async (id) => {
    if (!confirm('Tem certeza que deseja deletar este post?')) return;

    try {
      const res = await fetch(`/api/admin/blog/delete?id=${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });
      if (res.status === 401) return handleAuthError();
      if (!res.ok) throw new Error('Erro ao deletar post');
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Erro ao deletar post:', error);
      alert('Erro ao deletar post');
    }
  };

  const leadsFiltrados = leads.filter(lead =>
    lead.nome?.toLowerCase().includes(busca.toLowerCase()) ||
    lead.email?.toLowerCase().includes(busca.toLowerCase()) ||
    lead.telefone?.includes(busca) ||
    lead.operadora?.toLowerCase().includes(busca.toLowerCase())
  );

  const postsFiltrados = posts.filter(post =>
    post.titulo?.toLowerCase().includes(postBusca.toLowerCase()) ||
    post.categoria?.toLowerCase().includes(postBusca.toLowerCase()) ||
    post.slug?.toLowerCase().includes(postBusca.toLowerCase())
  );

  const stats = [
    ['Total de leads', leads.length, 'Base completa'],
    ['Hoje', leads.filter(isToday).length, 'Novas entradas'],
    ['Últimos 7 dias', leads.filter(isLast7Days).length, 'Volume recente'],
    ['Posts publicados', posts.filter(post => post.status === 'published').length, 'Blog ativo']
  ];

  if (!autenticado) return <AdminLogin onLoginSuccess={handleLoginSuccess} />;

  return (
    <main className="admin-dashboard-page">
      <style>{`
        .admin-dashboard-page { --bg0: #070d05; --bg1: #0d160a; --g0: #2d4a24; --g1: #4a6b3a; --g2: #6b8c52; --g3: #8aab6e; --g4: #a8c48a; --text: #edf8e6; --muted: rgba(237,248,230,.62); min-height: 100vh; color: var(--text); background: radial-gradient(circle at 78% 8%, rgba(106,140,82,.24), transparent 34rem), radial-gradient(circle at 6% 18%, rgba(168,196,138,.13), transparent 30rem), linear-gradient(180deg, var(--bg0), var(--bg1) 54%, #050805); position: relative; overflow: hidden; padding: clamp(112px, 12vw, 148px) clamp(18px, 4vw, 52px) clamp(60px, 8vw, 96px); }
        .admin-dashboard-page::before { content: ''; position: fixed; inset: 0; pointer-events: none; background-image: linear-gradient(rgba(168,196,138,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(168,196,138,.04) 1px, transparent 1px); background-size: 54px 54px; mask-image: linear-gradient(180deg, rgba(0,0,0,.76), transparent 84%); }
        .admin-shell { max-width: 1440px; margin: 0 auto; position: relative; z-index: 1; }
        .admin-topbar { display: grid; grid-template-columns: 1fr auto; gap: 22px; align-items: end; margin-bottom: 22px; }
        .admin-kicker { color: var(--g3); font-size: 12px; font-weight: 900; letter-spacing: .18em; text-transform: uppercase; margin-bottom: 14px; }
        .admin-title { font-family: 'Playfair Display', serif; font-size: clamp(42px, 6vw, 78px); line-height: .92; letter-spacing: -.055em; margin: 0 0 12px; }
        .admin-title em { color: var(--g3); font-style: italic; font-weight: 500; }
        .admin-sub { color: var(--muted); margin: 0; line-height: 1.7; max-width: 680px; }
        .admin-actions, .admin-tabs { display: flex; flex-wrap: wrap; gap: 12px; justify-content: flex-end; }
        .admin-tabs { justify-content: flex-start; margin-bottom: 22px; }
        .admin-btn, .admin-tab { min-height: 48px; padding: 0 20px; border-radius: 999px; border: 1px solid rgba(168,196,138,.34); color: #eff8e7; background: linear-gradient(135deg, var(--g2), var(--g0)); box-shadow: 0 0 28px rgba(106,140,82,.24), inset 0 1px 0 rgba(255,255,255,.13); font-size: 12px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; }
        .admin-tab { background: rgba(5,8,5,.36); box-shadow: none; color: var(--muted); }
        .admin-tab.is-active { color: #eff8e7; background: linear-gradient(135deg, var(--g2), var(--g0)); box-shadow: 0 0 28px rgba(106,140,82,.22); }
        .admin-btn.danger { background: linear-gradient(135deg, #b8453b, #6f1f1a); border-color: rgba(255,149,140,.28); box-shadow: 0 0 26px rgba(184,69,59,.22); }
        .admin-panel, .admin-card, .admin-table-wrap, .admin-empty, .admin-form { border: 1px solid rgba(168,196,138,.24); background: linear-gradient(160deg, rgba(45,74,36,.30), rgba(13,22,10,.74)); backdrop-filter: blur(30px) saturate(160%); -webkit-backdrop-filter: blur(30px) saturate(160%); box-shadow: 0 28px 90px rgba(0,0,0,.36), inset 0 1px 0 rgba(255,255,255,.08); position: relative; overflow: hidden; }
        .admin-panel::before, .admin-card::before, .admin-table-wrap::before, .admin-form::before { content: ''; position: absolute; inset: 0; pointer-events: none; background: radial-gradient(circle at 18% 0%, rgba(168,196,138,.13), transparent 34%); }
        .admin-panel, .admin-form { border-radius: 32px; padding: clamp(20px, 3vw, 28px); margin-bottom: 22px; }
        .admin-search-row { display: grid; grid-template-columns: 1fr auto; gap: 14px; align-items: center; position: relative; z-index: 1; }
        .admin-search, .admin-input, .admin-textarea, .admin-select { width: 100%; min-height: 54px; border-radius: 18px; border: 1px solid rgba(168,196,138,.28); background: rgba(5,8,5,.46); color: var(--text); outline: none; padding: 0 18px; font-size: 16px; box-sizing: border-box; box-shadow: inset 0 1px 0 rgba(255,255,255,.06); }
        .admin-textarea { min-height: 180px; padding: 16px 18px; resize: vertical; line-height: 1.65; font-family: inherit; }
        .admin-textarea.content { min-height: 360px; font-family: ui-monospace, SFMono-Regular, Consolas, monospace; font-size: 14px; }
        .admin-search::placeholder, .admin-input::placeholder, .admin-textarea::placeholder { color: rgba(237,248,230,.38); }
        .admin-stats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin-bottom: 22px; }
        .admin-card { border-radius: 28px; padding: 24px; min-height: 138px; }
        .admin-card > *, .admin-form > * { position: relative; z-index: 1; }
        .admin-card span { color: var(--muted); font-size: 11px; font-weight: 900; letter-spacing: .12em; text-transform: uppercase; }
        .admin-card strong { display: block; color: var(--g3); font-family: 'Playfair Display', serif; font-size: clamp(38px, 5vw, 58px); line-height: 1; margin: 18px 0 8px; }
        .admin-card small { color: rgba(237,248,230,.48); }
        .admin-table-wrap { border-radius: 32px; overflow: hidden; margin-bottom: 22px; }
        .admin-table-head { display: flex; justify-content: space-between; gap: 18px; align-items: center; padding: 22px 24px; border-bottom: 1px solid rgba(168,196,138,.16); position: relative; z-index: 1; }
        .admin-table-head h2, .admin-form h2 { margin: 0; font-size: 22px; color: var(--text); }
        .admin-table-head p, .admin-form p { margin: 4px 0 0; color: var(--muted); font-size: 13px; line-height: 1.6; }
        .admin-table-scroll { overflow-x: auto; position: relative; z-index: 1; }
        .admin-table { width: 100%; border-collapse: collapse; min-width: 940px; }
        .admin-table th { text-align: left; padding: 18px; color: rgba(237,248,230,.62); font-size: 11px; letter-spacing: .12em; text-transform: uppercase; border-bottom: 1px solid rgba(168,196,138,.14); background: rgba(5,8,5,.24); }
        .admin-table td { padding: 18px; color: rgba(237,248,230,.78); border-bottom: 1px solid rgba(168,196,138,.10); font-size: 14px; vertical-align: top; }
        .admin-table tbody tr:hover { background: rgba(168,196,138,.055); }
        .admin-name { color: #fff; font-weight: 800; display: block; margin-bottom: 4px; }
        .admin-email { color: rgba(237,248,230,.48); font-size: 12px; }
        .admin-chip { display: inline-flex; align-items: center; min-height: 30px; padding: 0 12px; border-radius: 999px; background: rgba(168,196,138,.08); border: 1px solid rgba(168,196,138,.20); color: var(--g4); font-size: 12px; font-weight: 800; }
        .admin-chip.draft { color: #ffd9a8; border-color: rgba(255,217,168,.22); background: rgba(255,217,168,.08); }
        .admin-message { max-width: 280px; color: rgba(237,248,230,.58); line-height: 1.55; }
        .admin-delete, .admin-edit { min-height: 38px; padding: 0 14px; border: 1px solid rgba(255,149,140,.28); border-radius: 14px; color: #ffd5d1; background: rgba(184,69,59,.14); cursor: pointer; font-weight: 800; margin-right: 8px; }
        .admin-edit { border-color: rgba(168,196,138,.25); color: var(--g4); background: rgba(168,196,138,.09); }
        .admin-empty { border-radius: 32px; padding: 60px 24px; text-align: center; color: var(--muted); }
        .admin-empty strong { display: block; color: var(--g3); font-size: 28px; margin-bottom: 10px; }
        .admin-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 22px; }
        .admin-form-grid .full { grid-column: 1 / -1; }
        .admin-label { display: block; color: rgba(237,248,230,.64); font-size: 11px; font-weight: 900; letter-spacing: .12em; text-transform: uppercase; margin-bottom: 8px; }
        .admin-form-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 18px; }
        @media (max-width: 980px) { .admin-topbar { grid-template-columns: 1fr; } .admin-actions { justify-content: flex-start; } .admin-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 620px) { .admin-dashboard-page { padding-left: 16px; padding-right: 16px; } .admin-actions, .admin-search-row, .admin-form-grid { display: grid; grid-template-columns: 1fr; } .admin-btn, .admin-tab { width: 100%; } .admin-stats { grid-template-columns: 1fr; } .admin-card { min-height: 112px; } .admin-table-head { display: block; } .admin-form-grid .full { grid-column: auto; } }
      `}</style>

      <div className="admin-shell">
        <header className="admin-topbar">
          <div>
            <div className="admin-kicker">Dashboard seguro</div>
            <h1 className="admin-title">Painel de <em>{activeTab === 'blog' ? 'blog' : 'leads'}</em></h1>
            <p className="admin-sub">Central profissional para acompanhar cotações e publicar artigos personalizados no blog do site.</p>
          </div>
          <div className="admin-actions">
            <button className="admin-btn" onClick={activeTab === 'blog' ? novoPost : exportarCSV}>{activeTab === 'blog' ? 'Novo post' : 'Exportar CSV'}</button>
            <button className="admin-btn danger" onClick={handleLogout}>Sair</button>
          </div>
        </header>

        <nav className="admin-tabs">
          <button className={`admin-tab${activeTab === 'leads' ? ' is-active' : ''}`} onClick={() => setActiveTab('leads')}>Leads</button>
          <button className={`admin-tab${activeTab === 'blog' ? ' is-active' : ''}`} onClick={() => setActiveTab('blog')}>Blog / Posts</button>
        </nav>

        <section className="admin-stats">
          {stats.map(([label, value, hint]) => (
            <div className="admin-card" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{hint}</small>
            </div>
          ))}
        </section>

        {activeTab === 'leads' ? (
          <>
            <section className="admin-panel">
              <div className="admin-search-row">
                <input className="admin-search" type="text" value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar por nome, e-mail, telefone ou operadora..." />
                <button className="admin-btn admin-refresh" onClick={() => carregarLeads()}>Atualizar</button>
              </div>
            </section>

            <section className="admin-table-wrap">
              <div className="admin-table-head"><div><h2>Leads recebidos</h2><p>{loading ? 'Carregando dados...' : `${leadsFiltrados.length} registro(s) encontrado(s)`}</p></div></div>
              {loading ? <div className="admin-empty"><strong>Carregando...</strong><span>Buscando leads no banco de dados.</span></div> : leadsFiltrados.length === 0 ? <div className="admin-empty"><strong>Nenhum lead encontrado</strong><span>{busca ? 'Tente ajustar a busca.' : 'Os novos contatos aparecerão aqui.'}</span></div> : (
                <div className="admin-table-scroll"><table className="admin-table"><thead><tr><th>Cliente</th><th>Telefone</th><th>Operadora</th><th>Vidas</th><th>Mensagem</th><th>Data</th><th>Ação</th></tr></thead><tbody>{leadsFiltrados.map((lead) => (<tr key={lead.id}><td><span className="admin-name">{lead.nome || 'Sem nome'}</span><span className="admin-email">{lead.email || 'Sem e-mail'}</span></td><td>{lead.telefone || '-'}</td><td><span className="admin-chip">{lead.operadora || 'Não informado'}</span></td><td>{lead.vidas || '-'}</td><td><div className="admin-message">{lead.mensagem || '-'}</div></td><td>{formatLeadDate(lead)}</td><td><button className="admin-delete" onClick={() => deletarLead(lead.id)}>Deletar</button></td></tr>))}</tbody></table></div>
              )}
            </section>
          </>
        ) : (
          <>
            <section className="admin-form">
              <h2>{postForm.id ? 'Editar post' : 'Novo post'}</h2>
              <p>Use Markdown simples: títulos com <strong>##</strong>, subtítulos com <strong>###</strong> e parágrafos separados por linha em branco.</p>
              <form onSubmit={salvarPost}>
                <div className="admin-form-grid">
                  <div><label className="admin-label">Título</label><input className="admin-input" value={postForm.titulo} onChange={(e) => handlePostChange('titulo', e.target.value)} required /></div>
                  <div><label className="admin-label">Slug</label><input className="admin-input" value={postForm.slug} onChange={(e) => handlePostChange('slug', slugify(e.target.value))} required /></div>
                  <div><label className="admin-label">Categoria</label><input className="admin-input" value={postForm.categoria} onChange={(e) => handlePostChange('categoria', e.target.value)} /></div>
                  <div><label className="admin-label">Status</label><select className="admin-select" value={postForm.status} onChange={(e) => handlePostChange('status', e.target.value)}><option value="published">Publicado</option><option value="draft">Rascunho</option></select></div>
                  <div className="full"><label className="admin-label">Resumo</label><textarea className="admin-textarea" value={postForm.resumo} onChange={(e) => handlePostChange('resumo', e.target.value)} /></div>
                  <div className="full"><label className="admin-label">Imagem destacada URL</label><input className="admin-input" value={postForm.imagem_url || ''} onChange={(e) => handlePostChange('imagem_url', e.target.value)} placeholder="https://..." /></div>
                  <div><label className="admin-label">SEO title</label><input className="admin-input" value={postForm.seo_title || ''} onChange={(e) => handlePostChange('seo_title', e.target.value)} /></div>
                  <div><label className="admin-label">SEO description</label><input className="admin-input" value={postForm.seo_description || ''} onChange={(e) => handlePostChange('seo_description', e.target.value)} /></div>
                  <div className="full"><label className="admin-label">Conteúdo</label><textarea className="admin-textarea content" value={postForm.conteudo} onChange={(e) => handlePostChange('conteudo', e.target.value)} required /></div>
                </div>
                <div className="admin-form-actions"><button className="admin-btn" disabled={savingPost} type="submit">{savingPost ? 'Salvando...' : 'Salvar post'}</button><button className="admin-tab" type="button" onClick={() => setPostForm(emptyPost)}>Limpar</button>{postForm.slug && <a className="admin-tab" href={`/blog/${postForm.slug}`} target="_blank" rel="noopener noreferrer">Ver post</a>}</div>
              </form>
            </section>

            <section className="admin-panel"><div className="admin-search-row"><input className="admin-search" value={postBusca} onChange={(e) => setPostBusca(e.target.value)} placeholder="Buscar posts por título, categoria ou slug..." /><button className="admin-btn" onClick={() => carregarPosts()}>Atualizar</button></div></section>
            <section className="admin-table-wrap"><div className="admin-table-head"><div><h2>Posts do blog</h2><p>{postsLoading ? 'Carregando posts...' : `${postsFiltrados.length} post(s) encontrado(s)`}</p></div></div>{postsLoading ? <div className="admin-empty"><strong>Carregando...</strong><span>Buscando posts no banco de dados.</span></div> : postsFiltrados.length === 0 ? <div className="admin-empty"><strong>Nenhum post encontrado</strong><span>Crie seu primeiro artigo acima.</span></div> : <div className="admin-table-scroll"><table className="admin-table"><thead><tr><th>Post</th><th>Categoria</th><th>Status</th><th>Visualizações</th><th>Atualizado</th><th>Ações</th></tr></thead><tbody>{postsFiltrados.map((post) => <tr key={post.id}><td><span className="admin-name">{post.titulo}</span><span className="admin-email">/{post.slug}</span></td><td><span className="admin-chip">{post.categoria}</span></td><td><span className={`admin-chip${post.status === 'draft' ? ' draft' : ''}`}>{post.status === 'published' ? 'Publicado' : 'Rascunho'}</span></td><td>{post.visualizacoes || 0}</td><td>{formatDate(post.atualizado_em || post.data_publicacao)}</td><td><button className="admin-edit" onClick={() => editarPost(post)}>Editar</button><button className="admin-delete" onClick={() => deletarPost(post.id)}>Deletar</button></td></tr>)}</tbody></table></div>}</section>
          </>
        )}
      </div>
    </main>
  );
}
