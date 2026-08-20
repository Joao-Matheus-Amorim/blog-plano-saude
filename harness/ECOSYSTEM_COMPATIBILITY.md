# Ecosystem Compatibility — OG Plano Saúde

## Versões exigidas

- Local harness: `OG-HARNESS/1.0`
- Shared contracts: `og-contracts/1.0`

## Contratos produzidos

### Lead v1
SHA-256 canônico:
`298725170cfa117287431ad7e789b14f9e5a4b00eb072c564b41ab9301001ee3`

Consumidor esperado: OG CRM.

### Acquisition Event v1
SHA-256 canônico:
`dec7b7f6e9f869d5741f380ed859cc24377c5db7c33f71de60a0a25ecfe8e926`

## RadarPlan

O site não depende do Radar para capturar lead. `/api/radar` é compatibilidade transitória registrada no Debt Register.

## OG CRM

Para cutover, OG CRM precisa aceitar Lead v1 com hash idêntico, preservar origem, possuir auth/RBAC, cobrir pipeline/owner/next action e receber Radar diretamente.

## Gate

Mesma versão + hash diferente = **Contract Gate FAIL**.

Schema diferente exige nova versão e janela de compatibilidade.
