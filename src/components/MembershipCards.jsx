import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const cards = [
  {
    tier: 'Essencial',
    label: 'Plano',
    chip: 'Base',
    price: 'sob medida',
    features: ['Consultas', 'Exames', 'Urgência'],
    className: 'membership-card-essential'
  },
  {
    tier: 'Família',
    label: 'Curadoria',
    chip: 'Mais buscado',
    price: 'comparado',
    features: ['Rede ampla', 'Internação', 'Obstetrícia'],
    className: 'membership-card-family'
  },
  {
    tier: 'Premium',
    label: 'Membro',
    chip: 'Elite',
    price: 'exclusivo',
    features: ['Hospitais top', 'Executivo', 'Suporte humano'],
    className: 'membership-card-premium'
  }
];

export default function MembershipCards() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 130, damping: 18, mass: 0.5 });
  const smoothY = useSpring(mouseY, { stiffness: 130, damping: 18, mass: 0.5 });
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [9, -9]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5);
    mouseY.set((event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5);
  };

  const reset = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      className="membership-card-stage"
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY }}
    >
      <div className="membership-card-shadow" />
      {cards.map((card, index) => (
        <motion.article
          key={card.tier}
          className={`membership-card ${card.className}`}
          initial={{ opacity: 0, y: 34, rotateX: 12 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.76, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: index === 2 ? -12 : -6 }}
        >
          <div className="membership-card-noise" />
          <div className="membership-card-topline" />
          <div className="membership-card-head">
            <div>
              <span>{card.label}</span>
              <strong>{card.tier}</strong>
            </div>
            <em>{card.chip}</em>
          </div>
          <div className="membership-card-price">{card.price}</div>
          <div className="membership-card-features">
            {card.features.map((feature) => <span key={feature}>{feature}</span>)}
          </div>
          <div className="membership-card-footer">
            <small>Maisa Valentim</small>
            <small>Saúde consultiva</small>
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
}
