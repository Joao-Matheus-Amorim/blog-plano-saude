import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';

function PaginaFAQ() {
  const [expandido, setExpandido] = useState(null);

  const faqs = [
    {
      categoria: 'Sobre a Consultoria',
      perguntas: [
        {
          pergunta: 'A consultoria é gratuita?',
          resposta: 'Sim! Meu atendimento é 100% gratuito. Você não paga nada pela consultoria, análise ou suporte. Recebo comissão diretamente das operadoras.'
        },
        {
          pergunta: 'Como funciona o processo de contratação?',
          resposta: 'Primeiro, analiso seu perfil e necessidades. Depois, apresento as melhores opções de planos. Você escolhe o que mais se encaixa, e eu cuido de toda a burocracia da contratação.'
        },
        {
          pergunta: 'Quanto tempo leva para contratar um plano?',
          resposta: 'O processo é rápido! Em média, de 24 a 72 horas você já tem seu plano aprovado e ativo, dependendo da operadora escolhida.'
        }
      ]
    },
    {
      categoria: 'Cobertura e Benefícios',
      perguntas: [
        {
          pergunta: 'Quais operadoras você trabalha?',
          resposta: 'Trabalho com as principais operadoras: Bradesco Saúde, Amil, SulAmérica, Unimed, Porto Seguro, NotreDame Intermédica, Hapvida, Prevent Senior e outras.'
        },
        {
          pergunta: 'Os planos cobrem consultas e exames?',
          resposta: 'Sim! Todos os planos cobrem consultas médicas, exames laboratoriais, exames de imagem, internações e procedimentos, conforme a ANS determina.'
        },
        {
          pergunta: 'Tem cobertura para emergências 24h?',
          resposta: 'Sim! Todos os planos de saúde oferecem atendimento de urgência e emergência 24 horas por dia, sem carência.'
        },
        {
          pergunta: 'Posso incluir dependentes no plano?',
          resposta: 'Sim! Você pode incluir cônjuge, filhos e até pais como dependentes. Isso geralmente sai mais em conta do que contratar planos separados.'
        }
      ]
    },
    {
      categoria: 'Preços e Pagamento',
      perguntas: [
        {
          pergunta: 'Quanto custa um plano de saúde?',
          resposta: 'O valor varia conforme idade, localização, tipo de acomodação (enfermaria ou apartamento) e cobertura. Em média, planos começam a partir de R$ 200/mês.'
        },
        {
          pergunta: 'Como é feito o pagamento?',
          resposta: 'O pagamento é mensal, geralmente por boleto bancário ou débito automático. Você paga diretamente para a operadora.'
        },
        {
          pergunta: 'O preço pode aumentar?',
          resposta: 'Sim. Os planos têm reajuste anual autorizado pela ANS e reajuste por faixa etária (conforme você fica mais velho). Mas sempre dentro das regras estabelecidas.'
        },
        {
          pergunta: 'Tem desconto para família?',
          resposta: 'Sim! A maioria das operadoras oferece desconto quando você contrata para mais de uma pessoa da mesma família.'
        }
      ]
    },
    {
      categoria: 'Carências e Restrições',
      perguntas: [
        {
          pergunta: 'O que é carência?',
          resposta: 'Carência é o período que você precisa esperar após a contratação para usar determinados serviços. Urgências não têm carência.'
        },
        {
          pergunta: 'Quanto tempo de carência para consultas?',
          resposta: 'Geralmente 30 dias para consultas e exames simples. Procedimentos mais complexos podem ter carência de 180 dias.'
        },
        {
          pergunta: 'Posso contratar se tiver doença pré-existente?',
          resposta: 'Sim! Você pode contratar, mas pode haver Cobertura Parcial Temporária (CPT) de até 24 meses para doenças pré-existentes declaradas.'
        },
        {
          pergunta: 'Como funciona a portabilidade?',
          resposta: 'Se você já tem plano há mais de 2 anos, pode migrar para outra operadora sem nova carência, mantendo as mesmas coberturas ou superiores.'
        }
      ]
    },
    {
      categoria: 'Outros',
      perguntas: [
        {
          pergunta: 'Posso cancelar o plano quando quiser?',
          resposta: 'Sim! Planos individuais não têm fidelidade. Você pode cancelar a qualquer momento, sem multa ou taxa de cancelamento.'
        },
        {
          pergunta: 'O que acontece se eu atrasar o pagamento?',
          resposta: 'Se atrasar mais de 60 dias, o plano pode ser suspenso. Mas você pode negociar diretamente com a operadora para regularizar.'
        },
        {
          pergunta: 'Continuo recebendo suporte após contratar?',
          resposta: 'Sim! Fico à disposição para tirar dúvidas, ajudar com autorizações, trocar de plano ou resolver qualquer problema que surgir.'
        }
      ]
    }
  ];

  const togglePergunta = (categoriaIndex, perguntaIndex) => {
    const id = `${categoriaIndex}-${perguntaIndex}`;
    setExpandido(expandido === id ? null : id);
  };

  return (
     <><SEO
      title="Perguntas Frequentes (FAQ) - Tire Suas Dúvidas"
      description="Tire suas dúvidas sobre planos de saúde: carência, cobertura, reembolso, portabilidade, preços e muito mais. FAQ completo e atualizado."
      keywords="faq plano saúde, dúvidas plano saúde, carência, cobertura, reembolso, portabilidade, como funciona"
      url="https://consultoriadesaude.vercel.app/faq" /><div style={{
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
            <span>✦</span> Perguntas Frequentes
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
            Tire Suas Dúvidas<br />Sobre Planos de Saúde
          </h1>

          <p style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: '#6B6662',
            lineHeight: 1.8,
            fontWeight: '300',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Separei as perguntas mais comuns que recebo. Se ainda tiver dúvidas,
            estou à disposição para ajudar!
          </p>
        </section>

        {/* SEÇÃO: FAQ ACCORDION */}
        <section style={{
          padding: '0 clamp(40px, 8vw, 100px) clamp(80px, 12vh, 120px)',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          {faqs.map((categoria, catIndex) => (
            <div key={catIndex} style={{ marginBottom: 'clamp(48px, 6vw, 64px)' }}>
              {/* Título da Categoria */}
              <h2 style={{
                fontSize: 'clamp(24px, 3.5vw, 32px)',
                color: '#8B7E74',
                fontWeight: '400',
                marginBottom: 'clamp(24px, 3vw, 32px)',
                fontFamily: "'Playfair Display', serif",
                paddingBottom: '16px',
                borderBottom: '2px solid rgba(197, 188, 181, 0.2)'
              }}>
                {categoria.categoria}
              </h2>

              {/* Perguntas da Categoria */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {categoria.perguntas.map((faq, faqIndex) => {
                  const id = `${catIndex}-${faqIndex}`;
                  const isExpanded = expandido === id;

                  return (
                    <div key={faqIndex} style={{
                      background: 'white',
                      border: `1px solid ${isExpanded ? '#A8877A' : 'rgba(197, 188, 181, 0.15)'}`,
                      borderRadius: '16px',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      boxShadow: isExpanded
                        ? '0 8px 32px rgba(168, 135, 122, 0.15)'
                        : '0 2px 12px rgba(139, 126, 116, 0.05)'
                    }}>
                      {/* Pergunta (Header) */}
                      <button
                        onClick={() => togglePergunta(catIndex, faqIndex)}
                        style={{
                          width: '100%',
                          padding: 'clamp(20px, 3vw, 24px) clamp(24px, 3.5vw, 32px)',
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '16px',
                          textAlign: 'left',
                          transition: 'background 0.2s ease'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.background = 'rgba(250, 248, 245, 0.5)';
                        } }
                        onMouseOut={(e) => {
                          e.currentTarget.style.background = 'transparent';
                        } }
                      >
                        <span style={{
                          fontSize: 'clamp(15px, 1.9vw, 18px)',
                          color: '#333',
                          fontWeight: '500',
                          lineHeight: 1.5
                        }}>
                          {faq.pergunta}
                        </span>
                        <span style={{
                          fontSize: '24px',
                          color: '#A8877A',
                          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s ease',
                          flexShrink: 0
                        }}>
                          ▼
                        </span>
                      </button>

                      {/* Resposta (Content) */}
                      <div style={{
                        maxHeight: isExpanded ? '500px' : '0',
                        opacity: isExpanded ? 1 : 0,
                        overflow: 'hidden',
                        transition: 'all 0.4s ease'
                      }}>
                        <div style={{
                          padding: '0 clamp(24px, 3.5vw, 32px) clamp(20px, 3vw, 24px)',
                          borderTop: '1px solid rgba(197, 188, 181, 0.1)'
                        }}>
                          <p style={{
                            fontSize: 'clamp(14px, 1.7vw, 16px)',
                            color: '#666',
                            lineHeight: 1.8,
                            margin: 0,
                            paddingTop: '16px'
                          }}>
                            {faq.resposta}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        {/* SEÇÃO: AINDA TEM DÚVIDAS */}
        <section style={{
          padding: 'clamp(60px, 8vh, 80px) clamp(40px, 8vw, 100px)',
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(197, 188, 181, 0.1) 0%, rgba(168, 135, 122, 0.05) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(197, 188, 181, 0.2)',
          borderRadius: '24px',
          boxShadow: '0 8px 32px rgba(139, 126, 116, 0.1)'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '24px' }}>💬</div>

          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 36px)',
            fontWeight: '300',
            color: '#8B7E74',
            marginBottom: '16px',
            fontFamily: "'Playfair Display', serif"
          }}>
            Ainda Tem Dúvidas?
          </h2>

          <p style={{
            fontSize: 'clamp(15px, 1.9vw, 17px)',
            color: '#6B6662',
            lineHeight: 1.8,
            fontWeight: '300',
            marginBottom: 'clamp(32px, 4vw, 40px)'
          }}>
            Estou disponível para responder qualquer pergunta sobre planos de saúde.
            Entre em contato pelo WhatsApp ou solicite uma cotação!
          </p>

          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <a href="https://wa.me/5521977472141?text=Olá!%20Tenho%20algumas%20dúvidas%20sobre%20planos%20de%20saúde." target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: 'clamp(14px, 2vw, 16px) clamp(28px, 4vw, 40px)',
              background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
              color: 'white',
              textDecoration: 'none',
              fontSize: 'clamp(14px, 1.7vw, 16px)',
              fontWeight: '500',
              borderRadius: '10px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 16px rgba(37, 211, 102, 0.3)',
              letterSpacing: '0.02em'
            }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(37, 211, 102, 0.4)';
              } }
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(37, 211, 102, 0.3)';
              } }
            >
              WhatsApp
            </a>

            <Link to="/contato" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: 'clamp(14px, 2vw, 16px) clamp(28px, 4vw, 40px)',
              background: 'linear-gradient(135deg, #A8877A 0%, #8B7E74 100%)',
              color: 'white',
              textDecoration: 'none',
              fontSize: 'clamp(14px, 1.7vw, 16px)',
              fontWeight: '500',
              borderRadius: '10px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 16px rgba(168, 135, 122, 0.3)',
              letterSpacing: '0.02em'
            }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(168, 135, 122, 0.4)';
              } }
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(168, 135, 122, 0.3)';
              } }
            >
              Solicitar Cotação
            </Link>
          </div>
        </section>

        <div style={{ height: 'clamp(60px, 8vh, 80px)' }}></div>
      </div></>
  );
}

export default PaginaFAQ;
