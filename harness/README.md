# Harness — OG Plano Saúde

Versão: **OG-HARNESS/1.0**

Este diretório é a base operacional de produção do `blog-plano-saude`.

## Ordem de leitura

1. `../PROJECT_MEMORY.md`
2. `PRODUCTION_HARNESS.md`
3. `INTEGRATION_MATRIX.md`
4. `TEST_MATRIX.md`
5. `ENVIRONMENT_MATRIX.md`
6. `OBSERVABILITY.md`
7. `RUNBOOK.md`
8. `RELEASE_CHECKLIST.md`
9. `ZERO_COST_POLICY.md`
10. `DEBT_REGISTER.md`
11. `CHANGE_PROTOCOL.md`
12. `WORK_SESSION_PROTOCOL.md`
13. `ECOSYSTEM_COMPATIBILITY.md`
14. `ADR_TEMPLATE.md`
15. `contracts/README.md`
16. `contracts/LOCK.json`
17. `STATE.json`

## Regra

Se código, schema, configuração ou integração contradiz este harness, a mudança não está pronta. Se a arquitetura legitimamente muda, memória e harness mudam na mesma PR.

## Objetivos protegidos

- aquisição não perde lead;
- site não vira CRM;
- custo obrigatório incremental R$ 0;
- banco/contratos com ownership claro;
- admin legado com plano de saída;
- Radar legado com plano de saída;
- segurança e LGPD;
- deploy e rollback reproduzíveis;
- observabilidade mínima gratuita;
- contratos versionados e travados por hash;
- memória de sessão reproduzível;
- dívida explícita.
