# GOLDEN AGE · Installazione reale (PWA e Android debug)
## Android/iPhone (PWA)
Apri l'indirizzo HTTPS del Tavolo AI (es.: `https://urban-one-golden-age-control.vercel.app/tavolo-ai.html`).
- Android Chrome: tocca **Installa app** se offerto, altrimenti menu ⋮ → **Installa app** / **Aggiungi a schermata Home**.
- iPhone Safari: Condividi → **Aggiungi alla schermata Home**.
- Gli obiettivi sono salvati localmente nel browser o nella PWA. L'archiviazione locale non è cifrata: **non inserire dati sensibili**. Per conservare, esporta JSON.
- Il funzionamento offline riguarda solo la shell di pianificazione. Nessun backend autenticato, pagamento, immobili reali o integrazioni esterne è abilitato.

## Android APK di sviluppo
GitHub Actions → `Golden Age — Public Shell Android APK` → run PASS → artifact `golden-age-public-shell-android-debug`, che contiene un APK e checksum.
Scarica il ZIP artifact su telefono, estrai l'APK, autorizza l'installazione da sorgente attendibile per il solo tempo necessario; questo è un debug build, **non** una release firmata di produzione e non è pubblicato su Google Play.

## Privacy e integrazioni
Questa build include **solo i file statici pubblici** `www/`, NON importa la repository privata KKUBERA. Il workflow `Hybrid native validation` conserva il blocco per l'integrazione privata, che richiede repo PRIVATE e read token; non aggirarlo. Il checkout Stripe/SEVA/Booking/Fabrick e le API AI vere rimangono disabilitate.
