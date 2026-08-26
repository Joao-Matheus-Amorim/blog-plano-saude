# PROJECT MEMORY — Blog Plano Saúde

Projeto: `blog-plano-saude`  
Papel: aquisição inbound, SEO, conteúdo, landing pages, formulários, attribution e captura original de demanda.  
Autoridade cross-project: `Joao-Matheus-Amorim/tri-ecosystem`.  
Autoridade de certificação: ROSS Multi-Project CI.

## Estado atual — 2026-08-26

`main`: `12e2669ed444018cc1f5b842720a6caaf2a7dc8e`  
Production: **DEPLOYED / OBSERVED**  
URL canônica: `https://consultoriadesaude.vercel.app`

O Blog está em Production e o fluxo **Blog → OG CRM** foi validado em runtime real com:

- captura sintética;
- persistência local antes da entrega;
- `tri_outbox` enfileirada;
- entrega TRI com `tri_delivery_ok=true`;
- ingest no CRM;
- exactly-once;
- cleanup do sintético no Blog e no CRM;
- residual final igual a zero.

Estado da perna Blog → CRM: **OBSERVED_IN_PRODUCTION**.

## Evidência histórica preservada

Release histórico Preview certificado: `TRI-RC-2026-08-24-01`.  
SHA funcional histórico usado naquele Bundle: `f5f85f7ed5eed8947b5247b70ba24a28afa84fb5`.

A certificação Preview continua válida como evidência histórica do SHA correspondente; ela não é apagada pelo cutover posterior.

O controlled cutover de 2026-08-26 foi precedido pelo RC03 final (`TRI-RC-2026-08-26-03`) com gates cross-project verdes e autorização explícita para merge controlado.

## Missão e ownership

O Blog atrai demanda e cria a captura inicial. Ele não é o CRM definitivo e não é o motor de prospecção/inteligência.

O Blog é dono de:
- páginas públicas, SEO e conteúdo;
- formulários e simuladores de entrada;
- origem, campanha, página e attribution;
- consentimento aplicável à captação;
- persistência inicial do lead;
- entrega durável do lead ao CRM.

O Blog não é dono de:
- pipeline comercial;
- responsável pelo lead;
- follow-up, proposta, fechamento ou perda;
- descoberta pública, score ou evidência original do Radar.

## Integração TRI em Production

Fluxo vigente:

`captura → persistência local → tri_outbox → tri.lead.created.v1 → OG CRM`

Invariantes:
- falha temporária do CRM não pode apagar o lead;
- retry não pode duplicar o lead no CRM;
- mesmo event ID com payload diferente deve falhar fechado;
- contratos são versionados e travados por hash;
- segredos ficam somente no servidor;
- falha de integrações auxiliares não bloqueia a persistência principal.

Variáveis Production esperadas, sem valores versionados:
- `TRI_CRM_BASE_URL`;
- `TRI_BLOG_INGEST_SECRET`;
- `TRI_OUTBOX_DRAIN_SECRET`.

## Privacidade e segurança

- coletar somente o necessário para aquisição/comercial;
- dados clínicos, diagnósticos e inferências sensíveis de saúde não fazem parte da inteligência TRI;
- `.env`, chaves privadas e credenciais não entram no Git;
- nenhum segredo TRI/DATABASE_URL pode ser exposto via frontend;
- integração usa HMAC SHA-256;
- logs não devem despejar segredo ou payload pessoal completo.

## Release / rollback

O Blog já passou pelo controlled merge para `main`. Mudanças futuras continuam branch-first:

`branch → preview → gates → PR → autorização → merge → production`

Bridges/rotas legadas não devem ser removidas apenas porque Blog → CRM está verde; remoção depende de decisão cross-project explícita e rollback documentado.

## Ordem de autoridade

1. `PROJECT_MEMORY.md` — estado local atual;
2. `SECURITY_MODEL.md` — fronteira local de segurança;
3. `ECOSYSTEM.md` — ponte cross-project;
4. `tri-ecosystem` — estado e decisões compartilhadas.

Documentação que disser que Production continua globalmente não autorizada é histórica e foi superseded pelo cutover de 2026-08-26.