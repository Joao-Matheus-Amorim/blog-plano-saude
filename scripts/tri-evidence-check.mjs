#!/usr/bin/env node
/* eslint-env node */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const evidencePath = path.join(ROOT, 'harness', 'TRI_ALIGNMENT_VALIDATION.json');
const evidence = JSON.parse(fs.readFileSync(evidencePath, 'utf8'));
const fail = (message) => {
  console.error(`TRI_EVIDENCE_FAIL: ${message}`);
  process.exit(1);
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

const allowed = new Set(evidence.allowed_post_validation_paths || []);
const changed = git(['diff', '--name-only', `${evidence.validated_functional_sha}..HEAD`]).split('\n').filter(Boolean);
const unexpected = changed.filter((file) => !allowed.has(file));
if (unexpected.length) fail(`functional/config changes after validated SHA: ${unexpected.join(', ')}`);

for (const [label, file, expected] of [
  ['bundle result', evidence.bundle_result, evidence.bundle_result_sha256],
  ['bundle certificate', evidence.bundle_certificate, evidence.bundle_certificate_sha256],
]) {
  if (!fs.existsSync(file)) fail(`${label} not found on worker: ${file}`);
  const actual = sha256(file);
  if (actual !== expected) fail(`${label} SHA-256 mismatch: expected=${expected} actual=${actual}`);
}

console.log('TRI_EVIDENCE_PASS');
console.log(`validated_functional_sha=${evidence.validated_functional_sha}`);
console.log(`post_validation_files=${changed.length}`);
