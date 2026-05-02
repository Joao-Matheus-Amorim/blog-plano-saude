import { motion } from 'framer-motion';
import MembershipCards from './MembershipCards.jsx';

const tiers = [
  {
    name: 'Essencial',
    badge: 'Entrada segura',
    description: 'Para quem quer sair da dúvida e entender as opções corretas sem comparação rasa de preço.',
    features: ['Consultas e exames', 'Urgência e emergência', 'Rede adequada ao perfil', 'Orientação antes da escolha']
  },
  {
    name: 'Família',
    badge: 'Mais consultivo',
    description: 'Para proteger mais de uma vida com equilíbrio entre rede, carência, reembolso e previsibilidade.',
    features: ['Análise por cidade', 'Comparação de operadoras', 'Atenção a carências', 'Suporte no WhatsApp'],
    featured: true
  },
  {
    name: 'Premium',
    badge: 'Rede superior',
    description: 'Para quem prioriza hospitais de referência, conforto, atendimento executivo e menor atrito.',
    features: ['Hospitais premium', 'Quarto privativo quando aplicável', 'Curadoria de rede', 'Acompanhamento humano']
  }
];

const trustPoints = [
  ['01', 'Perfil primeiro', 'Cidade, idade, quantidade de vidas e prioridade real antes da indicação.'],
  ['02', 'Rede como benefício', 'A escolha considera hospitais, laboratórios, rotina e expectativa de atendimento.'],
  ['03', 'Preço com contexto', 'Valor só faz sentido depois de entender cobertura, carência e uso provável.'],
  ['04', 'Suporte depois', 'A consultoria continua como ponto humano de orientação após a contratação.']
];

export default function MembershipExperience() {
  return (
    <section id="membership-experience" className="membership-experience-section">
      <div className="membership-section-head">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.62 }}
        >
          <span className="membership-section-eyebrow">Experiência de membro</span>
          <h2>Não é uma tabela de preço. É um acesso premium à saúde certa.</h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.62, delay: 0.1 }}
        >
          A página posiciona cada plano como um objeto de valor: menos ansiedade, mais clareza, mais confiança para iniciar uma conversa qualificada.
        </motion.p>
      </div>

      <div className="membership-experience-grid">
        <motion.div
          className="membership-showcase-card"
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <MembershipCards />
        </motion.div>

        <div className="membership-tiers">
          {tiers.map((tier, index) => (
            <motion.article
              key={tier.name}
              className={`membership-tier-card${tier.featured ? ' is-featured' : ''}`}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.58, delay: index * 0.08 }}
            >
              {tier.featured && <div className="membership-tier-ribbon">Mais procurado</div>}
              <div className="membership-tier-top">
                <div>
                  <span>{tier.badge}</span>
                  <strong>{tier.name}</strong>
                </div>
                <em>MV</em>
              </div>
              <p>{tier.description}</p>
              <div className="membership-feature-list">
                {tier.features.map((feature) => <span key={feature}>{feature}</span>)}
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="membership-trust-strip">
        {trustPoints.map(([number, title, text], index) => (
          <motion.article
            key={title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.52, delay: index * 0.06 }}
          >
            <span>{number}</span>
            <strong>{title}</strong>
            <p>{text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
