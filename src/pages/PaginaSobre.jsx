import { Link } from 'react-router-dom';

function PaginaSobre() {
  return (
    <div style={{
      paddingTop: 'clamp(100px, 12vh, 140px)',
      background: 'linear-gradient(180deg, #FAF8F5 0%, #FFFFFF 50%, #FAF8F5 100%)',
      minHeight: '100vh'
    }}>
      
      {/* HERO SECTION */}
      <section style={{
        padding: 'clamp(60px, 10vh, 100px) clamp(40px, 8vw, 100px)',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
          gap: 'clamp(60px, 8vw, 100px)',
          alignItems: 'center'
        }}>
          {/* Coluna Texto */}
          <div>
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
              <span>✦</span> Sobre Mim
            </div>

            <h1 style={{
              fontSize: 'clamp(40px, 6vw, 64px)',
              fontWeight: '300',
              background: 'linear-gradient(135deg, #8B7E74 0%, #A8877A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: '0 0 clamp(20px, 3vw, 28px)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              fontFamily: "'Playfair Display', serif"
            }}>
              Olá! Sou<br/>Maisa Valentim
            </h1>

            <p style={{
              fontSize: 'clamp(18px, 2.2vw, 22px)',
              color: '#8B7E74',
              fontWeight: '400',
              lineHeight: 1.6,
              marginBottom: 'clamp(24px, 3vw, 32px)',
              fontFamily: "'Playfair Display', serif"
            }}>
              Consultora Especializada em Planos de Saúde
            </p>

            <p style={{
              fontSize: 'clamp(15px, 1.9vw, 17px)',
              color: '#6B6662',
              lineHeight: 1.9,
              fontWeight: '300',
              marginBottom: 'clamp(32px, 4vw, 48px)'
            }}>
              Com anos de experiência no mercado de saúde, minha missão é ajudar pessoas e 
              famílias a encontrarem a proteção ideal com o melhor custo-benefício. Acredito 
              que ter um plano de saúde adequado não é luxo, é necessidade — e deve ser 
              acessível para todos.
            </p>

            <Link to="/contato" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: 'clamp(14px, 2vw, 18px) clamp(32px, 4vw, 48px)',
              background: 'linear-gradient(135deg, #A8877A 0%, #8B7E74 100%)',
              color: 'white',
              textDecoration: 'none',
              fontSize: 'clamp(15px, 1.8vw, 17px)',
              fontWeight: '500',
              borderRadius: '12px',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 8px 28px rgba(168, 135, 122, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              letterSpacing: '0.03em',
              transform: 'perspective(500px) rotateX(0deg)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'perspective(500px) rotateX(-4deg) translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 16px 48px rgba(168, 135, 122, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'perspective(500px) rotateX(0deg) translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 28px rgba(168, 135, 122, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)';
            }}
            >
              Agende uma Consultoria
              <span style={{ fontSize: '16px' }}>→</span>
            </Link>
          </div>

          {/* Coluna Imagem/Card COM FOTO */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(197, 188, 181, 0.1) 0%, rgba(168, 135, 122, 0.05) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(197, 188, 181, 0.2)',
            borderRadius: '24px',
            padding: 'clamp(40px, 6vw, 60px)',
            boxShadow: '0 20px 60px rgba(139, 126, 116, 0.15)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '-100px',
              right: '-100px',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(197, 188, 181, 0.2) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(80px)',
              pointerEvents: 'none'
            }}/>

            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              {/* FOTO DA MAISA */}
              <div style={{
                width: '220px',
                height: '220px',
                margin: '0 auto clamp(28px, 4vw, 40px)',
                borderRadius: '50%',
                overflow: 'hidden',
                boxShadow: '0 12px 40px rgba(168, 135, 122, 0.3), 0 0 0 4px rgba(255, 255, 255, 0.8), 0 0 0 5px rgba(197, 188, 181, 0.2)',
                border: '3px solid white'
              }}>
                <img 
                  src="/maisa-perfil.jpg"
                  alt="Maisa Valentim - Consultora de Planos de Saúde"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                />
              </div>

              <h3 style={{
                fontSize: 'clamp(22px, 3vw, 28px)',
                color: '#8B7E74',
                fontWeight: '400',
                marginBottom: '12px',
                fontFamily: "'Playfair Display', serif"
              }}>
                Maisa Valentim
              </h3>

              <p style={{
                fontSize: 'clamp(14px, 1.7vw, 16px)',
                color: '#9B9289',
                marginBottom: 'clamp(24px, 3vw, 32px)',
                fontWeight: '300'
              }}>
                Consultora de Planos de Saúde
              </p>

              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '16px',
                flexWrap: 'wrap'
              }}>
                <a href="https://wa.me/5521977472141" target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  borderRadius: '10px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 16px rgba(37, 211, 102, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(37, 211, 102, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(37, 211, 102, 0.3)';
                }}
                >
                  WhatsApp
                </a>

                <a href="https://www.instagram.com/planosdesaudemaisavalentim/" target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #E4405F 0%, #C13584 100%)',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  borderRadius: '10px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 16px rgba(228, 64, 95, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(228, 64, 95, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(228, 64, 95, 0.3)';
                }}
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO: MINHA HISTÓRIA */}
      <section style={{
        padding: 'clamp(80px, 12vh, 120px) clamp(40px, 8vw, 100px)',
        background: 'rgba(250, 248, 245, 0.5)',
        borderTop: '1px solid rgba(197, 188, 181, 0.15)',
        borderBottom: '1px solid rgba(197, 188, 181, 0.15)'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: '300',
            color: '#8B7E74',
            textAlign: 'center',
            marginBottom: 'clamp(48px, 6vw, 72px)',
            fontFamily: "'Playfair Display', serif"
          }}>
            Minha História
          </h2>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(24px, 3vw, 32px)'
          }}>
            <p style={{
              fontSize: 'clamp(15px, 1.9vw, 17px)',
              color: '#6B6662',
              lineHeight: 1.9,
              fontWeight: '300',
              textAlign: 'justify'
            }}>
              Comecei minha jornada no setor de saúde há mais de 5 anos, motivada pela vontade 
              de fazer a diferença na vida das pessoas. Vi de perto como a falta de informação 
              e orientação adequada levava muitas famílias a contratarem planos inadequados ou 
              pagarem valores abusivos.
            </p>

            <p style={{
              fontSize: 'clamp(15px, 1.9vw, 17px)',
              color: '#6B6662',
              lineHeight: 1.9,
              fontWeight: '300',
              textAlign: 'justify'
            }}>
              Decidi, então, especializar-me em consultoria personalizada, estudando a fundo 
              todas as operadoras, coberturas e particularidades do mercado. Meu objetivo 
              sempre foi claro: <strong style={{ color: '#8B7E74', fontWeight: '500' }}>
              democratizar o acesso a planos de saúde de qualidade</strong>, ajudando cada 
              pessoa a encontrar exatamente o que precisa, dentro do orçamento disponível.
            </p>

            <p style={{
              fontSize: 'clamp(15px, 1.9vw, 17px)',
              color: '#6B6662',
              lineHeight: 1.9,
              fontWeight: '300',
              textAlign: 'justify'
            }}>
              Hoje, tenho orgulho de dizer que já ajudei <strong style={{ color: '#8B7E74', fontWeight: '500' }}>
              mais de 100 famílias</strong> a economizarem significativamente e terem a 
              tranquilidade de contar com um plano adequado às suas necessidades. Cada cliente 
              é único, e meu compromisso é oferecer um atendimento humanizado, transparente e 
              focado em resultados.
            </p>
          </div>
        </div>
      </section>

      {/* SEÇÃO: NÚMEROS */}
      <section style={{
        padding: 'clamp(80px, 12vh, 120px) clamp(40px, 8vw, 100px)',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: 'clamp(32px, 5vw, 48px)',
          fontWeight: '300',
          color: '#8B7E74',
          textAlign: 'center',
          marginBottom: 'clamp(48px, 6vw, 72px)',
          fontFamily: "'Playfair Display', serif"
        }}>
          Resultados que Falam
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
          gap: 'clamp(32px, 4vw, 48px)'
        }}>
          {[
            { num: '100+', label: 'Clientes Atendidos' },
            { num: 'R$ 450', label: 'Economia Média/Mês' },
            { num: '24h', label: 'Resposta Garantida' },
            { num: '98%', label: 'Satisfação dos Clientes' }
          ].map((item, i) => (
            <div key={i} style={{
              background: 'linear-gradient(135deg, rgba(197, 188, 181, 0.1) 0%, rgba(168, 135, 122, 0.05) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(197, 188, 181, 0.2)',
              borderRadius: '20px',
              padding: 'clamp(32px, 5vw, 48px)',
              textAlign: 'center',
              transition: 'all 0.4s ease',
              boxShadow: '0 8px 32px rgba(139, 126, 116, 0.1)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 16px 48px rgba(139, 126, 116, 0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(139, 126, 116, 0.1)';
            }}
            >
              <div style={{
                fontSize: 'clamp(48px, 7vw, 72px)',
                fontWeight: '300',
                background: 'linear-gradient(135deg, #8B7E74 0%, #A8877A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '12px',
                fontFamily: "'Playfair Display', serif"
              }}>
                {item.num}
              </div>
              <p style={{
                fontSize: 'clamp(15px, 1.9vw, 17px)',
                color: '#8B7E74',
                fontWeight: '500',
                margin: 0
              }}>
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SEÇÃO: VALORES */}
      <section style={{
        padding: 'clamp(80px, 12vh, 120px) clamp(40px, 8vw, 100px)',
        background: 'rgba(250, 248, 245, 0.5)',
        borderTop: '1px solid rgba(197, 188, 181, 0.15)'
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
            Meus Valores
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(32px, 4vw, 48px)'
          }}>
            {[
              { emoji: '🤝', title: 'Transparência', desc: 'Informações claras e honestas sobre todos os planos, sem letras miúdas ou surpresas.' },
              { emoji: '💙', title: 'Comprometimento', desc: 'Acompanhamento completo antes, durante e após a contratação do seu plano.' },
              { emoji: '⚖️', title: 'Ética', desc: 'Sempre recomendo o que é melhor para você, não o que rende mais comissão.' },
              { emoji: '🎯', title: 'Personalização', desc: 'Cada cliente é único. Analiso seu perfil para encontrar o plano ideal.' }
            ].map((valor, i) => (
              <div key={i}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>{valor.emoji}</div>
                <h3 style={{
                  fontSize: 'clamp(20px, 2.5vw, 24px)',
                  color: '#8B7E74',
                  fontWeight: '400',
                  marginBottom: '12px',
                  fontFamily: "'Playfair Display', serif"
                }}>
                  {valor.title}
                </h3>
                <p style={{
                  fontSize: 'clamp(14px, 1.7vw, 16px)',
                  color: '#6B6662',
                  lineHeight: 1.8,
                  fontWeight: '300'
                }}>
                  {valor.desc}
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
          Vamos Conversar?
        </h2>

        <p style={{
          fontSize: 'clamp(16px, 2vw, 18px)',
          color: '#6B6662',
          lineHeight: 1.8,
          fontWeight: '300',
          marginBottom: 'clamp(40px, 5vw, 56px)'
        }}>
          Estou à disposição para ajudá-lo a encontrar o plano de saúde perfeito 
          para você e sua família. A consultoria é gratuita e sem compromisso.
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

          <a href="https://wa.me/5521977472141?text=Olá!%20Vi%20seu%20site%20e%20gostaria%20de%20conversar." target="_blank" rel="noopener noreferrer" style={{
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

export default PaginaSobre;
