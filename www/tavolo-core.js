// Tavolo AI: deterministic local orchestration. No inference, secrets or external execution.
export const MAX_DEPTH=3;
export const ASSETS=Object.freeze([
{id:'urban',name:'URBAN ONE Enterprise',source:'karimkatlane0-crypto/-URBAN-ONE',status:'SOURCE_INSPECTED',role:'Enterprise · hospitality · science'},
{id:'kkubera',name:'KKUBERA AI',source:'karimkatlane0-crypto/URBAN-ONE (private)',status:'SOURCE_INSPECTED',role:'Immobiliare · matching · visite'},
{id:'seva',name:'SEVA AI',source:'-URBAN-ONE/apps/seva-enterprise',status:'BACKEND_UNVERIFIED',role:'Obiettivi · agenti · CRM'},
{id:'science',name:'AI Science',source:'-URBAN-ONE/apps/mobile/www/science.html',status:'SOURCE_INSPECTED',role:'Ricerca · esperimenti'},
{id:'tourism',name:'Tourism / Hospitality',source:'-URBAN-ONE/apps/mobile/www/discovery.html',status:'PARTNER_UNVERIFIED',role:'Soggiorni · travel · CJ/Booking'},
{id:'stripe',name:'Stripe / Billing',source:'separate authorized backends',status:'LIVE_UNVERIFIED',role:'Checkout · entitlement · ricevute'},
{id:'psd2',name:'Fabrick / PSD2',source:'consent-controlled provider',status:'LIVE_UNVERIFIED',role:'Open banking (solo autorizzato)'},
{id:'dbrelay',name:'DBRELAY duale',source:'KKUBERA e SEVA: basi separate',status:'DEPLOYMENT_UNVERIFIED',role:'Audit · dati per dominio'}
]);
export const STATUS=Object.freeze({todo:'Da preparare',doing:'In corso',blocked:'Bloccato',verified:'Verificato'});
export const STAGES=Object.freeze(['GOAL','INTEGRATE','VERIFY','VALIDATE','RELEASE']);
export function clean(s,limit=160){return String(s??'').replace(/[\u0000-\u001f\u007f]/g,' ').trim().slice(0,limit)}
export function depth(goals,parent){let d=0,seen=new Set();while(parent){if(seen.has(parent))throw Error('Gerarchia ciclica');seen.add(parent);const g=goals.find(x=>x.id===parent);if(!g)throw Error('Padre inesistente');parent=g.parentId||null;d++}return d}
export function addGoal(goals,raw){
 const title=clean(raw.title);if(title.length<3)throw Error('Obiettivo troppo breve');
 const parentId=raw.parentId||null;if(depth(goals,parentId)>MAX_DEPTH)throw Error('Massimo tre sotto-livelli');
 const assets=[...new Set((Array.isArray(raw.assets)?raw.assets:[]).filter(x=>ASSETS.some(a=>a.id===x)))];
 return {id:'g'+Date.now().toString(36)+Math.random().toString(36).slice(2,9),title,parentId,assets,status:'todo',evidence:'',createdAt:new Date().toISOString()};
}
export function updateGoal(goals,id,patch){
 if(!goals.some(g=>g.id===id))throw Error('Missione sconosciuta');
 return goals.map(g=>{if(g.id!==id)return g;const status=patch.status??g.status,evidence=clean(patch.evidence??g.evidence,1200);
 if(!Object.hasOwn(STATUS,status))throw Error('Stato non previsto');
 if(status==='verified'&&!evidence)throw Error('Serve una prova prima della verifica');
 return {...g,status,evidence};});
}
export function route(g){
 const text=g.title.toLowerCase();const a=g.assets;
 if(a.includes('kkubera')||/immobil|affitt|visita|propriet/.test(text))return 'Real Estate & Data';
 if(a.includes('tourism')||/booking|turis|ospital|hotel/.test(text))return 'Tourism & Partnerships';
 if(a.includes('stripe')||/pagament|stripe|abbon|incass/.test(text))return 'Billing & Reconciliation';
 if(a.includes('science')||/ricerc|scien|dati/.test(text))return 'Science & Evaluation';
 return 'Architecture & Product';
}
export function plan(g){
 const domain=route(g);
 const agents=[domain,'Security & Consent','DevSecOps & QA'];
 const checks=['Risultato, criteri e KPI definiti','Asset, proprietà d’uso e dipendenze mappate','Prove tecniche e permessi documentati','Audit di sicurezza, consenso e rischio','Decisione umana con approvazione finale'];
 return {goalId:g.id,title:g.title,domain,agents,mode:'LOCAL_DETERMINISTIC_NOT_AI_INFERENCE',
  steps:STAGES.map((stage,i)=>({stage,gate:checks[i],status:'NOT_VERIFIED',executor:agents[i%agents.length]})),
  assetIds:g.assets,externalExecution:false,providerVerified:false,ownerApprovalRequired:true};
}
export function stats(goals){return {total:goals.length,verified:goals.filter(g=>g.status==='verified').length,blocked:goals.filter(g=>g.status==='blocked').length}}
export function snapshot(goals){return {schema:'URBAN_ONE_AI_TABLE_V1',origin:'local-device',assets:ASSETS,goals,plans:goals.map(plan),permissions:{payments:false,banking:false,externalActions:false,aiProvider:false}}}
export function safeLoad(input){
 try{const x=JSON.parse(input);if(!Array.isArray(x)||x.length>250)return [];const seen=new Set();
 return x.filter(g=>{if(!g||typeof g!=='object'||typeof g.id!=='string'||seen.has(g.id)||!Object.hasOwn(STATUS,g.status)||typeof g.title!=='string')return false;seen.add(g.id);return true})
 .map(g=>({id:clean(g.id,80),title:clean(g.title),parentId:typeof g.parentId==='string'?clean(g.parentId,80):null,assets:(Array.isArray(g.assets)?g.assets:[]).filter(x=>ASSETS.some(a=>a.id===x)),status:g.status,evidence:clean(g.evidence,1200),createdAt:clean(g.createdAt,60)}));
 }catch{return []}
}
