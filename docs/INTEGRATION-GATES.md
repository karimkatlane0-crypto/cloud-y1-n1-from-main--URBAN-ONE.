# Integration decision register · 2026-10-25

- Repositories inspected: `karimkatlane0-crypto/-URBAN-ONE` (public, source) and `karimkatlane0-crypto/URBAN-ONE` (private, source). Auxiliary repo is lightweight, not a third commercial module.
- User constraint: do not overwrite, merge or expose the original repositories. Retain separate DBRELAY boundaries and payment terms.
- Frontend plan: local copy from the two verified source directories, preserving project assets. New launcher is an independent Capacitor project.
- SEVA AI: project UI exists and test suite is documented, but its live authenticated backend, OpenAI response, subscription checkout and independent origin have not been validated from this hybrid app. Locked.
- KKUBERA: frontend can run offline; catalog entries/visits must only come from approved backend. No seeded inventory, checkout or live Stripe claim.
- CJ/Booking and PSD2: neither live connectivity nor permissions are inferred by presence of adapter code. Locked.
- Apple/Google stores: unverified. Debug Android and simulator iOS are not production distributions.
- Before release: verify native builds, test on Redmi + iPhone, privacy disclosures, consent, external partner contracts, Stripe entitlements and independently approved backend origins.

- SECURITY GATE: auxiliary integration repo is public on 2026-10-25. Until owner changes its visibility to PRIVATE, GitHub Actions native build jobs fail before private source checkout or build artifact upload.
