import { neon } from '@neondatabase/serverless';

export function slugify(text = '') {
  return String(text)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || `post-${Date.now()}`;
}

export function getSqlClient() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('DATABASE_URL não configurada no ambiente');
  }

  let normalizedUrl = String(databaseUrl).trim();

  if (
    (normalizedUrl.startsWith('"') && normalizedUrl.endsWith('"')) ||
    (normalizedUrl.startsWith("'") && normalizedUrl.endsWith("'"))
  ) {
    normalizedUrl = normalizedUrl.slice(1, -1);
  }

  const parsedUrl = new URL(normalizedUrl);
  parsedUrl.searchParams.delete('channel_binding');

  return neon(parsedUrl.toString());
}

export const seedPost = {
  titulo: 'Plano de Saúde para MEI: Guia Completo para Empreendedores',
  slug: 'plano-de-saude-para-mei-guia-completo-para-empreendedores',
  categoria: 'MEI',
  resumo: 'Entenda como o MEI pode contratar plano de saúde, quais modalidades existem, o que avaliar antes de escolher e como proteger sua rotina de trabalho.',
  autor: 'Maisa Valentim',
  imagem_url: '',
  seo_title: 'Plano de Saúde para MEI: Guia Completo para Empreendedores',
  seo_description: 'Guia completo sobre plano de saúde para MEI: benefícios, tipos de contratação, documentos, dependentes, carências e como escolher a melhor opção.',
  status: 'published',
  conteudo: `## Introdução

Ser um Microempreendedor Individual (MEI) no Brasil oferece diversas vantagens, mas a segurança e o bem-estar, especialmente em relação à saúde, são preocupações constantes. Contar com um plano de saúde adequado é fundamental para garantir tranquilidade e acesso a serviços médicos de qualidade, sem comprometer o orçamento. Este guia completo aborda tudo o que você precisa saber sobre planos de saúde para MEI, desde os benefícios até como escolher a melhor opção para suas necessidades.

## Por que um MEI precisa de um Plano de Saúde?

Para o MEI, a saúde é um ativo crucial. Uma doença inesperada ou um acidente podem impactar diretamente a capacidade de trabalho e, consequentemente, a renda. Diferente de empregados com carteira assinada, o MEI não possui os mesmos benefícios de saúde corporativos.

Um plano de saúde oferece:

- Acesso rápido a consultas e exames, evitando longas esperas no sistema público de saúde.
- Atendimento de emergência, com cobertura para situações urgentes e internações.
- Prevenção e qualidade de vida, incentivando check-ups regulares e cuidados preventivos.
- Tranquilidade financeira, protegendo contra altos custos de tratamentos particulares.

## Tipos de Planos de Saúde para MEI

Existem algumas modalidades de planos que o MEI pode contratar. A melhor escolha depende do perfil, da quantidade de vidas, da região e da necessidade de rede.

### 1. Plano de Saúde Individual ou Familiar

Esta é uma opção comum para quem não possui vínculo empregatício. O MEI pode contratar um plano individual ou estender a cobertura para seus dependentes. As condições e preços variam bastante entre as operadoras.

### 2. Plano de Saúde Coletivo por Adesão

Disponível para MEIs que são associados a entidades de classe ou sindicatos. Geralmente, oferece condições mais vantajosas do que os planos individuais, com preços mais acessíveis e uma rede credenciada mais ampla.

### 3. Plano de Saúde PME

Embora o MEI seja uma categoria de microempresa, algumas operadoras oferecem planos PME a partir de 2 ou 3 vidas, incluindo o próprio MEI e seus dependentes ou um funcionário. Essa modalidade costuma ter um bom custo-benefício, com preços mais competitivos e uma gama maior de serviços e coberturas.

## Como Escolher o Melhor Plano de Saúde para MEI

A escolha do plano ideal depende de diversos fatores. Antes de contratar, avalie:

- Cobertura: verifique se o plano oferece cobertura ambulatorial, hospitalar, obstétrica ou odontológica conforme sua necessidade.
- Rede credenciada: analise hospitais, clínicas e laboratórios disponíveis na sua região.
- Abrangência: escolha entre cobertura nacional, regional ou municipal de acordo com sua rotina e deslocamento.
- Custo-benefício: compare mensalidade, rede, coparticipação e serviços disponíveis.
- Carência: veja os prazos para consultas, exames, cirurgias, internações e partos.
- Reputação da operadora: pesquise atendimento, avaliações, ANS e experiência de outros clientes.

## Perguntas Frequentes sobre Planos de Saúde para MEI

### MEI pode ter plano de saúde empresarial?

Sim. O MEI pode contratar planos de saúde na modalidade PME, geralmente a partir de 2 ou 3 vidas, incluindo o próprio MEI, dependentes ou funcionários.

### Quais documentos são necessários para contratar?

Normalmente são solicitados o CNPJ do MEI, comprovante de endereço, documentos pessoais como RG e CPF e, em alguns casos, o Certificado da Condição de Microempreendedor Individual (CCMEI).

### É possível incluir dependentes?

Sim. A maioria dos planos permite incluir cônjuge, filhos e, em alguns casos, outros dependentes, conforme as regras da operadora.

## Conclusão

Investir em um plano de saúde é um passo inteligente para qualquer MEI que busca segurança, tranquilidade e acesso a atendimento médico de qualidade. Avalie suas necessidades, compare as opções disponíveis e escolha o plano que melhor se encaixa no seu perfil e orçamento.

Não deixe a sua saúde em segundo plano: ela é a base para o sucesso do seu empreendimento.

## Pronto para encontrar o plano de saúde ideal?

Fale com uma consultoria especializada e receba uma cotação personalizada para o seu perfil, sua empresa e sua região.`
};

