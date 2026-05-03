import { useEffect } from 'react';
import PaginaLandingMasterpiece from './PaginaLandingMasterpiece.jsx';

export default function PaginaLandingLeadOptimized() {
  useEffect(() => {
    const optionalCity = () => {
      const cityInput = document.querySelector('.mv-lead-form input[placeholder="Rio de Janeiro, RJ"]');
      cityInput?.removeAttribute('required');

      const formText = document.querySelector('.mv-lead-form > p');
      if (formText) {
        formText.textContent = 'Preencha nome e WhatsApp. Os outros dados são opcionais, mas ajudam a Maisa a te responder com uma cotação mais precisa.';
      }

      const leadCopyText = document.querySelector('.mv-lead-copy > p');
      if (leadCopyText) {
        leadCopyText.textContent = 'O formulário foi otimizado para conversão: obrigatório somente nome e WhatsApp. Cidade, tipo de plano, vidas, prioridade e observação são opcionais para qualificar melhor o atendimento.';
      }

      const requiredLabels = document.querySelectorAll('.mv-lead-form label');
      requiredLabels.forEach((label) => {
        const text = label.childNodes[0]?.textContent?.trim();
        if (text === 'Nome completo' || text === 'WhatsApp') {
          label.classList.add('mv-required-field');
        } else {
          label.classList.add('mv-optional-field');
        }
      });
    };

    optionalCity();
    const timer = setTimeout(optionalCity, 250);
    return () => clearTimeout(timer);
  }, []);

  return <PaginaLandingMasterpiece />;
}
