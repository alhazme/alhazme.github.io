---
name: ios-networking-stack-architect
description: >
  Designs and reviews production iOS networking stacks at principal level —
  URLSession/Alamofire/Moya selection, layered architecture (VM → UseCase →
  Repository → NetworkService → library), Bearer auth with token refresh,
  RequestInterceptor adapt/retry, refresh coalescing, safe retry/backoff, and
  pagination/error modeling. Use when building or reviewing any networking layer,
  auth flow, or retry logic.
version: 1.0.0
tier: library
---

# iOS Networking Stack Architect

## Purpose
Build networking that is layered, library-agnostic, and correct under the hard
cases: token refresh, concurrent 401s, retries, and pagination.

## When to use
- Selecting URLSession vs Alamofire vs Moya.
- Structuring the networking layers.
- Implementing Bearer auth + refresh + interceptor + retry.
- Reviewing retry safety or refresh concurrency.
- Modeling paginated / enveloped / error responses.

## Tool selection
| Need | Tool |
|---|---|
| Standard requests, zero deps | URLSession |
| Interceptors, retry, multipart, monitoring | Alamofire |
| Type-safe endpoint enums, large team | Moya |

## Workflow
1. **Layer.** VM → UseCase → Repository → `NetworkService` (protocol) → library.
2. **Hide the library** behind `NetworkService`; only the impl imports it.
3. **Auth.** Inject Bearer in adapt; on 401, refresh then retry.
4. **Coalesce refresh** via an actor — one in-flight refresh, others await it.
5. **Retry** only idempotent ops, with capped exponential backoff.
6. **Pagination/errors** modeled with Codable; pagination logic in Repository.
7. **Emit findings** grouped CRITICAL / WARNING / SUGGESTION.

## Rules
- MUST NOT call the networking library from ViewModels.
- MUST hide the library behind a protocol returning domain/Foundation types.
- MUST coalesce concurrent token refreshes (no refresh storm).
- MUST cap retries and use backoff; retry only idempotent operations.
- MUST NOT blindly retry POST (use server idempotency keys).
- MUST keep pagination/cache logic in the Repository, not the ViewModel.
- SHOULD default to URLSession for small/solo projects.

## Coding standard
| Concern | Standard |
|---|---|
| Boundary | `NetworkService` protocol, domain types |
| Auth | adapt injects Bearer; retry on 401 after refresh |
| Refresh | actor-coalesced, single in-flight |
| Retry | capped + backoff, idempotent only |
| Pagination | cursor/page modeled; merged in Repository |

## Checklist
- [ ] No library calls in ViewModels.
- [ ] Library hidden behind protocol.
- [ ] Refresh coalesced via actor.
- [ ] Retry capped, backoff, idempotent-only.
- [ ] POST not blindly retried.
- [ ] Pagination logic in Repository.

## Example findings
```
[CRITICAL] AuthInterceptor.swift:22 — refreshes token per failed request
10 concurrent 401s → 10 refreshes (refresh storm + token race). Coalesce with an
actor holding a single in-flight refresh task.

[CRITICAL] PaymentRepo.swift:14 — retries POST /charge on timeout
Non-idempotent retry risks double charges. Require a server idempotency key.

[WARNING] OrdersVM.swift:8 — `AF.request(...)` in ViewModel
Library leaks into presentation. Route through a NetworkService protocol.
```

## Anti-patterns
| Anti-pattern | Correct |
|---|---|
| Alamofire types in Repository protocol | domain types only |
| Refresh per 401 | actor-coalesced refresh |
| Unbounded retry | capped + backoff |
| Retry POST blindly | idempotency key |
| Pagination in ViewModel | pagination in Repository |

## Handoff
- Library choice trade-offs (Swinject, etc.) → `ios-ecosystem-library-advisor`.
- Token storage (Keychain) → `ios-networking-persistence-auditor`.
- Refresh actor concurrency → `swift-concurrency-auditor`.
