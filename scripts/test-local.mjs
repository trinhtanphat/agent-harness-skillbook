/**
 * Starts an isolated loopback server, exercises basic route/security checks,
 * runs the same browser smoke test against local branch assets, then stops.
 * Usage: node scripts/test-local.mjs
 */
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {join,dirname} from 'node:path';
import assert from 'node:assert/strict';
import {startPreview} from './local-preview.mjs';
const {server,url}=await startPreview(0);
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const childArgs=[join(root,'scripts/browser-qa.mjs'),url];
try {
 const home=await fetch(url);
 assert.equal(home.status,200);assert.ok((await home.text()).includes('Agent Harness Skillbook'));
 const asset=await fetch(new URL('data/catalog.js',url));
 assert.equal(asset.status,200);
 const secret=await fetch(new URL('.git/config',url));
 assert.equal(secret.status,403,'Do not expose .git files');
 const notFound=await fetch(new URL('this-does-not-exist',url));
 assert.equal(notFound.status,404);
 console.log('PASS: local preview, catalog, secret-file denial and unknown route');
 const exit=await new Promise((ok,bad)=>{
   const p=spawn(process.execPath,childArgs,{stdio:'inherit',env:{...process.env,SKILLBOOK_EVIDENCE_DIR:join(root,'qa-evidence-local')}});
   p.on('error',bad);p.on('exit',(code,signal)=>ok(code??(signal?1:0)));
 });
 if(exit!==0)process.exitCode=exit;
 else console.log('LOCAL_PREVIEW_QA_PASS');
}finally {
 await new Promise(ok=>server.close(ok));
}
