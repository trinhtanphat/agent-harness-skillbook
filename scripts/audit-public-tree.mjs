#!/usr/bin/env node
/**
 * Audit the exact Git HEAD tree before publishing it as a public website.
 * Read-only; reports categories and file paths, never secret values.
 * For test fixtures only: --repo <existing local git repository>.
 * No remote access and no dependencies.
 */
import {spawnSync} from 'node:child_process';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const defaultRepo=resolve(dirname(fileURLToPath(import.meta.url)),'..');
export const maxBlobBytes=20*1024*1024;
const forbiddenSegments=new Set([
 '.git','.ssh','.aws','.gnupg','.kube','.azure','.terraform','.env',
 '.npmrc','.pypirc','.netrc','.git-credentials','id_rsa','id_dsa','id_ecdsa','id_ed25519',
 'credentials.json','service-account.json','service_account.json','secrets.json'
]);
const forbiddenEndings=/\.(?:pem|p12|pfx|jks|keystore|kdbx|ovpn|tfstate|tfvars|sqlite|sqlite3)$/i;
const signatureRules=[
 ['PRIVATE_KEY_BLOCK',/-----BEGIN (?:RSA |EC |OPENSSH |DSA |ENCRYPTED )?PRIVATE KEY-----/],
 ['PGP_PRIVATE_BLOCK',new RegExp('^-----BEGIN PGP '+'PRIVATE KEY BLOCK-----\\s*$','m')],
 ['AWS_ACCESS_KEY',/\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/],
 ['GITHUB_ACCESS_TOKEN',/\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{36,}\b/],
 ['GITHUB_FINE_GRAINED_TOKEN',/\bgithub_pat_[A-Za-z0-9_]{65,}\b/],
 ['OPENAI_API_TOKEN',/\bsk-(?:proj-)?[A-Za-z0-9_-]{48,}\b/],
 ['SLACK_ACCESS_TOKEN',/\bxox[baprs]-\d{8,}-\d{8,}-[A-Za-z0-9]{20,}\b/]
];
export function riskForPath(path){
 const segments=path.replace(/\\/g,'/').split('/').filter(Boolean);
 for(const segment of segments){
  const s=segment.toLowerCase();
  if(forbiddenSegments.has(s)||s.startsWith('.env.')||forbiddenEndings.test(s))return 'SENSITIVE_PATH';
 }
 return null;
}
export function risksForContent(buf){
 const text=buf.toString('utf8');
 return signatureRules.filter(([,pattern])=>pattern.test(text)).map(([kind])=>kind);
}
function git(repo,args){
 const r=spawnSync('git',args,{cwd:repo,encoding:null,windowsHide:true,maxBuffer:30*1024*1024,timeout:30000});
 if(r.error||r.status!==0)throw Error('Could not inspect Git HEAD safely ('+args[0]+')');
 return r.stdout;
}
function audit(repo){
 const tree=git(repo,['ls-tree','-r','-l','-z','HEAD']);
 const rows=tree.toString('utf8').split('\0').filter(Boolean);
 if(!rows.length)throw Error('Git HEAD is empty');
 const findings=[];let inspected=0;
 for(const row of rows){
  const sep=row.indexOf('\t');
  if(sep<0)throw Error('Invalid Git tree record');
  const [mode,type,sha,sizeText]=row.slice(0,sep).trim().split(/\s+/);
  const path=row.slice(sep+1);
  if(!path||!/^([a-f0-9]{40}|[a-f0-9]{64})$/.test(sha))throw Error('Malformed Git HEAD entry');
  if(type!=='blob'||mode==='160000'){findings.push({path,reason:'NON_BLOB_ENTRY'});continue;}
  const size=Number(sizeText);
  if(!Number.isSafeInteger(size)||size<0||size>maxBlobBytes){
   findings.push({path,reason:'OVERSIZED_OR_UNKNOWN_BLOB'});
   continue;
  }
  const reason=riskForPath(path);
  if(reason){findings.push({path,reason});continue;}
  const content=git(repo,['cat-file','blob',sha]);
  if(content.length!==size)throw Error('Unexpected Git object size');
  for(const risk of risksForContent(content))findings.push({path,reason:risk});
  inspected++;
 }
 return {tracked:rows.length,inspected,findings};
}
function args(argv){
 if(argv.length===0)return defaultRepo;
 if(argv.length===2&&argv[0]==='--repo'&&argv[1])return resolve(argv[1]);
 throw Error('Usage: node scripts/audit-public-tree.mjs [--repo PATH]');
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
try{
 const repo=args(process.argv.slice(2));
 const summary=audit(repo);
 if(summary.findings.length){
  console.error('PUBLIC_TREE_AUDIT_FAIL '+summary.findings.length+' findings among '+summary.tracked+' HEAD entries');
  for(const item of summary.findings.slice(0,20)){
   // File paths and risk labels only; never print potentially sensitive contents.
   console.error('PUBLIC_TREE_RISK '+item.reason+' '+JSON.stringify(item.path));
  }
  process.exitCode=3;
 }else{
  console.log('PUBLIC_TREE_AUDIT_PASS '+summary.inspected+'/'+summary.tracked+' Git HEAD blobs; no high-confidence secret signatures or sensitive paths');
 }
}catch(error){
 console.error('PUBLIC_TREE_AUDIT_ERROR '+String(error.message||error));
 process.exitCode=2;
}
}
