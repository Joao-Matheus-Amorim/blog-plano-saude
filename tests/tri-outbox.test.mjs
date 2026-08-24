import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import test from 'node:test';

import {
  TRI_CONTRACT_VERSION,
  TRI_LEAD_EVENT,
  buildTriLeadEvent,
  canonicalJson,
  retryDelaySeconds,
  signTriEvent,
} from '../api/_lib/tri-outbox.js';

test('canonical JSON sorts nested object keys deterministically', () => {
  assert.equal(
    canonicalJson({ z: 1, a: { y: 2, b: 3 }, list: [{ q: 1, a: 2 }] }),
    '{"a":{"b":3,"y":2},"list":[{"a":2,"q":1}],"z":1}',
  );
});

test('TRI HMAC matches the CRM canonical signing rule', () => {
  const secret = '0123456789abcdef0123456789abcdef';
  const timestamp = '1787578000';
  const payload = { event_id: 'blog-lead-test-123', z: 1, a: { y: 2, b: 3 } };
  const expected = crypto
    .createHmac('sha256', secret)
    .update(`${timestamp}.${payload.event_id}.${canonicalJson(payload)}`, 'utf8')
    .digest('hex');

  assert.equal(signTriEvent({ secret, timestamp, eventId: payload.event_id, payload }), expected);
});

test('lead event is built with canonical contract and stable external id', () => {
  const event = buildTriLeadEvent({
    externalId: '8dd41714-1c9a-465b-b06c-9239e9b13f00',
    occurredAt: '2026-08-24T13:00:00.000Z',
    name: 'Cliente Teste',
    phone: '21999990000',
    email: 'cliente@example.com',
    city: 'Rio de Janeiro',
    state: 'rj',
    lives: 3,
    planType: 'PME',
    consentLgpd: true,
    attribution: { origin: 'Landing', channel: 'Meta', utm_campaign: 'teste' },
  });

  assert.equal(event.contract_version, TRI_CONTRACT_VERSION);
  assert.equal(event.event_type, TRI_LEAD_EVENT);
  assert.equal(event.source_system, 'blog-plano-saude');
  assert.equal(event.event_id, 'blog-lead-8dd41714-1c9a-465b-b06c-9239e9b13f00');
  assert.equal(event.lead.external_id, '8dd41714-1c9a-465b-b06c-9239e9b13f00');
  assert.equal(event.lead.state, 'RJ');
  assert.equal(event.lead.consent_lgpd, true);
  assert.equal(event.attribution.utm_campaign, 'teste');
});

test('retry backoff grows and remains capped', () => {
  assert.equal(retryDelaySeconds(1), 15);
  assert.equal(retryDelaySeconds(2), 30);
  assert.equal(retryDelaySeconds(5), 240);
  assert.equal(retryDelaySeconds(20), 3600);
});

test('lead capture source keeps lead and outbox in the same Neon transaction', () => {
  const source = fs.readFileSync(new URL('../api/leads/index.js', import.meta.url), 'utf8');
  assert.match(source, /createOutboxInsertQuery\(sql, triPayload\)/);
  assert.match(source, /sql\.transaction\(\[leadInsert, outboxInsert\]\)/);
  assert.match(source, /tri_external_id/);
});

test('outbox implements lease recovery and unique event ids', () => {
  const source = fs.readFileSync(new URL('../api/_lib/tri-outbox.js', import.meta.url), 'utf8');
  assert.match(source, /event_id TEXT NOT NULL UNIQUE/);
  assert.match(source, /FOR UPDATE SKIP LOCKED/);
  assert.match(source, /lease_until/);
  assert.match(source, /status = 'delivered'/);
});
