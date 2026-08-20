# OG Ecosystem — Arquitetura e Responsabilidades

Versão documental: **1.0**  
Data-base: **2026-08-20**

Este documento define a arquitetura comum dos três produtos que formam o ecossistema OG. Ele deve existir, com o mesmo conteúdo conceitual, nos repositórios `blog-plano-saude`, `radarplan` e `og-crm`.

## 1. Produtos oficiais

### 1.1 OG Plano Saúde

Repositório: `Joao-Matheus-Amorim/blog-plano-saude`

Responsabilidade: **aquisição**.

O produto deve:

- publicar o site institucional;
- produzir e hospedar páginas SEO;
- receber tráfego orgânico e pago;
- oferecer landing pages e simuladores;
- captar intenção e consentimento;
- registrar atribuição de origem;
- criar o primeiro registro de oportunidade comercial por contrato estável;
- enviar eventos de marketing permitidos;
- conduzir o visitante ao atendimento humano.

Não deve ser o CRM definitivo.

### 1.2 RadarPlan

Repositório: `Joao-Matheus-Amorim/radarplan`

Responsabilidade: **inteligência e prospecção**.

O produto deve:

- encontrar sinais públicos e empresas relevantes;
- enriquecer entidades comerciais;
- calcular score e maturidade;
- manter evidências e fonte pública;
- sugerir abordagem e próxima ação;
- manter memória de prospecção;
- enviar oportunidades qualificadas ao OG CRM por contrato;
- receber feedback do CRM para melhorar priorização.

Não deve ser CRM, site público ou canal autônomo de venda.

### 1.3 OG CRM

Repositório planejado: `Joao-Matheus-Amorim/og-crm`

Responsabilidade: **operação comercial**.

O produto deve:

- ser a interface operacional diária;
- receber e organizar leads;
- receber prospectos Radar;
- controlar proprietário/responsável do lead;
- manter pipeline e status;
- controlar próximas ações e follow-ups;
- registrar histórico humano;
- organizar cotação e proposta;
- registrar venda/perda e motivo;
- consolidar métricas de aquisição e comercial;
- autenticar usuários internos;
- funcionar como PWA mobile-first e também no desktop.

O OG CRM será o **sistema operacional comercial** do ecossistema.

## 2. Regra de separação

Os três produtos devem ter:

- repositórios separados;
- builds separados;
- deploys separados;
- variáveis de ambiente separadas;
- interfaces próprias;
- responsabilidades sem sobreposição desnecessária.

Regra central:

> Compartilhar dados e contratos; não compartilhar frontend por acoplamento entre repositórios.

Código comum só deve virar pacote compartilhado se houver necessidade real e contrato explícito. Copiar componentes de um produto para outro não é arquitetura.

## 3. Sistema de registro por domínio

A separação física do banco pode acontecer depois. A propriedade lógica começa agora.

| Domínio | Dono lógico |
|---|---|
| conteúdo público, páginas, sessões e eventos do site | OG Plano Saúde |
| lead comercial, histórico, pipeline, tarefas e resultado | OG CRM |
| prospecto, evidência, score e inteligência Radar | RadarPlan |
| atribuição de aquisição do lead | criada no OG Plano Saúde, preservada pelo OG CRM |
| feedback de resultado comercial | criado no OG CRM, consumido pelo RadarPlan |

### 3.1 Banco durante a migração

O banco Neon atualmente usado pelo `blog-plano-saude` pode continuar fisicamente igual enquanto o OG CRM é construído.

Isso não autoriza novos acoplamentos.

A migração deve ocorrer em duas etapas:

1. **propriedade lógica**: definir quem pode criar/alterar cada informação;
2. **propriedade técnica**: mover endpoints internos e, se necessário, credenciais/esquemas.

Nenhuma troca de banco é requisito para iniciar o OG CRM.

## 4. Fluxos oficiais

### 4.1 Lead inbound

```text
Instagram / Meta / Google / SEO / indicação
                 |
                 v
        OG Plano Saúde
                 |
        Lead Intake Contract
                 |
                 v
             OG CRM
                 |
       atendimento humano
                 |
     cotação -> proposta -> resultado
```

### 4.2 Prospecto Radar

