# Patch manual: api/radar.js

Na listagem, trocar a ordenação para considerar prioridade crítica e nível:

```sql
ORDER BY
  CASE prioridade WHEN 'critica' THEN 1 WHEN 'alta' THEN 2 WHEN 'media' THEN 3 WHEN 'baixa' THEN 4 ELSE 5 END,
  nivel_maturidade DESC,
  score DESC,
  revisitar_em ASC NULLS LAST,
  atualizado_em DESC,
  id DESC
```

No overview, adicionar contadores:

```sql
COUNT(*) FILTER (WHERE nivel_maturidade = 5) AS nivel_5,
COUNT(*) FILTER (WHERE nivel_maturidade = 4) AS nivel_4,
COUNT(*) FILTER (WHERE revisitar_em <= CURRENT_DATE) AS revisitar_hoje,
COUNT(*) FILTER (WHERE tem_vaga_ativa = TRUE) AS com_vaga
```

No INSERT/UPSERT, incluir as colunas V2 adicionadas na migration.

Manter `/api/radar?action=import`, `/api/radar?action=list`, `/api/radar?action=update-status` e `/api/radar?action=convert`. Não criar endpoint novo.
