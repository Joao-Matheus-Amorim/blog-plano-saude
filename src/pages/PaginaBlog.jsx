import Hero from '../components/Hero.jsx';
import Operadoras from '../components/Operadoras.jsx';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function PaginaBlog() {
  const beneficios = [
    {
      titulo: 'Proteção Completa',
      descricao: 'Planos de saúde com atendimento rápido e cobertura nacional para você e sua família.',
      icone: '🛡️'
    },
    {
      titulo: 'Atendimento Personalizado',
      descricao: 'Análise detalhada do seu perfil para encontrar o plano ideal para suas necessidades.',
      icone: '✨'
    },
    {
      titulo: 'Transparência Total',
      descricao: 'Clareza absoluta sobre coberturas, valores e carências sem letras miúdas.',
      icone: '💎'
    }
  ];

  return (
    <>
      <Hero />
      
      {/* ✅ Seção de Benefícios (EXISTENTE) */}
      <section style={{
        padding: 'clamp(100px, 12vw, 160px) clamp(40px, 8vw, 100px)',
        background: 'linear-gradient(180deg, #EDE9E3 0%, #F5F2ED 100%)',
        position: 'relative'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(60px, 8vw, 100px)'
          }}
        >
          <p style={{
            fontSize: 'clamp(11px, 1.3vw, 13px)',
            fontWeight: '500',
            color: '#A8877A',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: 'clamp(20px, 3vw, 28px)'
          }}>
            ✦ Por que escolher
          </p>
          
          <h2 style={{
            fontSize: 'clamp(40px, 7vw, 72px)',
            fontWeight: '300',
            color: '#8B7E74',
            marginBottom: 'clamp(24px, 3vw, 32px)',
            fontFamily: "'Playfair Display', serif",
            letterSpacing: '-0.02em',
            lineHeight: 1.1
          }}>
            Benefícios
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: 'clamp(32px, 5vw, 56px)',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {beneficios.map((beneficio, index) => (
            <motion.div
              key={beneficio.titulo}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              style={{
                padding: 'clamp(40px, 5vw, 56px) clamp(32px, 4vw, 48px)',
                background: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                border: '1px solid rgba(197, 188, 181, 0.2)',
                borderRadius: '24px',
                textAlign: 'center',
                boxShadow: '0 12px 40px rgba(139, 126, 116, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(139, 126, 116, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)';
                e.currentTarget.style.borderColor = 'rgba(168, 135, 122, 0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(139, 126, 116, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5)';
                e.currentTarget.style.borderColor = 'rgba(197, 188, 181, 0.2)';
              }}
            >
              <div style={{
                fontSize: 'clamp(48px, 7vw, 64px)',
                marginBottom: 'clamp(20px, 3vw, 28px)',
                filter: 'drop-shadow(0 4px 12px rgba(168, 135, 122, 0.2))'
              }}>
                {beneficio.icone}
              </div>
              
              <h3 style={{
                fontSize: 'clamp(22px, 3vw, 28px)',
                fontWeight: '400',
                color: '#8B7E74',
                marginBottom: 'clamp(16px, 2vw, 20px)',
                fontFamily: "'Playfair Display', serif",
                letterSpacing: '-0.01em'
              }}>
                {beneficio.titulo}
              </h3>
              
              <p style={{
                fontSize: 'clamp(14px, 1.7vw, 16px)',
                color: '#6B6662',
                lineHeight: 2,
                fontWeight: '300'
              }}>
                {beneficio.descricao}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ✅ NOVA SEÇÃO: COMO FUNCIONA */}
      <section style={{
        padding: 'clamp(100px, 12vw, 160px) clamp(40px, 8vw, 100px)',
        background: '#FFFFFF',
        position: 'relative'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(60px, 8vw, 100px)'
          }}
        >
          <p style={{
            fontSize: 'clamp(11px, 1.3vw, 13px)',
            fontWeight: '500',
            color: '#A8877A',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: 'clamp(20px, 3vw, 28px)'
          }}>
            ✦ Processo simples
          </p>
          
          <h2 style={{
            fontSize: 'clamp(40px, 7vw, 72px)',
            fontWeight: '300',
            color: '#8B7E74',
            marginBottom: 'clamp(24px, 3vw, 32px)',
            fontFamily: "'Playfair Display', serif",
            letterSpacing: '-0.02em',
            lineHeight: 1.1
          }}>
            Como Funciona
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: 'clamp(32px, 5vw, 48px)',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {[
            {
              step: '01',
              titulo: 'Primeiro Contato',
              descricao: 'Entre em contato pelo WhatsApp ou formulário. Resposta em até 2 horas.',
              icone: '📱'
            },
            {
              step: '02',
              titulo: 'Análise Personalizada',
              descricao: 'Entendemos suas necessidades e fazemos cotação com as melhores operadoras.',
              icone: '🔍'
            },
            {
              step: '03',
              titulo: 'Apresentação de Opções',
              descricao: 'Mostramos as melhores opções com valores e coberturas detalhadas.',
              icone: '📊'
            },
            {
              step: '04',
              titulo: 'Contratação Facilitada',
              descricao: 'Cuidamos de toda a burocracia. Você só assina e aproveita.',
              icone: '✅'
            }
          ].map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              style={{
                padding: 'clamp(40px, 5vw, 56px) clamp(32px, 4vw, 40px)',
                background: 'linear-gradient(135deg, #FAF8F5 0%, #FFFFFF 100%)',
                border: '1px solid rgba(197, 188, 181, 0.2)',
                borderRadius: '20px',
                textAlign: 'center',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.06)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.12)';
                e.currentTarget.style.borderColor = 'rgba(168, 135, 122, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.06)';
                e.currentTarget.style.borderColor = 'rgba(197, 188, 181, 0.2)';
              }}
            >
              <div style={{
                fontSize: 'clamp(48px, 7vw, 64px)',
                marginBottom: 'clamp(20px, 3vw, 24px)'
              }}>
                {item.icone}
              </div>

              <div style={{
                fontSize: '13px',
                fontWeight: '700',
                color: '#A8877A',
                letterSpacing: '0.15em',
                marginBottom: '16px'
              }}>
                PASSO {item.step}
              </div>

              <h3 style={{
                fontSize: 'clamp(20px, 2.8vw, 26px)',
                fontWeight: '400',
                color: '#2D3748',
                marginBottom: 'clamp(12px, 2vw, 16px)',
                fontFamily: "'Playfair Display', serif"
              }}>
                {item.titulo}
              </h3>

              <p style={{
                fontSize: 'clamp(14px, 1.7vw, 16px)',
                color: '#6B6662',
                lineHeight: 1.9,
                fontWeight: '300'
              }}>
                {item.descricao}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ✅ NOVA SEÇÃO: NÚMEROS E RESULTADOS */}
      <section style={{
        padding: 'clamp(100px, 12vw, 140px) clamp(40px, 8vw, 100px)',
        background: 'linear-gradient(135deg, #8B7E74 0%, #A8877A 100%)',
        color: '#FFFFFF',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decoração de fundo */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          pointerEvents: 'none'
        }}/>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1
          }}
        >
          <h2 style={{
            fontSize: 'clamp(36px, 6vw, 56px)',
            fontWeight: '300',
            marginBottom: 'clamp(60px, 8vw, 80px)',
            fontFamily: "'Playfair Display', serif",
            letterSpacing: '-0.02em'
          }}>
            Números que Comprovam Nossa Excelência
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
            gap: 'clamp(40px, 6vw, 60px)'
          }}>
            {[
              { number: '5+', label: 'Anos de Experiência' },
              { number: '20+', label: 'Empresas Atendidas' },
              { number: '100+', label: 'Famílias Beneficiadas' },
              { number: '98%', label: 'Satisfação dos Clientes' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div style={{
                  fontSize: 'clamp(48px, 8vw, 72px)',
                  fontWeight: '700',
                  marginBottom: '12px',
                  fontFamily: "'Playfair Display', serif",
                  textShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: 'clamp(14px, 1.8vw, 17px)',
                  opacity: 0.95,
                  letterSpacing: '0.05em',
                  fontWeight: '300'
                }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <Operadoras />

      {/* ✅ NOVA SEÇÃO: POR QUE ESCOLHER */}
      <section style={{
        padding: 'clamp(100px, 12vw, 160px) clamp(40px, 8vw, 100px)',
        background: '#FAF8F5'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(60px, 8vw, 100px)'
          }}
        >
          <p style={{
            fontSize: 'clamp(11px, 1.3vw, 13px)',
            fontWeight: '500',
            color: '#A8877A',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: 'clamp(20px, 3vw, 28px)'
          }}>
            ✦ Diferenciais
          </p>
          
          <h2 style={{
            fontSize: 'clamp(40px, 7vw, 72px)',
            fontWeight: '300',
            color: '#8B7E74',
            fontFamily: "'Playfair Display', serif",
            letterSpacing: '-0.02em',
            lineHeight: 1.1
          }}>
            Por Que Escolher Nossa Consultoria?
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: 'clamp(32px, 5vw, 48px)',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {[
            {
              titulo: 'Atendimento Humanizado',
              descricao: 'Não somos robôs. Entendemos suas necessidades e encontramos a solução perfeita.',
              icone: '💎'
            },
            {
              titulo: 'Suporte Vitalício',
              descricao: 'Estamos ao seu lado sempre que precisar. Domingo a domingo, sem exceção.',
              icone: '🤝'
            },
            {
              titulo: 'Sem Custos Adicionais',
              descricao: 'Nossa consultoria é 100% gratuita. Você paga o mesmo preço diretamente na operadora.',
              icone: '💰'
            },
            {
              titulo: 'Comparação de Operadoras',
              descricao: 'Analisamos todas as opções do mercado para você escolher a melhor.',
              icone: '📊'
            },
            {
              titulo: 'Processo Rápido',
              descricao: 'Aprovação em até 48 horas. Sem burocracia desnecessária.',
              icone: '⚡'
            },
            {
              titulo: 'Credibilidade',
              descricao: 'Certificada e autorizada pelas principais operadoras do Brasil.',
              icone: '🏆'
            }
          ].map((item, index) => (
            <motion.div
              key={item.titulo}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              style={{
                padding: 'clamp(40px, 5vw, 48px)',
                background: '#FFFFFF',
                borderRadius: '20px',
                border: '1px solid rgba(197, 188, 181, 0.2)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.06)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.12)';
                e.currentTarget.style.borderColor = 'rgba(168, 135, 122, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.06)';
                e.currentTarget.style.borderColor = 'rgba(197, 188, 181, 0.2)';
              }}
            >
              <div style={{
                fontSize: 'clamp(48px, 7vw, 64px)',
                marginBottom: 'clamp(20px, 3vw, 24px)'
              }}>
                {item.icone}
              </div>

              <h3 style={{
                fontSize: 'clamp(20px, 2.8vw, 26px)',
                fontWeight: '400',
                color: '#2D3748',
                marginBottom: 'clamp(12px, 2vw, 16px)',
                fontFamily: "'Playfair Display', serif"
              }}>
                {item.titulo}
              </h3>

              <p style={{
                fontSize: 'clamp(14px, 1.7vw, 16px)',
                color: '#6B6662',
                lineHeight: 1.9,
                fontWeight: '300'
              }}>
                {item.descricao}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ✅ NOVA SEÇÃO: CTA FINAL */}
      <section style={{
        padding: 'clamp(100px, 12vw, 140px) clamp(40px, 8vw, 100px)',
        background: 'linear-gradient(135deg, #2D3748 0%, #1A202C 100%)',
        color: '#FFFFFF',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decoração */}
        <div style={{
          position: 'absolute',
          bottom: '-20%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(168, 135, 122, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(100px)',
          pointerEvents: 'none'
        }}/>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1
          }}
        >
          <h2 style={{
            fontSize: 'clamp(36px, 6vw, 64px)',
            fontWeight: '300',
            marginBottom: 'clamp(20px, 3vw, 28px)',
            fontFamily: "'Playfair Display', serif",
            letterSpacing: '-0.02em',
            lineHeight: 1.2
          }}>
            Pronto Para Encontrar o Plano Perfeito?
          </h2>

          <p style={{
            fontSize: 'clamp(16px, 2.2vw, 20px)',
            marginBottom: 'clamp(40px, 6vw, 60px)',
            opacity: 0.95,
            lineHeight: 1.8,
            fontWeight: '300'
          }}>
            Receba uma cotação personalizada em minutos.<br />
            Atendimento gratuito e sem compromisso.
          </p>

          <div style={{
            display: 'flex',
            flexDirection: window.innerWidth < 768 ? 'column' : 'row',
            gap: 'clamp(16px, 2.5vw, 24px)',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 'clamp(32px, 5vw, 48px)'
          }}>
            <a
              href="https://wa.me/5521977472141?text=Olá!%20Gostaria%20de%20uma%20cotação%20de%20plano%20de%20saúde."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 'clamp(15px, 2vw, 18px)',
                fontWeight: '600',
                color: '#FFFFFF',
                textDecoration: 'none',
                padding: 'clamp(16px, 2.5vw, 20px) clamp(32px, 5vw, 56px)',
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                borderRadius: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 12px 32px rgba(37, 211, 102, 0.4)',
                transition: 'all 0.3s ease',
                minHeight: '56px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(37, 211, 102, 0.5)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(37, 211, 102, 0.4)';
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Falar no WhatsApp
            </a>

            <Link
              to="/contato"
              style={{
                fontSize: 'clamp(15px, 2vw, 18px)',
                fontWeight: '600',
                color: '#FFFFFF',
                textDecoration: 'none',
                padding: 'clamp(16px, 2.5vw, 20px) clamp(32px, 5vw, 56px)',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                minHeight: '56px',
                display: 'inline-flex',
                alignItems: 'center'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              }}
            >
              Preencher Formulário
            </Link>
          </div>

          <p style={{
            fontSize: 'clamp(12px, 1.6vw, 14px)',
            opacity: 0.75,
            fontWeight: '300',
            letterSpacing: '0.03em'
          }}>
            ✦ Atendimento 24/7 • Resposta em até 2 horas • 100% Gratuito
          </p>
        </motion.div>
      </section>
    </>
  );
}

export default PaginaBlog;
