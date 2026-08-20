# E2E Flows — OG Plano Saúde

Harness: **OG-HARNESS/1.0**

## E2E-01 — Instagram/Meta -> site -> lead persistido

1. visitante chega com origem/UTM;
2. navega para landing/simulador;
3. envia formulário;
4. API valida e persiste lead;
5. origem/canal/página/referrer são preservados;
6. resposta ao cliente confirma recebimento;
7. integrações auxiliares rodam sem bloquear persistência;
8. Lead v1 fica disponível para CRM/ponte.

Critério: falha de Meta CAPI, WhatsApp ou analytics não perde lead.

## E2E-02 — Orgânico -> conteúdo -> WhatsApp/form

1. busca orgânica entra em conteúdo;
2. page/source é registrada;
3. visitante converte;
4. lead mantém página de origem;
5. CRM consegue relacionar conversão à aquisição.

## E2E-03 — Lead duplicado/retry

Retry do mesmo submit não deve criar duplicação destrutiva quando existir `external_id`/idempotency strategy.

## E2E-04 — Banco indisponível

1. API falha ao persistir;
2. usuário recebe erro seguro e acionável;
3. nenhuma integração externa é tratada como sucesso substituto;
4. erro é observável.

## E2E-05 — Integração Meta indisponível

Lead é persistido normalmente; falha é registrada separadamente.

## E2E-06 — Radar indisponível

Site público continua operando sem impacto na captura.

## E2E-07 — CRM indisponível durante transição

Lead permanece no storage/ponte atual e pode ser ingerido depois com idempotência. O site não perde a captura por indisponibilidade do CRM.

## E2E-08 — Admin legado

Enquanto existir:
- login funciona;
- leitura de lead funciona;
- mutação autorizada funciona;
- remoção só ocorre depois de E2E equivalente no CRM.

## E2E-09 — Deploy de frontend

Nova versão publica sem quebrar rotas públicas, formulários, blog, landing pages ou API contract.

## E2E-10 — Cutover CRM

1. CRM consome Lead v1;
2. operação real usa CRM;
3. admin legado vira read-only/ponte quando definido;
4. endpoint legado só é removido após período de estabilidade.
