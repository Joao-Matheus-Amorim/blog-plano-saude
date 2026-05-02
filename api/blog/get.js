import { ensureBlogTable, getSqlClient, mapPost } from '../_lib/blog.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const slug = String(req.query.slug || '').trim();

  if (!slug) {
    return res.status(400).json({ error: 'Slug obrigatório' });
  }

  try {
    const sql = getSqlClient();
    await ensureBlogTable(sql);

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
  } catch (error) {
    console.error('Erro ao buscar post:', error);
    return res.status(500).json({ error: 'Erro ao buscar post' });
  }
}
