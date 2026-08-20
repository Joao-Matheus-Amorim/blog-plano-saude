# Migração do Admin para o OG CRM

Data-base: **2026-08-20**

Este documento define como retirar com segurança o painel administrativo do `blog-plano-saude` e transferir a operação comercial para o futuro repositório `og-crm`.

## 1. Estado atual confirmado

O site público e o admin estão no mesmo SPA React.

Rotas administrativas atuais:

- `/admin`
- `/admin/organico`
- `/admin/links`
- `/admin/radar`

Arquivos principais:

- `src/pages/PaginaAdmin.jsx`
- `src/pages/PaginaAdminOrganico.jsx`
- `src/pages/PaginaAdminLinks.jsx`
- `src/pages/PaginaAdminRadar.jsx`
- `src/components/AdminDock.jsx`

APIs internas relevantes hoje:

- `POST /api/leads`
- endpoints de listagem/alteração de leads em `api/leads/*`
- `PATCH /api/leads/update-status`
- `GET|POST /api/radar`

Infra atual:

- React + Vite no frontend;
- Vercel Functions no backend;
- Neon via `DATABASE_URL`;
- autenticação admin própria com token HMAC/JWT de 8 horas;
- segredo opcional `RADAR_IMPORT_SECRET` para importação Radar.

## 2. Problema arquitetural

O admin no mesmo repositório do site cria acoplamento entre:

- deploy público e operação interna;
- design do site e design do CRM;
- evolução SEO e evolução comercial;
- integrações Radar e frontend público;
- autenticação interna e aplicação pública.

A separação é necessária para permitir que o site evolua sem arriscar a operação e que o CRM seja mobile-first/PWA sem herdar o design do site.

## 3. Regra de migração

> Primeiro construir e provar o OG CRM. Depois retirar o legado.

Nunca remover o admin antes de existir paridade funcional e teste com dados reais.

## 4. O que migrar

### 4.1 Regras de negócio — migrar

- status comerciais;
- observação interna;
- origem/atribuição;
- score existente;
- vínculo Radar -> lead;
- conversão de prospecto;
- filtros úteis;
- ações WhatsApp;
- regras de segurança/compliance;
- leitura de dados antigos.

### 4.2 Backend operacional — mover gradualmente

Mover para o OG CRM:

- listagem de leads;
- detalhe de lead;
- atualização de status;
- histórico de interações;
- responsável pelo lead;
- próxima ação e agenda;
- propostas e resultado;
- listagem/gestão de prospectos Radar;
- conversão Radar -> lead;
- feedback CRM -> Radar;
- métricas comerciais;
- autenticação de usuários internos.

### 4.3 Continuar no site

Continuar em `blog-plano-saude`:

- páginas públicas;
- SEO;
- landing pages;
- formulário/simulador;
- coleta de eventos do site;
- captura de consentimento;
- atribuição de marketing;
- envio server-side do lead pelo contrato de intake;
- Meta CAPI/eventos ligados ao site, se ainda fizer sentido operacional.

## 5. Fases

### Fase A — documentação e contratos

Critérios:

- `ECOSSISTEMA_OG.md` aprovado como referência;
- `CONTRATOS_INTEGRACAO.md` definido;
- status e perfis canônicos definidos;
- responsabilidades sem ambiguidade.

### Fase B — criar OG CRM em paralelo

O novo CRM começa sem remover nada do site.

Mínimo para primeira versão:

- login;
- dashboard Hoje;
- lista de leads;
- detalhe de lead;
- status;
- observação;
- próxima ação;
- botão WhatsApp;
- Radar;
- conversão Radar -> lead;
- PWA instalável;
- layout mobile-first.

### Fase C — usar o mesmo dado sem duplicação

Preferência:

- OG CRM lê o mesmo sistema de registro durante a transição;
- não copiar banco inteiro;
- não criar sincronização bidirecional desnecessária;
- novas tabelas comerciais passam a ter dono lógico OG CRM.

