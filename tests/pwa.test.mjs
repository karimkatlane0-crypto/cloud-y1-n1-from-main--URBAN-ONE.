import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const root=new URL('../www/',import.meta.url);
const read=async p=>readFile(new URL(p,root));
test('installable Android/iPhone manifest',async()=>{
 const m=JSON.parse(await read('manifest.webmanifest'));
 assert.equal(m.display,'standalone');assert.equal(m.start_url,'./tavolo-ai.html');
 assert.equal(m.prefer_related_applications,false);
 assert(m.icons.some(x=>x.sizes==='192x192'));
 assert(m.icons.some(x=>x.sizes==='512x512'));
});
test('PNG PWA icons are genuine dimensions',async()=>{
 for(const px of [192,512]){const x=await read('icons/icon-'+px+'.png');
 assert(x.subarray(0,8).equals(Buffer.from('89504e470d0a1a0a','hex')));
 assert.equal(x.readUInt32BE(16),px);assert.equal(x.readUInt32BE(20),px)}
});
test('both screens install manifest and helper',async()=>{
 for(const page of ['index.html','tavolo-ai.html']){
 const html=(await read(page)).toString();
 assert.match(html,/manifest.webmanifest/);assert.match(html,/\.\/pwa\.js/);
 assert.match(html,/apple-touch-icon/);
 }
});
test('service worker never caches authenticated or private module data',async()=>{
 const source=(await read('sw.js')).toString();
 assert.match(source,/\!\=\='GET'/);assert.match(source,/\/modules\//);assert.match(source,/\/api\//);
 assert(!source.includes('stripe-webhook'));
 assert(!source.includes('OPENAI_API_KEY'));
});
test('public APK pipeline never checks out private KKUBERA',async()=>{
 const source=(await read('../.github/workflows/public-shell-android.yml')).toString();
 assert.match(source,/test ! -e www\/modules\/kkubera\/index\.html/);
 assert(!source.includes('SOURCE_REPOS_READ_TOKEN'));
 assert(!source.includes('repository: karimkatlane0-crypto\/URBAN-ONE'));
 assert.match(source,/assembleDebug/);
});
