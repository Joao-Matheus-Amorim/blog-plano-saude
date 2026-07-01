# Scripts do motor orgânico

Esta pasta separa os coletores por finalidade.

## Fontes previstas

- `site_events`: eventos anônimos do próprio site.
- `lead_reception`: leads com consentimento.
- `public_intent`: sinais publicados em páginas abertas.
- `public_reputation`: reclamações, elogios e dúvidas abertas.
- `b2b_public`: empresas com canais institucionais públicos.
- `operator_docs`: documentos e páginas públicas de operadoras.
- `ans_public`: bases públicas regulatórias.

## Saída padrão dos coletores

Todo coletor deve gerar JSONL com estes campos-base:

```json
{"source_key":"web_public_search","niche_key":"plano_saude","url_post":"https://...","texto_trecho":"alguém indica plano de saúde no RJ?","keyword":"indica plano de saúde","tema":"indicacao_plano","data_post":"2026-06-30T00:00:00.000Z","score":80}
```

O importador grava no banco usando as tabelas de `api/_lib/intelligence.js`.

## Regras

- manter sinais pessoais públicos por no máximo 45 dias;
- salvar URL de origem e motivo do alerta;
- não registrar telefone pessoal encontrado em perfil pessoal;
- empresas podem ter canais institucionais públicos;
- contato privado só depois de consentimento, WhatsApp iniciado ou formulário enviado.
