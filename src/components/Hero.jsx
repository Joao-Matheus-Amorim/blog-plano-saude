import { motion } from 'framer-motion';
import Simulador from './Simulador.jsx';

function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(110px, 12vh, 150px) clamp(24px, 7vw, 100px)',
      position: 'relative',
      overflow: 'hidden',
      background: '#F6F1EA'
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 12% 14%, rgba(138, 111, 90, 0.18), transparent 28rem), radial-gradient(circle at 88% 18%, rgba(16, 24, 32, 0.10), transparent 30rem)',
        pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: '1280px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.08fr) minmax(380px, 0.92fr)',
        gap: 'clamp(44px, 7vw, 88px)',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p style={{
            color: '#8A6F5A',
            fontSize: '12px',
            fontWeight: '800',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginBottom: '28px'
          }}>
            Consultoria privada em planos de saúde
          </p>

          <h1 style={{
            fontSize: 'clamp(46px, 7vw, 88px)',
            fontWeight: '600',
            marginBottom: '30px',
            lineHeight: 0.98,
            letterSpacing: '-0.055em',
            fontFamily: "'Playfair Display', serif",
            color: '#101820',
            maxWidth: '820px'
          }}>
            Planos de saúde escolhidos com critério, não no impulso.
          </h1>

          <p style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            marginBottom: '34px',
            lineHeight: 1.75,
            color: '#4A5565',
            maxWidth: '660px'
          }}>
            Envie seus dados para uma pré-análise. A cotação é preparada por uma consultora, considerando perfil, operadoras e regras comerciais vigentes.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '12px',
            maxWidth: '640px'
          }}>
            {[
              ['50+', 'empresas atendidas'],
              ['100+', 'famílias orientadas'],
              ['24h', 'retorno médio']
            ].map(([value, label]) => (
              <div key={label} style={{
                padding: '18px 16px',
                background: 'rgba(255,255,255,0.58)',
                border: '1px solid rgba(16,24,32,0.08)',
                borderRadius: '18px'
              }}>
                <strong style={{ display: 'block', color: '#101820', fontSize: '28px', lineHeight: 1, fontFamily: "'Playfair Display', serif" }}>{value}</strong>
                <span style={{ display: 'block', marginTop: '8px', color: '#667085', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 800 }}>{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ position: 'relative' }}
        >
          <Simulador />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
