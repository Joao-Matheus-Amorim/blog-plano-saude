import { neon } from '@neondatabase/serverless';
import { requireAdmin } from '../_lib/security.js';
import { ensureLeadTable } from '../_lib/leads.js';

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

const STATUS_VALIDOS = ['Novo', 'Chamado', 'Em cotação', 'Proposta enviada', 'Fechado', 'Perdido', 'Sem resposta'];

export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const admin = requireAdmin(req, res);
  if (!admin) return;

  let body = req.body;

  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }

  const { id, status, observacao_interna } = body || {};

  if (!id) {
    return res.status(400).json({ error: 'ID do lead é obrigatório.' });
  }

  if (status && !STATUS_VALIDOS.includes(status)) {
    return res.status(400).json({
      error: `Status inválido. Use um dos seguintes: ${STATUS_VALIDOS.join(', ')}`,
    });
  }

  if (!status && typeof observacao_interna === 'undefined') {
    return res.status(400).json({ error: 'Informe status ou observação interna para atualizar.' });
  }

  try {
    const sql = getSqlClient();
    await ensureLeadTable(sql);

    const current = await sql`
      SELECT id, status, observacao_interna
      FROM lead
      WHERE id = ${id}
      LIMIT 1
    `;

    if (current.length === 0) {
      return res.status(404).json({ error: 'Lead não encontrado.' });
    }

    const nextStatus = status || current[0].status || 'Novo';
    const nextNote = typeof observacao_interna === 'undefined'
      ? current[0].observacao_interna
      : String(observacao_interna || '').trim();

    const result = await sql`
      UPDATE lead
      SET status = ${nextStatus}, observacao_interna = ${nextNote}, ultima_acao_em = NOW()
      WHERE id = ${id}
      RETURNING id, nome, email, telefone, operadora, mensagem, vidas, origem, data_envio, status, observacao_interna, ultima_acao_em
    `;

    return res.status(200).json({
      success: true,
      lead: result[0],
    });
  } catch (error) {
    console.error('Erro ao atualizar lead:', {
      message: error?.message,
      code: error?.code,
      detail: error?.detail,
    });
    return res.status(500).json({ error: 'Erro ao atualizar lead.' });
  }
}
