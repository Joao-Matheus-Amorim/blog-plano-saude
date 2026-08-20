# Harness — OG Plano Saúde

Versão: **OG-HARNESS/1.0**

Este diretório é a base operacional de produção do `blog-plano-saude`.

## Ordem de leitura

1. `../PROJECT_MEMORY.md`
2. `PRODUCTION_HARNESS.md`
3. `DATA_OWNERSHIP.md`
4. `SECURITY_MODEL.md`
5. `INTEGRATION_MATRIX.md`
6. `E2E_FLOWS.md`
7. `TEST_MATRIX.md`
8. `SCHEMA_EVOLUTION.md`
9. `ENVIRONMENT_MATRIX.md`
10. `OBSERVABILITY.md`
11. `RUNBOOK.md`
12. `RELEASE_CHECKLIST.md`
13. `ZERO_COST_POLICY.md`
14. `DEBT_REGISTER.md`
15. `CHANGE_PROTOCOL.md`
16. `WORK_SESSION_PROTOCOL.md`
17. `ECOSYSTEM_COMPATIBILITY.md`
18. `ADR_TEMPLATE.md`
19. `contracts/README.md`
20. `contracts/LOCK.json`
21. `STATE.json`

## Gate executável local

Sem dependência adicional:

```bash
node scripts/harness-check.mjs
```

O comando falha com exit code `1` quando:
- arquivo obrigatório do harness sumiu;
- `PROJECT_MEMORY.md` perdeu versão canônica;
- `STATE.json` divergiu do projeto/harness/contrato;
- `LOCK.json` é inválido;
- schema versionado não bate com o SHA-256 travado.

Este check deve ser executado antes de mudanças de produção relevantes e antes do merge do harness.

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
