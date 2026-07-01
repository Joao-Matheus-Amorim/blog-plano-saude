# Motor de Inteligência Orgânica

Este documento estrutura a captação sem compra de tráfego e com separação clara entre sinal, entidade, contato e lead.

- Sinal: evidência pública ou anônima de intenção.
- Entidade: pessoa pública, empresa, operadora ou fonte de mercado.
- Contato: canal legítimo, preferencialmente institucional ou fornecido com consentimento.
- Lead: alguém que pediu contato, chamou no WhatsApp ou preencheu formulário.

## 1. Recepção

Captura o que acontece dentro do nosso site.

Tabelas principais:

- lead
- site_event
- consent_log

Eventos recomendados:

- page_view
- cta_click
- whatsapp_click
- form_start
- form_submit
- form_error

## 2. Sinais de intenção

Guarda posts e páginas públicas recentes que indicam demanda.

Tabelas principais:

- intent_signal
- public_actor_snapshot
- signal_action
- content_opportunity

Campos mínimos:

- source_key
- niche_key
- usuario_publico
- url_perfil
- url_post
- texto_trecho
- keyword
- tema
- intencao
- cidade_detectada
- operadora_detectada
- data_post
- score
- temperatura
- acao_recomendada
- link_sugerido
- expires_at

Regra de retenção: 45 dias para sinais pessoais públicos. Depois disso, arquivar ou manter apenas estatística agregada.

## 3. Reputação pública

Reclamações, elogios, dúvidas e dores citando operadoras ou temas.

Tabelas principais:

- reputation_signal
- content_opportunity

Temas úteis:

- reajuste
- portabilidade
- rede_credenciada
- negativa_cobertura
- carencia
- coparticipacao
- reembolso
- comparacao_operadora

## 4. Caça B2B pública

Empresas locais com contato institucional público.

Tabelas principais:

- company_entity
- company_contact_channel
- company_hunt_signal

Regra: contato pessoal não entra. Canal permitido é institucional: site, telefone comercial, WhatsApp comercial, Instagram comercial ou e-mail genérico.

## 5. Operadoras e documentos públicos

Base de materiais públicos de operadoras.

Tabelas principais:

- operator_catalog
- operator_document

Materiais:

- PDFs públicos
- páginas institucionais
- rede credenciada pública
- abrangência
- carências
- coparticipação
- reembolso
- regulamentos públicos

## 6. ANS e dados públicos

Base regulatória e de mercado, sempre separada de leads.

Tabelas principais:

- ans_dataset_import
- ans_market_metric
- operator_catalog

Usos:

- validar operadora
- cruzar cidade e disponibilidade
- criar conteúdo com dados públicos
- melhorar argumentos comerciais
- comparar mercado por região

## 7. Governança

Tabelas principais:

- intelligence_source
- source_keyword_rule
- collection_run
- suppression_list
- consent_log

Regras duras:

- trabalhar apenas com fontes permitidas e abertas
- não enviar mensagem privada automática
- não coletar canal pessoal de perfil pessoal
- não transformar sinal público em contato privado
- não reter sinal pessoal público por mais de 45 dias sem base clara
- sempre guardar URL de origem e motivo do alerta

## Fluxo ideal

1. O coletor encontra um sinal público recente.
2. O sistema salva em intent_signal ou reputation_signal.
3. O classificador calcula tema, nicho, cidade, operadora, score e risco.
4. O painel recomenda uma ação pública ou conteúdo.
5. A pessoa entra em link rastreável.
6. Se preencher formulário ou chamar WhatsApp, vira lead.
7. O CRM recebe origem, canal, score e consentimento.

## Status padrão

Sinais:

- Novo
- Avaliado
- Respondido
- Conteúdo criado
- Convertido
- Ignorado
- Expirado

Empresas:

- Novo
- Qualificado
- Contatar
- Chamado
- Em negociação
- Fechado
- Ignorado

Operadoras/documentos:

- Novo
- Indexado
- Revisar
- Usado em conteúdo
- Arquivado
