// Blog's historical TRI bundle remains immutable. This candidate only recognizes
// explicitly reconciled document/config diffs and requires fresh ROSS certification.
const HISTORICAL_EXTRA = Object.freeze([
 'AGENTS.md',
 'README.md',
 'docs/TRI_CROSS_PROJECT_STATE_BINDING_20260907.md',
 'docs/TRI_MODEL_SIDE_ENGINEERING_MODE.md',
 'vercel.json',
]);
const CURRENT_SOURCE = Object.freeze([
 'scripts/tri-evidence-check.mjs',
 'scripts/tri-source-evidence-policy.mjs',
 'harness/BLOG_SOURCE_CERT_CANDIDATE_20261009.json',
 'tests/blog-source-evidence-policy.test.mjs',
 'docs/BLOG_SOURCE_EVIDENCE_BOUNDARY_20261009.md',
]);
const equalSet=(a,b)=>Array.isArray(a)&&a.length===b.length&&
 new Set(a).size===a.length&&a.every(f=>b.includes(f));
export function validateSourceEvidenceOverlay({
 original,candidate,changedHistorical,changedCurrent,vercel,
}) {
 if(candidate?.schema!=='tri-blog-source-cert-candidate/1' ||
    candidate?.project!=='blog-plano-saude' || candidate?.scope!=='source-only' ||
    candidate?.base_main_sha!=='3862a63ac28621ab641088b91b39b5ea42f20cb5' ||
    candidate?.validated_functional_sha!==original?.validated_functional_sha ||
    candidate?.production_authorized!==false ||
    candidate?.deploy_authorized!==false ||
    candidate?.deployed!==false || candidate?.ross_certified!==false ||
    original?.bundle_fail!==0 || original?.bundle_skip!==0 ||
    original?.production_authorized!==false || original?.status!=='pass') {
   throw new Error('source_identity_mismatch');
 }
 if(!equalSet(candidate.existing_history_paths,HISTORICAL_EXTRA)||
    !equalSet(candidate.source_change_paths,CURRENT_SOURCE))
   throw new Error('candidate_evidence_allowlist_mismatch');
 const historicalAllowed=new Set([
   ...original.allowed_post_validation_paths,...HISTORICAL_EXTRA,...CURRENT_SOURCE
 ]);
 if(!Array.isArray(changedHistorical)||changedHistorical.some(f=>!historicalAllowed.has(f)))
   throw new Error('unexpected_historical_diff');
 if(!Array.isArray(changedCurrent)||changedCurrent.some(f=>!CURRENT_SOURCE.includes(f)))
   throw new Error('unexpected_current_diff');
 if(vercel?.git?.deploymentEnabled!==false)
   throw new Error('git_auto_deploy_not_disabled');
 return {historical:'PASS',current_source:'ROSS_NOT_CERTIFIED',deploy:'HOLD'};
}
