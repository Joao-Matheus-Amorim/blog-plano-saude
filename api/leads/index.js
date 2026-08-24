import { neon } from '@neondatabase/serverless';
import crypto from 'crypto';
import { ensureLeadTable } from '../_lib/leads.js';
import { rateLimit } from '../_lib/security.js';
import {
  buildTriLeadEvent,
  createOutboxInsertQuery,
  drainTriOutbox,
  ensureTriOutboxTable,
  listDeadTriEvents,
  requeueDeadTriEvents,
  secureSecretEqual,
} from '../_lib/tri-outbox.js';

function getSqlClient() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('DATABASE_URL não configurada no ambiente');
  }

  let normalizedUrl = String(databaseUrl).trim();

  if (
    (normalizedUrl.startsWith('"') && normalizedUrl.endsWith('"')) ||
    (normalizedUrl.startsWith("'") && normalizedUrl.endsWith("'"))
  ) {
    normalizedUrl = normalizedUrl.slice(1, -1);
  }

  const parsedUrl = new URL(normalizedUrl);
  parsedUrl.searchParams.delete('channel_binding');

  return neon(parsedUrl.toString());
}

function sha256(value) {
  if (!value) return null;
  return crypto.createHash('sha256').update(String(value).trim().toLowerCase()).digest('hex');
}

function toDigitsOnly(value) {
  return String(value || '').replace(/\D/g, '');
}

function normalizePhone(phone) {
  const digits = toDigitsOnly(phone);
  return digits.startsWith('55') ? digits : `55${digits}`;
}

function asText(value, fallback = '') {
  const text = String(value ?? '').trim();
  return text || fallback;
}

function asNullableText(value) {
  const text = asText(value);
  return text || null;
}

function asBoolean(value) {
  if (typeof value === 'boolean') return value;
  return ['true', '1', 'sim', 'yes'].includes(String(value || '').toLowerCase());
}

function asScore(value) {
  const score = Number(value);
  if (!Number.isFinite(score)) return 0;
  return Math.max(0, Math.min(Math.round(score), 100));
}

function headerValue(req, name) {
  const wanted = String(name).toLowerCase();
  for (const [key, value] of Object.entries(req.headers || {})) {
    if (String(key).toLowerCase() !== wanted) continue;
    return Array.isArray(value) ? String(value[0] || '') : String(value || '');
  }
  return '';
}

function drainAuthorized(req) {
  const configured = String(process.env.TRI_OUTBOX_DRAIN_SECRET || '');
  if (configured.length < 32) return false;
  const direct = headerValue(req, 'x-tri-drain-secret');
  const authorization = headerValue(req, 'authorization');
  const bearer = authorization.toLowerCase().startsWith('bearer ')
    ? authorization.slice(7).trim()
    : '';
  return secureSecretEqual(direct || bearer, configured);
}

function parseBody(req) {
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  if (Buffer.isBuffer(body)) {
    try { body = JSON.parse(body.toString('utf8')); } catch { body = {}; }
  }
  return body && typeof body === 'object' && !Array.isArray(body) ? body : {};
}

async function handleTriOps(req, res) {
  if (!drainAuthorized(req)) {
    return res.status(401).json({ error: 'Não autorizado' });
  }
  try {
    const sql = getSqlClient();
    await ensureTriOutboxTable(sql);
    const action = String(req.query?.action || 'tri-drain');

    if (action === 'tri-dead-list') {
      const rows = await listDeadTriEvents(sql, { limit: 100 });
      return res.status(200).json({ ok: true, dead_letters: rows });
    }

    if (action === 'tri-requeue-dead') {
      const rows = await requeueDeadTriEvents(sql, parseBody(req).event_ids);
      return res.status(200).json({ ok: true, requeued: rows.map((row) => row.event_id) });
    }

    const deliveries = await drainTriOutbox(sql, { limit: 10 });
    return res.status(200).json({
      ok: true,
      processed: deliveries.length,
      delivered: deliveries.filter((item) => item?.ok).length,
      failed: deliveries.filter((item) => !item?.ok).length,
    });
  } catch (error) {
    console.error('tri-outbox-operation-failed', { message: error?.message || 'unknown' });
    return res.status(500).json({ ok: false, error: 'Falha ao processar outbox TRI' });
  }
}

