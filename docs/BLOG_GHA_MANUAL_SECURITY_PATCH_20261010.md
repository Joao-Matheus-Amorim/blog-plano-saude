# Blog — GitHub Actions safety and billing (2026-10-10)

**Scope:** GitHub Actions E2E workflow hardening only, source SHA base
`f26a4b4162513dad12e143eb0805940ff081bf3a`. No production release.

**Root cause:** `.github/workflows/e2e.yml` automatically ran on
pushes to main and pull requests, even while GitHub Actions billing
was blocked/limited and the authorized source certification system is
ROSS. It referenced three moving `@v4` action tags and `npm install`
instead of the lockfile-enforcing `npm ci`. These amplify unplanned
CI work and mutable external code exposure.

**Fix:** workflow_dispatch only, explicit read-only GITHUB_TOKEN
permissions, timeout 30 minutes, checkout without persistent token,
GitHub-verified full-SHA pins for checkout/setup-node/upload-artifact
at their v4 current commits as of 2026-10-10, Node 22 aligned with
Vite 8 and package runtime, and lockfile-driven npm ci. Manual E2E
can still be triggered by an authorized human when GH Actions
quota is restored; **not executed by this source patch**. The ROSS
same-SHA source gate remains separate and mandatory for merge.

A new independent, exact-base and exact-file-list historical evidence
overlay rejects changes beyond this security-only workflow patch,
rejects restoration of push/PR trigger, requires pinned actions
and the source security test, and retains `vercel.json` Git auto
deploy disabled. Previous React Router and Vite source overlays are
frozen against their original certified boundary. No product code,
data, API, lead, Radar consent or published site was modified.
