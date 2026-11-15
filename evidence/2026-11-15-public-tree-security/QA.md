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
### Original public release acceptance

At 2026-11-15T02:14:49.074Z–2026-11-15T02:16:24.271Z, PHA ran full release mode against main commit `7e33a1e6b5831dc7352e2e78894de31a2429690d`. Result 10/10 PASS: Git tree secret preflight 159/159, local and public browser 24/24 each, and deployed SHA 159/159. GitHub main SHA before and after matched `7e33a1e6b5831dc7352e2e78894de31a2429690d`.

[Original JSON](release-gate-public.json) was copied byte-for-byte from the PHA runner, 2152 bytes, SHA-256 `0f9acdf3f5c637005d344c0d746c0a7fd1eebac77e93be6b353778d70bd59a03`, Git blob `9e181253206dc71b6f6366e003363177a5f864c6` identical on PHA and GitHub. An evidence-archiving commit changes HEAD; final Pages check must be rerun.
