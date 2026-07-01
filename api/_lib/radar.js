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
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS criado_em TIMESTAMPTZ DEFAULT NOW()`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS atualizado_em TIMESTAMPTZ DEFAULT NOW()`;
  await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS importado_em TIMESTAMPTZ DEFAULT NOW()`;
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS radar_prospect_fingerprint_idx ON radar_prospect (fingerprint) WHERE fingerprint IS NOT NULL AND fingerprint <> ''`;
}

export function sanitizeText(value, max = 500) {
  return String(value || '').replace(/\s+/g, ' ').trim().slice(0, max);
}

export function normalizePriority(score = 0, priority = '') {
  const normalized = String(priority || '').toLowerCase();
  if (['alta', 'media', 'baixa'].includes(normalized)) return normalized;
  if (Number(score) >= 85) return 'alta';
  if (Number(score) >= 65) return 'media';
  return 'baixa';
}

export function normalizeProspect(input = {}, fallback = {}) {
  const score = Math.max(0, Math.min(135, Number(input.score || 0)));
  const siteUrl = sanitizeText(input.site_url || input.url || input.public_url, 700);
  const fonteUrl = sanitizeText(input.fonte_url || input.source_url || input.url || siteUrl, 700);
  const fingerprint = sanitizeText(input.fingerprint || input.id_externo || input.external_id || `${input.name || input.nome_empresa}|${input.city || fallback.city}|${input.uf || fallback.uf}|${fonteUrl}`, 700).toLowerCase();

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
    score_motivos: sanitizeText(input.score_motivos || input.reason || input.motivos, 700),
    abordagem: sanitizeText(input.abordagem || input.approach, 700),
    evidencias: Array.isArray(input.evidencias || input.evidence) ? (input.evidencias || input.evidence).slice(0, 8) : [],
    tags: Array.isArray(input.tags) ? input.tags.slice(0, 16) : [],
    raw: typeof input.raw === 'object' && input.raw ? input.raw : input,
    fingerprint,
  };
}
