# TODO de Execução — Blog Plano de Saúde

Este documento é o passo a passo técnico-operacional do `blog-plano-saude` para uso pessoal.

O projeto é individual. Não é para virar uma empresa inchada, nem uma plataforma genérica. A regra é: capturar lead, ajudar você a entender o caso, apoiar o atendimento humano e registrar o que aconteceu.

Documento-base: `docs/INTELIGENCIA_OPERACIONAL_BLOG.md`.

## 0. Norte operacional

O blog deve fazer quatro coisas muito bem:

1. atrair pessoas interessadas em plano de saúde pelo Google, WhatsApp, indicação ou página local;
2. capturar dados mínimos sem espantar o lead;
3. transformar o lead em uma ficha útil para atendimento humano;
4. devolver feedback para o RadarPlan aprender.

O blog não deve:

- vender sozinho;
- prometer preço;
- prometer aceitação;
- depender de chatbot;
- importar CSV/tabela de corretora;
- fazer scraping pesado;
- tentar resolver toda a inteligência dentro da Vercel.

## 1. Primeira passada no código atual

Antes de alterar, abrir estes arquivos:

- `api/_lib/leads.js`;
- `api/leads/index.js`;
- `api/leads/get.js`;
- `api/leads/update-status.js`;
- `api/radar.js`;
- `api/_lib/radar.js`;
- `src/pages/PaginaAdmin.jsx`;
- componentes de formulário/simulador que enviam lead para `/api/leads`.

Objetivo da leitura:

- confirmar campos atuais do lead;
- confirmar onde o formulário manda payload;
- confirmar onde o admin exibe lead;
- confirmar como status é atualizado;
- confirmar como prospectos do Radar entram no blog;
- não sair alterando tela antes de ajustar o modelo.

## 2. Fase 1 — Ajustar banco do lead

Arquivo principal: `api/_lib/leads.js`.

Adicionar colunas novas em `ensureLeadTable` usando `ALTER TABLE ADD COLUMN IF NOT EXISTS`.

Campos recomendados:

```sql
ALTER TABLE lead ADD COLUMN IF NOT EXISTS perfil_comercial TEXT;
ALTER TABLE lead ADD COLUMN IF NOT EXISTS dor_provavel TEXT;
ALTER TABLE lead ADD COLUMN IF NOT EXISTS proxima_pergunta TEXT;
ALTER TABLE lead ADD COLUMN IF NOT EXISTS objecao_principal TEXT;
ALTER TABLE lead ADD COLUMN IF NOT EXISTS mes_reajuste TEXT;
ALTER TABLE lead ADD COLUMN IF NOT EXISTS possui_cnpj BOOLEAN;
ALTER TABLE lead ADD COLUMN IF NOT EXISTS cnpj_informado TEXT;
ALTER TABLE lead ADD COLUMN IF NOT EXISTS radar_prospect_id INTEGER;
ALTER TABLE lead ADD COLUMN IF NOT EXISTS ultima_interacao_em TIMESTAMPTZ;
ALTER TABLE lead ADD COLUMN IF NOT EXISTS proxima_acao TEXT;
```

Critério de pronto:

- build não quebra;
- lead antigo continua funcionando;
- lead novo salva mesmo sem esses campos;
- admin consegue listar leads antigos e novos.

## 3. Fase 2 — Padronizar status comerciais

Status oficiais:

- `Novo`;
- `Qualificando`;
- `Aguardando dados`;
- `Em cotação`;
- `Proposta enviada`;
- `Follow-up`;
- `Fechado`;
- `Perdido`;
- `Sem resposta`;
- `Descartado`.

Alterar:

- `src/pages/PaginaAdmin.jsx`, constante `leadStatuses`;
- validação em `api/leads/update-status.js`, se houver lista fechada;
- qualquer filtro visual que dependa de status antigo.

Regra operacional:

- `Novo` só existe antes do primeiro contato;
- depois do primeiro WhatsApp, virar `Qualificando` ou `Sem resposta`;
- se pediu dados, virar `Aguardando dados`;
- se já tem informação suficiente, virar `Em cotação`;
- se enviou proposta, virar `Proposta enviada`;
- se precisa retorno, virar `Follow-up`.

Critério de pronto:

- o admin filtra por todos os status;
- status antigo não explode a tela;
- status atualizado grava no banco.

## 4. Fase 3 — Classificação simples sem IA

Criar uma função pura, preferencialmente em um helper novo:

`api/_lib/lead-intelligence.js`

Funções mínimas:

```js
export function classifyLead(input) {}
export function buildNextQuestion(profile, input) {}
export function detectLikelyPain(input) {}
```

Regras iniciais:

### `mei_familia`

Quando:

