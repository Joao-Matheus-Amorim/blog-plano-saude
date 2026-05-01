import crypto from 'crypto';

const encoder = new TextEncoder();

function base64url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function fromBase64url(input) {
  const normalized = input.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);
  return Buffer.from(padded, 'base64').toString('utf8');
}

function timingSafeEqualString(a = '', b = '') {
  const left = encoder.encode(String(a));
  const right = encoder.encode(String(b));

  if (left.length !== right.length) return false;
  return crypto.timingSafeEqual(left, right);
}

export function hashPassword(password, salt) {
  return crypto
    .pbkdf2Sync(String(password), String(salt), 200_000, 32, 'sha256')
    .toString('hex');
}

export function verifyAdminCredentials(email, password) {
  const expectedEmail = process.env.ADMIN_EMAIL;
  const plainPassword = process.env.ADMIN_PASSWORD;
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;
  const passwordSalt = process.env.ADMIN_PASSWORD_SALT;

  if (!expectedEmail) {
    throw new Error('ADMIN_EMAIL não configurado no ambiente');
  }

  const emailOk = timingSafeEqualString(
    String(email || '').trim().toLowerCase(),
    String(expectedEmail).trim().toLowerCase()
  );

  if (!emailOk) return false;

  if (passwordHash && passwordSalt) {
    const candidateHash = hashPassword(password || '', passwordSalt);
    return timingSafeEqualString(candidateHash, passwordHash);
  }

  if (plainPassword) {
    return timingSafeEqualString(String(password || ''), String(plainPassword));
  }

  throw new Error('ADMIN_PASSWORD ou ADMIN_PASSWORD_HASH/ADMIN_PASSWORD_SALT não configurados');
}

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('ADMIN_SESSION_SECRET precisa ter pelo menos 32 caracteres');
  }
  return secret;
}

export function signAdminToken(email) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    sub: String(email).trim().toLowerCase(),
    role: 'admin',
    iat: now,
    exp: now + 60 * 60 * 8,
  };

  const encodedHeader = base64url(JSON.stringify(header));
  const encodedPayload = base64url(JSON.stringify(payload));
  const signingInput = `${encodedHeader}.${encodedPayload}`;
  const signature = crypto
    .createHmac('sha256', getSessionSecret())
    .update(signingInput)
    .digest('base64url');

  return `${signingInput}.${signature}`;
}

export function verifyAdminToken(token) {
  if (!token || typeof token !== 'string') return null;

  const parts = token.split('.');
  if (parts.length !== 3) return null;

  const [encodedHeader, encodedPayload, signature] = parts;
  const signingInput = `${encodedHeader}.${encodedPayload}`;
  const expected = crypto
    .createHmac('sha256', getSessionSecret())
    .update(signingInput)
    .digest('base64url');

  if (!timingSafeEqualString(signature, expected)) return null;

  try {
    const payload = JSON.parse(fromBase64url(encodedPayload));
    if (payload.role !== 'admin') return null;
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export function requireAdmin(req, res) {
  const authHeader = req.headers.authorization || req.headers.Authorization || '';
  const token = String(authHeader).startsWith('Bearer ')
    ? String(authHeader).slice('Bearer '.length)
    : '';

  try {
    const payload = verifyAdminToken(token);
    if (!payload) {
      res.status(401).json({ error: 'Não autorizado' });
      return null;
    }
    return payload;
  } catch (error) {
    console.error('Erro ao validar token admin:', error?.message || error);
    res.status(500).json({ error: 'Autenticação indisponível' });
    return null;
  }
}

const buckets = new Map();

export function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || req.connection?.remoteAddress || 'unknown';
}

export function rateLimit(req, res, options = {}) {
  const windowMs = Number(options.windowMs || process.env.LEADS_RATE_LIMIT_WINDOW_MS || 60_000);
  const max = Number(options.max || process.env.LEADS_RATE_LIMIT_MAX || 5);
  const key = `${options.keyPrefix || 'global'}:${getClientIp(req)}`;
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  current.count += 1;
  buckets.set(key, current);

  if (current.count > max) {
    res.setHeader('Retry-After', Math.ceil((current.resetAt - now) / 1000));
    res.status(429).json({ error: 'Muitas tentativas. Tente novamente em instantes.' });
    return false;
  }

  return true;
}

export async function parseJsonBody(req) {
  let body = req.body;

  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }

  if (Buffer.isBuffer(body)) {
    try { body = JSON.parse(body.toString('utf8')); } catch { body = {}; }
  }

  return body || {};
}

export async function verifyCaptchaIfConfigured(token, req) {
  const secret = process.env.CAPTCHA_SECRET;
  if (!secret) return true;
  if (!token) return false;

  const form = new URLSearchParams();
  form.set('secret', secret);
  form.set('response', token);
  form.set('remoteip', getClientIp(req));

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: form,
  });

  const data = await response.json().catch(() => ({}));
  return Boolean(data.success);
}
