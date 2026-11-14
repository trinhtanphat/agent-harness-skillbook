# Read-only GitHub Pages integrity verifier for Agent Harness Skillbook.
# Compares byte-for-byte deployed content with the Git object at the local HEAD.
# No Actions, no repository writes, no production mutations.
param([switch]$Full)

$ErrorActionPreference = 'Stop'
$repo = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$site = 'https://trinhtanphat.github.io/agent-harness-skillbook/'
Push-Location $repo
$tmp = Join-Path $env:TEMP ('skillbook-pages-verify-' + [guid]::NewGuid().ToString('N'))
New-Item -Path $tmp -ItemType Directory -Force | Out-Null
$paths = @('index.html','assets/app.js','assets/styles.css','assets/docs.css',
           'data/catalog.js','sitemap.xml','QA_REPORT.md','README.md',
           'examples/mcp-stdio-demo/server.mjs','examples/mcp-stdio-demo/client-smoke.mjs')
$paths += @(Get-ChildItem (Join-Path $repo 'docs') -Filter '*.html' -File | ForEach-Object { 'docs/' + $_.Name })
$paths += @(Get-ChildItem (Join-Path $repo 'evidence/2026-11-14') -Filter '*.png' -File | ForEach-Object { 'evidence/2026-11-14/' + $_.Name })
if($Full){
  $paths += @(Get-ChildItem (Join-Path $repo 'playbooks') -Filter '*.md' -File | ForEach-Object { 'playbooks/' + $_.Name })
  $paths += @(Get-ChildItem (Join-Path $repo '.agents/skills') -Filter 'SKILL.md' -File -Recurse | ForEach-Object {
    '.agents/skills/' + $_.Directory.Name + '/SKILL.md'
  })
}
$paths = @($paths | Sort-Object -Unique)
$passed = 0; $fails = New-Object System.Collections.Generic.List[string]
try {
  foreach($p in $paths){
    $remote = $site + $p
    $file = Join-Path $tmp ('object-' + $passed.ToString('D4') + '.bin')
    try {
      Invoke-WebRequest -UseBasicParsing -Uri $remote -OutFile $file -TimeoutSec 25 | Out-Null
      $actual = (& git hash-object -- $file).Trim()
      $expected = (& git rev-parse ('HEAD:' + $p)).Trim()
      if($LASTEXITCODE -ne 0){ throw "Git blob lookup failed" }
      if($actual -ne $expected){ throw ('HASH_MISMATCH expected=' + $expected + ' actual=' + $actual) }
      $passed += 1
      Write-Output ('PASS ' + $p)
    } catch {
      $fails.Add(($p + ' :: ' + $_.Exception.Message))
      Write-Output ('FAIL ' + $p + ' :: ' + $_.Exception.Message)
    }
  }
} finally {
  Pop-Location
  Remove-Item -LiteralPath $tmp -Force -Recurse -ErrorAction SilentlyContinue
}
Write-Output ('SUMMARY ' + $passed + '/' + $paths.Count + ' matching blobs')
if($fails.Count -gt 0) {
  Write-Output ('FAILURES ' + $fails.Count)
  exit 2
}
Write-Output 'DEPLOY_INTEGRITY_PASS'
