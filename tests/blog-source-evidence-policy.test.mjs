import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { validateSourceEvidenceOverlay } from '../scripts/tri-source-evidence-policy.mjs';

const original=JSON.parse(fs.readFileSync('harness/TRI_ALIGNMENT_VALIDATION.json','utf8'));
const candidate=JSON.parse(fs.readFileSync('harness/BLOG_SOURCE_CERT_CANDIDATE_20261009.json','utf8'));
const actualGovernanceDigests={
 'AGENTS.md':crypto.createHash('sha256').update(fs.readFileSync('AGENTS.md')).digest('hex'),
 'docs/TRI_OG_CRM360_INBOUND_BOUNDARY_20261008.md':crypto.createHash('sha256').update(fs.readFileSync('docs/TRI_OG_CRM360_INBOUND_BOUNDARY_20261008.md')).digest('hex')
};
const input={
 actualGovernanceDigests,
 original,candidate,
 vercel:JSON.parse(fs.readFileSync('vercel.json','utf8')),
 changedHistorical:[...original.allowed_post_validation_paths,...candidate.existing_history_paths,...candidate.source_change_paths],
 changedCurrent:[...candidate.source_change_paths],
};
const check=patch=>validateSourceEvidenceOverlay({...input,...patch});
test('historical certificate is not promoted as current certificate',()=>{
 const v=check({});
 assert.equal(v.historical,'PASS');
 assert.equal(v.current_source,'ROSS_NOT_CERTIFIED');
 assert.equal(v.deploy,'HOLD');
});
test('rejects undeclared API changes and broad allowlists',()=>{
 assert.throws(()=>check({changedHistorical:[...input.changedHistorical,'api/leads/index.js']}),/unexpected_historical_diff/);
 assert.throws(()=>check({changedCurrent:['src/App.tsx']}),/unexpected_current_diff/);
 const c=JSON.parse(JSON.stringify(candidate));c.existing_history_paths.push('api/leads/index.js');
 assert.throws(()=>check({candidate:c}),/candidate_evidence_allowlist_mismatch/);
});
test('rejects candidate status or baseline impersonation',()=>{
 for(const x of [{ross_certified:true},{deployed:true},{deploy_authorized:true},
   {base_main_sha:'a'.repeat(40)},{validated_functional_sha:'b'.repeat(40)}]){
  assert.throws(()=>check({candidate:{...candidate,...x}}),/source_identity_mismatch/);
 }
});
test('preserves manual deployment freeze and exact evidence scope',()=>{
 assert.throws(()=>check({vercel:{...input.vercel,git:{deploymentEnabled:true}}}),/git_auto_deploy_not_disabled/);
 assert.equal(input.original.bundle_fail,0);
 assert.equal(input.original.bundle_skip,0);
});

test('CRM360 inbound documentary overlay is explicitly hashed and rejects content drift',()=>{
 const altered=structuredClone(candidate);
 altered.inbound_doc_digests['AGENTS.md']='0'.repeat(64);
 assert.throws(()=>check({candidate:altered}),/inbound_governance_sha256_mismatch/);
 const widened=structuredClone(candidate);
 widened.inbound_doc_digests['api/leads/index.js']='f'.repeat(64);
 assert.throws(()=>check({candidate:widened}),/inbound_governance_sha256_mismatch/);
 const corrupt={...actualGovernanceDigests,'docs/TRI_OG_CRM360_INBOUND_BOUNDARY_20261008.md':'e'.repeat(64)};
 assert.throws(()=>check({actualGovernanceDigests:corrupt}),/inbound_governance_sha256_mismatch/);
});
