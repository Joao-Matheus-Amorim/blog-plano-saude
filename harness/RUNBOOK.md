# Production Runbook — OG Plano Saúde

## Rotina de pré-produção

1. Confirmar branch/PR corretos.
2. Ler `PROJECT_MEMORY.md`.
3. Verificar se a mudança altera ownership, contrato, schema, auth, deploy ou custo.
4. Rodar build/testes aplicáveis.
5. Validar fixtures dos contratos afetados.
6. Revisar variáveis de ambiente necessárias sem exibir valores secretos.
7. Registrar ordem de deploy quando houver mudança cross-repo.
8. Confirmar rollback.

## Deploy normal

1. Merge somente após gates aprovados.
2. Deploy do frontend/backend conforme integração atual da Vercel.
3. Executar smoke:
   - homepage;
   - landing principal;
   - formulário;
   - endpoint de lead;
   - admin legado enquanto existir.
4. Conferir logs de erro.
5. Confirmar persistência de um teste controlado quando necessário.

## Ordem de deploy cross-repo

Regra geral para mudança aditiva:

1. consumidor tolerante primeiro;
2. produtor depois;
3. ativar campo/comportamento novo;
4. observar;
5. só depois remover compatibilidade antiga em outra versão/PR.

Nunca publicar produtor breaking antes de o consumidor aceitar o novo contrato.

## Incidente: site fora do ar

- verificar último deploy;
- identificar se falha é build/runtime/configuração;
- rollback para último commit saudável;
- preservar banco;
- registrar causa e prevenção.

## Incidente: formulário responde erro

- testar endpoint diretamente com fixture sintética;
- verificar `DATABASE_URL` e logs sem revelar segredo;
- confirmar schema;
- verificar rate limit;
- verificar se integração opcional está bloqueando indevidamente;
- se mudança recente, rollback do app.

## Incidente: lead não chega ao CRM

Durante transição:

- confirmar se lead foi persistido no armazenamento fonte;
- nunca recriar manualmente sem antes verificar duplicação;
- verificar contract version/payload;
- verificar autenticação máquina-a-máquina;
- reprocessar de forma idempotente;
- registrar gap como incidente, não como rotina.

## Incidente: Radar indisponível

Nenhuma ação na captação pública. Site continua operando. Radar é complementar ao fluxo de aquisição.

## Incidente: free tier/limite atingido

Princípio: não comprar automaticamente serviço.

1. identificar recurso limitante;
2. aplicar degradação segura/cache/redução de frequência/operação local;
3. preservar captação e dados;
4. abrir decisão arquitetural se o volume tornou a solução gratuita inviável;
5. pagamento só entra por decisão explícita futura, nunca por dependência escondida.

## Recuperação de banco

Antes de ação destrutiva:

- exportar/backup dos dados afetados por mecanismo disponível;
- documentar query/migração;
- preferir mudança aditiva;
- testar em amostra/ambiente separado quando possível.

## Pós-incidente

Todo incidente relevante gera:

- descrição factual;
- impacto;
- causa raiz;
- correção;
- teste de regressão;
- mudança no harness se o processo não previa o problema.
