import { neon } from '@neondatabase/serverless';
import { ensureVisitSummaryTable } from '../_lib/visit-summary.js';
import { requireAdmin } from '../_lib/security.js';

function getSqlClient() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error('DATABASE_URL não configurada no ambiente');
  const parsedUrl = new URL(String(databaseUrl).trim().replace(/^['"]|['"]$/g, ''));
  parsedUrl.searchParams.delete('channel_binding');
  return neon(parsedUrl.toString());
}

function getDays(req) {
  const raw = Number(req.query?.days || 7);
  if (!Number.isFinite(raw)) return 7;
  return Math.max(1, Math.min(Math.round(raw), 90));
}

function normalize(rows = []) {
  return rows.map((row) => ({
    ...row,
    total: Number(row.total || 0),
  }));
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Método não permitido' });

  const admin = requireAdmin(req, res);
  if (!admin) return;

  try {
    const days = getDays(req);
    const sql = getSqlClient();
    await ensureVisitSummaryTable(sql);

    const bySource = await sql`
      SELECT source_tag, source_channel, action_type, SUM(total)::int AS total
      FROM visit_summary_daily
      WHERE summary_day >= CURRENT_DATE - (${days}::int - 1)
      GROUP BY source_tag, source_channel, action_type
      ORDER BY total DESC, source_tag ASC
      LIMIT 120
    `;

    const byPage = await sql`
      SELECT page_path, plan_type, action_type, SUM(total)::int AS total
      FROM visit_summary_daily
      WHERE summary_day >= CURRENT_DATE - (${days}::int - 1)
      GROUP BY page_path, plan_type, action_type
      ORDER BY total DESC, page_path ASC
      LIMIT 120
    `;

    const byAction = await sql`
      SELECT action_type, SUM(total)::int AS total
      FROM visit_summary_daily
      WHERE summary_day >= CURRENT_DATE - (${days}::int - 1)
      GROUP BY action_type
      ORDER BY total DESC
    `;

    const recent = await sql`
      SELECT summary_day, action_type, page_path, source_tag, source_channel, plan_type, target_key, total, updated_at
      FROM visit_summary_daily
      WHERE summary_day >= CURRENT_DATE - (${days}::int - 1)
      ORDER BY summary_day DESC, updated_at DESC
      LIMIT 80
    `;

    return res.status(200).json({
      days,
      bySource: normalize(bySource),
      byPage: normalize(byPage),
      byAction: normalize(byAction),
      recent: normalize(recent),
    });
  } catch (error) {
    console.error('Erro ao buscar resumo orgânico:', error?.message || error);
    return res.status(500).json({ error: 'Erro ao buscar resumo orgânico' });
  }
}
