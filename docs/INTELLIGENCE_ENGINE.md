# Inteligência de Aquisição do OG Plano Saúde

Este documento descreve apenas a inteligência ligada ao **site e aquisição**.

Para inteligência de prospecção B2B, score, enriquecimento e evidências públicas, o dono é o repositório `radarplan`.

Para pipeline, follow-up, vendas e resultado comercial, o dono é `og-crm`.

## 1. Entidades deste repositório

### Sessão/evento público

Comportamento de navegação necessário para medir aquisição, sem transformar visitante anônimo em ficha pessoal.

Eventos recomendados:

- `page_view`
- `cta_click`
- `whatsapp_click`
- `form_start`
- `form_submit`
- `form_error`

### Lead

Só nasce quando existe manifestação clara de intenção, como formulário enviado ou contato fornecido para atendimento.

O site cria a entrada pelo `Lead Intake Contract`; a operação posterior pertence ao OG CRM.

### Oportunidade de conteúdo

Insight agregado vindo de:

- buscas;
- páginas que convertem;
- CRM;
- RadarPlan;
- dúvidas e objeções recorrentes.

Não deve conter ficha pessoal de lead em conteúdo público.

## 2. Atribuição

Preservar quando disponíveis:

- origem;
- canal;
- página;
- referrer;
- UTMs;
- `fbclid`;
- `gclid`;
- IDs de campanha/conjunto/anúncio;
- event ID.

A atribuição criada aqui acompanha o lead no OG CRM.

## 3. Dados públicos e Radar

Coleta de sinais públicos B2B, empresa, CNPJ/CNAE, vagas, crescimento, score e maturidade pertence ao RadarPlan.

Este repositório não deve criar um segundo motor Radar.

Durante a migração, `/api/radar` e `/admin/radar` permanecem como compatibilidade temporária conforme `MIGRACAO_ADMIN_OG_CRM.md`.

## 4. Operadoras e dados de mercado

Dados públicos de operadoras/ANS podem ser usados para:

- conteúdo;
- contexto de aquisição;
- validação editorial;
- páginas informativas.

Não usar material público para prometer elegibilidade, preço, rede ou carência sem validação atual no atendimento humano.

## 5. Governança

- trabalhar com finalidade definida;
- minimizar dados;
- não expor segredos;
- não enviar mensagem privada automática a partir de sinal público;
- não transformar sinal público em contato privado sem base apropriada;
- guardar origem/evidência necessária;
- respeitar retenção e LGPD;
- separar analytics anônimo de lead identificado.

## 6. Fluxo oficial

```text
visita/campanha
    |
evento + atribuição
    |
formulário/WhatsApp
    |
Lead Intake Contract
    |
OG CRM
    |
resultado comercial agregado
    |
insight para conteúdo/aquisição
```

O RadarPlan entra como fonte adicional de inteligência e não como submódulo deste motor.
