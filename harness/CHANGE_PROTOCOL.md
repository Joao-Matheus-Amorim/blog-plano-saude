# Change Protocol — OG Plano Saúde

## Objetivo

Garantir que mudanças locais e cross-repo sejam previsíveis, reversíveis e documentadas.

## Tipos de mudança

### Tipo A — interna, sem contrato
Ex.: CSS, conteúdo, refactor sem alterar API/schema.

Requisitos: build, testes afetados, memory/harness continuam verdadeiros.

### Tipo B — schema/contrato aditivo
Ex.: novo campo opcional.

Requisitos: adapter, compatibilidade, fixture, consumidor tolerante, ordem de deploy.

### Tipo C — breaking
Ex.: remoção/renomeação de campo, mudança de significado, auth incompatível.

Requisitos: nova versão de contrato, migração paralela, janela de compatibilidade, rollout em fases, rollback de cada fase.

### Tipo D — ownership/arquitetura
Ex.: mover endpoint Radar do site para CRM.

Requisitos: ADR, atualização de `PROJECT_MEMORY.md`, harness, contratos, debt register e runbook na mesma iniciativa.

## Protocolo cross-repo

1. Definir mudança e versão.
2. Identificar producer/consumer/owner.
3. Implementar consumidor backward-compatible.
4. Testar fixture.
5. Publicar consumidor.
6. Implementar produtor.
7. Ativar comportamento novo.
8. Observar.
9. Remover compatibilidade antiga somente depois.
10. Fechar dívida correspondente.

## Commit/PR

Toda PR relevante deve dizer:

- o que muda;
- por que muda;
- qual domínio possui a mudança;
- contratos afetados;
- custo adicional obrigatório: deve ser zero ou a PR não passa sem decisão explícita;
- testes executados;
- ordem de deploy;
- rollback;
- dívida criada/fechada.

## Proibição

Não fazer em uma única mudança sem necessidade:

- migration destrutiva + remoção de compatibilidade + mudança de produtor;
- alteração de auth + contrato + UI sem fases verificáveis;
- mudança cross-repo sem identificar ordem de deploy.
