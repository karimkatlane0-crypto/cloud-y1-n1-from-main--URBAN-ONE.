import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,stat,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {modules,urlForLocalModule,safeLocalPath} from '../www/registry.js';
import {expectedSources,syncSources} from '../scripts/sync-sources.mjs';

test('unique modules: two source UIs and four gated services',()=>{assert.equal(modules.length,6);assert.equal(new Set(modules.map(m=>m.id)).size,modules.length);assert.equal(modules.filter(m=>m.mode==='local').length,2);assert.equal(modules.filter(m=>m.mode==='server'&&m.verified===false).length,4)});
test('only bundled local routes can be loaded in viewer',()=>{assert(safeLocalPath(urlForLocalModule('urban')));assert(safeLocalPath(urlForLocalModule('kkubera')));assert.equal(urlForLocalModule('seva'),null);for(const x of ['https://example.org/','javascript:alert(1)','../../private','./modules/urban-one/../../evil'])assert.equal(safeLocalPath(x),false)});
test('source synchronization requires both originals',async()=>{await assert.rejects(syncSources('', ''),/entrambi/)});
test('source paths are isolated and include real frontend assets only',()=>{const x=expectedSources('/tmp/urban','/tmp/kkubera');assert(x[0].source.endsWith('apps/mobile/www'));assert(x[1].source.endsWith('app/src/main/assets/www'));assert(x.every(x=>x.dest.includes('www/modules/')))});
test('sync blocks a missing source without deleting bundled copies',async()=>{const tmp=await mkdtemp(path.join(tmpdir(),'hybrid-sync-'));try{await assert.rejects(syncSources(tmp,tmp),/Sorgente applicativo mancante/)}finally{await rm(tmp,{recursive:true,force:true})}});

test('native workflow blocks public repository before checkout of private module',async()=>{const {readFile}=await import('node:fs/promises');const fs=await readFile(new URL('../.github/workflows/hybrid-mobile.yml',import.meta.url),'utf8');assert.equal((fs.match(/REPO_PRIVATE: \\$\{\{ github\.event\.repository\.private \\$\}\}/g)||[]).length,0);assert.equal((fs.match(/REPO_PRIVATE:/g)||[]).length,2);assert.equal((fs.match(/BLOCKED: public integration repository/g)||[]).length,2)});
