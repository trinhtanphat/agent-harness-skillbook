# Public Git tree security preflight — 15/11/2026

Repository: `https://github.com/trinhtanphat/agent-harness-skillbook`; branch `security/publication-secret-preflight-20261115`.

### Finding and scope

The existing full SHA verifier compared every tracked public file byte-for-byte, but did **not** reject credentials mistakenly committed into the public tree. This is a preventative release-policy gap, not proof of an existing leak.

### Candidate security audit

An initial scanner version returned a false positive against the PGP regex literal inside its own source. The regex declaration was corrected without disabling the PGP signature check.

Both WIN11-181 and DESKTOP-PHA1S90 subsequently tested the scanner on the initial candidate source SHA `71840855c19f11f061796a593fc4770a6c11889a`: 158/158 Git HEAD blobs PASS. `scripts/test-public-tree.mjs` created temporary Git repositories with harmless files and synthetic files/strings resembling `.env.production`, SSH keys, PEM, GitHub token, AWS key and OpenAI key. Unsafe fixtures were rejected with risk codes and without printing the simulated token. Temp fixtures were deleted after each test.

### New behavior

`scripts/release-gate.mjs` must run `public-tree-secrets` before existing node/local/live checks, refusing to proceed if any risk is detected in exact Git HEAD blobs. No scanning of unknown historical commits, no automated credential rotation, no deletion and no network.

### Acceptance still required

- Rerun all 7 node checks on WIN11-181 and 8 local checks on PHA using the final candidate SHA.
- Fast-forward merge to main using expected SHA, verify remote main directly.
- Rerun 10/10 release gate on public GitHub Pages and all tracked SHA; ensure Pages BUILT and HTTPS on.

Only close the release when those checks are evidenced. This is targeted secret-signature prevention, **not** a complete penetration test or Git history audit.