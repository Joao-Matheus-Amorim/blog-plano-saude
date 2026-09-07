# Blog Plano Saúde — TRI Cross-Project State Binding — 2026-09-07

## Purpose

This document updates the Blog's understanding of the wider TRI / OG ecosystem without changing Blog runtime, lead capture, SEO, forms, attribution or Blog → CRM delivery behavior.

Canonical cross-project reconciliation:

`Joao-Matheus-Amorim/tri-ecosystem/docs/48_CROSS_PROJECT_STATE_RECONCILIATION_20260907.md`

## Blog role remains unchanged

The Blog continues to own:

- inbound acquisition;
- SEO/content/public pages;
- simulators/forms;
- attribution;
- original lead capture;
- durable pre-CRM persistence/delivery.

The Blog must not silently absorb:

- Radar scraping/scoring/evidence intelligence;
- OG CRM pipeline ownership;
- cross-project contract authority.

## What changed elsewhere

Radar advanced its governed Scrapling source lifecycle after the 2026-09-02 ecosystem snapshot.

Current cross-project interpretation:

```text
Radar Scrapling adapter = implemented + certified in main
Radar I3-A real-adapter shadow runner = certified in main
Radar I3-B frozen public target plan = certified in main
Radar I3-C one bounded live observation = pending
Radar I3-D lifecycle decision = pending
Radar Scrapling production runtime = disabled
Radar automatic CRM delivery = disabled
Radar automatic outreach = disabled
Radar Production observed = false
```

The current Radar main before this documentation wave is:

`d3f3185eed9d7eb9df8d034592ffad736c55efe7`

This awareness does **not** change Blog routing, SEO behavior or lead-delivery semantics.

## Integration truth remains unchanged

```text
Blog → CRM = previously observed in Production / unchanged
Radar → CRM → Radar Production observed = false
real automatic V6 CRM delivery = not authorized
```

Scrapling is a Radar acquisition/source-lifecycle concern. It does not authorize the Blog to consume or trigger new Radar runtime output automatically.

## Contracts remain unchanged

Canonical TRI contract authority remains `tri-ecosystem/contracts/1.0`, including:

- `tri.lead.created.v1`;
- `tri.prospect.upserted.v1`;
- `tri.commercial.feedback.v1`.

No contract version/hash is changed by the Scrapling work.

## Worker / ROSS operational awareness

When Blog work requires ROSS, Worker/Cockpit, TRI Relay or OpenCode, load the canonical TRI runbooks:

- `tri-ecosystem/docs/46_WORKER_ACCESS_AND_INFRA_RUNBOOK.md`
- `tri-ecosystem/docs/47_WORKER_PERSISTENT_SSH_SESSION.md`
- `tri-ecosystem/.agents/skills/root-cause-first/SKILL.md`

Rules include:

- keep one persistent Worker SSH session when already at `ross@DESKTOP-N9PMJE5:...$`;
- do not append top-level `exit`/`logout` to ordinary bounded interactive command blocks;
- separate GitHub refs, Worker HEAD, installed tool state, ROSS certification and Production state;
- fix the owning/root-cause layer before retrying failed gates.

## Production safety

Blog `main` is Production-connected through Vercel. Documentation changes therefore remain branch-first and require the same release awareness as any other merge to `main`.

## No-effect declaration

This change does not alter:

- Blog application code;
- SEO/content runtime;
- forms or lead capture;
- Blog outbox/delivery semantics;
- contracts;
- Vercel configuration;
- OG CRM behavior;
- Radar runtime authorization;
- Production claims.