export async function ensureBlogTable(sql = getSqlClient()) {
  await sql`
    CREATE TABLE IF NOT EXISTS blog_post (
      id SERIAL PRIMARY KEY,
      titulo TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      categoria TEXT DEFAULT 'Geral',
      resumo TEXT,
      conteudo TEXT NOT NULL,
      imagem_url TEXT,
      autor TEXT DEFAULT 'Maisa Valentim',
      seo_title TEXT,
      seo_description TEXT,
      status TEXT DEFAULT 'draft',
      visualizacoes INTEGER DEFAULT 0,
      publicado_em TIMESTAMPTZ DEFAULT NOW(),
      criado_em TIMESTAMPTZ DEFAULT NOW(),
      atualizado_em TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    INSERT INTO blog_post (
      titulo, slug, categoria, resumo, conteudo, imagem_url, autor, seo_title, seo_description, status, publicado_em
    ) VALUES (
      ${seedPost.titulo},
      ${seedPost.slug},
      ${seedPost.categoria},
      ${seedPost.resumo},
      ${seedPost.conteudo},
      ${seedPost.imagem_url},
      ${seedPost.autor},
      ${seedPost.seo_title},
      ${seedPost.seo_description},
      ${seedPost.status},
      NOW()
    )
    ON CONFLICT (slug) DO NOTHING
  `;
}

export function normalizeStatus(status) {
  return status === 'published' ? 'published' : 'draft';
}

export function mapPost(row) {
  if (!row) return null;

  return {
    id: row.id,
    titulo: row.titulo,
    slug: row.slug,
    categoria: row.categoria || 'Geral',
    resumo: row.resumo || '',
    conteudo: row.conteudo || '',
    imagem_url: row.imagem_url || '',
    autor: row.autor || 'Maisa Valentim',
    seo_title: row.seo_title || row.titulo,
    seo_description: row.seo_description || row.resumo || '',
    status: row.status || 'draft',
    ativo: row.status === 'published',
    visualizacoes: row.visualizacoes || 0,
    data_publicacao: row.publicado_em || row.criado_em,
    publicado_em: row.publicado_em,
    criado_em: row.criado_em,
    atualizado_em: row.atualizado_em,
  };
}
