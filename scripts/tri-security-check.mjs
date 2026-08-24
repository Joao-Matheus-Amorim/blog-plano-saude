#!/usr/bin/env node
/* eslint-env node */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const fail = (message) => {
  console.error(`TRI_SECURITY_FAIL: ${message}`);
  process.exit(1);
};
const git = (args) => execFileSync('git', ['-C', ROOT, ...args], { encoding: 'utf8' }).trim();

const tracked = git(['ls-files']).split('\n').filter(Boolean);
const forbiddenNames = new Set([
  '.env', '.env.local', '.env.production', '.env.development',
  'credentials.json', 'secrets.json', 'service-account.json'
]);
for (const file of tracked) {
  const base = path.basename(file).toLowerCase();
  if (forbiddenNames.has(file.toLowerCase()) || /\.(pem|p12|pfx|key)$/.test(base)) {
    fail(`arquivo sensível versionado: ${file}`);
  }
}

const clientFiles = tracked.filter((file) => file.startsWith('src/') && /\.(js|jsx|ts|tsx|json|css|html)$/.test(file));
const serverSecretPattern = /DATABASE_URL|TRI_[A-Z0-9_]*SECRET|META_ACCESS_TOKEN|CALLMEBOT_APIKEY|PRIVATE_KEY/;
for (const file of clientFiles) {
  const text = fs.readFileSync(path.join(ROOT, file), 'utf8');
  if (serverSecretPattern.test(text)) fail(`nome de segredo server-side exposto no frontend: ${file}`);
}

const envExample = fs.readFileSync(path.join(ROOT, '.env.example'), 'utf8');
for (const line of envExample.split(/\r?\n/)) {
  const match = line.match(/^([A-Z0-9_]*(?:SECRET|TOKEN|APIKEY|DATABASE_URL)[A-Z0-9_]*)=(.*)$/);
  if (!match) continue;
  const value = match[2].trim();
  if (value && !/^<.*>$/.test(value)) fail(`.env.example contém valor não vazio para ${match[1]}`);
}

const outbox = fs.readFileSync(path.join(ROOT, 'api/_lib/tri-outbox.js'), 'utf8');
if (!outbox.includes("createHmac('sha256'")) fail('produtor TRI não fixa HMAC SHA-256');
if (!/key\.length\s*<\s*32/.test(outbox)) fail('produtor TRI não preserva mínimo de 32 caracteres para segredo');
if (!outbox.includes('TRI_BLOG_INGEST_SECRET')) fail('segredo dedicado de ingest TRI não está referenciado pelo produtor');

console.log('TRI_SECURITY_PASS');
console.log(`tracked_files=${tracked.length}`);
console.log(`client_files_checked=${clientFiles.length}`);
