# React Router security remediation — 10/10/2026

**Scope:** dependency-security-only. Baseline certified source main:
945fcea42ce221f046391913226bdeb0a93e7e13.
Do not reinterpret the August TRI functional certificate as this runtime source
or as a deployed/public production release.

The Blog previously locked react-router-dom 6.30.1, react-router 6.30.1 and
@remix-run/router 1.23.0. A fresh production-dependency audit reported 3 high
severity findings. v6.30.4 still yielded 2 moderate findings, v7.18.0 yielded
2 high findings; explicit v7.18.4 has zero production-dependency findings in
the same npm audit snapshot. React Router 7 accepts React >=18 and Node >=20
according to the registry. The candidate pins direct and transitive versions,
removes the obsolete nested router and changes no frontend/API/data contracts.

New source security scope is separately allowlisted by exact baseline, paths,
versions, retained historical evidence and explicit manual-deploy HOLD. ROSS
security now fails on a nonzero npm production advisory audit. All changes
require same-SHA ROSS feature certification, code review and main certification.
The new branch is NOT a release authorization and v7 compatibility requires
real end-to-end staging or production tests at the next manually authorized
deploy. No automatic deployment or contact/capture policy change.
