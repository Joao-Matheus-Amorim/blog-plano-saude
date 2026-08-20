# Zero-Cost Policy — OG Plano Saúde

Versão: OG-HARNESS/1.0

## Princípio

O caminho crítico deve continuar operável sem custo obrigatório incremental no estágio atual.

Caminho crítico:
- servir o site;
- receber formulário;
- persistir lead;
- autenticar operação necessária durante a transição;
- disponibilizar o lead ao OG CRM;
- manter diagnóstico mínimo.

## Regra para dependências

Toda nova dependência deve ser marcada como uma destas categorias:

- CORE_FREE: necessária e operável sem cobrança obrigatória;
- OPTIONAL_FREE: opcional e gratuita;
- OPTIONAL_EXTERNAL: opcional; sua indisponibilidade não quebra o core;
- NOT_ALLOWED_CORE: exige gasto obrigatório para o core funcionar.

`NOT_ALLOWED_CORE` reprova o gate de produção.

## Perguntas obrigatórias antes de adotar serviço externo

1. Qual problema resolve?
2. Existe alternativa local ou open source?
3. O que acontece quando o limite gratuito termina?
4. O core continua funcionando se o serviço cair?
5. Os dados são exportáveis?
6. É possível remover o serviço sem reescrever o domínio?

Resposta desconhecida em item crítico impede adoção.

## IA

IA não é requisito para criar lead nem para manter o site online. Classificação e sugestões devem ter fallback determinístico ou humano.

## Observabilidade

Logs estruturados, smoke checks e recursos gratuitos da infraestrutura existente são suficientes como base. Ferramenta externa de monitoramento pode ser complementar, nunca requisito do funcionamento.

## Escala

Se o volume ultrapassar capacidade gratuita, abrir decisão arquitetural explícita. Antes de qualquer custo novo, avaliar otimização, cache, redução de chamadas, execução local e remoção de duplicação.
