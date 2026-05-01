import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
        maxWidth: '1280px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
        gap: 'clamp(48px, 8vw, 96px)',
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
            fontWeight: '700',
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
            marginBottom: '42px',
            lineHeight: 1.75,
            color: '#4A5565',
            maxWidth: '660px'
          }}>
            Envie seus dados para uma pré-análise. A cotação é preparada por uma consultora, considerando perfil, operadoras e regras comerciais vigentes.
          </p>

          <Link to="/contato" style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '700',
            textDecoration: 'none',
            padding: '18px 34px',
            background: '#101820',
            color: '#FFFFFF',
            borderRadius: '999px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase'
          }}>
            Solicitar pré-análise
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ position: 'relative' }}
        >
          <img
            src="/images/maisa-perfil.jpg"
            alt="Maisa Valentim"
            style={{
              width: '100%',
              height: 'clamp(460px, 66vh, 680px)',
              borderRadius: '28px',
              objectFit: 'cover',
              objectPosition: 'center 20%',
              boxShadow: '0 36px 90px rgba(16, 24, 32, 0.18)'
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
