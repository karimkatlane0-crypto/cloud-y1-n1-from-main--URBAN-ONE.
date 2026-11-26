# ALL-IN-ONE integration execution contract

Status: isolated integration shell; NOT a production release.

## Repository boundaries
- This repository is the public-shell/native wrapper only.
- URBAN ONE Enterprise and KKUBERA remain source repositories with separate backends, databases, tenant namespaces, credentials and payment ledgers.
- SEVA remains backend-gated; do not represent a shell route as a working authenticated service.
- Cross-project navigation uses public module metadata and explicit HTTPS hand-off only. No customer records, tokens, webhook secrets, payment state or private source code are copied into this repository.

## Build and verification
- Every branch build runs shell tests, static verification and a public-only Android debug build.
- The combined private-source bundle remains BLOCKED until the repository is made private by its owner and a read-only source token is configured in Actions secrets.
- The private-source workflow must never run against a public repository. No credentials are committed or printed.
- Debug APKs are test artifacts only; no store signing or publication.

## Release gate
A future candidate requires exact source commit SHAs, source permission checks, frontend provenance, two-account auth/tenant tests, mobile device tests, backup/restore evidence and independent review. Production deployment, customer-data transfer and LIVE payments require separate authorization.
