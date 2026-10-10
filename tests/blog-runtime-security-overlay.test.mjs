import test from 'node:test';
import assert from 'node:assert/strict';
import * as policy from '../scripts/tri-source-evidence-policy.mjs';

const approvedPaths=[
  '.ross/ci.json',
  'package.json',
  'package-lock.json',
  'scripts/tri-evidence-check.mjs',
  'scripts/tri-source-evidence-policy.mjs',
  'harness/BLOG_RUNTIME_SECURITY_PATCH_20261010.json',
  'tests/blog-runtime-security-overlay.test.mjs',
  'docs/BLOG_ROUTER_SECURITY_PATCH_20261010.md',
];
const manifest={
 schema:'tri-blog-runtime-security-candidate/1',
 project:'blog-plano-saude',
 scope:'dependency-security-only',
 base_certified_main_sha:'945fcea42ce221f046391913226bdeb0a93e7e13',
 paths:approvedPaths,
 package_name:'react-router-dom',
 package_version:'7.18.4',
 production_authorized:false,
 deploy_authorized:false,
 deployed:false,
 ross_certified:false,
};
const packageJson={dependencies:{'react-router-dom':'7.18.4'}};
const packageLock={packages:{
 'node_modules/react-router-dom':{version:'7.18.4'},
 'node_modules/react-router':{version:'7.18.4'},
}};
const input={manifest,changedSinceBase:[...approvedPaths],packageJson,packageLock,auditGate:true,baseInAncestry:true,vercel:{git:{deploymentEnabled:false}}};
const check=patch=>policy.validateRuntimeSecurityOverlay?.({...input,...patch});
test('an explicit dependency-only remediation is eligible for a fresh ROSS source certificate',()=>{
  assert.deepEqual(check({}),{scope:'dependency-security-only',source:'ROSS_REQUIRED',deploy:'HOLD'});
});
test('the security gate rejects unrelated app, API, or forms changes',()=>{
 for (const forbidden of ['src/App.jsx','api/leads/index.js','src/components/Header.jsx'])
  assert.throws(()=>check({changedSinceBase:[...approvedPaths,forbidden]}),/unexpected_runtime_security_diff/);
});
test('the security gate rejects scope expansion and baseline impersonation',()=>{
 for (const field of [
  {paths:[...approvedPaths,'src/App.jsx']},
  {base_certified_main_sha:'a'.repeat(40)},
  {scope:'source-only'}, {ross_certified:true}, {deployed:true},
  {production_authorized:true}, {deploy_authorized:true}, {package_version:'7.18.0'}
 ]) assert.throws(()=>check({manifest:{...manifest,...field}}),/runtime_security_identity_mismatch/);
 assert.throws(()=>check({baseInAncestry:false}),/runtime_security_base_not_ancestor/);
});
test('exact direct and transitive production versions must be pinned',()=>{
 assert.throws(()=>check({packageJson:{dependencies:{'react-router-dom':'^7.18.4'}}}),/runtime_router_version_mismatch/);
 assert.throws(()=>check({packageLock:{packages:{...packageLock.packages,'node_modules/react-router':{version:'7.18.0'}}}}),/runtime_router_version_mismatch/);
 assert.throws(()=>check({packageLock:{packages:{...packageLock.packages,'node_modules/@remix-run/router':{version:'1.23.0'}}}}),/obsolete_runtime_router_present/);
});
test('missing audit gate or enabled auto deploy blocks publication',()=>{
 assert.throws(()=>check({vercel:{git:{deploymentEnabled:true}}}),/git_auto_deploy_not_disabled/);
 assert.throws(()=>check({auditGate:false}),/runtime_security_audit_missing/);
 assert.throws(()=>check({changedSinceBase:approvedPaths.filter(x=>x!=='package-lock.json')}),/security_patch_missing_lock_or_manifest/);
});
