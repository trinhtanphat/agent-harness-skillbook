(() => {
  'use strict';
  const items = Array.isArray(window.SKILLBOOK_CATALOG) ? window.SKILLBOOK_CATALOG : [];
  const $ = (id) => document.getElementById(id);
  const categoryNames = ['Tất cả', ...new Set(items.map(s => s.category))];
  const symbols = {'Agent Harness & Skills':'⌘','Crawl & App Reconstruction':'▦','Research & PhD':'✳','MCP & Integrations':'◇','Problem Solving':'⌁','QA, Security & Delivery':'⛨'};
  const state = {query:'',category:'Tất cả',level:'all'};
  let lastFocus = null, toastTimer = 0;
  const safe = (value) => String(value == null ? '' : value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalize = x => String(x).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('vi');
  const make = (tag, className, text) => { const e=document.createElement(tag); if(className) e.className=className; if(text!=null) e.textContent=text; return e; };
  function renderCategories() {
    const root=$('categories'); root.replaceChildren();
    categoryNames.forEach(cat=>{
      const b=make('button','category-btn',cat==='Tất cả'?'✧ Tất cả':(symbols[cat]||'✦')+' '+cat);
      b.type='button'; b.setAttribute('aria-pressed',String(cat===state.category));
      b.addEventListener('click',()=>{state.category=cat;render();});
      root.appendChild(b);
    });
  }
  function matches(s) {
    if(state.category!=='Tất cả' && s.category!==state.category)return false;
    if(state.level!=='all' && s.level!==state.level)return false;
    if(!state.query.trim())return true;
    const hay=normalize([s.title,s.summary,s.category,s.id,s.tags.join(' ')].join(' '));
    return state.query.trim().split(/\s+/).every(term=>hay.includes(normalize(term)));
  }
  function render() {
    renderCategories();
    const visible=items.filter(matches), grid=$('skillGrid'); grid.replaceChildren();
    $('resultCount').textContent=String(visible.length);
    $('statSkills').textContent=String(items.length);
    $('statTracks').textContent=String(categoryNames.length-1);
    $('filterCaption').textContent=state.category==='Tất cả'?'Toàn bộ kỹ năng':state.category;
    $('emptyState').hidden=visible.length!==0;
    visible.forEach((s)=>{
      const b=make('button','skill-card');b.type='button';
      b.setAttribute('aria-label','Mở kỹ năng: '+s.title);
      b.innerHTML='<div class="skill-top"><span class="skill-glyph">'+safe(symbols[s.category]||'✧')+'</span><span class="difficulty">'+safe(s.level)+'</span></div>'+
      '<div class="skill-category">'+safe(s.category)+'</div><h3>'+safe(s.title)+'</h3><p>'+safe(s.summary)+'</p>'+
      '<div class="skill-bottom"><span class="skill-count">SKILL / '+safe(s.id)+'</span><span class="skill-open">Chi tiết ↗</span></div>';
      b.addEventListener('click',()=>openDrawer(s));grid.appendChild(b);
    });
  }
  function notify(msg){const e=$('toast');e.textContent=msg;e.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>e.hidden=true,2700);}
  function openDrawer(s){
    lastFocus=document.activeElement;
    $('drawerNo').textContent=String(items.indexOf(s)+1).padStart(2,'0');
    const body=$('drawerContent'); body.innerHTML=
      '<div class="section-kicker">'+safe(s.category)+'</div><h2 id="drawerTitle">'+safe(s.title)+'</h2><p class="drawer-summary">'+safe(s.summary)+'</p>'+
      '<div class="drawer-pills"><span class="drawer-pill">'+safe(s.level)+'</span><span class="drawer-pill">'+safe(s.origin)+'</span>'+s.tags.map(t=>'<span class="drawer-pill">#'+safe(t)+'</span>').join('')+'</div>'+
      '<h3>QUY TRÌNH THỰC HÀNH</h3><ol>'+s.steps.map(x=>'<li>'+safe(x)+'</li>').join('')+'</ol>'+
      '<div class="drawer-outcome"><strong>DELIVERABLES / ĐẦU RA</strong>'+safe(s.deliverables)+'</div>'+
      '<h3>ACCEPTANCE / TIÊU CHÍ</h3><ul>'+s.checks.map(x=>'<li>'+safe(x)+'</li>').join('')+'</ul>'+
      '<h3>GIỚI HẠN AN TOÀN</h3><p class="drawer-summary">Chỉ dùng với hệ thống hoặc tài liệu có quyền truy cập; không tiết lộ khóa, dữ liệu cá nhân hoặc sao chép tài sản không được cấp phép. Mọi trạng thái phải có bằng chứng.</p>'+
      '<div class="drawer-actions"><a class="primary-button" href="'+safe(s.path)+'" target="_blank" rel="noopener noreferrer">Mở SKILL.md ↗</a><button class="secondary-button" id="copyPrompt" type="button">Sao chép prompt ↗</button></div>'+
      '<p class="drawer-source">Nguồn tham khảo: <a href="'+safe(s.source)+'" target="_blank" rel="noopener noreferrer">'+safe(s.source)+'</a></p>';
    $('copyPrompt').addEventListener('click',async ()=>{
      const prompt='Hãy sử dụng skill '+s.id+' để thực hiện nhiệm vụ sau. Mục tiêu: [điền]. Giới hạn quyền: [điền]. Làm theo các bước: '+s.steps.join('; ')+'. Bàn giao: '+s.deliverables+'. Đính kèm bằng chứng và nêu rõ phần chưa được kiểm chứng.';
      try{await navigator.clipboard.writeText(prompt);notify('Đã sao chép prompt mẫu');}catch(e){notify('Không thể sao chép tự động trên trình duyệt này');}
    });
    $('drawerOverlay').hidden=false;
    $('skillDrawer').classList.add('open');
    $('skillDrawer').setAttribute('aria-hidden','false');
    document.body.classList.add('drawer-open');
    $('closeDrawer').focus();
    if(location.hash.indexOf('#skill/')===0) history.replaceState(null,'',location.pathname+location.search+'#explorer');
  }
  function closeDrawer(){
    $('skillDrawer').classList.remove('open');$('skillDrawer').setAttribute('aria-hidden','true');
    $('drawerOverlay').hidden=true;document.body.classList.remove('drawer-open');
    if(lastFocus && typeof lastFocus.focus==='function')lastFocus.focus();
  }
  function clearFilters(){state.category='Tất cả';state.query='';state.level='all';$('searchInput').value='';$('levelSelect').value='all';render();}
  $('searchInput').addEventListener('input',e=>{state.query=e.target.value;render();});
  $('levelSelect').addEventListener('change',e=>{state.level=e.target.value;render();});
  $('resetBtn').addEventListener('click',clearFilters);$('emptyReset').addEventListener('click',clearFilters);
  $('closeDrawer').addEventListener('click',closeDrawer);$('drawerOverlay').addEventListener('click',closeDrawer);
  document.addEventListener('keydown',e=>{
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();closeDrawer();$('searchInput').focus();$('explorer').scrollIntoView();}
    if(e.key==='Escape'){if(document.body.classList.contains('drawer-open'))closeDrawer();else if(document.activeElement===$('searchInput')){$('searchInput').blur();}}
    if(e.key==='Tab'&&document.body.classList.contains('drawer-open')){
      const active=Array.from($('skillDrawer').querySelectorAll('button,a[href]'));
      if(!active.length)return; const first=active[0],last=active[active.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
    }
  });
  document.querySelectorAll('[data-focus]').forEach(b=>b.addEventListener('click',()=>{
    state.category=b.dataset.focus;state.query='';state.level='all';$('searchInput').value='';$('levelSelect').value='all';render();$('explorer').scrollIntoView();
  }));
  const themeButton=$('themeBtn');
  let savedTheme='dark';try{savedTheme=localStorage.getItem('skillbook-theme')||'dark';}catch(e){}
  if(savedTheme==='light')document.body.classList.add('light');
  themeButton.addEventListener('click',()=>{const light=document.body.classList.toggle('light');try{localStorage.setItem('skillbook-theme',light?'light':'dark');}catch(e){};notify(light?'Đã bật giao diện sáng':'Đã bật giao diện tối');});
  render();
})();
