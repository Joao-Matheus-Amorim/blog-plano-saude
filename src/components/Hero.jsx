import { motion } from 'framer-motion';
import Simulador from './Simulador.jsx';

function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(112px, 12vh, 156px) clamp(20px, 6vw, 96px) clamp(64px, 8vw, 110px)',
      position: 'relative',
      overflow: 'hidden',
      background: '#F6F1EA'
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(120deg, rgba(16,24,32,0.08) 0%, transparent 28%), radial-gradient(circle at 14% 18%, rgba(138,111,90,0.24), transparent 30rem), radial-gradient(circle at 88% 18%, rgba(16,24,32,0.12), transparent 28rem)',
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'absolute',
        left: 'clamp(18px, 3vw, 42px)',
        top: 'clamp(92px, 14vh, 142px)',
        bottom: 'clamp(28px, 4vw, 54px)',
        width: '1px',
        background: 'linear-gradient(180deg, transparent, rgba(16,24,32,0.22), transparent)'
      }} />

      <div style={{
        position: 'absolute',
        right: 'clamp(18px, 3vw, 42px)',
        top: 'clamp(92px, 14vh, 142px)',
        bottom: 'clamp(28px, 4vw, 54px)',
        width: '1px',
        background: 'linear-gradient(180deg, transparent, rgba(138,111,90,0.28), transparent)'
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
            color: '#8A6F5A',
            fontSize: '12px',
            fontWeight: '900',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            marginBottom: '28px'
          }}>
            <span style={{ width: '42px', height: '1px', background: '#8A6F5A', display: 'inline-block' }} />
            Consultoria privada em planos de saúde
          </div>

          <h1 style={{
            fontSize: 'clamp(48px, 7.8vw, 96px)',
            fontWeight: '600',
            marginBottom: '30px',
            lineHeight: 0.92,
            letterSpacing: '-0.065em',
            fontFamily: "'Playfair Display', serif",
            color: '#101820',
            maxWidth: '880px'
          }}>
            A decisão certa começa antes da proposta.
          </h1>

          <p style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            marginBottom: '34px',
            lineHeight: 1.78,
            color: '#4A5565',
            maxWidth: '650px'
          }}>
            Uma pré-análise humana para entender o seu cenário antes de indicar caminhos de contratação. Sem preço automático, sem vitrine genérica, sem pressão.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '10px',
            maxWidth: '660px',
            padding: '10px',
            background: 'rgba(255,255,255,0.42)',
            border: '1px solid rgba(16,24,32,0.08)',
            borderRadius: '24px'
          }}>
            {[
              ['50+', 'empresas atendidas'],
              ['100+', 'famílias orientadas'],
              ['24h', 'retorno médio']
            ].map(([value, label]) => (
              <div key={label} style={{ padding: '16px 14px' }}>
                <strong style={{ display: 'block', color: '#101820', fontSize: '30px', lineHeight: 1, fontFamily: "'Playfair Display', serif" }}>{value}</strong>
                <span style={{ display: 'block', marginTop: '8px', color: '#667085', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 900 }}>{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          id="lead-form"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.12 }}
          style={{ position: 'relative' }}
        >
          <div style={{
            position: 'absolute',
            inset: '-18px',
            background: 'linear-gradient(135deg, rgba(16,24,32,0.12), rgba(138,111,90,0.22))',
            borderRadius: '36px',
            filter: 'blur(18px)',
            opacity: 0.72
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
