# Documentação — OG Plano Saúde

Este diretório contém a documentação oficial do repositório `blog-plano-saude` dentro do **OG Ecosystem**.

## Hierarquia de autoridade

Quando dois documentos parecerem divergir, use esta ordem:

1. `ECOSSISTEMA_OG.md` — fronteiras entre OG Plano Saúde, RadarPlan e OG CRM.
2. `CONTRATOS_INTEGRACAO.md` — contratos de dados e integração entre os três produtos.
3. `INTELIGENCIA_OPERACIONAL_BLOG.md` — doutrina específica do site público.
4. `MIGRACAO_ADMIN_OG_CRM.md` — plano de retirada segura do admin deste repositório.
5. `TODO_EXECUCAO_BLOG.md` — execução técnica do site.
6. Demais documentos — referências especializadas ou históricas.

## Estado do repositório em 2026-08-20

O código atual ainda reúne duas responsabilidades:

- frente pública de aquisição;
- painel administrativo/operacional.

Também mantém endpoints internos de leads e RadarPlan usando Vercel Functions e Neon.

Essa combinação é **estado atual**, não arquitetura final.

## Arquitetura-alvo

- **OG Plano Saúde (`blog-plano-saude`)**: aquisição, SEO, landing pages, simuladores, formulários, atribuição e eventos públicos.
- **RadarPlan (`radarplan`)**: inteligência, prospecção, enriquecimento, score, evidências e recomendações.
- **OG CRM (`og-crm`)**: operação comercial, pipeline, follow-up, tarefas, propostas, vendas, usuários, métricas e interface PWA.

Os três produtos são separados por repositório e deploy. Eles compartilham **contratos de dados**, não componentes de frontend.

## Regra de mudança

Qualquer alteração que mude payload, status, identidade de lead, autenticação, origem, score, feedback ou vínculo Radar deve atualizar primeiro os contratos documentados e depois o código consumidor/produtor correspondente.

## Regra de compatibilidade

Durante a migração do admin para o OG CRM:

- o site público não pode parar de captar;
- leads antigos continuam legíveis;
- campos novos devem ser retrocompatíveis;
- endpoints antigos só são removidos após equivalência funcional comprovada no OG CRM;
- nenhuma migração destrutiva de banco é feita sem plano explícito de rollback.
