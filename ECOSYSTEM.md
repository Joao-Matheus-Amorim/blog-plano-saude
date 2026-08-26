# TRI / OG Ecosystem Authority

Este repositório faz parte do ecossistema TRI / OG.

A autoridade cross-project para estratégia, ownership compartilhado, contratos, privacidade, integração e modelo de release é:

`Joao-Matheus-Amorim/tri-ecosystem`

## Papel local

O Blog é responsável por aquisição inbound, SEO, conteúdo, páginas públicas, simuladores, formulários, attribution e captura original.

Ele não é o CRM operacional definitivo e não assume descoberta/scoring do Radar.

## Estado cross-project atual — 2026-08-26

- Blog `main`: `12e2669ed444018cc1f5b842720a6caaf2a7dc8e`;
- Blog Production: ativo e observado;
- Blog → CRM: **OBSERVED_IN_PRODUCTION**;
- CRM Production: ativo e saudável;
- Radar: código TRI mergeado em `main`, mas runtime Radar → CRM em Production ainda **não observado externamente**.

O release Preview `TRI-RC-2026-08-24-01` permanece como evidência histórica. O cutover controlado posterior foi autorizado após o RC03 `TRI-RC-2026-08-26-03`.

## Integração vigente

`Blog → tri.lead.created.v1 → OG CRM`

A entrega usa persistência local + outbox durável + HMAC + idempotência no consumer.

## Mudanças que exigem consulta ao tri-ecosystem

- ownership Blog ↔ Radar ↔ CRM;
- contratos/eventos compartilhados;
- forma de entrega Blog → CRM;
- source of truth operacional;
- privacidade;
- remoção de bridges legadas;
- release, rollback e novo cutover.

## Governança

Repos ligados a Production continuam branch-first:

`branch → preview → gates → PR → autorização → merge → production`

Não usar documentação histórica que dizia “Production não autorizada” como estado atual. Essa decisão foi superseded em 2026-08-26.

## Fontes de verdade

1. `PROJECT_MEMORY.md` — estado local;
2. `SECURITY_MODEL.md` — segurança local;
3. este `ECOSYSTEM.md` — ponte cross-project;
4. `tri-ecosystem/docs/01_CURRENT_STATE.md` e decisão/cutover corrente — estado compartilhado.
