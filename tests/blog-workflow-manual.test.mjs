import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import yaml from 'js-yaml';
import {validateWorkflowSecurityOverlay} from '../scripts/tri-source-evidence-policy.mjs';

const workflow=yaml.load(fs.readFileSync('.github/workflows/e2e.yml','utf8'));
const pathset=[
 '.github/workflows/e2e.yml',
 '.ross/ci.json',
 'package.json',
 'package-lock.json',
 'scripts/tri-evidence-check.mjs',
 'scripts/tri-source-evidence-policy.mjs',
 'harness/BLOG_GHA_MANUAL_SECURITY_PATCH_20261010.json',
 'tests/blog-workflow-manual.test.mjs',
 'docs/BLOG_GHA_MANUAL_SECURITY_PATCH_20261010.md',
];
const pinned={
 'actions/checkout':'11d5960a326750d5838078e36cf38b85af677262',
 'actions/setup-node':'49933ea5288caeca8642d1e84afbd3f7d6820020',
 'actions/upload-artifact':'ea165f8d65b6e75b540449e92b4886f43607fa02',
};
const manifest={schema:'tri-blog-workflow-hardening/1',project:'blog-plano-saude',
 scope:'github-actions-manual-pinned-only',
 base_main_sha:'f26a4b4162513dad12e143eb0805940ff081bf3a',
 paths:pathset,auto_dispatch:false,production_authorized:false,
 deploy_authorized:false,deployed:false,ross_certified:false};
const good={manifest,changedSinceBase:pathset,baseInAncestry:true,
 workflowValid:true,securityGate:true,vercel:{git:{deploymentEnabled:false}}};
test('E2E workflow must be manually dispatched, never spend GitHub Actions on push or PR',()=>{
 assert.deepEqual(Object.keys(workflow.on),['workflow_dispatch']);
 assert.deepEqual(workflow.permissions,{contents:'read'});
 assert.ok(workflow.jobs.playwright['timeout-minutes']<=30);
});
test('workflow pins approved actions to immutable 40-char SHAs and uses locked npm',()=>{
 const steps=workflow.jobs.playwright.steps;
 assert.equal(steps.filter(s=>s.uses).length,3);
 for(const step of steps.filter(s=>s.uses)){
   const [name,sha]=step.uses.split('@');
   assert.match(sha,/^[a-f0-9]{40}$/);
   assert.equal(sha,pinned[name],name);
 }
 assert.equal(steps.find(x=>x.uses?.startsWith('actions/setup-node@')).with['node-version'],22);
 assert.equal(steps.find(x=>x.uses?.startsWith('actions/checkout@')).with['persist-credentials'],false);
 assert.ok(steps.some(s=>s.run==='npm ci --ignore-scripts --no-audit --no-fund'));
});
test('full runtime, build and workflow source security gates remain active',()=>{
 const cmds=JSON.parse(fs.readFileSync('.ross/ci.json','utf8')).security.commands.map(x=>x.command);
 assert.deepEqual(cmds,[
  'npm audit --omit=dev --audit-level=moderate --no-fund',
  'npm audit --audit-level=moderate --no-fund',
  'node --test tests/blog-workflow-manual.test.mjs',
  'node scripts/tri-security-check.mjs',
 ]);
});
test('separate workflow-only source overlay does not promote history or deploy',()=>{
 assert.deepEqual(validateWorkflowSecurityOverlay({...good}),{scope:'github-actions-manual-pinned-only',ross:'REQUIRED',deploy:'HOLD'});
});
test('workflow overlay fails closed on scope, identity, provenance and unauthorized deploy',()=>{
 const check=x=>validateWorkflowSecurityOverlay({...good,...x});
 assert.throws(()=>check({changedSinceBase:[...pathset,'src/App.jsx']}),/unexpected_workflow_diff/);
 assert.throws(()=>check({baseInAncestry:false}),/workflow_base_not_ancestor/);
 assert.throws(()=>check({manifest:{...manifest,paths:[...pathset,'src/App.jsx']}}),/workflow_identity_mismatch/);
 assert.throws(()=>check({manifest:{...manifest,production_authorized:true}}),/workflow_identity_mismatch/);
 assert.throws(()=>check({manifest:{...manifest,ross_certified:true}}),/workflow_identity_mismatch/);
 assert.throws(()=>check({workflowValid:false}),/unsafe_workflow/);
 assert.throws(()=>check({securityGate:false}),/workflow_security_gate_missing/);
 assert.throws(()=>check({vercel:{git:{deploymentEnabled:true}}}),/git_auto_deploy_not_disabled/);
});
