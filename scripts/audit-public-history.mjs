#!/usr/bin/env node
/**
 * Read-only scanner of all blobs reachable from Git HEAD history, including
 * blobs removed in later commits. No network access or source mutation.
 * Does NOT inspect other branches or unreachable/reflog objects.
 */
import {spawnSync} from 'node:child_process';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {maxBlobBytes,riskForPath,risksForContent} from './audit-public-tree.mjs';

const defaultRepo=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const maxHistoryBytes=64*1024*1024;
function git(repo,args,input){
 const r=spawnSync('git',args,{
  cwd:repo,encoding:null,input,
  windowsHide:true,maxBuffer:maxHistoryBytes+8*1024*1024,timeout:60000
 });
 if(r.error||r.status!==0)throw Error('Unable to scan Git history ('+args[0]+'); audit blocked');
 return r.stdout;
}
function parsePaths(repo){
 const raw=git(repo,['log','-z','--format=','--name-only','HEAD']).toString('utf8');
 return [...new Set(raw.split('\0').filter(Boolean))];
}
function scanHistory(repo){
 const hashes=git(repo,['rev-list','--objects','--no-object-names','HEAD'])
  .toString('ascii').split(/\r?\n/).filter(Boolean);
 if(!hashes.length||hashes.some(s=>!/^([0-9a-f]{40}|[0-9a-f]{64})$/.test(s))){
  throw Error('Invalid Git history object listing');
 }
 const uniqueHashes=[...new Set(hashes)];
 const info=git(repo,['cat-file','--batch-check=%(objectname) %(objecttype) %(objectsize)'],
  Buffer.from(uniqueHashes.join('\n')+'\n','ascii')).toString('ascii')
  .trimEnd().split(/\r?\n/);
 if(info.length!==uniqueHashes.length)throw Error('Incomplete history object metadata');
 const findings=[],blobs=[];let totalBytes=0;
 for(let i=0;i<info.length;i++){
  const parts=info[i].split(' ');
  if(parts.length!==3||parts[0]!==uniqueHashes[i])throw Error('Unexpected Git object metadata');
  const [sha,type,sizeString]=parts;
  if(!['blob','commit','tree','tag'].includes(type))throw Error('Unknown Git object type');
  if(type!=='blob')continue;
  const size=Number(sizeString);
  if(!Number.isSafeInteger(size)||size<0||size>maxBlobBytes){
   findings.push({kind:'OVERSIZED_OR_UNKNOWN_BLOB',object:sha.slice(0,12)});
   continue;
  }
  totalBytes+=size;
  if(totalBytes>maxHistoryBytes)throw Error('History exceeds bounded 64 MiB audit budget');
  blobs.push({sha,size});
 }
 // A past .env or credential filename remains a risk even when its content
 // was removed from HEAD or replaced with a harmless placeholder.
 for(const path of parsePaths(repo)){
  if(riskForPath(path))findings.push({kind:'HISTORIC_SENSITIVE_PATH',path});
 }
 // One cat-file process for all blobs (faster and avoids hundreds of Git
 // processes on Windows); parse binary framing, never print object contents.
 if(blobs.length){
  const raw=git(repo,['cat-file','--batch'],
   Buffer.from(blobs.map(b=>b.sha).join('\n')+'\n','ascii'));
  let offset=0;
  for(const blob of blobs){
   const end=raw.indexOf(10,offset);
   if(end<0)throw Error('Incomplete Git batch header');
   const header=raw.subarray(offset,end).toString('ascii');
   if(header!==blob.sha+' blob '+blob.size)throw Error('Git batch object mismatch');
   const start=end+1,finish=start+blob.size;
   if(finish>=raw.length||raw[finish]!==10)throw Error('Incomplete Git batch blob data');
   const body=raw.subarray(start,finish);
   for(const kind of risksForContent(body))findings.push({kind,object:blob.sha.slice(0,12)});
   offset=finish+1;
  }
  if(offset!==raw.length)throw Error('Unexpected trailing Git batch data');
 }
 const commitCount=git(repo,['rev-list','--count','HEAD']).toString('ascii').trim();
 if(!/^\d+$/.test(commitCount))throw Error('Invalid commit count');
 return {objects:uniqueHashes.length,blobs:blobs.length,commits:Number(commitCount),findings};
}
function options(argv){
 if(argv.length===0)return defaultRepo;
 if(argv.length===2&&argv[0]==='--repo'&&argv[1])return resolve(argv[1]);
 throw Error('Usage: node scripts/audit-public-history.mjs [--repo PATH]');
}
try{
 const report=scanHistory(options(process.argv.slice(2)));
 if(report.findings.length){
  console.error('PUBLIC_HISTORY_AUDIT_FAIL '+report.findings.length+' findings in '+report.blobs+' checked blobs / '+report.commits+' commits');
  for(const f of report.findings.slice(0,20)){
   // No value or raw blob content in logs.
   console.error('PUBLIC_HISTORY_RISK '+f.kind+' '+JSON.stringify(f.path||f.object));
  }
  process.exitCode=3;
 }else{
  console.log('PUBLIC_HISTORY_AUDIT_PASS '+report.blobs+'/'+report.blobs+' blobs across '+report.commits+' commits ('+report.objects+' objects)');
 }
}catch(error){
 console.error('PUBLIC_HISTORY_AUDIT_ERROR '+String(error.message||error));
 process.exitCode=2;
}
