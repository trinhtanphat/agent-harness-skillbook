import {readFileSync,existsSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {createHash} from 'node:crypto';
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

// Verify release QA evidence for the 19 public-site browser gates.
const qa19=JSON.parse(read('evidence/2026-11-14-19qa/browser-qa.json'));
const qa19names=["desktop-catalog","theme-toggle","search-MCP","category-filter","expanded-category-filter","category-keyboard-focus","drawer-share-link","drawer-focus-trap","skill-drawer","direct-link-reload","escape-close","browser-back-close","mobile-390","docs-mobile","14-guide-link-smoke","directory-pages","skills-index-mobile","installer-guide","runtime-exceptions"];
assert.equal(qa19.url,'https://trinhtanphat.github.io/agent-harness-skillbook/','QA website');
assert.equal(qa19.isolatedProfile,true,'QA isolated profile');
assert.equal(qa19.observations.length,19,'expected browser gates');
for(const name of qa19names)assert.ok(qa19.observations.some(x=>x.name===name&&x.result==='PASS'),'Missing live PASS: '+name);
assert.ok(existsSync(join(root,'evidence/2026-11-14-19qa/skills-index-mobile-390.png')),'Missing mobile QA screenshot');
console.log('PASS: latest live browser QA evidence 19/19 and responsive index screenshot');

const previewCode=read('scripts/local-preview.mjs');
assert.ok(previewCode.includes('canonicalRoot+sep')&&previewCode.includes('realpath(candidate)'),'Local preview must enforce canonical path containment');
assert.ok(previewCode.includes("name.startsWith('.env.')") && previewCode.includes("segment.toLowerCase()"),'Preview must block mixed-case environment files');
console.log('PASS: canonical path containment and sensitive-file exclusions');
assert.ok(previewCode.includes('resolvedParts.some(isSensitiveSegment)'),'Canonical path segments must be security checked');
assert.ok(previewCode.includes('segment.toLowerCase()'),'Case-insensitive sensitive segment validation');
assert.ok(previewCode.includes('createReadStream(canonical)'),'Serve validated canonical target');
assert.ok(read('scripts/test-preview.mjs').includes('in-root symlink alias to forbidden'),'Missing internal sensitive symlink regression');
console.log('PASS: canonical sensitive-segment policy and symlink alias regression');

const seoDescription=html.match(/<meta\s+name="description"\s+content="([^"]+)"/)?.[1]||'';
assert.ok(seoDescription.includes('60 Agent Skills')&&seoDescription.includes('14 playbook')&&!seoDescription.includes('36 kỹ năng'),'Index SEO catalog statistics');
const modalCode=read('assets/app.js');
assert.ok(modalCode.includes('setBackgroundInert(true)')&&modalCode.includes('setBackgroundInert(false)'),'Modal background focus isolation');
assert.ok(read('assets/docs.css').includes('.prose pre{max-width:100%;overflow-x:auto'),'CLI code blocks must scroll inside viewport');
console.log('PASS: SEO accuracy, modal a11y and responsive code blocks');

assert.ok(existsSync(join(root,'evidence/2026-11-14-a11y-24qa/live-browser-run.md')),'Missing public 24-check browser QA transcript');
console.log('PASS: public Chrome 24-check transcript included');

const qa24Path='evidence/2026-11-14-a11y-24qa/browser-qa.json';
const qa24=JSON.parse(read(qa24Path));
assert.equal(qa24.observations.length,24,'24 browser checks expected');
assert.equal(qa24.url,'https://trinhtanphat.github.io/agent-harness-skillbook/','QA URL should be public site');
assert.equal(qa24.isolatedProfile,true,'Browser QA must use isolated profile');
assert.ok(typeof qa24.at==='string' && !Number.isNaN(Date.parse(qa24.at)),'QA capture timestamp');
const qa24Names=["desktop-catalog","metadata-counts","theme-toggle","search-MCP","category-filter","expanded-category-filter","category-keyboard-focus","drawer-share-link","modal-background-inert","drawer-focus-trap","skill-drawer","modal-background-restore","direct-link-reload","escape-close","browser-back-close","mobile-390","docs-mobile","14-guide-link-smoke","directory-pages","skills-index-mobile","installer-guide","mobile-320-four-routes","reduced-motion","runtime-exceptions"];
assert.deepEqual(qa24.observations.map(x=>x.name),qa24Names,'Expected original 24 browser test names');
assert.ok(qa24.observations.every(x=>x.result==='PASS'),'No failed browser test allowed');
const originalEvidence=[{"file":"browser-qa.json","bytes":8862,"sha256":"fea5e78e1266689a514e92bcf4f506e246f17c0f89bd911bee6731ebffa55fe4"},{"file":"home-mobile-320.png","bytes":136772,"sha256":"1600f659d508cc6fa071450d982d9d047bd6946f2feede0b9acbfe66f06adec3"},{"file":"install-mobile-320.png","bytes":35081,"sha256":"1cfacb46faba6a8b4612591fa5833a772a2ccfc7dfa1487b995c688328b7e992"}];
for(const item of originalEvidence){
 const file=readFileSync(join(root,'evidence/2026-11-14-a11y-24qa',item.file));
 // Git on Windows may checkout tracked text with CRLF (core.autocrlf=true).
 // Normalize only JSON line endings in memory: the committed Git blob still
 // matches the exact original PHA bytes; PNGs always remain byte-identical.
 const canonical=item.file.endsWith('.json')
   ? Buffer.from(file.toString('utf8').replace(/\r\n/g,'\n'),'utf8')
   : file;
 assert.equal(canonical.length,item.bytes,'Original Git evidence byte count: '+item.file);
 assert.equal(createHash('sha256').update(canonical).digest('hex'),item.sha256,'Original PHA SHA256: '+item.file);
 if(item.file.endsWith('.png'))assert.ok(canonical.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])),'PNG file signature: '+item.file);
}
assert.ok(existsSync(join(root,'evidence/2026-11-14-a11y-24qa/PROVENANCE.md')),'Evidence provenance manifest present');
console.log('PASS: original PHA 24/24 browser QA, exact SHA256 of 3 files and PNG signatures');

assert.ok(existsSync(join(root,'evidence/2026-11-15-preview-security/QA.md')),'Preview security regression evidence available');
console.log('PASS: preview security QA evidence committed');
