import assert from 'node:assert/strict';
import {mkdtemp,mkdir,readFile,readdir,rm,stat} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
const base=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const installer=join(base,'scripts','install-skills.mjs');
const tmp=await mkdtemp(join(tmpdir(),'skillbook-installer-'));
const name='complete-repository-mirror';
function run(...args){
 const r=spawnSync(process.execPath,[installer,...args],{encoding:'utf8',timeout:30000});
 return {code:r.status,out:r.stdout,err:r.stderr};
}
async function exists(path){try{await stat(path);return true;}catch{return false;}}
try{
 assert.equal(run('--list').code,0);
 assert.ok(run('--list').out.includes('Available skills (60):'));
 assert.notEqual(run('--skill','../bad','--target',tmp,'--write').code,0);
 assert.notEqual(run('--skill',name,'--write').code,0);
 assert.notEqual(run('--skill',name,'--target',tmp,'--format','bad','--write').code,0);
 assert.notEqual(run('--all','--skill',name,'--target',tmp,'--write').code,0);
 const dry=run('--skill',name,'--target',tmp);
 assert.equal(dry.code,0,dry.err);assert.ok(dry.out.includes('DRY RUN'));
 assert.equal(await exists(join(tmp,'.agents')),false);
 const first=run('--skill',name,'--target',tmp,'--write');
 assert.equal(first.code,0,first.err);
 assert.ok(first.out.includes('INSTALL_PASS 1'));
 const source=await readFile(join(base,'.agents','skills',name,'SKILL.md'));
 const target=join(tmp,'.agents','skills',name,'SKILL.md');
 assert.deepEqual(await readFile(target),source);
 assert.notEqual(run('--skill',name,'--target',tmp,'--write').code,0,'never overwrite');
 assert.deepEqual(await readFile(target),source);
 for(const kind of ['claude','github']){
  const r=run('--skill',name,'--target',tmp,'--format',kind,'--write');
  assert.equal(r.code,0,r.err);
  assert.deepEqual(await readFile(join(tmp,'.'+kind,'skills',name,'SKILL.md')),source);
 }
 const dest=join(tmp,'new-project');await mkdir(dest);
 const all=run('--all','--target',dest,'--write');
 assert.equal(all.code,0,all.err);
 assert.ok(all.out.includes('INSTALL_PASS 60'));
 const dirs=await readdir(join(dest,'.agents','skills'),{withFileTypes:true});
 assert.equal(dirs.filter(x=>x.isDirectory()).length,60);
 assert.deepEqual(await readFile(join(dest,'.agents','skills',name,'SKILL.md')),source);
 console.log('PASS: 60-skill installer; list, dry-run, scope, 3 layouts, no overwrite, traversal denial and SHA bytes');
}finally{
 await rm(tmp,{force:true,recursive:true,maxRetries:4,retryDelay:100});
}
