import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PopupSaida() {
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    const popupJaMostrado = sessionStorage.getItem('popupSaidaMostrado');

    if (popupJaMostrado) return;

    const handleMouseLeave = (e) => {
      if (e.clientY <= 0) {
        setMostrar(true);
        sessionStorage.setItem('popupSaidaMostrado', 'true');
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const fechar = () => {
    setMostrar(false);
  };

  const abrirWhatsApp = () => {
    window.open(
      'https://wa.me/5521977472141?text=Olá!%20Vi%20a%20opção%20de%20análise%20personalizada%20e%20gostaria%20de%20mais%20informações.',
      '_blank'
    );
    fechar();
  };

  return (
    <AnimatePresence>
      {mostrar && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={fechar}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              zIndex: 999998,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              overflow: 'auto'
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              transition={{ duration: 0.4, type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                width: '90%',
                maxWidth: '500px',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(30px) saturate(180%)',
                WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                borderRadius: '28px',
                padding: 'clamp(32px, 5vw, 48px)',
                boxShadow: '0 30px 80px rgba(139, 126, 116, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.8), 0 0 0 1px rgba(197, 188, 181, 0.3)',
                textAlign: 'center',
                overflow: 'hidden',
                margin: 'auto'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-20%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(168, 135, 122, 0.15) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(60px)',
                pointerEvents: 'none'
              }}/>

              <button
                onClick={fechar}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(139, 126, 116, 0.1)',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#8B7E74',
                  zIndex: 10
                }}
                aria-label="Fechar popup"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>

              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
                style={{
                  width: '80px',
                  height: '80px',
                  margin: '0 auto 24px',
                  background: 'linear-gradient(135deg, #A8877A 0%, #8B7E74 100%)',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 12px 32px rgba(139, 126, 116, 0.3)',
                  position: 'relative'
                }}
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                  fontSize: 'clamp(24px, 4vw, 32px)',
                  fontWeight: '600',
                  color: '#8B7E74',
                  marginBottom: '12px',
                  fontFamily: "'Playfair Display', serif",
                  lineHeight: 1.2
                }}
              >
                Não vá ainda! 🎁
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{
                  fontSize: 'clamp(15px, 2vw, 17px)',
                  color: '#6B6662',
                  marginBottom: '28px',
                  lineHeight: 1.7
                }}
              >
                Receba uma <strong>análise personalizada</strong> para o seu plano de saúde em até <strong>24 horas</strong>.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px', textAlign: 'left' }}
              >
                {[
                  'Sem compromisso',
                  'Atendimento personalizado',
                  'Melhores operadoras do Brasil'
                ].map((item, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #A8877A 0%, #8B7E74 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <span style={{ fontSize: '15px', color: '#6B6662' }}>{item}</span>
                  </div>
                ))}
              </motion.div>

              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={abrirWhatsApp}
                style={{
                  width: '100%',
                  padding: '18px',
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '14px',
                  fontSize: '17px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 12px 32px rgba(37, 211, 102, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  marginBottom: '12px'
                }}
              >
                Quero Minha Análise Personalizada
              </motion.button>

              <button
                onClick={fechar}
                style={{ width: '100%', padding: '12px', background: 'transparent', color: '#9B9289', border: 'none', fontSize: '14px', cursor: 'pointer' }}
              >
                Agora não
              </button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
