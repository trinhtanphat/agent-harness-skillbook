# Reproducible release gate — pre-merge QA (15/11/2026)

Repo `https://github.com/trinhtanphat/agent-harness-skillbook`, branch `feat/reproducible-release-gate-20261115`; Windows machine QA only, no GitHub Actions or production mutations.

## Test evidence

| Scope | Host | Result |
| --- | --- | --- |
| `node scripts/test-release-gate.mjs` (plan, invalid args, help) | WIN11-181 | PASS |
| `node scripts/release-gate.mjs --mode node` | WIN11-181 | PASS 6/6 (source SHA `d9f0c8c`) |
| `node scripts/release-gate.mjs --mode local` | DESKTOP-PHA1S90, isolated Chrome | PASS 7/7 (source SHA `d9f0c8c`) |
| `node scripts/release-gate.mjs --mode release` before merging to main | WIN11-181 | **Intended FAIL**, exit 1, **0/9 tasks executed** |

Release preflight refused candidate SHA `fe2b7748999962fb72293b06e6e58bca038adaad` because verified remote `main` SHA was `30a31ee6ca9ead83a181663fb30ce8481cb00ef0`. Actual output included `RELEASE_GATE_FAIL Release blocked: GitHub main ... differs from local HEAD ...` and `RELEASE_GATE_FAIL 0/9 steps mode=release`. This is a **successful negative security test**, not a completed public release gate.

## Pass criteria for publishing

1. Update branch with docs and verifier; rerun both node/local gate modes on exact candidate SHA.
2. Fast-forward main with expected SHA lease; do not force-push or overwrite other agents.
3. On detached HEAD matching remote main, run `node scripts/release-gate.mjs --mode release` using isolated Chrome; require **9/9 PASS**, postflight GitHub SHA verification and `DEPLOY_INTEGRITY_PASS`.
4. Check GitHub Pages `BUILT` and independently re-fetch remote main commit ID. Report PR, merge and production separately.

**Limitations:** smoke test, not a complete WCAG/security certification; verifier only compares explicitly included published files.

## Actual live acceptance after initial merge

Public release gate ran on PHA at `2026-11-15T00:14:06.096Z` to `2026-11-15T00:15:49.108Z` (UTC); **9/9 PASS** for SHA `3abcabf05155878f5a2901c352f3c6f310b6212f`. Verified 24 local Chrome and 24 public Chrome checks, **132/132 deployed blobs**, remote GitHub main SHA before and after. Archived the original [machine-readable JSON](release-gate-public.json) with SHA-256 `32fa56109af60fd54fc75d75cb1673376921bab0691648bf3022f35080ae8ded`. This evidence applies to the tested SHA only; re-run after this evidence-archive commit.
