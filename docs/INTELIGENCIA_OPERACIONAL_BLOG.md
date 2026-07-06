# Inteligência Operacional do Blog Plano de Saúde

Documento de doutrina para o projeto `blog-plano-saude`.

Este documento define como o blog deve capturar, qualificar e entregar leads para atendimento humano, mantendo comunicação estrita com o RadarPlan. Ele substitui decisões soltas por uma regra operacional única.

## 1. Princípio central

O blog não é apenas uma vitrine. O blog é a frente pública da operação comercial.

A função dele é:

1. atrair pessoas por busca orgânica, WhatsApp, indicação e páginas locais;
2. capturar intenção com o menor atrito possível;
3. enriquecer o lead sem transformar o formulário em interrogatório;
4. entregar para o atendimento humano uma ficha clara, objetiva e acionável;
5. receber feedback do atendimento para melhorar conteúdo, abordagem e priorização.

Regra absoluta: a venda continua humana.

A tecnologia prepara o terreno. A pessoa conduz confiança, valida informação sensível, explica possibilidades e vende o plano adequado.

## 2. O que o blog deve capturar

O formulário deve permanecer curto. Lead demais perguntado no início vira lead perdido.

Campos mínimos recomendados:

- nome;
- WhatsApp;
- cidade;
- UF, padrão RJ quando não informado;
- tipo de interesse;
- quantidade aproximada de vidas;
- se possui MEI/CNPJ;
- origem/página de origem;
- consentimento LGPD.

Campo `tipo de interesse` deve aceitar valores próximos destes:

- MEI para mim/família;
- CNPJ pequeno;
- Plano para funcionários;
- Trocar plano atual;
- Cotação familiar sem CNPJ;
- Não sei ainda.

O objetivo não é qualificar tudo no formulário. O objetivo é identificar a próxima pergunta humana.

## 3. Perfis comerciais oficiais

Todo lead deve ser classificado, por regra ou IA interna, em um dos perfis abaixo.

### `mei_familia`

Pessoa com MEI/CNPJ pequeno que quer avaliar plano para si e familiares.

Dor provável:

- quer pagar menos;
- não sabe se pode usar CNPJ;
- quer colocar cônjuge, filho ou dependente;
- tem receio de carência/preço/rede.

Próxima pergunta humana:

> Você já tem MEI/CNPJ ativo? Seria para quantas pessoas e quais idades?

### `mei_profissional`

Autônomo formalizado ou profissional solo.

Dor provável:

- quer plano individual usando estrutura de CNPJ;
- ainda não sabe se vale a pena incluir dependente;
- pode virar indicação futura.

Próxima pergunta humana:

> Você quer cotar só para você ou pretende incluir familiar também?

### `micro_pme`

Empresa pequena, normalmente 2 a 9 vidas, com dono e poucos funcionários.

Dor provável:

- quer benefício sem custo alto;
- quer reter funcionário;
- quer entender se CNPJ pequeno consegue contratar.

Próxima pergunta humana:

> Seria para sócios, funcionários ou os dois?

### `pme_local`

Empresa com equipe maior e dor mais corporativa.

Dor provável:

- benefício, retenção, contratação, reajuste, troca de operadora.

Próxima pergunta humana:

> Vocês já têm plano hoje ou estão implantando pela primeira vez?

### `troca_reajuste`

Pessoa ou empresa que já tem plano e está incomodada com valor, rede, carência ou reajuste.

Próxima pergunta humana:

> Qual plano vocês têm hoje e em que mês costuma acontecer o reajuste?

### `indefinido`

Lead sem dados suficientes.

Próxima pergunta humana:

> Você procura plano para você/família ou para empresa/equipe?

## 4. Lead rico não significa formulário pesado

O lead inicial pode ser simples. A entidade comercial rica deve ser montada depois.

A ficha operacional deve conter:

- perfil comercial detectado;
- cidade/UF;
- quantidade de vidas;
- possível uso de MEI/CNPJ;
- dor provável;
- próxima pergunta;
- risco de promessa indevida;
- status comercial;
- origem;
- página de origem;
- observações humanas;
- vínculo opcional com prospect do RadarPlan;
- histórico de interação.

Exemplo de ficha interna:

```json
{
  "perfil_comercial": "mei_familia",
  "cidade": "Magé",
  "uf": "RJ",
  "vidas": 3,
  "dor_provavel": "quer usar CNPJ para viabilizar plano familiar",
  "proxima_pergunta": "Você já tem MEI/CNPJ ativo e quais são as idades das pessoas?",
  "risco_compliance": "não prometer preço antes de validar elegibilidade, idades, rede e regra vigente",
  "status": "Novo"
}
```

## 5. Status padronizados do lead

O blog deve usar status comerciais claros.

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

Nenhum lead deve ficar em `Novo` depois da primeira interação humana.

## 6. Campos que devem entrar no banco do blog

A tabela atual `lead` já contém boa base. A evolução recomendada é adicionar gradualmente:

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

Esses campos não precisam aparecer todos no formulário. Eles podem ser preenchidos por atendimento humano, regras, RadarPlan ou análise assistida.

## 7. Contrato com o RadarPlan

O blog deve aceitar prospectos do RadarPlan via endpoint protegido.

Contrato mínimo esperado ao importar prospect:

