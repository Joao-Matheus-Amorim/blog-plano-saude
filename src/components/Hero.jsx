import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(100px, 12vh, 140px) clamp(40px, 8vw, 100px)',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(180deg, #FAF8F5 0%, #F5F2ED 50%, #EDE9E3 100%)'
    }}>
      {/* Orbes fluidos gradientes */}
      <motion.div
        animate={{
          y: [0, -40, 0],
          x: [0, 30, 0],
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: '15%',
          right: '8%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(168, 135, 122, 0.3) 0%, rgba(216, 194, 178, 0.15) 40%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          pointerEvents: 'none'
        }}
      />

      <motion.div
        animate={{
          y: [0, 50, 0],
          x: [0, -40, 0],
          scale: [1, 1.15, 1],
          opacity: [0.12, 0.22, 0.12]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(197, 188, 181, 0.25) 0%, rgba(226, 217, 207, 0.12) 40%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(90px)',
          pointerEvents: 'none'
        }}
      />

      <div style={{
        maxWidth: '1400px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))',
        gap: 'clamp(60px, 10vw, 120px)',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            style={{
              display: 'inline-block',
              padding: '12px 28px',
              background: 'rgba(197, 188, 181, 0.12)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(168, 135, 122, 0.2)',
              borderRadius: '100px',
              marginBottom: 'clamp(28px, 4vw, 40px)',
              fontSize: 'clamp(11px, 1.3vw, 13px)',
              fontWeight: '500',
              color: '#A8877A',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              boxShadow: '0 4px 20px rgba(168, 135, 122, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
            }}
          >
            ✦ Consultoria Premium
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{ 
              fontSize: 'clamp(52px, 9vw, 110px)', 
              fontWeight: '300',
              marginBottom: 'clamp(28px, 4vw, 40px)',
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              fontFamily: "'Playfair Display', serif",
              background: 'linear-gradient(135deg, #8B7E74 0%, #C5BCB5 50%, #A8877A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 2px 8px rgba(168, 135, 122, 0.15))'
            }}
          >
            Maisa<br/>Valentim
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            style={{ 
              fontSize: 'clamp(16px, 2vw, 19px)', 
              marginBottom: 'clamp(48px, 7vw, 64px)',
              lineHeight: 2,
              color: '#6B6662',
              maxWidth: '580px',
              fontWeight: '300',
              letterSpacing: '0.01em'
            }}
          >
            Orientação especializada para encontrar o plano de saúde perfeito. 
            Atendimento humanizado com suporte vitalício.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            <Link to="/contato" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '14px',
              fontSize: 'clamp(14px, 1.7vw, 16px)',
              fontWeight: '500',
              textDecoration: 'none',
              padding: 'clamp(18px, 2.8vw, 24px) clamp(44px, 5.5vw, 60px)',
              background: 'linear-gradient(135deg, #A8877A 0%, #8B7E74 100%)',
              color: '#FFFFFF',
              borderRadius: '12px',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              boxShadow: '0 12px 40px rgba(168, 135, 122, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
              position: 'relative',
              overflow: 'hidden',
              transform: 'perspective(1000px) rotateX(0deg)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(-6deg) translateY(-6px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(168, 135, 122, 0.4), 0 0 40px rgba(168, 135, 122, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.15) inset';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(168, 135, 122, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1) inset';
            }}
            >
              Solicitar Cotação
              <span style={{ fontSize: '18px', fontWeight: '300' }}>→</span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div className="reflect-3d" style={{
            position: 'relative',
            width: '100%',
            maxWidth: '500px'
          }}>
            {/* Frame 3D glassmorphism fluido */}
            <motion.div
              animate={{
                rotate: [0, 5, 0, -5, 0],
                scale: [1, 1.02, 1]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: 'calc(100% + 40px)',
                height: 'calc(100% + 40px)',
                background: 'linear-gradient(135deg, rgba(197, 188, 181, 0.15), rgba(226, 217, 207, 0.1))',
                backdropFilter: 'blur(30px)',
                borderRadius: '32px',
                border: '1px solid rgba(197, 188, 181, 0.2)',
                zIndex: 0,
                boxShadow: '0 16px 48px rgba(139, 126, 116, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
              }}
            />
            
            <motion.img 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              src="/images/maisa1.jpg" 
              alt="Maisa Valentim"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '24px',
                boxShadow: '0 24px 72px rgba(139, 126, 116, 0.2), 0 0 60px rgba(168, 135, 122, 0.1)',
                position: 'relative',
                zIndex: 1,
                border: '1px solid rgba(197, 188, 181, 0.15)'
              }}
            />

            {/* Badge 3D luxuoso - 100+ Famílias Beneficiadas */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              whileHover={{ scale: 1.05, y: -6 }}
              style={{
                position: 'absolute',
                bottom: '-28px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(30px)',
                padding: 'clamp(20px, 3vw, 28px) clamp(32px, 4.5vw, 48px)',
                borderRadius: '18px',
                border: '1px solid rgba(197, 188, 181, 0.25)',
                boxShadow: '0 16px 48px rgba(139, 126, 116, 0.25), 0 0 40px rgba(168, 135, 122, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                zIndex: 2,
                whiteSpace: 'nowrap',
                transition: 'all 0.4s ease'
              }}
            >
              <div style={{
                fontSize: 'clamp(28px, 4vw, 38px)',
                fontWeight: '300',
                background: 'linear-gradient(135deg, #A8877A 0%, #8B7E74 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '4px',
                fontFamily: "'Playfair Display', serif",
                letterSpacing: '-0.02em'
              }}>
                100+
              </div>
              <div style={{
                fontSize: 'clamp(11px, 1.3vw, 13px)',
                color: '#9B9289',
                fontWeight: '500',
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}>
                Famílias Beneficiadas
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
