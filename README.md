# Maisa Valentim — OG Plano Saúde / blog-plano-saude

Site institucional e blog da corretora **Maisa Valentim**, especializada em planos de saúde no Rio de Janeiro. Desenvolvido com React + Vite e hospedado na Vercel.

> Estado técnico/ownership: `PROJECT_MEMORY.md`. Evidência ROSS: `docs/ROSS_VALIDATION.md`.

## Papel no ecossistema

Este repositório é a frente pública de **aquisição, SEO, conteúdo, simulador/formulários e atribuição de origem**.

O fluxo comercial interno está sendo separado para o **OG CRM**. O painel/admin de leads existente continua como legado de transição até paridade e cutover comprovados; não deve ser removido por big-bang.

O **RadarPlan** permanece responsável por prospecção/inteligência/scoring público. O Blog/OG Plano Saúde não deve duplicar esse ownership.

## Funcionalidades atuais

- **Simulador de Cotação** — captura demanda pública antes de exibir o fluxo/resultados previstos pela aplicação.
- **Blog** — artigos educativos para SEO e nutrição.
- **Página de Operadoras** — conteúdo institucional/comercial.
- **Depoimentos** — prova social.
- **FAQ** — dúvidas frequentes.
- **Formulário de Contato** — integração server-side.
- **Painel Admin** — legado atual para gestão de leads/posts durante a transição para OG CRM.
- **Popup de Saída** — recuperação de visitantes.
- **WhatsApp Flutuante** — CTA público.

## Tecnologias

| Tecnologia | Uso |
|---|---|
| React 18 + Vite 5 | Frontend |
| React Router DOM v6 | Navegação SPA |
| Framer Motion | Animações |
| Neon + Vercel Functions | Backend / banco server-side |
| React Helmet Async | SEO dinâmico |
| Google Analytics | Rastreamento |
| Vercel | Deploy |

## Instalação e uso

Em CI/ROSS, usar o lockfile de forma reproduzível:

```bash
npm ci --ignore-scripts --no-audit --no-fund
```

Para desenvolvimento local:

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Estado ROSS — 2026-08-21

A `main` foi validada no worker no SHA:

```text
1369cea6b934d75f8b999c7833b41fd13890639d
```

Resultado observado:

```text
npm ci = PASS
lint = PASS
build = PASS
ROSS = PASS
```

O prebuild confirmou `12/12` Vercel serverless functions esperadas antes do build.

A falha anterior de `EROFS` em `/home/ross/.npm` era de infraestrutura do runner e foi corrigida sem enfraquecer `ProtectHome=read-only`; os caches agora ficam em área gravável do ROSS.

Warnings de dependências deprecated ainda existem e devem ser tratados em manutenção própria, mas não impediram a instalação, lint ou build atuais.

## Segurança e dados

- banco e segredos somente no servidor;
- não expor credenciais em `VITE_*`;
- coletar apenas dados necessários ao objetivo comercial;
- preservar origem/UTM;
- não introduzir dados clínicos/sensíveis de saúde no MVP de aquisição;
- lead não pode ser perdido silenciosamente em falha de integração;
- operação comercial pós-captura deve migrar de forma controlada para OG CRM.

## Deploy

O projeto possui integração com Vercel. Mudanças em `main` podem ter efeito de deploy conforme a configuração externa vigente; por isso documentação/correções devem respeitar separação Preview/Production e autorização de produção.

O PASS do ROSS não é autorização automática para promoção produtiva nem prova de E2E das Functions.

## Contato

- **WhatsApp:** [(21) 97747-2141](https://wa.me/5521977472141)
- **Instagram:** [@planosdesaudemaisavalentim](https://www.instagram.com/planosdesaudemaisavalentim/)
- **E-mail:** maisarvalentim@gmail.com

---

> Desenvolvido por [Joao Matheus Amorim](https://github.com/Joao-Matheus-Amorim)
