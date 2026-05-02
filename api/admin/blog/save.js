import { ensureBlogTable, getSqlClient, mapPost, normalizeStatus, slugify } from '../../_lib/blog.js';
import { parseJsonBody, requireAdmin } from '../../_lib/security.js';

export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'PUT') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const admin = requireAdmin(req, res);
  if (!admin) return;

  try {
    const body = await parseJsonBody(req);
    const id = body.id ? Number(body.id) : null;
    const titulo = String(body.titulo || '').trim();
    const conteudo = String(body.conteudo || '').trim();

    if (!titulo || !conteudo) {
      return res.status(400).json({ error: 'Título e conteúdo são obrigatórios.' });
    }

    const sql = getSqlClient();
    await ensureBlogTable(sql);

    const baseSlug = slugify(body.slug || titulo);
    const categoria = String(body.categoria || 'Geral').trim();
    const resumo = String(body.resumo || '').trim();
    const imagemUrl = String(body.imagem_url || '').trim();
    const autor = String(body.autor || 'Maisa Valentim').trim();
    const seoTitle = String(body.seo_title || titulo).trim();
    const seoDescription = String(body.seo_description || resumo).trim();
    const status = normalizeStatus(body.status);

    if (id) {
      const rows = await sql`
        UPDATE blog_post
        SET
          titulo = ${titulo},
          slug = ${baseSlug},
          categoria = ${categoria},
          resumo = ${resumo},
          conteudo = ${conteudo},
          imagem_url = ${imagemUrl},
          autor = ${autor},
          seo_title = ${seoTitle},
          seo_description = ${seoDescription},
          status = ${status},
          publicado_em = CASE
            WHEN ${status} = 'published' AND publicado_em IS NULL THEN NOW()
            WHEN ${status} = 'published' THEN publicado_em
            ELSE publicado_em
          END,
          atualizado_em = NOW()
        WHERE id = ${id}
        RETURNING *
      `;

      return res.status(200).json(mapPost(rows[0]));
    }

    const rows = await sql`
      INSERT INTO blog_post (
        titulo, slug, categoria, resumo, conteudo, imagem_url, autor, seo_title, seo_description, status, publicado_em
      ) VALUES (
        ${titulo}, ${baseSlug}, ${categoria}, ${resumo}, ${conteudo}, ${imagemUrl}, ${autor}, ${seoTitle}, ${seoDescription}, ${status},
        CASE WHEN ${status} = 'published' THEN NOW() ELSE NULL END
      )
      RETURNING *
    `;

    return res.status(201).json(mapPost(rows[0]));
  } catch (error) {
    if (String(error?.message || '').includes('duplicate key')) {
      return res.status(409).json({ error: 'Já existe um post com esse slug.' });
    }

    console.error('Erro ao salvar post:', error);
    return res.status(500).json({ error: 'Erro ao salvar post' });
  }
}
