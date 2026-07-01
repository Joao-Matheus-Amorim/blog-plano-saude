import { neon } from '@neondatabase/serverless';
import crypto from 'crypto';
import { rateLimit } from '../_lib/security.js';
import { ensureIntelligenceSchema } from '../_lib/intelligence.js';

function getSqlClient() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error('DATABASE_URL não configurada no ambiente');

  let normalizedUrl = String(databaseUrl).trim();
  if ((normalizedUrl.startsWith('"') && normalizedUrl.endsWith('"')) || (normalizedUrl.startsWith("'") && normalizedUrl.endsWith("'"))) {
    normalizedUrl = normalizedUrl.slice(1, -1);
  }

  const parsedUrl = new URL(normalizedUrl);
  parsedUrl.searchParams.delete('channel_binding');
  return neon(parsedUrl.toString());
}

function asText(value, fallback = '') {
  const text = String(value ?? '').trim();
  return text || fallback;
}

function hashSession(value = '') {
  const text = asText(value);
  if (!text) return null;
  return crypto.createHash('sha256').update(text).digest('hex');
}

function parseBody(req) {
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  if (Buffer.isBuffer(body)) {
    try { body = JSON.parse(body.toString('utf8')); } catch { body = {}; }
  }
  return body || {};
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  if (!rateLimit(req, res, { keyPrefix: 'site-event', windowMs: 60_000, max: 80 })) return;

  try {
    const body = parseBody(req);
    const eventName = asText(body.event_name);

    if (!eventName) {
      return res.status(400).json({ error: 'Evento obrigatório.' });
    }

    const sql = getSqlClient();
    await ensureIntelligenceSchema(sql);

    const result = await sql`
      INSERT INTO site_event (
        event_name, session_key, page_url, page_path, tag_origem, canal, tipo_plano,
        element_label, event_value, referrer, user_agent_excerpt, metadata
      ) VALUES (
        ${eventName},
        ${hashSession(body.session_id || req.headers['x-forwarded-for'] || '')},
        ${asText(body.page_url) || null},
        ${asText(body.page_path) || null},
        ${asText(body.tag_origem) || null},
        ${asText(body.canal) || null},
        ${asText(body.tipo_plano) || null},
        ${asText(body.element_label) || null},
        ${asText(body.event_value) || null},
        ${asText(body.referrer) || null},
        ${String(req.headers['user-agent'] || '').slice(0, 180) || null},
        ${JSON.stringify(body.metadata || {})}
      )
      RETURNING id
    `;

    return res.status(200).json({ ok: true, id: result[0]?.id });
  } catch (error) {
    console.error('Erro ao registrar evento:', error);
    return res.status(500).json({ error: 'Erro ao registrar evento.' });
  }
}
