import { useMemo, useState } from 'react';

const baseUrl = 'https://www.planosdesaudemaisavalentim.com.br';
const whatsapp = 'https://wa.me/5521977472141?text=Ol%C3%A1%20Maisa%2C%20vim%20pelo%20link%20org%C3%A2nico%20e%20quero%20uma%20cota%C3%A7%C3%A3o.';

const organicLinks = [
  {
    title: 'Cotação rápida pelo WhatsApp',
    description: 'Entrada direta para quem quer falar agora.',
    href: whatsapp,
    tag: 'whatsapp_direto',
  },
  {
    title: 'Plano para MEI',
    description: 'Para autônomos, pequenos negócios e CNPJ ativo.',
    href: '/planos/mei?origem=links_organicos',
    tag: 'mei',
  },
  {
    title: 'Plano familiar',
    description: 'Para casal, filhos, mãe, pai ou família inteira.',
    href: '/planos/familiar?origem=links_organicos',
    tag: 'familiar',
  },
  {
    title: 'Plano empresarial',
    description: 'Para empresas, equipes pequenas e PME.',
    href: '/planos/empresarial?origem=links_organicos',
    tag: 'empresarial',
  },
  {
    title: 'Trocar de plano',
    description: 'Para quem quer avaliar portabilidade ou alternativa melhor.',
    href: '/planos/portabilidade?origem=links_organicos',
    tag: 'portabilidade',
  },
  {
    title: 'Plano individual',
    description: 'Para quem vai contratar sozinho e quer orientação inicial.',
    href: '/planos/individual?origem=links_organicos',
    tag: 'individual',
  },
  {
    title: 'Plano para pessoa 59+',
    description: 'Para família pesquisando opções com mais cuidado.',
    href: '/planos/idoso?origem=links_organicos',
    tag: 'idoso',
  },
  {
    title: 'Plano para gestante',
    description: 'Para dúvidas sobre obstetrícia, rede e próximos passos.',
    href: '/planos/gestante?origem=links_organicos',
    tag: 'gestante',
  },
  {
    title: 'Plano de saúde em Magé',
    description: 'Entrada local para Magé, Piabetá e região.',
    href: '/plano-saude-mage?origem=links_organicos',
    tag: 'mage',
  },
  {
    title: 'Plano de saúde em Piabetá',
    description: 'Entrada local para moradores, MEIs e empresas de Piabetá.',
    href: '/plano-saude-piabeta?origem=links_organicos',
    tag: 'piabeta',
  },
];

const channelKits = [
  {
    channel: 'WhatsApp Status',
    origin: 'whatsapp_status',
    intro: 'Poste como status com um link direto para uma intenção específica.',
    messages: [
      { text: 'Você é MEI e quer comparar plano de saúde sem compromisso? Fiz uma página rápida para cotação gratuita.', path: '/planos/mei' },
      { text: 'Plano familiar mudou muito de preço. Quem quiser comparar opções pode me chamar por aqui.', path: '/planos/familiar' },
      { text: 'Hoje vou separar um horário para simular planos empresariais para pequenos negócios.', path: '/planos/empresarial' },
    ],
  },
  {
    channel: 'Instagram Bio',
    origin: 'instagram_bio',
    intro: 'Use como central de links da bio e dos stories.',
    messages: [
      { text: 'Cotação gratuita de plano de saúde para MEI, família e empresas.', path: '/links' },
      { text: 'Compare opções antes de contratar. Atendimento pelo WhatsApp.', path: '/links' },
      { text: 'Planos de saúde com orientação humana, sem enrolação e sem custo para cotar.', path: '/links' },
    ],
  },
  {
    channel: 'Google Perfil da Empresa',
    origin: 'google_perfil_empresa',
    intro: 'Use em publicações semanais no perfil local.',
    messages: [
      { text: 'Está pesquisando plano de saúde em Magé, Piabetá ou região? Faça uma cotação gratuita com orientação individual.', path: '/plano-saude-mage' },
      { text: 'MEI também pode comparar plano de saúde com análise gratuita. Veja as opções e fale pelo WhatsApp.', path: '/planos/mei' },
      { text: 'Antes de contratar um plano de saúde, compare rede, carência, preço e perfil de uso.', path: '/links' },
    ],
  },
  {
    channel: 'Grupos locais',
    origin: 'grupo_facebook_mage',
    intro: 'Use com postagem útil, sem cara de disparo em massa.',
    messages: [
      { text: 'Pessoal, deixei uma página simples para quem quer entender opções de plano de saúde para MEI, família ou empresa em Magé e região.', path: '/plano-saude-mage' },
      { text: 'Quem estiver pesquisando plano de saúde pode comparar antes de contratar. A cotação é gratuita e o atendimento é pelo WhatsApp.', path: '/links' },
      { text: 'Muita gente olha só preço e esquece rede, carência e tipo de contrato. Fiz uma página para começar a cotação com mais clareza.', path: '/links' },
    ],
  },
  {
    channel: 'Radarplan B2B',
    origin: 'radar_b2b',
    intro: 'Use em abordagem manual para empresas públicas e legítimas.',
    messages: [
      { text: 'Vi que vocês têm uma operação local e talvez faça sentido comparar plano empresarial. Posso fazer uma simulação sem custo?', path: '/planos/empresarial' },
      { text: 'Empresas pequenas às vezes pagam caro por falta de comparação. Posso avaliar opções de plano de saúde para a equipe.', path: '/planos/empresarial' },
      { text: 'Faço cotação gratuita de plano empresarial com análise de vidas, região e perfil da equipe.', path: '/planos/empresarial' },
    ],
  },
];

