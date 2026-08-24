# TRI Contracts — Blog local copy

Canonical authority:

`Joao-Matheus-Amorim/tri-ecosystem/contracts/1.0`

Contract family: `tri-contracts/1.0`.

## Papel do Blog

Producer futuro de:

- `tri.lead.created.v1`

O schema local existe para contract tests offline e precisa casar byte/hash com o lock canônico.

`tri.prospect.upserted.v1` também é espelhado para que o lock completo do ecossistema possa ser verificado localmente; o Blog não é seu producer.

## Estado

A presença destes schemas **não significa que o producer Blog → OG CRM já esteja implementado**.

Producer/outbox continua sendo workstream separado.

## Gate

Mesma versão com hash diferente = FAIL.
