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

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'ID obrigatório' });
  }

  try {
    const sql = getSqlClient();
    await sql`DELETE FROM lead WHERE id = ${id}`;
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao deletar lead:', error);
    return res.status(500).json({ error: 'Erro ao deletar lead' });
  }
}
