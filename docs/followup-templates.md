# Fase 4 — Nutrição de Leads: Templates de Follow-up WhatsApp

## Como usar
Configure estas mensagens no WhatsApp Business com etiquetas de lead.
Use o app "WhatsApp Business" (gratuito) para organizar os contatos.

## Etiquetas recomendadas no WhatsApp Business
- 🟢 Novo Lead
- 🟡 Aguardando Retorno
- 🔵 Proposta Enviada
- 🔴 Sem Resposta (3+ dias)
- ⭐ Fechado — Cliente
- ❌ Perdido (anotar motivo)

---

## SEQUÊNCIA DE FOLLOW-UP — 7 DIAS

### DIA 0 — Imediatamente após receber o lead

```
Olá, [NOME]! 😊

Sou a Maisa Valentim, sua consultora de planos de saúde.

Recebi seu pedido de cotação para um plano [TIPO] para [N] vidas.
Já estou verificando as melhores opções para o seu perfil!

Em breve te envio uma comparação completa das operadoras disponíveis.

Qualquer dúvida, é só chamar aqui mesmo! 🙏
```

### DIA 0 — (30 min após) Enviar a comparação

```
[NOME], como prometido! 🎯

Aqui estão as melhores opções que encontrei para o seu perfil:

🏆 *Opção 1 — [OPERADORA A]*
• Cobertura: Nacional completa
• Rede: [X] hospitais em RJ
• Valor estimado: R$ XXX/mês por vida
• Destaque: [diferencial]

🥈 *Opção 2 — [OPERADORA B]*
• Cobertura: [Regional/Nacional]
• Valor estimado: R$ XXX/mês por vida
• Destaque: [diferencial]

🥉 *Opção 3 — [OPERADORA C]*
• Cobertura: [Regional/Nacional]
• Valor estimado: R$ XXX/mês por vida
• Destaque: [diferencial]

Qual dessas chamou mais atenção? Posso detalhar qualquer uma! 😊
```

### DIA 1 — Se não respondeu

```
Oi [NOME]! 👋

Vi que você não chegou a ver minha mensagem de ontem.

Tenho 3 opções muito boas para o seu perfil já separadas aqui.

Posso te enviar? É rapidinho! 😊
```

### DIA 3 — Se ainda não respondeu

```
Oi [NOME], tudo bem?

Uma cliente minha — também estava em dúvida entre [OPERADORA A] e [OPERADORA B] —
contratou na semana passada e já está feliz com a escolha. 🙂

Os preços que separei para você ainda estão válidos esta semana.

Quer que eu te explique as diferenças em 5 minutos pelo WhatsApp agora?
```

### DIA 5 — Tentativa de quebra de objeção

```
Oi [NOME]!

Sei que a vida fica corrida e às vezes é difícil dar atenção a essas coisas.

Mas me diz uma coisa — o que está te impedindo de fechar um plano agora?

□ Preço ainda alto
□ Não sei qual operadora escolher
□ Tenho medo da carência
□ Preciso conversar com alguém primeiro
□ Outro motivo

Me fala e eu te ajudo! 😊
```

### DIA 7 — Última tentativa

```
Oi [NOME]! Vou fazer uma pausa nas mensagens para não incomodar. 😊

Mas quero deixar claro: quando você decidir contratar um plano — seja agora ou daqui
6 meses — pode contar comigo.

Guarda meu contato. Respondo rapidinho e sem custo de consultoria.

Cuida-se! 🙏
— Maisa
```

---

## MENSAGENS DE NUTRIÇÃO SEMANAL

### LISTA PJ
```
Oi, pessoal! 😊

Sabia que empresas com CNPJ há mais de 6 meses já se qualificam para planos coletivos
empresariais mesmo com 1 só funcionário?

Isso significa cobertura nacional com preços até 40% menores que o individual.

Se quiser checar se sua empresa se qualifica, é só chamar aqui! 👇
```

### LISTA FAMÍLIA
```
Oi! Uma dica rápida para quem tem plano familiar 💡

Você sabia que filhos de até 24 anos que estudam podem permanecer no plano dos pais
como dependentes, mesmo após completar 21 anos?

Muita gente perde esse benefício por não saber. Se tiver dúvida, me chama! 😊
```

### LISTA INDIVIDUAL/MEI
```
Oi! 👋

MEI e autônomos: vocês podem contratar planos coletivos por adesão com preços muito
mais competitivos do que planos individuais.

Quer saber se você se qualifica? Me chama! 😊
```

---

## ESTRUTURA DO CRM — GOOGLE SHEETS

| Coluna | Descrição |
|--------|-----------|
| Data de Entrada | Data/hora do lead |
| Nome | Nome completo |
| WhatsApp | Número formatado |
| Tipo de Plano | PJ / Familiar / Individual / Adesão |
| Nº de Vidas | Quantidade |
| Operadora de Interesse | Preferência indicada |
| Origem | homepage / lead_magnet / calculator / exit_intent / indicação / instagram |
| Status | Novo / Contato Feito / Proposta Enviada / Negociando / Fechado / Perdido |
| Operadora Contratada | Preencher ao fechar |
| Valor Mensal | Valor do contrato |
| Data de Fechamento | Data que assinou |
| Motivo de Perda | Se status = Perdido |
| Próximo Follow-up | Data agendada |
| Observações | Notas livres |

### Fórmulas úteis
```
// Taxa de conversão:
=COUNTIF(H:H,"Fechado")/COUNTA(A:A)-1

// Ticket médio:
=AVERAGEIF(H:H,"Fechado",J:J)

// Receita anual estimada:
=SUMIF(H:H,"Fechado",J:J)*12

// Leads por origem:
=COUNTIF(F:F,"homepage")
```

---

## CONFIGURAÇÃO DO WHATSAPP BUSINESS

### Mensagem de saudação automática
```
Olá! 😊 Aqui é a Maisa Valentim, consultora de planos de saúde.

Obrigada por entrar em contato!

Estou verificando a melhor opção para o seu perfil.
Em instantes te respondo com as melhores cotações disponíveis.

Enquanto isso, pode me contar:
• Você precisa de plano PJ, familiar ou individual?
• Para quantas pessoas?
```

### Mensagem de ausência
```
Oi! Recebi sua mensagem 😊

No momento estou fora do horário de atendimento, mas retorno assim que possível.

Atendo de segunda a domingo, das 8h às 21h.

Enquanto isso, acesse o site: https://consultoriadesaude.vercel.app
```