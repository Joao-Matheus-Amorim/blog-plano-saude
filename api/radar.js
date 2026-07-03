import { neon } from '@neondatabase/serverless';
import { parseJsonBody, requireAdmin, verifyAdminToken } from './_lib/security.js';
import { ensureLeadTable } from './_lib/leads.js';
import { ensureRadarProspectTable, normalizeProspect, sanitizeText } from './_lib/radar.js';

function getSqlClient() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error('DATABASE_URL não configurada no ambiente');

  let normalizedUrl = String(databaseUrl).trim();
  if ((normalizedUrl.startsWith('"') && normalizedUrl.endsWith('"')) || (normalizedUrl.startsWith("'") && normalizedUrl.endsWith("'"))) {
    normalizedUrl = normalizedUrl.slice(1, -1);
  }

  const parsedUrl = new URL(normalizedUrl);
  parsedUrl.searchParams.delete('channel_binding');
  return neon(parsedUrl.toString());
}

function isImportAuthorized(req) {
  const authHeader = req.headers.authorization || req.headers.Authorization || '';
  const token = String(authHeader).startsWith('Bearer ') ? String(authHeader).slice('Bearer '.length) : '';
  const importSecret = process.env.RADAR_IMPORT_SECRET;
  const providedSecret = req.headers['x-radar-secret'] || req.headers['X-Radar-Secret'];

  if (importSecret && providedSecret && String(providedSecret) === String(importSecret)) return true;

  try {
    return Boolean(verifyAdminToken(token));
  } catch {
    return false;
  }
}

async function listProspects(req, res, sql) {
  const status = sanitizeText(req.query.status, 40);
  const segmento = sanitizeText(req.query.segmento, 120);
  const cidade = sanitizeText(req.query.cidade, 120);
  const prioridade = sanitizeText(req.query.prioridade, 20);

  const prospects = await sql`
    SELECT *
    FROM radar_prospect
    WHERE (${status} = '' OR status = ${status})
      AND (${segmento} = '' OR segmento = ${segmento})
      AND (${cidade} = '' OR cidade = ${cidade})
      AND (${prioridade} = '' OR prioridade = ${prioridade})
    ORDER BY
      COALESCE(nivel_maturidade, 1) DESC,
      CASE prioridade WHEN 'alta' THEN 1 WHEN 'media' THEN 2 ELSE 3 END,
      score DESC,
      atualizado_em DESC,
      id DESC
    LIMIT 300
  `;

  const overviewRows = await sql`
    SELECT
      COUNT(*) AS total,
      COUNT(*) FILTER (WHERE prioridade = 'alta') AS alta,
      COUNT(*) FILTER (WHERE status = 'Novo') AS novos,
      COUNT(*) FILTER (WHERE status = 'Convertido') AS convertidos,
      COUNT(*) FILTER (WHERE status = 'Descartado') AS descartados,
      COUNT(*) FILTER (WHERE nivel_maturidade >= 5) AS quentes,
      COUNT(*) FILTER (WHERE tem_vaga_ativa = true) AS com_vaga,
      COUNT(*) FILTER (WHERE jsonb_array_length(COALESCE(contatos_associados, '[]'::jsonb)) > 0) AS com_contato_associado,
      AVG(score) AS score_medio
    FROM radar_prospect
  `;

  const bySegment = await sql`
    SELECT segmento, COUNT(*) AS total, AVG(score) AS score_medio
    FROM radar_prospect
    GROUP BY segmento
    ORDER BY total DESC, score_medio DESC
    LIMIT 30
  `;

  const byCity = await sql`
    SELECT cidade, uf, COUNT(*) AS total, AVG(score) AS score_medio
    FROM radar_prospect
    GROUP BY cidade, uf
    ORDER BY total DESC, score_medio DESC
    LIMIT 30
  `;

  return res.status(200).json({
    prospects,
    overview: overviewRows[0] || {},
    bySegment,
    byCity,
  });
}

