# SECURITY MODEL — Blog Plano Saúde

## Fronteira

`visitante → frontend público → API server-side → Neon + integrações opcionais`

O navegador nunca recebe credencial de banco, segredo TRI, token Meta privado ou segredo administrativo.

## Formulários públicos

Obrigatório:
- validação server-side;
- normalização e limite de tamanho;
- consentimento quando aplicável;
- erro sem vazamento de infraestrutura;
- persistência do lead não depende de integração opcional externa.

## Segredos

Nunca versionar ou expor no frontend:
- `DATABASE_URL`;
- `TRI_BLOG_INGEST_SECRET`;
- `TRI_OUTBOX_DRAIN_SECRET`;
- `META_ACCESS_TOKEN`;
- credenciais administrativas;
- chaves privadas.

`.env.example` pode conter somente nomes de variáveis e valores vazios/de exemplo.

## Integração TRI

- assinatura HMAC SHA-256;
- segredo de ingest com tamanho mínimo;
- timeout finito;
- retry idempotente;
- falha remota não apaga lead já persistido;
- recovery manual exige segredo separado;
- conflito do mesmo identificador com conteúdo diferente deve falhar fechado.

## Privacidade

Minimizar dados pessoais em logs e armazenamento. O Blog pode capturar dados necessários à cotação/comercial, mas o ecossistema não deve inferir ou armazenar condição médica, diagnóstico, tratamento, vida sexual ou outras categorias sensíveis para score/prospecção.

## Dependências e frontend

- variável `VITE_*` deve ser tratada como pública;
- segredo server-side em `src/` é falha;
- arquivo de chave/credencial versionado é falha;
- dependência de segurança crítica sem mitigação bloqueia release.

## Gate

O comando `node scripts/tri-security-check.mjs` é o gate executável deste modelo.

Qualquer vazamento de segredo, uso de segredo no frontend, arquivo sensível versionado ou quebra dos invariantes de assinatura do produtor TRI deve retornar FAIL.
