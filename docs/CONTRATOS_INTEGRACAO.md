# Contratos de Integração — OG Ecosystem

Versão: **og-contracts/1.0**  
Data-base: **2026-08-20**

Este documento define os contratos compartilhados entre `blog-plano-saude`, `radarplan` e `og-crm`.

## 1. Princípios

- contratos são versionados;
- campos desconhecidos devem ser ignorados quando possível;
- campos opcionais ausentes não podem quebrar consumidores;
- IDs e origem não devem ser reescritos;
- timestamps em ISO 8601;
- enumerações canônicas ficam neste documento;
- dados pessoais só entram quando necessários à operação;
- segredos de integração nunca ficam em JavaScript entregue ao navegador.

## 2. Lead Intake Contract

Produtor principal: **OG Plano Saúde**.  
Consumidor final: **OG CRM**.

Endpoint-alvo conceitual:

```text
POST /api/intake/leads
```

Durante a migração, o endpoint existente `POST /api/leads` do site continua aceito.

### 2.1 Campos

```json
{
  "contract_version": "og-contracts/1.0",
  "external_event_id": "string-opcional",
  "nome": "Maria Silva",
  "email": "maria@example.com",
  "telefone": "21999999999",
  "cidade": "Magé",
  "uf": "RJ",
  "tipo_plano": "MEI/Família",
  "tipo_interesse": "mei_familia",
  "vidas": 3,
  "possui_cnpj": true,
  "mensagem": "texto opcional",
  "consentimento_lgpd": true,
  "origem": "Instagram",
  "canal": "Meta Ads",
  "pagina_origem": "/planos/mei",
  "referrer": "string-opcional",
  "utm_source": "instagram",
  "utm_medium": "paid_social",
  "utm_campaign": "mei_rj",
  "utm_content": "video_03",
  "utm_term": "string-opcional",
  "fbclid": "string-opcional",
  "gclid": "string-opcional",
  "campaign_id": "string-opcional",
  "adset_id": "string-opcional",
  "ad_id": "string-opcional",
  "capturado_em": "2026-08-20T20:00:00-03:00"
}
```

### 2.2 Obrigatórios

- `nome`;
- `telefone`.

O restante é opcional e progressivo.

### 2.3 Normalização

- telefone é armazenado em formato normalizado, preservando valor original se necessário;
- `uf` em maiúsculas;
- `vidas` inteiro não negativo;
- booleanos devem ser booleanos reais no armazenamento;
- strings vazias podem virar `null`;
- origem e atribuição não devem ser inferidas novamente se vierem preenchidas.

### 2.4 Deduplicação

Criar novo lead é o padrão quando há nova manifestação de intenção, mas o CRM pode associar contatos repetidos.

Não deduplicar cegamente por nome.

Chaves auxiliares permitidas:

- telefone normalizado;
- email normalizado;
- `external_event_id`;
- combinação de origem + timestamp + contato.

Uma manifestação repetida pode ser registrada como nova interação em vez de apagar a anterior.

## 3. Lead Commercial Record

Dono lógico: **OG CRM**.

Campos mínimos do domínio comercial:

```json
{
  "lead_id": 184,
  "nome": "Maria Silva",
  "telefone": "5521999999999",
  "email": "maria@example.com",
  "status": "Novo",
  "perfil_comercial": "mei_familia",
  "responsavel_id": "user-id-opcional",
  "cidade": "Magé",
  "uf": "RJ",
  "vidas": 3,
  "possui_cnpj": true,
  "cnpj_informado": null,
  "dor_provavel": "string-opcional",
  "proxima_pergunta": "string-opcional",
  "proxima_acao": "Fazer primeira qualificação humana",
  "proxima_acao_em": null,
  "objecao_principal": null,
  "mes_reajuste": null,
  "radar_prospect_id": null,
  "criado_em": "ISO-8601",
  "ultima_interacao_em": "ISO-8601-opcional",
  "fechado_em": null,
  "motivo_perda": null
}
```

### 3.1 Status canônicos

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

Mapeamento legado inicial:

- `Chamado` -> `Qualificando`
- demais valores antigos devem ser preservados para leitura e migrados explicitamente, não por exclusão silenciosa.

## 4. Radar Prospect Contract

Produtor: **RadarPlan**.  
Consumidor: **OG CRM**.

Endpoint-alvo conceitual:

```text
POST /api/radar/prospects/import
```

Durante a transição, o endpoint existente `POST /api/radar?action=import` no site permanece como ponte.

Payload:

