# TRI / OG Ecosystem Authority

Este repositório faz parte do ecossistema TRI / OG.

Autoridade cross-project para estratégia, ownership compartilhado, contratos, privacidade, integração e modelo de release:

`Joao-Matheus-Amorim/tri-ecosystem`

## Papel local

O Blog é responsável por aquisição inbound, SEO, conteúdo, páginas públicas, simuladores, formulários, attribution, captura original e persistência inicial/durável antes da entrega ao CRM.

Ele não é o CRM operacional definitivo e não assume descoberta/scoring do Radar.

## Estado cross-project — reconciliado em 2026-09-02

- GitHub `main`: consultar o ref atual no GitHub; não congelar SHA documental aqui;
- baseline funcional Blog Production: `12e2669ed444018cc1f5b842720a6caaf2a7dc8e`;
- Blog Production funcional: **DEPLOYED / OBSERVED**;
- Blog → CRM: **OBSERVED_IN_PRODUCTION**;
- CRM Production: ativo/observado para a baseline funcional registrada;
- Radar V6: implementado/certificado até Batch 19 em seu product-control-plane, mas automatic V6 CRM delivery continua disabled/not authorized e Radar → CRM → Radar Production observed continua false.

O merge documental Blog `278743c9ea03ccc0233933471e88d2e00e33080a` de 2026-09-02 chegou a Vercel Production `READY`; isso não substitui a baseline funcional nem cria nova feature.

O release Preview `TRI-RC-2026-08-24-01` e o controlled cutover `TRI-RC-2026-08-26-03` permanecem evidência histórica dos SHAs correspondentes.

## Integração vigente

```text
Blog
→ persistência local / tri_outbox
→ tri.lead.created.v1
→ OG CRM
```

A entrega usa HMAC, event identity, retry e idempotência no consumer.

## Contracts authority

`tri-contracts/1.0` é canônico em `tri-ecosystem/contracts/1.0`.

Contratos canônicos atuais incluem:

- `tri.lead.created.v1`;
- `tri.prospect.upserted.v1`;
- `tri.commercial.feedback.v1`.

`tri.opportunity.detected.v1` permanece planned/not present.

O Blog não deve redefinir contrato cross-project localmente; cópia local serve para validação offline e deve respeitar lock/hash aplicável.

## Mudanças que exigem consulta ao `tri-ecosystem`

- ownership Blog ↔ Radar ↔ CRM;
- contratos/eventos compartilhados;
- forma de entrega Blog → CRM;
- source of truth operacional;
- privacidade/retenção cross-project;
- remoção de bridges legadas;
- release/rollback/cutover;
- qualquer automação que transforme resultado Radar em ação comercial sem gate humano/policy apropriado.

## Governança

Este repo está ligado à Vercel Production por `main`:

```text
branch
→ preview
→ gates aplicáveis
→ PR
→ autorização
→ merge
→ production
→ deployment verification
```

Docs em `main` não são operacionalmente neutras: também podem disparar build Production.

## Modo de engenharia TRI

O model-side agent conduz análise/branch/edição/review/PR; GitHub é source/ref truth; ROSS continua judge exato quando exigido; o usuário transporta somente o ROSS manual exigido pela boundary transitória.

Documento local: `docs/TRI_MODEL_SIDE_ENGINEERING_MODE.md`.

## Fontes de verdade

1. `PROJECT_MEMORY.md` — semântica/estado local;
2. GitHub — ref atual e histórico de commits/PRs;
3. `SECURITY_MODEL.md` — segurança local;
4. este `ECOSYSTEM.md` — ponte cross-project;
5. `tri-ecosystem/docs/01_CURRENT_STATE.md` + decisões/contracts — estado compartilhado;
6. Vercel/ROSS/evidência executada — runtime/certification claims.
