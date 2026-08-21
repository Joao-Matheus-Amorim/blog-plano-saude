# ROSS Validation — OG Plano Saúde / blog-plano-saude

Autoridade: **ROSS Multi-Project CI**  
Branch executada: `main`  
SHA observado: `1369cea6b934d75f8b999c7833b41fd13890639d`

## Execução de 2026-08-21

| Etapa | Resultado |
|---|---|
| clone/reset | PASS |
| `npm ci --ignore-scripts --no-audit --no-fund` | FAIL — exit 226 |
| lint | NÃO EXECUTADO |
| build | NÃO EXECUTADO |
| resultado geral | FAIL |

Erro determinante:

```text
npm error code EROFS
npm error path /home/ross/.npm/_cacache/tmp/...
npm error rofs EROFS: read-only file system
```

## Classificação

**Falha de infraestrutura do ROSS antes dos gates do projeto.**

O serviço ROSS deliberadamente mantém `/home/ross` read-only. O npm, sem configuração adicional, tenta usar `$HOME/.npm` como cache e logs. A solução correta é apontar o cache do npm para uma área de runtime gravável sob `/srv/ross/ci/tmp`; não liberar escrita geral no home e não desativar o hardening do serviço.

Warnings de pacotes deprecated e erros de limpeza de `node_modules` apareceram na mesma execução, mas não são a causa final registrada do exit 226. Eles serão avaliados depois que o setup for reproduzível.

## Critério para próxima rodada

A próxima execução só poderá ser marcada como sucesso quando observar:

```text
npm ci exit=0
lint exit=0
build exit=0
ROSS status=pass
```

Se `npm ci` passar e um gate posterior falhar, a causa passa a ser analisada como falha do projeto naquele gate. Antes disso, não inferir resultado de lint/build.

## Correção de infraestrutura esperada

Sem enfraquecer `ProtectHome=read-only`, o runner deve fornecer cache gravável por projeto, por exemplo conceitualmente:

```text
npm_config_cache=/srv/ross/ci/tmp/npm-cache/blog-plano-saude
```

Também é recomendável aplicar política equivalente ao cache do pip para projetos Python, evitando warnings de cache em `/home/ross/.cache`.

## Produção

Esta documentação foi preparada numa branch dedicada. A atualização documental não autoriza merge/deploy produtivo e não altera o resultado histórico da execução em `main`.
