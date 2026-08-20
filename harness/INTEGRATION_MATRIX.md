# Integration Matrix — OG Plano Saúde

Harness: **OG-HARNESS/1.0**  
Contracts: **og-contracts/1.0**

## Regra

Integração não é acoplamento. Este projeto conhece contratos, não implementações internas dos outros repositórios.

| Fluxo | Produtor | Consumidor | Owner do dado | Contrato | Falha permitida | Regra de retry |
|---|---|---|---|---|---|---|
| Lead de aquisição | OG Plano Saúde | OG CRM | CRM após ingestão; site preserva origem | Lead Contract v1 | CRM pode ficar temporariamente indisponível sem perder captura | retry idempotente / fila ou persistência local de ponte |
| Prospecto Radar legado | RadarPlan | endpoint legado do site | RadarPlan | Radar Contract v1 compat | temporária durante migração | fingerprint evita duplicação |
| Evento público/atribuição | OG Plano Saúde | analytics/CRM agregado | OG Plano Saúde | Event Contract v1 | analytics pode falhar sem bloquear lead | best effort |
| Feedback de venda | OG CRM | RadarPlan | OG CRM no fato comercial; Radar no aprendizado | Feedback Contract v1 | atraso permitido, perda silenciosa não | event_id/idempotency key |

## Lead Contract v1 — mínimo esperado

```json
{
  "contract_version": "og-contracts/1.0",
  "source_system": "blog-plano-saude",
  "external_id": "optional-idempotency-key",
  "nome": "",
  "telefone": "",
  "email": null,
  "cidade": null,
  "uf": null,
  "vidas": null,
  "tipo_plano": null,
  "origem": "",
  "canal": "",
  "tag_origem": "",
  "pagina_origem": "",
  "referrer": null,
  "consentimento_lgpd": false,
  "attribution": {
    "utm_source": null,
    "utm_medium": null,
    "utm_campaign": null,
    "utm_content": null,
    "utm_term": null,
    "fbclid": null
  }
}
```

Campos novos devem ser aditivos na v1 sempre que possível.

## Compatibilidade

- produtor pode enviar campo novo sem quebrar consumidor;
- consumidor não pode assumir presença de campo opcional;
- remoção/renomeação sem adapter = breaking change;
- enum compartilhado só pode mudar de forma aditiva dentro da mesma versão;
- significado de campo nunca muda silenciosamente;
- timestamps devem ter timezone explícito;
- IDs internos de um repo não viram identidade universal sem namespace.

## Idempotência

Para POST que pode ser repetido por timeout:

- preferir `external_id`, `event_id` ou fingerprint estável;
- consumidor deve detectar repetição quando efeito duplicado for danoso;
- resposta 2xx deve significar que a responsabilidade do consumidor foi assumida;
- sucesso de analytics/notificação não substitui sucesso de persistência.

## Autenticação máquina-a-máquina

- segredo separado de login humano;
- rotação sem alterar payload;
- segredo somente em ambiente servidor;
- nunca incluir token no query string ou Git.

## Timeouts e degradação

- integrações auxiliares têm timeout finito;
- captação não fica pendurada esperando serviço opcional;
- falha externa gera log estruturado com sistema, operação e correlação;
- retorno público não expõe segredo nem stack.

## Mudança cross-repo

Uma alteração que afeta outro repo exige:

1. declarar contrato afetado;
2. manter janela de compatibilidade;
3. PR produtor e consumidor referenciando a mesma versão;
4. teste de contrato;
5. ordem de deploy definida;
6. rollback definido para cada lado.
