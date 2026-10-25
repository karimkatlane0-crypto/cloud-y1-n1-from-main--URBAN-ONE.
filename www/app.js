import {modules, safeLocalPath} from './registry.js';
const byId = id=>document.getElementById(id);
const status = {urban:false,kkubera:false};
function setNav(id){for(const [key,el] of [['home','homeNav'],['modules','moduleNav'],['status','statusNav']]){byId(el).removeAttribute('aria-current');if(key===id)byId(el).setAttribute('aria-current','page')}}
async function exists(relativePath){try{const result=await fetch(relativePath,{method:'GET',cache:'no-store'});return result.ok}catch{return false}}
function makeTile(m){const b=document.createElement('button');b.className='tile';b.type='button';const glyph=document.createElement('span');glyph.className='glyph';glyph.textContent=m.icon;const h=document.createElement('strong');h.textContent=m.title;const p=document.createElement('p');p.textContent=m.caption;const tag=document.createElement('span');tag.className='state';const enabled=m.mode==='local'&&status[m.id];b.disabled=!enabled;tag.classList.toggle('locked',!enabled);tag.textContent=enabled?'INTERFACCIA INCLUSA':'IN ATTESA DI VERIFICA';b.append(glyph,h,p,tag);if(enabled)b.addEventListener('click',()=>openModule(m));return b}
function render(){const target=byId('modules');target.replaceChildren(...modules.map(makeTile));byId('reposCount').textContent='2';byId('modulesCount').textContent=String(modules.length);byId('readyCount').textContent=String(Object.values(status).filter(Boolean).length)}
function closeModule(){byId('viewer').hidden=true;byId('moduleFrame').src='about:blank';byId('dashboard').hidden=false;setNav('home')}
function openModule(m){if(m.mode!=='local'||!status[m.id]||!safeLocalPath(m.url))return;byId('moduleFrame').src=m.url;byId('viewerTitle').textContent=m.title;byId('viewer').hidden=false;byId('dashboard').hidden=true;setNav('modules')}
byId('back').addEventListener('click',closeModule);byId('close').addEventListener('click',closeModule);
byId('homeNav').addEventListener('click',()=>{closeModule();window.scrollTo(0,0)});
byId('moduleNav').addEventListener('click',()=>{closeModule();byId('modules').scrollIntoView({behavior:'smooth',block:'start'});setNav('modules')});
byId('statusNav').addEventListener('click',()=>{closeModule();document.querySelector('.notice').scrollIntoView({behavior:'smooth',block:'center'});setNav('status')});
window.addEventListener('keydown',e=>{if(e.key==='Escape'&&!byId('viewer').hidden)closeModule()});
render();
Promise.all([exists('./modules/urban-one/index.html'),exists('./modules/kkubera/index.html')]).then(([urban,kkubera])=>{status.urban=urban;status.kkubera=kkubera;render()});
