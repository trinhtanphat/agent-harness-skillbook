/**
 * Browser smoke test using isolated, headless Microsoft Edge / Chromium and CDP.
 * No npm dependencies. Does not attach to any existing Edge profile or session.
 * Usage: node scripts/browser-qa.mjs [site URL]
 */
import {spawn} from 'node:child_process';
import {mkdtemp, mkdir, rm, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join, resolve} from 'node:path';
import {existsSync} from 'node:fs';
import {createServer} from 'node:net';
import assert from 'node:assert/strict';

const url = process.argv[2] || 'https://trinhtanphat.github.io/agent-harness-skillbook/';
const appRoot = new URL(url);
assert.ok(['http:','https:'].includes(appRoot.protocol),'HTTP(S) required');
const browserPaths = process.platform==='win32' ? [
 process.env.BROWSER_BIN,
 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
] : [process.env.BROWSER_BIN,'/usr/bin/chromium','/usr/bin/google-chrome','/usr/bin/microsoft-edge'];
const exe=browserPaths.find(p=>p && existsSync(p));
if(!exe){console.error('BROWSER_QA_SKIP: no Chromium/Edge binary found');process.exit(3);}

const choosePort=()=>new Promise((resolvePort,reject)=>{
 const server=createServer();server.on('error',reject);server.listen(0,'127.0.0.1',()=>{
  const p=server.address().port;server.close(()=>resolvePort(p));
 });
});
const timeout=ms=>new Promise(resolveWait=>setTimeout(resolveWait,ms));
const profile=await mkdtemp(join(tmpdir(),'skillbook-headless-'));
const port=await choosePort();
const evidence=resolve(process.env.SKILLBOOK_EVIDENCE_DIR||join(process.cwd(),'qa-evidence'));
await mkdir(evidence,{recursive:true});
const child=spawn(exe,[
 '--headless=new','--disable-extensions','--no-first-run','--no-default-browser-check',
 '--disable-background-networking',
 '--user-data-dir='+profile,'--remote-debugging-port='+port,
 '--window-size=1440,900','about:blank'
],{stdio:'ignore',windowsHide:true});
let ws=null,seq=0,sessionId, pending=new Map(), runtimeExceptions=[];
function send(method,params={},session=sessionId){
 const id=++seq;
 return new Promise((resolveResponse,rejectResponse)=>{
  const timer=setTimeout(()=>{pending.delete(id);rejectResponse(new Error('CDP timeout: '+method));},12000);
  pending.set(id,{resolve:r=>{clearTimeout(timer);resolveResponse(r);}});
  ws.send(JSON.stringify({id,method,params,...(session?{sessionId:session}:{})}));
 });
}
function requestError(res){if(res.error)throw Error(JSON.stringify(res.error));return res.result;}
function quote(s){return JSON.stringify(s);}
async function evalJs(expression){
 const out=requestError(await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true}));
 if(out.exceptionDetails)throw Error('Browser evaluate failed: '+JSON.stringify(out.exceptionDetails));
 return out.result.value;
}
async function ready(){
 for(let n=0;n<70;n++){
  try{const out=await evalJs("document.readyState==='complete' && document.querySelectorAll('.skill-card').length > 0");if(out)return;}catch(e){}
  await timeout(150);
 }
 throw Error('Homepage skill cards did not render');
}
async function capture(name){
 const r=requestError(await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false}));
 await writeFile(join(evidence,name),Buffer.from(r.data,'base64'));
}
let observations=[];
try{
 let debugUrl;
 for(let n=0;n<90;n++){
  try{const r=await fetch('http://127.0.0.1:'+port+'/json/version');if(r.ok){debugUrl=(await r.json()).webSocketDebuggerUrl;break;}}catch(e){}
  await timeout(120);
 }
 assert.ok(debugUrl,'headless browser did not expose CDP');
 ws=new WebSocket(debugUrl);
 await new Promise((done,bad)=>{
  const timer=setTimeout(()=>bad(Error('Browser WebSocket timeout')),8000);
  ws.onopen=()=>{clearTimeout(timer);done();};
  ws.onerror=e=>{clearTimeout(timer);bad(Error('Browser WebSocket error'));};
 });
 ws.onmessage=e=>{
  const m=JSON.parse(e.data);
  if(m.id!==undefined){const p=pending.get(m.id);if(p){pending.delete(m.id);p.resolve(m);}return;}
  if(m.method==='Runtime.exceptionThrown')runtimeExceptions.push(m.params.exceptionDetails?.text||'Uncaught browser exception');
 };
 const target=requestError(await send('Target.createTarget',{url:'about:blank'},null));
 const attached=requestError(await send('Target.attachToTarget',{targetId:target.targetId,flatten:true},null));
 sessionId=attached.sessionId;
 requestError(await send('Page.enable'));requestError(await send('Runtime.enable'));
 requestError(await send('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false}));
 requestError(await send('Page.navigate',{url:appRoot.href}));
 await ready();
 const initial=await evalJs("({cards:document.querySelectorAll('.skill-card').length,categories:document.querySelectorAll('.category-btn').length,title:document.title,overflow:document.documentElement.scrollWidth>innerWidth})");
 assert.equal(initial.cards,60,'Expected 60 skill cards');
 assert.equal(initial.categories,11,'Expected 10 categories plus all');
 assert.equal(initial.overflow,false,'Desktop horizontal overflow');
 observations.push({name:'desktop-catalog',result:'PASS',details:initial});
 await capture('home-desktop-1440.png');
 const theme = await evalJs("(()=>{const a=document.body.classList.contains('light');document.getElementById('themeBtn').click();const b=document.body.classList.contains('light');document.getElementById('themeBtn').click();return {before:a,after:b,restored:document.body.classList.contains('light')===a}})()");
 assert.notEqual(theme.before,theme.after,'Theme toggle');
 assert.equal(theme.restored,true,'Theme restore');
 observations.push({name:'theme-toggle',result:'PASS',details:theme});

 const search=await evalJs("(()=>{const e=document.getElementById('searchInput');e.value='MCP';e.dispatchEvent(new Event('input',{bubbles:true}));return {count:document.querySelectorAll('.skill-card').length,title:document.getElementById('resultCount').textContent}})()");
 assert.ok(search.count>0 && search.count<60,'Search must narrow results');
 observations.push({name:'search-MCP',result:'PASS',details:search});
 const filtered=await evalJs("(()=>{const btn=Array.from(document.querySelectorAll('.category-btn')).find(b=>b.textContent.includes('Research'));document.getElementById('searchInput').value='';document.getElementById('searchInput').dispatchEvent(new Event('input',{bubbles:true}));btn.click();return {count:document.querySelectorAll('.skill-card').length,selected:Array.from(document.querySelectorAll('.category-btn')).find(b=>b.textContent.includes('Research')).getAttribute('aria-pressed')}})()");
 assert.equal(filtered.count,6,'Research category must have six skills');
 assert.equal(filtered.selected,'true');
 observations.push({name:'category-filter',result:'PASS',details:filtered});
 const gitCategory=await evalJs("(()=>{const btn=Array.from(document.querySelectorAll('.category-btn')).find(b=>b.textContent.includes('Git & Release'));btn.click();return {count:document.querySelectorAll('.skill-card').length,selected:Array.from(document.querySelectorAll('.category-btn')).find(b=>b.textContent.includes('Git & Release')).getAttribute('aria-pressed')}})()");
 assert.equal(gitCategory.count,6,'Git category must have six skills');
 assert.equal(gitCategory.selected,'true');
 observations.push({name:'expanded-category-filter',result:'PASS',details:gitCategory});

 const drawer=await evalJs("(()=>{document.querySelector('.skill-card').click();return {open:document.querySelector('#skillDrawer').classList.contains('open'),heading:document.querySelector('#drawerTitle').textContent}})()");
 assert.ok(drawer.open&&drawer.heading,'Drawer opened');
 await capture('skill-detail-desktop.png');
 const closed=await evalJs("(()=>{document.getElementById('closeDrawer').click();return document.querySelector('#skillDrawer').getAttribute('aria-hidden')==='true'})()");
 assert.ok(closed,'Drawer close works');
 observations.push({name:'skill-drawer',result:'PASS',details:drawer});

 requestError(await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true}));
 requestError(await send('Page.reload',{ignoreCache:true}));
 await ready();
 const mobile=await evalJs("({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,cards:document.querySelectorAll('.skill-card').length,brand:!!document.querySelector('.brand')})");
 assert.equal(mobile.cards,60,'Mobile catalog');
 assert.ok(mobile.scrollWidth<=mobile.width+1,'Mobile horizontal overflow: '+JSON.stringify(mobile));
 await capture('home-mobile-390.png');
 observations.push({name:'mobile-390',result:'PASS',details:mobile});

 const guideUrl=new URL('docs/01-app-reconstruction.html',appRoot).href;
 requestError(await send('Page.navigate',{url:guideUrl}));
 for(let n=0;n<60;n++){if(await evalJs("document.readyState==='complete' && !!document.querySelector('.prose h1')"))break;await timeout(150);}
 const docs=await evalJs("({h1:document.querySelector('.prose h1')?.textContent,items:document.querySelectorAll('.docs-aside nav a').length,overflow:document.documentElement.scrollWidth>innerWidth})");
 assert.ok(docs.h1 && docs.items===14 && !docs.overflow,'Document reader check');
 await capture('docs-mobile-390.png');
 observations.push({name:'docs-mobile',result:'PASS',details:docs});
 const guideLinks=await evalJs("(async()=>{const links=[...document.querySelectorAll('.docs-aside nav a')];const statuses=await Promise.all(links.map(a=>fetch(a.href).then(r=>r.status).catch(()=>0)));return {total:links.length,verified:statuses.filter(x=>x===200).length,statuses};})()");
 assert.equal(guideLinks.total,14,'14 guide links');
 assert.equal(guideLinks.verified,14,'All 14 guide URLs load over HTTP');
 observations.push({name:'14-guide-link-smoke',result:'PASS',details:{total:guideLinks.total,verified:guideLinks.verified}});
 assert.equal(runtimeExceptions.length,0,'Browser runtime exceptions: '+runtimeExceptions.join(' / '));
 observations.push({name:'runtime-exceptions',result:'PASS',details:'No JavaScript exceptions'});
 await writeFile(join(evidence,'browser-qa.json'),JSON.stringify({url,observations,at:new Date().toISOString(),isolatedProfile:true},null,2));
 console.log('PASS: '+observations.map(x=>x.name).join(', '));
 console.log('EVIDENCE_DIR='+evidence);
} finally {
 try{if(ws?.readyState===WebSocket.OPEN){await send('Browser.close',{},null).catch(()=>{});ws.close();}}catch(e){}
 if(child.exitCode===null)child.kill();
 await timeout(250);
 try{await rm(profile,{recursive:true,force:true,maxRetries:5,retryDelay:200});}catch(e){console.error('Note: could not clean isolated browser profile:',e.message);}
}
