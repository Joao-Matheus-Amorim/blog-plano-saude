import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

// 🌊 CURVA DE ANIMAÇÃO ULTRA SUAVE (SPRING PHYSICS)
const spring = {
  type: "spring",
  damping: 40,
  stiffness: 120,
  mass: 0.8,
};

// 🎬 VARIANTES DE ANIMAÇÃO EXTREMAMENTE FLUIDAS
const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.96,
    y: 30,
    rotateX: -3,
    filter: 'blur(12px) brightness(0.95)',
  },
  enter: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px) brightness(1)',
    transition: {
      duration: 1.2,
      ease: [0.19, 1, 0.22, 1], // Easing EXTREMAMENTE suave (Expo Out)
      opacity: { duration: 1, ease: [0.19, 1, 0.22, 1] },
      scale: { duration: 1.2, ease: [0.19, 1, 0.22, 1] },
      y: { ...spring, duration: 1.2 },
      rotateX: { duration: 1.2, ease: [0.19, 1, 0.22, 1] },
      filter: { duration: 1, ease: [0.19, 1, 0.22, 1] },
    }
  },
  exit: {
    opacity: 0,
    scale: 1.03,
    y: -30,
    rotateX: 3,
    filter: 'blur(12px) brightness(1.05)',
    transition: {
      duration: 0.8,
      ease: [0.19, 1, 0.22, 1],
      opacity: { duration: 0.6, ease: [0.19, 1, 0.22, 1] },
      scale: { duration: 0.8, ease: [0.19, 1, 0.22, 1] },
      y: { duration: 0.8, ease: [0.19, 1, 0.22, 1] },
      rotateX: { duration: 0.8, ease: [0.19, 1, 0.22, 1] },
      filter: { duration: 0.6, ease: [0.19, 1, 0.22, 1] },
    }
  }
};

export default function PageTransition({ children }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageVariants}
        style={{
          perspective: '2000px',
          transformStyle: 'preserve-3d',
          willChange: 'transform, opacity, filter',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
