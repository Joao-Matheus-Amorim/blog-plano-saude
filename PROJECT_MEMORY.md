# PROJECT MEMORY — Blog Plano Saúde

Projeto: `blog-plano-saude`  
Papel: aquisição inbound, SEO, conteúdo, landing pages, formulários, attribution e captura original de demanda.  
Autoridade cross-project: `Joao-Matheus-Amorim/tri-ecosystem`.  
Autoridade de certificação: ROSS Multi-Project CI.

## Estado atual — reconciliado em 2026-09-02

**GitHub `main` atual deve ser lido do próprio GitHub, não congelado neste documento.**

Baseline funcional de Production preservada:

`12e2669ed444018cc1f5b842720a6caaf2a7dc8e`

Production funcional: **DEPLOYED / OBSERVED**  
URL canônica: `https://consultoriadesaude.vercel.app`

Commits posteriores à baseline funcional podem alterar documentação/governança e disparar novos builds pela Git Integration sem criar nova funcionalidade de captura. O merge documental de 2026-09-02 anterior a esta reconciliação foi `278743c9ea03ccc0233933471e88d2e00e33080a` e chegou a Vercel Production `READY`.

Nunca usar o SHA de `main` como sinônimo automático de “nova baseline funcional”. Para mudança funcional, registrar explicitamente qual SHA foi testado/certificado/observado.

## Blog → CRM

Estado: **OBSERVED_IN_PRODUCTION / PASS**.

Fluxo validado historicamente em runtime real:

```text
captura
→ persistência local
→ tri_outbox
→ tri.lead.created.v1
→ OG CRM
```

Foi observado com:

- captura sintética;
- persistência local antes da entrega;
- outbox enfileirada;
- entrega TRI;
- ingest no CRM;
- exactly-once;
- cleanup do sintético no Blog e no CRM;
- residual final zero.

## Evidência histórica preservada

Release Preview certificado: `TRI-RC-2026-08-24-01`.  
SHA funcional histórico naquele Bundle: `f5f85f7ed5eed8947b5247b70ba24a28afa84fb5`.

Controlled cutover de 2026-08-26: `TRI-RC-2026-08-26-03` com gates cross-project verdes antes da promoção da baseline funcional de Production.

Histórico permanece válido somente para os SHAs/ambientes que a evidência realmente cobre.

## Missão e ownership

O Blog é dono de:

- páginas públicas, SEO e conteúdo;
- formulários/simuladores de entrada;
- origem, campanha, página e attribution;
- consentimento aplicável à captação;
- persistência inicial do lead;
- entrega durável do lead ao CRM.

O Blog não é dono de:

- pipeline comercial;
- responsável pelo lead;
- follow-up, proposta, fechamento ou perda;
- descoberta pública, score ou evidência original do Radar.

## Contrato ativo

Blog → CRM usa `tri.lead.created.v1` sob `tri-contracts/1.0`.

O authority canônico fica em `tri-ecosystem/contracts/1.0`; cópias locais usadas por testes devem bater com o lock relevante.

## Invariantes de integração

- falha temporária do CRM não apaga lead;
- retry não duplica lead no CRM;
- mesmo event ID com payload conflitante falha fechado;
- contrato/version/hash são verificados;
- segredos ficam server-side;
- falha auxiliar não bloqueia a persistência principal.

Variáveis Production esperadas, sem valores versionados:

- `TRI_CRM_BASE_URL`;
- `TRI_BLOG_INGEST_SECRET`;
- `TRI_OUTBOX_DRAIN_SECRET`.

## Privacidade e segurança

- coletar somente o necessário para aquisição/comercial;
- dados clínicos, diagnósticos e inferências sensíveis de saúde não entram na inteligência TRI;
- `.env`, chaves privadas e credenciais não entram no Git;
- nenhum segredo TRI/DATABASE_URL é exposto via frontend;
- integração usa HMAC SHA-256;
- logs não despejam segredo ou payload pessoal completo.

## ROSS / gates

`.ross/ci.json` atual exige:

- same SHA;
- local;
- security;
- evidence;
- fail on required skip.

Mudança documental não deve ser descrita como nova certificação funcional se esses gates não foram usados para promover funcionalidade.

## Release / rollback

Este repo é Vercel Production-triggered por `main`.

Fluxo obrigatório:

```text
branch
→ preview
→ gates aplicáveis
→ PR
→ autorização
→ merge
→ production
→ verificação de deployment
```

Bridges/rotas legadas não são removidas só porque Blog → CRM está verde; remoção exige decisão cross-project e rollback.

## Modo de engenharia TRI

O fluxo model-side atual está em `docs/TRI_MODEL_SIDE_ENGINEERING_MODE.md` e no authority `tri-ecosystem`.

O usuário define Goal/aprova gates excepcionais; o model-side agent conduz GitHub/PR; ROSS continua judge por SHA quando exigido.

## Ordem de autoridade

1. `PROJECT_MEMORY.md` — estado local/semântica da baseline;
2. GitHub — ref/branch/PR/commit atual;
3. `SECURITY_MODEL.md` — fronteira local de segurança;
4. `ECOSYSTEM.md` — ponte cross-project;
5. `tri-ecosystem` — estado/decisões compartilhadas;
6. deployment/evidence executada — única base para claims de runtime/Production.
