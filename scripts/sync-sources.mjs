import { cp, mkdir, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const args=Object.fromEntries(process.argv.slice(2).filter(x=>x.startsWith('--')&&x.includes('=')).map(x=>{const i=x.indexOf('=');return [x.slice(2,i),x.slice(i+1)]}));
export function expectedSources(urban,kkubera){
  return [
    {source:path.join(urban,'apps/mobile/www'),dest:path.join(root,'www/modules/urban-one')},
    {source:path.join(kkubera,'app/src/main/assets/www'),dest:path.join(root,'www/modules/kkubera')}
  ];
}
export async function syncSources(urban,kkubera){
  if(!urban||!kkubera)throw new Error('Specificare --urban=<checkout> e --kkubera=<checkout> entrambi; non è prevista una build parziale.');
  const sources=expectedSources(path.resolve(urban),path.resolve(kkubera));
  for(const item of sources){
    if(!(await stat(path.join(item.source,'index.html')).catch(()=>null))?.isFile())throw new Error('Sorgente applicativo mancante: '+item.source+'/index.html');
  }
  for(const item of sources){await rm(item.dest,{recursive:true,force:true});await mkdir(path.dirname(item.dest),{recursive:true});await cp(item.source,item.dest,{recursive:true,errorOnExist:false});}
  const provenance={builtAt:new Date().toISOString(),sources:sources.map(({source,dest})=>({origin:path.basename(path.dirname(source)),module:path.basename(dest),asset:'bundled-local-frontend'})),noBackendBundled:true};
  await writeFile(path.join(root,'www','source-build.json'),JSON.stringify(provenance,null,2)+'\n');
  return provenance;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  syncSources(args.urban,args.kkubera).then(x=>console.log('SYNC_OK '+JSON.stringify(x))).catch(e=>{console.error(e.message);process.exitCode=1});
}
