import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const script=join(root,'scripts','release-gate.mjs');
function run(...argv){
 const r=spawnSync(process.execPath,[script,...argv],{cwd:root,encoding:'utf8',timeout:20000});
 assert.notEqual(r.status,null,'Release gate must terminate: '+argv.join(' '));
 return {status:r.status,text:r.stdout+'\n'+r.stderr};
}
for(const mode of ['node','local','release']){
 const x=run('--mode',mode,'--plan');
 assert.equal(x.status,0,mode+' plan must succeed');
 assert.ok(x.text.includes('RELEASE_GATE_PLAN '+mode),'Mode in plan');
 assert.ok(x.text.includes('git fsck')||x.text.includes('git-fsck'),'Node core QA in plan');
 assert.ok(x.text.includes('public-tree-secrets'),'Every mode must audit committed public Git HEAD');
 assert.ok(x.text.indexOf('public-tree-secrets')<x.text.indexOf('catalog-and-evidence'),'Secret audit must run before other release checks');
 assert.ok(!x.text.includes('RELEASE_GATE_REPORT '),'Dry-run should not create report');
 if(mode==='node'){
  assert.ok(!x.text.includes('isolated-local-browser')&&!x.text.includes('isolated-public-browser'));
 }
 if(mode==='local')assert.ok(x.text.includes('isolated-local-browser')&&!x.text.includes('isolated-public-browser'));
 if(mode==='release'){
  assert.ok(x.text.includes('GitHub origin/main')&&x.text.includes('deployed-blob-sha'));
  assert.ok(x.text.includes('isolated-local-browser')&&x.text.includes('isolated-public-browser'));
 }
}
for(const argv of [[],['--mode','garbage'],['--mode','node','--mode','release'],['--mode','node','--unknown'],['--plan','--plan','--mode','node']]){
 const x=run(...argv);
 assert.notEqual(x.status,0,'Invalid argument must fail closed: '+argv.join(' '));
 assert.ok(x.text.includes('RELEASE_GATE_INVALID_ARGUMENT'));
}
const help=run('--help');assert.equal(help.status,0);assert.ok(help.text.includes('--mode node|local|release'));
// Independent full-coverage manifest: every tracked Git path must appear once.
// This has no network access and never checks out or mutates tracked files.
const verifier=readFileSync(join(root,'scripts','verify-pages.ps1'),'utf8');
assert.ok(verifier.includes('ls-files --cached'),'Full verifier must enumerate Git-index files');
assert.ok(verifier.includes('$paths += $tracked'),'Full verifier must include all tracked files');
const gitFiles=spawnSync('git',['-c','core.quotepath=false','ls-files'],{cwd:root,encoding:'utf8',timeout:10000});
assert.equal(gitFiles.status,0,'Git tracked file enumeration');
const tracked=gitFiles.stdout.split(/\r?\n/).filter(Boolean).sort();
const shell=process.platform==='win32'?'powershell':'pwsh';
const ps=spawnSync(shell,['-NoProfile',...(process.platform==='win32'?['-ExecutionPolicy','Bypass']:[]),'-File',join(root,'scripts','verify-pages.ps1'),'-Full','-ListOnly'],{cwd:root,encoding:'utf8',timeout:30000,maxBuffer:1048576});
if(ps.error?.code==='ENOENT'&&process.platform!=='win32'){
 console.log('SKIP: pwsh unavailable — manifest execution requires PowerShell; static guard remains enforced');
}else{
 assert.equal(ps.status,0,'PowerShell full manifest dry-run: '+(ps.stderr||''));
 const manifest=ps.stdout.split(/\r?\n/).filter(x=>x.startsWith('PATH ')).map(x=>x.slice(5)).sort();
 assert.deepEqual(manifest,tracked,'Full release verifier must cover all tracked Git files');
 assert.equal(new Set(manifest).size,manifest.length,'No duplicate paths in release verifier');
 console.log('PASS: release verifier covers every tracked file ('+tracked.length+'/'+tracked.length+'), no network and no temporary files');
}
console.log('PASS: release gate CLI contract, mode selection, no-side-effect plans, fail-closed arguments');
