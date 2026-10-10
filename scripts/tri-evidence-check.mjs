#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { validateSourceEvidenceOverlay, validateRuntimeSecurityOverlay, runtimeSecurityPaths, validateBuildSecurityOverlay, buildSecurityPaths, validateWorkflowSecurityOverlay, workflowSecurityPaths } from './tri-source-evidence-policy.mjs';
import yaml from 'js-yaml';

const ROOT = path.resolve(path.dirname(new globalThis.URL(import.meta.url).pathname), '..');
const evidencePath = path.join(ROOT, 'harness', 'TRI_ALIGNMENT_VALIDATION.json');
const evidence = JSON.parse(fs.readFileSync(evidencePath, 'utf8'));
const fail = (message) => {
  globalThis.console.error(`TRI_EVIDENCE_FAIL: ${message}`);
  globalThis.process.exit(1);
};
const git = (args, options = {}) => execFileSync('git', ['-C', ROOT, ...args], { encoding: 'utf8', ...options }).trim();
const sha256 = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');

if (evidence.project !== 'blog-plano-saude') fail('project mismatch');
if (evidence.status !== 'pass') fail('evidence status must be pass');
if (evidence.production_authorized !== false) fail('Production must remain unauthorized');
if (evidence.bundle_fail !== 0 || evidence.bundle_skip !== 0) fail('certified Bundle must have FAIL=0 and SKIP=0');

try {
  execFileSync('git', ['-C', ROOT, 'merge-base', '--is-ancestor', evidence.validated_functional_sha, 'HEAD'], { stdio: 'ignore' });
} catch {
  fail(`validated functional SHA is not an ancestor: ${evidence.validated_functional_sha}`);
}

const candidate = JSON.parse(fs.readFileSync(path.join(ROOT,'harness','BLOG_SOURCE_CERT_CANDIDATE_20261009.json'),'utf8'));
const changed = git(['diff','--name-only',evidence.validated_functional_sha+'..HEAD']).split('\n').filter(Boolean);
let currentDiff;
try {
  execFileSync('git',['-C',ROOT,'merge-base','--is-ancestor',candidate.base_main_sha,'HEAD'],{stdio:'ignore'});
  currentDiff=git(['diff','--name-only',candidate.base_main_sha+'..HEAD']).split('\n').filter(Boolean);
} catch { fail('source_baseline_not_in_ancestry'); }
const workflowManifest=JSON.parse(fs.readFileSync(path.join(ROOT,'harness','BLOG_GHA_MANUAL_SECURITY_PATCH_20261010.json'),'utf8'));
const workflowPaths=workflowSecurityPaths();
const workflowBase=workflowManifest.base_main_sha;
let workflowBaseInAncestry=true;
try {
 execFileSync('git',['-C',ROOT,'merge-base','--is-ancestor',workflowBase,'HEAD'],{stdio:'ignore'});
} catch { workflowBaseInAncestry=false; }
const workflowChanged=git(['diff','--name-only',workflowBase+'..HEAD']).split('\n').filter(Boolean);
const buildManifest=JSON.parse(fs.readFileSync(path.join(ROOT,'harness','BLOG_BUILD_SECURITY_PATCH_20261010.json'),'utf8'));
const buildPaths=buildSecurityPaths();
const buildBase=buildManifest.base_main_sha;
let buildBaseInAncestry=true;
try {
  execFileSync('git',['-C',ROOT,'merge-base','--is-ancestor',buildBase,'HEAD'],{stdio:'ignore'});
} catch { buildBaseInAncestry=false; }
// Freeze the preceding source patch at the certified main before new workflow changes.
const buildChanged=git(['diff','--name-only',buildBase+'..'+workflowBase]).split('\n').filter(Boolean);
const runtimeManifest = JSON.parse(fs.readFileSync(path.join(ROOT,'harness','BLOG_RUNTIME_SECURITY_PATCH_20261010.json'),'utf8'));
const baseMain = runtimeManifest.base_certified_main_sha;
let baseInAncestry = true;
try {
  execFileSync('git',['-C',ROOT,'merge-base','--is-ancestor',baseMain,'HEAD'],{stdio:'ignore'});
} catch { baseInAncestry=false; }
// Validate the predecessor patch against its historical main-to-main diff,
// not the build-security change introduced afterward.
const changedSinceBase = git(['diff','--name-only',baseMain+'..'+buildBase]).split('\n').filter(Boolean);
const auditConfigured=JSON.parse(fs.readFileSync(path.join(ROOT,'.ross','ci.json'),'utf8'))
  ?.security?.commands?.some(x=>typeof x==='object' &&
    x.name==='Production dependency audit' &&
    x.command==='npm audit --omit=dev --audit-level=moderate --no-fund');
