import Hero from '../components/Hero.jsx';
import Operadoras from '../components/Operadoras.jsx';
import { motion } from 'framer-motion';

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
      
      {/* Seção de Benefícios */}
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

      <Operadoras />
    </>
  );
}

export default PaginaBlog;
