# Observability — OG Plano Saúde

## Objetivo

Conseguir detectar falhas do caminho de aquisição sem depender de ferramenta paga.

## Sinais mínimos

Precisamos conseguir responder:

- site está servindo?
- homepage e landings principais carregam?
- formulário inicia e conclui?
- `/api/leads` responde?
- persistência no banco está funcionando?
- qual foi o último erro relevante?
- Meta CAPI/notificação auxiliar falhou?
- admin legado autentica enquanto ainda existe?
- import Radar legado falha/sucesso enquanto ainda existe?

## Eventos/logs de backend

Preferir logs estruturados com:

```text
timestamp | level | request_id | route | operation | result | status_code | error_code
```

Quando houver entidade:

- usar ID interno/correlação quando suficiente;
- evitar telefone/e-mail completos em logs;
- nunca logar segredo, token, senha ou connection string.

## Request/correlation ID

APIs críticas devem evoluir para um `request_id`/`event_id` rastreável. Ele permite conectar:

- envio do formulário;
- persistência;
- CAPI/notificação;
- ingestão no CRM;
- incidente.

## Métricas operacionais mínimas

Sem exigir plataforma dedicada, conseguir derivar:

- leads recebidos por período;
- erros de criação de lead;
- status HTTP 4xx/5xx da rota crítica;
- origem/canal dos leads;
- tempo entre captura e ingestão no CRM quando integração direta existir;
- falhas auxiliares de CAPI/notificação;
- duplicações/retries quando idempotência for implementada.

## Alertas custo zero

Fase inicial:

- logs da Vercel;
- smoke check manual/scriptado;
- dashboard/consulta simples no próprio sistema;
- automação futura apenas se permanecer gratuita ou local.

APM pago é opcional.

## Indicadores de incidente

- queda abrupta para zero leads em período com tráfego conhecido;
- aumento de 5xx no `/api/leads`;
- erro de schema/migration;
- sucesso HTTP sem registro persistido;
- CRM sem ingestão apesar de persistência de origem;
- rota pública quebrada após deploy.

## Regra

Analytics não substitui observabilidade transacional. Evento de conversão não prova que o lead foi salvo; persistência e integração devem ter seus próprios sinais.
