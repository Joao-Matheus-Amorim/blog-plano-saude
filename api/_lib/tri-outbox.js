import crypto from 'node:crypto';

export const TRI_CONTRACT_VERSION = 'tri-contracts/1.0';
export const TRI_LEAD_EVENT = 'tri.lead.created.v1';
export const TRI_SOURCE_SYSTEM = 'blog-plano-saude';
export const TRI_BLOG_PATH = '/api/integrations/blog/leads';
export const TRI_DELIVERY_TIMEOUT_MS = 2500;

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function normalizeForCanonicalJson(value) {
  if (Array.isArray(value)) return value.map(normalizeForCanonicalJson);
  if (!isPlainObject(value)) return value;
  return Object.fromEntries(
    Object.keys(value)
      .sort()
      .map((key) => [key, normalizeForCanonicalJson(value[key])])
  );
}

export function canonicalJson(value) {
  return JSON.stringify(normalizeForCanonicalJson(value));
}

export function signTriEvent({ secret, timestamp, eventId, payload }) {
  const key = String(secret || '');
  if (key.length < 32) {
    const error = new Error('TRI_BLOG_INGEST_SECRET must contain at least 32 characters');
    error.code = 'TRI_SECRET_INVALID';
    throw error;
  }
  return crypto
    .createHmac('sha256', key)
    .update(`${timestamp}.${eventId}.${canonicalJson(payload)}`, 'utf8')
    .digest('hex');
}

function nullableText(value) {
  const text = String(value ?? '').trim();
  return text || null;
}

function normalizeState(value) {
  const text = nullableText(value);
  return text ? text.toUpperCase() : null;
}

export function buildTriLeadEvent({
  externalId,
  occurredAt,
  name,
  phone,
  email,
  city,
  state,
  lives,
  planType,
  consentLgpd,
  attribution = {},
}) {
  const eventId = `blog-lead-${externalId}`;
  return {
    contract_version: TRI_CONTRACT_VERSION,
    event_type: TRI_LEAD_EVENT,
    event_id: eventId,
    source_system: TRI_SOURCE_SYSTEM,
    occurred_at: new Date(occurredAt).toISOString(),
    lead: {
      external_id: String(externalId),
      name: String(name).trim(),
      phone: String(phone).trim(),
      email: nullableText(email),
      city: nullableText(city),
      state: normalizeState(state),
      lives: Number.isInteger(lives) ? lives : null,
      interest_profile: null,
      plan_type: nullableText(planType),
      consent_lgpd: Boolean(consentLgpd),
    },
    attribution: {
      origin: nullableText(attribution.origin),
      channel: nullableText(attribution.channel),
      page: nullableText(attribution.page),
      referrer: nullableText(attribution.referrer),
      utm_source: nullableText(attribution.utm_source),
      utm_medium: nullableText(attribution.utm_medium),
      utm_campaign: nullableText(attribution.utm_campaign),
      utm_content: nullableText(attribution.utm_content),
      utm_term: nullableText(attribution.utm_term),
      fbclid: nullableText(attribution.fbclid),
      gclid: nullableText(attribution.gclid),
    },
  };
}

export function retryDelaySeconds(attemptCount) {
  const attempt = Math.max(1, Number(attemptCount) || 1);
  return Math.min(3600, 15 * (2 ** Math.min(attempt - 1, 8)));
}

