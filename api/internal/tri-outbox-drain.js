import { getSqlClient } from '../_lib/db.js';
import { drainTriOutbox, ensureTriOutboxTable, secureSecretEqual } from '../_lib/tri-outbox.js';

function headerValue(req, name) {
  const value = req.headers?.[name] ?? req.headers?.[name.toLowerCase()];
  return Array.isArray(value) ? String(value[0] || '') : String(value || '');
}

function authorized(req) {
  const configured = String(process.env.TRI_OUTBOX_DRAIN_SECRET || '');
  if (configured.length < 32) return false;

  const direct = headerValue(req, 'x-tri-drain-secret');
  const authorization = headerValue(req, 'authorization');
  const bearer = authorization.toLowerCase().startsWith('bearer ')
    ? authorization.slice(7).trim()
    : '';

  return secureSecretEqual(direct || bearer, configured);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('allow', 'POST');
    return res.status(405).json({ error: 'Método não permitido' });
  }

  if (!authorized(req)) {
    return res.status(401).json({ error: 'Não autorizado' });
  }

  try {
    const sql = getSqlClient();
    await ensureTriOutboxTable(sql);
    const deliveries = await drainTriOutbox(sql, { limit: 10 });
    return res.status(200).json({
      ok: true,
      processed: deliveries.length,
      delivered: deliveries.filter((item) => item?.ok).length,
      failed: deliveries.filter((item) => !item?.ok).length,
    });
  } catch (error) {
    console.error('tri-outbox-drain-failed', { message: error?.message || 'unknown' });
    return res.status(500).json({ ok: false, error: 'Falha ao processar outbox TRI' });
  }
}