```text
fontes públicas
      |
      v
  RadarPlan
      |
score + evidência + próxima ação
      |
 Radar Prospect Contract
      |
      v
    OG CRM
      |
revisão/abordagem humana
      |
resultado/feedback
      |
      v
  RadarPlan
```

### 4.3 Conteúdo guiado por inteligência

```text
Radar + CRM
   |
perguntas, objeções, cidades, nichos, conversões
   |
   v
OG Plano Saúde
   |
páginas, artigos e landing pages
```

## 5. Identificadores e rastreabilidade

Nenhum dado deve perder identidade ao atravessar projetos.

Regras:

- cada lead tem `lead_id` estável no sistema comercial;
- cada prospecto Radar tem `radar_prospect_id` estável;
- conversão Radar -> lead preserva os dois IDs;
- origem do lead nunca é substituída por status comercial;
- UTMs e identificadores de anúncio são imutáveis como evidência de aquisição;
- atualizações geram histórico, não apagam o passado relevante;
- timestamps devem ser armazenados com timezone (`TIMESTAMPTZ`) e interpretados no fuso da operação quando exibidos.

## 6. Status comerciais oficiais

O domínio de lead usa estes status canônicos:

1. `Novo`
2. `Qualificando`
3. `Aguardando dados`
4. `Em cotação`
5. `Proposta enviada`
6. `Follow-up`
7. `Fechado`
8. `Perdido`
9. `Sem resposta`
10. `Descartado`

Regras:

- `Novo` termina após a primeira ação humana;
- `Fechado`, `Perdido` e `Descartado` exigem encerramento explícito;
- `Perdido` deve aceitar motivo;
- `Follow-up` deve ter próxima ação/data quando possível;
- status legados podem ser lidos por compatibilidade, mas não devem ser criados por novas interfaces.

## 7. Perfis comerciais oficiais

Valores canônicos:

- `mei_familia`
- `mei_profissional`
- `micro_pme`
- `pme_local`
- `troca_reajuste`
- `indefinido`

A classificação auxilia atendimento. Ela não é decisão de elegibilidade de operadora.

## 8. Atendimento e automação

Venda e decisão sensível permanecem humanas.

Permitido:

- classificação automática;
- score;
- resumo;
- sugestão de pergunta;
- sugestão de próxima ação;
- lembrete;
- detecção de risco de promessa;
- automação de tarefas internas.

Não permitido como regra do produto:

- prometer preço sem validação;
- garantir aceitação, rede ou carência sem regra vigente;
- disparo comercial em massa sem controle humano;
- IA enviar proposta ou assumir compromisso em nome da corretora sem revisão;
- coletar dado sensível desnecessário na captura inicial.

## 9. Segurança mínima entre projetos

- nenhum segredo vai para o frontend;
- `DATABASE_URL` só existe em ambiente server-side;
- endpoints internos exigem autenticação ou segredo de serviço;
- segredo de integração deve ser diferente da senha do usuário;
- logs não devem registrar senha/token completo;
- cada integração deve ter validação de payload e limite de tamanho;
- endpoints públicos de criação devem ter rate limit e proteção antiabuso;
- dados pessoais devem ter finalidade e retenção compatíveis com LGPD.

## 10. Compatibilidade e versionamento

Os contratos compartilhados possuem versão.

Primeira versão oficial: `og-contracts/1.0`.

Mudanças aditivas, como novo campo opcional, não exigem nova versão principal.

Mudanças quebrando nome, significado, tipo ou obrigatoriedade de campo exigem:

1. atualização documental;
2. adaptação dos consumidores;
3. período de compatibilidade;
4. só depois remoção do formato antigo.

## 11. Definition of Done entre projetos

Uma integração só está pronta quando:

- produtor e consumidor usam o mesmo contrato;
- erro de integração é observável;
- existe autenticação adequada;
- o dado preserva origem e identidade;
- não há segredo no cliente;
- há comportamento definido para campo ausente;
- duplicidade tem regra explícita;
- o fluxo foi testado ponta a ponta;
- a documentação dos dois repositórios foi atualizada.

## 12. Frase operacional do ecossistema

> OG Plano Saúde encontra demanda. RadarPlan encontra oportunidade. OG CRM transforma oportunidade em venda e devolve aprendizado ao ecossistema.
