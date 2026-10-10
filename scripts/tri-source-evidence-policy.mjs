// Blog's historical TRI bundle remains immutable. This candidate only recognizes
// explicitly reconciled document/config diffs and requires fresh ROSS certification.
const HISTORICAL_EXTRA = Object.freeze([
 'AGENTS.md',
 'README.md',
 'docs/TRI_CROSS_PROJECT_STATE_BINDING_20260907.md',
 'docs/TRI_MODEL_SIDE_ENGINEERING_MODE.md',
 'vercel.json',
]);
const INBOUND_GOVERNANCE_PATHS = Object.freeze([
 'AGENTS.md',
 'docs/TRI_OG_CRM360_INBOUND_BOUNDARY_20261008.md',
]);
const CURRENT_SOURCE = Object.freeze([
 ...INBOUND_GOVERNANCE_PATHS,
 'scripts/tri-evidence-check.mjs',
 'scripts/tri-source-evidence-policy.mjs',
 'harness/BLOG_SOURCE_CERT_CANDIDATE_20261009.json',
 'tests/blog-source-evidence-policy.test.mjs',
 'docs/BLOG_SOURCE_EVIDENCE_BOUNDARY_20261009.md',
]);
const equalSet=(a,b)=>Array.isArray(a)&&a.length===b.length&&
 new Set(a).size===a.length&&a.every(f=>b.includes(f));
export function validateSourceEvidenceOverlay({
 original,candidate,changedHistorical,changedCurrent,vercel,actualGovernanceDigests,
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
 if (!candidate.inbound_doc_digests || !actualGovernanceDigests ||
     !equalSet(Object.keys(candidate.inbound_doc_digests),INBOUND_GOVERNANCE_PATHS) ||
     !equalSet(Object.keys(actualGovernanceDigests),INBOUND_GOVERNANCE_PATHS) ||
     INBOUND_GOVERNANCE_PATHS.some((file) =>
       !/^[a-f0-9]{64}$/.test(candidate.inbound_doc_digests[file]) ||
       candidate.inbound_doc_digests[file] !== actualGovernanceDigests[file]))
    throw new Error('inbound_governance_sha256_mismatch');
 if(vercel?.git?.deploymentEnabled!==false)
   throw new Error('git_auto_deploy_not_disabled');
 return {historical:'PASS',current_source:'ROSS_NOT_CERTIFIED',deploy:'HOLD'};
}


// A separate, narrowly scoped runtime security remediation; historical source-only
// candidate and its immutable evidence remain unchanged.
const RUNTIME_SECURITY_PATHS=Object.freeze([
 '.ross/ci.json',
 'package.json',
 'package-lock.json',
 'scripts/tri-evidence-check.mjs',
 'scripts/tri-source-evidence-policy.mjs',
 'harness/BLOG_RUNTIME_SECURITY_PATCH_20261010.json',
 'tests/blog-runtime-security-overlay.test.mjs',
 'docs/BLOG_ROUTER_SECURITY_PATCH_20261010.md',
]);
export function runtimeSecurityPaths(){return [...RUNTIME_SECURITY_PATHS];}
export function validateRuntimeSecurityOverlay({
 manifest,changedSinceBase,packageJson,packageLock,baseInAncestry,
 vercel,auditGate
}){
 if(manifest?.schema!=='tri-blog-runtime-security-candidate/1' ||
    manifest?.project!=='blog-plano-saude' ||
    manifest?.scope!=='dependency-security-only' ||
    manifest?.base_certified_main_sha!=='945fcea42ce221f046391913226bdeb0a93e7e13' ||
    !equalSet(manifest?.paths,RUNTIME_SECURITY_PATHS) ||
    manifest?.package_name!=='react-router-dom' ||
    manifest?.package_version!=='7.18.4' ||
    manifest?.production_authorized!==false ||
    manifest?.deploy_authorized!==false ||
    manifest?.deployed!==false || manifest?.ross_certified!==false)
  throw new Error('runtime_security_identity_mismatch');
 if(!baseInAncestry)throw new Error('runtime_security_base_not_ancestor');
 if(!Array.isArray(changedSinceBase) ||
    changedSinceBase.some(f=>!RUNTIME_SECURITY_PATHS.includes(f)))
  throw new Error('unexpected_runtime_security_diff');
 if(!changedSinceBase.includes('package.json') ||
    !changedSinceBase.includes('package-lock.json') ||
    !changedSinceBase.includes('harness/BLOG_RUNTIME_SECURITY_PATCH_20261010.json'))
  throw new Error('security_patch_missing_lock_or_manifest');
 if(packageJson?.dependencies?.['react-router-dom']!=='7.18.4' ||
    packageLock?.packages?.['node_modules/react-router-dom']?.version!=='7.18.4' ||
    packageLock?.packages?.['node_modules/react-router']?.version!=='7.18.4')
  throw new Error('runtime_router_version_mismatch');
 if(packageLock?.packages?.['node_modules/@remix-run/router'])
  throw new Error('obsolete_runtime_router_present');
 if(!auditGate)throw new Error('runtime_security_audit_missing');
 if(vercel?.git?.deploymentEnabled!==false)
  throw new Error('git_auto_deploy_not_disabled');
 return {scope:'dependency-security-only',source:'ROSS_REQUIRED',deploy:'HOLD'};
}
