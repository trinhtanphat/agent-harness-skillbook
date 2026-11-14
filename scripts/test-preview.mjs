/**
 * Node-only smoke tests for local preview. Does not require a browser.
 * Usage: node scripts/test-preview.mjs
 */
import assert from 'node:assert/strict';
import {startPreview} from './local-preview.mjs';

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
 await check('/not-a-real-page',404);
 await check('/',405,'POST');
 const head=await check('/',200,'HEAD','text/html');
 assert.equal((await head.text()).length,0,'HEAD must have no response body');
 console.log('PASS: 12 static preview cases / only loopback / internal files protected');
}finally {
 await new Promise(resolve=>server.close(resolve));
}
