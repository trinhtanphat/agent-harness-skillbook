import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const scanner=join(root,'scripts/audit-public-tree.mjs');
function tool(cmd,args,repo){
 const p=spawnSync(cmd,args,{cwd:repo,encoding:'utf8',timeout:45000,maxBuffer:2*1024*1024});
 assert.equal(p.error,undefined,'Process must start');
 return p;
}
function fixture(path,contents,expectedRisk){
 const repo=mkdtempSync(join(tmpdir(),'skillbook-public-audit-'));
 try{
  assert.equal(tool('git',['init','-q'],repo).status,0);
  const full=join(repo,...path.split('/'));
  mkdirSync(dirname(full),{recursive:true});
  writeFileSync(full,contents,'utf8');
  assert.equal(tool('git',['add','-f','--all'],repo).status,0);
  assert.equal(tool('git',['-c','user.name=QA','-c','user.email=qa@example.invalid','commit','-qm','Synthetic fixture'],repo).status,0);
  const result=tool(process.execPath,[scanner,'--repo',repo],repo);
  const combined=result.stdout+result.stderr;
  if(expectedRisk){
   assert.equal(result.status,3,'Unsafe Git HEAD must be rejected: '+expectedRisk);
   assert.ok(combined.includes('PUBLIC_TREE_RISK '+expectedRisk),'Missing risk classification');
   assert.ok(!combined.includes(contents),'Never print secret material');
  }else{
   assert.equal(result.status,0,'Safe Git HEAD should pass: '+combined);
   assert.ok(combined.includes('PUBLIC_TREE_AUDIT_PASS'));
  }
 }finally{rmSync(repo,{recursive:true,force:true});}
}
fixture('docs/harmless.md','Review the publicly documented example without secrets.',null);
fixture('.env.production','SAFE TEST PLACEHOLDER ONLY','SENSITIVE_PATH');
fixture('.SSH/id_rsa','FAKE TEST CONTENT','SENSITIVE_PATH');
fixture('assets/private.pem','FAKE TEST CONTENT','SENSITIVE_PATH');
fixture('docs/pat.md','Demonstration: '+'ghp_'+'Z'.repeat(40),'GITHUB_ACCESS_TOKEN');
fixture('docs/aws.md','Demonstration: '+'AKIA'+'Z'.repeat(16),'AWS_ACCESS_KEY');
fixture('docs/pem.md','Proof: '+'-----BEGIN '+'PRIVATE KEY-----'+'\nnot-a-real-key','PRIVATE_KEY_BLOCK');
fixture('docs/openai.md','Demo: '+'sk-proj-'+'Z'.repeat(50),'OPENAI_API_TOKEN');
const actual=tool(process.execPath,[scanner],root);
assert.equal(actual.status,0,'Current repository HEAD must pass scan: '+actual.stderr);
assert.ok(actual.stdout.includes('PUBLIC_TREE_AUDIT_PASS'));
const invalid=tool(process.execPath,[scanner,'--not-a-real-option'],root);
assert.equal(invalid.status,2,'Invalid invocation must fail closed');
console.log('PASS: Git HEAD publication guard, synthetic path/credential negatives, no secret echoes, current repository scan');

const scannerSource=await import('./audit-public-tree.mjs');
assert.equal(typeof scannerSource.riskForPath,'function','Reusable path guard export');
assert.equal(typeof scannerSource.risksForContent,'function','Reusable content guard export');
assert.deepEqual(scannerSource.risksForContent(Buffer.from('-----BEGIN PGP '+'PRIVATE KEY BLOCK-----\n')),['PGP_PRIVATE_BLOCK'],'Real PGP block header at start of line');
assert.ok(!scannerSource.risksForContent(Buffer.from("const regex=/-----BEGIN PGP PRIVATE KEY BLOCK-----/;")).includes('PGP_PRIVATE_BLOCK'),'Do not flag a regex literal as PGP key');
console.log('PASS: shared pattern helpers, line-anchored PGP detection and no import side effects');
