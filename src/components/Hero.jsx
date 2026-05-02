import { motion, useScroll, useTransform } from 'framer-motion';
import Simulador from './Simulador.jsx';
import LiquidBackground from './LiquidBackground.jsx';

function Hero() {
  const { scrollYProgress } = useScroll();
  const layerOneY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const layerTwoY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const layerRotate = useTransform(scrollYProgress, [0, 1], [0, 10]);

  return (
    <section className="hero-3d-fluid" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(112px, 12vh, 156px) clamp(20px, 6vw, 96px) clamp(76px, 9vw, 124px)',
      position: 'relative',
      overflow: 'hidden',
      background: '#F5F0E6',
      perspective: '1400px',
      transformStyle: 'preserve-3d'
    }}>
      <LiquidBackground />

      <div className="liquid-gradient-veil" />

      <motion.div className="parallax-liquid-layer parallax-liquid-layer-a" style={{ y: layerOneY, rotate: layerRotate }} />
      <motion.div className="parallax-liquid-layer parallax-liquid-layer-b" style={{ y: layerTwoY }} />

      <span className="water-orb liquid-orb-3d" style={{ width: '118px', height: '118px', left: '8%', top: '22%', opacity: 0.45 }} />
      <span className="water-orb liquid-orb-3d" style={{ width: '72px', height: '72px', right: '10%', top: '18%', opacity: 0.34, animationDelay: '1.8s' }} />
      <span className="water-orb liquid-orb-3d" style={{ width: '96px', height: '96px', left: '46%', bottom: '10%', opacity: 0.25, animationDelay: '3s' }} />

      <div className="hero-depth-line hero-depth-line-left" />
      <div className="hero-depth-line hero-depth-line-right" />

      <div style={{
        maxWidth: '1320px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.06fr) minmax(380px, 0.94fr)',
        gap: 'clamp(44px, 7vw, 90px)',
        alignItems: 'center',
        position: 'relative',
        zIndex: 2,
        transformStyle: 'preserve-3d'
      }}>
        <motion.div
          className="hero-copy-3d"
          initial={{ opacity: 0, y: 32, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="liquid-eyebrow"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.62, delay: 0.08 }}
          >
            <span />
            Consultoria privada em planos de saúde
          </motion.div>

          <motion.h1
            className="hero-fluid-title"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.12 }}
          >
            A decisão certa começa antes da proposta.
          </motion.h1>

          <motion.p
            className="hero-fluid-text"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.18 }}
          >
            Uma pré-análise humana para entender o seu cenário antes de indicar caminhos de contratação. Sem preço automático, sem vitrine genérica, sem pressão.
          </motion.p>

          <motion.div
            className="float-mirror float-gentle-slow hero-stats-liquid"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.68, delay: 0.26 }}
          >
            {[
              ['50+', 'empresas atendidas'],
              ['100+', 'famílias orientadas'],
              ['24h', 'retorno médio']
            ].map(([value, label]) => (
              <motion.div
                key={label}
                className="hero-stat-cell"
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
          id="lead-form"
          className="hero-form-3d float-gentle"
          initial={{ opacity: 0, y: 34, rotateY: -5, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ rotateY: -2.2, rotateX: 1.2, z: 22 }}
        >
          <div className="liquid-card-glow" />
          <div style={{ position: 'relative' }}>
            <Simulador />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
