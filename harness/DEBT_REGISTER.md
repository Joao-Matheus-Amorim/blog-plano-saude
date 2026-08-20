# Debt Register — OG Plano Saúde

Versão: OG-HARNESS/1.0

## Regra

Dívida técnica não pode ser invisível. Se existe uma exceção temporária, ela deve estar aqui. Se não está aqui e viola o harness, é defeito a corrigir antes de produção.

## Dívidas transitórias conhecidas

### D-001 — Admin comercial ainda dentro do site

- Estado: aberto.
- Fato: rotas `/admin*` e UI operacional ainda vivem em `blog-plano-saude`.
- Risco: mistura aquisição com operação comercial e aumenta acoplamento.
- Owner da correção: OG CRM.
- Estratégia: construir paridade no `og-crm`, validar uso real e remover em mudança separada.
- Critério de saída: CRM cobre leitura/edição de leads, status, owner, próxima ação, histórico e Radar sem dependência visual do admin antigo.
- Prazo: milestone `OG CRM Parity`.

### D-002 — Endpoint Radar ainda hospedado no site

- Estado: aberto.
- Fato: RadarPlan envia atualmente para `/api/radar` deste projeto.
- Risco: site atua como ponte de inteligência que não pertence ao seu domínio final.
- Owner da correção: RadarPlan + OG CRM.
- Estratégia: criar endpoint equivalente no CRM, executar janela de compatibilidade e migrar `RADAR_ADMIN_URL` para destino novo.
- Critério de saída: Radar publica diretamente no CRM e feedback retorna ao Radar sem depender do site.
- Prazo: milestone `Radar -> CRM Direct`.

### D-003 — Ownership físico e lógico ainda compartilham a mesma infraestrutura

- Estado: controlado.
- Fato: durante a transição, tabelas podem continuar no mesmo Neon.
- Risco: confundir localização física com permissão de escrita.
- Owner da correção: arquitetura do ecossistema.
- Estratégia: aplicar ownership lógico estrito por contrato antes de decidir qualquer separação física.
- Critério de saída: cada writer autorizado está documentado; nenhuma escrita concorrente sem owner.
- Prazo: milestone `Ownership Enforcement`.

## Política para nova dívida

Uma nova entrada exige:

- ID;
- descrição factual;
- risco;
- motivo de não resolver agora;
- owner;
- critério de saída verificável;
- milestone.

Não aceitar itens vagos como “melhorar depois”.