const packageJson=JSON.parse(fs.readFileSync(path.join(ROOT,'package.json'),'utf8'));
const packageLock=JSON.parse(fs.readFileSync(path.join(ROOT,'package-lock.json'),'utf8'));
const runtimePaths=runtimeSecurityPaths();
const cfgROSS=JSON.parse(fs.readFileSync(path.join(ROOT,'.ross','ci.json'),'utf8'));
// The Vite security source overlay is an immutable prior main-to-main fact.
// Validate its ROSS command set at that SHA, not against later, stronger gates.
const priorBuildROSS=JSON.parse(git(['show',workflowBase+':.ross/ci.json']));

const viteConfig=(await import('../vite.config.js')).default;
const chunk= viteConfig?.build?.rollupOptions?.output?.manualChunks;
const bundlerConfigValid= viteConfig?.build?.minify==='oxc' &&
 viteConfig?.build?.sourcemap===false && typeof chunk==='function' &&
 chunk('/node_modules/react/index.js')==='react-vendor' &&
 chunk('/node_modules/react-router-dom/index.js')==='react-vendor' &&
 chunk('/node_modules/framer-motion/index.js')==='animation-vendor' &&
 chunk('/src/App.jsx')===undefined;
const yamlWorkflow=yaml.load(fs.readFileSync(path.join(ROOT,'.github','workflows','e2e.yml'),'utf8'));
const approvedPins=new Map([
 ['actions/checkout','11d5960a326750d5838078e36cf38b85af677262'],
 ['actions/setup-node','49933ea5288caeca8642d1e84afbd3f7d6820020'],
 ['actions/upload-artifact','ea165f8d65b6e75b540449e92b4886f43607fa02'],
]);
const wSteps=yamlWorkflow?.jobs?.playwright?.steps;
const invoked=Array.isArray(wSteps)?wSteps.filter(x=>x?.uses):[];
const workflowValid=Object.keys(yamlWorkflow?.on||{}).length===1 &&
 Object.hasOwn(yamlWorkflow.on,'workflow_dispatch') &&
 yamlWorkflow?.permissions?.contents==='read' &&
 Object.keys(yamlWorkflow?.permissions||{}).length===1 &&
 Number(yamlWorkflow?.jobs?.playwright?.['timeout-minutes'])<=30 &&
 invoked.length===3 &&
 invoked.every(x=>{
  const [name,sha]=x.uses.split('@');
  return sha===approvedPins.get(name) && /^[a-f0-9]{40}$/.test(sha);
 }) &&
 invoked.find(x=>x.uses.startsWith('actions/checkout@'))?.with?.['persist-credentials']===false &&
 Number(invoked.find(x=>x.uses.startsWith('actions/setup-node@'))?.with?.['node-version'])===22 &&
 wSteps.some(x=>x.run==='npm ci --ignore-scripts --no-audit --no-fund') &&
 packageJson?.devDependencies?.['js-yaml']==='4.3.2' &&
 packageLock?.packages?.['node_modules/js-yaml']?.version==='4.3.2';
