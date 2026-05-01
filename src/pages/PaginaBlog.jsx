import Hero from '../components/Hero.jsx';
import Operadoras from '../components/Operadoras.jsx';
import { motion } from 'framer-motion';
import SEO from '../components/SEO.jsx';

function PaginaBlog() {
  const pillars = [
    {
      title: 'Diagnóstico antes da proposta',
      text: 'O primeiro contato entende perfil, cidade, número de vidas, momento de contratação e prioridade real antes de falar em plano.'
    },
    {
      title: 'Curadoria, não vitrine',
      text: 'A consultoria filtra operadoras e caminhos possíveis para evitar escolha por impulso ou comparação rasa de preço.'
    },
    {
      title: 'Contato humano no ponto certo',
      text: 'O site coleta o lead e direciona para uma conversa objetiva pelo WhatsApp, preservando a negociação e a percepção de valor.'
    }
  ];

  const steps = [
    'Você envia os dados essenciais',
    'A consultoria avalia o cenário',
    'Você recebe orientação pelo WhatsApp'
  ];

  return (
    <>
      <SEO
        title="Consultoria de Planos de Saúde RJ"
        description="Consultoria especializada em planos de saúde no Rio de Janeiro. Pré-análise gratuita para planos PJ, familiar, individual e MEI. Atendimento humano via WhatsApp."
        keywords="plano de saúde RJ, consultoria plano de saúde, plano empresarial, plano familiar, Bradesco saúde, Unimed, Amil, SulAmérica"
      />

      <Hero />

      <section style={{
        padding: 'clamp(74px, 9vw, 120px) clamp(20px, 6vw, 96px)',
        background: '#101820',
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)',
          gap: 'clamp(36px, 6vw, 72px)',
          alignItems: 'start'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p style={{ color: '#C8A98B', fontSize: '12px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '22px' }}>
              Método de captação consultiva
            </p>
            <h2 style={{ fontSize: 'clamp(38px, 6vw, 72px)', color: '#FFFFFF', lineHeight: 0.98, marginBottom: '26px', fontWeight: 600 }}>
              O lead chega mais preparado para a conversa.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.68)', fontSize: '18px', lineHeight: 1.8, maxWidth: '560px' }}>
              O design deixa claro que não existe preço automático. Isso aumenta confiança, reduz curiosos e protege a venda para o atendimento humano.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gap: '14px' }}>
            {pillars.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                style={{
                  padding: 'clamp(24px, 4vw, 34px)',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderRadius: '26px'
                }}
              >
                <span style={{ display: 'block', color: '#C8A98B', fontSize: '13px', fontWeight: 800, marginBottom: '14px' }}>
                  0{index + 1}
                </span>
                <h3 style={{ color: '#FFFFFF', fontSize: 'clamp(22px, 3vw, 32px)', lineHeight: 1.08, marginBottom: '14px' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.66)', lineHeight: 1.75, fontSize: '15px', margin: 0 }}>
                  {item.text}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section style={{
        padding: 'clamp(70px, 9vw, 118px) clamp(20px, 6vw, 96px)',
        background: '#F6F1EA'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.8fr) minmax(0, 1.2fr)', gap: 'clamp(34px, 6vw, 80px)', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#8A6F5A', fontSize: '12px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '20px' }}>
                Jornada simples
              </p>
              <h2 style={{ fontSize: 'clamp(36px, 5.4vw, 68px)', lineHeight: 0.98, marginBottom: '22px', color: '#101820' }}>
                Menos formulário frio. Mais intenção real.
              </h2>
              <p style={{ color: '#5D6878', fontSize: '17px', lineHeight: 1.8 }}>
                A página agora conduz o visitante para uma decisão de contato, sem transformar o site em uma calculadora de preço.
              </p>
            </div>

            <div style={{ display: 'grid', gap: '12px' }}>
              {steps.map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '72px 1fr',
                    gap: '20px',
                    alignItems: 'center',
                    padding: '22px',
                    background: '#FFFFFF',
                    borderRadius: '24px',
                    border: '1px solid rgba(16, 24, 32, 0.08)',
                    boxShadow: '0 18px 54px rgba(16, 24, 32, 0.07)'
                  }}
                >
                  <strong style={{ fontFamily: "'Playfair Display', serif", color: '#101820', fontSize: '34px', lineHeight: 1 }}>
                    {index + 1}
                  </strong>
                  <span style={{ color: '#101820', fontSize: '18px', fontWeight: 800 }}>
                    {step}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Operadoras />

      <section style={{
        padding: 'clamp(80px, 10vw, 132px) clamp(20px, 6vw, 96px)',
        background: '#101820',
        color: '#FFFFFF',
        textAlign: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: '860px', margin: '0 auto' }}
        >
          <p style={{ color: '#C8A98B', fontSize: '12px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '22px' }}>
            Próximo passo
          </p>
          <h2 style={{ fontSize: 'clamp(38px, 6vw, 76px)', color: '#FFFFFF', lineHeight: 0.98, marginBottom: '24px' }}>
            Transforme dúvida em conversa qualificada.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.68)', fontSize: '18px', lineHeight: 1.8, marginBottom: '36px' }}>
            Solicite uma pré-análise e receba orientação humana antes de escolher um plano.
          </p>
          <a
            href="#lead-form"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '18px 34px',
              background: '#FFFFFF',
              color: '#101820',
              borderRadius: '999px',
              fontSize: '13px',
              fontWeight: 900,
              letterSpacing: '0.09em',
              textTransform: 'uppercase'
            }}
          >
            Solicitar pré-análise
          </a>
        </motion.div>
      </section>
    </>
  );
}

export default PaginaBlog;
