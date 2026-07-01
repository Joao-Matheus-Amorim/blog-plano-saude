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
