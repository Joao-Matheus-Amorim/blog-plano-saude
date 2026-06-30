import SEO from '../components/SEO.jsx';
import LeadCaptureForm from '../components/LeadCaptureForm.jsx';
import './PaginaHomeConversao.css';

const configs = {
  mei: {
    title: 'Plano de saúde para MEI no RJ',
    h1: 'Plano de saúde para MEI, sem escolher no escuro.',
    lead: 'Se você tem MEI ou CNPJ pequeno, a pré-análise ajuda a entender caminhos possíveis por cidade, vidas e perfil.',
    type: 'MEI',
    origin: 'pagina-mei',
    intent: 'plano-mei',
    bullets: ['MEI com dependentes', '2 ou mais vidas', 'CNPJ pequeno', 'Comparação com plano individual'],
  },
  familiar: {
    title: 'Plano de saúde familiar no RJ',
    h1: 'Cote plano de saúde para você e sua família.',
    lead: 'Para quem quer avaliar opções para cônjuge, filhos, pais ou dependentes, considerando cidade, rede e quantidade de vidas.',
    type: 'Família',
    origin: 'pagina-familiar',
    intent: 'plano-familiar',
    bullets: ['1 a 5 vidas', 'Dependentes', 'Rede por região', 'Troca de plano atual'],
  },
  empresarial: {
    title: 'Plano de saúde empresarial no RJ',
    h1: 'Plano de saúde para pequena empresa.',
    lead: 'Para empresas que querem benefício de saúde para equipe, sócios ou colaboradores, com orientação por quantidade de vidas.',
    type: 'Empresa / PME',
    origin: 'pagina-empresarial',
    intent: 'plano-empresarial',
    bullets: ['PME', 'Equipe pequena', 'Benefício para funcionários', 'Rede e custo-benefício'],
  },
  individual: {
    title: 'Plano de saúde individual no RJ',
    h1: 'Encontre uma opção individual com orientação.',
    lead: 'Para quem quer contratar sozinho e precisa entender alternativas, rede, coparticipação e próximos passos.',
    type: 'Individual',
    origin: 'pagina-individual',
    intent: 'plano-individual',
    bullets: ['Uma vida', 'Rede desejada', 'Coparticipação', 'Orçamento mensal'],
  },
  idoso: {
    title: 'Plano de saúde para idoso no RJ',
    h1: 'Pré-análise para plano de saúde sênior.',
    lead: 'Para famílias que precisam avaliar alternativas com cuidado, considerando idade, cidade, rede e necessidade de atendimento.',
    type: 'Família',
    origin: 'pagina-idoso',
    intent: 'plano-idoso',
    bullets: ['Rede hospitalar', 'Cidade de atendimento', 'Orçamento', 'Plano atual'],
  },
  gestante: {
    title: 'Plano de saúde para gestante no RJ',
    h1: 'Entenda opções de plano com foco em obstetrícia.',
    lead: 'Para quem quer avaliar cobertura, rede, parto, prazos e alternativas de contratação com orientação.',
    type: 'Família',
    origin: 'pagina-gestante',
    intent: 'plano-gestante',
    bullets: ['Obstetrícia', 'Rede hospitalar', 'Cidade', 'Prazos e contratação'],
  },
  portabilidade: {
    title: 'Portabilidade de plano de saúde no RJ',
    h1: 'Quer trocar de plano? Comece por uma pré-análise.',
    lead: 'Para quem já tem plano e quer avaliar troca por preço, rede, atendimento ou necessidade familiar.',
    type: 'Quero trocar meu plano atual',
    origin: 'pagina-portabilidade',
    intent: 'portabilidade',
    bullets: ['Plano atual', 'Motivo da troca', 'Rede desejada', 'Quantidade de vidas'],
  },
  mage: {
    title: 'Plano de saúde em Magé',
    h1: 'Cote plano de saúde em Magé e região.',
    lead: 'Pré-análise para pessoa física, família, MEI ou empresa em Magé, Piabetá e Baixada Fluminense.',
    type: '',
    city: 'Magé, RJ',
    origin: 'pagina-mage',
    intent: 'plano-mage',
    bullets: ['Magé', 'Piabetá', 'MEI e família', 'Plano empresarial'],
  },
  piabeta: {
    title: 'Plano de saúde em Piabetá',
    h1: 'Cote plano de saúde em Piabetá.',
    lead: 'Pré-análise para moradores, MEIs e empresas de Piabetá e região, com atendimento pelo WhatsApp.',
    type: '',
    city: 'Piabetá, RJ',
    origin: 'pagina-piabeta',
    intent: 'plano-piabeta',
    bullets: ['Piabetá', 'Magé', 'Pessoa física', 'Empresa local'],
  },
};

export default function PaginaPlanoIntencao({ tipo = 'mei' }) {
  const config = configs[tipo] || configs.mei;

  return (
    <>
      <SEO
        title={config.title}
        description={`${config.lead} Receba uma pré-análise gratuita por WhatsApp.`}
        keywords={`${config.title}, cotação plano de saúde, plano de saúde RJ, Maisa Valentim`}
        url={`https://maisavalentim.com.br/${tipo}`}
      />

      <main className="home-conversion">
        <section className="home-conversion__hero" id="cotacao">
          <div className="home-conversion__copy">
            <span className="home-conversion__kicker">cotação por perfil</span>
            <h1>{config.h1}</h1>
            <p className="home-conversion__lead">{config.lead}</p>

            <div className="home-conversion__trust">
              {config.bullets.map((bullet) => <span key={bullet}>{bullet}</span>)}
            </div>
          </div>

          <div className="home-conversion__form">
            <LeadCaptureForm
              title="Receba uma pré-análise"
              subtitle="Informe nome, WhatsApp e o contexto. A conversa continua pelo WhatsApp."
              cta="Quero cotar meu caso"
              origin={config.origin}
              intent={config.intent}
              pageTitle={config.title}
              defaultType={config.type}
              defaultCity={config.city || ''}
              whatsappIntro={`Olá Maisa! Vim pela página ${config.title} e quero uma cotação.`}
            />
          </div>
        </section>
      </main>
    </>
  );
}
