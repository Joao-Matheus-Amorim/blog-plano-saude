import { ensureBlogTable, getSqlClient, mapPost } from '../../_lib/blog.js';
import { requireAdmin } from '../../_lib/security.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const admin = requireAdmin(req, res);
  if (!admin) return;

  try {
    const sql = getSqlClient();
    await ensureBlogTable(sql);

    const rows = await sql`
      SELECT *
      FROM blog_post
      ORDER BY atualizado_em DESC, criado_em DESC
    `;

    return res.status(200).json(rows.map(mapPost));
  } catch (error) {
    console.error('Erro ao listar posts admin:', error);
    return res.status(500).json({ error: 'Erro ao listar posts' });
  }
}