function calculateFallbackScore({ telefone, cidade, tipo_plano, vidas, tag_origem, canal, mensagem }) {
  let score = 20;
  const tipo = String(tipo_plano || '').toLowerCase();
  const tag = String(tag_origem || '').toLowerCase();
  const canalText = String(canal || '').toLowerCase();
  const msg = String(mensagem || '').toLowerCase();
  const lives = Number(vidas) || 0;

  if (telefone) score += 15;
  if (cidade) score += 15;
  if (tipo.includes('mei')) score += 25;
  if (tipo.includes('empresa') || tipo.includes('pme')) score += 30;
  if (tipo.includes('trocar') || tipo.includes('portabilidade')) score += 25;
  if (tipo.includes('família') || tipo.includes('familia')) score += 15;
  if (lives >= 2) score += 10;
  if (lives >= 3) score += 15;
  if (lives >= 6) score += 20;
  if (tag.includes('radar')) score += 20;
  if (tag.includes('whatsapp') || tag.includes('instagram') || canalText.includes('google')) score += 10;
  if (/urgente|mei|empresa|trocar|portabilidade|gestante|idoso|mãe|mae|filho|funcionário|funcionario/.test(msg)) score += 15;

  return asScore(score);
}

function getPublicErrorPayload(error) {
  const payload = {
    error: 'Não foi possível registrar seu pedido. Tente novamente ou fale conosco pelo WhatsApp.',
  };

  if (process.env.NODE_ENV !== 'production' || process.env.EXPOSE_API_ERRORS === 'true') {
    payload.detail = error?.message || 'Erro desconhecido';
    payload.code = error?.code || null;
    payload.hint = error?.hint || null;
  }

  return payload;
}

