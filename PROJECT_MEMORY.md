# PROJECT MEMORY — OG Plano Saúde

Harness: **OG-HARNESS/1.0**  
Contract: **og-contracts/1.0**  
Project: `blog-plano-saude`  
Role: **aquisição pública, conteúdo, SEO e captura de demanda**  
Status: **produção existente com desacoplamento do admin em andamento**

> Este arquivo é a memória canônica de entrada deste repositório. Antes de qualquer mudança de arquitetura, integração, banco, autenticação, deploy ou fluxo de lead, leia este arquivo e `harness/PRODUCTION_HARNESS.md`.

## 1. Missão

O OG Plano Saúde é a frente pública do ecossistema. Ele deve atrair demanda, explicar o produto com responsabilidade, capturar intenção com baixo atrito e entregar um lead rastreável para a operação comercial.

Ele **não é o CRM definitivo** e **não é o motor de inteligência comercial**.

## 2. O que este projeto possui

Este repositório é dono de:

- páginas públicas e landing pages;
- SEO e conteúdo;
- formulários e simulador de entrada;
- captura de origem, página e canal;
- eventos públicos do site;
- criação inicial de lead;
- consentimento e rastreabilidade da captação;
- Meta CAPI/analytics associados à aquisição quando configurados;
- UX pública de conversão.

Não é dono definitivo de:

- pipeline comercial;
- responsável pelo lead;
- follow-up;
- agenda comercial;
- propostas;
- fechamento/perda;
- inteligência/scoring do RadarPlan;
- cadência de prospecção.

Esses domínios pertencem ao `og-crm` e ao `radarplan` conforme o contrato do ecossistema.

## 3. Estado real atual

Produção atual conhecida pelo código:

- frontend React + Vite;
- deploy na Vercel;
- backend serverless em `api/`;
- PostgreSQL via Neon usando `DATABASE_URL`;
- criação de lead em `/api/leads`;
- admin legado em rotas `/admin*`;
- integração Radar legada em `/api/radar`;
- autenticação admin própria baseada em token assinado;
- Meta CAPI e notificação WhatsApp opcionais por variáveis de ambiente.

Importante: o fato de admin e Radar ainda estarem no repositório é **estado de transição**, não arquitetura alvo.

## 4. Arquitetura alvo

```text
visitante / Instagram / Google / indicação
                 |
                 v
          OG Plano Saúde
        aquisição + captura
                 |
          Lead Contract v1
                 |
                 v
              OG CRM
        operação comercial
                 ^
                 |
        Radar Contract v1
                 |
             RadarPlan
```

Regra: o site pode continuar funcionando e captando demanda mesmo se o Radar estiver indisponível. A indisponibilidade temporária do CRM deve ter estratégia de preservação da captura, nunca perda silenciosa de lead.

## 5. Banco e ownership

O banco pode permanecer fisicamente no Neon durante a migração. **Localização física não define ownership lógico.**

Ownership lógico:

- captação/origem/eventos públicos: OG Plano Saúde;
- entidade comercial, status, owner, follow-up, proposta e resultado: OG CRM;
- prospecto, evidência, score, maturidade e inteligência: RadarPlan.

Qualquer tabela compartilhada precisa ter owner declarado no contrato. Escrita concorrente sem owner é proibida.

## 6. Contratos obrigatórios

Versão atual: `og-contracts/1.0`.

Mudança breaking exige nova versão. Nunca alterar silenciosamente o significado de campo já publicado.

Fluxos principais:

1. Site -> CRM: criação/atualização de lead de aquisição.
2. RadarPlan -> CRM: publicação de prospecto/inteligência.
3. CRM -> RadarPlan: feedback comercial.
4. CRM -> Site: apenas dados agregados ou sinais necessários para otimização de aquisição; o site não passa a operar o pipeline.

## 7. Regra de custo zero

**CUSTO MANDATÓRIO DE INFRA NOVA = R$ 0.**

Uma mudança falha no gate de produção se exigir pagamento recorrente para o funcionamento básico.

Permitido:

- software open source;
- execução local;
- free tiers já utilizados, desde que o sistema continue com alternativa ou degradação segura caso o limite seja atingido;
- serviços opcionais pagos somente se não forem requisito para o núcleo funcionar.

Proibido sem decisão arquitetural explícita:

- dependência obrigatória de API paga;
- fila, auth, banco, observabilidade ou IA que só funcione mediante cobrança;
- recurso que interrompa captação por falta de crédito.

## 8. Regra de dívida

Não existe “dívida invisível”. Toda exceção temporária precisa estar em `harness/DEBT_REGISTER.md` com:

- fato atual;
- por que existe;
- risco;
- owner;
- critério de saída;
- milestone de remoção.

Gambiarra sem registro é bug de processo.

Estado transitório conhecido: admin e endpoint Radar ainda vivem neste repo. Isso está registrado e possui plano de saída.

## 9. Segurança e privacidade

- segredos nunca entram no Git;
- navegador não acessa banco diretamente;
- endpoints administrativos exigem autenticação;
- importação máquina-a-máquina exige segredo/credencial própria;
- coletar o mínimo necessário;
- não transformar dados de saúde em requisito de formulário público;
- não prometer preço, aceitação, rede ou carência sem validação humana e regra vigente;
- logs não devem expor credenciais ou dados pessoais completos desnecessariamente.

## 10. Gates antes de produção

Toda mudança relevante precisa passar por:

1. Memory Gate — memória continua verdadeira.
2. Ownership Gate — owner do dado/ação está claro.
3. Contract Gate — integração compatível/versionada.
4. Zero-Cost Gate — núcleo continua R$ 0 obrigatório.
5. Security Gate — sem segredo/dado sensível indevido.
6. Test Gate — testes do repo e integração afetada passam.
7. Migration Gate — mudança de schema é backward-compatible ou tem plano explícito.
8. Deploy Gate — deploy reproduzível.
9. Rollback Gate — existe forma objetiva de voltar.
10. Observability Gate — falha crítica é detectável.

## 11. Definição de pronto deste projeto

Uma feature só está pronta quando:

- captura não perde lead;
- origem é rastreável;
- contrato de saída é válido;
- não cria novo ownership comercial no site;
- funciona sem dependência paga obrigatória;
- documentação/harness refletem a realidade;
- rollback é conhecido;
- dívida nova = zero ou explicitamente registrada com saída antes do marco de produção.

## 12. Documentos de autoridade

Ordem de leitura:

1. `PROJECT_MEMORY.md`
2. `harness/PRODUCTION_HARNESS.md`
3. `harness/INTEGRATION_MATRIX.md`
4. `harness/TEST_MATRIX.md`
5. `harness/RUNBOOK.md`
6. `harness/ZERO_COST_POLICY.md`
7. `harness/DEBT_REGISTER.md`
8. `docs/ECOSSISTEMA_OG.md`
9. `docs/CONTRATOS_INTEGRACAO.md`
10. documentos específicos de domínio.

Se dois documentos entrarem em conflito, esta memória + harness vigente prevalecem, e o documento antigo deve ser corrigido na mesma mudança.
