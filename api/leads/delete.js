import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'ID obrigatório' });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    await sql`DELETE FROM lead WHERE id = ${id}`;
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao deletar lead:', error);
    return res.status(500).json({ error: 'Erro ao deletar lead' });
  }
}
