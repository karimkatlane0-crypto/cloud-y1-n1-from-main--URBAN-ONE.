export const modules = Object.freeze([
  { id: 'urban', title: 'URBAN ONE', caption: 'Enterprise · ricerca · hospitality · science', icon: '◈', url: './modules/urban-one/index.html', source: 'karimkatlane0-crypto/-URBAN-ONE', mode:'local' },
  { id: 'kkubera', title: 'KKUBERA AI', caption: 'Immobiliare · matching · visite · DBRELAY', icon: '⌂', url: './modules/kkubera/index.html', source: 'karimkatlane0-crypto/URBAN-ONE', mode:'local' },
  { id: 'seva', title: 'SEVA AI', caption: 'Obiettivi · agenti · CRM · consenso', icon: '✦', source:'karimkatlane0-crypto/-URBAN-ONE/apps/seva-enterprise', mode:'server', verified:false },
  { id: 'payments', title: 'Pagamenti', caption: 'Stripe · checkout · entitlement · riconciliazione', icon: '€', source:'isolated-backends', mode:'server', verified:false },
  { id: 'partners', title: 'Partner e turismo', caption: 'CJ · Booking · collegamenti autorizzati', icon: '✈', source:'integrations', mode:'server', verified:false },
  { id: 'finance', title: 'PSD2 & AI', caption: 'Fabrick · dati bancari con consenso', icon: '◎', source:'integrations', mode:'server', verified:false }
]);
export function urlForLocalModule(id){const m=modules.find(x=>x.id===id);return m?.mode==='local'?m.url:null}
export function safeLocalPath(url){return /^\.\/modules\/(urban-one|kkubera)\/index\.html$/.test(url||'')}
