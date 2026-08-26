# PROJECT MEMORY — Blog Plano Saúde

Projeto: `blog-plano-saude`
Papel no ecossistema: aquisição inbound, SEO, conteúdo, landing pages, formulários, attribution e captura original de demanda.
Autoridade cross-project: `Joao-Matheus-Amorim/tri-ecosystem`.
Autoridade de certificação: ROSS Multi-Project CI.

## Estado certificado preservado

Release certificado: `TRI-RC-2026-08-24-01`.

SHA funcional usado no Bundle certificado:
`f5f85f7ed5eed8947b5247b70ba24a28afa84fb5`

O Bundle final comprovou Blog → CRM em Preview com `FAIL=0` e `SKIP=0`, incluindo preservação durante indisponibilidade, recuperação, replay idempotente, conflito fail-closed, attribution/UTM, dead-letter/requeue e cleanup.

Este SHA permanece congelado como evidência histórica. A branch atual é de hardening pós-certificação e não altera a lógica funcional certificada.

## Missão

O Blog atrai demanda e cria a captura inicial. Ele não é o CRM definitivo e não é o motor de prospecção/inteligência.

O Blog é dono de:
- páginas públicas, SEO e conteúdo;
- formulários e simuladores de entrada;
- origem, campanha, página e attribution;
- consentimento aplicável à captação;
- persistência inicial do lead;
- entrega durável do lead ao CRM.

O Blog não é dono de:
- pipeline comercial;
- responsável pelo lead;
- follow-up, proposta, fechamento ou perda;
- descoberta pública, score ou evidência original do Radar.

## Integração TRI atual

Fluxo certificado:

`captura → persistência local → fila durável → tri.lead.created.v1 → OG CRM`

Regras:
- falha temporária do CRM nunca pode apagar o lead;
- retry não pode duplicar o lead no CRM;
- mesmo event ID com payload diferente deve falhar fechado;
- contratos são versionados e travados por hash;
- segredos ficam somente no servidor;
- Production não é autorizada por PASS de Preview.

## Privacidade

Coletar somente o necessário para aquisição/comercial. Dados clínicos, diagnósticos, condição médica, vida sexual ou inferências sensíveis de saúde não fazem parte da inteligência TRI.

## Segurança

- `.env`, chaves privadas e credenciais não entram no Git;
- nenhum segredo TRI/DATABASE_URL pode ser exposto via frontend/Vite;
- integração usa HMAC SHA-256 e segredo mínimo definido pelo produtor;
- falha de Meta/WhatsApp não pode impedir persistência do lead;
- logs não devem despejar segredo ou payload pessoal completo.

## Padrão de certificação a partir desta branch

Novo candidato deve exigir no ROSS:
- `local`;
- `security`;
- `evidence`.

`FAIL` ou `SKIP` em fase obrigatória bloqueia certificação. Novo SHA não herda certificado de SHA anterior.

A evidence gate deve provar que o código funcional continua sendo o SHA que participou do Bundle ou exigir nova validação/novo Bundle se código funcional mudar.

## Rollback e cutover

Admin/rotas legadas permanecem até decisão explícita de shadow/paridade/cutover. Esta branch não autoriza merge em `main` nem Production.

## Ordem de autoridade

1. `PROJECT_MEMORY.md` para estado local atual;
2. `SECURITY_MODEL.md` para fronteira local de segurança;
3. `ECOSYSTEM.md` para ponte cross-project;
4. `tri-ecosystem` para contratos, ownership compartilhado, privacidade e release.

Documentação histórica divergente deve ser marcada como histórica/reconciliada; nunca usada silenciosamente como estado atual.
