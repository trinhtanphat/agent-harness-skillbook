import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync,unlinkSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {dirname,join} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {spawnSync} from 'node:child_process';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const audit=join(root,'scripts','audit-public-history.mjs');
const headAudit=join(root,'scripts','audit-public-tree.mjs');
function call(exe,args,cwd){
 const p=spawnSync(exe,args,{cwd,encoding:'utf8',timeout:90000,maxBuffer:1024*1024});
 assert.equal(p.error,undefined,'Process started');
 return p;
}
function commit(repo){
 assert.equal(call('git',['add','--all','-f'],repo).status,0);
 assert.equal(call('git',['-c','user.name=QA','-c','user.email=qa@example.invalid','commit','-qm','Fixture'],repo).status,0);
}
const repo=mkdtempSync(join(tmpdir(),'sb-history-qa-'));
try{
 assert.equal(call('git',['init','-q'],repo).status,0);
 const leaked='docs/old-token.md';
 mkdirSync(join(repo,'docs'),{recursive:true});
 const fakeToken='ghp_'+'Z'.repeat(40); // synthetic fixture, not a credential
 writeFileSync(join(repo,leaked),'Test data: '+fakeToken+'\n');
 commit(repo);
 unlinkSync(join(repo,leaked));
 writeFileSync(join(repo,'docs/safe.md'),'Harmless current public text\n');
 commit(repo);
 const cleanHead=call(process.execPath,[headAudit,'--repo',repo],repo);
 assert.equal(cleanHead.status,0,'HEAD-only scanner should pass after deletion');
 const history=call(process.execPath,[audit,'--repo',repo],repo);
 assert.equal(history.status,3,'History scan must catch a removed token');
 assert.ok((history.stderr||'').includes('PUBLIC_HISTORY_RISK GITHUB_ACCESS_TOKEN'));
 assert.ok(!(history.stderr||'').includes(fakeToken),'Never echo credential-like content');
 const path='docs/safe.md';
 writeFileSync(join(repo,'.env.production'),'Dummy placeholder, no actual secret\n');
 commit(repo);
 unlinkSync(join(repo,'.env.production'));
 writeFileSync(join(repo,path),'Still public, no secret\n');
 commit(repo);
 const pathScan=call(process.execPath,[audit,'--repo',repo],repo);
 assert.equal(pathScan.status,3,'Deleted sensitive filename must remain a history risk');
 assert.ok(pathScan.stderr.includes('PUBLIC_HISTORY_RISK HISTORIC_SENSITIVE_PATH'));
 assert.ok(!pathScan.stderr.includes(fakeToken));
 const clone=join(repo,'..','sb-shallow-clone-'+Date.now());
 try{
  const copied=call('git',['clone','--quiet','--depth=1',pathToFileURL(repo).href,clone],repo);
  assert.equal(copied.status,0,'Depth-1 fixture clone must be created: '+copied.stderr);
  const isShallow=call('git',['rev-parse','--is-shallow-repository'],clone);
  assert.equal(isShallow.stdout.trim(),'true','Fixture must actually be a shallow Git checkout');
  const scan=call(process.execPath,[audit,'--repo',clone],clone);
  assert.equal(scan.status,2,'Shallow history must fail closed');
  assert.ok(scan.stderr.includes('shallow'),'Report incomplete ancestry without content');
 }finally{
  rmSync(clone,{recursive:true,force:true,maxRetries:5,retryDelay:200});
 }
}finally{
 rmSync(repo,{recursive:true,force:true,maxRetries:5,retryDelay:200});
}
const project=call(process.execPath,[audit],root);
assert.equal(project.status,0,'Project reachable history should pass: '+project.stderr);
assert.ok(project.stdout.includes('PUBLIC_HISTORY_AUDIT_PASS'));
const invalid=call(process.execPath,[audit,'--unknown'],root);
assert.equal(invalid.status,2,'Unknown audit option must fail closed');
console.log('PASS: removed historical token, deleted .env, no-value logging, clean project history');
