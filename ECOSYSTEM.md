# TRI / OG Ecosystem Authority

Este repositório faz parte do ecossistema TRI / OG.

Cross-project baseline: `TRI-STATE-2026-08-30-01`.  
Snapshot local: `harness/TRI_ECOSYSTEM_BASELINE.json`.  
Autoridade: `Joao-Matheus-Amorim/tri-ecosystem`.

## Papel local

O Blog é responsável por aquisição inbound, SEO, conteúdo, páginas públicas, simuladores, formulários, attribution, consentimento aplicável e captura original.

Ele não é o CRM operacional definitivo e não assume descoberta, KRAKEN ou `OPPORTUNITY_POTENTIAL` do Radar.

## Radar V6 reconhecido pelo Blog

Product epoch: `RADAR-V6-OPPORTUNITY-KRAKEN`.

Brain: `OPPORTUNITY_POTENTIAL`.

Latest certified product batch no snapshot: **Batch 19**, SHA `4399816a534e1a683b224ebb776fbbd915d4ac28`.

A inteligência Radar pode orientar conteúdo/mercado em mudanças governadas, mas não expande o consentimento do Blog e não autoriza uso de dados clínicos ou inferências sensíveis.

## Estado cross-project atual

- Blog baseline funcional Production: `12e2669ed444018cc1f5b842720a6caaf2a7dc8e`;
- Blog Production: **DEPLOYED / OBSERVED**;
- Blog → CRM: **OBSERVED_IN_PRODUCTION**;
- CRM Production: deployed/observed/healthy;
- Radar → CRM → Radar: **PRODUCTION_RUNTIME_PENDING_NOT_OBSERVED**.

## Integração vigente

`Blog → tri.lead.created.v1 → OG CRM`

A entrega usa persistência local + outbox durável + HMAC + idempotência no consumer.

Família global de contratos: `tri-contracts/1.0`, incluindo `tri.lead.created.v1`, `tri.prospect.upserted.v1` e `tri.commercial.feedback.v1` na autoridade compartilhada.

## Privacy boundary

- Radar evolution does not expand Blog consent scope;
- diagnóstico, dados clínicos e inferências sensíveis não viram targeting/aquisição do Blog;
- mudanças de uso de dados exigem Change Protocol e revisão de segurança/privacidade.

## Governança

`branch → preview → gates → PR → autorização → merge → production`

`scripts/tri-ecosystem-consistency-check.mjs` valida a baseline compartilhada localmente sem fetch de sibling repo durante CI.

## Fontes de verdade

1. `harness/TRI_ECOSYSTEM_BASELINE.json`;
2. `PROJECT_MEMORY.md`;
3. `SECURITY_MODEL.md`;
4. este `ECOSYSTEM.md`;
5. `Joao-Matheus-Amorim/tri-ecosystem/ECOSYSTEM_STATE.json`;
6. evidência ROSS/Production para estados técnicos.