```json
{
  "contract_version": "og-contracts/1.0",
  "prospects": [
    {
      "radar_prospect_id": "id-opcional-do-produtor",
      "fingerprint": "string-estavel",
      "nome_empresa": "Studio Exemplo",
      "segmento": "beleza/estética",
      "cidade": "Magé",
      "uf": "RJ",
      "telefone_publico": "",
      "whatsapp": "",
      "email_publico": "",
      "site_url": "",
      "perfil_url": "",
      "endereco": "",
      "fonte_url": "",
      "consulta_google": "",
      "origem": "radarplan",
      "cnpj": "",
      "cnae_codigo": "",
      "cnae_descricao": "",
      "porte_receita": "MEI/ME/EPP",
      "funcionarios_est": null,
      "score": 78,
      "prioridade": "alta",
      "nivel_maturidade": 4,
      "nivel_label": "Preparar",
      "score_motivos": "",
      "abordagem": "",
      "proxima_acao": "",
      "revisitar_em": null,
      "evidencias": [],
      "tags": [],
      "flags": [],
      "fontes": [],
      "contatos_associados": [],
      "market_context": {}
    }
  ]
}
```

### 4.1 Regra de identidade

`fingerprint` é a chave técnica preferencial de idempotência entre importações Radar.

O consumidor pode atualizar o mesmo prospecto quando recebe fingerprint igual, preservando histórico relevante.

### 4.2 Prospecto não é lead

Importar um prospecto não cria automaticamente um lead comercial.

A conversão prospecto -> lead é uma ação explícita e preserva:

- `radar_prospect_id`;
- fingerprint;
- score no momento da conversão;
- evidências e fonte;
- origem `RadarPlan`;
- data de conversão.

## 5. CRM -> Radar Feedback Contract

Produtor: **OG CRM**.  
Consumidor: **RadarPlan**.

Endpoint-alvo conceitual:

```text
POST /api/feedback/commercial
```

Payload:

```json
{
  "contract_version": "og-contracts/1.0",
  "event_id": "uuid",
  "lead_id": 184,
  "radar_prospect_id": 456,
  "status": "Em cotação",
  "perfil_comercial": "micro_pme",
  "vidas": 5,
  "possui_cnpj": true,
  "objecao_principal": "preço",
  "mes_reajuste": "novembro",
  "resultado": "pediu_cotacao",
  "motivo_perda": null,
  "observacao_resumida": "quer plano para equipe",
  "ocorrido_em": "ISO-8601"
}
```

Regras:

- feedback é evento, não sobrescrita cega;
- `event_id` deve permitir idempotência;
- não enviar dados pessoais desnecessários ao Radar;
- Radar usa o resultado para inteligência, não para alterar histórico comercial do CRM.

## 6. Content Intelligence Contract

Produtores: **OG CRM + RadarPlan**.  
Consumidor: **OG Plano Saúde**.

Objetivo: sugerir pauta, cidade, perfil e dor com base agregada ou anonimizada.

Formato recomendado:

```json
{
  "tema": "plano de saúde para MEI em Magé",
  "cidade": "Magé",
  "uf": "RJ",
  "perfil_comercial": "mei_familia",
  "dor": "dúvida sobre incluir dependentes",
  "evidencias_agregadas": 12,
  "prioridade": "alta",
  "origem_sugestao": ["crm", "radar"]
}
```

Não usar ficha pessoal de lead em conteúdo público.

## 7. Autenticação entre serviços

Enquanto não houver identidade de serviço mais robusta:

- usar segredo dedicado por integração;
- enviar segredo apenas server-to-server;
- aceitar rotação sem alterar frontend;
- diferenciar segredo Radar -> CRM de credencial de usuário;
- nunca reutilizar `ADMIN_PASSWORD` como segredo de integração.

O estado atual usa `RADAR_IMPORT_SECRET` ou token admin para importação no endpoint Radar do site. Isso é compatibilidade temporária, não desenho final.

## 8. Respostas e erros

Padrão recomendado de sucesso:

```json
{
  "success": true,
  "data": {},
  "request_id": "opcional"
}
```

Padrão recomendado de erro:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Mensagem segura",
    "fields": {}
  },
  "request_id": "opcional"
}
```

Nunca devolver stack trace ou segredo em produção.

## 9. Mudança de contrato

Antes de alterar campo compartilhado:

1. atualizar este documento;
2. marcar se mudança é aditiva ou quebradora;
3. atualizar consumidor;
4. atualizar produtor;
5. testar ponta a ponta;
6. remover compatibilidade antiga só em etapa posterior.
