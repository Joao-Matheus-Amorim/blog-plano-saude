# Blog Plano de Saúde — proveniência histórica x certificação de fonte

**Estado:** candidato isolado em branch; exige ROSS same-SHA antes do merge. Deploy não autorizado e desativado por Git.

O certificado TRI-RC-2026-08-24-01 permanece histórico e imutável. O ROSS falhou ao certificar a main 3862a63ac286: setup, testes, lint, build, contrato e segurança foram PASS; o bloqueio ficou restrito à evidência, cuja allowlist histórica de agosto rejeita cinco caminhos de documentação/configuração posteriores: AGENTS.md, README.md, docs/TRI_CROSS_PROJECT_STATE_BINDING_20260907.md, docs/TRI_MODEL_SIDE_ENGINEERING_MODE.md e vercel.json. Não há prova de novo deploy nem de produção atual.

A candidata adiciona o contrato estrito harness/BLOG_SOURCE_CERT_CANDIDATE_20261009.json. O validador reconhece apenas cinco caminhos históricos identificados e cinco arquivos desta mudança; nenhuma alteração em API, frontend, schema ou dados é admitida. Checa ancestralidade do SHA funcional histórico e da main de partida, os hashes do bundle histórico e a opção git.deploymentEnabled=false. Qualquer alteração não declarada ou alegação de certificação/produção antecipada falha.

A nova validação de evidências é uma **reconciliação documental de proveniência**, não transforma a evidência de agosto em certificado da branch. O ROSS no SHA exato continua obrigatório. Publicação manual e teste real de deploy ficam HOLD até autorização, capacidade Vercel e provas do ambiente.

Evidências pré-merge: executar testes do contrato e a suíte funcional, ROSS run e certificação da branch quando suportada pelo juiz; sem injetar segredos manualmente ou tocar em produção.
