export async function ensureRadarProspectTable(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS radar_prospect (
      id SERIAL PRIMARY KEY,
      nome_empresa TEXT NOT NULL,
      segmento TEXT,
      cidade TEXT,
      uf TEXT,
      telefone_publico TEXT,
      whatsapp TEXT,
      email_publico TEXT,
      site_url TEXT,
      perfil_url TEXT,
      endereco TEXT,
      fonte_url TEXT,
      consulta_google TEXT,
      origem TEXT DEFAULT 'radarplan',
      score INTEGER DEFAULT 0,
      prioridade TEXT DEFAULT 'baixa',
      score_motivos TEXT,
      abordagem TEXT,
      evidencias JSONB DEFAULT '[]'::jsonb,
      tags JSONB DEFAULT '[]'::jsonb,
      raw JSONB DEFAULT '{}'::jsonb,
      status TEXT DEFAULT 'Novo',
      observacao_interna TEXT,
      fingerprint TEXT,
      convertido_lead_id INTEGER,
      cnpj TEXT,
      cnae_codigo TEXT,
      cnae_descricao TEXT,
      porte_receita TEXT,
      data_abertura TEXT,
      funcionarios_est INTEGER DEFAULT 0,
      tem_vaga_ativa BOOLEAN DEFAULT false,
      vaga_titulo TEXT,
      vaga_dias INTEGER,
      tem_post_cresc BOOLEAN DEFAULT false,
      post_cresc_texto TEXT,
      tem_filial_nova BOOLEAN DEFAULT false,
      nivel_maturidade INTEGER DEFAULT 1,
      nivel_label TEXT DEFAULT 'Catalogado',
      revisitar_em TEXT,
      score_d1 INTEGER DEFAULT 0,
      score_d2 INTEGER DEFAULT 0,
      score_d3 INTEGER DEFAULT 0,
      score_d4 INTEGER DEFAULT 0,
      score_d5 INTEGER DEFAULT 0,
      score_d6 INTEGER DEFAULT 0,
      proxima_acao TEXT,
      flags JSONB DEFAULT '[]'::jsonb,
      fontes JSONB DEFAULT '[]'::jsonb,
      contatos_associados JSONB DEFAULT '[]'::jsonb,
      market_context JSONB DEFAULT '{}'::jsonb,
      criado_em TIMESTAMPTZ DEFAULT NOW(),
      atualizado_em TIMESTAMPTZ DEFAULT NOW(),
      importado_em TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS nome_empresa TEXT`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS segmento TEXT`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS cidade TEXT`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS uf TEXT`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS telefone_publico TEXT`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS whatsapp TEXT`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS email_publico TEXT`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS site_url TEXT`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS perfil_url TEXT`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS endereco TEXT`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS fonte_url TEXT`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS consulta_google TEXT`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS origem TEXT DEFAULT 'radarplan'`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS score INTEGER DEFAULT 0`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS prioridade TEXT DEFAULT 'baixa'`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS score_motivos TEXT`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS abordagem TEXT`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS evidencias JSONB DEFAULT '[]'::jsonb`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS tags JSONB DEFAULT '[]'::jsonb`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS raw JSONB DEFAULT '{}'::jsonb`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Novo'`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS observacao_interna TEXT`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS fingerprint TEXT`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS convertido_lead_id INTEGER`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS cnpj TEXT`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS cnae_codigo TEXT`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS cnae_descricao TEXT`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS porte_receita TEXT`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS data_abertura TEXT`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS funcionarios_est INTEGER DEFAULT 0`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS tem_vaga_ativa BOOLEAN DEFAULT false`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS vaga_titulo TEXT`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS vaga_dias INTEGER`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS tem_post_cresc BOOLEAN DEFAULT false`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS post_cresc_texto TEXT`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS tem_filial_nova BOOLEAN DEFAULT false`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS nivel_maturidade INTEGER DEFAULT 1`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS nivel_label TEXT DEFAULT 'Catalogado'`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS revisitar_em TEXT`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS score_d1 INTEGER DEFAULT 0`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS score_d2 INTEGER DEFAULT 0`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS score_d3 INTEGER DEFAULT 0`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS score_d4 INTEGER DEFAULT 0`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS score_d5 INTEGER DEFAULT 0`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS score_d6 INTEGER DEFAULT 0`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS proxima_acao TEXT`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS flags JSONB DEFAULT '[]'::jsonb`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS fontes JSONB DEFAULT '[]'::jsonb`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS contatos_associados JSONB DEFAULT '[]'::jsonb`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS market_context JSONB DEFAULT '{}'::jsonb`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS criado_em TIMESTAMPTZ DEFAULT NOW()`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS atualizado_em TIMESTAMPTZ DEFAULT NOW()`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS importado_em TIMESTAMPTZ DEFAULT NOW()`;
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS radar_prospect_fingerprint_idx ON radar_prospect (fingerprint) WHERE fingerprint IS NOT NULL AND fingerprint <> ''`;
}

export function sanitizeText(value, max = 500) {
  return String(value || '').replace(/\s+/g, ' ').trim().slice(0, max);
}

export function sanitizeInteger(value, min = 0, max = 200) {
  const parsed = Number(value || 0);
  if (!Number.isFinite(parsed)) return min;
  return Math.max(min, Math.min(max, Math.round(parsed)));
}

export function normalizePriority(score = 0, priority = '') {
  const normalized = String(priority || '').toLowerCase();
  if (['alta', 'media', 'baixa'].includes(normalized)) return normalized;
  if (Number(score) >= 85) return 'alta';
  if (Number(score) >= 65) return 'media';
  return 'baixa';
}

function normalizeJsonArray(value, limit = 16) {
  return Array.isArray(value) ? value.slice(0, limit) : [];
}

function normalizeJsonObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value) ? value : {};
}

function normalizeContactHint(contact = {}) {
  return {
    nome: sanitizeText(contact.nome || contact.name, 120),
    cargo: sanitizeText(contact.cargo || contact.role || contact.title, 120),
    area: sanitizeText(contact.area || contact.department, 80),
    email: sanitizeText(contact.email, 160),
    telefone: sanitizeText(contact.telefone || contact.phone, 80),
    perfil_url: sanitizeText(contact.perfil_url || contact.profile_url, 700),
    fonte_url: sanitizeText(contact.fonte_url || contact.source_url, 700),
    fonte_tipo: sanitizeText(contact.fonte_tipo || contact.source_type || 'public_professional', 80),
    confianca: sanitizeInteger(contact.confianca || contact.confidence, 0, 100),
    uso_sugerido: sanitizeText(contact.uso_sugerido || 'Pedir direcionamento sobre benefícios corporativos', 300),
    restricao: sanitizeText(contact.restricao || 'abordagem_manual', 120),
  };
}

export function normalizeProspect(input = {}, fallback = {}) {
  const raw = normalizeJsonObject(input.raw);
  const dimensions = normalizeJsonObject(raw.score_dimensoes || input.score_dimensoes);
  const score = sanitizeInteger(input.score, 0, 200);
  const siteUrl = sanitizeText(input.site_url || input.url || input.public_url, 700);
  const fonteUrl = sanitizeText(input.fonte_url || input.source_url || input.url || siteUrl, 700);
  const fingerprint = sanitizeText(input.fingerprint || input.id_externo || input.external_id || `${input.cnpj || ''}|${input.name || input.nome_empresa}|${input.city || input.cidade || fallback.city}|${input.uf || fallback.uf}|${fonteUrl}`, 700).toLowerCase();

  return {
    nome_empresa: sanitizeText(input.nome_empresa || input.name || input.business_name || input.title, 160) || 'Prospecto sem nome',
    segmento: sanitizeText(input.segmento || input.segment || fallback.segment, 120),
    cidade: sanitizeText(input.cidade || input.city || fallback.city, 120),
    uf: sanitizeText(input.uf || fallback.uf || 'RJ', 2).toUpperCase(),
    telefone_publico: sanitizeText(input.telefone_publico || input.phone || input.telefone, 80),
    whatsapp: sanitizeText(input.whatsapp || input.phone || input.telefone_publico || input.telefone, 80),
    email_publico: sanitizeText(input.email_publico || input.email, 160),
    site_url: siteUrl,
    perfil_url: sanitizeText(input.perfil_url || input.profile_url, 700),
    endereco: sanitizeText(input.endereco || input.address, 300),
    fonte_url: fonteUrl,
    consulta_google: sanitizeText(input.consulta_google || input.query || fallback.query, 220),
    origem: sanitizeText(input.origem || input.source || fallback.source || 'radarplan', 80),
    score,
    prioridade: normalizePriority(score, input.prioridade || input.priority),
    score_motivos: sanitizeText(input.score_motivos || input.reason || input.motivos, 900),
    abordagem: sanitizeText(input.abordagem || input.approach, 1200),
    evidencias: normalizeJsonArray(input.evidencias || input.evidence, 12),
    tags: normalizeJsonArray(input.tags, 24),
    raw: raw && Object.keys(raw).length ? raw : input,
    fingerprint,
    cnpj: sanitizeText(input.cnpj, 32),
    cnae_codigo: sanitizeText(input.cnae_codigo, 32),
    cnae_descricao: sanitizeText(input.cnae_descricao, 220),
    porte_receita: sanitizeText(input.porte_receita || input.porte, 80),
    data_abertura: sanitizeText(input.data_abertura, 40),
    funcionarios_est: sanitizeInteger(input.funcionarios_est, 0, 100000),
    tem_vaga_ativa: Boolean(input.tem_vaga_ativa),
    vaga_titulo: sanitizeText(input.vaga_titulo, 220),
    vaga_dias: input.vaga_dias === null || input.vaga_dias === undefined ? null : sanitizeInteger(input.vaga_dias, 0, 3650),
    tem_post_cresc: Boolean(input.tem_post_cresc),
    post_cresc_texto: sanitizeText(input.post_cresc_texto, 600),
    tem_filial_nova: Boolean(input.tem_filial_nova),
    nivel_maturidade: sanitizeInteger(input.nivel_maturidade, 1, 5),
    nivel_label: sanitizeText(input.nivel_label || 'Catalogado', 80),
    revisitar_em: sanitizeText(input.revisitar_em, 80),
    score_d1: sanitizeInteger(input.score_d1 ?? dimensions.d1_fonte, 0, 50),
    score_d2: sanitizeInteger(input.score_d2 ?? dimensions.d2_intencao, 0, 60),
    score_d3: sanitizeInteger(input.score_d3 ?? dimensions.d3_porte, 0, 40),
    score_d4: sanitizeInteger(input.score_d4 ?? dimensions.d4_contato, 0, 50),
    score_d5: sanitizeInteger(input.score_d5 ?? dimensions.d5_timing, 0, 40),
    score_d6: sanitizeInteger(input.score_d6 ?? dimensions.d6_concorrencia, 0, 20),
    proxima_acao: sanitizeText(input.proxima_acao, 500),
    flags: normalizeJsonArray(input.flags, 24),
    fontes: normalizeJsonArray(input.fontes, 16),
    contatos_associados: normalizeJsonArray(input.contatos_associados || input.associated_contacts, 12).map(normalizeContactHint),
    market_context: normalizeJsonObject(input.market_context),
  };
}
