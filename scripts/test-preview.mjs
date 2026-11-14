/**
 * Node-only smoke tests for local preview. Does not require a browser.
 * Usage: node scripts/test-preview.mjs
 */
import assert from 'node:assert/strict';
import {startPreview} from './local-preview.mjs';
import {symlink,writeFile,rm} from 'node:fs/promises';
import {join,resolve,dirname} from 'node:path';
import {tmpdir} from 'node:os';
import {randomUUID} from 'node:crypto';
import {fileURLToPath} from 'node:url';

const {server,url}=await startPreview(0);
async function check(path,status,method='GET',contentType){
 const response=await fetch(new URL(path,url),{method,redirect:'manual'});
 assert.equal(response.status,status,path+' should return '+status);
 if(contentType)assert.ok(response.headers.get('content-type')?.startsWith(contentType),'content-type '+path);
 return response;
}
try {
 const home=await check('/',200,'GET','text/html');
 const page=await home.text();
 assert.ok(page.includes('Agent Harness Skillbook'),'home contents');
 await check('/data/catalog.js',200,'GET','text/javascript');
 await check('/docs/14-data-automation.html',200,'GET','text/html');
 await check('/.agents/skills/complete-repository-mirror/SKILL.md',200,'GET','text/markdown');
 await check('/assets/styles.css',200,'GET','text/css');
 await check('/.git/config',403);
 await check('/node_modules/package.json',403);
 await check('/qa-evidence-local/file.png',403);
 await check('/.env',403);
 await check('/.env.production',403);
 await check('/.ENV',403);
 await check('/.ENV.production',403);
 await check('/.npmrc',403);
 await check('/.ssh/id_rsa',403);
 await check('/not-a-real-page',404);
 await check('/',405,'POST');
 const head=await check('/',200,'HEAD','text/html');
 assert.equal((await head.text()).length,0,'HEAD must have no response body');
 // If OS permissions allow symlinks, verify the realpath escape is blocked.
 const projectRoot=resolve(dirname(fileURLToPath(import.meta.url)),'..');
 const token=randomUUID();
 const secret=join(tmpdir(),'skillbook-outside-'+token+'.txt');
 const link=join(projectRoot,'preview-symlink-'+token+'.txt');
 let externalLinkCreated=false;
 try{
  await writeFile(secret,'PRIVATE DATA MUST NEVER BE SERVED',{flag:'wx'});
  try{
   await symlink(secret,link,'file');
   externalLinkCreated=true;
  }catch(error){
   if(!['EPERM','EACCES','ENOTSUP','EOPNOTSUPP'].includes(error.code))throw error;
   console.log('SKIP: OS disallows test symlink creation, canonical containment statically checked');
  }
  if(externalLinkCreated) {
   await check('/preview-symlink-'+token+'.txt',403);
   console.log('PASS: symlink escape blocked by canonical containment');
  }
 }finally{
  if(externalLinkCreated)await rm(link,{force:true});
  await rm(secret,{force:true});
 }
 // A symlink that stays inside root can still expose a denied dotfile.
 // This was not covered by the earlier outside-root-only symlink test.
 const probeName='.env.skillbook-probe-'+token;
 const aliasName='preview-public-alias-'+token+'.txt';
 const probe=join(projectRoot,probeName);
 const alias=join(projectRoot,aliasName);
 let aliasCreated=false;
 try {
  await writeFile(probe,'TEST DUMMY VALUE; NOT A REAL SECRET',{flag:'wx'});
  try { await symlink(probe,alias,'file'); aliasCreated=true; }
  catch(error){
   if(!['EPERM','EACCES','ENOTSUP','EOPNOTSUPP'].includes(error.code))throw error;
   console.log('SKIP: OS does not permit in-root symlink test');
  }
  await check('/'+probeName,403);
  if(aliasCreated){
   await check('/'+aliasName,403);
   console.log('PASS: in-root symlink alias to forbidden .env.* is denied');
  }
 } finally {
  if(aliasCreated)await rm(alias,{force:true});
  await rm(probe,{force:true});
 }
 console.log('PASS: 17 static preview cases / only loopback / sensitive paths protected');
}finally {
 await new Promise(resolve=>server.close(resolve));
}
