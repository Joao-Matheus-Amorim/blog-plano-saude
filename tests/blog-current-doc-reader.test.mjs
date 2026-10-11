import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {validateDocReaderOverlay,docReaderPaths} from '../scripts/tri-source-evidence-policy.mjs';

const manifest=JSON.parse(fs.readFileSync('harness/BLOG_DOC_READER_PATCH_20261011.json','utf8'));
const originalAgents=execFileSync('git',['show',manifest.base_main_sha+':AGENTS.md']);
const base={
 manifest,changedSinceBase:docReaderPaths(),baseInAncestry:true,
 historicalAgentsDigest:crypto.createHash('sha256').update(originalAgents).digest('hex'),
 readme:fs.readFileSync('README.md','utf8'),
 agents:fs.readFileSync('AGENTS.md','utf8'),
 vercel:JSON.parse(fs.readFileSync('vercel.json','utf8')),
 rossConfig:JSON.parse(fs.readFileSync('.ross/ci.json','utf8'))
};
const check=x=>validateDocReaderOverlay({...base,...x});
test('current reader is accurate and old source evidence stays anchored to certified git object',()=>{
 assert.deepEqual(check({}),{documentation:'PASS',historical:'IMMUTABLE',ross:'REQUIRED',deploy:'HOLD'});
 assert.equal(base.historicalAgentsDigest,manifest.historical_agents_sha256);
});
test('rejects changed historic proof, extraneous or missing files, and fabricated certification',()=>{
 assert.throws(()=>check({historicalAgentsDigest:'0'.repeat(64)}),/doc_reader_historical_agents_changed/);
 assert.throws(()=>check({changedSinceBase:[...base.changedSinceBase,'src/App.jsx']}),/doc_reader_diff_not_exact/);
 assert.throws(()=>check({changedSinceBase:base.changedSinceBase.filter(x=>x!=='AGENTS.md')}),/doc_reader_diff_not_exact/);
 assert.throws(()=>check({manifest:{...manifest,ross_certified:true}}),/doc_reader_identity_mismatch/);
 assert.throws(()=>check({baseInAncestry:false}),/doc_reader_base_not_ancestor/);
});
test('rejects false deployment/runtime language and auto-deploy configuration',()=>{
 assert.throws(()=>check({readme:base.readme.replace('git.deploymentEnabled=false','git.deploymentEnabled=true')}),/doc_reader_deploy_or_runtime_claim_mismatch/);
 assert.throws(()=>check({vercel:{git:{deploymentEnabled:true}}}),/doc_reader_deploy_or_runtime_claim_mismatch/);
});
test('rejects stale Radar lifecycle and removal of privacy boundary',()=>{
 assert.throws(()=>check({agents:base.agents.replace('I3-D = SHADOW_MEASURED','I3-D lifecycle decision = pending')}),/doc_reader_radar_claim_mismatch/);
 assert.throws(()=>check({agents:base.agents.replace('Radar automatic CRM delivery = disabled','Radar automatic CRM delivery = enabled')}),/doc_reader_radar_claim_mismatch/);
 assert.throws(()=>check({rossConfig:{local:[]}}),/doc_reader_regression_gate_missing/);
});
