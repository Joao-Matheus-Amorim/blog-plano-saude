# Contract Harness — OG Plano Saúde

Versão compartilhada: `og-contracts/1.0`.

Schemas deste repositório:

- `lead.v1.schema.json` — lead de aquisição publicado ao OG CRM;
- `acquisition-event.v1.schema.json` — evento público/agregado de aquisição.

## Regras

- contrato é fronteira entre repos, não modelo interno obrigatório;
- adapters normalizam o payload antes de sair do domínio;
- breaking change cria v2 em paralelo;
- campos novos v1 devem ser aditivos/opcionais sempre que possível;
- consumidor precisa tolerar campo extra seguro;
- fixtures devem existir nos testes quando integração direta for implementada;
- dados pessoais devem ser mínimos para o objetivo do evento.
