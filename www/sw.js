// Cache ONLY reviewed public shell files. Never cache API responses or private modules.
const VERSION='golden-age-public-shell-v1-20261025';
const STATIC=['./','./index.html','./app.js','./registry.js','./style.css','./tavolo-ai.html','./tavolo-ai.js','./tavolo-ai.css','./tavolo-core.js','./pwa.js','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png'];
const STATIC_PATHS=new Set(STATIC.map(x=>new URL(x,self.registration.scope).pathname));
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(VERSION).then(cache=>cache.addAll(STATIC)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(x=>x.startsWith('golden-age-public-shell-')&&x!==VERSION).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
 const req=event.request;if(req.method!=='GET')return;
 const url=new URL(req.url);
 if(url.origin!==self.location.origin||url.pathname.includes('/modules/')||url.pathname.includes('/api/'))return;
 if(!STATIC_PATHS.has(url.pathname))return;
 event.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(res=>{
   if(!res.ok||res.type==='opaque')return res;
   const clone=res.clone();caches.open(VERSION).then(cache=>cache.put(req,clone)).catch(()=>{});
   return res;
 }).catch(()=>caches.match(new URL('./tavolo-ai.html',self.registration.scope)))));
});
