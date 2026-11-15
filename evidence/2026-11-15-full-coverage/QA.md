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