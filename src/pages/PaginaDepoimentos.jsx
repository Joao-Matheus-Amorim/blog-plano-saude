import { Link } from 'react-router-dom';

function PaginaDepoimentos() {
  const depoimentos = [
    {
      nome: 'Maria Silva',
      cidade: 'Rio de Janeiro, RJ',
      texto: 'A Maisa foi super atenciosa e me ajudou a encontrar um plano com um preço muito melhor do que eu pagava. Economizei mais de R$ 400 por mês! Recomendo de olhos fechados.',
      avaliacao: 5,
      plano: 'Bradesco Saúde'
    },
    {
      nome: 'Carlos Eduardo',
      cidade: 'São Paulo, SP',
      texto: 'Excelente atendimento! Ela explicou tudo com calma, tirou todas as minhas dúvidas e ainda conseguiu um desconto que eu não sabia que existia. Profissional nota 10!',
      avaliacao: 5,
      plano: 'Amil'
    },
    {
      nome: 'Ana Paula',
      cidade: 'Niterói, RJ',
      texto: 'Estava perdida com tantas opções de planos. A Maisa analisou meu perfil e me indicou o plano perfeito. Hoje estou super satisfeita com minha escolha!',
      avaliacao: 5,
      plano: 'SulAmérica'
    },
    {
      nome: 'Roberto Oliveira',
      cidade: 'Belo Horizonte, MG',
      texto: 'Precisava de um plano para minha família toda e a Maisa conseguiu um preço excelente. Além disso, me ajudou em todo o processo de contratação. Super recomendo!',
      avaliacao: 5,
      plano: 'Unimed'
    },
    {
      nome: 'Juliana Costa',
      cidade: 'Rio de Janeiro, RJ',
      texto: 'Atendimento rápido e eficiente! Em menos de 24 horas já tinha várias opções de planos na minha mão. Contratei e não me arrependo. Obrigada, Maisa!',
      avaliacao: 5,
      plano: 'Porto Seguro'
    },
    {
      nome: 'Fernando Santos',
      cidade: 'Curitiba, PR',
      texto: 'Profissional extremamente competente! Me ajudou a migrar de operadora e conseguiu manter a mesma cobertura com um valor bem menor. Muito satisfeito!',
      avaliacao: 5,
      plano: 'NotreDame Intermédica'
    },
    {
      nome: 'Patricia Lima',
      cidade: 'Brasília, DF',
      texto: 'A Maisa é muito transparente e honesta. Não tentou me empurrar o plano mais caro, mas sim o que realmente fazia sentido para mim. Confiança total!',
      avaliacao: 5,
      plano: 'Hapvida'
    },
    {
      nome: 'Ricardo Mendes',
      cidade: 'Salvador, BA',
      texto: 'Depois de contratar, continuei recebendo suporte sempre que precisei. É muito bom saber que posso contar com ela mesmo depois da venda. Parceria de verdade!',
      avaliacao: 5,
      plano: 'Amil One'
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
        maxWidth: '1000px',
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
          <span>✦</span> Depoimentos
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
          O Que Meus Clientes<br/>Dizem Sobre Mim
        </h1>

        <p style={{
          fontSize: 'clamp(16px, 2vw, 20px)',
          color: '#6B6662',
          lineHeight: 1.8,
          fontWeight: '300',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          Mais de 100 famílias já economizaram e encontraram o plano ideal 
          com minha consultoria personalizada.
        </p>
      </section>

      {/* SEÇÃO: ESTATÍSTICAS */}
      <section style={{
        padding: '0 clamp(40px, 8vw, 100px) clamp(80px, 10vh, 100px)',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
          gap: 'clamp(24px, 3vw, 32px)',
          padding: 'clamp(40px, 6vw, 60px)',
          background: 'linear-gradient(135deg, rgba(197, 188, 181, 0.1) 0%, rgba(168, 135, 122, 0.05) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(197, 188, 181, 0.2)',
          borderRadius: '24px',
          boxShadow: '0 8px 32px rgba(139, 126, 116, 0.1)'
        }}>
          {[
            { numero: '100+', label: 'Clientes Atendidos' },
            { numero: '98%', label: 'Satisfação' },
            { numero: 'R$ 450', label: 'Economia Média/Mês' },
            { numero: '24h', label: 'Resposta Garantida' }
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 'clamp(36px, 6vw, 48px)',
                fontWeight: '300',
                background: 'linear-gradient(135deg, #8B7E74 0%, #A8877A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '8px',
                fontFamily: "'Playfair Display', serif"
              }}>
                {stat.numero}
              </div>
              <div style={{
                fontSize: 'clamp(13px, 1.6vw, 15px)',
                color: '#8B7E74',
                fontWeight: '500'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEÇÃO: CARDS DE DEPOIMENTOS */}
      <section style={{
        padding: '0 clamp(40px, 8vw, 100px) clamp(80px, 12vh, 120px)',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 350px), 1fr))',
          gap: 'clamp(28px, 3.5vw, 40px)'
        }}>
          {depoimentos.map((dep, index) => (
            <div key={index} style={{
              background: 'white',
              border: '1px solid rgba(197, 188, 181, 0.15)',
              borderRadius: '20px',
              padding: 'clamp(28px, 4vw, 36px)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 4px 20px rgba(139, 126, 116, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(139, 126, 116, 0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(139, 126, 116, 0.08)';
            }}
            >
              {/* Aspas decorativas */}
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '24px',
                fontSize: '60px',
                color: 'rgba(168, 135, 122, 0.1)',
                fontFamily: "'Playfair Display', serif",
                lineHeight: 1
              }}>
                "
              </div>

              {/* Estrelas */}
              <div style={{
                display: 'flex',
                gap: '4px',
                marginBottom: '16px'
              }}>
                {[...Array(dep.avaliacao)].map((_, i) => (
                  <span key={i} style={{ color: '#FFB800', fontSize: '18px' }}>★</span>
                ))}
              </div>

              {/* Texto do depoimento */}
              <p style={{
                fontSize: 'clamp(14px, 1.7vw, 16px)',
                color: '#555',
                lineHeight: 1.8,
                fontWeight: '400',
                marginBottom: 'clamp(20px, 2.5vw, 24px)',
                flex: 1,
                fontStyle: 'italic'
              }}>
                "{dep.texto}"
              </p>

              {/* Divisória */}
              <div style={{
                width: '50px',
                height: '2px',
                background: 'linear-gradient(90deg, #A8877A, transparent)',
                marginBottom: '16px'
              }}/>

              {/* Info do cliente */}
              <div>
                <div style={{
                  fontSize: 'clamp(15px, 1.8vw, 17px)',
                  color: '#8B7E74',
                  fontWeight: '600',
                  marginBottom: '4px'
                }}>
                  {dep.nome}
                </div>
                <div style={{
                  fontSize: 'clamp(13px, 1.5vw, 14px)',
                  color: '#999',
                  marginBottom: '8px'
                }}>
                  {dep.cidade}
                </div>
                <div style={{
                  display: 'inline-block',
                  fontSize: 'clamp(11px, 1.3vw, 12px)',
                  color: '#A8877A',
                  background: 'rgba(168, 135, 122, 0.1)',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontWeight: '500'
                }}>
                  {dep.plano}
                </div>
              </div>
            </div>
          ))}
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
          Quer Ser o Próximo Cliente Satisfeito?
        </h2>

        <p style={{
          fontSize: 'clamp(16px, 2vw, 18px)',
          color: '#6B6662',
          lineHeight: 1.8,
          fontWeight: '300',
          marginBottom: 'clamp(40px, 5vw, 56px)'
        }}>
          Solicite uma cotação gratuita e descubra quanto você pode economizar 
          com o plano de saúde ideal para você!
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
            Solicitar Cotação Gratuita
            <span style={{ fontSize: '18px' }}>→</span>
          </Link>

          <a href="https://wa.me/5521977472141?text=Olá!%20Vi%20os%20depoimentos%20e%20gostaria%20de%20uma%20cotação." target="_blank" rel="noopener noreferrer" style={{
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

export default PaginaDepoimentos;
