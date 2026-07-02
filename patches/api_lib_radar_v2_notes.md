# Patch manual: api/_lib/radar.js

Adicionar em `ensureRadarProspectTable(sql)`, depois das colunas atuais:

```js
await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS cnpj TEXT`;
await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS cnae_codigo TEXT`;
await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS cnae_descricao TEXT`;
await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS funcionarios_est INTEGER DEFAULT 0`;
await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS porte_receita TEXT`;
await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS capital_social NUMERIC DEFAULT 0`;
await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS data_abertura DATE`;
await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS tem_vaga_ativa BOOLEAN DEFAULT FALSE`;
await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS vaga_titulo TEXT`;
await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS vaga_dias INTEGER DEFAULT 999`;
await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS tem_post_cresc BOOLEAN DEFAULT FALSE`;
await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS post_cresc_texto TEXT`;
await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS tem_filial_nova BOOLEAN DEFAULT FALSE`;
await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS nivel_maturidade INTEGER DEFAULT 1`;
await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS nivel_label TEXT DEFAULT 'CATALOGADO'`;
await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS revisitar_em DATE`;
await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS score_d1 INTEGER DEFAULT 0`;
await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS score_d2 INTEGER DEFAULT 0`;
await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS score_d3 INTEGER DEFAULT 0`;
await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS score_d4 INTEGER DEFAULT 0`;
await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS score_d5 INTEGER DEFAULT 0`;
await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS score_d6 INTEGER DEFAULT 0`;
await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS historico_score JSONB DEFAULT '[]'::jsonb`;
await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS fontes JSONB DEFAULT '[]'::jsonb`;
await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS cidade_populacao INTEGER DEFAULT 0`;
await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS nome_invalido BOOLEAN DEFAULT FALSE`;
await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS cnpj_invalido BOOLEAN DEFAULT FALSE`;
await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS telefone_invalido BOOLEAN DEFAULT FALSE`;
await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS empresa_inativa BOOLEAN DEFAULT FALSE`;
await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS fonte_indireta BOOLEAN DEFAULT FALSE`;
await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS cadencia_dia INTEGER DEFAULT 0`;
await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS cadencia_canal TEXT`;
await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS ultimo_contato_em DATE`;
await sql`ALTER TABLE radar_prospect ADD COLUMN IF NOT EXISTS proximo_contato_em DATE`;
```

Alterar `normalizePriority` para aceitar:

```js
if (['critica', 'alta', 'media', 'baixa', 'nenhuma'].includes(normalized)) return normalized;
if (Number(score) >= 140) return 'critica';
if (Number(score) >= 110) return 'alta';
if (Number(score) >= 80) return 'media';
return 'baixa';
```

Alterar `normalizeProspect`:

- usar `score_total || score`, sem cap em 135;
- carregar `nivel_maturidade`, `nivel_label`, `revisitar_em`;
- carregar os seis scores;
- carregar `fontes` e `historico_score`;
- preservar payload completo em `raw`.
