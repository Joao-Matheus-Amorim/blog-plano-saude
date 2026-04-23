import { neon } from '@neondatabase/serverless';

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

const STATUS_VALIDOS = ['Novo', 'Contatado', 'Proposta Enviada', 'Fechado', 'Perdido'];

export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  let body = req.body;

  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }

  const { id, status } = body || {};

  if (!id) {
    return res.status(400).json({ error: 'ID do lead é obrigatório.' });
  }

  if (!status || !STATUS_VALIDOS.includes(status)) {
    return res.status(400).json({
      error: `Status inválido. Use um dos seguintes: ${STATUS_VALIDOS.join(', ')}`,
    });
  }

  try {
    const sql = getSqlClient();

    const result = await sql`
      UPDATE lead
      SET status = ${status}
      WHERE id = ${id}
      RETURNING id, nome, status
    `;

    if (result.length === 0) {
      return res.status(404).json({ error: 'Lead não encontrado.' });
    }

    return res.status(200).json({
      success: true,
      lead: result[0],
    });
  } catch (error) {
    console.error('Erro ao atualizar status:', {
      message: error?.message,
      code: error?.code,
      detail: error?.detail,
    });
    return res.status(500).json({ error: 'Erro ao atualizar status do lead.' });
  }
}
