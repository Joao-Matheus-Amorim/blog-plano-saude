export async function ensureVisitSummaryTable(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS visit_summary_daily (
      id SERIAL PRIMARY KEY,
      summary_day DATE NOT NULL DEFAULT CURRENT_DATE,
      action_type TEXT NOT NULL,
      page_path TEXT,
      source_tag TEXT,
      source_channel TEXT,
      plan_type TEXT,
      target_key TEXT,
      total INTEGER NOT NULL DEFAULT 0,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`ALTER TABLE visit_summary_daily ADD COLUMN IF NOT EXISTS summary_day DATE NOT NULL DEFAULT CURRENT_DATE`;
  await sql`ALTER TABLE visit_summary_daily ADD COLUMN IF NOT EXISTS action_type TEXT NOT NULL DEFAULT 'view'`;
  await sql`ALTER TABLE visit_summary_daily ADD COLUMN IF NOT EXISTS page_path TEXT`;
  await sql`ALTER TABLE visit_summary_daily ADD COLUMN IF NOT EXISTS source_tag TEXT`;
  await sql`ALTER TABLE visit_summary_daily ADD COLUMN IF NOT EXISTS source_channel TEXT`;
  await sql`ALTER TABLE visit_summary_daily ADD COLUMN IF NOT EXISTS plan_type TEXT`;
  await sql`ALTER TABLE visit_summary_daily ADD COLUMN IF NOT EXISTS target_key TEXT`;
  await sql`ALTER TABLE visit_summary_daily ADD COLUMN IF NOT EXISTS total INTEGER NOT NULL DEFAULT 0`;
  await sql`ALTER TABLE visit_summary_daily ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW()`;
}

export async function ensureOrganicSessionTable(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS organic_sessions_daily (
      id SERIAL PRIMARY KEY,
      summary_day DATE NOT NULL DEFAULT CURRENT_DATE,
      session_key TEXT NOT NULL,
      first_page TEXT,
      last_page TEXT,
      source_tag TEXT,
      source_channel TEXT,
      plan_type TEXT,
      page_count INTEGER NOT NULL DEFAULT 0,
      action_count INTEGER NOT NULL DEFAULT 0,
      intention_score INTEGER NOT NULL DEFAULT 0,
      last_action TEXT,
      last_target TEXT,
      had_whatsapp BOOLEAN NOT NULL DEFAULT FALSE,
      had_form BOOLEAN NOT NULL DEFAULT FALSE,
      started_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`ALTER TABLE organic_sessions_daily ADD COLUMN IF NOT EXISTS summary_day DATE NOT NULL DEFAULT CURRENT_DATE`;
  await sql`ALTER TABLE organic_sessions_daily ADD COLUMN IF NOT EXISTS session_key TEXT NOT NULL DEFAULT 'sessao'`;
  await sql`ALTER TABLE organic_sessions_daily ADD COLUMN IF NOT EXISTS first_page TEXT`;
  await sql`ALTER TABLE organic_sessions_daily ADD COLUMN IF NOT EXISTS last_page TEXT`;
  await sql`ALTER TABLE organic_sessions_daily ADD COLUMN IF NOT EXISTS source_tag TEXT`;
  await sql`ALTER TABLE organic_sessions_daily ADD COLUMN IF NOT EXISTS source_channel TEXT`;
  await sql`ALTER TABLE organic_sessions_daily ADD COLUMN IF NOT EXISTS plan_type TEXT`;
  await sql`ALTER TABLE organic_sessions_daily ADD COLUMN IF NOT EXISTS page_count INTEGER NOT NULL DEFAULT 0`;
  await sql`ALTER TABLE organic_sessions_daily ADD COLUMN IF NOT EXISTS action_count INTEGER NOT NULL DEFAULT 0`;
  await sql`ALTER TABLE organic_sessions_daily ADD COLUMN IF NOT EXISTS intention_score INTEGER NOT NULL DEFAULT 0`;
  await sql`ALTER TABLE organic_sessions_daily ADD COLUMN IF NOT EXISTS last_action TEXT`;
  await sql`ALTER TABLE organic_sessions_daily ADD COLUMN IF NOT EXISTS last_target TEXT`;
  await sql`ALTER TABLE organic_sessions_daily ADD COLUMN IF NOT EXISTS had_whatsapp BOOLEAN NOT NULL DEFAULT FALSE`;
  await sql`ALTER TABLE organic_sessions_daily ADD COLUMN IF NOT EXISTS had_form BOOLEAN NOT NULL DEFAULT FALSE`;
  await sql`ALTER TABLE organic_sessions_daily ADD COLUMN IF NOT EXISTS started_at TIMESTAMPTZ DEFAULT NOW()`;
  await sql`ALTER TABLE organic_sessions_daily ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW()`;
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS organic_sessions_daily_unique ON organic_sessions_daily (summary_day, session_key)`;
}
