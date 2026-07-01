import { neon } from '@neondatabase/serverless';
import { ensureOrganicSessionTable, ensureVisitSummaryTable } from '../_lib/visit-summary.js';
import { requireAdmin } from '../_lib/security.js';

function getSqlClient() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error('DATABASE_URL não configurada no ambiente');
  const parsedUrl = new URL(String(databaseUrl).trim().replace(/^["']|["']$/g, ''));
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

function normalizeSessions(rows = []) {
  return rows.map((row) => ({
    ...row,
    total_sessions: Number(row.total_sessions || 0),
    avg_score: Number(row.avg_score || 0),
    avg_pages: Number(row.avg_pages || 0),
  }));
}

function normalizeOverview(row = {}) {
  return {
    total_sessions: Number(row.total_sessions || 0),
    high_intent_sessions: Number(row.high_intent_sessions || 0),
    whatsapp_sessions: Number(row.whatsapp_sessions || 0),
    form_sessions: Number(row.form_sessions || 0),
    avg_score: Number(row.avg_score || 0),
    avg_pages: Number(row.avg_pages || 0),
  };
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Método não permitido' });

  const admin = requireAdmin(req, res);
  if (!admin) return;

  try {
    const days = getDays(req);
    const sql = getSqlClient();
    await ensureVisitSummaryTable(sql);
    await ensureOrganicSessionTable(sql);

    const bySource = await sql`
      SELECT source_tag, source_channel, action_type, SUM(total)::int AS total
      FROM visit_summary_daily
      WHERE summary_day >= CURRENT_DATE - (${days}::int - 1)
      GROUP BY source_tag, source_channel, action_type
      ORDER BY total DESC, source_tag ASC
      LIMIT 120
    `;

    const byPage = await sql`
      SELECT page_path, source_tag, source_channel, plan_type, action_type, SUM(total)::int AS total
      FROM visit_summary_daily
      WHERE summary_day >= CURRENT_DATE - (${days}::int - 1)
      GROUP BY page_path, source_tag, source_channel, plan_type, action_type
      ORDER BY total DESC, page_path ASC
      LIMIT 160
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

    const sessionOverview = await sql`
      SELECT
        COUNT(*)::int AS total_sessions,
        COUNT(*) FILTER (WHERE intention_score >= 55)::int AS high_intent_sessions,
        COUNT(*) FILTER (WHERE had_whatsapp)::int AS whatsapp_sessions,
        COUNT(*) FILTER (WHERE had_form)::int AS form_sessions,
        COALESCE(ROUND(AVG(intention_score)), 0)::int AS avg_score,
        COALESCE(ROUND(AVG(page_count), 1), 0)::float AS avg_pages
      FROM organic_sessions_daily
      WHERE summary_day >= CURRENT_DATE - (${days}::int - 1)
    `;

    const topJourneys = await sql`
      SELECT
        source_tag,
        source_channel,
        first_page,
        last_page,
        plan_type,
        last_action,
        last_target,
        COUNT(*)::int AS total_sessions,
        COALESCE(ROUND(AVG(intention_score)), 0)::int AS avg_score,
        COALESCE(ROUND(AVG(page_count), 1), 0)::float AS avg_pages,
        MAX(updated_at) AS last_seen
      FROM organic_sessions_daily
      WHERE summary_day >= CURRENT_DATE - (${days}::int - 1)
      GROUP BY source_tag, source_channel, first_page, last_page, plan_type, last_action, last_target
      ORDER BY avg_score DESC, total_sessions DESC, last_seen DESC
      LIMIT 40
    `;

    return res.status(200).json({
      days,
      bySource: normalize(bySource),
      byPage: normalize(byPage),
      byAction: normalize(byAction),
      recent: normalize(recent),
      sessionOverview: normalizeOverview(sessionOverview[0]),
      topJourneys: normalizeSessions(topJourneys),
    });
  } catch (error) {
    console.error('Erro ao buscar resumo orgânico:', error?.message || error);
    return res.status(500).json({ error: 'Erro ao buscar resumo orgânico' });
  }
}
