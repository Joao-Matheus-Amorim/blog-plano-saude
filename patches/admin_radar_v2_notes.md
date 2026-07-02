# Patch manual: src/pages/PaginaAdminRadar.jsx

Adicionar filtros:

- nível de maturidade
- revisitar hoje
- tem vaga ativa
- com CNPJ
- com WhatsApp

Adicionar helpers:

```js
function maturityLabel(prospect) {
  return prospect.nivel_label || 'CATALOGADO';
}

function isDueToday(prospect) {
  if (!prospect.revisitar_em) return false;
  return new Date(`${prospect.revisitar_em}T00:00:00`) <= new Date();
}

function scoreBreakdown(prospect) {
  return [
    ['D1 Fonte', prospect.score_d1],
    ['D2 Intenção', prospect.score_d2],
    ['D3 Porte', prospect.score_d3],
    ['D4 Contato', prospect.score_d4],
    ['D5 Timing', prospect.score_d5],
    ['D6 Concorrência', prospect.score_d6],
  ];
}
```

No card, exibir:

- `Nível {nivel_maturidade} — {nivel_label}`
- `Score {score}/200`
- breakdown D1-D6
- `revisitar_em`
- `proxima_acao`
- sinais: `tem_vaga_ativa`, `tem_post_cresc`, `tem_filial_nova`
- fonte CNPJ/CNAE quando houver

Manter botões já existentes:

- Abrir fonte
- WhatsApp
- Copiar abordagem
- Converter em lead
- Alterar status
