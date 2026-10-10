import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { validateSourceEvidenceOverlay } from '../scripts/tri-source-evidence-policy.mjs';

const original=JSON.parse(fs.readFileSync('harness/TRI_ALIGNMENT_VALIDATION.json','utf8'));
const candidate=JSON.parse(fs.readFileSync('harness/BLOG_SOURCE_CERT_CANDIDATE_20261009.json','utf8'));
const input={
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
