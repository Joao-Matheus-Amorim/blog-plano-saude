import { ensureBlogTable, getSqlClient, mapPost } from '../_lib/blog.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const sql = getSqlClient();
    await ensureBlogTable(sql);

    const rows = await sql`
      SELECT *
      FROM blog_post
      WHERE status = 'published'
      ORDER BY publicado_em DESC NULLS LAST, criado_em DESC
    `;

    return res.status(200).json(rows.map(mapPost));
  } catch (error) {
    console.error('Erro ao listar posts:', error);
    return res.status(500).json({ error: 'Erro ao listar posts' });
  }
}
