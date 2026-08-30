# PROJECT MEMORY — Blog Plano Saúde

Projeto: `blog-plano-saude`  
Papel: aquisição inbound, SEO, conteúdo, landing pages, formulários, attribution e captura original de demanda.  
Cross-project baseline: `TRI-STATE-2026-08-30-01`.  
Autoridade cross-project: `Joao-Matheus-Amorim/tri-ecosystem`.  
Autoridade de certificação: ROSS Multi-Project CI.

Snapshot local: `harness/TRI_ECOSYSTEM_BASELINE.json`.

## Estado atual — 2026-08-30

Baseline funcional Production: `12e2669ed444018cc1f5b842720a6caaf2a7dc8e`.  
Main documental anterior ao goal: `6dd114984b0a8de881c42dfee3ba4d5e05cb1700`.  
Production: **DEPLOYED / OBSERVED**.  
URL canônica: `https://consultoriadesaude.vercel.app`.

O fluxo **Blog → OG CRM** permanece **OBSERVED_IN_PRODUCTION** com persistência local, outbox TRI, ingest no CRM, exactly-once e cleanup do sintético.

## Radar V6 — baseline reconhecida pelo Blog

O ecossistema atual usa Radar **V6 People First especializado em plano de saúde**.

Product epoch: `RADAR-V6-OPPORTUNITY-KRAKEN`.

Brain: `OPPORTUNITY_POTENTIAL`.

Latest certified product batch no snapshot: **Batch 19**, main SHA `4399816a534e1a683b224ebb776fbbd915d4ac28`.

Essa evolução do Radar pode orientar temas/conteúdo/mercado de forma governada, mas **não amplia o consentimento do Blog**, não transforma dados clínicos em insumo de aquisição e não muda o ownership da captura inbound.

KRAKEN é uma arquitetura do Radar. Scrapling e CNPJ / Company Signal continuam planned-only no snapshot atual.

## Mission / ownership

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
- descoberta pública/KRAKEN;
- OPPORTUNITY_POTENTIAL, score ou evidência original do Radar.

## Integrações TRI

Fluxo vigente:

`captura → persistência local → tri_outbox → tri.lead.created.v1 → OG CRM`

Contratos globais reconhecidos na baseline `tri-contracts/1.0`:

- `tri.lead.created.v1`;
- `tri.prospect.upserted.v1`;
- `tri.commercial.feedback.v1`.

O Blog mantém localmente somente as cópias necessárias aos seus gates atuais. Mesmo nome/versão com hash diferente = FAIL.

## Production truth

```text
Blog → CRM = OBSERVED_IN_PRODUCTION
Radar → CRM → Radar = PRODUCTION_RUNTIME_PENDING_NOT_OBSERVED
```

A evolução funcional do Radar não muda esse status automaticamente.

## Invariantes

- falha temporária do CRM não pode apagar o lead;
- retry não pode duplicar o lead no CRM;
- mesmo event ID com payload diferente deve falhar fechado;
- contratos são versionados e travados por hash;
- segredos ficam somente no servidor;
- falha de integrações auxiliares não bloqueia a persistência principal;
- Radar evolution does not expand Blog consent scope;
- dados clínicos, diagnósticos e inferências sensíveis de saúde não fazem parte da aquisição/comercial do Blog.

## Privacidade e segurança

- coletar somente o necessário para aquisição/comercial;
- dados clínicos, diagnósticos e inferências sensíveis de saúde não fazem parte da inteligência TRI usada pelo Blog;
- `.env`, chaves privadas e credenciais não entram no Git;
- nenhum segredo TRI/DATABASE_URL pode ser exposto via frontend;
- integração usa HMAC SHA-256;
- logs não devem despejar segredo ou payload pessoal completo.

## ROSS / cross-project gate

O Blog mantém `local + security + evidence` como fases obrigatórias do ROSS.

`scripts/tri-ecosystem-consistency-check.mjs` valida `TRI-STATE-2026-08-30-01`, ownership, contratos, privacy boundary e claims de Production sem fetch de sibling repo durante CI.

## Release / rollback

Mudanças futuras continuam branch-first:

`branch → preview → gates → PR → autorização → merge → production`

Bridges/rotas legadas não devem ser removidas apenas porque Blog → CRM está verde; remoção depende de decisão cross-project explícita e rollback documentado.

## Ordem de autoridade

1. `harness/TRI_ECOSYSTEM_BASELINE.json` — baseline cross-project local;
2. `PROJECT_MEMORY.md` — estado local;
3. `SECURITY_MODEL.md` — fronteira local de segurança;
4. `ECOSYSTEM.md` — ponte cross-project;
5. `Joao-Matheus-Amorim/tri-ecosystem/ECOSYSTEM_STATE.json` — estado compartilhado;
6. evidência ROSS/Production para claims técnicos.
