# Preview & verify a branch without touching GitHub Pages

The preview and smoke tests use **Node.js built-ins only** plus an installed Chrome/Chromium/Edge. It serves this repo on **127.0.0.1**, not on a public network interface. It blocks `.git`, `.env`, `node_modules` and QA output directories.

```bash
node scripts/local-preview.mjs 8765
# in another terminal:
node scripts/browser-qa.mjs http://127.0.0.1:8765/
```

Single-command isolated QA (starts the preview server and stops it):

```bash
node scripts/test-local.mjs
```

On Windows with Chrome installed elsewhere:

```powershell
$env:BROWSER_BIN='C:\Program Files\Google\Chrome\Application\chrome.exe'
node scripts/test-local.mjs
```

Test results and screenshots go to `qa-evidence-local/` and should **not** be committed automatically. The local preview checks no production APIs. The browser script uses its own disposable user profile instead of attaching to your open Edge session.

Before a release, additionally run `node scripts/validate.mjs`, `node examples/mcp-stdio-demo/client-smoke.mjs`, and after GitHub Pages deploy run `scripts/verify-pages.ps1 -Full` on Windows to compare public bytes with Git HEAD.

For fast headless-server checks with **no Chromium installed**: `node scripts/test-preview.mjs` (12 cases). These verify only file serving and local scope, not UI interactivity.

Security hardening: the preview refuses `.env.*`, `.npmrc`, `.pypirc`, `.ssh`, `.aws`, `.git`, `.github` and QA/cache directories. Every served file must resolve canonically under the repository root, including after following symbolic links. `node scripts/test-preview.mjs` tests this dynamically when the operating system permits symlink creation. It does not expose LAN interfaces.

### Canonical sensitive-path policy (15/11/2026)

The loopback server denies configured sensitive segments in **both** the requested URL and the resolved filesystem path. This prevents an in-repository symbolic link from exposing `.git`, `.env.*`, `.ssh` or similar files by using a harmless alias; the check is case-insensitive for Windows compatibility. Responses stream from the already validated canonical path. `node scripts/test-preview.mjs` now tests uppercase sensitive paths, outside-root symlinks and in-root aliases to dummy `.env.*` data when the OS permits symlinks. These tests create no real credentials or persistent artifacts.
