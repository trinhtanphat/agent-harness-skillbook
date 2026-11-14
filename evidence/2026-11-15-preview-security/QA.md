# QA — Canonical sensitivity in local preview (15/11/2026)

**Scope:** local loopback preview (`scripts/local-preview.mjs`) only. This is not a claim that GitHub Pages operates the Node preview server.

**Repository:** https://github.com/trinhtanphat/agent-harness-skillbook
**Verified source branch:** `fix/preview-canonical-sensitivity-20261115`, source HEAD `fe29d9276ba8d4b02fa79cca4c16e6b4083f8fdc`.

### Reproducible tests

`node scripts/validate.mjs` verifies 60 skills, 14 playbooks, public evidence, canonical security guards and new alias regression. `node scripts/test-preview.mjs` makes HTTP requests to a loopback-only temporary port. This test writes only dummy test data into the isolated QA worktree and removes it in a `finally` block.

| Host | Test | Result |
| --- | --- | --- |
| WIN11-181 | 17 HTTP static-preview requests | PASS |
| WIN11-181 | Symlink escape outside root | PASS — access refused |
| WIN11-181 | Symlink alias to `.env.*` **inside root** | PASS — access refused |
| DESKTOP-PHA1S90 | 17 HTTP static-preview requests | PASS |
| DESKTOP-PHA1S90 | Symlink escape outside root | PASS — access refused |
| DESKTOP-PHA1S90 | Symlink alias to `.env.*` **inside root** | PASS — access refused |
| DESKTOP-PHA1S90 | 24 browser checks on isolated local preview | PASS |
| WIN11-181 | Installer 60 skills, MCP smoke, `git fsck` | PASS |

### Actual observed console endings

```text
PASS: symlink escape blocked by canonical containment
PASS: in-root symlink alias to forbidden .env.* is denied
PASS: 17 static preview cases / only loopback / sensitive paths protected
```

Chrome local preview on PHA printed `LOCAL_PREVIEW_QA_PASS` and `PASS: desktop-catalog, metadata-counts, ... mobile-320-four-routes, reduced-motion, runtime-exceptions` (24 named observations).

### Security boundary

Both the raw URL and the resolved canonical path must reject sensitive segments (`.git`, `.env`, `.env.*`, `.npmrc`, `.pypirc`, `.ssh`, `.aws`, `.github`, QA directories). Matching ignores case to prevent bypasses on common Windows filesystems. File contents stream from the already validated canonical path. No real credentials were created, read or displayed.

### Completion criteria

After merge into `main`, rerun Node smoke checks and the full GitHub Pages blob verifier against the **new remote HEAD**. Keep production/browser sessions untouched. This is a targeted regression gate, not a complete security audit.
