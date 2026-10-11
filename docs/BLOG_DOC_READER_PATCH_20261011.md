# Blog documentary reader reconciliation — 2026-10-11

Scope: **documentation-reader-only**, based on Blog main `391feaf47b1e6985bcc2091548ca12f6e79c019d`. No runtime, source contract, credential, deployment or database changes. This is a candidate **not ROSS-certified** until its exact SHA passes the trusted judge.

## Root cause and owner-layer correction

The current README still claimed Git-triggered automatic deploy despite `vercel.json` specifying `git.deploymentEnabled=false`; its listed React Router major version was also stale. The AGENTS cross-project excerpt still described Radar I3-C/I3-D as pending even though the owning Radar AGENTS had already closed replacement1 and measured shadow. Correct the Blog reader, not Radar, CRM runtime or Vercel configuration.

The upstream reference is `radarplan/AGENTS.md` at Radar main `30b36a1d37a22d153198cbfe059130f90623ecb1`. I3-C original attempt remains historical HOLD; replacement1 certified; I3-D SHADOW_MEASURED; Wave 1 shadow-measured and Waves 2–6 runtime inert. **No automatic Radar → CRM ingestion, customer contact or Production enablement**.

## Evidence isolation

Manifest: `harness/BLOG_DOC_READER_PATCH_20261011.json`. It fixes the base and exact changed path set. The prior `harness/BLOG_SOURCE_CERT_CANDIDATE_20261009.json` and historical receipt remain byte-for-byte unchanged. Source evidence continues validating the old AGENTS digest from the **immutable base Git blob**, while this new overlay validates current prose and deployment freeze. The ROSS local gate runs positive and negative documentary regression tests; the evidence gate enforces exact diff, ancestry and disallows false claims.

Not a release authorization. **Merge only after exact feature SHA ROSS certification and review.** After merge certify the main merge SHA. Deploy remains manual HOLD.
