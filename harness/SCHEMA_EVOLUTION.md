# Schema Evolution — OG Plano Saúde

Harness: **OG-HARNESS/1.0**

## Objetivo

Evoluir o PostgreSQL/Neon sem quebrar captura, admin legado ou futuro CRM.

## Padrão obrigatório

`Expand -> Migrate -> App Transition -> Observe -> Contract`

### Expand
Adicionar coluna/tabela/índice de forma compatível.

### Migrate
Backfill separado quando necessário.

### App Transition
Código novo passa a ler/escrever novo formato mantendo compatibilidade temporária.

### Observe
Validar produção, queries, integração e dados antigos.

### Contract
Somente depois remover legado.

## Proibido

- `DROP COLUMN` junto com primeira release que deixa de usar;
- rename destrutivo sem período de compatibilidade;
- `NOT NULL` em tabela existente sem default/backfill/plano;
- migration manual não registrada;
- transformar endpoint do site em writer definitivo de domínio CRM por conveniência;
- alterar semântica de campo compartilhado sem nova versão de contrato.

## Leads

Campos novos devem ser preferencialmente aditivos e opcionais primeiro.

Leads antigos precisam continuar legíveis.

## Índices

Índice novo deve ter motivo de query/volume. Não criar índice por especulação.

## Ownership

Mudança de schema não muda ownership automaticamente. Ver `DATA_OWNERSHIP.md`.

## Rollback

Rollback de aplicação precisa funcionar sobre migration aditiva já aplicada.

Migration destrutiva sem estratégia de recuperação = **Schema Gate FAILED**.