```json
{
  "nome_empresa": "Studio Exemplo",
  "segmento": "beleza/estética",
  "cidade": "Magé",
  "uf": "RJ",
  "telefone_publico": "",
  "whatsapp": "",
  "email_publico": "",
  "site_url": "",
  "fonte_url": "",
  "cnpj": "",
  "cnae_codigo": "",
  "cnae_descricao": "",
  "porte_receita": "MEI/ME/EPP",
  "perfil_comercial": "mei_familia",
  "score": 0,
  "prioridade": "baixa|media|alta|critica",
  "nivel_maturidade": 1,
  "nivel_label": "Catalogado|Pipeline Frio|Monitorar|Preparar|QUENTE AGORA",
  "score_motivos": "",
  "abordagem": "",
  "proxima_acao": "",
  "evidencias": [],
  "tags": [],
  "market_context": {},
  "fingerprint": ""
}
```

Regra: o Blog não deve recalcular toda a inteligência do Radar. Ele deve exibir, filtrar, converter e registrar feedback.

## 8. O que o painel administrativo precisa mostrar

A tela de atendimento deve ser reorganizada em torno da ação humana.

Para cada lead, mostrar:

- status;
- perfil comercial;
- nome;
- WhatsApp;
- cidade;
- vidas;
- possui MEI/CNPJ;
- dor provável;
- próxima pergunta;
- mensagem sugerida;
- observação humana;
- próxima ação;
- botão WhatsApp;
- histórico curto.

Para prospectos do Radar:

- score;
- maturidade;
- prioridade;
- motivo do score;
- evidências;
- fonte;
- CNPJ/CNAE quando houver;
- contexto ANS da praça quando houver;
- botão converter para lead;
- botão descartar;
- botão revisitar.

## 9. Regras de atendimento humano

A abordagem deve sempre ser transparente.

Permitido:

- explicar possibilidades;
- pedir dados necessários;
- informar que a cotação depende de regras da operadora/corretora;
- comparar caminhos possíveis;
- registrar objeções e retorno.

Proibido:

- prometer preço antes de validação;
- prometer aceitação de MEI/CNPJ sem checagem;
- prometer carência/rede sem conferir regra vigente;
- fingir parceria oficial com operadora;
- automatizar abordagem em massa sem controle humano;
- usar dados pessoais sem base adequada.

Frase de segurança recomendada:

> Consigo verificar opções possíveis, mas preciso confirmar idades, cidade, CNPJ/MEI e regras vigentes antes de te passar uma cotação correta.

## 10. Conteúdo guiado pela inteligência

O blog não deve publicar no escuro.

Pautas devem nascer de:

- dúvidas reais dos leads;
- objeções recorrentes;
- cidades com volume de prospectos;
- nichos encontrados pelo Radar;
- perfis de maior conversão;
- buscas orgânicas que geraram contato.

Páginas prioritárias:

- Plano de saúde para MEI no RJ;
- Plano de saúde para MEI em Magé;
- Plano de saúde para CNPJ pequeno;
- MEI pode colocar família no plano de saúde?;
- Plano de saúde empresarial para 2 vidas;
- Plano de saúde para pequenas empresas no RJ;
- Plano de saúde para clínicas pequenas;
- Plano de saúde para salão de beleza e estética;
- Plano de saúde para restaurante pequeno;
- Plano de saúde para funcionários.

Cada página deve ter CTA humano, não promessa automática.

## 11. RAG no blog

O blog não deve hospedar processamento pesado de RAG.

Função do blog no RAG:

- enviar leads e feedbacks para a base de inteligência;
- consultar dossier pronto do Radar;
- consultar sugestões de próxima ação;
- exibir evidências e alertas para o atendente;
- sugerir pautas de conteúdo.

O processamento pesado fica no RadarPlan ou worker separado.

## 12. Roadmap do blog

### Fase 1: padronização

- padronizar status comerciais;
- adicionar campos de perfil comercial;
- adaptar formulário para perguntar MEI/CNPJ sem pesar;
- exibir próxima pergunta no admin;
- registrar objeção e próxima ação.

### Fase 2: integração Radar

- melhorar aba de prospectos;
- exibir maturidade, score, perfil e evidências;
- converter prospecto em lead preservando vínculo;
- registrar feedback de conversão/perda.

### Fase 3: inteligência de conteúdo

- criar fila de pautas sugeridas pelo Radar;
- marcar páginas que geraram lead;
- relacionar página de origem com perfil comercial;
- criar relatório cidade + nicho + conversão.

### Fase 4: copiloto interno

- gerar resumo curto do lead;
- gerar próxima pergunta;
- sugerir abordagem;
- detectar risco de promessa indevida;
- buscar casos parecidos.

A IA nunca envia mensagem sozinha. A decisão e o contato são humanos.

## 13. Não escopo

Fora do escopo deste projeto:

- importação de CSV/tabela comercial da corretora;
- precificação automática para cliente final;
- promessa automática de aceitação;
- chatbot vendedor autônomo;
- disparo em massa sem revisão humana;
- scraping pesado dentro da Vercel Function.

## 14. Definição de pronto

Uma etapa só está pronta quando:

- o dado aparece no admin;
- o atendente entende a próxima ação;
- o feedback volta para a base;
- existe rastreabilidade da origem;
- nenhuma promessa sensível é feita sem validação humana.

A regra final do blog:

> Capturar pouco, entender muito, vender com humano, registrar tudo.