async function importProspects(req, res, sql) {
  if (!isImportAuthorized(req)) return res.status(401).json({ error: 'Não autorizado' });

  const body = await parseJsonBody(req);
  const rawProspects = Array.isArray(body.prospects) ? body.prospects : Array.isArray(body.leads) ? body.leads : [];
  const fallback = {
    city: body.city || body.cidade,
    uf: body.uf || 'RJ',
    segment: body.segment || body.segmento,
    query: body.query || body.consulta_google,
    source: body.source || 'radarplan',
  };

  if (!rawProspects.length) return res.status(400).json({ error: 'Envie prospects ou leads para importar.' });

  let imported = 0;
  let updated = 0;

  for (const item of rawProspects.slice(0, 250)) {
    const prospect = normalizeProspect(item, fallback);

    const result = await sql`
      INSERT INTO radar_prospect (
        nome_empresa, segmento, cidade, uf, telefone_publico, whatsapp, email_publico,
        site_url, perfil_url, endereco, fonte_url, consulta_google, origem, score,
        prioridade, score_motivos, abordagem, evidencias, tags, raw, fingerprint,
        cnpj, cnae_codigo, cnae_descricao, porte_receita, data_abertura, funcionarios_est,
        tem_vaga_ativa, vaga_titulo, vaga_dias, tem_post_cresc, post_cresc_texto,
        tem_filial_nova, nivel_maturidade, nivel_label, revisitar_em, score_d1, score_d2,
        score_d3, score_d4, score_d5, score_d6, proxima_acao, flags, fontes,
        contatos_associados, market_context
      ) VALUES (
        ${prospect.nome_empresa}, ${prospect.segmento}, ${prospect.cidade}, ${prospect.uf},
        ${prospect.telefone_publico}, ${prospect.whatsapp}, ${prospect.email_publico},
        ${prospect.site_url}, ${prospect.perfil_url}, ${prospect.endereco}, ${prospect.fonte_url},
        ${prospect.consulta_google}, ${prospect.origem}, ${prospect.score}, ${prospect.prioridade},
        ${prospect.score_motivos}, ${prospect.abordagem}, ${JSON.stringify(prospect.evidencias)}::jsonb,
        ${JSON.stringify(prospect.tags)}::jsonb, ${JSON.stringify(prospect.raw)}::jsonb, ${prospect.fingerprint},
        ${prospect.cnpj}, ${prospect.cnae_codigo}, ${prospect.cnae_descricao}, ${prospect.porte_receita},
        ${prospect.data_abertura}, ${prospect.funcionarios_est}, ${prospect.tem_vaga_ativa}, ${prospect.vaga_titulo},
        ${prospect.vaga_dias}, ${prospect.tem_post_cresc}, ${prospect.post_cresc_texto}, ${prospect.tem_filial_nova},
        ${prospect.nivel_maturidade}, ${prospect.nivel_label}, ${prospect.revisitar_em}, ${prospect.score_d1},
        ${prospect.score_d2}, ${prospect.score_d3}, ${prospect.score_d4}, ${prospect.score_d5}, ${prospect.score_d6},
        ${prospect.proxima_acao}, ${JSON.stringify(prospect.flags)}::jsonb, ${JSON.stringify(prospect.fontes)}::jsonb,
        ${JSON.stringify(prospect.contatos_associados)}::jsonb, ${JSON.stringify(prospect.market_context)}::jsonb
      )
      ON CONFLICT (fingerprint) WHERE fingerprint IS NOT NULL AND fingerprint <> '' DO UPDATE SET
        nome_empresa = EXCLUDED.nome_empresa,
        segmento = EXCLUDED.segmento,
        cidade = EXCLUDED.cidade,
        uf = EXCLUDED.uf,
        telefone_publico = EXCLUDED.telefone_publico,
        whatsapp = EXCLUDED.whatsapp,
        email_publico = EXCLUDED.email_publico,
        site_url = EXCLUDED.site_url,
        perfil_url = EXCLUDED.perfil_url,
        endereco = EXCLUDED.endereco,
        fonte_url = EXCLUDED.fonte_url,
        consulta_google = EXCLUDED.consulta_google,
        origem = EXCLUDED.origem,
        score = GREATEST(radar_prospect.score, EXCLUDED.score),
        prioridade = EXCLUDED.prioridade,
        score_motivos = EXCLUDED.score_motivos,
        abordagem = EXCLUDED.abordagem,
        evidencias = EXCLUDED.evidencias,
        tags = EXCLUDED.tags,
        raw = EXCLUDED.raw,
        cnpj = EXCLUDED.cnpj,
        cnae_codigo = EXCLUDED.cnae_codigo,
        cnae_descricao = EXCLUDED.cnae_descricao,
        porte_receita = EXCLUDED.porte_receita,
        data_abertura = EXCLUDED.data_abertura,
        funcionarios_est = EXCLUDED.funcionarios_est,
        tem_vaga_ativa = EXCLUDED.tem_vaga_ativa,
        vaga_titulo = EXCLUDED.vaga_titulo,
        vaga_dias = EXCLUDED.vaga_dias,
        tem_post_cresc = EXCLUDED.tem_post_cresc,
        post_cresc_texto = EXCLUDED.post_cresc_texto,
        tem_filial_nova = EXCLUDED.tem_filial_nova,
        nivel_maturidade = GREATEST(COALESCE(radar_prospect.nivel_maturidade, 1), EXCLUDED.nivel_maturidade),
        nivel_label = EXCLUDED.nivel_label,
        revisitar_em = EXCLUDED.revisitar_em,
        score_d1 = EXCLUDED.score_d1,
        score_d2 = EXCLUDED.score_d2,
        score_d3 = EXCLUDED.score_d3,
        score_d4 = EXCLUDED.score_d4,
        score_d5 = EXCLUDED.score_d5,
        score_d6 = EXCLUDED.score_d6,
        proxima_acao = EXCLUDED.proxima_acao,
        flags = EXCLUDED.flags,
        fontes = EXCLUDED.fontes,
        contatos_associados = EXCLUDED.contatos_associados,
        market_context = EXCLUDED.market_context,
        atualizado_em = NOW(),
        importado_em = NOW()
      RETURNING (xmax = 0) AS inserted
    `;

    if (result[0]?.inserted) imported += 1;
    else updated += 1;
  }

  return res.status(200).json({ success: true, imported, updated, received: rawProspects.length });
}

