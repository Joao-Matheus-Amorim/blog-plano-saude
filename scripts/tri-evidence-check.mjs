#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { validateSourceEvidenceOverlay, validateRuntimeSecurityOverlay, runtimeSecurityPaths, validateBuildSecurityOverlay, buildSecurityPaths } from './tri-source-evidence-policy.mjs';

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
const buildManifest=JSON.parse(fs.readFileSync(path.join(ROOT,'harness','BLOG_BUILD_SECURITY_PATCH_20261010.json'),'utf8'));
const buildPaths=buildSecurityPaths();
const buildBase=buildManifest.base_main_sha;
let buildBaseInAncestry=true;
try {
  execFileSync('git',['-C',ROOT,'merge-base','--is-ancestor',buildBase,'HEAD'],{stdio:'ignore'});
} catch { buildBaseInAncestry=false; }
const buildChanged=git(['diff','--name-only',buildBase+'..HEAD']).split('\n').filter(Boolean);
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
const viteConfig=(await import('../vite.config.js')).default;
const chunk= viteConfig?.build?.rollupOptions?.output?.manualChunks;
const bundlerConfigValid= viteConfig?.build?.minify==='oxc' &&
 viteConfig?.build?.sourcemap===false && typeof chunk==='function' &&
 chunk('/node_modules/react/index.js')==='react-vendor' &&
 chunk('/node_modules/react-router-dom/index.js')==='react-vendor' &&
 chunk('/node_modules/framer-motion/index.js')==='animation-vendor' &&
 chunk('/src/App.jsx')===undefined;
try {
 validateBuildSecurityOverlay({
  manifest:buildManifest,changedSinceBase:buildChanged,
  baseInAncestry:buildBaseInAncestry,pkg:packageJson,lock:packageLock,
  bundlerConfigValid,
  securityCommands:cfgROSS.security.commands.map((x)=>x.command),
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
const historicalSourceDiff = changed.filter(file=>!runtimePaths.includes(file) && !buildPaths.includes(file));
const currentSourceDiff = currentDiff.filter(file=>!runtimePaths.includes(file) && !buildPaths.includes(file));
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
globalThis.console.log(`validated_functional_sha=${evidence.validated_functional_sha}`);
globalThis.console.log(`post_validation_files=${changed.length}`);
