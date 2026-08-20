# Test Matrix — OG Plano Saúde

## Objetivo

Cobrir unidade, contrato, integração e smoke sem exigir ferramenta paga.

## Matriz mínima

| Área | Teste | Tipo | Bloqueia produção? |
|---|---|---|---|
| Build | `npm run build` | build | sim |
| Lint | comando existente do projeto | estático | sim quando configurado |
| Homepage | renderiza sem erro | smoke | sim |
| Landing | rotas principais carregam | smoke | sim |
| Formulário | valida nome/WhatsApp | funcional | sim |
| Lead API | cria lead válido | API | sim |
| Lead API | rejeita payload inválido | API | sim |
| Persistência | lead salvo com origem | integração DB | sim |
| Compatibilidade | lead antigo sem campos novos continua legível | regressão | sim |
| Rate limit | abuso retorna 429 sem derrubar serviço | segurança | sim antes de alterar security |
| Admin | rota protegida rejeita token ausente/inválido | segurança | sim enquanto legado existir |
| Radar legado | import sem segredo é negado | segurança | sim enquanto legado existir |
| Meta CAPI | falha não invalida lead | resiliência | sim |
| Notificação | falha não invalida lead | resiliência | sim |
| Contract v1 | payload mínimo aceito pelo consumidor-alvo | contrato | sim quando integração CRM existir |
| Idempotência | retry não duplica efeito crítico | integração | sim quando retry automático existir |

## Casos canônicos de lead

### Lead A — mínimo

```json
{
  "nome": "Lead Teste",
  "telefone": "21999999999",
  "origem": "harness_test",
  "consentimento_lgpd": true
}
```

Esperado: persistência válida, `status` inicial compatível, sem depender de integração opcional.

### Lead B — atribuído

Inclui cidade, UF, tipo, vidas, página, canal e UTMs. Esperado: todos os campos suportados preservados sem reclassificar origem silenciosamente.

### Lead C — inválido

Sem telefone. Esperado: 4xx com mensagem pública segura e nenhum registro criado.

## Regras para dados de teste

- nunca usar telefone/e-mail real de cliente;
- identificar `harness_test` na origem/tag;
- limpar registros de teste quando necessário;
- não disparar mensagem real para terceiros;
- ambiente de teste não reutiliza credenciais pessoais quando evitável.

## Teste cross-repo

Antes de alterar contrato:

1. serializar fixture v1;
2. validar schema;
3. consumir fixture no destino;
4. verificar campos desconhecidos;
5. testar retry;
6. testar timeout;
7. testar resposta inválida;
8. testar versão não suportada.

## Política

Teste manual pode complementar, nunca substituir silenciosamente teste automatizável recorrente. Todo bug de produção relevante deve virar caso de regressão ou checklist explícito do harness.
