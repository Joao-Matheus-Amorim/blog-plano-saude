export const SIGNAL_RETENTION_DAYS = 45;

export const SOURCE_TYPES = [
  'site_event',
  'inbound_lead',
  'public_search',
  'public_social',
  'forum_publico',
  'reclamacao_publica',
  'elogio_publico',
  'b2b_publico',
  'operadora_publica',
  'ans_dados_publicos',
  'manual_import',
];

export const DEFAULT_NICHES = [
  ['plano_saude', 'Planos de saúde', 'Captação de intenção para cotação, troca, MEI, família e empresa.'],
  ['odontologia', 'Odontologia', 'Dor, aparelho, clareamento, implante, indicação de dentista.'],
  ['imobiliario', 'Imobiliário', 'Compra, venda, aluguel, financiamento e captação local.'],
  ['servicos_b2b', 'Serviços B2B', 'Empresas locais com possível demanda por serviços ou benefícios.'],
];

export const DEFAULT_SOURCES = [
  ['site_cliques', 'Eventos do site', 'site_event', 'safe', true, 'Cliques, formulário iniciado, WhatsApp aberto e páginas visitadas sem identificação pessoal.'],
  ['lead_form', 'Formulário de lead', 'inbound_lead', 'consent', true, 'Leads identificados somente quando a pessoa envia nome/WhatsApp e aceita contato.'],
  ['x_public_search', 'X/Twitter público', 'public_social', 'review_required', false, 'Somente posts públicos recentes; não enviar DM automática; usar ação pública/manual.'],
  ['web_public_search', 'Busca web pública', 'public_search', 'review_required', false, 'Resultados indexados em páginas abertas, fóruns e comentários públicos.'],
  ['forum_publico', 'Fóruns públicos', 'forum_publico', 'review_required', false, 'Tópicos públicos com URL, trecho e data; contato direto não autorizado.'],
  ['reclamacao_publica', 'Reclamações públicas', 'reclamacao_publica', 'review_required', false, 'Sinais de reajuste, rede, negativa, carência e portabilidade.'],
  ['b2b_publico', 'Empresas públicas', 'b2b_publico', 'legitimate_interest_review', true, 'Empresas com site, telefone comercial ou canal institucional público.'],
  ['operator_docs', 'Documentos públicos de operadoras', 'operadora_publica', 'market_data', true, 'PDFs, páginas institucionais, rede, carência, abrangência e materiais públicos.'],
  ['ans_public_data', 'ANS dados públicos', 'ans_dados_publicos', 'public_data', true, 'Bases públicas regulatórias, operadoras, produtos, rede e indicadores agregados.'],
];

