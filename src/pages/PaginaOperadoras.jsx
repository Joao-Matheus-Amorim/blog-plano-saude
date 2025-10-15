import { Link } from 'react-router-dom';

function PaginaOperadoras() {
  const operadoras = [
    {
      nome: 'Unimed',
      cor: '#00A859',
      descricao: 'A maior rede de cooperativas médicas do mundo, com atendimento humanizado e médicos cooperados.',
      diferenciais: ['Rede hospitalar própria', 'Médicos cooperados', 'Cobertura nacional']
    },
    {
      nome: 'Bradesco Saúde',
      cor: '#CC0000',
      descricao: 'Uma das maiores operadoras do Brasil, com ampla rede credenciada e tecnologia de ponta.',
      diferenciais: ['App completo', 'Telemedicina 24h', 'Rede nacional']
    },
    {
      nome: 'SulAmérica',
      cor: '#0066CC',
      descricao: 'Tradição e credibilidade com mais de 125 anos no mercado de seguros e saúde.',
      diferenciais: ['Descontos farmácias', 'Check-up anual', 'Orientação médica']
    },
    {
      nome: 'Amil',
      cor: '#0066CC',
      descricao: 'Líder em planos de saúde no Brasil, com excelência em atendimento e tecnologia.',
      diferenciais: ['Hospitais próprios', 'Programas de saúde', 'Cobertura internacional']
    },
    {
      nome: 'Amil One',
      cor: '#FF6B35',
      descricao: 'Plano digital da Amil com preços acessíveis e atendimento moderno e ágil.',
      diferenciais: ['Totalmente digital', 'Preço acessível', 'App intuitivo']
    },
    {
      nome: 'Porto Seguro',
      cor: '#003366',
      descricao: 'Inovação e tecnologia com foco em prevenção e qualidade de vida.',
      diferenciais: ['Clube de vantagens', 'Telemedicina grátis', 'Desconto academias']
    },
    {
      nome: 'NotreDame Intermédica',
      cor: '#008C45',
      descricao: 'Fusão das gigantes NotreDame e Intermédica, oferecendo ampla cobertura e estrutura.',
      diferenciais: ['Hospitais próprios', 'Rede integrada', 'Tecnologia avançada']
    },
    {
      nome: 'Hapvida',
      cor: '#00A859',
      descricao: 'Grande rede de hospitais próprios no Brasil, com foco em verticalização da saúde.',
      diferenciais: ['Hospitais próprios', 'Preço competitivo', 'Cobertura regional']
    },
    {
      nome: 'Prevent Senior',
      cor: '#CC0000',
      descricao: 'Especializada em atendimento a idosos, com infraestrutura própria e preços acessíveis.',
      diferenciais: ['Foco em idosos', 'Hospitais próprios', 'Preço diferenciado']
    }
  ];

  return (
    <div style={{
      paddingTop: 'clamp(100px, 12vh, 140px)',
      background: 'linear-gradient(180deg, #FAF8F5 0%, #FFFFFF 50%, #FAF8F5 100%)',
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
          background: 'rgba(197, 188, 181, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(197, 188, 181, 0.2)',
          borderRadius: '20px',
          fontSize: 'clamp(11px, 1.3vw, 13px)',
          color: '#9B9289',
          fontWeight: '500',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 'clamp(24px, 3vw, 32px)'
        }}>
          <span>✦</span> Operadoras Parceiras
        </div>

        <h1 style={{
          fontSize: 'clamp(40px, 6vw, 64px)',
          fontWeight: '300',
          background: 'linear-gradient(135deg, #8B7E74 0%, #A8877A 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          margin: '0 0 clamp(24px, 3vw, 32px)',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          fontFamily: "'Playfair Display', serif"
        }}>
          As Melhores Operadoras<br/>do Mercado
        </h1>

        <p style={{
          fontSize: 'clamp(16px, 2vw, 20px)',
          color: '#6B6662',
          lineHeight: 1.8,
          fontWeight: '300',
          maxWidth: '700px',
          margin: '0 auto clamp(40px, 5vw, 56px)'
        }}>
          Trabalho com as principais operadoras de saúde do Brasil para oferecer 
          a você a melhor opção com o melhor preço.
        </p>
      </section>

      {/* SEÇÃO: CARDS DE OPERADORAS */}
      <section style={{
        padding: '0 clamp(40px, 8vw, 100px) clamp(80px, 12vh, 120px)',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
          gap: 'clamp(24px, 3vw, 32px)'
        }}>
          {operadoras.map((op, index) => (
            <div key={index} style={{
              background: 'white',
              border: '1px solid rgba(197, 188, 181, 0.15)',
              borderRadius: '16px',
              padding: 'clamp(32px, 4vw, 40px)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 4px 20px rgba(139, 126, 116, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(139, 126, 116, 0.15)';
              e.currentTarget.style.borderColor = op.cor;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(139, 126, 116, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(197, 188, 181, 0.15)';
            }}
            >
              {/* Nome da Operadora */}
              <h3 style={{
                fontSize: 'clamp(20px, 2.5vw, 24px)',
                color: op.cor,
                fontWeight: '600',
                marginBottom: 'clamp(16px, 2vw, 20px)',
                fontFamily: "'Inter', -apple-system, sans-serif",
                lineHeight: 1.3
              }}>
                {op.nome}
              </h3>

              {/* Descrição */}
              <p style={{
                fontSize: 'clamp(14px, 1.6vw, 15px)',
                color: '#666',
                lineHeight: 1.7,
                fontWeight: '400',
                marginBottom: 'clamp(20px, 2.5vw, 24px)',
                flex: 1
              }}>
                {op.descricao}
              </p>

              {/* Diferenciais */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                marginBottom: 'clamp(24px, 3vw, 28px)',
                paddingTop: 'clamp(16px, 2vw, 20px)',
                borderTop: '1px solid rgba(197, 188, 181, 0.1)'
              }}>
                {op.diferenciais.map((dif, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: 'clamp(13px, 1.5vw, 14px)',
                    color: '#555',
                    fontWeight: '400'
                  }}>
                    <span style={{
                      fontSize: '14px',
                      color: op.cor,
                      fontWeight: 'bold'
                    }}>✓</span>
                    {dif}
                  </div>
                ))}
              </div>

              {/* Botão SOLICITAR */}
              <Link to="/contato" style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                width: '100%',
                padding: 'clamp(12px, 1.6vw, 14px)',
                background: 'white',
                color: '#666',
                textDecoration: 'none',
                fontSize: 'clamp(13px, 1.5vw, 14px)',
                fontWeight: '500',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(197, 188, 181, 0.2)',
                letterSpacing: '0.02em',
                textTransform: 'uppercase'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = op.cor;
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.borderColor = op.cor;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.color = '#666';
                e.currentTarget.style.borderColor = 'rgba(197, 188, 181, 0.2)';
              }}
              >
                Solicitar
                <span style={{ fontSize: '12px' }}>→</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* SEÇÃO: DIFERENCIAIS */}
      <section style={{
        padding: 'clamp(80px, 12vh, 120px) clamp(40px, 8vw, 100px)',
        background: 'rgba(250, 248, 245, 0.5)',
        borderTop: '1px solid rgba(197, 188, 181, 0.15)',
        borderBottom: '1px solid rgba(197, 188, 181, 0.15)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: '300',
            color: '#8B7E74',
            textAlign: 'center',
            marginBottom: 'clamp(48px, 6vw, 72px)',
            fontFamily: "'Playfair Display', serif"
          }}>
            Por Que Contratar Comigo?
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: 'clamp(32px, 4vw, 48px)'
          }}>
            {[
              { emoji: '🎯', title: 'Análise Personalizada', desc: 'Avalio seu perfil para encontrar o plano ideal com melhor custo-benefício.' },
              { emoji: '💰', title: 'Economia Garantida', desc: 'Negocio os melhores preços diretamente com as operadoras.' },
              { emoji: '📞', title: 'Suporte Vitalício', desc: 'Estou disponível para ajudá-lo sempre que precisar, mesmo após a contratação.' },
              { emoji: '⚡', title: 'Agilidade', desc: 'Processo rápido e sem burocracia. Resposta em até 24 horas.' }
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>{item.emoji}</div>
                <h3 style={{
                  fontSize: 'clamp(18px, 2.2vw, 22px)',
                  color: '#8B7E74',
                  fontWeight: '400',
                  marginBottom: '12px',
                  fontFamily: "'Playfair Display', serif"
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: 'clamp(14px, 1.7vw, 16px)',
                  color: '#6B6662',
                  lineHeight: 1.8,
                  fontWeight: '300'
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
          fontSize: 'clamp(32px, 5vw, 48px)',
          fontWeight: '300',
          color: '#8B7E74',
          marginBottom: 'clamp(24px, 3vw, 32px)',
          fontFamily: "'Playfair Display', serif"
        }}>
          Pronto Para Encontrar Seu Plano Ideal?
        </h2>

        <p style={{
          fontSize: 'clamp(16px, 2vw, 18px)',
          color: '#6B6662',
          lineHeight: 1.8,
          fontWeight: '300',
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
            padding: 'clamp(16px, 2.2vw, 20px) clamp(36px, 5vw, 52px)',
            background: 'linear-gradient(135deg, #A8877A 0%, #8B7E74 100%)',
            color: 'white',
            textDecoration: 'none',
            fontSize: 'clamp(15px, 1.9vw, 17px)',
            fontWeight: '500',
            borderRadius: '12px',
            transition: 'all 0.4s ease',
            boxShadow: '0 8px 28px rgba(168, 135, 122, 0.3)',
            letterSpacing: '0.03em'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 16px 48px rgba(168, 135, 122, 0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 28px rgba(168, 135, 122, 0.3)';
          }}
          >
            Solicitar Cotação
            <span style={{ fontSize: '18px' }}>→</span>
          </Link>

          <a href="https://wa.me/5521977472141?text=Olá!%20Gostaria%20de%20cotar%20um%20plano%20de%20saúde." target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: 'clamp(16px, 2.2vw, 20px) clamp(36px, 5vw, 52px)',
            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
            color: 'white',
            textDecoration: 'none',
            fontSize: 'clamp(15px, 1.9vw, 17px)',
            fontWeight: '500',
            borderRadius: '12px',
            transition: 'all 0.4s ease',
            boxShadow: '0 8px 28px rgba(37, 211, 102, 0.3)',
            letterSpacing: '0.03em'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 16px 48px rgba(37, 211, 102, 0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 28px rgba(37, 211, 102, 0.3)';
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
