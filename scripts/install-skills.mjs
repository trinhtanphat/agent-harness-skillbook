#!/usr/bin/env node
// Offline Agent Skill installer. Dry run by default, never overwrite.
import {readFile,lstat,realpath,mkdir,writeFile} from 'node:fs/promises';
import {resolve,join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';

const base=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const layouts={agents:['.agents','skills'],claude:['.claude','skills'],github:['.github','skills']};
const help=[
 'Usage:',
 '  node scripts/install-skills.mjs --list',
 '  node scripts/install-skills.mjs --skill ID --target PROJECT [--format agents|claude|github] [--write]',
 '  node scripts/install-skills.mjs --all --target PROJECT [--format agents|claude|github] [--write]',
 'Default: dry run; --write is required to create files in existing PROJECT.'
].join('\n');
function fail(reason){throw Error(reason+'\n'+help);}
function args(argv){
 const o={ids:[],all:false,list:false,write:false,target:null,format:'agents',help:false};
 for(let i=0;i<argv.length;i++){
  const x=argv[i];
  if(x==='--help'||x==='-h'){o.help=true;continue;}
  if(x==='--all'){o.all=true;continue;}
  if(x==='--list'){o.list=true;continue;}
  if(x==='--write'){o.write=true;continue;}
  if(x==='--skill'||x==='--target'||x==='--format'){
   const v=argv[++i];if(!v||v.startsWith('--'))fail('Missing argument '+x);
   if(x==='--skill')o.ids.push(v);
   if(x==='--target'){if(o.target)fail('Only one target permitted');o.target=v;}
   if(x==='--format')o.format=v;
   continue;
  }
  fail('Unsupported option '+x);
 }
 if(o.help)return o;
 if(!Object.hasOwn(layouts,o.format))fail('Unsupported format');
 if(o.all&&o.ids.length)fail('Choose --all OR --skill');
 if(o.list&&(o.ids.length||o.all||o.target||o.write))fail('--list is standalone');
 if(!o.list&&!o.all&&!o.ids.length)fail('Choose a skill, --all, or --list');
 if(!o.list&&!o.target)fail('Explicit --target existing project directory required');
 if(new Set(o.ids).size!==o.ids.length)fail('Duplicate skill ID');
 return o;
}
const options=args(process.argv.slice(2));
if(options.help){console.log(help);process.exit(0);}
const code=(await readFile(join(base,'data','catalog.js'),'utf8')).trim();
const prefix='window.SKILLBOOK_CATALOG = ';
if(!code.startsWith(prefix))fail('Unknown catalog format');
const entries=JSON.parse(code.slice(prefix.length).replace(/;$/,''));
const byId=new Map(entries.map(x=>[x.id,x]));
if(byId.size!==entries.length)fail('Duplicate catalog IDs');
if(options.list){
 console.log('Available skills ('+entries.length+'):');
 for(const s of entries)console.log(s.id+' | '+s.category+' | '+s.title);
 process.exit(0);
}
const selected=options.all?entries:options.ids.map(id=>{
 if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id))fail('Unsafe skill ID '+id);
 const x=byId.get(id);if(!x)fail('Unknown skill ID '+id);
 return x;
});
let root;try{root=await realpath(resolve(options.target));}catch{fail('Target directory not found');}
if(!(await lstat(root)).isDirectory())fail('Target is not a directory');
const destRoot=join(root,...layouts[options.format]);
async function check(p){
 try{
  const s=await lstat(p);
  if(s.isSymbolicLink())fail('Destination symlink not allowed: '+p);
  if(!s.isDirectory())fail('Not a directory: '+p);
  return true;
 }catch(e){if(e.code==='ENOENT')return false;throw e;}
}
let cur=root;
for(const part of layouts[options.format]){cur=join(cur,part);await check(cur);}
const plans=[];
for(const item of selected){
 if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id))fail('Bad catalog ID');
 const source=join(base,'.agents','skills',item.id,'SKILL.md');
 const content=await readFile(source);
 const destination=join(destRoot,item.id);
 if(await check(destination))fail('Existing skill: '+destination+' (no overwrite)');
 plans.push({destination,content,id:item.id,sha:createHash('sha256').update(content).digest('hex')});
}
console.log((options.write?'WRITE ':'DRY RUN ')+plans.length+' skill(s), target '+destRoot);
for(const p of plans)console.log(p.id+' SHA256 '+p.sha);
if(!options.write){console.log('No files modified. Add --write to install.');process.exit(0);}
cur=root;
for(const part of layouts[options.format]){
 cur=join(cur,part);
 if(!(await check(cur)))await mkdir(cur);
 await check(cur);
}
for(const p of plans){
 await check(destRoot);
 await mkdir(p.destination); // exclusive; no overwrite
 await writeFile(join(p.destination,'SKILL.md'),p.content,{flag:'wx'});
}
console.log('INSTALL_PASS '+plans.length);
