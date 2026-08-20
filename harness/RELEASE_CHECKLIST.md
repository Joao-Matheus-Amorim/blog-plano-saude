# Release Checklist — OG Plano Saúde

## Identificação

- [ ] Branch/PR corretos.
- [ ] Tipo de mudança identificado: UI / API / schema / auth / integração / arquitetura.
- [ ] `PROJECT_MEMORY.md` continua verdadeiro.

## Build e funcional

- [ ] `npm run build` passa.
- [ ] Rotas públicas afetadas carregam.
- [ ] Formulário valida campos mínimos.
- [ ] Lead válido é aceito.
- [ ] Lead inválido é rejeitado com 4xx seguro.
- [ ] Lead persistido preserva origem/canal/página suportados.
- [ ] Registros antigos continuam legíveis.

## Banco

- [ ] Mudança de schema é aditiva ou possui migração segura.
- [ ] Sem operação destrutiva junto com remoção imediata de compatibilidade.
- [ ] Índices/impacto de consulta foram avaliados quando necessário.
- [ ] Backup/export foi considerado antes de mudança destrutiva.

## Integração

- [ ] Contract version declarada.
- [ ] Fixture válida.
- [ ] Consumidor tolerante pronto antes do produtor quando cross-repo.
- [ ] Retry/idempotência revisados.
- [ ] Falha de integração auxiliar não perde lead.
- [ ] Ordem de deploy documentada.

## Segurança

- [ ] Nenhum secret no diff.
- [ ] Endpoint admin continua protegido enquanto legado existir.
- [ ] Endpoint público sensível tem rate limiting/validação aplicável.
- [ ] Erro público não vaza stack/configuração sensível.
- [ ] Logs não expõem PII desnecessária.

## Custo

- [ ] Custo obrigatório incremental permanece R$ 0.
- [ ] Serviço externo novo é opcional/degradável ou não entra no core.
- [ ] IA paga não virou requisito.
- [ ] Limite de free tier tem comportamento conhecido.

## Operação

- [ ] Smoke pós-deploy definido.
- [ ] Observabilidade cobre a mudança.
- [ ] Rollback conhecido.
- [ ] Debt register atualizado.
- [ ] Harness/docs atualizados na mesma PR.

## Resultado

Só considerar release pronta quando todos os itens aplicáveis estiverem resolvidos de forma objetiva.
