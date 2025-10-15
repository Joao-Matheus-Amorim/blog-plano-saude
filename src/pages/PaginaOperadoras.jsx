import { Link } from 'react-router-dom';

function PaginaOperadoras() {
  const operadoras = [
    {
      nome: 'Bradesco Saúde',
      cor: '#8B1538', // Vinho oficial Bradesco
      corSecundaria: '#FFFFFF',
      descricao: 'Uma das maiores operadoras do Brasil, com ampla rede credenciada e tecnologia de ponta.',
      diferenciais: ['App completo', 'Telemedicina 24h', 'Rede nacional']
    },
    {
      nome: 'Porto Seguro',
      cor: '#003D7A', // Azul oficial Porto
      corSecundaria: '#FFFFFF',
      descricao: 'Inovação e tecnologia com foco em prevenção e qualidade de vida.',
      diferenciais: ['Clube de vantagens', 'Telemedicina grátis', 'Desconto academias']
    },
    {
      nome: 'SulAmérica',
      cor: '#003087', // Azul SulAmérica
      corSecundaria: '#FF6B35', // Laranja oficial
      descricao: 'Tradição e credibilidade com mais de 125 anos no mercado de seguros e saúde.',
      diferenciais: ['Descontos farmácias', 'Check-up anual', 'Orientação médica']
    },
    {
      nome: 'Amil',
      cor: '#0066B3', // Azul Amil oficial
      corSecundaria: '#FFFFFF',
      descricao: 'Líder em planos de saúde no Brasil, com excelência em atendimento e tecnologia.',
      diferenciais: ['Hospitais próprios', 'Programas de saúde', 'Cobertura internacional']
    },
    {
      nome: 'Prevent Senior',
      cor: '#003057', // Azul Prussian oficial
      corSecundaria: '#7FD13B', // Verde
      descricao: 'Especializada em atendimento a idosos, com infraestrutura própria e preços acessíveis.',
      diferenciais: ['Foco em idosos', 'Hospitais próprios', 'Preço diferenciado']
    },
    {
      nome: 'Unimed',
      cor: '#00953B', // Verde oficial Unimed
      corSecundaria: '#FFFFFF',
      descricao: 'A maior rede de cooperativas médicas do mundo, com atendimento humanizado e médicos cooperados.',
      diferenciais: ['Rede hospitalar própria', 'Médicos cooperados', 'Cobertura nacional']
    },
  ];

  return (
    <div style={{
      paddingTop: 'clamp(100px, 12vh, 140px)',
      background: 'linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 50%, #F5F5F5 100%)',
      minHeight: '100vh'
    }}>
      
      {/* HERO SECTION */}
      <section style={{
        padding: 'clamp(60px, 10vh, 100px) clamp(40px, 8vw, 100px) clamp(80px, 10vh, 120px)',
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 20px',
          background: 'rgba(0, 0, 0, 0.03)',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          borderRadius: '20px',
          fontSize: 'clamp(10px, 1.2vw, 11px)',
          color: '#666',
          fontWeight: '600',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: 'clamp(24px, 3vw, 32px)'
        }}>
          Operadoras Parceiras
        </div>

        <h1 style={{
          fontSize: 'clamp(36px, 5.5vw, 56px)',
          fontWeight: '300',
          color: '#1A1A1A',
          margin: '0 0 clamp(20px, 2.5vw, 28px)',
          lineHeight: 1.15,
          letterSpacing: '-0.03em',
          fontFamily: "'Inter', -apple-system, sans-serif"
        }}>
          As Melhores Operadoras<br/>do Mercado
        </h1>

        <p style={{
          fontSize: 'clamp(15px, 1.8vw, 18px)',
          color: '#666',
          lineHeight: 1.7,
          fontWeight: '400',
          maxWidth: '650px',
          margin: '0 auto clamp(40px, 5vw, 56px)'
        }}>
          Trabalho com as principais operadoras de saúde do Brasil para oferecer 
          a você a melhor opção com o melhor preço.
        </p>
      </section>

      {/* SEÇÃO: CARDS MINIMALISTAS */}
      <section style={{
        padding: '0 clamp(40px, 8vw, 100px) clamp(80px, 12vh, 120px)',
        maxWidth: '1300px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
          gap: 'clamp(24px, 3vw, 32px)'
        }}>
          {operadoras.map((op, index) => (
            <Link key={index} to="/contato" state={{ operadora: op.nome }} style={{
              textDecoration: 'none',
              display: 'block'
            }}>
              <div style={{
                position: 'relative',
                background: '#FFFFFF',
                border: `1px solid ${op.cor}15`,
                borderRadius: '16px',
                padding: '0',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
                cursor: 'pointer',
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = `0 20px 50px ${op.cor}25`;
                e.currentTarget.style.borderColor = `${op.cor}40`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.04)';
                e.currentTarget.style.borderColor = `${op.cor}15`;
              }}
              >
                {/* Header com cor da marca */}
                <div style={{
                  background: op.corSecundaria !== '#FFFFFF' 
                    ? `linear-gradient(135deg, ${op.cor} 0%, ${op.corSecundaria} 100%)`
                    : op.cor,
                  padding: 'clamp(32px, 4vw, 40px)',
                  borderBottom: `1px solid ${op.cor}10`
                }}>
                  <h3 style={{
                    fontSize: 'clamp(22px, 2.8vw, 28px)',
                    color: '#FFFFFF',
                    fontWeight: '600',
                    margin: 0,
                    fontFamily: "'Inter', -apple-system, sans-serif",
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em',
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                  }}>
                    {op.nome}
                  </h3>
                </div>

                {/* Conteúdo */}
                <div style={{
                  padding: 'clamp(28px, 3.5vw, 36px)',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  {/* Descrição */}
                  <p style={{
                    fontSize: 'clamp(14px, 1.6vw, 15px)',
                    color: '#4A4A4A',
                    lineHeight: 1.7,
                    fontWeight: '400',
                    marginBottom: 'clamp(24px, 3vw, 28px)',
                    flex: 1
                  }}>
                    {op.descricao}
                  </p>

                  {/* Diferenciais */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    marginBottom: 'clamp(24px, 3vw, 28px)',
                    paddingTop: 'clamp(20px, 2.5vw, 24px)',
                    borderTop: '1px solid rgba(0, 0, 0, 0.06)'
                  }}>
                    {op.diferenciais.map((dif, i) => (
                      <div key={i} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: 'clamp(13px, 1.5vw, 14px)',
                        color: '#333',
                        fontWeight: '500'
                      }}>
                        <span style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          background: `${op.cor}12`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          color: op.cor,
                          fontWeight: 'bold',
                          flexShrink: 0
                        }}>✓</span>
                        {dif}
                      </div>
                    ))}
                  </div>

                  {/* Botão minimalista */}
                  <div style={{
                    background: op.corSecundaria !== '#FFFFFF'
                      ? `linear-gradient(135deg, ${op.cor} 0%, ${op.corSecundaria} 100%)`
                      : op.cor,
                    padding: '14px 24px',
                    textAlign: 'center',
                    fontWeight: '600',
                    fontSize: 'clamp(13px, 1.5vw, 14px)',
                    color: '#FFFFFF',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    borderRadius: '10px',
                    boxShadow: `0 4px 16px ${op.cor}20`,
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = `0 8px 24px ${op.cor}35`;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = `0 4px 16px ${op.cor}20`;
                  }}
                  >
                    Solicitar Cotação
                    <span style={{ fontSize: '14px' }}>→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SEÇÃO: DIFERENCIAIS */}
      <section style={{
        padding: 'clamp(80px, 12vh, 120px) clamp(40px, 8vw, 100px)',
        background: '#FAFAFA',
        borderTop: '1px solid rgba(0, 0, 0, 0.06)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.06)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(28px, 4.5vw, 42px)',
            fontWeight: '300',
            color: '#1A1A1A',
            textAlign: 'center',
            marginBottom: 'clamp(48px, 6vw, 72px)',
            letterSpacing: '-0.02em'
          }}>
            Por Que Contratar Comigo?
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
            gap: 'clamp(32px, 4vw, 48px)'
          }}>
            {[
              { emoji: '🎯', title: 'Análise Personalizada', desc: 'Avalio seu perfil para encontrar o plano ideal com melhor custo-benefício.' },
              { emoji: '💰', title: 'Economia Garantida', desc: 'Negocio os melhores preços diretamente com as operadoras.' },
              { emoji: '📞', title: 'Suporte Vitalício', desc: 'Estou disponível para ajudá-lo sempre que precisar, mesmo após a contratação.' },
              { emoji: '⚡', title: 'Agilidade', desc: 'Processo rápido e sem burocracia. Resposta em até 24 horas.' }
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontSize: '44px', 
                  marginBottom: '16px',
                  filter: 'grayscale(0.2)'
                }}>{item.emoji}</div>
                <h3 style={{
                  fontSize: 'clamp(17px, 2vw, 20px)',
                  color: '#1A1A1A',
                  fontWeight: '600',
                  marginBottom: '10px',
                  letterSpacing: '-0.01em'
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: 'clamp(14px, 1.6vw, 15px)',
                  color: '#666',
                  lineHeight: 1.7,
                  fontWeight: '400'
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{
        padding: 'clamp(80px, 12vh, 120px) clamp(40px, 8vw, 100px)',
        maxWidth: '900px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: 'clamp(28px, 4.5vw, 42px)',
          fontWeight: '300',
          color: '#1A1A1A',
          marginBottom: 'clamp(20px, 2.5vw, 28px)',
          letterSpacing: '-0.02em'
        }}>
          Pronto Para Encontrar Seu Plano Ideal?
        </h2>

        <p style={{
          fontSize: 'clamp(15px, 1.8vw, 17px)',
          color: '#666',
          lineHeight: 1.7,
          fontWeight: '400',
          marginBottom: 'clamp(40px, 5vw, 56px)'
        }}>
          Solicite uma cotação gratuita e sem compromisso. 
          Vou analisar as melhores opções para você!
        </p>

        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link to="/contato" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: 'clamp(16px, 2vw, 18px) clamp(36px, 5vw, 48px)',
            background: '#1A1A1A',
            color: 'white',
            textDecoration: 'none',
            fontSize: 'clamp(14px, 1.7vw, 15px)',
            fontWeight: '600',
            borderRadius: '10px',
            transition: 'all 0.4s ease',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
            letterSpacing: '0.02em'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.25)';
            e.currentTarget.style.background = '#000000';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
            e.currentTarget.style.background = '#1A1A1A';
          }}
          >
            Solicitar Cotação
            <span style={{ fontSize: '16px' }}>→</span>
          </Link>

          <a href="https://wa.me/5521977472141?text=Olá!%20Gostaria%20de%20cotar%20um%20plano%20de%20saúde." target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: 'clamp(16px, 2vw, 18px) clamp(36px, 5vw, 48px)',
            background: '#25D366',
            color: 'white',
            textDecoration: 'none',
            fontSize: 'clamp(14px, 1.7vw, 15px)',
            fontWeight: '600',
            borderRadius: '10px',
            transition: 'all 0.4s ease',
            boxShadow: '0 4px 16px rgba(37, 211, 102, 0.3)',
            letterSpacing: '0.02em'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(37, 211, 102, 0.45)';
            e.currentTarget.style.background = '#1EBE57';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(37, 211, 102, 0.3)';
            e.currentTarget.style.background = '#25D366';
          }}
          >
            WhatsApp Direto
          </a>
        </div>
      </section>
    </div>
  );
}

export default PaginaOperadoras;
