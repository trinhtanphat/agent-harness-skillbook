import {readFileSync,existsSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>readFileSync(join(root,p),'utf8');
const source=read('data/catalog.js');
const prefix='window.SKILLBOOK_CATALOG = ';
assert.ok(source.startsWith(prefix),'catalog format');
const skills=JSON.parse(source.slice(prefix.length).trim().replace(/;$/,''));
const ids=new Set(),categories=new Set();
assert.equal(skills.length,36,'skill count');
for(const s of skills){
 assert.ok(s.id&&!ids.has(s.id),'unique id: '+s.id);ids.add(s.id);categories.add(s.category);
 assert.ok(s.steps.length>=3&&s.checks.length>=2,'skill detail: '+s.id);
 assert.ok(existsSync(join(root,s.path)),'SKILL.md exists: '+s.id);
 const md=read(s.path);
 assert.ok(md.startsWith('---\nname: '+s.id+'\n'),'frontmatter: '+s.id);
 assert.ok(md.includes('description: "')&&md.includes('## Giới hạn an toàn')&&md.includes('## Bằng chứng nghiệm thu'),'structure: '+s.id);
}
assert.equal(categories.size,6,'categories');
const names=['app-reconstruction','phd-research','mcp-integration','problem-solving','agent-harness','qa-release','evidence-reporting','security-ethics','evaluation-cost','learning-roadmap'];
for(let i=0;i<names.length;i++){const p='playbooks/'+String(i+1).padStart(2,'0')+'-'+names[i]+'.md';assert.ok(existsSync(join(root,p)),'playbook exists: '+p);assert.ok(read(p).length>1500,'playbook length: '+p);}
for(const p of ['index.html','assets/styles.css','assets/app.js','assets/favicon.svg','REFERENCES.md','AGENTS.md','.nojekyll'])assert.ok(existsSync(join(root,p)),'site file '+p);
const html=read('index.html');
for(const m of html.matchAll(/\b(?:href|src)="([^"]+)"/g)){const u=m[1];if(/^(https?:\/\/|#|mailto:)/.test(u))continue;const p=u.split('#')[0].split('?')[0].replace(/^\.\//,'');if(p)assert.ok(existsSync(join(root,p)),'local link '+u);}
assert.ok(html.includes('Content-Security-Policy'),'CSP');
console.log('PASS: '+skills.length+' skills / '+categories.size+' categories / '+names.length+' playbooks / links and metadata');
