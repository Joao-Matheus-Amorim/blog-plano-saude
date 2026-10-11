# Maisa Valentim — Consultoria de Planos de Saúde

Site institucional e blog da corretora **Maisa Valentim**, especializada em planos de saúde no Rio de Janeiro. Desenvolvido com React + Vite e hospedado na Vercel.

## 📌 Sobre o Projeto

Plataforma completa de captacão e conversão de leads para venda de planos de saúde. Inclui simulador de cotacão, blog informativo, página de operadoras, depoimentos e painel administrativo.

## ✨ Funcionalidades

- **Simulador de Cotacão** — Captura leads com nome, email e WhatsApp antes de mostrar o resultado
- **Blog** — Artigos educativos para SEO e nutricão de leads
- **Página de Operadoras** — Bradesco, Unimed, SulAmérica, Amil, Notre Dame
- **Depoimentos** — Prova social de clientes
- **FAQ** — Dúvidas frequentes
- **Formulario de Contato** — Integrado via API serverless com Neon
- **Painel Admin** — Gestão de leads e posts
- **Popup de Saída** — Recuperacão de visitantes
- **WhatsApp Flutuante** — CTA permanente em todas as páginas

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| React 18 + Vite 5 | Frontend |
| React Router DOM v7 | Navegacão SPA |
| Framer Motion | Animacões |
| Neon + Vercel Functions | Backend / Banco de dados |
| React Helmet Async | SEO dinâmico |
| Google Analytics | Rastreamento |
| Vercel | Deploy |

## 🚀 Instalacão e Uso

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para producão
npm run build

# Preview do build
npm run preview
```

## 🌍 Deploy

O `vercel.json` define `git.deploymentEnabled=false`: a integração Git **não realiza deploy automático** ao atualizar a `main`. Publicação futura exige autorização manual própria, plano de rollback e verificação no ambiente publicado. Merge e certificação ROSS não significam deploy.

## 🤖 TRI — modo de engenharia

Este projeto segue o contrato cross-project do TRI em `docs/TRI_MODEL_SIDE_ENGINEERING_MODE.md`.

Regra operacional atual:

```text
model-side agent → branch/implementação/revisão/PR
GitHub → verdade de código e refs
ROSS → certificação por SHA quando exigida
usuário → Goal + aprovações + ROSS manual estritamente necessário
```

Ainda que a integração Git não publique automaticamente, trabalho normal — inclusive documentação — é **branch-first**, com revisão, testes e certificação aplicável. Publicar exige autorização separada. Não misturar comandos/branches de outros repositórios na sessão ativa deste projeto.

## 📞 Contato

- **WhatsApp:** [(21) 97747-2141](https://wa.me/5521977472141)
- **Instagram:** [@planosdesaudemaisavalentim](https://www.instagram.com/planosdesaudemaisavalentim/)
- **E-mail:** maisarvalentim@gmail.com

---

> Desenvolvido por [Joao Matheus Amorim](https://github.com/Joao-Matheus-Amorim)
