# ROSS Validation — OG Plano Saúde / blog-plano-saude

Autoridade: **ROSS Multi-Project CI**  
Branch executada: `main`  
SHA validado: `1369cea6b934d75f8b999c7833b41fd13890639d`

## Execução validada em 2026-08-21

| Etapa | Resultado |
|---|---|
| clone/reset | PASS |
| `npm ci --ignore-scripts --no-audit --no-fund` | PASS |
| `npm run lint` | PASS |
| `npm run build` | PASS |
| resultado geral ROSS | PASS |

Tempos observados:

```text
npm ci  19.068s
lint     4.579s
build   11.508s
```

O `prebuild` confirmou as `12/12` Vercel serverless functions esperadas antes do Vite build.

## Incidente anterior do runner

A execução anterior falhou antes dos gates com:

```text
npm error code EROFS
npm error path /home/ross/.npm/_cacache/tmp/...
npm error rofs EROFS: read-only file system
```

A causa foi classificada corretamente como **infraestrutura do ROSS**, não falha do Blog. O runner mantém `/home/ross` read-only por hardening e o npm tentava usar `$HOME/.npm` como cache.

A correção preservou o hardening:

- `ProtectHome=read-only` continua válido;
- caches npm/pip/XDG foram direcionados para `/srv/ross/ci/tmp`;
- clones passam por limpeza incluindo artefatos ignorados de execução anterior;
- nenhuma permissão ampla no home foi adicionada.

A nova execução comprovou que o setup reproduzível funciona e que lint/build estão verdes.

## Warnings de dependência

O npm ainda reportou pacotes deprecated, incluindo referências a `rimraf@3`, `glob@7`, `eslint@8` e dependências do ecossistema ESLint.

Esses warnings:

- não causaram o exit anterior;
- não impediram `npm ci` atual;
- não impediram lint;
- não impediram build;
- devem ser tratados como dívida de manutenção em mudança separada, com revalidação.

## Limite da evidência

O PASS atual prova:

- instalação reproduzível pelo lockfile;
- lint sem warnings aceitos pelo script configurado;
- execução do guard de Vercel Functions;
- build Vite de produção.

Ele **não prova por si só**:

- E2E das rotas serverless;
- integração real com banco;
- entrega Blog → OG CRM;
- comportamento de produção;
- contratos cross-repo.

Esses itens precisam de gates específicos antes de serem declarados PASS.

## Produção

A documentação canônica está sendo preparada na branch `docs/ross-validation-20260821`. O PASS registrado pertence ao SHA da `main` executado pelo worker. A branch documental não autoriza merge/deploy produtivo.
