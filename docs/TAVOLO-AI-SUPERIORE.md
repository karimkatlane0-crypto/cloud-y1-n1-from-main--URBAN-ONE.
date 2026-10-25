# TAVOLO AI SUPERIORE — Control plane asset-based

Architecture: original repositories remain separate. The top “table” is an offline command UI; the legs are URBAN ONE enterprise, private KKUBERA, SEVA and security/consent controls.

## Delivered in this branch
- Superior table: `www/tavolo-ai.html`, accessible from hybrid home.
- Inspected source/technical asset catalogue: `www/tavolo-core.js`. Inventory metadata is not an IP-title certificate, capital valuation or licensed partner permission.
- Goal board: 3 subgoal levels, specialist role routing, 5 gates GOAL → INTEGRATE → VERIFY → VALIDATE → RELEASE, manually entered evidence.
- Local-only storage and JSON export; explicit guard against declaring a goal verified without evidence.
- Unit tests: `node --test tests/tavolo.test.mjs`.

## Important limitations
This is a deterministic planning layer, **not** a connected generative AI model or autonomous agent. No real-model inference or API authentication. No live OpenAI/Claude/Gemini/xAI response has been proven here.

Separate DBRELAY (KKUBERA vs SEVA), Stripe billing, Booking/CJ and PSD2 access require authenticated backends, signed permissions, user consent, reconciliation and E2E tests. No live payments, commissions, offers, logins or financial transactions are enabled.

The auxiliary GitHub integration repo is public; **never** bundle private KKUBERA sources/artifacts into public workflow outputs. Change integration visibility to private first and add fine-grained private source read token in GitHub Secrets. Native release signing and Apple/Google store approvals are not verified. LocalStorage is not encrypted: never store private keys or sensitive records in goals.

## Next level (not yet implemented)
Private server-side AI orchestrator, user login and explicit agent approval policies, read-only source adapters, retrieval with provenance, tests on Android/iPhone, model evals, metrics and rollback. All actions require approval before execution.
