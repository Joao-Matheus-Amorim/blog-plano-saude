# Security Model — OG Plano Saúde

Harness: **OG-HARNESS/1.0**

## Fronteiras

```text
Visitante -> frontend público -> API server-side -> PostgreSQL/Neon + integrações opcionais
Admin legado -> API protegida -> banco
```

O browser nunca deve receber credencial de banco ou segredo de integração.

## Formulários públicos

Obrigatório:
- validação server-side;
- rate limit;
- normalização de entrada;
- tamanho máximo de campos;
- consentimento quando aplicável;
- respostas de erro sem vazar infraestrutura;
- nenhuma confiança em campos calculados apenas no client.

## Admin legado

Enquanto existir:
- autenticação server-side;
- token/sessão expirável;
- segredo com entropia adequada;
- nenhum bypass por rota escondida;
- endpoints administrativos validam autorização individualmente;
- remoção somente após cutover CRM.

## Segredos

Nunca no Git ou bundle público:
- `DATABASE_URL`;
- segredo de sessão;
- tokens Meta;
- secrets Radar;
- chaves de serviços.

Variável exposta pelo Vite deve ser tratada como pública.

## PII

Minimizar em logs:
- nome;
- telefone;
- email;
- CNPJ quando houver.

Não registrar payload inteiro de lead em log de erro por padrão.

## Integrações

- timeout finito;
- segredo M2M separado de usuário humano;
- falha de Meta/WhatsApp/analytics não pode impedir persistência do lead;
- retry não pode duplicar lead quando houver idempotência disponível.

## Dependências

- evitar biblioteca abandonada em auth/security;
- dependência nova precisa justificar necessidade e custo;
- vulnerabilidade crítica relevante bloqueia release até mitigação ou decisão explícita.

## Gate

Mudança que expõe segredo, reduz autorização server-side ou torna integração externa requisito para salvar lead = **Security Gate FAILED**.
