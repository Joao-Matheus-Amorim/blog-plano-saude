# OG Plano Saúde — Aquisição e Conteúdo

Repositório do **OG Plano Saúde**, frente pública de aquisição do **OG Ecosystem**.

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

## Estado atual

O código ainda contém o painel administrativo legado e endpoints operacionais. Hoje existem rotas como `/admin`, `/admin/organico`, `/admin/links` e `/admin/radar` no mesmo SPA.

Isso é **compatibilidade temporária**, não arquitetura final.

A migração será feita sem interromper captação ou perder dados. Consulte:

- `docs/README.md`
- `docs/ECOSSISTEMA_OG.md`
- `docs/CONTRATOS_INTEGRACAO.md`
- `docs/MIGRACAO_ADMIN_OG_CRM.md`
- `docs/INTELIGENCIA_OPERACIONAL_BLOG.md`

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

Deploy automático pela Vercel conforme configuração do repositório.

## Contato comercial

- WhatsApp: (21) 97747-2141
- Instagram: @planosdesaudemaisavalentim
- E-mail: maisarvalentim@gmail.com
