import { neon } from '@neondatabase/serverless';
import { ensureVisitSummaryTable } from '../_lib/visit-summary.js';
import { parseJsonBody } from '../_lib/security.js';

function getSqlClient() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error('DATABASE_URL não configurada no ambiente');
  const parsedUrl = new URL(String(databaseUrl).trim().replace(/^['"]|['"]$/g, ''));
  parsedUrl.searchParams.delete('channel_binding');
  return neon(parsedUrl.toString());
}

function text(value, fallback = '') {
  return String(value ?? '').trim().slice(0, 160) || fallback;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });

  try {
    const body = await parseJsonBody(req);
    const sql = getSqlClient();
    await ensureVisitSummaryTable(sql);

    await sql`
      INSERT INTO visit_summary_daily (summary_day, action_type, page_path, source_tag, source_channel, plan_type, target_key, total, updated_at)
      VALUES (
        CURRENT_DATE,
        ${text(body.action_type, 'page_view')},
        ${text(body.page_path, '/')},
        ${text(body.source_tag, 'site_organico')},
        ${text(body.source_channel, 'Direto/orgânico')},
        ${text(body.plan_type, 'Plano de saúde')},
        ${text(body.target_key, 'geral')},
        1,
        NOW()
      )
    `;

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao registrar resumo orgânico:', error?.message || error);
    return res.status(200).json({ success: false });
  }
}
