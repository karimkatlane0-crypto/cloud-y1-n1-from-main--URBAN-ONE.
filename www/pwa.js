// PWA install UX. No telemetry, external calls, or background sync.
const panel=document.createElement('aside');
panel.id='installPanel';panel.setAttribute('aria-label','Installazione sul dispositivo');
panel.className='install-panel';
const text=document.createElement('p');
text.textContent='GOLDEN AGE · Aggiungi l’app al telefono per aprire il Tavolo AI più rapidamente.';
const button=document.createElement('button');button.type='button';button.textContent='Installa app';
const details=document.createElement('p');details.className='install-hint';details.setAttribute('role','status');
panel.append(text,button,details);
const standalone=window.matchMedia?.('(display-mode: standalone)').matches||window.navigator.standalone===true;
if(!standalone)document.body.append(panel);
let installPrompt=null;
window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;button.textContent='Installa app';});
window.addEventListener('appinstalled',()=>{panel.remove();installPrompt=null;});
button.addEventListener('click',async ()=>{
  if(installPrompt){const prompt=installPrompt;installPrompt=null;await prompt.prompt();const choice=await prompt.userChoice;details.textContent=choice?.outcome==='accepted'?'Installazione accettata: controlla la schermata Home.':'Installazione non effettuata.';return}
  const ios=/iPhone|iPad|iPod/i.test(navigator.userAgent);
  details.textContent=ios?'Su iPhone apri il menu Condividi del browser e scegli “Aggiungi alla schermata Home”.':'Su Android apri il menu ⋮ del browser e scegli “Installa app” oppure “Aggiungi a schermata Home”.';
});
if('serviceWorker' in navigator && (location.protocol==='https:'||location.hostname==='localhost')){
  window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js',{scope:'./'}).catch(()=>{details.textContent='Offline non disponibile: la versione online resta utilizzabile.'}));
}
