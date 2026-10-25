# URBAN ONE · Unified Hybrid (iOS / Android)

**New, isolated integration project.** The original repositories remain independent and unchanged.

| Source | GitHub repository | Mobile integration |
|---|---|---|
| URBAN ONE Enterprise + hospitality + science | `karimkatlane0-crypto/-URBAN-ONE` (public) | Bundle `apps/mobile/www` as a local offline module |
| KKUBERA AI Match + real-estate, visits | `karimkatlane0-crypto/URBAN-ONE` (private) | Bundle `app/src/main/assets/www` as a local offline module |
| SEVA AI Enterprise | `-URBAN-ONE/apps/seva-enterprise` | **Backend-gated**: do not bundle private login/payments as fake functionality |
| Empty auxiliary GitHub repo | current project | Hosts only the new integration application |

## Release stages

1. **SHELL**: design, module manifest, navigation and tests. Always testable without credentials. Not a release.
2. **SOURCE BUNDLE**: after read-only access to the private KKUBERA repo, CI checks out both original repos and bundles *frontend assets only*. No Stripe/OpenAI API keys or server code are copied into the native app.
3. **NATIVE BUILDS**: after successful full source sync, CI builds unsigned Android debug APK and unsigned iOS simulator app for functional testing. A debug APK is not a Play Store release, and an iOS simulator build is not an App Store IPA.
4. **PRODUCTION**: requires backend/HTTPS/auth/cross-module SSO/consent/purchases E2E, approved service rights, genuine authorized listings, native device tests, signing, App Store Connect/Play Console approvals. All **unverified** until evidence is recorded.

## Commands

Requires Node.js 22+, npm, supported Android SDK on Linux/Windows/macOS and Xcode 26+ for iOS native builds on macOS. Capacitor 8 supports Android 7+ and iOS 15+.

```sh
npm install
npm test
npm run verify
# Clone original repositories beside this project with GitHub authentication, then:
npm run sync:sources -- --urban=/path/to/-URBAN-ONE --kkubera=/path/to/URBAN-ONE
npm run verify -- --release
npx cap add android
npx cap sync android
# On macOS:
npx cap add ios
npx cap sync ios
```

**Security gate:** the integration GitHub repository must first be **PRIVATE**, otherwise native jobs stop before downloading any private KKUBERA files. A public repository MUST NOT compile or publish a private-module APK as a downloadable artifact.

**GitHub Actions:** add `SOURCE_REPOS_READ_TOKEN` in the integration repository's Actions secrets, using a fine-grained token with **read-only Contents permission** on the private `URBAN-ONE` repository. Do not write the token in source files, chat or build logs. Use workflow `Hybrid native validation` manually. Without the token, combined source/native build is blocked, while isolated shell tests can still pass.

## Security boundaries

- No secret keys in web bundles, no embedded administrator tokens, no bank details.
- No inventory fixtures or mock property listings in distribution.
- No silent publishing, live Stripe charges, AI API calls, banking consent or data uploads.
- KKUBERA's DBRELAY is separate from SEVA DBRELAY; payment flows remain unchanged in the original backends.
- Capacitor WebView is used only for bundled local frontend; independent, verified HTTPS login services require a separate, audited auth/deep-link design before activation.
- Browser-ready shell and code presence do not imply deployed backend services or published stores.

## Tavolo AI Superiore

The new asset-based local superior command board is located at [www/tavolo-ai.html](www/tavolo-ai.html). Technical asset inventory, specialized role routing, 3-level goals and evidence-gated releases. It is **not** yet a live generative model or cloud executor. Details: [docs/TAVOLO-AI-SUPERIORE.md](docs/TAVOLO-AI-SUPERIORE.md).

## Installable GOLDEN AGE PWA + public shell debug APK

Mobile installation instructions: [docs/INSTALL-GOLDEN-AGE.md](docs/INSTALL-GOLDEN-AGE.md). The PWA and APK contain public shell only, NOT private KKUBERA sources or live backend connectors. Android APK is development/debug only.
