import {readFileSync,existsSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>readFileSync(join(root,p),'utf8').replace(/\r\n/g,'\n');
const source=read('data/catalog.js');
const prefix='window.SKILLBOOK_CATALOG = ';
assert.ok(source.startsWith(prefix),'catalog format');
const skills=JSON.parse(source.slice(prefix.length).trim().replace(/;$/,''));
const ids=new Set(),categories=new Set();
assert.equal(skills.length,60,'skill count');
for(const s of skills){
 assert.ok(s.id&&!ids.has(s.id),'unique id: '+s.id);ids.add(s.id);categories.add(s.category);
 assert.ok(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s.id)&&s.id.length<=64,'Agent Skills ID spec: '+s.id);
 assert.ok(s.summary&&s.summary.length<=1024,'Agent Skills description bound: '+s.id);
 assert.ok(s.steps.length>=3&&s.checks.length>=1,'skill detail: '+s.id);
 assert.ok(existsSync(join(root,s.path)),'SKILL.md exists: '+s.id);
 const md=read(s.path);
 assert.ok(md.startsWith('---\nname: '+s.id+'\n'),'frontmatter: '+s.id);
 assert.ok(md.slice(0,md.indexOf('\n---',4)).includes('description:'),'frontmatter description: '+s.id);
 assert.ok(md.includes('description: "')&&md.includes('## Giới hạn an toàn')&&md.includes('## Bằng chứng nghiệm thu'),'structure: '+s.id);
}
assert.equal(categories.size,10,'categories');
const names=['app-reconstruction','phd-research','mcp-integration','problem-solving','agent-harness','qa-release','evidence-reporting','security-ethics','evaluation-cost','learning-roadmap','reverse-forensics','knowledge-rag','full-github-mirror','data-automation'];
for(let i=0;i<names.length;i++){const p='playbooks/'+String(i+1).padStart(2,'0')+'-'+names[i]+'.md';assert.ok(existsSync(join(root,p)),'playbook exists: '+p);assert.ok(read(p).length>1500,'playbook length: '+p);}
for(const p of ['index.html','assets/styles.css','assets/app.js','assets/favicon.svg','REFERENCES.md','AGENTS.md','.nojekyll','scripts/local-preview.mjs','scripts/test-local.mjs','scripts/test-preview.mjs','LOCAL_PREVIEW.md'])assert.ok(existsSync(join(root,p)),'site file '+p);
const html=read('index.html');
for(const m of html.matchAll(/\b(?:href|src)="([^"]+)"/g)){const u=m[1];if(/^(https?:\/\/|#|mailto:)/.test(u))continue;const p=u.split('#')[0].split('?')[0].replace(/^\.\//,'');if(p)assert.ok(existsSync(join(root,p)),'local link '+u);}
assert.ok(html.includes('Content-Security-Policy'),'CSP');
console.log('PASS: '+skills.length+' skills / '+categories.size+' categories / '+names.length+' playbooks / links and metadata');

