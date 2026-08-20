# Data Ownership — OG Plano Saúde

Harness: **OG-HARNESS/1.0**

## Princípio

O site é dono da **aquisição e atribuição inicial**, não da operação comercial completa.

## Matriz

| Entidade/Fato | Owner lógico | Writer primário | Readers |
|---|---|---|---|
| página pública/conteúdo | OG Plano Saúde | OG Plano Saúde | público/analytics |
| evento de aquisição | OG Plano Saúde | OG Plano Saúde | site/relatórios |
| lead no momento da captura | OG Plano Saúde | OG Plano Saúde | CRM |
| origem/UTM/referrer | OG Plano Saúde | OG Plano Saúde na captura | CRM preserva |
| consentimento LGPD da captura | OG Plano Saúde | OG Plano Saúde | CRM consulta |
| status comercial | OG CRM | OG CRM | site legado só em transição |
| responsável comercial | OG CRM | OG CRM | CRM |
| próxima ação/follow-up | OG CRM | OG CRM | CRM |
| proposta/fechamento/perda | OG CRM | OG CRM | relatórios agregados |
| prospecto/score/evidência Radar | RadarPlan | RadarPlan | CRM |

## Regras duras

1. O site não deve alterar status comercial como fonte definitiva após o CRM assumir.
2. Origem e atribuição inicial não devem ser reescritas pelo CRM para melhorar relatório.
3. O admin atual no site é compatibilidade temporária, não ownership.
4. Endpoints legados que escrevem domínio comercial devem ser removidos somente após paridade e cutover.
5. Compartilhar banco físico não significa compartilhar ownership.
6. Toda nova tabela/coluna precisa declarar owner lógico antes de implementação.
7. Um repo não vira writer do domínio de outro por conveniência técnica.

## Gate

Mudança que cria writer adicional sem decisão explícita = **Ownership Gate FAILED**.
