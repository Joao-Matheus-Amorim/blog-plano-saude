import SEO from '../components/SEO.jsx';
import LeadCaptureForm from '../components/LeadCaptureForm.jsx';
import './PaginaHomeConversao.css';

const moneyPages = [
  { label: 'MEI', title: 'Plano para MEI', text: 'Para quem tem CNPJ pequeno e quer entender opções de contratação.', href: '/planos/mei' },
  { label: 'Família', title: 'Plano familiar', text: 'Para cotar você, cônjuge, filhos, pais ou dependentes.', href: '/planos/familiar' },
  { label: 'Empresa', title: 'Plano empresarial', text: 'Para pequenas empresas que querem benefício de saúde para equipe.', href: '/planos/empresarial' },
  { label: 'Troca', title: 'Portabilidade', text: 'Para quem já tem plano e quer avaliar troca, rede, preço ou carência.', href: '/planos/portabilidade' },
];

const intentPages = [
  { label: 'Individual', title: 'Plano individual', text: 'Para quem quer contratar sozinho e precisa comparar rede, preço e perfil.', href: '/planos/individual' },
  { label: '59+', title: 'Plano para pessoa 59+', text: 'Para famílias que querem avaliar alternativas com mais cuidado.', href: '/planos/idoso' },
  { label: 'Gestante', title: 'Plano para gestante', text: 'Para dúvidas sobre obstetrícia, rede, prazos e contratação.', href: '/planos/gestante' },
  { label: 'Magé', title: 'Plano de saúde em Magé', text: 'Entrada local para Magé, Piabetá e Baixada Fluminense.', href: '/plano-saude-mage' },
  { label: 'Piabetá', title: 'Plano de saúde em Piabetá', text: 'Entrada local para moradores, MEIs e empresas da região.', href: '/plano-saude-piabeta' },
];

export default function PaginaHomeConversao() {
  return (
    <>
      <SEO
        title="Cotação de Plano de Saúde no RJ"
        description="Compare plano de saúde individual, familiar, MEI ou empresarial com pré-análise gratuita por WhatsApp."
        keywords="cotação plano de saúde RJ, plano de saúde MEI, plano familiar, plano empresarial, plano de saúde Magé, plano de saúde Piabetá"
        url="https://www.planosdesaudemaisavalentim.com.br/"
      />

      <main className="home-conversion">
        <section className="home-conversion__hero" id="cotacao">
          <div className="home-conversion__copy">
            <span className="home-conversion__kicker">planos de saúde · cotação gratuita</span>
            <h1>Compare seu plano de saúde em poucos minutos.</h1>
            <p className="home-conversion__lead">
              Individual, família, MEI ou empresa. Envie nome e WhatsApp para receber uma pré-análise clara e sem custo.
            </p>
            <div className="home-conversion__actions">
              <a className="home-conversion__button" href="#formulario">Quero cotar agora</a>
              <a className="home-conversion__link" href="/planos/mei">Tenho MEI/CNPJ</a>
            </div>
            <div className="home-conversion__trust">
              <span>Nome + WhatsApp bastam</span>
              <span>Individual, MEI e empresa</span>
              <span>Atendimento pelo WhatsApp</span>
            </div>
          </div>

          <div className="home-conversion__form" id="formulario">
            <LeadCaptureForm
              compact
              title="Receba sua pré-análise"
              subtitle="Preencha o essencial. A Maisa chama no WhatsApp para entender seu caso."
              cta="Quero minha cotação"
              origin="home-cotacao"
              intent="cotacao-principal"
              pageTitle="Home de cotação"
              whatsappIntro="Olá Maisa! Vim pelo site e quero uma cotação de plano de saúde."
            />
          </div>
        </section>

        <section className="home-conversion__section" aria-labelledby="portas-principais">
          <h2 id="portas-principais">Entre pela porta certa.</h2>
          <p>Quem procura plano de saúde tem necessidades diferentes. Por isso o site separa o caminho por perfil.</p>
          <div className="home-conversion__cards">
            {moneyPages.map((page) => (
              <a className="home-conversion__card" href={page.href} key={page.href}>
                <b>{page.label}</b>
                <h3>{page.title}</h3>
                <p>{page.text}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="home-conversion__section" aria-labelledby="buscas-especificas">
          <h2 id="buscas-especificas">Buscas específicas também têm caminho.</h2>
          <p>Estas páginas ajudam quem chegou pesquisando por perfil, idade, gestação ou cidade. Elas também criam ligação interna para o SEO local.</p>
          <div className="home-conversion__cards">
            {intentPages.map((page) => (
              <a className="home-conversion__card" href={page.href} key={page.href}>
                <b>{page.label}</b>
                <h3>{page.title}</h3>
                <p>{page.text}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="home-conversion__section home-conversion__split">
          <div>
            <h2>Dúvidas que viram cotação.</h2>
            <p>O site trabalha como funil: cada página responde uma intenção específica e leva para uma conversa no WhatsApp.</p>
            <div className="home-conversion__faq">
              <article><h3>A cotação tem custo?</h3><p>Não. A pré-análise é gratuita.</p></article>
              <article><h3>Preciso informar documento agora?</h3><p>Não no primeiro contato. Nome e WhatsApp bastam.</p></article>
              <article><h3>Atende só empresa?</h3><p>Não. O atendimento cobre pessoa física, família, MEI, empresa e troca de plano atual.</p></article>
            </div>
          </div>

          <LeadCaptureForm
            title="Quer cotar agora?"
            subtitle="Informe seu perfil e detalhe o que importa: cidade, vidas, hospital, MEI, família ou empresa."
            cta="Enviar para análise"
            origin="home-final"
            intent="cotacao-final-home"
            pageTitle="Home final de cotação"
          />
        </section>
      </main>
    </>
  );
}
