import { neon } from '@neondatabase/serverless';
import { ensureOrganicSessionTable } from '../_lib/visit-summary.js';
import { parseJsonBody, rateLimit } from '../_lib/security.js';

function getSqlClient() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error('DATABASE_URL não configurada no ambiente');
  const parsedUrl = new URL(String(databaseUrl).trim().replace(/^["']|["']$/g, ''));
  parsedUrl.searchParams.delete('channel_binding');
  return neon(parsedUrl.toString());
}

function text(value, fallback = '') {
  return String(value ?? '').trim().slice(0, 160) || fallback;
}

function safeKeyPart(value, fallback = 'geral') {
  return String(value ?? fallback)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 48) || fallback;
}

function sessionKey(value, sourceTag, pagePath, targetKey) {
  const clean = String(value ?? '').trim().replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 80);
  if (clean) return clean;

  return [
    'bucket',
    safeKeyPart(sourceTag, 'site'),
    safeKeyPart(pagePath, 'pagina'),
    safeKeyPart(targetKey, 'acao'),
  ].join('_').slice(0, 80);
}

function scoreFor(actionType, pageDepth = 1) {
  const actionScore = {
    page_view: 2,
    link_click: 8,
    whatsapp_click: 35,
    form_submit: 45,
  }[actionType] || 4;

  return Math.min(100, actionScore + Math.max(0, Number(pageDepth || 0) - 1) * 3);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });

  if (!rateLimit(req, res, { keyPrefix: 'organic-session', windowMs: 60_000, max: 120 })) {
    return;
  }

  try {
    const body = await parseJsonBody(req);
    const sql = getSqlClient();
    await ensureOrganicSessionTable(sql);

    const actionType = text(body.action_type, 'page_view');
    const pagePath = text(body.page_path, '/');
    const sourceTag = text(body.source_tag, 'site_organico');
    const sourceChannel = text(body.source_channel, 'Direto/orgânico');
    const planType = text(body.plan_type, 'Plano de saúde');
    const targetKey = text(body.target_key, 'pagina');
    const depth = Math.max(1, Math.min(Number(body.page_depth || 1), 30));
    const pageIncrement = actionType === 'page_view' ? 1 : 0;
    const scoreIncrement = scoreFor(actionType, depth);
    const hadWhatsapp = actionType === 'whatsapp_click' || targetKey.includes('whatsapp');
    const hadForm = actionType === 'form_submit';

    await sql`
      INSERT INTO organic_sessions_daily (
        summary_day,
        session_key,
        first_page,
        last_page,
        source_tag,
        source_channel,
        plan_type,
        page_count,
        action_count,
        intention_score,
        last_action,
        last_target,
        had_whatsapp,
        had_form,
        started_at,
        updated_at
      )
      VALUES (
        CURRENT_DATE,
        ${sessionKey(body.session_key, sourceTag, pagePath, targetKey)},
        ${pagePath},
        ${pagePath},
        ${sourceTag},
        ${sourceChannel},
        ${planType},
        ${pageIncrement},
        1,
        ${scoreIncrement},
        ${actionType},
        ${targetKey},
        ${hadWhatsapp},
        ${hadForm},
        NOW(),
        NOW()
      )
      ON CONFLICT (summary_day, session_key)
      DO UPDATE SET
        last_page = EXCLUDED.last_page,
        source_tag = COALESCE(NULLIF(organic_sessions_daily.source_tag, ''), EXCLUDED.source_tag),
        source_channel = COALESCE(NULLIF(organic_sessions_daily.source_channel, ''), EXCLUDED.source_channel),
        plan_type = EXCLUDED.plan_type,
        page_count = LEAST(organic_sessions_daily.page_count + ${pageIncrement}, 60),
        action_count = LEAST(organic_sessions_daily.action_count + 1, 120),
        intention_score = LEAST(organic_sessions_daily.intention_score + ${scoreIncrement}, 100),
        last_action = EXCLUDED.last_action,
        last_target = EXCLUDED.last_target,
        had_whatsapp = organic_sessions_daily.had_whatsapp OR EXCLUDED.had_whatsapp,
        had_form = organic_sessions_daily.had_form OR EXCLUDED.had_form,
        updated_at = NOW()
    `;

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao registrar sessão orgânica:', error?.message || error);
    return res.status(200).json({ success: false });
  }
}
