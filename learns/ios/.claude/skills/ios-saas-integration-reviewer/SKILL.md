---
name: ios-saas-integration-reviewer
description: >
  Reviews end-to-end iOS SaaS feature integration at principal level — auth/session
  gating, RBAC enforcement (client + server), offline mode with sync queue and
  idempotency, push + deep link routing, file upload, payment (StoreKit 2 vs
  gateway, PCI), and observability behind protocols. Use when building or reviewing
  a production app that combines these features, or auditing where features meet.
version: 1.0.0
tier: integration
---

# iOS SaaS Integration Reviewer

## Purpose
Ensure production features are wired onto clean architecture correctly and that the
dangerous seams (RBAC, offline sync, payment) are handled safely.

## When to use
- Building/reviewing a production SaaS app combining auth, RBAC, offline, push,
  upload, payment, observability.
- Auditing where two features meet (e.g. offline + idempotency, deep link + routing).

## Workflow
1. **Map to layers.** Every feature lives across presentation/domain/data/platform.
2. **Auth/session.** Token in Keychain; refresh; reactive session gating at root.
3. **RBAC.** Enforce in use cases AND server; UI hiding is UX only.
4. **Offline.** Optimistic local write + sync queue + idempotency key + conflict policy.
5. **Push/deep link.** Single `Router.handle(url:)` entry; unit-testable.
6. **Upload.** Multipart + progress + background; validate type/size client+server.
7. **Payment.** StoreKit 2 for digital (Apple policy); gateway for physical; never store PAN.
8. **Observability.** Analytics/crash behind protocols; disabled in tests.
9. **Emit findings** grouped CRITICAL / WARNING / SUGGESTION.

## Rules
- MUST enforce permissions in use cases and on the server, not via UI hiding alone.
- MUST never trust the client for authorization.
- MUST use idempotency keys for queued offline writes; define a conflict policy.
- MUST store tokens in Keychain; never PAN card data on device.
- MUST use StoreKit 2 for digital goods; gateway SDK/tokenization for physical.
- MUST centralize deep link parsing in one testable function.
- MUST wrap analytics/crash SDKs behind protocols.
- SHOULD validate uploads on client and server; report progress via state.

## Checklist
- [ ] RBAC enforced in use case + server.
- [ ] Offline writes idempotent + conflict policy defined.
- [ ] Tokens in Keychain; no PAN stored.
- [ ] Digital → StoreKit 2; physical → gateway.
- [ ] Deep links centralized + testable.
- [ ] Upload validated client + server.
- [ ] Vendor SDKs behind protocols.

## Example findings
```
[CRITICAL] OrderView.swift:40 — refund gated only by hiding the button
Authorization must be enforced in RefundUseCase and on the server. UI hiding is UX,
not security.

[CRITICAL] SyncQueue.swift:18 — queued POST sent without idempotency key
Retry after reconnect can double-create. Attach a client-generated idempotency key.

[CRITICAL] Payment.swift:12 — stores card PAN in model
Puts the app in full PCI scope. Use the gateway SDK/tokenization; never hold PAN.
```

## Anti-patterns
| Anti-pattern | Correct |
|---|---|
| Permission via UI hiding only | Enforce in use case + server |
| Offline queue without idempotency | Idempotency key + conflict policy |
| PAN stored on device | Gateway tokenization |
| Digital goods via external gateway | StoreKit 2 |
| Deep link parsing scattered | Single `Router.handle` |

## Handoff
- Layer boundaries → `ios-architecture-review`.
- Auth refresh/retry internals → `ios-networking-stack-architect`.
- Test coverage of these flows → `ios-test-generator`.