const expectedWorkflowSecurityCommands=[
 'npm audit --omit=dev --audit-level=moderate --no-fund',
 'npm audit --audit-level=moderate --no-fund',
 'node --test tests/blog-workflow-manual.test.mjs',
 'node scripts/tri-security-check.mjs',
];
const workflowSecurityGate=JSON.stringify(cfgROSS.security.commands.map(x=>x.command))===
 JSON.stringify(expectedWorkflowSecurityCommands);
try {
 validateWorkflowSecurityOverlay({
  manifest:workflowManifest,changedSinceBase:workflowChanged,
  baseInAncestry:workflowBaseInAncestry,workflowValid,
  securityGate:workflowSecurityGate,
  vercel:JSON.parse(fs.readFileSync(path.join(ROOT,'vercel.json'),'utf8'))
 });
} catch(error) {fail(error.message);}
try {
 validateBuildSecurityOverlay({
  manifest:buildManifest,changedSinceBase:buildChanged,
  baseInAncestry:buildBaseInAncestry,pkg:packageJson,lock:packageLock,
  bundlerConfigValid,
  securityCommands:priorBuildROSS.security.commands.map((x)=>x.command),
  vercel:JSON.parse(fs.readFileSync(path.join(ROOT,'vercel.json'),'utf8'))
 });
} catch(error) { fail(error.message); }
try {
  validateRuntimeSecurityOverlay({
    manifest:runtimeManifest,changedSinceBase,packageJson,packageLock,
    baseInAncestry,auditGate:auditConfigured,
    vercel:JSON.parse(fs.readFileSync(path.join(ROOT,'vercel.json'),'utf8'))
  });
} catch(error) { fail(error.message); }
// Preserve the historical source-only validation unchanged. The new runtime
// security paths are checked independently against their own exact baseline.
const historicalSourceDiff = changed.filter(file=>!runtimePaths.includes(file) && !buildPaths.includes(file) && !workflowPaths.includes(file));
const currentSourceDiff = currentDiff.filter(file=>!runtimePaths.includes(file) && !buildPaths.includes(file) && !workflowPaths.includes(file));
try {
  validateSourceEvidenceOverlay({
    original:evidence,candidate,changedHistorical:historicalSourceDiff,changedCurrent:currentSourceDiff,
    actualGovernanceDigests:{
      'AGENTS.md':sha256(path.join(ROOT,'AGENTS.md')),
      'docs/TRI_OG_CRM360_INBOUND_BOUNDARY_20261008.md':sha256(path.join(ROOT,'docs/TRI_OG_CRM360_INBOUND_BOUNDARY_20261008.md'))
    },
    vercel:JSON.parse(fs.readFileSync(path.join(ROOT,'vercel.json'),'utf8'))
  });
} catch(error) { fail(error.message); }

for (const [label, file, expected] of [
  ['bundle result', evidence.bundle_result, evidence.bundle_result_sha256],
  ['bundle certificate', evidence.bundle_certificate, evidence.bundle_certificate_sha256],
]) {
  if (!fs.existsSync(file)) fail(`${label} not found on worker: ${file}`);
  const actual = sha256(file);
  if (actual !== expected) fail(`${label} SHA-256 mismatch: expected=${expected} actual=${actual}`);
}

globalThis.console.log('TRI_EVIDENCE_PASS');
globalThis.console.log('BLOG_RUNTIME_SECURITY_SCOPE_PASS_DEPLOY_HOLD');
globalThis.console.log('BLOG_BUILD_SECURITY_SCOPE_PASS_DEPLOY_HOLD');
globalThis.console.log('BLOG_WORKFLOW_SECURITY_SCOPE_PASS_DEPLOY_HOLD');
globalThis.console.log(`validated_functional_sha=${evidence.validated_functional_sha}`);
globalThis.console.log(`post_validation_files=${changed.length}`);
