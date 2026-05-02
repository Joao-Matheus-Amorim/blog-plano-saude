import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';

function slugify(text = '') {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function normalizePost(post, index) {
  const rawDate = post.data_publicacao || post.publicado_em || post.data || new Date().toISOString();
  return {
    ...post,
    id: post.id || `${index}`,
    titulo: post.titulo || 'Sem titulo',
    slug: post.slug || slugify(post.titulo || `post-${index}`),
    categoria: post.categoria || 'Geral',
    resumo: post.resumo || (post.conteudo ? `${post.conteudo.slice(0, 140)}...` : ''),
    autor: post.autor || 'Maisa Valentim',
    data_publicacao: rawDate,
    ativo: post.ativo !== false,
    visualizacoes: post.visualizacoes || 0,
  };
}

function renderMarkdown(content = '') {
  return content
    .split('\n\n')
    .map((block) => {
      const text = block.trim();
      if (!text) return '';
      if (text.startsWith('### ')) {
        return `<h3 style="font-size: clamp(21px, 3vw, 26px); color: #8B7E74; font-weight: 500; margin: 36px 0 18px;">${text.replace('### ', '')}</h3>`;
      }
      if (text.startsWith('## ')) {
        return `<h2 style="font-size: clamp(24px, 3.5vw, 32px); color: #8B7E74; font-weight: 400; margin: 48px 0 24px; font-family: 'Playfair Display', serif;">${text.replace('## ', '')}</h2>`;
      }
      if (text.startsWith('- ')) {
        const items = text.split('\n').map(item => `<li style="margin-bottom: 10px;">${item.replace(/^- /, '')}</li>`).join('');
        return `<ul style="margin: 0 0 24px 22px; padding: 0;">${items}</ul>`;
      }
      return `<p style="margin-bottom: 24px;">${text.replaceAll('\n', '<br/>')}</p>`;
    })
    .join('');
}

export default function PaginaBlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [postsRelacionados, setPostsRelacionados] = useState([]);

  useEffect(() => {
    carregarPost();
  }, [slug]);

  const carregarPost = async () => {
    try {
      setLoading(true);
      let allPosts = [];
      let postData = null;

      try {
        const response = await fetch(`/api/blog/get?slug=${encodeURIComponent(slug)}`);
        if (!response.ok) throw new Error('CMS post indisponível');
        postData = normalizePost(await response.json());

        const listResponse = await fetch('/api/blog/list');
        if (listResponse.ok) {
          const list = await listResponse.json();
          allPosts = (list || []).map(normalizePost).filter(item => item.ativo);
        }
      } catch (apiError) {
        console.warn('CMS indisponível, usando fallback estático:', apiError);
        const response = await fetch('/data/db.json');
        if (!response.ok) throw new Error('Falha ao carregar post');
        const db = await response.json();
        allPosts = (db.posts || []).map(normalizePost).filter(item => item.ativo);
        postData = allPosts.find(item => item.slug === slug);
      }

      if (!postData) {
        setPost(null);
        setPostsRelacionados([]);
        return;
      }

      setPost(postData);

      const relacionados = allPosts
        .filter(item => item.id !== postData.id && item.categoria === postData.categoria)
        .slice(0, 3);

      setPostsRelacionados(relacionados);
    } catch (error) {
      console.error('Erro ao carregar post:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ paddingTop: 'clamp(100px, 12vh, 140px)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}><div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div><p style={{ color: '#8B7E74' }}>Carregando artigo...</p></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ paddingTop: 'clamp(100px, 12vh, 140px)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}><div style={{ fontSize: '48px', marginBottom: '16px' }}>😕</div><h2 style={{ color: '#8B7E74', marginBottom: '16px' }}>Post não encontrado</h2><Link to="/blog" style={{ color: '#A8877A', textDecoration: 'none', fontWeight: '600' }}>← Voltar para o Blog</Link></div>
      </div>
    );
  }

  return (
    <>
      <SEO title={`${post.seo_title || post.titulo} | Blog`} description={post.seo_description || post.resumo || post.titulo} keywords={`${post.categoria}, ${post.titulo}, planos de saúde`} url={`https://consultoriadesaude.vercel.app/blog/${post.slug}`} />

      <article style={{ paddingTop: 'clamp(100px, 12vh, 140px)', background: 'linear-gradient(180deg, #FAF8F5 0%, #FFFFFF 100%)', minHeight: '100vh' }}>
        <header style={{ maxWidth: '900px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 40px) clamp(40px, 6vh, 60px)' }}>
          <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#8B7E74', textDecoration: 'none', fontSize: '15px', fontWeight: '500', marginBottom: '32px' }}>← Voltar para o Blog</Link>
          <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(168, 135, 122, 0.1)', borderRadius: '8px', fontSize: '13px', fontWeight: '600', color: '#A8877A', marginBottom: '20px' }}>{post.categoria}</div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '300', color: '#8B7E74', lineHeight: 1.2, marginBottom: '16px', fontFamily: "'Playfair Display', serif" }}>{post.titulo}</h1>
          {post.resumo && <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: '#6B6662', lineHeight: 1.7, marginBottom: '24px' }}>{post.resumo}</p>}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', paddingTop: '16px', borderTop: '1px solid rgba(197, 188, 181, 0.2)', fontSize: '14px', color: '#9B9289' }}>
            <span>Por {post.autor}</span><span>•</span><span>{new Date(post.data_publicacao).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}</span><span>•</span><span>{post.visualizacoes || 0} visualizações</span>
          </div>
        </header>

        {post.imagem_url && <div style={{ maxWidth: '1200px', margin: '0 auto clamp(40px, 6vh, 60px)', padding: '0 clamp(20px, 5vw, 40px)' }}><img src={post.imagem_url} alt={post.titulo} style={{ width: '100%', height: 'clamp(300px, 50vh, 500px)', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 16px 48px rgba(139, 126, 116, 0.15)' }} /></div>}

        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 40px) clamp(60px, 8vh, 80px)' }}>
          <div style={{ fontSize: 'clamp(16px, 2vw, 18px)', color: '#333', lineHeight: 1.9, fontWeight: '300' }} dangerouslySetInnerHTML={{ __html: renderMarkdown(post.conteudo) }} />
        </section>

        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 40px) clamp(60px, 8vh, 80px)', textAlign: 'center' }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(168, 135, 122, 0.08) 0%, rgba(139, 126, 116, 0.05) 100%)', padding: 'clamp(40px, 6vw, 60px)', borderRadius: '16px', border: '1px solid rgba(197, 188, 181, 0.2)' }}>
            <h3 style={{ fontSize: 'clamp(24px, 3.5vw, 32px)', color: '#8B7E74', fontWeight: '300', marginBottom: '16px', fontFamily: "'Playfair Display', serif" }}>Precisa de Ajuda?</h3>
            <p style={{ fontSize: 'clamp(15px, 1.8vw, 17px)', color: '#6B6662', marginBottom: '32px', lineHeight: 1.7 }}>Fale comigo para uma consultoria gratuita e personalizada</p>
            <Link to="/contato" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '16px 40px', background: 'linear-gradient(135deg, #A8877A 0%, #8B7E74 100%)', color: 'white', textDecoration: 'none', fontSize: '16px', fontWeight: '600', borderRadius: '12px', boxShadow: '0 8px 24px rgba(168, 135, 122, 0.3)' }}>Solicitar Cotação →</Link>
          </div>
        </section>

        {postsRelacionados.length > 0 && <section style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(60px, 8vh, 80px) clamp(20px, 5vw, 40px)' }}><h3 style={{ fontSize: 'clamp(24px, 3.5vw, 32px)', color: '#8B7E74', fontWeight: '300', textAlign: 'center', marginBottom: 'clamp(40px, 5vh, 60px)', fontFamily: "'Playfair Display', serif" }}>Artigos Relacionados</h3><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '24px' }}>{postsRelacionados.map(relacionado => <Link key={relacionado.id} to={`/blog/${relacionado.slug}`} style={{ textDecoration: 'none', background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(197, 188, 181, 0.15)' }}><div style={{ padding: '20px' }}><div style={{ fontSize: '11px', color: '#A8877A', fontWeight: '600', marginBottom: '8px' }}>{relacionado.categoria}</div><h4 style={{ fontSize: '18px', color: '#8B7E74', fontWeight: '600', marginBottom: '8px', lineHeight: 1.3 }}>{relacionado.titulo}</h4><p style={{ fontSize: '14px', color: '#6B6662', lineHeight: 1.6 }}>{relacionado.resumo?.substring(0, 100)}...</p></div></Link>)}</div></section>}
      </article>
    </>
  );
}
