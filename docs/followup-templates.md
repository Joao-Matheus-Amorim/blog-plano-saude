# Follow-up comercial — referência de transição

Status: **conteúdo operacional a migrar para `og-crm`**.

Este arquivo permanece no `blog-plano-saude` somente para registrar a regra de transição. O site público não será o dono de cadência, tarefas ou mensagens de follow-up.

## Dono definitivo

O OG CRM deve controlar:

- status do lead;
- responsável;
- data da próxima ação;
- cadência;
- histórico de contatos;
- observações;
- proposta;
- fechamento/perda;
- motivo de perda.

## Regras para qualquer mensagem

- atendimento e envio permanecem humanos;
- não prometer preço antes da validação do caso;
- não prometer aceitação, carência ou rede sem regra vigente;
- não inventar urgência, validade de preço ou prova social;
- usar dados que o lead forneceu legitimamente;
- permitir encerramento do contato quando a pessoa não quiser continuar;
- registrar resultado e próxima ação no CRM.

## Cadência inicial sugerida

A cadência deve ser configurável no CRM, não codificada no site.

Referência inicial, sempre sujeita ao contexto humano:

1. primeiro contato após entrada do lead;
2. retorno no mesmo dia quando houver dado/cotação legítima a apresentar;
3. follow-up no dia seguinte se ficou pendência clara;
4. novo follow-up alguns dias depois;
5. encerrar ou espaçar quando não houver resposta, registrando `Sem resposta`.

## Mensagem-base segura

```text
Olá, [NOME]! Aqui é a Maisa. Recebi seu pedido pelo site e quero entender melhor o que você precisa para verificar as opções possíveis. Posso te fazer algumas perguntas rápidas sobre cidade, idades e tipo de contratação?
```

Para proposta/cotação:

```text
[NOME], consegui organizar as opções que fazem sentido para o cenário que você me passou. Antes de confirmar valores e condições, vou conferir as regras vigentes e os dados da contratação para te orientar corretamente.
```

## Fonte de verdade

Status, contratos e limites operacionais estão em:

- `ECOSSISTEMA_OG.md`
- `CONTRATOS_INTEGRACAO.md`
- `MIGRACAO_ADMIN_OG_CRM.md`

Quando o `og-crm` existir, os templates ativos devem morar lá e este arquivo pode ser removido em mudança separada.
