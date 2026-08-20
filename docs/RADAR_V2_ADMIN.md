# Radar V2 no admin — legado de transição

Status: compatibilidade temporária.

A arquitetura final não mantém o Radar dentro do site. As responsabilidades oficiais são:

- `radarplan`: inteligência, prospecção, score e evidências;
- `og-crm`: operação, revisão, conversão em lead e feedback comercial;
- `blog-plano-saude`: aquisição pública e conteúdo.

O código atual ainda mantém `/admin/radar` e `/api/radar` para não interromper a operação antes da criação do OG CRM.

## Regras durante a migração

- prospecto não é lead;
- conversão deve continuar explícita;
- fingerprint, score, fonte e evidências devem ser preservados;
- correções de bug e segurança continuam permitidas;
- novas funções operacionais do Radar devem nascer no OG CRM;
- este módulo só pode ser removido depois de paridade funcional comprovada.

## Contrato

O formato compartilhado oficial está em `CONTRATOS_INTEGRACAO.md`, versão `og-contracts/1.0`.

Hoje a ponte existente continua sendo `/api/radar`.

No destino final, RadarPlan envia prospectos ao OG CRM e o CRM devolve feedback de resultado ao RadarPlan.

## Critério de remoção

Só retirar `/admin/radar` quando o OG CRM tiver listagem, filtros, score, maturidade, evidências, revisão, conversão Radar -> lead, vínculo persistente e autenticação interna funcionando ponta a ponta.
