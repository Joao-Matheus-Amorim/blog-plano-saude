# Inteligência Operacional — OG Plano Saúde

Versão: **2.0**  
Data-base: **2026-08-20**

Este documento define a doutrina específica do `blog-plano-saude` dentro do OG Ecosystem.

Documentos superiores:

- `docs/ECOSSISTEMA_OG.md`
- `docs/CONTRATOS_INTEGRACAO.md`

## 1. Missão

O OG Plano Saúde é a frente pública de aquisição.

Sua função é:

1. atrair demanda;
2. explicar e educar;
3. captar intenção com pouco atrito;
4. preservar origem/atribuição;
5. entregar a oportunidade ao OG CRM;
6. receber inteligência agregada do CRM/Radar para melhorar conteúdo.

Regra:

> O site captura. O CRM opera. O Radar encontra e prioriza oportunidades.

## 2. O site não é o CRM

O painel administrativo atual continua existindo apenas como legado durante a migração.

Novas funções como pipeline completo, tarefas, responsáveis, follow-up, propostas, vendas e métricas comerciais devem ser projetadas no `og-crm`, não neste repositório.

A retirada do admin segue `docs/MIGRACAO_ADMIN_OG_CRM.md`.

## 3. Captação mínima

O formulário público deve permanecer curto.

Campos mínimos:

- nome;
- WhatsApp.

Campos recomendados quando o contexto permitir:

- email;
- cidade;
- UF;
- tipo de interesse;
- quantidade aproximada de vidas;
- se possui MEI/CNPJ;
- mensagem;
- consentimento LGPD;
- página de origem;
- origem/canal;
- UTMs e identificadores de campanha.

Não exigir CNPJ numérico ou dado sensível desnecessário no primeiro contato.

## 4. Perfis comerciais canônicos

- `mei_familia`
- `mei_profissional`
- `micro_pme`
- `pme_local`
- `troca_reajuste`
- `indefinido`

O site pode sugerir perfil por regra simples, mas o OG CRM é o dono final da ficha comercial.

Perfil não significa elegibilidade de operadora.

## 5. Próxima pergunta humana

A tecnologia deve facilitar o atendimento sem prometer resultado.

Exemplos:

### `mei_familia`

> Você já tem MEI/CNPJ ativo? Seria para quantas pessoas e quais idades?

### `mei_profissional`

> Você quer cotar só para você ou pretende incluir familiar também?

### `micro_pme`

> Seria para sócios, funcionários ou os dois?

### `pme_local`

> Vocês já têm plano hoje ou estão implantando pela primeira vez?

### `troca_reajuste`

> Qual plano vocês têm hoje e em que mês costuma acontecer o reajuste?

### `indefinido`

> Você procura plano para você/família ou para empresa/equipe?

## 6. Atribuição é dado de primeira classe

O site deve preservar, quando disponíveis:

- `origem`;
- `canal`;
- `pagina_origem`;
- `referrer`;
- `utm_source`;
- `utm_medium`;
- `utm_campaign`;
- `utm_content`;
- `utm_term`;
- `fbclid`;
- `gclid`;
- `campaign_id`;
- `adset_id`;
- `ad_id`;
- `external_event_id`/`event_id`.

Atribuição não deve ser apagada quando o status comercial muda.

## 7. Lead Intake

Contrato oficial: `og-contracts/1.0` em `docs/CONTRATOS_INTEGRACAO.md`.

Estado atual:

- `POST /api/leads` valida nome/WhatsApp;
- usa Neon via `DATABASE_URL`;
- grava na tabela `lead`;
- calcula score fallback;
- pode enviar CallMeBot;
- pode enviar Meta CAPI.

Estado alvo:

- o site continua validando e enriquecendo dados de aquisição;
- envia o Lead Intake Contract para o OG CRM;
- o OG CRM torna-se dono lógico da operação comercial.

Até essa migração estar testada, o endpoint atual não deve ser removido.

## 8. Status comerciais

Valores canônicos do ecossistema:

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

O endpoint legado ainda aceita `Chamado`. Novos fluxos devem usar `Qualificando`.

A migração de dados antigos deve ser explícita e retrocompatível.

## 9. RadarPlan

RadarPlan é um produto separado.

O site não deve executar scraping ou inteligência pesada do Radar.

Estado atual de compatibilidade:

- `api/radar.js` recebe/importa prospectos;
- o admin atual possui `/admin/radar`;
- o endpoint pode converter prospecto em lead.

Estado alvo:

- RadarPlan envia prospectos diretamente ao OG CRM;
- OG CRM opera prospectos e conversão;
- Radar recebe feedback comercial do CRM;
- o site consome apenas inteligência agregada para conteúdo/aquisição.

## 10. Conteúdo guiado por dados

Priorizar pautas vindas de:

- buscas que geram lead;
- páginas que geram lead qualificado;
- dúvidas reais;
- objeções recorrentes;
- cidades com demanda;
- nichos encontrados pelo Radar;
- perfis de maior conversão;
- perdas comerciais recorrentes que podem ser tratadas por educação.

Páginas prioritárias continuam incluindo:

- plano de saúde para MEI no RJ;
- plano de saúde para MEI em Magé;
- plano de saúde para CNPJ pequeno;
- MEI pode colocar família no plano?;
- plano empresarial para 2 vidas;
- plano para pequenas empresas no RJ;
- plano para clínicas pequenas;
- plano para salão/estética;
- plano para restaurante pequeno;
- plano para funcionários.

## 11. Segurança e compliance

Permitido:

- explicar possibilidades;
- captar dados necessários;
- registrar consentimento;
- classificar intenção;
- sugerir pergunta/CTA;
- enviar evento de marketing compatível com consentimento/base aplicável.

Proibido:

- prometer preço antes de validação;
- prometer aceitação de MEI/CNPJ;
- prometer carência ou rede sem conferência vigente;
- fingir parceria oficial;
- guardar segredo no frontend;
- expor `DATABASE_URL`;
- coletar dado pessoal sem finalidade;
- automatizar disparo comercial massivo sem controle humano.

Frase segura:

> Consigo verificar opções possíveis, mas preciso confirmar idades, cidade, CNPJ/MEI e regras vigentes antes de te passar uma cotação correta.

## 12. Métricas do site

O site deve medir aquisição, não tentar substituir o CRM.

Métricas principais:

- sessões;
- origem/canal;
- CTA click;
- WhatsApp click;
- form start;
- form submit;
- taxa de conversão por página;
- leads por origem;
- CPL quando mídia paga for conhecida;
- páginas que geram leads qualificados/fechados via feedback do CRM.

Status, proposta, fechamento, CAC e receita são consolidados no OG CRM.

## 13. Definition of Done do site

Uma mudança de aquisição está pronta quando:

- captação funciona em mobile/desktop;
- nome/WhatsApp chegam corretamente;
- atribuição não se perde;
- consentimento é registrado quando aplicável;
- erro não expõe segredo;
- integração é retrocompatível;
- lead aparece no sistema comercial;
- Meta/analytics não duplicam evento indevidamente;
- documentação do contrato foi atualizada se payload mudou.

## 14. Regra final

> Capturar pouco, atribuir corretamente, entregar ao CRM e usar o aprendizado para captar melhor.
