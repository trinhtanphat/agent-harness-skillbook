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