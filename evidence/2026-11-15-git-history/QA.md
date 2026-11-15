# Git ancestry and deleted-secret audit — 15/11/2026

Repository: `https://github.com/trinhtanphat/agent-harness-skillbook`
Candidate SHA when measured: `f63b22a10ab23c1812c1d3dc8dae108adde10b14` (branch `security/git-history-public-secret-audit-20261115`).

## Real observed discrepancy, resolved without worktree edits

Initially WIN11-181 and DESKTOP-PHA1S90 had matching HEAD but **different reachable history**:

| Device | Shallow | Reachable commits at same HEAD |
| --- | --- | ---: |
| WIN11-181 | true | 69 |
| DESKTOP-PHA1S90 | true | 64 |

Running `git fetch --unshallow origin main` inside authorized isolated QA worktrees downloaded missing ancestry, without resetting HEAD, changing code, force-pushing, deleting worktrees or closing browser sessions. Both then returned `git rev-parse --is-shallow-repository = false`.

## Two-host candidate QA

| Check | WIN11-181 | PHA |
| --- | --- | --- |
| No shallow boundary | PASS | PASS |
| Git history audit | **331/331 blobs, 73 commits PASS** | **331/331 blobs, 73 commits PASS** |
| Synthetic removed token still detected | PASS | PASS |
| Synthetic removed `.env.production` still detected | PASS | PASS |
| Real `--depth=1` clone rejected fail-closed | PASS | PASS |
| Reusable HEAD scanner, PGP literal false-positive regression | PASS | PASS |
| Git worktree clean | PASS | PASS |

No high-confidence secret signature or sensitive historical path was detected among the blobs reachable from this candidate HEAD; **not** a guarantee against unknown token formats or secrets outside this branch ancestry.

## Remaining acceptance

The final branch commit will be tested with 9/9 Node gates and 10/10 local Chrome gates before merging. After fast-forward merge, require 12/12 release gates on the exact GitHub `main` SHA, 24/24 public browser QA and all Git-tracked SHA matching GitHub Pages. Do not call 100% before these results exist.
## Public release evidence after first merge

PHA ran `node scripts/release-gate.mjs --mode release` from `2026-11-15T03:20:33.106Z` through `2026-11-15T03:22:19.523Z`, verified `474712ee1987307da25aee579ab43e683b9f73f3` both before and after QA.

**12/12 PASS**, 340/340 full ancestor history blobs (74 commits), 24/24 browser checks each on local and public site, 164/164 deployed blobs with `DEPLOY_INTEGRITY_PASS`, exit 0. [Original JSON](release-gate-public.json) has SHA-256 `bc7b8f8a6fceffc378ac919653142677e07f1ee6c09744fcd42a4ecf2f3c617f`, Git blob SHA `2d5fc14f59f05b79d8f4bf902fc9f5ded2986538`, 2,445 bytes. Source Git object computed on PHA and blob returned by GitHub are identical.

**Scope warning:** all counts above apply to SHA `474712ee1987307da25aee579ab43e683b9f73f3`. The new commit containing this original JSON increases the file count and changes HEAD. Re-run release gate on that final SHA to close the release.
