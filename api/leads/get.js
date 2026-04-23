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
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const sql = getSqlClient();
    const leads = await sql`
      SELECT *
      FROM lead
      ORDER BY id DESC
    `;
    return res.status(200).json(leads);
  } catch (error) {
    console.error('Erro ao buscar leads:', error);
    return res.status(500).json({ error: 'Erro ao buscar leads' });
  }
}
