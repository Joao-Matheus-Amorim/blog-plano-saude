import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.98,
    y: 20,
    rotateX: -2,
    filter: 'blur(10px)',
  },
  enter: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1], // Curva de animação ultra suave
      staggerChildren: 0.1,
    }
  },
  exit: {
    opacity: 0,
    scale: 1.02,
    y: -20,
    rotateX: 2,
    filter: 'blur(10px)',
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    }
  }
};

export default function PageTransition({ children }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageVariants}
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
          willChange: 'transform, opacity',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
