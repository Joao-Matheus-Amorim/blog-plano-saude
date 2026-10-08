# Agent Instructions — Blog Plano Saúde

Antes de mudança estrutural neste repositório:

1. leia `ECOSYSTEM.md`;
2. leia `docs/TRI_CROSS_PROJECT_STATE_BINDING_20260907.md`;
3. leia `README.md` e documentação operacional relevante;
4. consulte `Joao-Matheus-Amorim/tri-ecosystem`, principalmente `docs/00_MASTER_PLAN.md`, `docs/01_CURRENT_STATE.md`, `docs/48_CROSS_PROJECT_STATE_RECONCILIATION_20260907.md`, `docs/49_ADR_029_CROSS_PROJECT_STATE_CHECKPOINTS.md`, `docs/02_DATA_OWNERSHIP.md`, `docs/09_PRIVACY_BOUNDARIES.md`, `docs/10_TRI_CONTRACTS.md`, `docs/15_CHANGE_PROTOCOL.md` e `docs/16_DECISION_LOG.md`.

O binding datado mais novo atualiza apenas os fatos cross-project necessários. Ele não redefine o papel do Blog nem cria autorização de integração nova.

## Papel deste projeto

Blog = aquisição inbound, SEO, conteúdo, páginas, simuladores, formulários, attribution e captura original.

Não mover silenciosamente para o Blog:

- pipeline comercial definitivo;
- owner/follow-up/fechamento do CRM;
- scraping/scoring do Radar;
- autoridade de contratos cross-project.

## Worker / ROSS / Root-Cause

Se o trabalho envolver `ssh ross-dev`, ROSS, TRI Relay, OpenCode, `/srv/ross/ci`, Worker Git state ou exact-SHA certification, leia também no `tri-ecosystem`:

- `docs/46_WORKER_ACCESS_AND_INFRA_RUNBOOK.md`;
- `docs/47_WORKER_PERSISTENT_SSH_SESSION.md`;
- `.agents/skills/root-cause-first/SKILL.md`.

Se o prompt já estiver em `ross@DESKTOP-N9PMJE5:...$`, permaneça nessa sessão persistente e não peça novo `ssh ross-dev` sem evidência de desconexão. Não termine bloco interativo comum com top-level `exit`/`logout`; use subshell quando precisar fail-fast bounded.

Não confunda GitHub ref, Worker HEAD, installed tool state, ROSS certificate/receipt e Production state.

## Awareness atual do Radar

O Blog precisa reconhecer a evolução recente do Radar sem assumir ownership dela:

```text
Scrapling adapter = implemented + certified in Radar main
I3-A runner = certified in Radar main
I3-B frozen plan = certified in Radar main
I3-C live observation = pending
I3-D lifecycle decision = pending
Radar automatic CRM delivery = disabled
Radar Production observed = false
```

Nada disso muda Blog → CRM ou autoriza consumo automático de saída do Radar.

## Não reinterpretar estado

Não confunda:

`IDEA → PLANNED → IMPLEMENTED → TESTED → CERTIFIED → DEPLOYED → OBSERVED IN PRODUCTION`.

Outbox, TRI producer, cutover do admin legado e demais itens do Master Plan são planejados até existir código/evidência correspondente.

## Integração

Lead crítico não pode depender de fire-and-forget. Mudanças Blog → CRM devem respeitar contratos, idempotência, provenance, segurança server-side e a política de não perder lead.

## Mudança de direção

Se uma tarefa conflitar com ownership, contratos, privacidade, estratégia ou release cross-project, registrar a divergência conforme o Change Protocol antes de implementar a nova direção.

Blog `main` é Production-connected; docs continuam branch-first e merge em `main` não é operacionalmente neutro.


## Roadmap CRM 360 — 2026-10-08

Leia `docs/TRI_OG_CRM360_INBOUND_BOUNDARY_20261008.md` e o roadmap `tri-ecosystem/docs/63_OG_CRM360_ARCHITECTURE_AND_DELIVERY_ROADMAP_20261008.md` para o novo alinhamento interprojetos. Blog mantém captura voluntária, consentimento/attribution e `tri.lead.created.v1` via outbox; a corretora cadastra clientes e o OG CRM administra carteira/contratos; Radar só prepara fichas para revisão humana. **PLANNED**, sem alterar formulário, runtime, produção ou contrato. O binding de 2026-09-07 permanece histórico.


## Crivo documental completo — gatilho obrigatório (CROSS-CRIVO/1.0, 2026-10-08)

Quando o usuário pedir **crivo**, **crivo documental**, **doc-doc**, **crivo full**, auditoria do projeto ou limpeza da documentação, ler e aplicar a skill de autoridade **`tri-ecosystem/.agents/skills/cross-project-crivo/SKILL.md`** e o protocolo `tri-ecosystem/docs/66_DOCUMENTATION_LIFECYCLE_CRIVO_20261008.md`. Não criar auditoria improvisada ignorando a skill existente. Para crivo `full`, a auditoria de documentos D1–D7 é **obrigatória**, além dos testes de produto e segurança; para pedido apenas `documental`, D1–D7 é o núcleo. Se não for possível executar etapa, declarar `HOLD/PARTIAL`, jamais `PASS` por omissão.

Manter os checks locais: OG CRM `.claude/skills/crivo/SKILL.md` e `CRIVO/1.0` operacional; Radar `radar-gov`; ROSS juiz por SHA. Classificar documentos antigos, corrigir índices e alertas de supersessão, **preservar histórico/certificações**; mover/apagar só após mapa de consumidores, revisão e aprovação própria. O inventário read-only `tri-ecosystem/.agents/skills/cross-project-crivo/scripts/audit_docs.py` não é autoridade para exclusão automática. Em cada repo, registrar estado e evidência da revisão.
