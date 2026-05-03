export async function ensureLeadTable(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS lead (
      id SERIAL PRIMARY KEY,
      nome TEXT NOT NULL,
      email TEXT,
      telefone TEXT,
      operadora TEXT,
      mensagem TEXT,
      vidas INTEGER,
      origem TEXT DEFAULT 'Direto',
      data_envio TIMESTAMPTZ DEFAULT NOW(),
      status TEXT DEFAULT 'Novo'
    )
  `;

  await sql`ALTER TABLE lead ADD COLUMN IF NOT EXISTS nome TEXT`;
  await sql`ALTER TABLE lead ADD COLUMN IF NOT EXISTS email TEXT`;
  await sql`ALTER TABLE lead ADD COLUMN IF NOT EXISTS telefone TEXT`;
  await sql`ALTER TABLE lead ADD COLUMN IF NOT EXISTS operadora TEXT`;
  await sql`ALTER TABLE lead ADD COLUMN IF NOT EXISTS mensagem TEXT`;
  await sql`ALTER TABLE lead ADD COLUMN IF NOT EXISTS vidas INTEGER`;
  await sql`ALTER TABLE lead ADD COLUMN IF NOT EXISTS origem TEXT DEFAULT 'Direto'`;
  await sql`ALTER TABLE lead ADD COLUMN IF NOT EXISTS data_envio TIMESTAMPTZ DEFAULT NOW()`;
  await sql`ALTER TABLE lead ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Novo'`;
}
