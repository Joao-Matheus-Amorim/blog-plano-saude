export async function ensureLeadTable(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS lead (
      id SERIAL PRIMARY KEY,
      tri_external_id TEXT,
      nome TEXT NOT NULL,
      email TEXT,
      telefone TEXT,
      operadora TEXT,
      mensagem TEXT,
      vidas INTEGER,
      origem TEXT DEFAULT 'Direto',
      data_envio TIMESTAMPTZ DEFAULT NOW(),
      status TEXT DEFAULT 'Novo',
      observacao_interna TEXT,
      ultima_acao_em TIMESTAMPTZ,
      cidade TEXT,
      uf TEXT,
      tipo_plano TEXT,
      pagina_origem TEXT,
      tag_origem TEXT,
      canal TEXT DEFAULT 'Orgânico',
      referrer TEXT,
      score INTEGER DEFAULT 0,
      consentimento_lgpd BOOLEAN DEFAULT FALSE
    )
  `;

  await sql`ALTER TABLE lead ADD COLUMN IF NOT EXISTS tri_external_id TEXT`;
  await sql`ALTER TABLE lead ADD COLUMN IF NOT EXISTS nome TEXT`;
  await sql`ALTER TABLE lead ADD COLUMN IF NOT EXISTS email TEXT`;
  await sql`ALTER TABLE lead ADD COLUMN IF NOT EXISTS telefone TEXT`;
  await sql`ALTER TABLE lead ADD COLUMN IF NOT EXISTS operadora TEXT`;
  await sql`ALTER TABLE lead ADD COLUMN IF NOT EXISTS mensagem TEXT`;
  await sql`ALTER TABLE lead ADD COLUMN IF NOT EXISTS vidas INTEGER`;
  await sql`ALTER TABLE lead ADD COLUMN IF NOT EXISTS origem TEXT DEFAULT 'Direto'`;
  await sql`ALTER TABLE lead ADD COLUMN IF NOT EXISTS data_envio TIMESTAMPTZ DEFAULT NOW()`;
  await sql`ALTER TABLE lead ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Novo'`;
  await sql`ALTER TABLE lead ADD COLUMN IF NOT EXISTS observacao_interna TEXT`;
  await sql`ALTER TABLE lead ADD COLUMN IF NOT EXISTS ultima_acao_em TIMESTAMPTZ`;
  await sql`ALTER TABLE lead ADD COLUMN IF NOT EXISTS cidade TEXT`;
  await sql`ALTER TABLE lead ADD COLUMN IF NOT EXISTS uf TEXT`;
  await sql`ALTER TABLE lead ADD COLUMN IF NOT EXISTS tipo_plano TEXT`;
  await sql`ALTER TABLE lead ADD COLUMN IF NOT EXISTS pagina_origem TEXT`;
  await sql`ALTER TABLE lead ADD COLUMN IF NOT EXISTS tag_origem TEXT`;
  await sql`ALTER TABLE lead ADD COLUMN IF NOT EXISTS canal TEXT DEFAULT 'Orgânico'`;
  await sql`ALTER TABLE lead ADD COLUMN IF NOT EXISTS referrer TEXT`;
  await sql`ALTER TABLE lead ADD COLUMN IF NOT EXISTS score INTEGER DEFAULT 0`;
  await sql`ALTER TABLE lead ADD COLUMN IF NOT EXISTS consentimento_lgpd BOOLEAN DEFAULT FALSE`;

  await sql`
    CREATE UNIQUE INDEX IF NOT EXISTS lead_tri_external_id_uidx
    ON lead (tri_external_id)
    WHERE tri_external_id IS NOT NULL
  `;
}