### Fase D — mover escrita operacional

Quando CRM estiver estável:

- toda alteração de status acontece pelo CRM;
- toda observação acontece pelo CRM;
- follow-up e tarefas nascem no CRM;
- Radar é operado no CRM;
- admin antigo passa a ser somente fallback temporário.

### Fase E — mover intake para contrato definitivo

O site deixa de depender da implementação interna do CRM.

Fluxo alvo:

```text
formulário do site
  -> Vercel Function do site
  -> validação/rate limit/atribuição
  -> Lead Intake Contract
  -> endpoint de intake do OG CRM
  -> resposta segura
```

Enquanto isso não estiver pronto, `POST /api/leads` continua gravando no Neon atual.

### Fase F — desativar admin legado

Só depois de 100% dos itens abaixo:

- leads novos aparecem no CRM;
- leads antigos aparecem no CRM;
- status funciona;
- observações funcionam;
- Radar funciona;
- autenticação funciona;
- atribuição é preservada;
- nenhum fluxo diário depende do admin antigo;
- existe rollback simples.

Primeiro remover links/rotas públicas para o admin antigo. Depois, em mudança separada, remover componentes e endpoints obsoletos.

## 6. Matriz de paridade

| Função | Admin atual | OG CRM necessário | Pode remover legado? |
|---|---:|---:|---:|
| login | sim | sim | somente após teste |
| listar leads | sim | sim | não antes |
| status | sim | sim + canônico | não antes |
| observação | sim | sim | não antes |
| WhatsApp | sim | sim | não antes |
| Radar | sim | sim | não antes |
| converter Radar -> lead | sim | sim | não antes |
| orgânico/atribuição | parcial | visualização no CRM | após validar |
| follow-up | limitado | completo | não antes |
| responsável | não estruturado | obrigatório | melhora nova |
| histórico | limitado | obrigatório | melhora nova |
| venda/perda | parcial | obrigatório | melhora nova |
| métricas comerciais | parcial | obrigatório | melhora nova |

## 7. Incompatibilidades atuais conhecidas

### 7.1 Status

O endpoint atual aceita:

- `Novo`
- `Chamado`
- `Em cotação`
- `Proposta enviada`
- `Fechado`
- `Perdido`
- `Sem resposta`

O contrato novo usa:

- `Novo`
- `Qualificando`
- `Aguardando dados`
- `Em cotação`
- `Proposta enviada`
- `Follow-up`
- `Fechado`
- `Perdido`
- `Sem resposta`
- `Descartado`

A migração deve ler `Chamado` e apresentá-lo como equivalente legado de `Qualificando`, sem alterar dados antigos silenciosamente.

### 7.2 Lead table

A tabela atual não possui ainda todos os campos do CRM. Campos futuros devem ser aditivos e retrocompatíveis.

### 7.3 Radar

Hoje `api/radar.js` está fisicamente no site e também converte prospecto em lead.

Destino final: essa operação pertence ao OG CRM. O site só mantém a ponte até o novo endpoint estar testado.

## 8. Rollback

Em qualquer etapa anterior à remoção final:

- manter admin legado deployável;
- manter schema retrocompatível;
- não renomear/remover coluna usada pelo site;
- alterações destrutivas só em migração posterior;
- se CRM falhar, captura pública deve continuar funcionando.

## 9. Definition of Done da migração

A migração só termina quando:

- `blog-plano-saude` não contém interface de operação comercial;
- OG CRM é a única interface interna diária;
- RadarPlan integra diretamente com contrato do CRM;
- site envia leads por contrato estável;
- origem e histórico sobrevivem ponta a ponta;
- autenticação de CRM não depende da página pública;
- banco/credenciais estão documentados por dono lógico;
- testes de lead inbound e Radar -> lead passam;
- documentação dos três repositórios aponta para a mesma versão dos contratos.
