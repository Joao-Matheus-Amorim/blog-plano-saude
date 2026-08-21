# PROJECT MEMORY — OG Plano Saúde / blog-plano-saude

Repositório: `blog-plano-saude`  
Papel no ecossistema: **aquisição pública, SEO, conteúdo, simulador/formulários, atribuição e origem do lead**  
Autoridade de validação técnica do worker: **ROSS Multi-Project CI**  
Estado em 2026-08-21: **main validada no ROSS no SHA `1369cea6b934d75f8b999c7833b41fd13890639d`: npm ci PASS, lint PASS, build PASS.**

## 1. Missão

O projeto é a frente pública de aquisição do ecossistema de planos de saúde. Seu trabalho é atrair demanda, informar, capturar contato/consentimento necessários e registrar origem/atribuição de forma confiável.

O site não deve absorver progressivamente a operação comercial que pertence ao OG CRM.

## 2. Ownership no ecossistema

OG Plano Saúde / blog-plano-saude é dono de:

- site público e landing pages;
- SEO e conteúdo editorial;
- páginas de operadoras e conteúdo informativo;
- formulários, simulador e captura pública inicial;
- consentimento e metadados de origem/UTM quando aplicável;
- experiência pública de conversão;
- entrega confiável do lead para a camada operacional;
- analytics/atribuição da aquisição, respeitando minimização de dados.

Não é dono, no modelo alvo, de:

- pipeline comercial completo;
- responsável do lead;
- próxima ação;
- follow-up operacional;
- proposta/cotação como workflow interno;
- fechamento/perda e motivo de perda;
- métricas comerciais internas;
- inteligência/scoring público do RadarPlan.

Esses itens pertencem ao **OG CRM** depois que a demanda vira lead operacional. Prospecção/inteligência pública pertence ao **RadarPlan**.

## 3. Admin legado

O repositório ainda possui painel/admin de leads e posts. Isso é uma dependência de transição, não autorização para remover funcionalidade hoje.

Regra de migração:

1. manter o admin legado disponível enquanto não houver paridade operacional;
2. migrar autenticação/operação de leads para OG CRM em etapas;
3. validar uso real;
4. somente depois executar cutover/remover duplicidade;
5. nunca fazer big-bang que coloque leads em risco.

Posts/conteúdo podem continuar pertencendo ao projeto público mesmo depois da migração do workflow comercial.

## 4. Integrações

Fluxo alvo:

```text
Visitante
  -> OG Plano Saúde
  -> Lead Contract v1 + origem/atribuição
  -> OG CRM
  -> atendimento/follow-up/venda

RadarPlan
  -> Radar Prospect Contract v1
  -> OG CRM
```

A integração deve compartilhar dados/contratos. Browser público não recebe credenciais de banco.

## 5. Segurança e dados

- nenhum segredo em `VITE_*`;
- credenciais de banco somente no servidor;
- coletar apenas dados necessários ao objetivo comercial;
- dados clínicos/sensíveis de saúde não fazem parte do MVP de aquisição;
- não registrar payloads sensíveis completos em logs;
- lead não pode desaparecer silenciosamente em falha de integração;
- origem/UTM não deve ser reescrita para maquiar relatório;
- venda final permanece humana.

## 6. ROSS

Execução validada em 2026-08-21:

```text
branch: main
sha: 1369cea6b934d75f8b999c7833b41fd13890639d

npm ci --ignore-scripts --no-audit --no-fund    PASS
npm run lint                                     PASS
npm run build                                    PASS
ROSS status                                      PASS
```

O prebuild também confirmou `12/12` Vercel serverless functions esperadas antes do Vite build.

A falha anterior de setup (`EROFS` em `/home/ross/.npm/_cacache`) era de infraestrutura do runner. Foi resolvida mantendo `ProtectHome=read-only` e redirecionando caches para `/srv/ross/ci/tmp`; nenhuma permissão ampla no home foi liberada.

Warnings de dependências deprecated permaneceram na instalação, mas **não foram a causa de falha** e não impediram lint/build. São dívida de manutenção separada.

## 7. Regras de validação

- PASS só depois de execução real;
- SKIP/não executado nunca vira PASS;
- setup quebrado bloqueia os gates seguintes;
- warnings de dependência não são automaticamente FAIL;
- `npm ci` usa lockfile existente;
- novo SHA precisa de nova evidência quando a certificação for exigida por SHA exato;
- correções do runner devem preservar o hardening.

## 8. Débitos atuais

1. Revisar dependências obsoletas sinalizadas pelo npm (`eslint@8`, `rimraf@3`, `glob@7`, etc.) em mudança própria e com revalidação.
2. Definir contrato formal de entrega de lead para OG CRM e preservar origem/atribuição.
3. Planejar retirada do admin comercial legado somente após paridade comprovada do OG CRM.
4. Consolidar documentação de deploy/ambientes para não confundir Preview com Production.
5. Ampliar o ROSS além de lint/build para smoke determinístico das rotas serverless críticas sem depender de produção.

## 9. Ordem de autoridade documental

1. `PROJECT_MEMORY.md`
2. `README.md`
3. `docs/ROSS_VALIDATION.md`
4. documentação funcional/SEO existente

Documentação não substitui evidência do worker nem autorização de produção.
