# TRI / OG Ecosystem Authority

Este repositório faz parte do ecossistema TRI / OG.

A autoridade cross-project para estratégia, ownership compartilhado, contratos, privacidade, integração e modelo de release é:

`Joao-Matheus-Amorim/tri-ecosystem`

Documentos de entrada para mudanças estruturais:

1. `tri-ecosystem/docs/00_MASTER_PLAN.md`
2. `tri-ecosystem/docs/01_CURRENT_STATE.md`
3. `tri-ecosystem/docs/02_DATA_OWNERSHIP.md`
4. `tri-ecosystem/docs/03_ARCHITECTURE.md`
5. `tri-ecosystem/docs/09_PRIVACY_BOUNDARIES.md`
6. `tri-ecosystem/docs/10_TRI_CONTRACTS.md`
7. `tri-ecosystem/docs/15_CHANGE_PROTOCOL.md`
8. `tri-ecosystem/docs/16_DECISION_LOG.md`

## Papel local

O Blog é responsável por aquisição inbound, SEO, conteúdo, páginas públicas, simuladores, formulários, attribution e captura original.

Ele não é o CRM operacional definitivo e não assume scraping/scoring do Radar.

## Estado real pós-certificação

O fluxo TRI do Blog está implementado no SHA funcional certificado `f5f85f7ed5eed8947b5247b70ba24a28afa84fb5` e participou do release `TRI-RC-2026-08-24-01`, que terminou com `FAIL=0`, `SKIP=0` e `TRI BUNDLE CERTIFIED` em Preview.

Isso comprova:
- outbox durável;
- producer `tri.lead.created.v1`;
- preservação durante indisponibilidade;
- replay/idempotência;
- conflict fail-closed;
- attribution/UTM;
- dead-letter/requeue;
- entrega Blog → CRM.

Não comprova nem autoriza Production/cutover.

## Branch atual

`hardening/tri-alignment-post-cert` adiciona somente governança, segurança e evidência pós-certificação. Mudança funcional fora da allowlist da evidence gate deve falhar.

## Mudanças que exigem consulta ao tri-ecosystem

- ownership Blog ↔ Radar ↔ CRM;
- contratos/eventos compartilhados;
- forma de entrega Blog → CRM;
- source of truth operacional;
- privacidade;
- release, shadow e cutover do legado.

## Regra

Se documentação local e baseline cross-project divergirem, registrar e reconciliar explicitamente. Não fazer merge automático e não promover Production a partir deste arquivo.
