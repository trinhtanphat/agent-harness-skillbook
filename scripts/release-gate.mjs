#!/usr/bin/env node
/**
 * Dependency-free, fail-closed QA orchestrator.
 *
 * node scripts/release-gate.mjs --mode node
 * node scripts/release-gate.mjs --mode local
 * node scripts/release-gate.mjs --mode release
 * node scripts/release-gate.mjs --mode release --plan
 *
 * This script never commits, pushes, merges, deploys, or changes a browser's
 * existing profile. Only the release mode checks the live Pages site.
 */
import {spawn} from 'node:child_process';
import {mkdir,writeFile} from 'node:fs/promises';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const site='https://trinhtanphat.github.io/agent-harness-skillbook/';
const expectedRemote='https://github.com/trinhtanphat/agent-harness-skillbook.git';
const help=[
 'Usage: node scripts/release-gate.mjs --mode node|local|release [--plan]',
 '  node:    validate, preview security, installer, MCP, own tests, git fsck',
 '  local:   all node checks and isolated Chrome QA against local preview',
 '  release: all local checks, isolated Chrome QA on public Pages, SHA verifier',
 '  --plan:  print the plan; execute nothing and create no report',
 'Release is read-only and requires a clean workspace matching GitHub origin/main.',
 'Do not substitute local browser PASS for deployed-byte verification.'
].join('\n');
function usageError(message){throw Error(message+'\n'+help);}
function args(argv){
 let mode=null,plan=false;
 for(let i=0;i<argv.length;i++){
  const x=argv[i];
  if(x==='--help'||x==='-h')return {help:true};
  if(x==='--plan'){if(plan)usageError('Repeated --plan');plan=true;continue;}
  if(x==='--mode'){
   const value=argv[++i];if(mode||!value)usageError('Specify exactly one --mode');
   mode=value;continue;
  }
  usageError('Unknown option '+x);
 }
 if(!['node','local','release'].includes(mode))usageError('Mode must be node, local or release');
 return {mode,plan};
}
const node=(p)=>[process.execPath,[join(root,p)]];
const tasks=[
 {id:'catalog-and-evidence',exec:node('scripts/validate.mjs'),timeout:60000},
 {id:'loopback-preview-security',exec:node('scripts/test-preview.mjs'),timeout:70000},
 {id:'offline-skill-installer',exec:node('scripts/test-install-skills.mjs'),timeout:100000},
 {id:'mcp-stdio',exec:node('examples/mcp-stdio-demo/client-smoke.mjs'),timeout:60000},
 {id:'release-gate-contract',exec:node('scripts/test-release-gate.mjs'),timeout:40000},
 {id:'git-fsck',exec:['git',['fsck','--full','--no-reflogs']],timeout:90000}
];
const localTask={id:'isolated-local-browser',exec:node('scripts/test-local.mjs'),timeout:160000};
const liveTask={id:'isolated-public-browser',exec:node('scripts/browser-qa.mjs'),args:[site],timeout:160000};
const ps=process.platform==='win32'?'powershell':'pwsh';
const pagesTask={id:'deployed-blob-sha',exec:[ps,['-NoProfile',...(process.platform==='win32'?['-ExecutionPolicy','Bypass']:[]),'-File',join(root,'scripts/verify-pages.ps1'),'-Full']],timeout:300000};
function planFor(mode){return [...tasks,...(mode==='local'||mode==='release'?[localTask]:[]),...(mode==='release'?[liveTask,pagesTask]:[])];}
function display(t){
 const [command,baseArgs]=t.exec;
 return [command,...baseArgs,...(t.args||[])].join(' ');
}
function invoke(command,argv,{timeout=30000,echo=false,env={}}={}){
 return new Promise((resolvePromise,rejectPromise)=>{
  let done=false,timedOut=false,stdout='',stderr='';
  const child=spawn(command,argv,{cwd:root,env:{...process.env,...env},shell:false,windowsHide:true,stdio:['ignore','pipe','pipe']});
  const cap=65536;
  const collect=(s,chunk,print)=>{
   const value=chunk.toString('utf8');
   if(print)print.write(value);
   return (s+value).slice(-cap);
  };
  child.stdout.on('data',x=>{stdout=collect(stdout,x,echo?process.stdout:null);});
  child.stderr.on('data',x=>{stderr=collect(stderr,x,echo?process.stderr:null);});
  const timer=setTimeout(()=>{timedOut=true;child.kill('SIGKILL');},timeout);
  child.on('error',error=>{if(done)return;done=true;clearTimeout(timer);rejectPromise(error);});
  child.on('close',(code,signal)=>{
   if(done)return;done=true;clearTimeout(timer);
   resolvePromise({code:timedOut?124:(code??1),signal,timedOut,stdout,stderr});
  });
 });
}
async function git(...a){
 const result=await invoke('git',a,{timeout:30000});
 if(result.code!==0)throw Error('git '+a.join(' ')+' failed: '+result.stderr.slice(-500));
 return result.stdout.trim();
}
async function releasePreflight(){
 const url=await git('remote','get-url','origin');
 if(url!==expectedRemote && url!=='git@github.com:trinhtanphat/agent-harness-skillbook.git'){
  throw Error('Release blocked: unexpected origin '+url);
 }
 const status=await git('status','--porcelain');
 if(status)throw Error('Release blocked: worktree has tracked or untracked modifications');
 const local=await git('rev-parse','HEAD');
 const branch=await git('branch','--show-current');
 if(branch && branch!=='main')throw Error('Release blocked: active branch '+branch+' is not main');
 const remote=await invoke('git',['ls-remote','--exit-code','origin','refs/heads/main'],{timeout:30000});
 if(remote.code!==0)throw Error('Release blocked: cannot verify GitHub origin/main SHA');
 const sha=remote.stdout.split(/\s+/)[0];
 if(!/^[a-f0-9]{40}$/.test(sha)||sha!==local)throw Error('Release blocked: GitHub main '+sha+' differs from local HEAD '+local);
 return {origin:url,branch:branch||'detached-at-main',sha:local,remoteSha:sha};
}
let options;
try{options=args(process.argv.slice(2));}catch(e){console.error('RELEASE_GATE_INVALID_ARGUMENT '+e.message);process.exit(2);}
if(options.help){console.log(help);process.exit(0);}
const planned=planFor(options.mode);
if(options.plan){
 console.log('RELEASE_GATE_PLAN '+options.mode+' ('+planned.length+' steps, no commands executed)');
 if(options.mode==='release')console.log('GATE: require clean worktree and SHA match GitHub origin/main before tests');
 for(const t of planned)console.log('  '+t.id+': '+display(t));
 process.exit(0);
}
const report={schema:1,mode:options.mode,startedAt:new Date().toISOString(),status:'INCOMPLETE',checks:[],remote:null,site:options.mode==='release'?site:null};
let failure=null;
try{
 if(options.mode==='release')report.remote=await releasePreflight();
 else report.remote={origin:await git('remote','get-url','origin'),sha:await git('rev-parse','HEAD'),branch:(await git('branch','--show-current'))||'detached'};
 for(const task of planned){
  console.log('RELEASE_GATE_START '+task.id);
  const start=Date.now(),env=task.id==='isolated-public-browser'?{SKILLBOOK_EVIDENCE_DIR:join(root,'qa-evidence','release-gate-live')}:{};
  const result=await invoke(task.exec[0],[...task.exec[1],...(task.args||[])],{timeout:task.timeout,echo:true,env});
  const record={id:task.id,status:result.code===0?'PASS':'FAIL',exitCode:result.code,durationMs:Date.now()-start,timedOut:result.timedOut};
  report.checks.push(record);
  if(result.code!==0)throw Error(task.id+' failed (exit '+result.code+')');
  console.log('RELEASE_GATE_PASS '+task.id);
 }
 report.status='PASS';
}catch(e){failure=e;report.status='FAIL';report.failure=String(e.message||e);console.error('RELEASE_GATE_FAIL '+report.failure);}
finally{
 report.finishedAt=new Date().toISOString();
 try{
  const evidence=join(root,'qa-evidence');
  await mkdir(evidence,{recursive:true});
  const path=join(evidence,'release-gate-'+options.mode+'.json');
  await writeFile(path,JSON.stringify(report,null,2)+'\n');
  console.log('RELEASE_GATE_REPORT '+path);
 }catch(e){failure??=e;report.status='FAIL';console.error('RELEASE_GATE_REPORT_ERROR '+e.message);}
 console.log('RELEASE_GATE_'+report.status+' '+report.checks.filter(t=>t.status==='PASS').length+'/'+planned.length+' steps mode='+options.mode);
 if(failure)process.exitCode=1;
}
