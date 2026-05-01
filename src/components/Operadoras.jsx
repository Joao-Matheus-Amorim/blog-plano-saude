import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';

function Operadoras() {
  const operadoras = [
    { nome: 'Bradesco Saúde', destaque: true },
    { nome: 'Porto Seguro', destaque: true },
    { nome: 'SulAmérica', destaque: true },
    { nome: 'Amil', destaque: true },
    { nome: 'Assim Saúde', destaque: false },
    { nome: 'Prevent Senior', destaque: false },
    { nome: 'Unimed', destaque: false }
  ];

  return (
    <>
      <SEO
        title="Operadoras - Bradesco, Unimed, SulAmérica"
        description="Trabalhamos com operadoras de planos de saúde como Bradesco, Unimed, SulAmérica, Amil e outras. Solicite uma pré-análise consultiva."
        keywords="bradesco saúde, unimed rio, sulamerica, amil, operadoras plano saúde, rede credenciada"
        url="https://consultoriadesaude.vercel.app/operadoras"
      />

      <section style={{
        padding: 'clamp(96px, 12vw, 160px) clamp(20px, 7vw, 100px)',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #FFFCF6 0%, #F5F0E6 52%, #FFFFFF 100%)'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(circle at 15% 18%, rgba(143,161,133,0.24), transparent 28rem), radial-gradient(circle at 82% 22%, rgba(194,178,128,0.22), transparent 30rem)'
        }} />

        <span className="water-orb" style={{ width: '92px', height: '92px', right: '9%', top: '18%', opacity: 0.28 }} />
        <span className="water-orb" style={{ width: '68px', height: '68px', left: '12%', bottom: '18%', opacity: 0.22, animationDelay: '2.2s' }} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(56px, 8vw, 92px)',
            position: 'relative',
            zIndex: 1
          }}
        >
          <p style={{
            fontSize: '12px',
            fontWeight: '900',
            color: '#6B7C53',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            marginBottom: 'clamp(18px, 3vw, 26px)'
          }}>
            Curadoria de operadoras
          </p>

          <h2 style={{
            fontSize: 'clamp(44px, 7vw, 78px)',
            fontWeight: '600',
            marginBottom: 'clamp(18px, 3vw, 26px)',
            fontFamily: "'Playfair Display', serif",
            letterSpacing: '-0.055em',
            lineHeight: 0.96,
            color: '#254623'
          }}>
            Operadoras parceiras
          </h2>

          <p style={{
            fontSize: 'clamp(14px, 1.7vw, 17px)',
            color: '#67715F',
            maxWidth: '650px',
            margin: '0 auto',
            lineHeight: 1.85
          }}>
            Selecione uma operadora de interesse ou solicite uma análise sem preferência. A recomendação é feita por atendimento humano.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.12 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 230px), 1fr))',
            gap: 'clamp(18px, 3vw, 30px)',
            maxWidth: '1080px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1
          }}
        >
          {operadoras.map((operadora, index) => (
            <Link
              key={operadora.nome}
              to="/contato"
              state={{ operadora: operadora.nome }}
              style={{ textDecoration: 'none' }}
            >
              <motion.div
                className="float-mirror"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.015 }}
                style={{
                  minHeight: operadora.destaque ? '184px' : '150px',
                  padding: operadora.destaque ? 'clamp(34px, 4vw, 46px)' : 'clamp(28px, 3vw, 36px)',
                  borderRadius: '26px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  animationDelay: `${index * 0.35}s`,
                  transformStyle: 'preserve-3d'
                }}
              >
                {operadora.destaque && (
                  <span style={{
                    position: 'absolute',
                    top: '14px',
                    right: '14px',
                    zIndex: 2,
                    padding: '5px 10px',
                    borderRadius: '999px',
                    background: 'rgba(37,70,35,0.08)',
                    color: '#254623',
                    border: '1px solid rgba(37,70,35,0.14)',
                    fontSize: '9px',
                    fontWeight: 900,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase'
                  }}>
                    Prioridade
                  </span>
                )}

                <div style={{
                  position: 'relative',
                  zIndex: 1,
                  width: operadora.destaque ? '48px' : '40px',
                  height: operadora.destaque ? '48px' : '40px',
                  borderRadius: '50%',
                  marginBottom: '18px',
                  background: 'linear-gradient(145deg, #254623, #6B7C53)',
                  boxShadow: '0 16px 34px rgba(37,70,35,0.22), inset 0 1px 0 rgba(255,255,255,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    background: '#FFFCF6',
                    boxShadow: '0 0 0 6px rgba(255,252,246,0.18)'
                  }} />
                </div>

                <span style={{
                  position: 'relative',
                  zIndex: 1,
                  fontSize: operadora.destaque ? 'clamp(22px, 2.8vw, 29px)' : 'clamp(18px, 2.3vw, 23px)',
                  fontWeight: '600',
                  color: '#254623',
                  lineHeight: 1.12,
                  marginBottom: '16px',
                  fontFamily: "'Playfair Display', serif",
                  letterSpacing: '-0.035em'
                }}>
                  {operadora.nome}
                </span>

                <span style={{
                  position: 'relative',
                  zIndex: 1,
                  fontSize: '11px',
                  color: '#6B7C53',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.11em'
                }}>
                  Solicitar pré-análise
                </span>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.28 }}
          style={{
            textAlign: 'center',
            marginTop: 'clamp(54px, 7vw, 88px)',
            position: 'relative',
            zIndex: 1
          }}
        >
          <p style={{
            fontSize: 'clamp(13px, 1.6vw, 15px)',
            color: '#67715F',
            marginBottom: 'clamp(26px, 4vw, 38px)'
          }}>
            Também avaliamos outras opções conforme cidade, rede desejada e perfil de contratação.
          </p>

          <Link
            to="/contato"
            className="float-mirror"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              color: '#254623',
              padding: '17px 34px',
              fontSize: '12px',
              fontWeight: 900,
              textDecoration: 'none',
              borderRadius: '999px',
              letterSpacing: '0.10em',
              textTransform: 'uppercase'
            }}
          >
            Analisar sem preferência
            <span style={{ color: '#6B7C53', fontSize: '18px', lineHeight: 1 }}>→</span>
          </Link>
        </motion.div>
      </section>
    </>
  );
}

export default Operadoras;
