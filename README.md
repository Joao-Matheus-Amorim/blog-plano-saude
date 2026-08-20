# OG Plano Saúde — Aquisição e Conteúdo

Repositório do **OG Plano Saúde**, frente pública de aquisição do **OG Ecosystem**.

## Comece por aqui

Antes de alterar frontend, API, banco, autenticação, integração, deploy, custo ou fluxo de lead, leia:

1. `PROJECT_MEMORY.md` — memória canônica deste projeto;
2. `harness/README.md` — índice do harness de produção;
3. `harness/PRODUCTION_HARNESS.md` — gates obrigatórios;
4. `docs/README.md` — documentação de domínio.

Versões atuais:

- Harness: **OG-HARNESS/1.0**
- Contratos: **og-contracts/1.0**

## Papel no ecossistema

Este projeto é responsável por:

- site institucional;
- SEO e blog;
- landing pages;
- páginas por intenção/cidade;
- simuladores e formulários;
- captação de leads;
- consentimento LGPD;
- atribuição de origem e eventos de marketing;
- entrega de oportunidades ao sistema comercial por contrato estável.

O ecossistema possui três produtos independentes:

1. **OG Plano Saúde (`blog-plano-saude`)** — aquisição.
2. **RadarPlan (`radarplan`)** — inteligência e prospecção.
3. **OG CRM (`og-crm`)** — operação comercial e PWA interna.

> OG Plano Saúde encontra demanda. RadarPlan encontra oportunidade. OG CRM transforma oportunidade em venda e devolve aprendizado ao ecossistema.

## Princípios não negociáveis

- aquisição não perde lead;
- site não vira CRM;
- custo obrigatório incremental do core permanece **R$ 0** no estágio atual;
- contratos são versionados;
- ownership de dados é explícito;
- integração auxiliar não bloqueia persistência do lead;
- admin/Radar legados possuem plano de saída;
- segredo nunca entra no bundle público;
- dívida técnica é registrada;
- deploy e rollback precisam ser conhecidos.

## Estado atual

O código ainda contém o painel administrativo legado e endpoints operacionais. Hoje existem rotas como `/admin`, `/admin/organico`, `/admin/links` e `/admin/radar` no mesmo SPA.

Isso é **compatibilidade temporária**, não arquitetura final.

A migração será feita sem interromper captação ou perder dados. Consulte:

- `docs/README.md`
- `docs/ECOSSISTEMA_OG.md`
- `docs/CONTRATOS_INTEGRACAO.md`
- `docs/MIGRACAO_ADMIN_OG_CRM.md`
- `docs/INTELIGENCIA_OPERACIONAL_BLOG.md`
- `harness/DEBT_REGISTER.md`

## Funcionalidades públicas

- simulador/cotação;
- páginas de intenção de plano;
- páginas locais;
- blog para SEO;
- páginas de operadoras;
- depoimentos e FAQ;
- formulário de contato;
- WhatsApp;
- eventos orgânicos/atribuição;
- Meta CAPI quando configurada.

## Stack atual

| Tecnologia | Uso |
|---|---|
| React 18 + Vite 5 | frontend |
| React Router DOM v6 | navegação SPA |
| Framer Motion | animações |
| Vercel Functions | APIs server-side |
| Neon | PostgreSQL atual via `DATABASE_URL` |
| React Helmet Async | SEO dinâmico |
| Google Analytics | rastreamento |
| Vercel | deploy |

## Regras arquiteturais

- nenhum segredo no frontend;
- o site não deve virar CRM;
- novos fluxos internos devem nascer no OG CRM;
- RadarPlan não deve depender de componentes deste frontend;
- integrações entre projetos usam `og-contracts/1.0`;
- schemas executáveis ficam em `harness/contracts/`;
- banco físico pode permanecer compartilhado durante a migração, mas cada domínio tem dono lógico;
- remoção de admin/endpoints legados só ocorre após paridade e teste ponta a ponta.

## Desenvolvimento local

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Deploy

Deploy automático pela Vercel conforme configuração do repositório. Procedimentos de produção e rollback estão em `harness/RUNBOOK.md` e `harness/RELEASE_CHECKLIST.md`.

## Contato comercial

- WhatsApp: (21) 97747-2141
- Instagram: @planosdesaudemaisavalentim
- E-mail: maisarvalentim@gmail.com
