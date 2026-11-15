import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
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
const help=run('--help');assert.equal(help.status,0);assert.ok(help.text.includes('--mode release'));
console.log('PASS: release gate CLI contract, mode selection, no-side-effect plans, fail-closed arguments');
