# Execução — OG Plano Saúde

Versão: **2.0**  
Data-base: **2026-08-20**

Este documento é o plano técnico do `blog-plano-saude` depois da decisão de separar o OG CRM.

Documentos obrigatórios antes de alterar integração:

- `docs/ECOSSISTEMA_OG.md`
- `docs/CONTRATOS_INTEGRACAO.md`
- `docs/MIGRACAO_ADMIN_OG_CRM.md`

## 0. Objetivo do repositório

Fazer muito bem cinco coisas:

1. atrair;
2. converter visitante em lead;
3. preservar atribuição;
4. entregar o lead ao sistema comercial;
5. aprender com o resultado agregado para melhorar aquisição.

Não criar novas features de CRM neste repositório.

## 1. Estado atual que deve continuar funcionando

Arquivos críticos de captação:

- `api/_lib/leads.js`
- `api/leads/index.js`
- formulários/simuladores que chamam `/api/leads`
- rastreamento em `src/App.jsx`

Compatibilidade operacional temporária:

- `src/pages/PaginaAdmin.jsx`
- `src/pages/PaginaAdminOrganico.jsx`
- `src/pages/PaginaAdminLinks.jsx`
- `src/pages/PaginaAdminRadar.jsx`
- `api/leads/*`
- `api/radar.js`

Esses arquivos não são destino arquitetural. Não remover até o OG CRM atingir paridade.

## 2. Prioridade A — atribuição completa

Adicionar de forma retrocompatível ao intake e armazenamento:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `fbclid`
- `gclid`
- `campaign_id`
- `adset_id`
- `ad_id`
- `external_event_id`

Critério de pronto:

- lead real preserva origem do primeiro envio;
- campos ausentes não quebram formulário antigo;
- dados aparecem no OG CRM quando o contrato estiver ligado;
- event ID pode evitar duplicidade de eventos Meta quando usado.

## 3. Prioridade B — Lead Intake Contract

Contrato: `og-contracts/1.0`.

Enquanto OG CRM não existir em produção:

- `/api/leads` continua sendo o endpoint de entrada;
- gravação Neon continua funcionando;
- alterações de schema são somente aditivas.

Quando OG CRM disponibilizar intake:

1. manter validação pública no site;
2. normalizar payload;
3. encaminhar server-to-server para o CRM;
4. tratar timeout/erro sem expor segredo;
5. instrumentar falha;
6. manter fallback definido durante a transição;
7. testar lead real ponta a ponta.

## 4. Prioridade C — formulário comercial leve

Perguntas permitidas sem transformar formulário em interrogatório:

- você tem MEI/CNPJ?;
- o plano seria para você/família ou empresa/equipe?;
- quantidade aproximada de vidas;
- cidade/UF.

Não exigir:

- CNPJ completo no primeiro passo;
- dado clínico;
- documento pessoal;
- informação que possa ser pedida no atendimento humano.

## 5. Prioridade D — páginas de conversão

Manter/expandir:

- `/planos/mei`
- `/planos/familiar`
- `/planos/empresarial`
- `/planos/individual`
- `/planos/idoso`
- `/planos/gestante`
- `/planos/portabilidade`
- `/plano-saude-mage`
- `/plano-saude-piabeta`

Novas páginas devem registrar `pagina_origem` e UTMs no lead.

## 6. Prioridade E — analytics de aquisição

Eventos recomendados:

- `page_view`
- `cta_click`
- `whatsapp_click`
- `form_start`
- `form_submit`
- `form_error`

Regras:

- evitar evento duplicado;
- eventos não podem conter dado sensível desnecessário;
- páginas admin não entram em analytics público;
- resultado comercial volta ao site apenas para análise agregada/atribuição.

## 7. Status e perfil — compatibilidade apenas

O site deve entender os valores canônicos para não quebrar dados, mas novas telas operacionais pertencem ao OG CRM.

Status:

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

Perfis:

- `mei_familia`
- `mei_profissional`
- `micro_pme`
- `pme_local`
- `troca_reajuste`
- `indefinido`

`Chamado` é status legado equivalente funcional a `Qualificando` para leitura/migração.

## 8. Radar — plano de saída do site

Hoje:

- `api/radar.js` importa/lista/atualiza/converte;
- `/admin/radar` opera prospectos.

Meta:

- RadarPlan -> OG CRM diretamente;
- site deixa de ser intermediário operacional;
- site recebe apenas inteligência agregada para conteúdo.

Não mover enquanto:

- OG CRM não tiver autenticação;
- contrato de prospect não estiver implementado;
- conversão Radar -> lead não preservar vínculo/evidência;
- feedback CRM -> Radar não estiver definido/testado.

## 9. Admin legado — congelamento funcional

Permitido no admin antigo:

- correção de bug;
- correção de segurança;
- compatibilidade necessária à migração;
- leitura de campo novo necessária para fallback.

Evitar:

- novo dashboard complexo;
- nova agenda;
- novo pipeline;
- múltiplos usuários;
- notificações avançadas;
- proposta/cotação estruturada;
- PWA do admin antigo.

Essas features pertencem ao `og-crm`.

## 10. Segurança

Antes de cada alteração server-side:

- confirmar que `DATABASE_URL` permanece server-only;
- validar payload;
- manter rate limit de endpoint público;
- não devolver detalhe interno em produção;
- não logar token/senha;
- usar segredo dedicado entre serviços;
- não reutilizar senha admin como API key.

## 11. Testes mínimos antes de deploy

### Lead inbound

1. abrir landing;
2. preencher formulário;
3. confirmar sucesso;
4. verificar lead persistido;
5. verificar telefone/nome;
6. verificar origem/página;
7. verificar UTMs quando presentes;
8. verificar evento Meta sem duplicidade quando configurado.

### Compatibilidade

- lead sem campos novos continua salvando;
- lead antigo continua listável;
- status legado não quebra a interface antiga;
- site público funciona sem admin.

### Integração futura CRM

- timeout do CRM tem comportamento definido;
- resposta 4xx não é tratada como sucesso;
- resposta 5xx gera observabilidade;
- nenhuma credencial de serviço chega ao browser.

## 12. Ordem de execução recomendada

1. documentação comum;
2. OG CRM criado em repo separado;
3. atribuição completa no site;
4. contrato de intake implementado no CRM;
5. integração site -> CRM;
6. paridade do admin no CRM;
7. Radar -> CRM;
8. operação real pelo CRM;
9. congelar admin legado;
10. remover admin legado em PR separado;
11. remover endpoints operacionais obsoletos em PR posterior.

## 13. Definition of Done do repositório após migração

- site público não depende do frontend do CRM;
- formulário gera lead no CRM por contrato;
- atribuição chega íntegra;
- `/admin*` não é necessário para operação;
- Radar não depende de endpoint do site;
- código do site fica focado em aquisição/conteúdo;
- documentação aponta para a mesma versão dos contratos dos outros repos.
