# Blog — secure Vite/React build toolchain (2026-10-10)

**Status:** source-only remediation candidate, no deployment authorization.
Certified baseline before this patch: Blog main
50853e987d3244cad3c3341bcf24683274966890 (React Router 7.18.4).
Preserve source-only and historical TRI evidence, do not rewrite certificates.

A current npm audit of the full Blog graph detected 14 advisories including
10 high in the dev toolchain; production dependency audit remained 0 at the
same observed snapshot. `npm audit fix --package-lock-only` reduced the
full graph to 2 findings but retained high Vite. The isolated Vite 8.3.4 +
@vitejs/plugin-react 6.1.2 candidate has **0 total findings** at the
snapshot. Both direct dev dependencies are pinned and locked.

Vite 8's Rolldown accepts `manualChunks` as a function, not the earlier
Rollup object map; vendor chunks retain React and Framer Motion groups.
Vite 8 no longer includes esbuild as a built-in minifier; the build uses
its Oxc engine. Source maps remain disabled. No frontend, API, outbox, CRM,
schema or form behavior is intentionally changed; build output differs and
browser parity still requires an authorized deploy E2E.

Separate exact-SHA/exact-path contract
`harness/BLOG_BUILD_SECURITY_PATCH_20261010.json` limits this patch.
The earlier Blog runtime router security overlay is validated against its
original frozen main boundary; the new build overlay is validated against
the subsequent frozen main boundary. Neither opens a generic historical
allowlist. ROSS requires both runtime-only and whole-dependency npm audit,
tests, lint, build, contract and evidence before source merge.
Vercel automatic deployment remains disabled; no live E2E, production
deployment, or live service claim follows from ROSS source certification.
