// Teaching-only stdio MCP server: 2026-07-28 protocol, no network, files, or credentials.
// Use the official MCP SDK for production integrations. Only JSON-RPC on stdout.
import {createInterface} from 'node:readline';

const PROTOCOL='2026-07-28';
const INFO={name:'skillbook-stdio-modern-example',version:'2.0.0'};
const META='io.modelcontextprotocol/';
const tools=[
 {name:'add_numbers',description:'Add two finite numbers with a bounded range.',inputSchema:{type:'object',additionalProperties:false,required:['a','b'],properties:{a:{type:'number',minimum:-1000000,maximum:1000000},b:{type:'number',minimum:-1000000,maximum:1000000}}}},
 {name:'build_scope_checklist',description:'Return a safe review checklist for an authorized goal; does not execute the task.',inputSchema:{type:'object',additionalProperties:false,required:['goal'],properties:{goal:{type:'string',minLength:3,maxLength:160}}}}
];
const send=message=>process.stdout.write(JSON.stringify(message)+'\n');
const failure=(id,code,message,data)=>send({jsonrpc:'2.0',id,error:{code,message,...(data?{data}:{})}});
const success=(id,result)=>send({jsonrpc:'2.0',id,result:{resultType:'complete',...result,_meta:{[META+'serverInfo']:INFO}}});
const toolResult=(id,text,isError=false)=>success(id,{content:[{type:'text',text}],isError});
const own=(obj,key)=>Object.prototype.hasOwnProperty.call(obj,key);
const obj=x=>x!==null && typeof x==='object' && !Array.isArray(x);
function handle(req){
 if(!obj(req)||req.jsonrpc!=='2.0'||typeof req.method!=='string'){
   failure(null,-32600,'Invalid JSON-RPC request');return;
 }
 if(!own(req,'id'))return; // notifications never receive a response
 const {id,method,params}=req;
 if(!(typeof id==='string'||(Number.isSafeInteger(id)))){failure(null,-32600,'Invalid request ID');return;}
 if(!obj(params)){failure(id,-32602,'params with _meta are required');return;}
 const meta=params._meta;
 if(!obj(meta)||!obj(meta[META+'clientCapabilities'])){
   failure(id,-32602,'Missing required MCP per-request metadata');return;
 }
 const requested=meta[META+'protocolVersion'];
 if(requested!==PROTOCOL){
   failure(id,-32022,'Unsupported protocol version',{supported:[PROTOCOL],requested:requested??null});return;
 }
 if(method==='server/discover'){
   success(id,{supportedVersions:[PROTOCOL],capabilities:{tools:{listChanged:false}},
     instructions:'Educational, read-only sample. No external effects. Do not transmit private data.',
     ttlMs:0,cacheScope:'private'});return;
 }
 if(method==='tools/list'){
   success(id,{tools});return;
 }
 if(method==='tools/call'){
   const name=params.name,args=params.arguments;
   if(typeof name!=='string'||!obj(args)){failure(id,-32602,'Invalid tools/call request shape');return;}
   if(name==='add_numbers'){
     const {a,b}=args;
     if(typeof a!=='number'||typeof b!=='number'||!Number.isFinite(a)||!Number.isFinite(b)||
       Math.abs(a)>1000000||Math.abs(b)>1000000||Object.keys(args).some(k=>k!=='a'&&k!=='b')){
       toolResult(id,'Validation failed: provide finite numeric a and b within ±1,000,000.',true);return;
     }
     toolResult(id,String(a+b));return;
   }
   if(name==='build_scope_checklist'){
     const {goal}=args;
     if(typeof goal!=='string'||goal.length<3||goal.length>160||Object.keys(args).some(k=>k!=='goal')){
       toolResult(id,'Validation failed: goal must be a string of 3–160 characters.',true);return;
     }
     toolResult(id,['Goal: '+goal,
       '[ ] Verify ownership, authorization and exact scope',
       '[ ] Define acceptance criteria and evidence',
       '[ ] Gather read-only information first',
       '[ ] Make reversible changes only after permission checks',
       '[ ] Validate independently and report remaining gaps'].join('\n'));
     return;
   }
   failure(id,-32602,'Unknown tool: '+name);return;
 }
 failure(id,-32601,'Method not found');
}
const rl=createInterface({input:process.stdin,crlfDelay:Infinity});
rl.on('line',line=>{
 if(Buffer.byteLength(line,'utf8')>16384){failure(null,-32600,'Payload too large');return;}
 let request;
 try{request=JSON.parse(line);}catch(e){failure(null,-32700,'Parse error');return;}
 handle(request);
});
