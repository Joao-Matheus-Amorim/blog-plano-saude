import test from 'node:test';
import assert from 'node:assert/strict';
import * as policy from '../scripts/tri-source-evidence-policy.mjs';

const paths=[
 '.ross/ci.json','package.json','package-lock.json','vite.config.js',
 'scripts/tri-evidence-check.mjs','scripts/tri-source-evidence-policy.mjs',
 'harness/BLOG_BUILD_SECURITY_PATCH_20261010.json',
 'tests/blog-vite8-bundler.test.mjs','tests/blog-vite8-security-overlay.test.mjs',
 'docs/BLOG_BUILD_SECURITY_PATCH_20261010.md',
];
const manifest={schema:'tri-blog-build-security-candidate/1',project:'blog-plano-saude',
 scope:'build-security-only',base_main_sha:'50853e987d3244cad3c3341bcf24683274966890',
 paths,vite_version:'8.3.4',plugin_react_version:'6.1.2',
 production_authorized:false,deploy_authorized:false,deployed:false,ross_certified:false};
const pkg={devDependencies:{vite:'8.3.4','@vitejs/plugin-react':'6.1.2'}};
const lock={packages:{'node_modules/vite':{version:'8.3.4'},'node_modules/@vitejs/plugin-react':{version:'6.1.2'}}};
const commands=[
 'npm audit --omit=dev --audit-level=moderate --no-fund',
 'npm audit --audit-level=moderate --no-fund',
 'node scripts/tri-security-check.mjs'
];
const input={manifest,changedSinceBase:paths,baseInAncestry:true,pkg,lock,
 bundlerConfigValid:true,securityCommands:commands,vercel:{git:{deploymentEnabled:false}}};
const check=extra=>policy.validateBuildSecurityOverlay?.({...input,...extra});
test('strict source-only build remediation requires fresh ROSS and manual deploy',()=>{
 assert.deepEqual(check({}),{scope:'build-security-only',ross:'REQUIRED',deploy:'HOLD'});
});
test('not a general-purpose source allowlist',()=>{
 for(const file of ['src/App.jsx','api/leads/index.js','src/components/Header.jsx'])
  assert.throws(()=>check({changedSinceBase:[...paths,file]}),/unexpected_build_security_diff/);
});
test('rejects identity forgery, missing baseline and production authorization',()=>{
 for(const bad of [
  {base_main_sha:'a'.repeat(40)}, {paths:[...paths,'src/App.jsx']},
  {scope:'source-only'}, {ross_certified:true},{production_authorized:true},
  {deployed:true},{deploy_authorized:true}
 ]) assert.throws(()=>check({manifest:{...manifest,...bad}}),/build_security_identity_mismatch/);
 assert.throws(()=>check({baseInAncestry:false}),/build_security_base_not_ancestor/);
 assert.throws(()=>check({vercel:{git:{deploymentEnabled:true}}}),/git_auto_deploy_not_disabled/);
});
test('rejects unpinned Vite, incompatible plugin, bundle drift and missing security audit',()=>{
 assert.throws(()=>check({pkg:{devDependencies:{vite:'^8.3.4','@vitejs/plugin-react':'6.1.2'}}}),/build_security_versions_mismatch/);
 assert.throws(()=>check({lock:{packages:{...lock.packages,'node_modules/@vitejs/plugin-react':{version:'5.0.0'}}}}),/build_security_versions_mismatch/);
 assert.throws(()=>check({bundlerConfigValid:false}),/unsafe_bundler_config/);
 assert.throws(()=>check({securityCommands:commands.filter(x=>!x.startsWith('npm audit --audit-level'))}),/full_audit_gate_missing/);
});