function withOrigin(path, origin) {
  if (path.startsWith('http')) return path;
  const [pathname] = path.split('?');
  return `${baseUrl}${pathname}?origem=${origin}`;
}

function copyText(text, setCopied, label) {
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(() => setCopied(label)).catch(() => setCopied(label));
    return;
  }

  setCopied(label);
}

export default function PaginaLinksOrganicos() {
  const [copied, setCopied] = useState('');
  const bioUrl = `${baseUrl}/links?origem=instagram_bio`;

  const quickLinks = useMemo(() => channelKits.flatMap((kit) => organicLinks
    .filter((link) => !link.href.startsWith('http'))
    .map((link) => ({
      label: `${kit.channel} - ${link.title}`,
      url: withOrigin(link.href, kit.origin),
    }))), []);

  return (
    <main className="organic-links-page">
      <style>{`
        .organic-links-page { --bg0: #060905; --bg1: #0f1a0c; --g0: #2d4a24; --g1: #6b8c52; --g2: #a8c48a; --text: #f1faea; --muted: rgba(241,250,234,.66); min-height: 100vh; color: var(--text); background: radial-gradient(circle at 12% 10%, rgba(168,196,138,.16), transparent 34rem), radial-gradient(circle at 88% 18%, rgba(107,140,82,.22), transparent 30rem), linear-gradient(180deg, var(--bg0), var(--bg1)); padding: clamp(112px, 12vw, 150px) clamp(18px, 5vw, 64px) 72px; }
        .links-shell { max-width: 1180px; margin: 0 auto; }
        .links-hero { display: grid; grid-template-columns: 1.1fr .9fr; gap: 28px; align-items: stretch; margin-bottom: 28px; }
        .links-card, .links-panel { border: 1px solid rgba(168,196,138,.24); background: linear-gradient(160deg, rgba(45,74,36,.34), rgba(7,13,5,.78)); box-shadow: 0 28px 90px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.08); border-radius: 34px; }
        .links-card { padding: clamp(28px, 5vw, 54px); }
        .links-eyebrow { display: inline-flex; min-height: 32px; align-items: center; padding: 0 13px; border-radius: 999px; color: var(--g2); background: rgba(168,196,138,.10); border: 1px solid rgba(168,196,138,.24); font-size: 11px; font-weight: 900; letter-spacing: .13em; text-transform: uppercase; }
        .links-title { font-family: 'Playfair Display', serif; font-size: clamp(44px, 7vw, 86px); line-height: .9; letter-spacing: -.06em; margin: 22px 0 18px; }
        .links-title em { color: var(--g2); font-style: italic; font-weight: 500; }
        .links-sub { color: var(--muted); line-height: 1.7; font-size: 16px; max-width: 760px; }
        .links-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 26px; }
        .links-button, .copy-button { min-height: 44px; display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; border: 1px solid rgba(168,196,138,.32); color: #f5fbef; background: linear-gradient(135deg, var(--g1), var(--g0)); padding: 0 18px; text-decoration: none; font-size: 12px; font-weight: 900; letter-spacing: .07em; text-transform: uppercase; cursor: pointer; }
        .links-button.secondary, .copy-button { background: rgba(5,8,5,.38); }
        .links-phone { padding: 26px; display: flex; flex-direction: column; justify-content: space-between; min-height: 300px; }
        .links-phone h2 { margin: 0 0 10px; font-size: 24px; }
        .links-phone p, .links-panel p { color: var(--muted); line-height: 1.65; }
        .links-list { display: grid; gap: 14px; }
        .links-item { display: grid; grid-template-columns: 1fr auto; gap: 16px; align-items: center; padding: 18px; border-radius: 24px; background: rgba(255,255,255,.045); border: 1px solid rgba(168,196,138,.16); }
        .links-item strong { display: block; color: #fff; margin-bottom: 5px; }
        .links-item small { color: var(--muted); line-height: 1.5; }
        .links-section-title { font-size: clamp(26px, 4vw, 42px); margin: 42px 0 16px; letter-spacing: -.035em; }
        .links-panel { padding: 24px; margin-bottom: 18px; }
        .kit-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
        .kit-head { display: flex; justify-content: space-between; gap: 14px; align-items: start; margin-bottom: 16px; }
        .kit-origin { color: var(--g2); font-size: 12px; font-weight: 900; }
        .message-box { padding: 16px; border-radius: 20px; background: rgba(0,0,0,.22); border: 1px solid rgba(168,196,138,.14); margin-top: 10px; color: rgba(241,250,234,.86); line-height: 1.6; }
        .quick-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
        .quick-link { padding: 16px; border-radius: 18px; background: rgba(255,255,255,.04); border: 1px solid rgba(168,196,138,.13); }
        .quick-link span { display: block; font-weight: 800; margin-bottom: 8px; }
        .quick-link code { color: var(--g2); white-space: normal; word-break: break-word; font-size: 12px; }
        .copied { position: fixed; left: 50%; bottom: 22px; transform: translateX(-50%); background: #edf8e6; color: #13200f; padding: 12px 16px; border-radius: 999px; font-weight: 900; box-shadow: 0 18px 60px rgba(0,0,0,.28); z-index: 20; }
        @media (max-width: 920px) { .links-hero, .kit-grid, .quick-grid { grid-template-columns: 1fr; } .links-item { grid-template-columns: 1fr; } }
      `}</style>

      <div className="links-shell">
        <section className="links-hero">
          <div className="links-card">
            <span className="links-eyebrow">kit orgânico pronto</span>
            <h1 className="links-title">Central de <em>links</em> da Maisa</h1>
            <p className="links-sub">Use esta página na bio, no status, no Google Perfil da Empresa e em conversas. Cada caminho já carrega origem rastreável para o Radar Orgânico.</p>
            <div className="links-actions">
              <a className="links-button" href={whatsapp} target="_blank" rel="noreferrer">Chamar no WhatsApp</a>
              <button className="links-button secondary" type="button" onClick={() => copyText(bioUrl, setCopied, 'link da bio')}>Copiar link da bio</button>
            </div>
          </div>

          <aside className="links-card links-phone">
            <div>
              <span className="links-eyebrow">para divulgar hoje</span>
              <h2>Link principal da bio</h2>
              <p>Coloque este endereço na bio do Instagram e também em publicações do Google Perfil da Empresa.</p>
              <div className="message-box"><code>{bioUrl}</code></div>
            </div>
            <button className="copy-button" type="button" onClick={() => copyText(bioUrl, setCopied, 'link principal')}>Copiar central</button>
          </aside>
        </section>

        <section className="links-panel">
          <h2 className="links-section-title">Entradas principais</h2>
          <div className="links-list">
            {organicLinks.map((link) => (
              <article className="links-item" key={link.title}>
                <div>
                  <strong>{link.title}</strong>
                  <small>{link.description}</small>
                </div>
                <a className="links-button" href={link.href}>Abrir</a>
              </article>
            ))}
          </div>
        </section>

        <h2 className="links-section-title">Textos prontos por canal</h2>
        <section className="kit-grid">
          {channelKits.map((kit) => (
            <article className="links-panel" key={kit.channel}>
              <div className="kit-head">
                <div>
                  <h3>{kit.channel}</h3>
                  <p>{kit.intro}</p>
                </div>
                <span className="kit-origin">{kit.origin}</span>
              </div>
              {kit.messages.map((message, index) => {
                const url = withOrigin(message.path, kit.origin);
                const text = `${message.text}\n\n${url}`;
                return (
                  <div className="message-box" key={`${kit.origin}-${index}`}>
                    <p>{message.text}</p>
                    <code>{url}</code>
                    <div className="links-actions">
                      <button className="copy-button" type="button" onClick={() => copyText(text, setCopied, `${kit.channel} ${index + 1}`)}>Copiar texto</button>
                    </div>
                  </div>
                );
              })}
            </article>
          ))}
        </section>

        <h2 className="links-section-title">Links rastreáveis rápidos</h2>
        <section className="links-panel">
          <p>Use estes links quando quiser medir exatamente de onde veio o clique. O painel orgânico separa as origens automaticamente.</p>
          <div className="quick-grid">
            {quickLinks.map((item) => (
              <div className="quick-link" key={`${item.label}-${item.url}`}>
                <span>{item.label}</span>
                <code>{item.url}</code>
                <div className="links-actions">
                  <button className="copy-button" type="button" onClick={() => copyText(item.url, setCopied, item.label)}>Copiar</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {copied && <div className="copied">Copiado: {copied}</div>}
    </main>
  );
}
