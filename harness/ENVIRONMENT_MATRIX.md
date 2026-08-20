# Environment Matrix — OG Plano Saúde

## Ambientes

### Local development
- frontend React/Vite;
- API local conforme runtime compatível;
- banco de desenvolvimento/teste preferencialmente isolado quando houver escrita;
- nenhum segredo real deve ser commitado.

### Preview
- deploy temporário por branch/PR quando disponível;
- usado para validar UI, rotas e integração sem substituir produção;
- variáveis devem ser equivalentes por nome, com valores próprios do ambiente.

### Production
- Vercel;
- `DATABASE_URL` para PostgreSQL/Neon;
- segredos administrativos e de integração somente no ambiente servidor;
- analytics/CAPI/notificações são auxiliares, não requisito da persistência do lead.

### Test/fixture
- payloads sintéticos;
- sem telefone/e-mail de cliente real;
- `origem/tag = harness_test` quando houver persistência controlada.

## Variáveis por responsabilidade

### Banco
- `DATABASE_URL` — core atual.

### Admin legado
- `ADMIN_EMAIL`;
- `ADMIN_PASSWORD` ou `ADMIN_PASSWORD_HASH` + `ADMIN_PASSWORD_SALT`;
- `ADMIN_SESSION_SECRET`.

### Radar legado
- `RADAR_IMPORT_SECRET`.

### Meta/analytics auxiliares
- `META_PIXEL_ID`;
- `META_ACCESS_TOKEN`;
- Google Analytics configurado no frontend conforme implementação.

### Notificação auxiliar
- `CALLMEBOT_PHONE`;
- `CALLMEBOT_APIKEY`.

### Proteções opcionais
- `CAPTCHA_SECRET` quando configurado;
- rate-limit tuning por env quando suportado.

## Regras

- variável obrigatória nova exige atualização deste arquivo, `.env.example` quando existir e runbook;
- variável opcional ausente deve degradar sem quebrar lead quando seu recurso é auxiliar;
- segredo não pode estar no bundle público;
- preview e production não devem compartilhar credencial de forma desnecessária;
- fallback nunca deve substituir secret ausente por valor hardcoded;
- variável morta deve ser removida ou marcada como legado.

## Config drift

Antes de release que mexa em configuração:

1. listar variáveis lidas pelo código afetado;
2. verificar documentação;
3. verificar obrigatoriedade real;
4. testar ausência de opcionais;
5. confirmar que produção possui somente nomes necessários;
6. não imprimir valores sensíveis em logs/PR.
