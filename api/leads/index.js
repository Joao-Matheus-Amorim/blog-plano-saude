import { neon } from '@neondatabase/serverless';
import crypto from 'crypto';
import { ensureLeadTable } from '../_lib/leads.js';
import { rateLimit } from '../_lib/security.js';

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

function asText(value, fallback = '') {
  const text = String(value ?? '').trim();
  return text || fallback;
}

function asNullableText(value) {
  const text = asText(value);
  return text || null;
}

function asBoolean(value) {
  if (typeof value === 'boolean') return value;
  return ['true', '1', 'sim', 'yes'].includes(String(value || '').toLowerCase());
}

function asScore(value) {
  const score = Number(value);
  if (!Number.isFinite(score)) return 0;
  return Math.max(0, Math.min(Math.round(score), 100));
}

function calculateFallbackScore({ telefone, cidade, tipo_plano, vidas, tag_origem, canal, mensagem }) {
  let score = 20;
  const tipo = String(tipo_plano || '').toLowerCase();
  const tag = String(tag_origem || '').toLowerCase();
  const canalText = String(canal || '').toLowerCase();
  const msg = String(mensagem || '').toLowerCase();
  const lives = Number(vidas) || 0;

  if (telefone) score += 15;
  if (cidade) score += 15;
  if (tipo.includes('mei')) score += 25;
  if (tipo.includes('empresa') || tipo.includes('pme')) score += 30;
  if (tipo.includes('trocar') || tipo.includes('portabilidade')) score += 25;
  if (tipo.includes('família') || tipo.includes('familia')) score += 15;
  if (lives >= 2) score += 10;
  if (lives >= 3) score += 15;
  if (lives >= 6) score += 20;
  if (tag.includes('radar')) score += 20;
  if (tag.includes('whatsapp') || tag.includes('instagram') || canalText.includes('google')) score += 10;
  if (/urgente|mei|empresa|trocar|portabilidade|gestante|idoso|mãe|mae|filho|funcionário|funcionario/.test(msg)) score += 15;

  return asScore(score);
}

function getPublicErrorPayload(error) {
  const payload = {
    error: 'Não foi possível registrar seu pedido. Tente novamente ou fale conosco pelo WhatsApp.',
  };

  if (process.env.NODE_ENV !== 'production' || process.env.EXPOSE_API_ERRORS === 'true') {
    payload.detail = error?.message || 'Erro desconhecido';
    payload.code = error?.code || null;
    payload.hint = error?.hint || null;
  }

  return payload;
}

async function sendWhatsapp(lead) {
  const phone  = process.env.CALLMEBOT_PHONE;
  const apikey = process.env.CALLMEBOT_APIKEY;

  if (!phone || !apikey) {
    console.warn('Callmebot: variáveis não configuradas, pulando.');
    return null;
  }

  const text = encodeURIComponent(
    [
      'Novo lead recebido!',
      `Nome: ${lead.nome || '-'}`,
      `Telefone: ${lead.telefone || '-'}`,
      `Email: ${lead.email || '-'}`,
      `Tipo: ${lead.tipo_plano || lead.operadora || '-'}`,
      `Vidas: ${lead.vidas ?? '-'}`,
      `Cidade: ${lead.cidade || '-'}${lead.uf ? `/${lead.uf}` : ''}`,
      `Canal: ${lead.canal || '-'}`,
      `Tag origem: ${lead.tag_origem || lead.origem || '-'}`,
      `Score: ${lead.score ?? 0}`,
    ].join('\n')
  );

  const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}&apikey=${encodeURIComponent(apikey)}&text=${text}`;

  const res = await fetch(url);
  const body = await res.text().catch(() => '');

  console.log('Callmebot response:', res.status, body);
  return { ok: res.ok, status: res.status };
}

async function sendMetaCapi(lead, eventId) {
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

  const resolvedEventId = eventId || `lead-fallback-${lead.id}-${eventTime}`;

  const payload = {
    data: [{
      event_name:    'Lead',
      event_time:    eventTime,
      action_source: 'website',
      event_id:      resolvedEventId,
      user_data:     userData,
      custom_data: {
        content_name: lead.tipo_plano || lead.operadora || 'Plano de Saúde',
        canal: lead.canal || 'Orgânico',
        tag_origem: lead.tag_origem || lead.origem || '',
        score: lead.score || 0,
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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  if (!rateLimit(req, res, { keyPrefix: 'lead-create', windowMs: 60_000, max: 12 })) {
    return;
  }

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
    event_id,
    cidade,
    uf,
    tipo_plano,
    pagina_origem,
    tag_origem,
    canal,
    referrer,
    score,
    consentimento_lgpd,
  } = body || {};

  const nomeFinal = asText(nome || name);
  const emailFinal = asNullableText(email);
  const telefoneFinal = asNullableText(telefone || whatsapp);
  const tipoPlanoFinal = asNullableText(tipo_plano || operadora) || 'Plano de saúde';
  const operadoraFinal = asNullableText(operadora || tipoPlanoFinal);
  const mensagemFinal = asNullableText(mensagem);
  const origemFinal = asText(origem, 'Direto');
  const vidasFinal = Number.isFinite(Number(vidas)) ? Number(vidas) : null;
  const eventIdFinal = asNullableText(event_id);
  const cidadeFinal = asNullableText(cidade);
  const ufFinal = asNullableText(uf);
  const paginaOrigemFinal = asNullableText(pagina_origem);
  const tagOrigemFinal = asNullableText(tag_origem || origemFinal);
  const canalFinal = asText(canal, 'Orgânico');
  const referrerFinal = asNullableText(referrer);
  const consentimentoFinal = asBoolean(consentimento_lgpd);
  const scoreFinal = score === undefined || score === null
    ? calculateFallbackScore({ telefone: telefoneFinal, cidade: cidadeFinal, tipo_plano: tipoPlanoFinal, vidas: vidasFinal, tag_origem: tagOrigemFinal, canal: canalFinal, mensagem: mensagemFinal })
    : asScore(score);

  if (!nomeFinal) {
    return res.status(400).json({ error: 'Informe seu nome para continuar.' });
  }

  if (!telefoneFinal) {
    return res.status(400).json({ error: 'Informe seu WhatsApp para continuar.' });
  }

  let lead;
  try {
    const sql = getSqlClient();
    await ensureLeadTable(sql);

    const result = await sql`
      INSERT INTO lead (
        nome, email, telefone, operadora, mensagem, vidas, origem, data_envio, status,
        cidade, uf, tipo_plano, pagina_origem, tag_origem, canal, referrer, score, consentimento_lgpd
      )
      VALUES (
        ${nomeFinal}, ${emailFinal}, ${telefoneFinal},
        ${operadoraFinal}, ${mensagemFinal}, ${vidasFinal},
        ${origemFinal}, NOW(), 'Novo',
        ${cidadeFinal}, ${ufFinal}, ${tipoPlanoFinal}, ${paginaOrigemFinal}, ${tagOrigemFinal},
        ${canalFinal}, ${referrerFinal}, ${scoreFinal}, ${consentimentoFinal}
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
    return res.status(500).json(getPublicErrorPayload(error));
  }

  const [whatsappResult, metaResult] = await Promise.allSettled([
    sendWhatsapp(lead),
    sendMetaCapi(lead, eventIdFinal),
  ]);

  return res.status(200).json({
    success: true,
    lead,
    notifications: {
      whatsapp:  whatsappResult.status === 'fulfilled' ? whatsappResult.value?.ok  : false,
      meta_capi: metaResult.status     === 'fulfilled' ? metaResult.value?.ok      : false,
    },
  });
}