- tipo de plano contém `mei`;
- mensagem contém `familia`, `família`, `filho`, `esposa`, `marido`, `dependente`;
- vidas >= 2 e possui CNPJ/MEI.

Próxima pergunta:

> Você já tem MEI/CNPJ ativo? Seria para quantas pessoas e quais idades?

### `mei_profissional`

Quando:

- tipo contém `mei`;
- vidas <= 1;
- mensagem fala de autônomo, profissional, CNPJ próprio.

Próxima pergunta:

> Você quer cotar só para você ou pretende incluir familiar também?

### `micro_pme`

Quando:

- tipo contém `empresa`, `pme`, `funcionário`, `funcionario`, `colaborador`;
- vidas entre 2 e 9.

Próxima pergunta:

> Seria para sócios, funcionários ou os dois?

### `pme_local`

Quando:

- vidas >= 10;
- mensagem fala de equipe, benefício, empresa ou contratação.

Próxima pergunta:

> Vocês já têm plano hoje ou estão implantando pela primeira vez?

### `troca_reajuste`

Quando mensagem contém:

- `trocar`;
- `reajuste`;
- `aumentou`;
- `caro`;
- `portabilidade`;
- `já tenho plano`.

Próxima pergunta:

> Qual plano você tem hoje e em que mês costuma acontecer o reajuste?

### `indefinido`

Fallback.

Próxima pergunta:

> Você procura plano para você/família ou para empresa/equipe?

Critério de pronto:

- função recebe payload do formulário e devolve JSON;
- não usa LLM;
- não chama API externa;
- pode ser testada manualmente com objetos simples.

## 5. Fase 4 — Enriquecer lead ao salvar

Arquivo: `api/leads/index.js`.

Na hora de receber POST:

1. ler payload;
2. normalizar campos;
3. chamar `classifyLead`;
4. salvar campos novos junto com o lead.

Campos a salvar:

- `perfil_comercial`;
- `dor_provavel`;
- `proxima_pergunta`;
- `possui_cnpj`;
- `cnpj_informado`, se existir;
- `proxima_acao`, padrão `Fazer primeira qualificação humana`.

Não alterar a regra principal: nome e WhatsApp continuam obrigatórios.

Critério de pronto:

- lead novo aparece no admin com perfil;
- se a classificação falhar, salva como `indefinido`;
- API continua retornando `success: true`.

## 6. Fase 5 — Ajustar formulário sem pesar

Localizar componentes que enviam lead.

Adicionar no formulário, sem deixar gigante:

Pergunta curta:

> Você tem MEI/CNPJ?

Opções:

- Tenho MEI;
- Tenho CNPJ de empresa;
- Não tenho;
- Não sei;
- Prefiro explicar no WhatsApp.

Outra pergunta curta:

> O plano seria para quem?

Opções:

- Só para mim;
- Para mim e família;
- Para funcionários;
- Para sócios e funcionários;
- Quero trocar um plano atual;
- Ainda não sei.

Payload sugerido:

```json
{
  "possui_cnpj": true,
  "tipo_interesse": "mei_familia",
  "tipo_plano": "MEI/Família"
}
```

Critério de pronto:

- formulário ainda fica rápido;
- mobile continua bom;
- não exige CNPJ numérico no primeiro contato;
- WhatsApp continua sendo o canal central.

## 7. Fase 6 — Ajustar painel admin para atendimento humano

Arquivo principal: `src/pages/PaginaAdmin.jsx`.

Cada card/linha de lead deve mostrar:

- perfil comercial;
- dor provável;
- próxima pergunta;
- próxima ação;
- cidade/UF;
- vidas;
- possui CNPJ/MEI;
- status;
- observação interna;
- botão WhatsApp;
- botão copiar abordagem.

A mensagem do WhatsApp deve usar a próxima pergunta.

Exemplo de mensagem para `mei_familia`:

```txt
Olá, [nome]! Aqui é a Maisa. Recebi seu pedido de cotação pelo site. Para eu te orientar melhor: você já tem MEI/CNPJ ativo? Seria para quantas pessoas e quais idades?
```

Regra:

- não prometer preço;
- não prometer aceitação;
- sempre pedir dados necessários;
- atendimento humano decide o próximo passo.

Critério de pronto:

- atendente abre admin e sabe exatamente o que perguntar;
- botão WhatsApp usa mensagem coerente com perfil;
- observação interna continua funcionando.

## 8. Fase 7 — Melhorar endpoint Radar no blog

Arquivos:

- `api/radar.js`;
- `api/_lib/radar.js`.

Adicionar suporte a campos:

- `perfil_comercial`;
- `dor_provavel`;
- `proxima_pergunta`;
- `proxima_acao`;
- `restricao_abordagem`, se vier do Radar.

Na conversão de prospect para lead:

