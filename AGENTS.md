# Agent Instructions — Blog Plano Saúde

Antes de mudança estrutural neste repositório:

1. leia `ECOSYSTEM.md`;
2. leia `README.md` e documentação operacional relevante;
3. consulte `Joao-Matheus-Amorim/tri-ecosystem`, principalmente `docs/00_MASTER_PLAN.md`, `docs/01_CURRENT_STATE.md`, `docs/02_DATA_OWNERSHIP.md`, `docs/09_PRIVACY_BOUNDARIES.md`, `docs/10_TRI_CONTRACTS.md`, `docs/15_CHANGE_PROTOCOL.md` e `docs/16_DECISION_LOG.md`.

## Papel deste projeto

Blog = aquisição inbound, SEO, conteúdo, páginas, simuladores, formulários, attribution e captura original.

Não mover silenciosamente para o Blog:

- pipeline comercial definitivo;
- owner/follow-up/fechamento do CRM;
- scraping/scoring do Radar;
- autoridade de contratos cross-project.

## Não reinterpretar estado

Não confunda:

`IDEA → PLANNED → IMPLEMENTED → TESTED → CERTIFIED → DEPLOYED → OBSERVED IN PRODUCTION`.

Outbox, TRI producer, cutover do admin legado e demais itens do Master Plan são planejados até existir código/evidência correspondente.

## Integração

Lead crítico não pode depender de fire-and-forget. Mudanças Blog → CRM devem respeitar contratos, idempotência, provenance, segurança server-side e a política de não perder lead.

## Mudança de direção

Se uma tarefa conflitar com ownership, contratos, privacidade, estratégia ou release cross-project, registrar a divergência conforme o Change Protocol antes de implementar a nova direção.