export async function ensureIntelligenceTables(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS intelligence_source (
      id SERIAL PRIMARY KEY,
      source_key TEXT UNIQUE NOT NULL,
      nome TEXT NOT NULL,
      source_type TEXT NOT NULL,
      legal_mode TEXT NOT NULL,
      contact_allowed_default BOOLEAN DEFAULT FALSE,
      descricao TEXT,
      enabled BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS niche_catalog (
      id SERIAL PRIMARY KEY,
      niche_key TEXT UNIQUE NOT NULL,
      nome TEXT NOT NULL,
      descricao TEXT,
      enabled BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS source_keyword_rule (
      id SERIAL PRIMARY KEY,
      niche_key TEXT NOT NULL,
      source_key TEXT NOT NULL,
      keyword TEXT NOT NULL,
      tema TEXT,
      intencao TEXT,
      score_base INTEGER DEFAULT 20,
      enabled BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE (niche_key, source_key, keyword)
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS collection_run (
      id SERIAL PRIMARY KEY,
      source_key TEXT NOT NULL,
      niche_key TEXT,
      query TEXT,
      status TEXT DEFAULT 'queued',
      started_at TIMESTAMPTZ DEFAULT NOW(),
      finished_at TIMESTAMPTZ,
      items_found INTEGER DEFAULT 0,
      items_saved INTEGER DEFAULT 0,
      error_message TEXT,
      metadata JSONB DEFAULT '{}'::jsonb
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS public_actor_snapshot (
      id SERIAL PRIMARY KEY,
      source_key TEXT NOT NULL,
      public_handle TEXT,
      display_name_public TEXT,
      profile_url TEXT,
      platform_user_id TEXT,
      bio_excerpt TEXT,
      profile_metadata JSONB DEFAULT '{}'::jsonb,
      first_seen_at TIMESTAMPTZ DEFAULT NOW(),
      last_seen_at TIMESTAMPTZ DEFAULT NOW(),
      expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '45 days',
      UNIQUE (source_key, profile_url)
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS intent_signal (
      id SERIAL PRIMARY KEY,
      source_key TEXT NOT NULL,
      niche_key TEXT DEFAULT 'plano_saude',
      actor_id INTEGER,
      usuario_publico TEXT,
      url_perfil TEXT,
      url_post TEXT UNIQUE,
      texto_trecho TEXT NOT NULL,
      keyword TEXT,
      tema TEXT,
      intencao TEXT,
      cidade_detectada TEXT,
      uf_detectada TEXT,
      operadora_detectada TEXT,
      data_post TIMESTAMPTZ,
      data_coleta TIMESTAMPTZ DEFAULT NOW(),
      dias_desde_post INTEGER,
      score INTEGER DEFAULT 0,
      temperatura TEXT DEFAULT 'morno',
      acao_recomendada TEXT,
      link_sugerido TEXT,
      status TEXT DEFAULT 'Novo',
      risk_level TEXT DEFAULT 'review',
      contact_allowed BOOLEAN DEFAULT FALSE,
      manual_review_required BOOLEAN DEFAULT TRUE,
      expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '45 days',
      metadata JSONB DEFAULT '{}'::jsonb
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS reputation_signal (
      id SERIAL PRIMARY KEY,
      source_key TEXT NOT NULL,
      niche_key TEXT DEFAULT 'plano_saude',
      url_origem TEXT UNIQUE,
      autor_publico TEXT,
      texto_trecho TEXT NOT NULL,
      sentimento TEXT,
      tema TEXT,
      operadora_detectada TEXT,
      cidade_detectada TEXT,
      uf_detectada TEXT,
      data_publicacao TIMESTAMPTZ,
      data_coleta TIMESTAMPTZ DEFAULT NOW(),
      score INTEGER DEFAULT 0,
      status TEXT DEFAULT 'Novo',
      contact_allowed BOOLEAN DEFAULT FALSE,
      expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '45 days',
      metadata JSONB DEFAULT '{}'::jsonb
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS company_entity (
      id SERIAL PRIMARY KEY,
      niche_key TEXT DEFAULT 'servicos_b2b',
      nome TEXT NOT NULL,
      cnpj TEXT,
      segmento TEXT,
      cidade TEXT,
      uf TEXT,
      website TEXT,
      origem TEXT,
      source_url TEXT,
      score INTEGER DEFAULT 0,
      status TEXT DEFAULT 'Novo',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE (nome, cidade, uf, website)
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS company_contact_channel (
      id SERIAL PRIMARY KEY,
      company_id INTEGER NOT NULL,
      channel_type TEXT NOT NULL,
      channel_value TEXT NOT NULL,
      source_url TEXT,
      is_public BOOLEAN DEFAULT TRUE,
      is_personal BOOLEAN DEFAULT FALSE,
      can_contact BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE (company_id, channel_type, channel_value)
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS company_hunt_signal (
      id SERIAL PRIMARY KEY,
      company_id INTEGER,
      source_key TEXT NOT NULL,
      niche_key TEXT DEFAULT 'servicos_b2b',
      url_origem TEXT,
      texto_trecho TEXT,
      keyword TEXT,
      tema TEXT,
      score INTEGER DEFAULT 0,
      acao_recomendada TEXT,
      status TEXT DEFAULT 'Novo',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE (source_key, url_origem, keyword)
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS operator_catalog (
      id SERIAL PRIMARY KEY,
      registro_ans TEXT UNIQUE,
      nome TEXT NOT NULL,
      nome_fantasia TEXT,
      modalidade TEXT,
      website TEXT,
      status_operadora TEXT,
      dados_publicos JSONB DEFAULT '{}'::jsonb,
      last_imported_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS operator_document (
      id SERIAL PRIMARY KEY,
      operator_id INTEGER,
      source_key TEXT DEFAULT 'operator_docs',
      titulo TEXT NOT NULL,
      url_documento TEXT UNIQUE NOT NULL,
      document_type TEXT,
      hash TEXT,
      texto_extraido TEXT,
      metadata JSONB DEFAULT '{}'::jsonb,
      collected_at TIMESTAMPTZ DEFAULT NOW(),
      status TEXT DEFAULT 'Novo'
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS ans_dataset_import (
      id SERIAL PRIMARY KEY,
      dataset_key TEXT NOT NULL,
      dataset_name TEXT NOT NULL,
      source_url TEXT,
      license_note TEXT,
      imported_at TIMESTAMPTZ DEFAULT NOW(),
      records_total INTEGER DEFAULT 0,
      records_inserted INTEGER DEFAULT 0,
      status TEXT DEFAULT 'Novo',
      metadata JSONB DEFAULT '{}'::jsonb
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS ans_market_metric (
      id SERIAL PRIMARY KEY,
      dataset_import_id INTEGER,
      metric_key TEXT NOT NULL,
      operadora TEXT,
      registro_ans TEXT,
      produto TEXT,
      cidade TEXT,
      uf TEXT,
      periodo TEXT,
      valor NUMERIC,
      metadata JSONB DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS site_event (
      id SERIAL PRIMARY KEY,
      event_name TEXT NOT NULL,
      session_key TEXT,
      page_url TEXT,
      page_path TEXT,
      tag_origem TEXT,
      canal TEXT,
      tipo_plano TEXT,
      element_label TEXT,
      event_value TEXT,
      referrer TEXT,
      user_agent_excerpt TEXT,
      metadata JSONB DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS signal_action (
      id SERIAL PRIMARY KEY,
      signal_type TEXT NOT NULL,
      signal_id INTEGER NOT NULL,
      action_type TEXT NOT NULL,
      action_text TEXT,
      link_sugerido TEXT,
      status TEXT DEFAULT 'Pendente',
      created_by TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      completed_at TIMESTAMPTZ
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS content_opportunity (
      id SERIAL PRIMARY KEY,
      niche_key TEXT DEFAULT 'plano_saude',
      tema TEXT NOT NULL,
      cidade TEXT,
      uf TEXT,
      operadora TEXT,
      evidence_count INTEGER DEFAULT 0,
      score INTEGER DEFAULT 0,
      suggested_slug TEXT,
      suggested_title TEXT,
      status TEXT DEFAULT 'Novo',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS suppression_list (
      id SERIAL PRIMARY KEY,
      identifier_hash TEXT UNIQUE NOT NULL,
      identifier_type TEXT NOT NULL,
      reason TEXT,
      source TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS consent_log (
      id SERIAL PRIMARY KEY,
      lead_id INTEGER,
      consent_type TEXT NOT NULL,
      consent_text TEXT,
      page_url TEXT,
      source_key TEXT,
      granted_at TIMESTAMPTZ DEFAULT NOW(),
      metadata JSONB DEFAULT '{}'::jsonb
    )
  `;

  await sql`CREATE INDEX IF NOT EXISTS idx_intent_signal_recent ON intent_signal (data_coleta DESC, score DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_intent_signal_status ON intent_signal (status, temperatura, niche_key)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_reputation_signal_recent ON reputation_signal (data_coleta DESC, score DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_company_entity_geo ON company_entity (uf, cidade, segmento)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_site_event_origin ON site_event (tag_origem, canal, created_at DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_operator_catalog_ans ON operator_catalog (registro_ans)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_ans_metric_lookup ON ans_market_metric (uf, cidade, registro_ans, metric_key)`;
}

export async function seedIntelligenceReferenceData(sql) {
  for (const [nicheKey, nome, descricao] of DEFAULT_NICHES) {
    await sql`
      INSERT INTO niche_catalog (niche_key, nome, descricao)
      VALUES (${nicheKey}, ${nome}, ${descricao})
      ON CONFLICT (niche_key) DO UPDATE SET nome = EXCLUDED.nome, descricao = EXCLUDED.descricao
    `;
  }

  for (const [sourceKey, nome, sourceType, legalMode, contactAllowedDefault, descricao] of DEFAULT_SOURCES) {
    await sql`
      INSERT INTO intelligence_source (source_key, nome, source_type, legal_mode, contact_allowed_default, descricao)
      VALUES (${sourceKey}, ${nome}, ${sourceType}, ${legalMode}, ${contactAllowedDefault}, ${descricao})
      ON CONFLICT (source_key) DO UPDATE SET
        nome = EXCLUDED.nome,
        source_type = EXCLUDED.source_type,
        legal_mode = EXCLUDED.legal_mode,
        contact_allowed_default = EXCLUDED.contact_allowed_default,
        descricao = EXCLUDED.descricao,
        updated_at = NOW()
    `;
  }
}

export async function ensureIntelligenceSchema(sql) {
  await ensureIntelligenceTables(sql);
  await seedIntelligenceReferenceData(sql);
}

export function getSignalExpiryDate(days = SIGNAL_RETENTION_DAYS) {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
}

export function clampScore(value) {
  const score = Number(value);
  if (!Number.isFinite(score)) return 0;
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function getTemperature(score = 0, daysSincePost = 0) {
  if (daysSincePost > SIGNAL_RETENTION_DAYS) return 'expirado';
  if (score >= 80 && daysSincePost <= 7) return 'quente';
  if (score >= 55 && daysSincePost <= 20) return 'morno';
  return 'frio';
}
