import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';

const root = process.cwd();
const fail = (message) => {
  console.error(`TRI_ECOSYSTEM_CONSISTENCY_FAIL: ${message}`);
  process.exit(1);
};
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const json = (p) => JSON.parse(read(p));
const requireTerms = (p, terms) => {
  const text = read(p).toLowerCase();
  const missing = terms.filter((term) => !text.includes(term.toLowerCase()));
  if (missing.length) fail(`${p} missing ${missing.join(', ')}`);
};
const sha256 = (p) => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, p))).digest('hex');

const baseline = json('harness/TRI_ECOSYSTEM_BASELINE.json');
if (baseline.schema !== 'tri-ecosystem-local-baseline/1.0') fail('unexpected baseline schema');
if (baseline.release_id !== 'TRI-STATE-2026-08-30-01') fail('release id drifted');
if (baseline.authority !== 'Joao-Matheus-Amorim/tri-ecosystem') fail('authority drifted');
if (baseline.local_repository !== 'Joao-Matheus-Amorim/blog-plano-saude') fail('wrong local repository');
if (baseline.local_role !== 'inbound_seo_content_and_original_demand_capture') fail('Blog ownership drifted');
if (baseline.radar_product_epoch !== 'RADAR-V6-OPPORTUNITY-KRAKEN') fail('Radar product epoch drifted');
if (baseline.radar_opportunity_model !== 'OPPORTUNITY_POTENTIAL') fail('Radar opportunity model drifted');
if (baseline.radar_latest_certified_product_batch !== 19) fail('Radar certified batch drifted');
if (baseline.radar_production_observed !== false) fail('Radar production cannot be claimed observed');
if (baseline.production_truth?.blog_to_crm !== 'OBSERVED_IN_PRODUCTION') fail('Blog -> CRM truth drifted');
if (baseline.production_truth?.radar_to_crm_to_radar !== 'PRODUCTION_RUNTIME_PENDING_NOT_OBSERVED') fail('Radar production truth drifted');
if (baseline.privacy?.radar_evolution_does_not_expand_blog_consent_scope !== true) fail('Radar cannot expand Blog consent scope');
if (baseline.privacy?.sensitive_health_inference_for_sales !== false) fail('sensitive health inference must remain false');

const hashes = baseline.contracts?.global_hashes || {};
for (const filename of baseline.contracts?.local_locked_contracts || []) {
  const expected = hashes[filename];
  const file = `contracts/tri-contracts-1.0/${filename}`;
  if (!fs.existsSync(path.join(root, file))) fail(`missing local TRI contract: ${filename}`);
  if (sha256(file) !== expected) fail(`TRI contract content mismatch: ${filename}`);
}

requireTerms('PROJECT_MEMORY.md', [
  'TRI-STATE-2026-08-30-01',
  'RADAR-V6-OPPORTUNITY-KRAKEN',
  'OPPORTUNITY_POTENTIAL',
  'Blog → CRM',
  'OBSERVED_IN_PRODUCTION',
  'Radar → CRM → Radar',
  'PRODUCTION_RUNTIME_PENDING_NOT_OBSERVED',
]);
requireTerms('ECOSYSTEM.md', [
  'TRI-STATE-2026-08-30-01',
  'Radar V6',
  'OPPORTUNITY_POTENTIAL',
  'consent',
]);
requireTerms('SECURITY_MODEL.md', [
  'dados clínicos',
  'inferências sensíveis',
]);

console.log('TRI_ECOSYSTEM_CONSISTENCY_PASS');
console.log('release_id=TRI-STATE-2026-08-30-01');
console.log('local_role=inbound_seo_content_and_original_demand_capture');
console.log('blog_to_crm=OBSERVED_IN_PRODUCTION');
console.log('radar_production_observed=false');
