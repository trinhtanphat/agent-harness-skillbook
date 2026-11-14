// Educational MCP stdio server: no filesystem, network or credential access.
// For production, prefer the officially maintained MCP SDK and its current spec.
import {createInterface} from 'node:readline';
const supported=new Set(['2025-11-25','2025-06-18']);
const tools=[{
 name:'add_numbers',
 description:'Add two finite numbers, a deterministic teaching example.',
 inputSchema:{type:'object',additionalProperties:false,required:['a','b'],properties:{a:{type:'number',minimum:-1000000,maximum:1000000},b:{type:'number',minimum:-1000000,maximum:1000000}}}
},{
 name:'build_scope_checklist',
 description:'Create a short checklist for an authorized work request; does not access files or network.',
 inputSchema:{type:'object',additionalProperties:false,required:['goal'],properties:{goal:{type:'string',minLength:3,maxLength:160}}}
}];
const send=(message)=>process.stdout.write(JSON.stringify(message)+'\n');
const fail=(id,code,message)=>send({jsonrpc:'2.0',id,error:{code,message}});
const validId=id=>typeof id==='string'||(typeof id==='number'&&Number.isFinite(id));
function handle(request){
 if(!request||typeof request!=='object'||request.jsonrpc!=='2.0'||typeof request.method!=='string'){fail(null,-32600,'Invalid Request');return;}
 const {id,method,params={}}=request;
 const notification=!Object.prototype.hasOwnProperty.call(request,'id');
 if(notification)return;
 if(!validId(id)){fail(null,-32600,'Invalid request id');return;}
 if(method==='initialize'){
   const candidate=params&&params.protocolVersion;
   const protocolVersion=supported.has(candidate)?candidate:'2025-11-25';
   send({jsonrpc:'2.0',id,result:{protocolVersion,capabilities:{tools:{listChanged:false}},serverInfo:{name:'agent-skillbook-stdio-example',version:'1.0.0'},instructions:'Demo only: read-only/no network. Never send secrets.'}});
   return;
 }
 if(method==='ping'){send({jsonrpc:'2.0',id,result:{}});return;}
 if(method==='tools/list'){send({jsonrpc:'2.0',id,result:{tools}});return;}
 if(method==='tools/call'){
   const name=params&&params.name;const args=params&&params.arguments;
   if(!args||typeof args!=='object'||Array.isArray(args)){fail(id,-32602,'Invalid arguments');return;}
   if(name==='add_numbers'){
     const {a,b}=args;
     if(typeof a!=='number'||typeof b!=='number'||!Number.isFinite(a)||!Number.isFinite(b)||Math.abs(a)>1000000||Math.abs(b)>1000000||Object.keys(args).some(k=>k!=='a'&&k!=='b')){fail(id,-32602,'a and b must be finite numbers within range');return;}
     send({jsonrpc:'2.0',id,result:{content:[{type:'text',text:String(a+b)}]}});
     return;
   }
   if(name==='build_scope_checklist'){
     const goal=args.goal;
     if(typeof goal!=='string'||goal.length<3||goal.length>160||Object.keys(args).some(k=>k!=='goal')){fail(id,-32602,'goal must be a short string');return;}
     const text=['Goal: '+goal,'[ ] Verify authorization and scope','[ ] Define acceptance criteria','[ ] Gather read-only evidence','[ ] Apply reversible changes only','[ ] Independently verify and report outstanding gaps'].join('\n');
     send({jsonrpc:'2.0',id,result:{content:[{type:'text',text}]}});
     return;
   }
   fail(id,-32602,'Unknown tool');return;
 }
 fail(id,-32601,'Method not found');
}
const rl=createInterface({input:process.stdin,crlfDelay:Infinity});
rl.on('line',line=>{
 if(line.length>16384){fail(null,-32600,'Message too large');return;}
 try{handle(JSON.parse(line));}catch(e){fail(null,-32700,'Parse error');}
});
