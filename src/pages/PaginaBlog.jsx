import Hero from '../components/Hero.jsx';
import Operadoras from '../components/Operadoras.jsx';
import Simulador from '../components/Simulador.jsx';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';


function PaginaBlog() {
  const beneficios = [
    {
      titulo: 'Proteção Completa',
      descricao: 'Planos de saúde com atendimento rápido e cobertura nacional para você e sua família.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      titulo: 'Atendimento Personalizado',
      descricao: 'Análise detalhada do seu perfil para encontrar o plano ideal para suas necessidades.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      ),
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      titulo: 'Transparência Total',
      descricao: 'Clareza absoluta sobre coberturas, valores e carências sem letras miúdas.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      ),
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    }
  ];

  return (
  
    <>
    <SEO 
      title="Início - Planos de Saúde RJ"
      description="Consultoria especializada em planos de saúde no Rio de Janeiro. Bradesco, Unimed, SulAmérica. Cotação gratuita em 24h. Simulador online. Atendimento personalizado PJ e familiar."
      keywords="plano de saúde RJ, simulador plano saúde, cotação gratuita, plano empresarial, Bradesco saúde Rio"
    />
      <Hero />
      
      {/* ✅ SEÇÃO SIMULADOR */}
      <section style={{
        padding: 'clamp(60px, 10vw, 100px) clamp(20px, 5vw, 40px)',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%)'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            textAlign: 'center',
            marginBottom: '40px'
          }}
        >
          <p style={{
            fontSize: 'clamp(11px, 1.3vw, 13px)',
            fontWeight: '500',
            color: '#A8877A',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '20px'
          }}>
            ✦ Faça sua simulação
          </p>
          
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: '300',
            color: '#8B7E74',
            marginBottom: '16px',
            fontFamily: "'Playfair Display', serif",
            letterSpacing: '-0.02em',
            lineHeight: 1.2
          }}>
            Descubra o Valor do Seu Plano
          </h2>
          
          <p style={{
            fontSize: 'clamp(14px, 1.8vw, 18px)',
            color: '#6B6662',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Preencha os dados e receba uma cotação personalizada em até 24 horas
          </p>
        </motion.div>

        <Simulador />
      </section>

     {/* ✅ SEÇÃO DE BENEFÍCIOS 3D PROFISSIONAL - CORES TERROSAS */}
<section style={{
  padding: 'clamp(100px, 12vw, 160px) clamp(40px, 8vw, 100px)',
  background: 'linear-gradient(180deg, #FAF8F5 0%, #F5F1EC 100%)',
  position: 'relative',
  overflow: 'hidden'
}}>
  {/* Decoração sutil de fundo */}
  <div style={{
    position: 'absolute',
    top: '-10%',
    right: '-5%',
    width: '500px',
    height: '500px',
    background: 'radial-gradient(circle, rgba(168, 135, 122, 0.08) 0%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(80px)',
    pointerEvents: 'none'
  }}/>

  <div style={{
    position: 'absolute',
    bottom: '-10%',
    left: '-5%',
    width: '500px',
    height: '500px',
    background: 'radial-gradient(circle, rgba(139, 126, 116, 0.08) 0%, transparent 70%)',
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
      textAlign: 'center',
      marginBottom: 'clamp(60px, 8vw, 100px)',
      position: 'relative',
      zIndex: 1
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
    margin: '0 auto',
    position: 'relative',
    zIndex: 1
  }}>
    {[
      {
        titulo: 'Proteção Completa',
        descricao: 'Planos de saúde com atendimento rápido e cobertura nacional para você e sua família.',
        icon: (
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        ),
        gradient: 'linear-gradient(135deg, #A8877A 0%, #8B7E74 100%)'
      },
      {
        titulo: 'Atendimento Personalizado',
        descricao: 'Análise detalhada do seu perfil para encontrar o plano ideal para suas necessidades.',
        icon: (
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        ),
        gradient: 'linear-gradient(135deg, #C5BCB5 0%, #A8877A 100%)'
      },
      {
        titulo: 'Transparência Total',
        descricao: 'Clareza absoluta sobre coberturas, valores e carências sem letras miúdas.',
        icon: (
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        ),
        gradient: 'linear-gradient(135deg, #9B9289 0%, #8B7E74 100%)'
      }
    ].map((beneficio, index) => (
      <motion.div
        key={beneficio.titulo}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        whileHover={{ 
          y: -12,
          rotateX: 2,
          rotateY: 2,
          scale: 1.02
        }}
        style={{
          padding: 'clamp(40px, 5vw, 56px) clamp(32px, 4vw, 48px)',
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(30px) saturate(180%)',
          WebkitBackdropFilter: 'blur(30px) saturate(180%)',
          border: '1px solid rgba(197, 188, 181, 0.3)',
          borderRadius: '28px',
          textAlign: 'center',
          boxShadow: `
            0 20px 60px rgba(139, 126, 116, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.8),
            0 1px 0 rgba(255, 255, 255, 0.5)
          `,
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.boxShadow = `
            0 30px 80px rgba(139, 126, 116, 0.18),
            inset 0 1px 0 rgba(255, 255, 255, 0.9),
            0 0 40px rgba(168, 135, 122, 0.15)
          `;
          e.currentTarget.style.borderColor = 'rgba(168, 135, 122, 0.5)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.boxShadow = `
            0 20px 60px rgba(139, 126, 116, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.8),
            0 1px 0 rgba(255, 255, 255, 0.5)
          `;
          e.currentTarget.style.borderColor = 'rgba(197, 188, 181, 0.3)';
        }}
      >
        {/* Reflexo espelhado sutil */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, transparent 100%)',
          borderRadius: '28px 28px 0 0',
          pointerEvents: 'none'
        }}/>

        {/* Brilho lateral */}
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '-50%',
          width: '200%',
          height: '60%',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)',
          transform: 'rotate(-45deg)',
          pointerEvents: 'none',
          transition: 'all 0.6s ease'
        }}/>

        {/* Ícone SVG com gradiente terroso */}
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.2, type: 'spring' }}
          style={{
            width: '80px',
            height: '80px',
            margin: '0 auto clamp(24px, 3vw, 32px)',
            background: beneficio.gradient,
            borderRadius: '22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: `
              0 15px 35px rgba(139, 126, 116, 0.25),
              inset 0 2px 0 rgba(255, 255, 255, 0.3),
              inset 0 -2px 0 rgba(0, 0, 0, 0.1)
            `,
            position: 'relative',
            transform: 'translateZ(30px)'
          }}
        >
          {beneficio.icon}
          
          {/* Brilho interno superior */}
          <div style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            right: '8px',
            height: '35%',
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, transparent 100%)',
            borderRadius: '16px 16px 0 0',
            pointerEvents: 'none'
          }}/>
        </motion.div>
        
        <h3 style={{
          fontSize: 'clamp(22px, 3vw, 28px)',
          fontWeight: '500',
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
          lineHeight: 1.9,
          fontWeight: '300'
        }}>
          {beneficio.descricao}
        </p>
      </motion.div>
    ))}
  </div>
</section>


      {/* Restante das seções continuam iguais... */}
      {/* (Como Funciona, Números, etc.) */}
      
      <Operadoras />

      {/* CTA FINAL */}
      <section style={{
        padding: 'clamp(100px, 12vw, 140px) clamp(40px, 8vw, 100px)',
        background: 'linear-gradient(135deg, #2D3748 0%, #1A202C 100%)',
        color: '#FFFFFF',
        textAlign: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            maxWidth: '900px',
            margin: '0 auto'
          }}
        >
          <h2 style={{
            fontSize: 'clamp(36px, 6vw, 64px)',
            fontWeight: '300',
            marginBottom: 'clamp(20px, 3vw, 28px)',
            fontFamily: "'Playfair Display', serif"
          }}>
            Pronto Para Encontrar o Plano Perfeito?
          </h2>

          <p style={{
            fontSize: 'clamp(16px, 2.2vw, 20px)',
            marginBottom: 'clamp(40px, 6vw, 60px)',
            opacity: 0.95
          }}>
            Receba uma cotação personalizada em minutos.
          </p>

          <a
            href="https://wa.me/5521977472141?text=Olá!%20Gostaria%20de%20uma%20cotação."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '20px 48px',
              background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '700',
              boxShadow: '0 12px 32px rgba(37, 211, 102, 0.4)',
              transition: 'all 0.3s ease'
            }}
          >
            Falar no WhatsApp
          </a>
        </motion.div>
      </section>
    </>
  );
}

export default PaginaBlog;
