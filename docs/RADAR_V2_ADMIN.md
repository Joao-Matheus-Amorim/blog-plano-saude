# Radar V2 no admin do blog-plano-saude

Este documento descreve a expansão do `/admin/radar` para receber o Radarplan Motor V2.

## Regras principais

- Prospecto público não é lead.
- Lead real só nasce no CRM quando o admin converte manualmente.
- Nada é descartado pelo motor. Prospectos frios ficam catalogados com `revisitar_em`.
- Novas features continuam dentro de `/api/radar.js`, usando `action`, para respeitar o limite de Serverless Functions da Vercel Hobby.

## Campos V2

A tabela `radar_prospect` passa a aceitar:

- Dados CNPJ: `cnpj`, `cnae_codigo`, `cnae_descricao`, `porte_receita`, `capital_social`, `data_abertura`.
- Dados de intenção: `tem_vaga_ativa`, `vaga_titulo`, `vaga_dias`, `tem_post_cresc`, `post_cresc_texto`, `tem_filial_nova`.
- Score detalhado: `score_d1`, `score_d2`, `score_d3`, `score_d4`, `score_d5`, `score_d6`.
- Classificação: `nivel_maturidade`, `nivel_label`, `revisitar_em`.
- Operação: `cadencia_dia`, `cadencia_canal`, `ultimo_contato_em`, `proximo_contato_em`.
- Memória: `historico_score`, `fontes`.

O campo legado `score` continua existindo e deve receber `score_total`.

## Fila operacional

O painel deve destacar:

- Quente agora.
- Preparar.
- Monitorar.
- Pipeline frio.
- Catalogado.
- Revisitar hoje.
- Sinal novo.
- Sem contato.

## Conversão

A conversão continua chamando:

```text
POST /api/radar?action=convert
```

A conversão insere lead com:

- `origem = Radarplan B2B`
- `tag_origem = radar_b2b`
- `canal = Radar B2B`
- `tipo_plano = Empresarial`
- `consentimento_lgpd = false`
