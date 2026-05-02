import { motion, useScroll, useTransform } from 'framer-motion';
import Simulador from './Simulador.jsx';
import LiquidBackground from './LiquidBackground.jsx';
import MembershipCards from './MembershipCards.jsx';

function Hero() {
  const { scrollYProgress } = useScroll();
  const layerOneY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const layerTwoY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const layerRotate = useTransform(scrollYProgress, [0, 1], [0, 10]);

  return (
    <section className="hero-3d-fluid premium-membership-hero" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(112px, 12vh, 156px) clamp(20px, 6vw, 96px) clamp(76px, 9vw, 124px)',
      position: 'relative',
      overflow: 'hidden',
      background: '#111009',
      perspective: '1400px',
      transformStyle: 'preserve-3d'
    }}>
      <LiquidBackground />

      <div className="liquid-gradient-veil membership-gradient-veil" />

      <motion.div className="parallax-liquid-layer parallax-liquid-layer-a membership-bronze-layer" style={{ y: layerOneY, rotate: layerRotate }} />
      <motion.div className="parallax-liquid-layer parallax-liquid-layer-b membership-sand-layer" style={{ y: layerTwoY }} />

      <div className="membership-diagonal-slice" />
      <div className="hero-depth-line hero-depth-line-left membership-depth-line" />
      <div className="hero-depth-line hero-depth-line-right membership-depth-line" />

      <div className="membership-hero-grid">
        <motion.div
          className="hero-copy-3d membership-hero-copy"
          initial={{ opacity: 0, y: 32, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="liquid-eyebrow membership-eyebrow"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.62, delay: 0.08 }}
          >
            <span />
            Curadoria premium em planos de saúde
          </motion.div>

          <motion.h1
            className="hero-fluid-title membership-hero-title"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.12 }}
          >
            O plano certo como um <em>cartão de membro</em>.
          </motion.h1>

          <motion.p
            className="hero-fluid-text membership-hero-text"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.18 }}
          >
            Uma experiência consultiva para escolher saúde com a mesma lógica de um cartão premium: acesso, rede, confiança e suporte humano antes da proposta.
          </motion.p>

          <motion.div
            className="membership-actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.24 }}
          >
            <a className="membership-primary-cta" href="#lead-form">Descobrir meu perfil</a>
            <a className="membership-secondary-cta" href="#membership-experience">Ver experiência</a>
          </motion.div>

          <motion.div
            className="float-mirror float-gentle-slow hero-stats-liquid membership-stats"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.68, delay: 0.32 }}
          >
            {[
              ['Curadoria', 'sem vitrine genérica'],
              ['Rede', 'comparada por perfil'],
              ['Humano', 'atendimento no WhatsApp']
            ].map(([value, label]) => (
              <motion.div
                key={label}
                className="hero-stat-cell membership-stat-cell"
                whileHover={{ y: -5, rotateX: 4, rotateY: -4 }}
                transition={{ type: 'spring', stiffness: 280, damping: 20 }}
              >
                <strong>{value}</strong>
                <span>{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="membership-showcase-wrap"
          initial={{ opacity: 0, y: 34, rotateY: -5, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
        >
          <MembershipCards />
        </motion.div>
      </div>

      <motion.div
        id="lead-form"
        className="membership-lead-panel hero-form-3d"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.78, delay: 0.46, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="liquid-card-glow membership-lead-glow" />
        <div className="membership-lead-heading">
          <span>Pré-análise privada</span>
          <strong>Receba uma indicação antes de falar em preço.</strong>
        </div>
        <div style={{ position: 'relative' }}>
          <Simulador />
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