export async function ensureTriOutboxTable(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS tri_outbox (
      id BIGSERIAL PRIMARY KEY,
      event_id TEXT NOT NULL UNIQUE,
      contract_version TEXT NOT NULL,
      event_type TEXT NOT NULL,
      payload JSONB NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      attempt_count INTEGER NOT NULL DEFAULT 0,
      next_attempt_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      lease_until TIMESTAMPTZ,
      last_error TEXT,
      last_http_status INTEGER,
      delivered_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      CONSTRAINT tri_outbox_status_chk CHECK (status IN ('pending', 'processing', 'failed', 'delivered'))
    )
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS tri_outbox_delivery_idx
    ON tri_outbox (status, next_attempt_at, created_at)
  `;
}

export function createOutboxInsertQuery(sql, payload) {
  const payloadJson = JSON.stringify(payload);
  return sql`
    INSERT INTO tri_outbox (
      event_id, contract_version, event_type, payload, status, next_attempt_at
    ) VALUES (
      ${payload.event_id}, ${payload.contract_version}, ${payload.event_type},
      CAST(${payloadJson} AS JSONB), 'pending', NOW()
    )
    ON CONFLICT (event_id) DO NOTHING
    RETURNING id, event_id, status, attempt_count
  `;
}

export async function claimNextTriOutboxEvent(sql) {
  const rows = await sql`
    WITH candidate AS (
      SELECT id
      FROM tri_outbox
      WHERE
        ((status IN ('pending', 'failed')) AND next_attempt_at <= NOW())
        OR (status = 'processing' AND lease_until IS NOT NULL AND lease_until <= NOW())
      ORDER BY created_at ASC
      LIMIT 1
      FOR UPDATE SKIP LOCKED
    )
    UPDATE tri_outbox AS o
    SET
      status = 'processing',
      attempt_count = o.attempt_count + 1,
      lease_until = NOW() + INTERVAL '2 minutes',
      updated_at = NOW()
    FROM candidate
    WHERE o.id = candidate.id
    RETURNING o.*
  `;
  return rows[0] || null;
}

async function markDelivered(sql, row, httpStatus) {
  await sql`
    UPDATE tri_outbox
    SET
      status = 'delivered',
      lease_until = NULL,
      last_error = NULL,
      last_http_status = ${httpStatus},
      delivered_at = NOW(),
      updated_at = NOW()
    WHERE id = ${row.id}
  `;
}

async function markFailed(sql, row, error, httpStatus = null) {
  const delaySeconds = retryDelaySeconds(row.attempt_count);
  const message = String(error?.message || error || 'TRI delivery failed').slice(0, 2000);
  await sql`
    UPDATE tri_outbox
    SET
      status = 'failed',
      lease_until = NULL,
      last_error = ${message},
      last_http_status = ${httpStatus},
      next_attempt_at = NOW() + (${delaySeconds} * INTERVAL '1 second'),
      updated_at = NOW()
    WHERE id = ${row.id}
  `;
}

function resolveTriTarget() {
  const baseUrl = String(process.env.TRI_CRM_BASE_URL || '').trim();
  const secret = String(process.env.TRI_BLOG_INGEST_SECRET || '');
  if (!baseUrl || secret.length < 32) return null;
  return { url: new URL(TRI_BLOG_PATH, baseUrl).toString(), secret };
}

export async function deliverClaimedTriEvent(sql, row, { fetchImpl = fetch } = {}) {
  const target = resolveTriTarget();
  if (!target) {
    await markFailed(sql, row, new Error('TRI CRM target is not configured'));
    return { ok: false, configured: false };
  }

  const payload = typeof row.payload === 'string' ? JSON.parse(row.payload) : row.payload;
  const timestamp = String(Math.floor(Date.now() / 1000));
  const signature = signTriEvent({
    secret: target.secret,
    timestamp,
    eventId: row.event_id,
    payload,
  });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TRI_DELIVERY_TIMEOUT_MS);
  let response;
  try {
    response = await fetchImpl(target.url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-tri-event-id': row.event_id,
        'x-tri-timestamp': timestamp,
        'x-tri-signature': signature,
        'x-tri-contract-version': TRI_CONTRACT_VERSION,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } catch (error) {
    await markFailed(sql, row, error);
    return { ok: false, configured: true, error: String(error?.message || error) };
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    await markFailed(
      sql,
      row,
      new Error(`TRI CRM HTTP ${response.status}${body ? `: ${body.slice(0, 500)}` : ''}`),
      response.status,
    );
    return { ok: false, configured: true, status: response.status };
  }

  await markDelivered(sql, row, response.status);
  return { ok: true, configured: true, status: response.status };
}

export async function drainTriOutbox(sql, { limit = 2, fetchImpl = fetch } = {}) {
  const capped = Math.max(1, Math.min(Number(limit) || 1, 10));
  const results = [];
  for (let index = 0; index < capped; index += 1) {
    const row = await claimNextTriOutboxEvent(sql);
    if (!row) break;
    results.push(await deliverClaimedTriEvent(sql, row, { fetchImpl }));
  }
  return results;
}

export function secureSecretEqual(left, right) {
  const a = crypto.createHash('sha256').update(String(left || '')).digest();
  const b = crypto.createHash('sha256').update(String(right || '')).digest();
  return crypto.timingSafeEqual(a, b);
}