const docNames=names.map((name,i)=>'docs/'+String(i+1).padStart(2,'0')+'-'+name+'.html');
for(const page of docNames){
 assert.ok(existsSync(join(root,page)),'Missing rendered guide '+page);
 const content=read(page);
 assert.ok(content.includes('class="prose"')&&content.includes('<h1>'),'Unrendered guide '+page);
 const links=content.matchAll(/\b(?:href|src)="([^"]+)"/g);
 for(const m of links){
  const u=m[1];
  if(/^(?:https?:\/\/|#|mailto:)/.test(u))continue;
  const p=u.split('?')[0].split('#')[0];
  if(!p)continue;
  assert.ok(existsSync(join(root,'docs',p)),'Broken guide link: '+page+' -> '+p);
 }
}
console.log('PASS: 14 HTML guides and relative-link checks');

// Structural regression gates for the shareable drawer and isolated QA harness.
assert.ok(html.includes('aria-describedby="drawerSummary"')&&html.includes('aria-hidden="true" inert'),'Closed drawer must be inert and have a description');
const app=read('assets/app.js');
assert.ok(app.includes('hashPrefix')&&app.includes('window.addEventListener(\'popstate\'')&&app.includes('window.addEventListener(\'hashchange\''),'Deep-link history routing');
assert.ok(app.includes('updateCategories()')&&app.includes('renderCategories();'),'Stable category filters');
const local=read('scripts/local-preview.mjs');
assert.ok(local.includes("'127.0.0.1'")&&local.includes("'.git'"),'Local preview security invariants');
console.log('PASS: deep-link/a11y invariants and private loopback preview');

const finalQA=JSON.parse(read('evidence/2026-11-14-final/browser-qa.json'));
assert.equal(finalQA.url,'https://trinhtanphat.github.io/agent-harness-skillbook/','final QA site');
assert.equal(finalQA.isolatedProfile,true,'final QA isolated browser');
assert.equal(finalQA.observations.length,16,'final QA count');
for(const name of ["desktop-catalog","theme-toggle","search-MCP","category-filter","expanded-category-filter","category-keyboard-focus","drawer-share-link","drawer-focus-trap","skill-drawer","direct-link-reload","escape-close","browser-back-close","mobile-390","docs-mobile","14-guide-link-smoke","runtime-exceptions"])assert.ok(finalQA.observations.some(r=>r.name===name&&r.result==='PASS'),'final QA: '+name);
for(const p of ['home-desktop-1440.png','home-mobile-390.png','skill-detail-desktop.png','docs-mobile-390.png'])assert.ok(existsSync(join(root,'evidence/2026-11-14-final',p)),'final screenshot: '+p);
console.log('PASS: latest 16/16 public browser QA evidence and 4 screenshots');

const guidesIndex=read('docs/index.html');
const skillsIndex=read('skills/index.html');
assert.equal((guidesIndex.match(/class="directory-card"/g)||[]).length,14,'14 guide index cards');
assert.equal((skillsIndex.match(/class="directory-card"/g)||[]).length,60,'60 skill index cards');
assert.equal((skillsIndex.match(/class="directory-heading"/g)||[]).length,10,'10 category sections');
for(let i=0;i<names.length;i++){
 const guideUrl='docs/'+String(i+1).padStart(2,'0')+'-'+names[i]+'.html';
 assert.ok(guidesIndex.includes('href="'+guideUrl.slice(5)+'"'),'Guide missing from docs index: '+guideUrl);
}
for(const skill of skills){
 assert.ok(skillsIndex.includes('href="../#skill/'+encodeURIComponent(skill.id)+'"'),'Skill missing from directory: '+skill.id);
 assert.ok(skillsIndex.includes('href="../'+skill.path+'"'),'Raw SKILL.md link missing: '+skill.id);
}
for(let i=10;i<14;i++){
 const p='docs/'+String(i+1).padStart(2,'0')+'-'+names[i]+'.html';
 const page=read(p);
 assert.ok(page.includes('FIELD GUIDES / '+(i+1)+'</div>'),'Incorrect guide counter: '+p);
 assert.ok(!page.includes('content="Lộ trình 30 ngày — Playbook'),'Stale guide description: '+p);
}
for(const link of ['assets/directory.css','INSTALL_SKILLS.md','scripts/install-skills.mjs','scripts/test-install-skills.mjs','docs/index.html','skills/index.html'])assert.ok(existsSync(join(root,link)),'Missing new artifact '+link);
for(const p of ['docs/index.html','skills/index.html']){
 const body=read(p);
 assert.ok(body.includes('Content-Security-Policy'),'Missing CSP: '+p);
 assert.ok(body.includes('lang="vi"'),'Missing language: '+p);
 for(const link of body.matchAll(/\b(?:href|src)="([^"]+)"/g)){
  const url=link[1];
  if(/^(?:https?:\/\/|#|mailto:)/.test(url))continue;
  const pathname=url.split('#')[0].split('?')[0];
  if(pathname)assert.ok(existsSync(join(root,p.slice(0,p.lastIndexOf('/')),pathname)),'Broken index link '+p+' -> '+url);
 }
}
const siteMap=read('sitemap.xml');
for(const target of ['docs/index.html','skills/index.html'])assert.ok(siteMap.includes('https://trinhtanphat.github.io/agent-harness-skillbook/'+target),'Sitemap missing '+target);
console.log('PASS: 14/60 static directories, metadata, CSP, links and sitemap');

const installPage=read('install.html');
assert.ok(installPage.includes('<article id="install"')&&installPage.includes('scripts/install-skills.mjs'),'Installer guide HTML');
assert.ok(siteMap.includes('https://trinhtanphat.github.io/agent-harness-skillbook/install.html'),'Installer missing from sitemap');
console.log('PASS: installer web guide and sitemap');
