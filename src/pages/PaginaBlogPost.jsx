import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import SEO from '../components/SEO.jsx';

const supabaseUrl = "https://jdrglgiyyjxyytjcfzbj.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkcmdsZ2l5eWp4eXl0amNmemJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNDA2NTQsImV4cCI6MjA3NTkxNjY1NH0.RPoOtFDmxGSscfn1tIET055miHdOW25w0K7vqA7NT98";
const supabase = createClient(supabaseUrl, supabaseKey);

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
      // Buscar post
      const { data: postData, error: postError } = await supabase
        .from('blog_post')
        .select('*')
        .eq('slug', slug)
        .eq('ativo', true)
        .single();

      if (postError) throw postError;
      setPost(postData);

      // Incrementar visualizações
      await supabase
        .from('blog_post')
        .update({ visualizacoes: (postData.visualizacoes || 0) + 1 })
        .eq('id', postData.id);

      // Buscar posts relacionados
      const { data: relacionados } = await supabase
        .from('blog_post')
        .select('*')
        .eq('categoria', postData.categoria)
        .neq('id', postData.id)
        .eq('ativo', true)
        .limit(3);

      setPostsRelacionados(relacionados || []);
    } catch (error) {
      console.error('Erro ao carregar post:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        paddingTop: 'clamp(100px, 12vh, 140px)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
          <p style={{ color: '#8B7E74' }}>Carregando artigo...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{
        paddingTop: 'clamp(100px, 12vh, 140px)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>😕</div>
          <h2 style={{ color: '#8B7E74', marginBottom: '16px' }}>Post não encontrado</h2>
          <Link to="/blog" style={{
            color: '#A8877A',
            textDecoration: 'none',
            fontWeight: '600'
          }}>
            ← Voltar para o Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${post.titulo} | Blog`}
        description={post.resumo || post.titulo}
        keywords={`${post.categoria}, ${post.titulo}, planos de saúde`}
        url={`https://consultoriadesaude.vercel.app/blog/${post.slug}`}
      />

      <article style={{
        paddingTop: 'clamp(100px, 12vh, 140px)',
        background: 'linear-gradient(180deg, #FAF8F5 0%, #FFFFFF 100%)',
        minHeight: '100vh'
      }}>
        {/* HEADER DO POST */}
        <header style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 clamp(20px, 5vw, 40px) clamp(40px, 6vh, 60px)'
        }}>
          <Link to="/blog" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#8B7E74',
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: '500',
            marginBottom: '32px'
          }}>
            ← Voltar para o Blog
          </Link>

          <div style={{
            display: 'inline-block',
            padding: '6px 16px',
            background: 'rgba(168, 135, 122, 0.1)',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: '600',
            color: '#A8877A',
            marginBottom: '20px'
          }}>
            {post.categoria}
          </div>

          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: '300',
            color: '#8B7E74',
            lineHeight: 1.2,
            marginBottom: '16px',
            fontFamily: "'Playfair Display', serif"
          }}>
            {post.titulo}
          </h1>

          {post.resumo && (
            <p style={{
              fontSize: 'clamp(16px, 2vw, 20px)',
              color: '#6B6662',
              lineHeight: 1.7,
              marginBottom: '24px'
            }}>
              {post.resumo}
            </p>
          )}

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            paddingTop: '16px',
            borderTop: '1px solid rgba(197, 188, 181, 0.2)',
            fontSize: '14px',
            color: '#9B9289'
          }}>
            <span>Por {post.autor}</span>
            <span>•</span>
            <span>{new Date(post.data_publicacao).toLocaleDateString('pt-BR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}</span>
            <span>•</span>
            <span>{post.visualizacoes || 0} visualizações</span>
          </div>
        </header>

        {/* IMAGEM DESTAQUE */}
        {post.imagem_url && (
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto clamp(40px, 6vh, 60px)',
            padding: '0 clamp(20px, 5vw, 40px)'
          }}>
            <img
              src={post.imagem_url}
              alt={post.titulo}
              style={{
                width: '100%',
                height: 'clamp(300px, 50vh, 500px)',
                objectFit: 'cover',
                borderRadius: '16px',
                boxShadow: '0 16px 48px rgba(139, 126, 116, 0.15)'
              }}
            />
          </div>
        )}

        {/* CONTEÚDO */}
        <section style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 clamp(20px, 5vw, 40px) clamp(60px, 8vh, 80px)'
        }}>
          <div style={{
            fontSize: 'clamp(16px, 2vw, 18px)',
            color: '#333',
            lineHeight: 1.9,
            fontWeight: '300'
          }}
          dangerouslySetInnerHTML={{
            __html: post.conteudo
              .split('\n\n')
              .map(p => p.startsWith('##') 
                ? `<h2 style="font-size: clamp(24px, 3.5vw, 32px); color: #8B7E74; font-weight: 400; margin: 48px 0 24px; font-family: 'Playfair Display', serif;">${p.replace('## ', '')}</h2>`
                : `<p style="margin-bottom: 24px;">${p}</p>`
              )
              .join('')
          }}
          />
        </section>

        {/* CTA */}
        <section style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 clamp(20px, 5vw, 40px) clamp(60px, 8vh, 80px)',
          textAlign: 'center'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(168, 135, 122, 0.08) 0%, rgba(139, 126, 116, 0.05) 100%)',
            padding: 'clamp(40px, 6vw, 60px)',
            borderRadius: '16px',
            border: '1px solid rgba(197, 188, 181, 0.2)'
          }}>
            <h3 style={{
              fontSize: 'clamp(24px, 3.5vw, 32px)',
              color: '#8B7E74',
              fontWeight: '300',
              marginBottom: '16px',
              fontFamily: "'Playfair Display', serif"
            }}>
              Precisa de Ajuda?
            </h3>
            <p style={{
              fontSize: 'clamp(15px, 1.8vw, 17px)',
              color: '#6B6662',
              marginBottom: '32px',
              lineHeight: 1.7
            }}>
              Fale comigo para uma consultoria gratuita e personalizada
            </p>
            <Link to="/contato" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '16px 40px',
              background: 'linear-gradient(135deg, #A8877A 0%, #8B7E74 100%)',
              color: 'white',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '600',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(168, 135, 122, 0.3)'
            }}>
              Solicitar Cotação →
            </Link>
          </div>
        </section>

        {/* POSTS RELACIONADOS */}
        {postsRelacionados.length > 0 && (
          <section style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: 'clamp(60px, 8vh, 80px) clamp(20px, 5vw, 40px)'
          }}>
            <h3 style={{
              fontSize: 'clamp(24px, 3.5vw, 32px)',
              color: '#8B7E74',
              fontWeight: '300',
              textAlign: 'center',
              marginBottom: 'clamp(40px, 5vh, 60px)',
              fontFamily: "'Playfair Display', serif"
            }}>
              Artigos Relacionados
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '24px'
            }}>
              {postsRelacionados.map(relacionado => (
                <Link
                  key={relacionado.id}
                  to={`/blog/${relacionado.slug}`}
                  style={{
                    textDecoration: 'none',
                    background: 'white',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid rgba(197, 188, 181, 0.15)',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  {relacionado.imagem_url && (
                    <img
                      src={relacionado.imagem_url}
                      alt={relacionado.titulo}
                      style={{
                        width: '100%',
                        height: '180px',
                        objectFit: 'cover'
                      }}
                    />
                  )}
                  <div style={{ padding: '20px' }}>
                    <div style={{
                      fontSize: '11px',
                      color: '#A8877A',
                      fontWeight: '600',
                      marginBottom: '8px'
                    }}>
                      {relacionado.categoria}
                    </div>
                    <h4 style={{
                      fontSize: '18px',
                      color: '#8B7E74',
                      fontWeight: '600',
                      marginBottom: '8px',
                      lineHeight: 1.3
                    }}>
                      {relacionado.titulo}
                    </h4>
                    <p style={{
                      fontSize: '14px',
                      color: '#6B6662',
                      lineHeight: 1.6
                    }}>
                      {relacionado.resumo?.substring(0, 100)}...
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
