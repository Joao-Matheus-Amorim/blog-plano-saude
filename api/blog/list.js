import { ensureBlogTable, getSqlClient, mapPost } from '../_lib/blog.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const sql = getSqlClient();
    await ensureBlogTable(sql);

    const slug = String(req.query.slug || '').trim();

    if (slug) {
      const rows = await sql`
        SELECT *
        FROM blog_post
        WHERE slug = ${slug} AND status = 'published'
        LIMIT 1
      `;

      const post = mapPost(rows[0]);

      if (!post) {
        return res.status(404).json({ error: 'Post não encontrado' });
      }

      await sql`
        UPDATE blog_post
        SET visualizacoes = COALESCE(visualizacoes, 0) + 1
        WHERE id = ${post.id}
      `;

      return res.status(200).json({ ...post, visualizacoes: Number(post.visualizacoes || 0) + 1 });
    }

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
