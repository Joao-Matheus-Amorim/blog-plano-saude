import { ensureBlogTable, getSqlClient } from '../../_lib/blog.js';
import { requireAdmin } from '../../_lib/security.js';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const admin = requireAdmin(req, res);
  if (!admin) return;

  const id = Number(req.query.id || 0);

  if (!id) {
    return res.status(400).json({ error: 'ID obrigatório' });
  }

  try {
    const sql = getSqlClient();
    await ensureBlogTable(sql);
    await sql`DELETE FROM blog_post WHERE id = ${id}`;
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao deletar post:', error);
    return res.status(500).json({ error: 'Erro ao deletar post' });
  }
}
