# Public Chrome QA — execution transcript (14 November 2026)

Origin: DESKTOP-PHA1S90; isolated Chrome headless user-data-dir, no user-session browser reuse.
Source commit: `ef3517bbcd1a855ce83142c334b0a3071fba710d`
Command: `node scripts/browser-qa.mjs https://trinhtanphat.github.io/agent-harness-skillbook/`
Result: exit code `0`, all 24 named browser assertions PASS.

Actual console output (transcribed from the tool run):

```text
PASS: desktop-catalog, metadata-counts, theme-toggle, search-MCP, category-filter, expanded-category-filter, category-keyboard-focus, drawer-share-link, modal-background-inert, drawer-focus-trap, skill-drawer, modal-background-restore, direct-link-reload, escape-close, browser-back-close, mobile-390, docs-mobile, 14-guide-link-smoke, directory-pages, skills-index-mobile, installer-guide, mobile-320-four-routes, reduced-motion, runtime-exceptions
EVIDENCE_DIR=C:\Users\Public\Documents\agent-harness-skillbook-a11y-qa-20261114\qa-evidence
PUBLIC_QA_SHA=ef3517bbcd1a855ce83142c334b0a3071fba710d
```

Independent branch QA: `node scripts/test-local.mjs` PASS on the same source; `node scripts/test-preview.mjs` PASS 15/15 and a real symlink-outside-root denial PASS; `node scripts/test-install-skills.mjs` PASS 60 skills including pre-existing destination collision checks; MCP smoke PASS; `git fsck` PASS.

Release verification: first public browser run hit stale CDN metadata; after the public index/assets were compared byte-for-byte to the correct Git blobs, the second public browser run passed 24/24. GitHub Pages SHA verifier returned 116/116 `DEPLOY_INTEGRITY_PASS`, exit code 0, for the source-code commit above.

Evidence limitation: detailed JSON and 320px screenshots were written to the PHA local QA evidence directory but could not yet be uploaded because the device disconnected afterward. This file records the successful console output and scope, not a fabricated JSON or screenshot. Do not describe it as a full WCAG audit.