async function sendWhatsapp(lead) {
  const phone  = process.env.CALLMEBOT_PHONE;
  const apikey = process.env.CALLMEBOT_APIKEY;

  if (!phone || !apikey) {
    console.warn('Callmebot: variáveis não configuradas, pulando.');
    return null;
  }

  const text = encodeURIComponent(
    [
      'Novo lead recebido!',
      `Nome: ${lead.nome || '-'}`,
      `Telefone: ${lead.telefone || '-'}`,
      `Email: ${lead.email || '-'}`,
      `Tipo: ${lead.tipo_plano || lead.operadora || '-'}`,
      `Vidas: ${lead.vidas ?? '-'}`,
      `Cidade: ${lead.cidade || '-'}${lead.uf ? `/${lead.uf}` : ''}`,
      `Canal: ${lead.canal || '-'}`,
      `Tag origem: ${lead.tag_origem || lead.origem || '-'}`,
      `Score: ${lead.score ?? 0}`,
    ].join('\n')
  );

  const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}&apikey=${encodeURIComponent(apikey)}&text=${text}`;

  const response = await fetch(url);
  const responseBody = await response.text().catch(() => '');

  console.log('Callmebot response:', response.status, responseBody);
  return { ok: response.ok, status: response.status };
}

async function sendMetaCapi(lead, eventId) {
  const pixelId      = process.env.META_PIXEL_ID;
  const accessToken  = process.env.META_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    console.warn('Meta CAPI: variáveis não configuradas, pulando.');
    return null;
  }

  const eventTime = Math.floor(Date.now() / 1000);

  const userData = {};
  if (lead.email)    userData.em = [sha256(lead.email)];
  if (lead.telefone) userData.ph = [sha256(normalizePhone(lead.telefone))];

  const resolvedEventId = eventId || `lead-fallback-${lead.id}-${eventTime}`;

  const payload = {
    data: [{
      event_name:    'Lead',
      event_time:    eventTime,
      action_source: 'website',
      event_id:      resolvedEventId,
      user_data:     userData,
      custom_data: {
        content_name: lead.tipo_plano || lead.operadora || 'Plano de Saúde',
        canal: lead.canal || 'Orgânico',
        tag_origem: lead.tag_origem || lead.origem || '',
        score: lead.score || 0,
      },
    }],
  };

  const url = `https://graph.facebook.com/v18.0/${encodeURIComponent(pixelId)}/events?access_token=${encodeURIComponent(accessToken)}`;

  const response = await fetch(url, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload),
  });

  const responseBody = await response.json().catch(() => ({}));
  console.log('Meta CAPI response:', response.status, JSON.stringify(responseBody));
  return { ok: response.ok, status: response.status, body: responseBody };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const triAction = String(req.query?.action || '');
  if (['tri-drain', 'tri-dead-list', 'tri-requeue-dead'].includes(triAction)) {
    return handleTriOps(req, res);
  }

  if (!rateLimit(req, res, { keyPrefix: 'lead-create', windowMs: 60_000, max: 12 })) {
    return;
  }

  const body = parseBody(req);

  const {
    nome, name,
    email,
    telefone, whatsapp,
    operadora,
    vidas,
    mensagem,
    origem,
    event_id,
    cidade,
    uf,
    tipo_plano,
    pagina_origem,
    tag_origem,
    canal,
    referrer,
    score,
    consentimento_lgpd,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    utm_term,
    fbclid,
    gclid,
  } = body || {};

  const nomeFinal = asText(nome || name);
  const emailFinal = asNullableText(email);
  const telefoneFinal = asNullableText(telefone || whatsapp);
  const tipoPlanoFinal = asNullableText(tipo_plano || operadora) || 'Plano de saúde';
  const operadoraFinal = asNullableText(operadora || tipoPlanoFinal);
  const mensagemFinal = asNullableText(mensagem);
  const origemFinal = asText(origem, 'Direto');
  const vidasFinal = Number.isFinite(Number(vidas)) ? Number(vidas) : null;
  const eventIdFinal = asNullableText(event_id);
  const cidadeFinal = asNullableText(cidade);
  const ufFinal = asNullableText(uf)?.toUpperCase() || null;
  const paginaOrigemFinal = asNullableText(pagina_origem);
  const tagOrigemFinal = asNullableText(tag_origem || origemFinal);
  const canalFinal = asText(canal, 'Orgânico');
  const referrerFinal = asNullableText(referrer);
  const consentimentoFinal = asBoolean(consentimento_lgpd);
  const scoreFinal = score === undefined || score === null
    ? calculateFallbackScore({ telefone: telefoneFinal, cidade: cidadeFinal, tipo_plano: tipoPlanoFinal, vidas: vidasFinal, tag_origem: tagOrigemFinal, canal: canalFinal, mensagem: mensagemFinal })
    : asScore(score);

  if (!nomeFinal) {
    return res.status(400).json({ error: 'Informe seu nome para continuar.' });
  }

  if (!telefoneFinal) {
    return res.status(400).json({ error: 'Informe seu WhatsApp para continuar.' });
  }

  if (telefoneFinal.length < 6) {
    return res.status(400).json({ error: 'Informe um WhatsApp válido para continuar.' });
  }

  const triExternalId = crypto.randomUUID();
  const occurredAt = new Date().toISOString();
  const triPayload = buildTriLeadEvent({
    externalId: triExternalId,
    occurredAt,
    name: nomeFinal,
    phone: telefoneFinal,
    email: emailFinal,
    city: cidadeFinal,
    state: ufFinal,
    lives: Number.isInteger(vidasFinal) ? vidasFinal : null,
    planType: tipoPlanoFinal,
    consentLgpd: consentimentoFinal,
    attribution: {
      origin: origemFinal,
      channel: canalFinal,
      page: paginaOrigemFinal,
      referrer: referrerFinal,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
      fbclid,
      gclid,
    },
  });

  let lead;
  let outboxQueued = false;
  let sql;
  try {
    sql = getSqlClient();
    await ensureLeadTable(sql);
    await ensureTriOutboxTable(sql);

    const leadInsert = sql`
      INSERT INTO lead (
        tri_external_id,
        nome, email, telefone, operadora, mensagem, vidas, origem, data_envio, status,
        cidade, uf, tipo_plano, pagina_origem, tag_origem, canal, referrer, score, consentimento_lgpd
      )
      VALUES (
        ${triExternalId},
        ${nomeFinal}, ${emailFinal}, ${telefoneFinal},
        ${operadoraFinal}, ${mensagemFinal}, ${vidasFinal},
        ${origemFinal}, NOW(), 'Novo',
        ${cidadeFinal}, ${ufFinal}, ${tipoPlanoFinal}, ${paginaOrigemFinal}, ${tagOrigemFinal},
        ${canalFinal}, ${referrerFinal}, ${scoreFinal}, ${consentimentoFinal}
      )
      RETURNING *
    `;

    const outboxInsert = createOutboxInsertQuery(sql, triPayload);
    const [leadRows, outboxRows] = await sql.transaction([leadInsert, outboxInsert]);
    lead = leadRows[0];
    outboxQueued = Boolean(outboxRows[0]);
  } catch (error) {
    console.error('Erro ao criar lead/outbox:', {
      message: error?.message,
      code:    error?.code,
      detail:  error?.detail,
      hint:    error?.hint,
    });
    return res.status(500).json(getPublicErrorPayload(error));
  }

  const [whatsappResult, metaResult, triResult] = await Promise.allSettled([
    sendWhatsapp(lead),
    sendMetaCapi(lead, eventIdFinal),
    drainTriOutbox(sql, { limit: 2 }),
  ]);

  const triDeliveries = triResult.status === 'fulfilled' ? triResult.value : [];

  return res.status(200).json({
    success: true,
    lead,
    notifications: {
      whatsapp:  whatsappResult.status === 'fulfilled' ? whatsappResult.value?.ok  : false,
      meta_capi: metaResult.status     === 'fulfilled' ? metaResult.value?.ok      : false,
      tri_outbox_queued: outboxQueued,
      tri_delivery_attempted: triDeliveries.length > 0,
      tri_delivery_ok: triDeliveries.some((item) => item?.ok === true),
    },
  });
}
