# Production Harness — OG Plano Saúde

Versão: **OG-HARNESS/1.0**  
Projeto: `blog-plano-saude`

## Propósito

Este harness define a condição mínima para considerar qualquer mudança segura para produção. Ele existe para impedir gap de entendimento, acoplamento acidental, dívida escondida, integração quebrada e custo obrigatório inesperado.

## A. Identidade do serviço

- Papel: aquisição pública e captura de demanda.
- Interface humana: site público.
- Interface de máquina: APIs de captação e, durante transição, endpoints legados de admin/Radar.
- Banco atual: PostgreSQL via `DATABASE_URL`.
- Deploy atual: Vercel.
- Consumidor principal do lead: OG CRM.
- Dependência de inteligência: nenhuma para capturar; RadarPlan é complementar.

## B. Invariantes de produção

Os itens abaixo são invariantes. Quebrar um deles exige ADR e nova versão do harness/contrato.

1. Um visitante nunca depende do RadarPlan para enviar um lead.
2. Falha de Meta CAPI/notificação não pode apagar ou invalidar um lead já persistido.
3. Nome e WhatsApp continuam suficientes para um lead mínimo quando o fluxo permitir.
4. A origem deve ser preservada com granularidade suficiente para atribuição.
5. O site não passa a ser owner de pipeline, proposta ou follow-up.
6. Nenhum segredo chega ao bundle público.
7. Nenhuma dependência paga é obrigatória para o caminho crítico.
8. Mudança de schema precisa ser compatível com registros anteriores ou migrada de forma explícita.
9. Falha de integração deve produzir erro observável e nunca sucesso falso.
10. Remover admin legado só é permitido após paridade validada no OG CRM.

## C. Caminhos críticos

### C1. Aquisição -> persistência

Entrada -> validação -> normalização -> persistência -> resposta de sucesso -> integrações auxiliares.

Resultado esperado: lead persistido uma única vez ou com deduplicação controlada; resposta previsível; origem preservada.

### C2. Aquisição -> CRM

Enquanto o CRM ainda não for o destino direto, o armazenamento atual funciona como ponte. Na migração, o contrato `Lead Contract v1` é a única interface autorizada.

### C3. Site público

Build -> deploy -> carregar homepage/landing -> navegação -> formulário -> sucesso -> evento de conversão.

## D. Gate de mudança

Antes de mergear:

- [ ] `PROJECT_MEMORY.md` continua verdadeiro.
- [ ] responsabilidade do projeto não aumentou indevidamente.
- [ ] campos novos têm owner.
- [ ] contrato afetado foi validado.
- [ ] custo obrigatório continua R$ 0.
- [ ] nenhum segredo foi adicionado.
- [ ] nenhum log novo expõe PII sem necessidade.
- [ ] build local/CI passa.
- [ ] testes relevantes passam.
- [ ] fluxo de lead foi testado.
- [ ] mudança de banco é idempotente ou migrada.
- [ ] rollback foi descrito.
- [ ] documentação foi atualizada na mesma PR.
- [ ] dívida temporária foi registrada ou eliminada.

## E. Gate de integração

Para qualquer mudança Site <-> CRM ou Site <-> Radar legado:

- [ ] versão do contrato declarada;
- [ ] campos obrigatórios não foram removidos;
- [ ] campos desconhecidos são tolerados quando possível;
- [ ] consumidor antigo continua funcionando durante rollout;
- [ ] timeout/retry não duplica efeito sem idempotência;
- [ ] erro do consumidor não destrói o dado de origem;
- [ ] autenticação máquina-a-máquina não reutiliza credencial humana;
- [ ] payload de teste foi salvo/documentado.

## F. Gate de banco

- [ ] migrations/ALTER são repetíveis quando desenhados assim;
- [ ] coluna nova nasce nullable ou com default seguro, salvo motivo forte;
- [ ] leitura antiga continua válida durante transição;
- [ ] índices necessários foram avaliados;
- [ ] nenhuma alteração destrutiva é executada junto com mudança de app sem janela de compatibilidade;
- [ ] dados críticos têm caminho de backup/export antes de operação destrutiva.

## G. Gate de custo zero

Falha automática se:

- a feature depende de crédito;
- exceder free tier interrompe o caminho crítico sem fallback;
- uma API paga vira única fonte de verdade;
- build/deploy exige assinatura paga nova;
- observabilidade básica só existe em ferramenta paga.

Passa quando:

- caminho crítico usa recursos já gratuitos/locais;
- recurso pago é opcional e degradável;
- existe operação manual/local documentada para contingência quando necessário.

## H. Gate de segurança

- [ ] sessão admin não é armazenada em código.
- [ ] secret tem origem em variável de ambiente.
- [ ] endpoint admin chama `requireAdmin` ou mecanismo equivalente.
- [ ] integração Radar usa segredo específico.
- [ ] rate limit existe em endpoint público sensível.
- [ ] erros públicos não vazam stack/credenciais em produção.
- [ ] CORS e métodos HTTP são mínimos necessários.
- [ ] dados pessoais não entram em URL se evitável.

## I. Gate de deploy

Pré-deploy:

- commit/PR identificados;
- variáveis necessárias conhecidas;
- schema compatível;
- build passou;
- smoke tests definidos.

Pós-deploy:

- homepage responde;
- rota de conversão responde;
- lead de teste controlado pode ser criado ou endpoint verificado sem gerar dado indevido;
- admin legado, enquanto existir, continua autenticando;
- erros críticos não aumentaram;
- analytics auxiliares não impedem conversão.

## J. Rollback

Rollback preferido: voltar aplicação para último deploy/commit saudável sem reverter dados compatíveis.

Nunca depender de rollback destrutivo de banco como primeira opção.

Se a mudança incluir schema incompatível, ela não deveria ter passado no Migration Gate.

## K. Observabilidade mínima custo zero

Obrigatório conseguir responder:

- o site está no ar?
- o formulário está retornando sucesso/erro?
- leads estão sendo persistidos?
- quando foi o último erro relevante?
- qual integração auxiliar falhou?

Usar inicialmente logs da plataforma + logs estruturados do app + verificações manuais/scriptadas. Ferramenta paga de APM não é requisito.

## L. Critérios para remover o admin legado

Só remover quando:

- OG CRM lista os mesmos leads relevantes;
- edição de status/nota/owner/next action funciona;
- Radar aparece no CRM;
- autenticação do CRM está validada;
- fluxo diário foi usado em produção sem depender do admin antigo;
- rollback para leitura do admin antigo não é mais necessário;
- nenhum endpoint público depende de componente visual admin.

## M. Regra de atualização do harness

Se arquitetura real mudar, atualizar `PROJECT_MEMORY.md`, harness e contratos **na mesma PR**. Código que contradiz o harness não está pronto para merge.
