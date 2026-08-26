import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import test from 'node:test';
import { URL } from 'node:url';

import {
  TRI_CONTRACT_VERSION,
  TRI_LEAD_EVENT,
  TRI_MAX_DELIVERY_ATTEMPTS,
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

test('lead event normalizes every contract boundary before enqueue', () => {
  const event = buildTriLeadEvent({
    externalId: '8dd41714-1c9a-465b-b06c-9239e9b13f00',
    occurredAt: '2026-08-24T13:00:00.000Z',
    name: 'N'.repeat(200),
    phone: '1'.repeat(50),
    email: `${'e'.repeat(300)}@example.com`,
    city: 'C'.repeat(120),
    state: 'Rio de Janeiro',
    lives: 10001,
    planType: 'P'.repeat(200),
    consentLgpd: false,
    attribution: {
      origin: 'O'.repeat(200),
      channel: 'C'.repeat(200),
      page: 'P'.repeat(700),
      referrer: 'R'.repeat(1200),
      utm_source: 'S'.repeat(300),
      fbclid: 'F'.repeat(700),
    },
  });

  assert.equal(event.lead.name.length, 120);
  assert.equal(event.lead.phone.length, 32);
  assert.equal(event.lead.email.length, 254);
  assert.equal(event.lead.city.length, 80);
  assert.equal(event.lead.state, null);
  assert.equal(event.lead.lives, null);
  assert.equal(event.lead.plan_type.length, 120);
  assert.equal(event.attribution.origin.length, 120);
  assert.equal(event.attribution.channel.length, 120);
  assert.equal(event.attribution.page.length, 500);
  assert.equal(event.attribution.referrer.length, 1000);
  assert.equal(event.attribution.utm_source.length, 250);
  assert.equal(event.attribution.fbclid.length, 500);
});

test('lead event rejects required values that cannot satisfy the contract', () => {
  assert.throws(() => buildTriLeadEvent({
    externalId: '8dd41714-1c9a-465b-b06c-9239e9b13f00',
    occurredAt: '2026-08-24T13:00:00.000Z',
    name: '',
    phone: '21999990000',
    consentLgpd: true,
  }));

  assert.throws(() => buildTriLeadEvent({
    externalId: '8dd41714-1c9a-465b-b06c-9239e9b13f00',
    occurredAt: '2026-08-24T13:00:00.000Z',
    name: 'Cliente',
    phone: '123',
    consentLgpd: true,
  }));
});

test('retry backoff grows and remains capped', () => {
  assert.equal(retryDelaySeconds(1), 15);
  assert.equal(retryDelaySeconds(2), 30);
  assert.equal(retryDelaySeconds(5), 240);
  assert.equal(retryDelaySeconds(20), 3600);
  assert.equal(TRI_MAX_DELIVERY_ATTEMPTS, 10);
});

test('lead capture source keeps lead and outbox in the same Neon transaction', () => {
  const source = fs.readFileSync(new URL('../api/leads/index.js', import.meta.url), 'utf8');
  assert.match(source, /createOutboxInsertQuery\(sql, triPayload\)/);
  assert.match(source, /sql\.transaction\(\[leadInsert, outboxInsert\]\)/);
  assert.match(source, /tri_external_id/);
  assert.match(source, /telefoneFinal\.length < 6/);
});

test('recovery operations stay authenticated inside the existing lead function', () => {
  const source = fs.readFileSync(new URL('../api/leads/index.js', import.meta.url), 'utf8');
  assert.match(source, /tri-drain/);
  assert.match(source, /tri-dead-list/);
  assert.match(source, /tri-requeue-dead/);
  assert.match(source, /TRI_OUTBOX_DRAIN_SECRET/);
  assert.match(source, /secureSecretEqual/);
  assert.doesNotMatch(source, /tri_outbox_queued:\s*false/);
});

test('outbox implements lease, dead-letter, requeue and unique event ids', () => {
  const source = fs.readFileSync(new URL('../api/_lib/tri-outbox.js', import.meta.url), 'utf8');
  assert.match(source, /event_id TEXT NOT NULL UNIQUE/);
  assert.match(source, /FOR UPDATE SKIP LOCKED/);
  assert.match(source, /lease_until/);
  assert.match(source, /dead_lettered_at/);
  assert.match(source, /MAX_DELIVERY_ATTEMPTS/);
  assert.match(source, /requeueDeadTriEvents/);
  assert.match(source, /status = 'delivered'/);
});
