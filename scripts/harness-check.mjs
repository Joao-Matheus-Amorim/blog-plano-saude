import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import process from 'node:process';

const root = process.cwd();
const errors = [];
const warnings = [];

const required = [
  'PROJECT_MEMORY.md',
  'harness/README.md',
  'harness/PRODUCTION_HARNESS.md',
  'harness/DATA_OWNERSHIP.md',
  'harness/SECURITY_MODEL.md',
  'harness/INTEGRATION_MATRIX.md',
  'harness/E2E_FLOWS.md',
  'harness/TEST_MATRIX.md',
  'harness/SCHEMA_EVOLUTION.md',
  'harness/ENVIRONMENT_MATRIX.md',
  'harness/OBSERVABILITY.md',
  'harness/RUNBOOK.md',
  'harness/RELEASE_CHECKLIST.md',
  'harness/ZERO_COST_POLICY.md',
  'harness/DEBT_REGISTER.md',
  'harness/CHANGE_PROTOCOL.md',
  'harness/WORK_SESSION_PROTOCOL.md',
  'harness/ECOSYSTEM_COMPATIBILITY.md',
  'harness/ADR_TEMPLATE.md',
  'harness/STATE.json',
  'harness/contracts/README.md',
  'harness/contracts/LOCK.json',
];

function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}

function read(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8');
}

function sha256(text) {
  return crypto.createHash('sha256').update(text, 'utf8').digest('hex');
}

for (const rel of required) {
  if (!exists(rel)) errors.push(`missing required file: ${rel}`);
}

if (exists('PROJECT_MEMORY.md')) {
  const memory = read('PROJECT_MEMORY.md');
  if (!memory.includes('OG-HARNESS/1.0')) errors.push('PROJECT_MEMORY missing OG-HARNESS/1.0');
  if (!memory.includes('og-contracts/1.0')) errors.push('PROJECT_MEMORY missing og-contracts/1.0');
  if (!memory.includes('R$ 0')) warnings.push('PROJECT_MEMORY does not visibly mention R$ 0');
}

let state = null;
if (exists('harness/STATE.json')) {
  try {
    state = JSON.parse(read('harness/STATE.json'));
    if (state.harness_version !== 'OG-HARNESS/1.0') errors.push(`STATE harness_version=${state.harness_version}`);
    if (state.contract_version !== 'og-contracts/1.0') errors.push(`STATE contract_version=${state.contract_version}`);
    if (state.project !== 'blog-plano-saude') errors.push(`STATE project=${state.project}`);
  } catch (error) {
    errors.push(`STATE.json invalid JSON: ${error.message}`);
  }
}

if (exists('harness/contracts/LOCK.json')) {
  try {
    const lock = JSON.parse(read('harness/contracts/LOCK.json'));
    if (lock.contract_version !== 'og-contracts/1.0') errors.push(`LOCK contract_version=${lock.contract_version}`);
    for (const [name, meta] of Object.entries(lock.schemas || {})) {
      const rel = `harness/contracts/${name}`;
      if (!exists(rel)) {
        errors.push(`LOCK references missing schema: ${name}`);
        continue;
      }
      const actual = sha256(read(rel));
      if (actual !== meta.sha256) errors.push(`schema hash mismatch: ${name}\n expected ${meta.sha256}\n actual   ${actual}`);
    }
  } catch (error) {
    errors.push(`LOCK.json invalid JSON: ${error.message}`);
  }
}

if (exists('harness/DEBT_REGISTER.md')) {
  const debt = read('harness/DEBT_REGISTER.md');
  if (!debt.includes('D-')) warnings.push('DEBT_REGISTER has no explicit debt IDs');
}

console.log('OG Plano Saúde harness check');
console.log(`root: ${root}`);
for (const warning of warnings) console.warn(`WARN: ${warning}`);

if (errors.length) {
  for (const error of errors) console.error(`FAIL: ${error}`);
  console.error(`Harness FAILED with ${errors.length} error(s).`);
  process.exit(1);
}

console.log('Harness PASS: memory, state and contract locks are internally consistent.');
