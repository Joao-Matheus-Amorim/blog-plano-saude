# TRI MODEL-SIDE ENGINEERING MODE — BLOG PLANO SAÚDE

**Status:** ACCEPTED / TRANSITIONAL  
**Date:** 2026-09-02  
**Cross-project authority:** `Joao-Matheus-Amorim/tri-ecosystem` → `docs/44_MODEL_SIDE_ENGINEERING_TRANSITION_MODE.md`

## Role of this repository

`blog-plano-saude` owns inbound acquisition, SEO/content surfaces and lead capture for the TRI / OG ecosystem.

It does not own Radar opportunity intelligence, OG CRM pipeline state or ROSS certification policy.

## Current engineering contract

```text
USER
  ↓ defines Goal / business approvals
CHATGPT / MODEL-SIDE AGENT
  ↓ inspects GitHub + current project truth
  ↓ creates branch and implements/reviews change
  ↓ validates diff/gates/preview implications
  ↓ opens/reviews/merges PR when allowed
USER
  ↓ runs only a manual ROSS command when certification policy requires it
ROSS
  ↓ exact-SHA evidence
CHATGPT
  ↓ verifies result and continues/finishes
```

OpenCode may be used as an executor when local/dev-server work is useful, but it is not the project brain and cannot certify its own work.

## Repository scope lock

Before mutation, the active repository must be explicitly `Joao-Matheus-Amorim/blog-plano-saude`.

Commands, branches, logs or artifacts from `radarplan`, `og-crm`, `ross-ci`, `controle-dividas` or any other repository do not change this scope implicitly.

A repository switch is a new explicit work context.

## Branch-first is mandatory

This repository has historical evidence that commits to `main` can trigger Vercel Production through Git integration, including documentation-only commits.

Therefore normal work follows:

```text
verified main/base
→ branch
→ implementation/docs
→ build/gates/preview review as applicable
→ PR
→ merge authorization
→ Production only through the normal integration path
```

No direct normal-work commit to `main`, including docs, manifests, schemas or contract copies.

## Model-side agent responsibilities

The model-side agent should:

- verify current `main` on GitHub before creating a branch;
- read project documentation and cross-project contract ownership;
- make the smallest coherent diff;
- preserve unrelated changes;
- check whether a change touches lead capture, privacy, APIs, database or Production behavior;
- run or obtain relevant build/test evidence before merge;
- verify PR base/head and changed-file list;
- avoid claiming deploy/Production state without direct evidence;
- ask the user for manual ROSS only when the project policy actually requires it.

## Blog-specific safety boundaries

Documentation or content work must not silently:

- change CRM ownership;
- change Radar scoring/intelligence contracts;
- expose lead data or secrets;
- alter Neon/server-side schema without explicit migration scope;
- change auth/admin behavior by implication;
- treat a Vercel deployment as successful merely because GitHub merge succeeded.

Real leads/customer data must never be copied into engineering documentation or prompts as a convenience.

## Evidence hierarchy

- GitHub: canonical code, branch, commit and PR state;
- Vercel/runtime evidence: deployment/Production claims;
- ROSS: certification claims when required;
- `tri-ecosystem`: cross-project strategy, ownership and contracts.

## Failure handling

If the base SHA, PR head or deployment-relevant state changed after review, stop and re-establish truth before continuing.

If the worktree/worker contains unrelated project state, do not clean or reuse it blindly.

If a test/build/preview fails, fix that failure before describing the change as ready.

## Manual ROSS transition

During the current transition, if this repository requires a ROSS gate, the user receives one bounded command for the exact repo/branch/SHA. The user is not expected to implement the patch or reconstruct certification logic manually.

Future TRI Relay automation may remove this manual transport, but ROSS remains the certification authority.

## Session closure

A completed change should record enough evidence to identify:

- Goal;
- starting main SHA;
- feature/docs branch and head SHA;
- changed files;
- relevant build/gates;
- PR and merge SHA;
- deployment evidence when Production is claimed;
- ROSS result/certificate when certification was required;
- next safe baseline.
