# Work Session Protocol — OG Plano Saúde

## Objetivo

Evitar perda de contexto entre sessões, pessoas e agentes.

## Antes de tocar no código

Obrigatório ler, nesta ordem:

1. `PROJECT_MEMORY.md`;
2. `harness/STATE.json`;
3. `harness/DEBT_REGISTER.md`;
4. `harness/PRODUCTION_HARNESS.md`;
5. `harness/INTEGRATION_MATRIX.md` se a tarefa tocar integração;
6. `harness/ENVIRONMENT_MATRIX.md` se tocar configuração/deploy;
7. docs específicos da área.

Depois confirmar:

- qual é o objetivo da tarefa;
- qual domínio é owner;
- se outro repo é impactado;
- qual contrato/schema é afetado;
- se há dívida relacionada;
- se custo obrigatório continua zero.

## Durante a mudança

- não alterar responsabilidade arquitetural por conveniência;
- não criar fallback hardcoded;
- não esconder problema com comentário TODO sem Debt ID;
- não mudar schema compartilhado só neste repo;
- manter mudança pequena/reversível quando possível;
- bug de produção relevante gera regressão.

## Antes de encerrar

Responder objetivamente:

1. O que mudou?
2. O que não mudou?
3. Qual teste passou?
4. Qual contrato foi afetado?
5. Qual migration/config mudou?
6. Qual rollback existe?
7. Houve dívida nova? Qual ID?
8. `PROJECT_MEMORY.md` continua 100% verdadeiro?
9. `STATE.json` continua verdadeiro?
10. Outro repo precisa de mudança coordenada?

## Atualizações obrigatórias

Se a resposta indicar mudança arquitetural, atualizar na mesma PR:

- `PROJECT_MEMORY.md`;
- harness afetado;
- `STATE.json`;
- contrato/LOCK quando necessário;
- `DEBT_REGISTER.md`;
- ADR quando aplicável.

## Regra final

A sessão não termina com “funcionou”. Termina quando o estado do repo pode ser entendido por quem chegar depois sem depender da memória de quem fez a mudança.
