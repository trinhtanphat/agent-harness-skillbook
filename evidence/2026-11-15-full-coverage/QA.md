# Full Git-tracked coverage — release verifier audit, 15/11/2026

Repo: https://github.com/trinhtanphat/agent-harness-skillbook

Starting HEAD: `fb570dfdbc00b0285c64a66a96805fb5bbb06e4d`.

Audit found **153 tracked Git files** versus **133 files** in the previous curated Pages verifier. Twenty tracked files were outside its scope. The shortfall did not mean those files were mismatched.

Direct public-host HTTP requests checked a sample of previously omitted paths: `robots.txt`, `404.html`, `assets/favicon.svg`, `AGENTS.md`, `CONTRIBUTING.md`, `REFERENCES.md`, `CHANGELOG.md`, `LICENSE`, `templates/route-inventory.csv`, `examples/mcp-tool-contract.json`, `scripts/browser-qa.mjs`, `scripts/test-local.mjs`, `.gitignore`, and `.nojekyll`. All **14/14** sampled files were accessible and matched the source Git blob SHA; `.nojekyll` is zero bytes.

### Fix

- Full verifier builds a manifest by unioning the existing list with `git -c core.quotepath=false ls-files --cached`; fails closed if Git enumeration fails.
- The manifest is sorted, deduplicated, and includes files with dot-prefixed names. New tracked files are audited automatically.
- Added `-Full -ListOnly` for a read-only offline manifest; no temp directory created and no live site requests.
- Node contract test compares the manifest exactly with `git ls-files`, and rejects duplicate paths.

### Acceptance gates

Run `node scripts/release-gate.mjs --mode node` on WIN11-181, local Chrome QA on PHA, then release mode on public GitHub Pages after main merge. The final full-site count will be larger than 153 because this audit log and any new files are also tracked. **Do not extrapolate success until the final deployed SHA and HEAD checks pass.**

Limitation: GitHub Pages receives public repository files including `.gitignore`/`.nojekyll`; this audit does not imply those files are secrets, nor that the site has passed a penetration test.
### Recorded live acceptance

PHA ran `node scripts/release-gate.mjs --mode release` on source SHA `a4d5cbabb6cc7410fb219e33bd5e038568b2c976` from `2026-11-15T01:53:06.685Z` through `2026-11-15T01:54:36.764Z`. Result **9/9 PASS**, including **154/154 Git-tracked deployed SHA**, 24/24 local Chrome checks, 24/24 live Pages Chrome checks, and matching direct GitHub main SHA both before and after.

Original PHA [release-gate-public.json](release-gate-public.json) is **2009 bytes**, SHA-256 `c9b8ed48221c69596a1ccd772c194a428f6b31edd223e2558542b9657bda7cbe`, original Git blob SHA = uploaded GitHub Git blob SHA `c3527f8651924320f90cd709dfb869ca8d615bd3`. Scope: this result applies to `a4d5cbabb6cc7410fb219e33bd5e038568b2c976`. The archive commit modifies tracked content; rerun release QA on its HEAD.
