import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const strict=process.argv.includes('--release');
for(const file of ['www/index.html','www/style.css','www/app.js','www/registry.js','www/tavolo-ai.html','www/tavolo-ai.css','www/tavolo-ai.js','www/tavolo-core.js','capacitor.config.ts']){
  if(!(await stat(path.join(root,file)).catch(()=>null))?.isFile())throw new Error('Missing shell source: '+file);
}
if(strict){for(const rel of ['www/modules/urban-one/index.html','www/modules/kkubera/index.html','www/source-build.json'])if(!(await stat(path.join(root,rel)).catch(()=>null))?.isFile())throw new Error('Release blocked (source missing): '+rel)}
const cfg=await readFile(path.join(root,'capacitor.config.ts'),'utf8');
if(!cfg.includes('com.karimkatlane.unified')||cfg.includes('allowNavigation'))throw new Error('Native config insecure');
console.log(strict?'RELEASE_ASSETS_PASS (store signing and backend still NOT verified)':'SHELL_PASS (not a production release)');
