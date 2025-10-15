import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Operadoras() {
  const operadoras = [
    { nome: 'Unimed', cor: '#00953B' },
    { nome: 'Bradesco Saúde', cor: '#CC092F' },
    { nome: 'SulAmérica', cor: '#003087' },
    { nome: 'Amil', cor: '#0066B3' },
    { nome: 'Amil One', cor: '#0066B3' },
    { nome: 'Porto Seguro', cor: '#005CA9' },
    { nome: 'NotreDame Intermédica', cor: '#00A859' },
    { nome: 'Hapvida', cor: '#00A859' },
    { nome: 'Prevent Senior', cor: '#E30613' },
    
  ];

  return (
    <section style={{
      padding: 'clamp(100px, 12vw, 160px) clamp(40px, 8vw, 100px)',
      position: 'relative',
      background: 'linear-gradient(180deg, #EDE9E3 0%, #F5F2ED 50%, #FAF8F5 100%)'
    }}>
      {/* Orbes flutuantes de fundo */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          opacity: [0.08, 0.15, 0.08]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(197, 188, 181, 0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          pointerEvents: 'none'
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: 'clamp(60px, 8vw, 100px)' }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            fontSize: 'clamp(11px, 1.3vw, 13px)',
            fontWeight: '500',
            color: '#A8877A',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: 'clamp(20px, 3vw, 28px)'
          }}
        >
          ✦ Trabalho com as melhores
        </motion.p>

                <h2 style={{
          fontSize: 'clamp(40px, 7vw, 72px)',
          fontWeight: '300',
          marginBottom: 'clamp(24px, 3vw, 32px)',
          fontFamily: "'Playfair Display', serif",
          letterSpacing: '-0.02em',
          lineHeight: 1.2
        }}>
          <span style={{
            color: '#8B7E74'
          }}>
            Operadoras
          </span>
          <br/>
          <span style={{
            background: 'linear-gradient(135deg, #A8877A 0%, #C5BCB5 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: 'inline-block'
          }}>
            Parceiras
          </span>
        </h2>

        
        <p style={{
          fontSize: 'clamp(14px, 1.7vw, 16px)',
          color: '#6B6662',
          maxWidth: '620px',
          margin: '0 auto',
          lineHeight: 2,
          fontWeight: '300'
        }}>
          Clique na operadora de sua preferência para solicitar uma cotação personalizada
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
          gap: 'clamp(20px, 3vw, 32px)',
          maxWidth: '1100px',
          margin: '0 auto'
        }}
      >
        {operadoras.map((operadora, index) => (
          <Link
            key={operadora.nome}
            to="/contato"
            state={{ operadora: operadora.nome }}
            style={{
              textDecoration: 'none'
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              whileHover={{ 
                y: -12,
                transition: { duration: 0.4 }
              }}
              style={{
                padding: 'clamp(28px, 4vw, 40px)',
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                border: `1px solid ${operadora.cor}15`,
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '140px',
                boxShadow: '0 8px 32px rgba(139, 126, 116, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                transform: 'perspective(1000px) rotateX(0deg)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = `0 20px 60px ${operadora.cor}25, inset 0 1px 0 rgba(255, 255, 255, 0.6)`;
                e.currentTarget.style.borderColor = `${operadora.cor}40`;
                e.currentTarget.style.transform = 'perspective(1000px) rotateX(-5deg)';
                const shine = e.currentTarget.querySelector('.shine-effect');
                if (shine) shine.style.opacity = '1';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(139, 126, 116, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5)';
                e.currentTarget.style.borderColor = `${operadora.cor}15`;
                e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg)';
                const shine = e.currentTarget.querySelector('.shine-effect');
                if (shine) shine.style.opacity = '0';
              }}
            >
              {/* Linha decorativa no topo */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '20%',
                right: '20%',
                height: '3px',
                background: `linear-gradient(90deg, transparent, ${operadora.cor}60, transparent)`,
                opacity: 0.6,
                borderRadius: '0 0 8px 8px'
              }}/>

              <span style={{
                fontSize: 'clamp(17px, 2.4vw, 22px)',
                fontWeight: '400',
                color: operadora.cor,
                textAlign: 'center',
                letterSpacing: '0.02em',
                lineHeight: 1.3,
                marginBottom: 'clamp(12px, 2vw, 16px)',
                fontFamily: "'Playfair Display', serif"
              }}>
                {operadora.nome}
              </span>
              
              <span style={{
                fontSize: 'clamp(11px, 1.4vw, 13px)',
                color: '#9B9289',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                transition: 'all 0.3s ease'
              }}
              className="cta-text"
              >
                Solicitar →
              </span>

              {/* Efeito de brilho no hover */}
              <div 
                className="shine-effect"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(135deg, ${operadora.cor}08, transparent)`,
                  opacity: 0,
                  transition: 'opacity 0.4s ease',
                  pointerEvents: 'none'
                }}
              />
            </motion.div>
          </Link>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{
          textAlign: 'center',
          marginTop: 'clamp(60px, 8vw, 100px)'
        }}
      >
        <p style={{
          fontSize: 'clamp(13px, 1.6vw, 15px)',
          color: '#9B9289',
          fontStyle: 'italic',
          marginBottom: 'clamp(32px, 4vw, 48px)',
          fontWeight: '300'
        }}>
          E muitas outras operadoras credenciadas pela ANS
        </p>

        <Link to="/contato" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          color: '#8B7E74',
          padding: 'clamp(16px, 2.5vw, 20px) clamp(40px, 5vw, 56px)',
          fontSize: 'clamp(13px, 1.6vw, 15px)',
          fontWeight: '500',
          textDecoration: 'none',
          borderRadius: '12px',
          border: '1px solid rgba(197, 188, 181, 0.3)',
          boxShadow: '0 8px 32px rgba(139, 126, 116, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          letterSpacing: '0.03em',
          transform: 'perspective(1000px) rotateX(0deg)'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #A8877A 0%, #8B7E74 100%)';
          e.currentTarget.style.color = '#FFFFFF';
          e.currentTarget.style.borderColor = 'transparent';
          e.currentTarget.style.transform = 'perspective(1000px) rotateX(-4deg) translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 16px 48px rgba(168, 135, 122, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
          e.currentTarget.style.color = '#8B7E74';
          e.currentTarget.style.borderColor = 'rgba(197, 188, 181, 0.3)';
          e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) translateY(0)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(139, 126, 116, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)';
        }}
        >
          Não encontrou? Fale Comigo
          <span style={{ fontSize: '16px' }}>→</span>
        </Link>
      </motion.div>
    </section>
  );
}

export default Operadoras;
