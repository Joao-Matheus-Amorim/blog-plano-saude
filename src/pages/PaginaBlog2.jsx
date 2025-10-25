import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import SEO from '../components/SEO.jsx';

const supabaseUrl = "https://jdrglgiyyjxyytjcfzbj.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkcmdsZ2l5eWp4eXl0amNmemJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNDA2NTQsImV4cCI6MjA3NTkxNjY1NH0.RPoOtFDmxGSscfn1tIET055miHdOW25w0K7vqA7NT98";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function PaginaBlog2() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todos');
  const [busca, setBusca] = useState('');

  useEffect(() => {
    carregarPosts();
  }, []);

  const carregarPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_post')
        .select('*')
        .eq('ativo', true)
        .order('data_publicacao', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const categorias = ['Todos', ...new Set(posts.map(p => p.categoria))];

  const postsFiltrados = posts.filter(post => {
    const matchCategoria = categoriaFiltro === 'Todos' || post.categoria === categoriaFiltro;
    const matchBusca = busca === '' || 
      post.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      post.resumo?.toLowerCase().includes(busca.toLowerCase());
    return matchCategoria && matchBusca;
  });

  return (
    <>
      <SEO
        title="Blog - Dicas e Guias Sobre Planos de Saúde"
        description="Aprenda tudo sobre planos de saúde: como escolher, comparativos, dicas de economia e muito mais."
        keywords="blog planos saúde, dicas plano saúde, guia completo"
        url="https://consultoriadesaude.vercel.app/blog"
      />

      <div style={{
        paddingTop: 'clamp(100px, 12vh, 140px)',
        background: 'linear-gradient(180deg, #FAF8F5 0%, #FFFFFF 100%)',
        minHeight: '100vh'
      }}>
        {/* HERO */}
        <section style={{
          padding: 'clamp(60px, 10vh, 100px) clamp(40px, 8vw, 100px) clamp(40px, 6vh, 60px)',
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: 'clamp(36px, 5.5vw, 56px)',
            fontWeight: '300',
            color: '#8B7E74',
            margin: '0 0 clamp(20px, 2.5vw, 28px)',
            fontFamily: "'Playfair Display', serif"
          }}>
            Blog de Planos de Saúde
          </h1>

          <p style={{
            fontSize: 'clamp(15px, 1.8vw, 18px)',
            color: '#6B6662',
            maxWidth: '650px',
            margin: '0 auto'
          }}>
            Dicas e guias completos para te ajudar
          </p>
        </section>

        {/* BUSCA */}
        <section style={{
          padding: '0 clamp(40px, 8vw, 100px) clamp(40px, 6vh, 60px)',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="🔍 Buscar artigos..."
            style={{
              width: '100%',
              padding: '14px 20px',
              border: '2px solid rgba(197, 188, 181, 0.2)',
              borderRadius: '12px',
              fontSize: '15px',
              marginBottom: '20px'
            }}
          />

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {categorias.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoriaFiltro(cat)}
                style={{
                  padding: '10px 20px',
                  background: categoriaFiltro === cat ? '#A8877A' : 'rgba(197, 188, 181, 0.1)',
                  color: categoriaFiltro === cat ? 'white' : '#8B7E74',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* POSTS COM LINKS FUNCIONANDO */}
        <section style={{
          padding: '0 clamp(40px, 8vw, 100px) clamp(80px, 12vh, 120px)',
          maxWidth: '1300px',
          margin: '0 auto'
        }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <p>Carregando...</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 350px), 1fr))',
              gap: 'clamp(24px, 3vw, 32px)'
            }}>
              {postsFiltrados.map(post => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  style={{
                    textDecoration: 'none',
                    background: 'white',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1px solid rgba(197, 188, 181, 0.15)',
                    boxShadow: '0 4px 12px rgba(139, 126, 116, 0.08)',
                    transition: 'all 0.3s ease',
                    display: 'block'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 16px 40px rgba(139, 126, 116, 0.15)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 126, 116, 0.08)';
                  }}
                >
                  {post.imagem_url && (
                    <img
                      src={post.imagem_url}
                      alt={post.titulo}
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover'
                      }}
                    />
                  )}

                  <div style={{ padding: '24px' }}>
                    <div style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      background: 'rgba(168, 135, 122, 0.1)',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#A8877A',
                      marginBottom: '16px'
                    }}>
                      {post.categoria}
                    </div>

                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: '600',
                      color: '#8B7E74',
                      marginBottom: '12px'
                    }}>
                      {post.titulo}
                    </h3>

                    <p style={{
                      fontSize: '15px',
                      color: '#6B6662',
                      lineHeight: 1.7,
                      marginBottom: '16px'
                    }}>
                      {post.resumo}
                    </p>

                    <div style={{
                      paddingTop: '16px',
                      borderTop: '1px solid rgba(197, 188, 181, 0.15)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '13px',
                      color: '#9B9289'
                    }}>
                      <span>{new Date(post.data_publicacao).toLocaleDateString('pt-BR')}</span>
                      <span style={{ color: '#A8877A', fontWeight: '600' }}>Ler mais →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
