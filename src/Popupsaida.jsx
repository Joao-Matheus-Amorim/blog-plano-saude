import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function PopUp() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleMouseLeave = () => {
      // Mostra o pop-up apenas uma vez por sessão
      if (!sessionStorage.getItem('popupShown')) {
        setShow(true);
        sessionStorage.setItem('popupShown', 'true');
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  if (!show) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white p-6 rounded-lg max-w-sm text-center">
        <h3 className="text-lg font-bold mb-2">Não Vá Embora!</h3>
        <p className="mb-4">Deixe-nos encontrar o plano perfeito para você. Receba uma cotação gratuita em até 24h.</p>
        <button 
          onClick={() => window.open('https://wa.me/5521977472141?text=Olá! Gostaria de uma cotação gratuita.', '_blank')} 
          className="bg-green-500 text-white p-2 rounded w-full"
        >
          Receber Cotação Gratuita
        </button>
        <button onClick={() => setShow(false)} className="mt-2 text-sm text-gray-500">
          Agora não
        </button>
      </div>
    </motion.div>
  );
}