- preservar `radar_prospect_id`;
- copiar perfil comercial;
- copiar abordagem;
- copiar próxima ação;
- copiar cidade/UF;
- copiar score;
- marcar origem como `Radarplan`.

Critério de pronto:

- prospect importado do Radar aparece completo;
- converter prospect gera lead vinculado;
- não perde evidência e score.

## 9. Fase 8 — Feedback para o Radar

Criar endpoint futuro:

`api/radar/feedback.js` ou ação em `api/radar.js?action=feedback`.

Payload mínimo:

```json
{
  "lead_id": 123,
  "radar_prospect_id": 456,
  "status": "Em cotação",
  "perfil_comercial": "mei_familia",
  "possui_cnpj": true,
  "vidas": 3,
  "objecao_principal": "preço",
  "mes_reajuste": "novembro",
  "resultado": "pediu_cotacao",
  "observacao": "Quer para ele, esposa e filho"
}
```

No admin, quando salvar observação/status, futuramente mandar esse feedback para a base de inteligência.

Critério de pronto:

- o que você descobre no atendimento não morre na sua cabeça;
- volta para o Radar;
- vira aprendizado.

## 10. Fase 9 — Conteúdo guiado por dados

Criar uma aba ou arquivo simples com pautas.

Começar manualmente com páginas:

- Plano de saúde para MEI no RJ;
- Plano de saúde para MEI em Magé;
- Plano de saúde para CNPJ pequeno;
- MEI pode colocar família no plano de saúde?;
- Plano de saúde empresarial para 2 vidas;
- Plano de saúde para pequenas empresas no RJ;
- Plano de saúde para salão de beleza e estética;
- Plano de saúde para clínicas pequenas;
- Plano de saúde para restaurante pequeno;
- Plano de saúde para funcionários.

Regra de conteúdo:

- explicar sem juridiquês;
- sempre dizer que depende de regra da operadora/corretora;
- CTA para atendimento humano;
- não publicar preço fixo;
- não prometer aceitação.

Critério de pronto:

- cada página tem CTA claro;
- cada página grava `pagina_origem` no lead;
- depois dá para saber qual página trouxe lead bom.

## 11. Fase 10 — Copiloto interno simples

Só depois das fases anteriores.

Criar camada opcional:

- regras primeiro;
- LLM local/OpenRouter depois;
- nunca obrigatório.

Funções:

- resumir lead;
- sugerir próxima pergunta;
- sugerir abordagem;
- detectar risco de promessa;
- buscar caso parecido.

Critério de pronto:

- se IA falhar, sistema continua;
- IA não envia mensagem sozinha;
- atendimento humano revisa tudo.

## 12. Rotina diária de uso

Todo dia:

1. abrir admin;
2. ver leads `Novo`;
3. responder pelo WhatsApp;
4. mudar status;
5. preencher observação;
6. registrar objeção;
7. marcar próxima ação;
8. revisar prospectos Radar;
9. converter apenas o que vale abordar;
10. anotar dúvida recorrente para virar conteúdo.

## 13. Ordem rápida de implementação

Sequência recomendada, sem inventar moda:

1. campos novos no banco;
2. status padronizados;
3. helper de classificação sem IA;
4. salvar perfil no lead;
5. mostrar perfil no admin;
6. ajustar mensagem de WhatsApp;
7. adicionar pergunta MEI/CNPJ no formulário;
8. melhorar conversão Radar -> Lead;
9. criar feedback para Radar;
10. só depois pensar em copiloto/IA.

## 14. Teste manual mínimo

Criar leads de teste:

### Caso 1

Nome: Carlos  
Tipo: MEI/Família  
Vidas: 3  
Mensagem: Tenho MEI e quero para minha família.

Esperado:

- perfil `mei_familia`;
- próxima pergunta sobre CNPJ ativo e idades.

### Caso 2

Nome: Ana  
Tipo: Trocar plano  
Vidas: 2  
Mensagem: Meu plano aumentou muito.

Esperado:

- perfil `troca_reajuste`;
- próxima pergunta sobre plano atual e mês de reajuste.

### Caso 3

Nome: Oficina Lima  
Tipo: Empresarial  
Vidas: 5  
Mensagem: Quero ver plano para funcionários.

Esperado:

- perfil `micro_pme`;
- próxima pergunta sobre sócios/funcionários.

## 15. Definição pessoal de pronto

Só considerar finalizado quando:

- você abrir o admin e não precisar pensar do zero;
- cada lead tiver próxima pergunta;
- cada atendimento gerar observação;
- cada observação puder voltar para o Radar;
- o blog continuar leve;
- nada depender obrigatoriamente de IA;
- nada prometer preço ou aceitação sem validação humana.

Regra final:

> O blog captura pouco, organiza muito e ajuda você a atender melhor.
