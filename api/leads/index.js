import { neon } from '@neondatabase/serverless';
import crypto from 'crypto';

// ─── DB ───────────────────────────────────────────────────────────────────────

function getSqlClient() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('DATABASE_URL não configurada no ambiente');
  }

  let normalizedUrl = String(databaseUrl).trim();

  if (
    (normalizedUrl.startsWith('"') && normalizedUrl.endsWith('"')) ||
    (normalizedUrl.startsWith("'") && normalizedUrl.endsWith("'"))
  ) {
    normalizedUrl = normalizedUrl.slice(1, -1);
  }

  const parsedUrl = new URL(normalizedUrl);
  parsedUrl.searchParams.delete('channel_binding');

  return neon(parsedUrl.toString());
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function sha256(value) {
  if (!value) return null;
  return crypto.createHash('sha256').update(String(value).trim().toLowerCase()).digest('hex');
}

function toDigitsOnly(value) {
  return String(value || '').replace(/\D/g, '');
}

function normalizePhone(phone) {
  const digits = toDigitsOnly(phone);
  return digits.startsWith('55') ? digits : `55${digits}`;
}

// ─── CALLMEBOT ────────────────────────────────────────────────────────────────

async function sendWhatsapp(lead) {
  const phone  = process.env.CALLMEBOT_PHONE;
  const apikey = process.env.CALLMEBOT_APIKEY;

  if (!phone || !apikey) {
    console.warn('Callmebot: variáveis não configuradas, pulando.');
    return null;
  }

  const text = encodeURIComponent(
    [
      '🔔 Novo lead recebido!',
      `👤 Nome: ${lead.nome || '-'}`,
      `📞 Telefone: ${lead.telefone || '-'}`,
      `📧 Email: ${lead.email || '-'}`,
      `🏥 Operadora: ${lead.operadora || '-'}`,
      `👥 Vidas: ${lead.vidas ?? '-'}`,
      `📍 Origem: ${lead.origem || '-'}`,
    ].join('\n')
  );

  const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}&apikey=${encodeURIComponent(apikey)}&text=${text}`;

  const res = await fetch(url);
  const body = await res.text().catch(() => '');

  console.log('Callmebot response:', res.status, body);
  return { ok: res.ok, status: res.status };
}

// ─── META CAPI ────────────────────────────────────────────────────────────────

async function sendMetaCapi(lead) {
  const pixelId      = process.env.META_PIXEL_ID;
  const accessToken  = process.env.META_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    console.warn('Meta CAPI: variáveis não configuradas, pulando.');
    return null;
  }

  const eventTime = Math.floor(Date.now() / 1000);

  const userData = {};
  if (lead.email)    userData.em = [sha256(lead.email)];
  if (lead.telefone) userData.ph = [sha256(normalizePhone(lead.telefone))];

  const payload = {
    data: [{
      event_name:    'Lead',
      event_time:    eventTime,
      action_source: 'website',
      event_id:      `lead-${lead.id}-${eventTime}`,
      user_data:     userData,
      custom_data: {
        content_name: lead.operadora || 'Plano de Saúde',
      },
    }],
  };

  const url = `https://graph.facebook.com/v18.0/${encodeURIComponent(pixelId)}/events?access_token=${encodeURIComponent(accessToken)}`;

  const res  = await fetch(url, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload),
  });

  const body = await res.json().catch(() => ({}));
  console.log('Meta CAPI response:', res.status, JSON.stringify(body));
  return { ok: res.ok, status: res.status, body };
}

// ─── HANDLER ──────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  // parse body
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  if (Buffer.isBuffer(body)) {
    try { body = JSON.parse(body.toString('utf8')); } catch { body = {}; }
  }

  const {
    nome, name,
    email,
    telefone, whatsapp,
    operadora,
    vidas,
    mensagem,
    origem,
  } = body || {};

  const nomeFinal      = String(nome || name || '').trim();
  const emailFinal     = String(email    || '').trim() || null;
  const telefoneFinal  = String(telefone || whatsapp || '').trim() || null;
  const operadoraFinal = String(operadora || '').trim() || null;
  const mensagemFinal  = String(mensagem  || '').trim() || null;
  const origemFinal    = String(origem    || 'Direto').trim() || 'Direto';
  const vidasFinal     = Number.isFinite(Number(vidas)) ? Number(vidas) : null;

  if (!nomeFinal) {
    return res.status(400).json({ error: 'Informe seu nome para continuar.' });
  }

  // ── 1. Salva no banco ──────────────────────────────────────────────────────
  let lead;
  try {
    const sql = getSqlClient();
    const result = await sql`
      INSERT INTO lead (nome, email, telefone, operadora, mensagem, vidas, origem, data_envio, status)
      VALUES (
        ${nomeFinal}, ${emailFinal}, ${telefoneFinal},
        ${operadoraFinal}, ${mensagemFinal}, ${vidasFinal},
        ${origemFinal}, NOW(), 'Novo'
      )
      RETURNING *
    `;
    lead = result[0];
  } catch (error) {
    console.error('Erro ao criar lead:', {
      message: error?.message,
      code:    error?.code,
      detail:  error?.detail,
      hint:    error?.hint,
    });
    return res.status(500).json({
      error: 'Não foi possível registrar seu pedido. Tente novamente ou fale conosco pelo WhatsApp.',
    });
  }

  // ── 2. Notificações (não bloqueiam a resposta se falharem) ─────────────────
  const [whatsappResult, metaResult] = await Promise.allSettled([
    sendWhatsapp(lead),
    sendMetaCapi(lead),
  ]);

  // ── 3. Resposta ────────────────────────────────────────────────────────────
  return res.status(200).json({
    success: true,
    lead,
    notifications: {
      whatsapp:  whatsappResult.status === 'fulfilled' ? whatsappResult.value?.ok  : false,
      meta_capi: metaResult.status     === 'fulfilled' ? metaResult.value?.ok      : false,
    },
  });
}