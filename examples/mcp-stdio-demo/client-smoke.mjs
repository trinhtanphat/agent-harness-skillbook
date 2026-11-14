import {spawn} from 'node:child_process';
import {createInterface} from 'node:readline';
import {fileURLToPath} from 'node:url';
import {dirname,join} from 'node:path';
import assert from 'node:assert/strict';

const current=dirname(fileURLToPath(import.meta.url));
const child=spawn(process.execPath,[join(current,'server.mjs')],{stdio:['pipe','pipe','pipe']});
const output=createInterface({input:child.stdout,crlfDelay:Infinity});
let pending=new Map(),id=1;
output.on('line',line=>{const message=JSON.parse(line);const p=pending.get(message.id);if(p){pending.delete(message.id);p.resolve(message);}});
function ask(method,params={}){
 const key=id++;
 return new Promise((resolve,reject)=>{
  const timeout=setTimeout(()=>{pending.delete(key);reject(new Error('Timed out: '+method));},4000);
  pending.set(key,{resolve:m=>{clearTimeout(timeout);resolve(m);}});
  child.stdin.write(JSON.stringify({jsonrpc:'2.0',id:key,method,params})+'\n');
 });
}
try{
 const init=await ask('initialize',{protocolVersion:'2025-11-25',capabilities:{},clientInfo:{name:'skillbook-smoke',version:'1'}});
 assert.equal(init.result.protocolVersion,'2025-11-25');
 child.stdin.write(JSON.stringify({jsonrpc:'2.0',method:'notifications/initialized'})+'\n');
 const listed=await ask('tools/list');
 assert.equal(listed.result.tools.length,2);
 const added=await ask('tools/call',{name:'add_numbers',arguments:{a:2,b:40}});
 assert.equal(added.result.content[0].text,'42');
 const denied=await ask('tools/call',{name:'add_numbers',arguments:{a:'2',b:3}});
 assert.equal(denied.error.code,-32602);
 const checklist=await ask('tools/call',{name:'build_scope_checklist',arguments:{goal:'Demo project'}});
 assert.ok(checklist.result.content[0].text.includes('authorization'));
 console.log('PASS: MCP initialize, tools/list, tools/call, invalid input, scoped checklist');
} finally {
 child.kill();
}
