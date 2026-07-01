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
    path: '/planos/mei',
    formTitle: 'Quero cotação para MEI',
    formSubtitle: 'Informe WhatsApp, cidade e quantidade de vidas. Se já tiver CNPJ ativo, escreva no campo de detalhes.',
    bullets: ['MEI com dependentes', '2 ou mais vidas', 'CNPJ pequeno', 'Comparação com plano individual'],
    seoBlocks: [
      ['O que observar no plano MEI', 'Veja quantidade de vidas, cidade de atendimento, rede desejada, carências e se faz sentido comparar contrato MEI com alternativa individual ou familiar.'],
      ['Quando pedir cotação', 'A cotação costuma fazer mais sentido quando você já sabe quem vai entrar no plano, cidade principal de uso e se existe hospital ou laboratório preferido.'],
    ],
  },
  familiar: {
    title: 'Plano de saúde familiar no RJ',
    h1: 'Cote plano de saúde para você e sua família.',
    lead: 'Para quem quer avaliar opções para cônjuge, filhos, pais ou dependentes, considerando cidade, rede e quantidade de vidas.',
    type: 'Família',
    origin: 'pagina-familiar',
    intent: 'plano-familiar',
    path: '/planos/familiar',
    formTitle: 'Quero cotação familiar',
    formSubtitle: 'Informe cidade, WhatsApp e quantas pessoas vão entrar no plano. Use os detalhes para citar bairro, hospital ou idade.',
    bullets: ['1 a 5 vidas', 'Dependentes', 'Rede por região', 'Troca de plano atual'],
    seoBlocks: [
      ['O que observar no plano familiar', 'Compare rede por região, idade dos dependentes, possibilidade de inclusão de pais ou filhos e diferença entre preço inicial e custo por perfil.'],
      ['Como acelerar a cotação', 'Informe cidade, quantidade de vidas, idade aproximada e se existe plano atual. Isso evita conversa solta e ajuda a pré-análise.'],
    ],
  },
  empresarial: {
    title: 'Plano de saúde empresarial no RJ',
    h1: 'Plano de saúde para pequena empresa.',
    lead: 'Para empresas que querem benefício de saúde para equipe, sócios ou colaboradores, com orientação por quantidade de vidas.',
    type: 'Empresa / PME',
    origin: 'pagina-empresarial',
    intent: 'plano-empresarial',
    path: '/planos/empresarial',
    formTitle: 'Quero cotação empresarial',
    formSubtitle: 'Informe a cidade e uma estimativa de vidas. Se for para sócios, equipe ou dependentes, coloque nos detalhes.',
    bullets: ['PME', 'Equipe pequena', 'Benefício para funcionários', 'Rede e custo-benefício'],
    seoBlocks: [
      ['O que observar no plano empresarial', 'Quantidade de vidas, composição da equipe, inclusão de dependentes, região de atendimento e tipo de rede mudam bastante a análise.'],
      ['Para pequena empresa', 'Mesmo empresas enxutas podem comparar alternativas. O ponto é entender se o perfil encaixa melhor em PME, MEI ou outra estrutura.'],
    ],
  },
  individual: {
    title: 'Plano de saúde individual no RJ',
    h1: 'Plano de saúde individual com orientação antes da cotação.',
    lead: 'Para quem quer contratar sozinho e precisa entender alternativas, rede, coparticipação e próximos passos sem preencher dez formulários diferentes.',
    type: 'Individual',
    origin: 'pagina-individual',
    intent: 'plano-individual',
    path: '/planos/individual',
    formTitle: 'Quero cotação individual',
    formSubtitle: 'Informe WhatsApp, cidade e idade aproximada nos detalhes. Isso ajuda a orientar a conversa inicial.',
    bullets: ['Uma vida', 'Rede desejada', 'Coparticipação', 'Orçamento mensal'],
    seoBlocks: [
      ['O que observar no plano individual', 'Rede, cidade de uso, coparticipação, carência e orçamento mensal precisam ser olhados juntos. Preço sozinho engana.'],
      ['Pré-análise individual', 'A conversa começa pelo básico: cidade, idade aproximada, preferência de rede e se existe algum plano atual para comparar.'],
    ],
  },
  idoso: {
    title: 'Plano de saúde para idoso no RJ',
    h1: 'Plano de saúde para pessoa 59+ com pré-análise cuidadosa.',
    lead: 'Para famílias que precisam avaliar alternativas considerando idade, cidade, rede desejada, plano atual e orçamento possível.',
    type: 'Individual',
    origin: 'pagina-idoso',
    intent: 'plano-idoso',
    path: '/planos/idoso',
    formTitle: 'Quero cotação para pessoa 59+',
    formSubtitle: 'Informe cidade, WhatsApp e idade da pessoa que vai entrar no plano. Se já existe plano atual, cite nos detalhes.',
    bullets: ['Idade e perfil', 'Rede hospitalar', 'Cidade de atendimento', 'Plano atual'],
    seoBlocks: [
      ['O que observar para pessoa 59+', 'Rede hospitalar, cidade de atendimento, plano atual, uso frequente e orçamento precisam ser avaliados com cuidado.'],
      ['Por que informar o plano atual', 'Quando já existe plano, dá para entender melhor o motivo da troca: preço, rede, atendimento ou necessidade familiar.'],
    ],
  },
  gestante: {
    title: 'Plano de saúde para gestante no RJ',
    h1: 'Orientação para plano de saúde com foco em obstetrícia.',
    lead: 'Para quem quer entender opções de contratação, rede, obstetrícia, prazos e próximos passos com atendimento pelo WhatsApp.',
    type: 'Família',
    origin: 'pagina-gestante',
    intent: 'plano-gestante',
    path: '/planos/gestante',
    formTitle: 'Quero orientação para gestante',
    formSubtitle: 'Informe cidade e WhatsApp. Nos detalhes, diga se já está gestante, se está planejando ou se quer rede específica.',
    bullets: ['Obstetrícia', 'Rede hospitalar', 'Cidade', 'Prazos e contratação'],
    seoBlocks: [
      ['O que observar para gestante', 'Rede obstétrica, cidade, hospital desejado, prazos e momento da contratação precisam ser analisados antes da decisão.'],
      ['Como pedir orientação', 'Informe se já está gestante ou se está planejando. Esse contexto muda a conversa e evita expectativa errada.'],
    ],
  },
  portabilidade: {
    title: 'Portabilidade de plano de saúde no RJ',
    h1: 'Quer trocar de plano? Comece por uma pré-análise.',
    lead: 'Para quem já tem plano e quer avaliar troca por preço, rede, atendimento ou necessidade familiar.',
    type: 'Quero trocar meu plano atual',
    origin: 'pagina-portabilidade',
    intent: 'portabilidade',
    path: '/planos/portabilidade',
    formTitle: 'Quero avaliar troca de plano',
    formSubtitle: 'Informe seu plano atual, cidade e motivo da troca. A cotação continua pelo WhatsApp.',
    bullets: ['Plano atual', 'Motivo da troca', 'Rede desejada', 'Quantidade de vidas'],
    seoBlocks: [
      ['O que observar na troca de plano', 'Motivo da troca, plano atual, tempo de contrato, rede desejada e quantidade de vidas ajudam a orientar a pré-análise.'],
      ['Quando vale comparar', 'Preço é importante, mas rede, atendimento e necessidade familiar costumam explicar melhor se a troca faz sentido.'],
    ],
  },
  mage: {
    title: 'Plano de saúde em Magé',
    h1: 'Cote plano de saúde em Magé e região.',
    lead: 'Pré-análise para pessoa física, família, MEI ou empresa em Magé, Piabetá e Baixada Fluminense.',
    type: '',
    city: 'Magé, RJ',
    origin: 'pagina-mage',
    intent: 'plano-mage',
    path: '/plano-saude-mage',
    formTitle: 'Quero cotação em Magé',
    formSubtitle: 'A cidade já vem preenchida. Escolha o tipo de plano e informe WhatsApp para continuar a conversa.',
    bullets: ['Magé', 'Piabetá', 'MEI e família', 'Plano empresarial'],
    seoBlocks: [
      ['Plano de saúde em Magé', 'Para Magé, vale informar bairro, cidade de uso, tipo de contratação e se a busca é para pessoa física, família, MEI ou empresa.'],
      ['Atendimento na região', 'A pré-análise considera Magé, Piabetá e região, sempre levando em conta rede desejada e perfil de uso.'],
    ],
  },
  piabeta: {
    title: 'Plano de saúde em Piabetá',
    h1: 'Cote plano de saúde em Piabetá.',
    lead: 'Pré-análise para moradores, MEIs e empresas de Piabetá e região, com atendimento pelo WhatsApp.',
    type: '',
    city: 'Piabetá, RJ',
    origin: 'pagina-piabeta',
    intent: 'plano-piabeta',
    path: '/plano-saude-piabeta',
    formTitle: 'Quero cotação em Piabetá',
    formSubtitle: 'A cidade já vem preenchida. Informe tipo de plano, vidas e algum detalhe de rede ou bairro se tiver.',
    bullets: ['Piabetá', 'Magé', 'Pessoa física', 'Empresa local'],
    seoBlocks: [
      ['Plano de saúde em Piabetá', 'Para Piabetá, informe se a cotação é individual, familiar, MEI ou empresarial e qual região de atendimento é mais importante.'],
      ['Cotação local com contexto', 'Cidade, bairro, quantidade de vidas e rede desejada ajudam a transformar uma busca genérica em conversa objetiva.'],
    ],
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
        url={`https://consultoriadesaude.vercel.app${config.path}`}
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
              title={config.formTitle || 'Receba uma pré-análise'}
              subtitle={config.formSubtitle || 'Informe nome, WhatsApp e o contexto. A conversa continua pelo WhatsApp.'}
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

        <section className="home-conversion__section" aria-labelledby="conteudo-seo-intencao">
          <div className="home-conversion__section-head">
            <span className="home-conversion__kicker">orientação rápida</span>
            <h2 id="conteudo-seo-intencao">Antes de pedir cotação</h2>
            <p>Estas páginas ajudam a separar curiosidade de intenção real. Quanto mais contexto a pessoa informa, mais objetivo fica o atendimento.</p>
          </div>
          <div className="home-conversion__cards">
            {config.seoBlocks.map(([title, text]) => (
              <article className="home-conversion__card" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
