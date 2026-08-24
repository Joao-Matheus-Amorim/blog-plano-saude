# Blog Plano Saude — TRI runtime

## Ownership

O Blog continua sendo a fonte de verdade para captura pública, atribuição e conteúdo. Estado comercial pertence ao OG CRM.

## Captura

`POST /api/leads` persiste o lead e `tri.lead.created.v1` na mesma transação Neon. Falha de rede com o CRM nunca desfaz um lead já commitado e nunca remove um evento do outbox.

## Outbox

- event id único e estável por captura;
- HMAC-SHA256 com canonical JSON;
- lease recuperável;
- retry com backoff limitado;
- endpoint de recovery incorporado à função existente para respeitar o limite 12/12 da Vercel;
- recovery exige `TRI_OUTBOX_DRAIN_SECRET` server-only;
- nenhum secret usa prefixo `VITE_`.

## Ambiente

Obrigatórios para entrega real ao CRM:

- `TRI_CRM_BASE_URL`
- `TRI_BLOG_INGEST_SECRET`
- `TRI_OUTBOX_DRAIN_SECRET`

Ausência dessas variáveis não perde o lead: o evento permanece recuperável no outbox.

## Release

A branch só pode avançar com testes TRI, lint, build, contract lock e ROSS exact-SHA. Produção não deve receber secret de Preview nem apontar para banco de Preview.
