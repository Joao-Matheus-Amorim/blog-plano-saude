import { motion } from 'framer-motion';
import Simulador from './Simulador.jsx';

function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(112px, 12vh, 156px) clamp(20px, 6vw, 96px) clamp(76px, 9vw, 124px)',
      position: 'relative',
      overflow: 'hidden',
      background: '#F5F0E6'
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(120deg, rgba(37,70,35,0.14) 0%, transparent 32%), radial-gradient(circle at 12% 16%, rgba(143,161,133,0.36), transparent 30rem), radial-gradient(circle at 86% 18%, rgba(194,178,128,0.26), transparent 28rem)',
        pointerEvents: 'none'
      }} />

      <span className="water-orb" style={{ width: '118px', height: '118px', left: '8%', top: '22%', opacity: 0.45 }} />
      <span className="water-orb" style={{ width: '72px', height: '72px', right: '10%', top: '18%', opacity: 0.34, animationDelay: '1.8s' }} />
      <span className="water-orb" style={{ width: '96px', height: '96px', left: '46%', bottom: '10%', opacity: 0.25, animationDelay: '3s' }} />

      <div style={{
        position: 'absolute',
        left: 'clamp(18px, 3vw, 42px)',
        top: 'clamp(92px, 14vh, 142px)',
        bottom: 'clamp(28px, 4vw, 54px)',
        width: '1px',
        background: 'linear-gradient(180deg, transparent, rgba(37,70,35,0.30), transparent)'
      }} />

      <div style={{
        position: 'absolute',
        right: 'clamp(18px, 3vw, 42px)',
        top: 'clamp(92px, 14vh, 142px)',
        bottom: 'clamp(28px, 4vw, 54px)',
        width: '1px',
        background: 'linear-gradient(180deg, transparent, rgba(194,178,128,0.55), transparent)'
      }} />

      <div style={{
        maxWidth: '1320px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.06fr) minmax(380px, 0.94fr)',
        gap: 'clamp(44px, 7vw, 90px)',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            color: '#254623',
            fontSize: '12px',
            fontWeight: '900',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            marginBottom: '28px'
          }}>
            <span style={{ width: '42px', height: '1px', background: '#254623', display: 'inline-block' }} />
            Consultoria privada em planos de saúde
          </div>

          <h1 style={{
            fontSize: 'clamp(48px, 7.8vw, 96px)',
            fontWeight: '600',
            marginBottom: '30px',
            lineHeight: 0.92,
            letterSpacing: '-0.065em',
            fontFamily: "'Playfair Display', serif",
            color: '#254623',
            maxWidth: '880px'
          }}>
            A decisão certa começa antes da proposta.
          </h1>

          <p style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            marginBottom: '34px',
            lineHeight: 1.78,
            color: '#4C5A45',
            maxWidth: '650px'
          }}>
            Uma pré-análise humana para entender o seu cenário antes de indicar caminhos de contratação. Sem preço automático, sem vitrine genérica, sem pressão.
          </p>

          <div className="float-mirror float-gentle-slow" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '10px',
            maxWidth: '660px',
            padding: '10px',
            borderRadius: '26px'
          }}>
            {[
              ['50+', 'empresas atendidas'],
              ['100+', 'famílias orientadas'],
              ['24h', 'retorno médio']
            ].map(([value, label]) => (
              <div key={label} style={{ padding: '16px 14px', position: 'relative', zIndex: 1 }}>
                <strong style={{ display: 'block', color: '#254623', fontSize: '30px', lineHeight: 1, fontFamily: "'Playfair Display', serif" }}>{value}</strong>
                <span style={{ display: 'block', marginTop: '8px', color: '#67715F', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 900 }}>{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          id="lead-form"
          className="float-gentle"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.12 }}
          style={{ position: 'relative' }}
        >
          <div style={{
            position: 'absolute',
            inset: '-18px',
            background: 'linear-gradient(135deg, rgba(37,70,35,0.18), rgba(194,178,128,0.30))',
            borderRadius: '36px',
            filter: 'blur(18px)',
            opacity: 0.82
          }} />
          <div style={{ position: 'relative' }}>
            <Simulador />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
