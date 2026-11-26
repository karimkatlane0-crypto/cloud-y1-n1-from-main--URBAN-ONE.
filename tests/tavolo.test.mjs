import test from 'node:test';import assert from 'node:assert/strict';
import {ASSETS,MAX_DEPTH,addGoal,updateGoal,depth,plan,stats,snapshot,safeLoad,validateGoalGraph} from '../www/tavolo-core.js';
const mk=(goals,title,parentId=null,assets=[])=>addGoal(goals,{title,parentId,assets});
const record=(id,parentId=null)=>({id,title:'Missione '+id,parentId,assets:[],status:'todo',evidence:'',createdAt:'2026-11-26T00:00:00.000Z'});

test('asset ledger includes both original repositories and unverified payment providers',()=>{assert.equal(ASSETS.length,8);assert(ASSETS.some(a=>a.id==='kkubera'&&a.source.includes('private')));assert(ASSETS.some(a=>a.id==='stripe'&&a.status==='LIVE_UNVERIFIED'))});
test('all five action gates remain non-executing and unverified',()=>{const p=plan(mk([],'Realizzare prodotto'));assert.deepEqual(p.steps.map(s=>s.stage),['GOAL','INTEGRATE','VERIFY','VALIDATE','RELEASE']);assert(p.steps.every(s=>s.status==='NOT_VERIFIED'));assert.equal(p.externalExecution,false);assert.equal(p.providerVerified,false)});
test('three subgoal levels allowed, fourth denied',()=>{const all=[];let parent=null;for(let i=0;i<=MAX_DEPTH;i++){const g=mk(all,'Missione livello '+i,parent);all.push(g);parent=g.id}assert.equal(depth(all,parent),MAX_DEPTH+1);assert.throws(()=>mk(all,'Quarto sotto-obiettivo',parent),/Massimo tre/)});
test('parent graph validation rejects cycles, missing parents and excessive depth',()=>{
 const a=record('a','b'),b=record('b','a');
 assert.throws(()=>validateGoalGraph([a,b]),/Gerarchia ciclica/);
 assert.throws(()=>validateGoalGraph([record('orphan','missing')]),/Padre inesistente/);
 const chain=Array.from({length:MAX_DEPTH+2},(_,i)=>record('node-'+i,i? 'node-'+(i-1):null));
 assert.throws(()=>validateGoalGraph(chain),/tre sotto-livelli/);
});
test('addGoal rejects a pre-existing corrupt graph before adding a new node',()=>{
 const cyclic=[record('a','b'),record('b','a')];
 assert.throws(()=>mk(cyclic,'Nuova missione'),/Gerarchia ciclica/);
 assert.throws(()=>mk([],'Figlio','missing'),/Padre inesistente/);
});
test('verified requires evidence, invalid statuses fail',()=>{const g=mk([],'Controllo release');assert.throws(()=>updateGoal([g],g.id,{status:'verified'}),/prova/);assert.throws(()=>updateGoal([g],g.id,{status:'approved'}),/Stato non previsto/);assert.equal(updateGoal([g],g.id,{status:'verified',evidence:'test CI URL'})[0].status,'verified')});
test('asset allowlist and human permission by default',()=>{const g=mk([],'Stripe mese',null,['stripe','unknown']);assert.deepEqual(g.assets,['stripe']);assert(Object.values(snapshot([g]).permissions).every(x=>x===false))});
test('safe import accepts valid data and rejects malformed, duplicate or cyclic archives',()=>{
 const g=mk([],'Importa piano');
 assert.deepEqual(safeLoad(null),[]);
 assert.equal(safeLoad(JSON.stringify([g])).length,1);
 assert.throws(()=>safeLoad('{bad'));
 assert.throws(()=>safeLoad(JSON.stringify([record('same'),record('same')])),/duplicato/);
 assert.throws(()=>safeLoad(JSON.stringify([record('a','b'),record('b','a')])),/Gerarchia ciclica/);
});
test('corrupt local archive is preserved for export and does not enable overwrite',async()=>{
 const {readFile}=await import('node:fs/promises');
 const source=await readFile(new URL('../www/tavolo-ai.js',import.meta.url),'utf8');
 assert(source.includes('storageCorrupt=storageBackup!==null'));
 assert(source.includes('a.download=storageCorrupt?'));
 assert(source.includes('urban-one-tavolo-ai-quarantine-backup.json'));
 assert(source.includes("if(storageCorrupt)return"));
});
test('parent picker permits exactly three nested subgoal levels',async()=>{
 const {readFile}=await import('node:fs/promises');
 const source=await readFile(new URL('../www/tavolo-ai.js',import.meta.url),'utf8');
 assert(source.includes('if(d<=MAX_DEPTH)'));
});
test('native shell includes AI table as standalone route',async()=>{
 const {readFile}=await import('node:fs/promises');
 const files=await Promise.all(['tavolo-ai.html','tavolo-ai.css','tavolo-ai.js'].map(x=>readFile(new URL('../www/'+x,import.meta.url),'utf8')));
 assert(files[0].includes('TAVOLO AI SUPERIORE'));assert(files[2].includes('textContent'));assert(!files[2].includes('fetch('));assert(!files[2].includes('STRIPE_SECRET_KEY'));
});
