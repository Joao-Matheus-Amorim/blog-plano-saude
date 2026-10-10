# Blog Plano Saúde — binding inbound do roadmap OG CRM 360 (08/10/2026)

**Status:** alinhamento documental / PLANNED; nenhum arquivo de runtime, formulário, API, contrato ou banco alterado.  
**Base histórica Production READY (07/09/2026), não main atual:** `f84b649e03d59773fcb19c25638b9bdd90cdbd96`.
**Fonte certificada de origem para reconciliação:** `8d621f0e2f0383ba43a21dd712a01f0563811455` (ROSS source PASS, PR #16). TRI #49 foi mergeada/certificada em `37be81e96016c330e4f4b5846a5fc7a61c0e2c6f`. A direção arquitetural está aceita, mas CRM360 continua **PLANNED**; não houve deploy novo.
**Autoridade:** `tri-ecosystem/docs/63_OG_CRM360_ARCHITECTURE_AND_DELIVERY_ROADMAP_20261008.md`; ADR-030; Change TRI-OG-CRM360-ROADMAP-20261008.  
**Histórico preservado:** `docs/TRI_CROSS_PROJECT_STATE_BINDING_20260907.md`, `PROJECT_MEMORY.md`, `ECOSYSTEM.md` e `harness/` continuam fontes locais.

## Papel estável

O Blog continua sendo o canal público da corretora: conteúdo/SEO, landing pages, simulação, formulário, consentimento/atribuição de origem e captura original persistida. Já há produtor `tri.lead.created.v1` em `api/_lib/tri-outbox.js`, gravação de lead e outbox na mesma transação em `api/leads/index.js` e consumidor no OG CRM. Blog→CRM foi observado em produção no cutover anterior. **Não será refeito** para criar a carteira ou para receber ficha Radar.

Novo produto OG CRM 360 mantém **três portas que não se misturam**:
1. Blog → lead inbound (interesse voluntário), dentro da integração já existente;
2. Radar → **ficha para análise**, jamais lead cadastrado ou contato automático;
3. Corretora → cliente existente manual/importado → contratos, revisões e histórico, sem Blog nem Radar necessários.

Blog não implementa `customer`, `contract`, agenda da corretora, score Radar, fila de aprovação Radar nem importação da carteira. Atribuição e consentimento originais seguem preservados no CRM; nenhum fluxo silenciosamente vira 'Radar' por conveniência de métrica.

## Roadmap de dependência do Blog

- **B0, agora:** reconhecer o novo contrato de ownership, sem mudanças técnicas; ancorar documentação canônica.
- **B1, quando G1/G2 do CRM estiverem prontos:** provar que landing e formulários continuam gravando o lead sem perder origem/consentimento, mesmo com CRM acrescido de carteira/contratos. Sem modificar producer se não houver incompatibilidade observada.
- **B2, com G3 CRM:** revisar UI/métricas de origem para não confundir inbound com ficha de Radar; não permitir que o Blog crie clientes ao processar uma ficha.
- **B3, se autorizado em mudança própria:** tendências agregadas do Radar podem orientar conteúdo/SEO, sem coleta de dados clínicos ou publicação automática.

## Crivo e release

- O `ROSS blog-plano-saude FAIL` histórico de evidência antecedeu a correção da PR #16. A `main` `8d621f0e` foi certificada source pelo ROSS, **não publicada**, e o último Production READY permanece na base antiga `f84b649e`; HTTP E2E do código novo continua pendente.
- `vercel.json` contém `git.deploymentEnabled=false`; merge não publica automaticamente. Release/HTTP externo seguem como gates manuais separados; esta PR documental não autoriza publicação.
- Nenhuma revisão de schema `tri.lead.created.v1`, contrato, secret, política de captura ou producer neste alinhamento.

**Critério de conclusão desta fase:** Blog reconhece a arquitetura e continua fazendo inbound para o CRM antigo sem alterar comportamento. Os módulos Carteira/Oportunidades são trabalho de OG CRM e Radar somente nas fronteiras definidas.
