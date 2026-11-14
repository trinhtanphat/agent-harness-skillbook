import {spawn} from 'node:child_process';
import {createInterface} from 'node:readline';
import {fileURLToPath} from 'node:url';
import {dirname,join} from 'node:path';
import assert from 'node:assert/strict';

const dir=dirname(fileURLToPath(import.meta.url));
const child=spawn(process.execPath,[join(dir,'server.mjs')],{stdio:['pipe','pipe','pipe']});
const lines=createInterface({input:child.stdout,crlfDelay:Infinity});
const pending=new Map();
let nextId=0;
lines.on('line',line=>{
 const message=JSON.parse(line);
 if(pending.has(message.id)){const resolve=pending.get(message.id);pending.delete(message.id);resolve(message);}
});
const metadata=(version='2026-07-28')=>({
 'io.modelcontextprotocol/protocolVersion':version,
 'io.modelcontextprotocol/clientCapabilities':{},
 'io.modelcontextprotocol/clientInfo':{name:'skillbook-modern-smoke',version:'1.0.0'}
});
function send(method,params={},version='2026-07-28'){
 const id=++nextId;
 return new Promise((resolve,reject)=>{
  const timer=setTimeout(()=>{pending.delete(id);reject(new Error('Timeout: '+method));},4500);
  pending.set(id,response=>{clearTimeout(timer);resolve(response);});
  child.stdin.write(JSON.stringify({jsonrpc:'2.0',id,method,params:{...params,_meta:metadata(version)}})+'\n');
 });
}
try{
 const discovered=await send('server/discover');
 assert.equal(discovered.result.resultType,'complete');
 assert.deepEqual(discovered.result.supportedVersions,['2026-07-28']);
 assert.equal(discovered.result._meta['io.modelcontextprotocol/serverInfo'].name,'skillbook-stdio-modern-example');
 const listed=await send('tools/list');
 assert.equal(listed.result.tools.length,2);
 assert.equal(listed.result.resultType,'complete');
 const add=await send('tools/call',{name:'add_numbers',arguments:{a:2,b:40}});
 assert.equal(add.result.content[0].text,'42');
 assert.equal(add.result.isError,false);
 const bad=await send('tools/call',{name:'add_numbers',arguments:{a:'2',b:3}});
 assert.equal(bad.result.resultType,'complete');
 assert.equal(bad.result.isError,true);
 const unknown=await send('tools/call',{name:'does_not_exist',arguments:{}});
 assert.equal(unknown.error.code,-32602);
 const check=await send('tools/call',{name:'build_scope_checklist',arguments:{goal:'Demo app'}});
 assert.ok(check.result.content[0].text.includes('authorization'));
 const mismatch=await send('tools/list',{},'1900-01-01');
 assert.equal(mismatch.error.code,-32022);
 assert.deepEqual(mismatch.error.data.supported,['2026-07-28']);
 const badMeta=++nextId;
 child.stdin.write(JSON.stringify({jsonrpc:'2.0',id:badMeta,method:'tools/list',params:{}})+'\n');
 const invalid=await new Promise((resolve,reject)=>{
  const timer=setTimeout(()=>{pending.delete(badMeta);reject(new Error('Timeout bad meta'));},4500);
  pending.set(badMeta,m=>{clearTimeout(timer);resolve(m);});
 });
 assert.equal(invalid.error.code,-32602);
 console.log('PASS: MCP 2026-07-28 discovery, per-request metadata, list, call, tool error, unknown tool, version mismatch, missing meta');
} finally {
 child.kill();
}
