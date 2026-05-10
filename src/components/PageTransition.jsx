import { motion } from 'framer-motion';

const spring = {
  type: 'spring',
  damping: 40,
  stiffness: 120,
  mass: 0.8,
};

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.98,
    y: 18,
    filter: 'blur(8px) brightness(0.98)',
  },
  enter: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px) brightness(1)',
    transition: {
      duration: 0.55,
      ease: [0.19, 1, 0.22, 1],
      opacity: { duration: 0.42, ease: [0.19, 1, 0.22, 1] },
      scale: { duration: 0.55, ease: [0.19, 1, 0.22, 1] },
      y: { ...spring, duration: 0.55 },
      filter: { duration: 0.42, ease: [0.19, 1, 0.22, 1] },
    }
  },
  exit: {
    opacity: 0,
    scale: 1.01,
    y: -16,
    filter: 'blur(8px) brightness(1.02)',
    transition: {
      duration: 0.28,
      ease: [0.19, 1, 0.22, 1],
    }
  }
};

export default function PageTransition({ children }) {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
      style={{
        width: '100%',
        minHeight: '100%',
        willChange: 'transform, opacity, filter',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
    >
      {children}
    </motion.div>
  );
}