async function updateStatus(req, res, sql) {
  const admin = requireAdmin(req, res);
  if (!admin) return null;

  const body = await parseJsonBody(req);
  const id = Number(body.id);
  const status = sanitizeText(body.status, 40);
  const observacao = sanitizeText(body.observacao_interna, 1000);
  const allowed = ['Novo', 'Avaliar', 'Bom prospect', 'Abordado', 'Sem contato', 'Convertido', 'Descartado', 'Duplicado'];

  if (!id || !allowed.includes(status)) return res.status(400).json({ error: 'Status inválido.' });

  const rows = await sql`
    UPDATE radar_prospect
    SET status = ${status}, observacao_interna = ${observacao}, atualizado_em = NOW()
    WHERE id = ${id}
    RETURNING *
  `;

  return res.status(200).json({ success: true, prospect: rows[0] });
}

async function convertProspect(req, res, sql) {
  const admin = requireAdmin(req, res);
  if (!admin) return null;

  const body = await parseJsonBody(req);
  const id = Number(body.id);
  if (!id) return res.status(400).json({ error: 'ID inválido.' });

  await ensureLeadTable(sql);
  const prospects = await sql`SELECT * FROM radar_prospect WHERE id = ${id} LIMIT 1`;
  const prospect = prospects[0];
  if (!prospect) return res.status(404).json({ error: 'Prospecto não encontrado.' });

  const contatos = Array.isArray(prospect.contatos_associados) ? prospect.contatos_associados : [];
  const contatoResumo = contatos.slice(0, 3).map((contato) => [contato.nome, contato.cargo, contato.email || contato.telefone].filter(Boolean).join(' · ')).join('\n');

  const mensagem = [
    `Prospecto convertido do Radarplan`,
    `Empresa: ${prospect.nome_empresa}`,
    `Segmento: ${prospect.segmento || '-'}`,
    `Cidade/UF: ${prospect.cidade || '-'}/${prospect.uf || '-'}`,
    `Score Radar: ${prospect.score || 0}`,
    `Nível Radar: ${prospect.nivel_label || '-'}`,
    `Prioridade: ${prospect.prioridade || '-'}`,
    `CNPJ: ${prospect.cnpj || '-'}`,
    `CNAE: ${prospect.cnae_descricao || prospect.cnae_codigo || '-'}`,
    `Fonte: ${prospect.fonte_url || prospect.site_url || '-'}`,
    `Contatos associados: ${contatoResumo || '-'}`,
    `Motivos: ${prospect.score_motivos || '-'}`,
    `Próxima ação Radar: ${prospect.proxima_acao || '-'}`,
  ].join('\n');

  const leads = await sql`
    INSERT INTO lead (
      nome, email, telefone, mensagem, vidas, origem, status, cidade, uf,
      tipo_plano, pagina_origem, tag_origem, canal, score, consentimento_lgpd
    ) VALUES (
      ${prospect.nome_empresa}, ${prospect.email_publico || contatos[0]?.email || ''}, ${prospect.whatsapp || prospect.telefone_publico || contatos[0]?.telefone || ''},
      ${mensagem}, 0, 'Radarplan B2B', 'Novo', ${prospect.cidade || ''}, ${prospect.uf || ''},
      'Empresarial', ${prospect.fonte_url || prospect.site_url || ''}, 'radar_b2b', 'Radar B2B', ${Number(prospect.score || 0)}, false
    )
    RETURNING id
  `;

  await sql`
    UPDATE radar_prospect
    SET status = 'Convertido', convertido_lead_id = ${leads[0].id}, atualizado_em = NOW()
    WHERE id = ${id}
  `;

  return res.status(200).json({ success: true, lead_id: leads[0].id });
}

export default async function handler(req, res) {
  const action = sanitizeText(req.query.action || req.body?.action, 40) || (req.method === 'GET' ? 'list' : 'import');

  try {
    const sql = getSqlClient();
    await ensureRadarProspectTable(sql);

    if (req.method === 'GET' && action === 'list') {
      const admin = requireAdmin(req, res);
      if (!admin) return;
      return listProspects(req, res, sql);
    }

    if (req.method === 'POST' && action === 'import') return importProspects(req, res, sql);
    if (req.method === 'POST' && action === 'update-status') return updateStatus(req, res, sql);
    if (req.method === 'POST' && action === 'convert') return convertProspect(req, res, sql);

    return res.status(405).json({ error: 'Ação não permitida.' });
  } catch (error) {
    console.error('Erro no Radar:', error?.message || error);
    return res.status(500).json({ error: 'Erro no Radar' });
  }
}
