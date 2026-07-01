---
name: ios-networking-persistence-auditor
description: >
  Audits the iOS data layer at principal level for iOS 27 — URLSession async
  networking, Codable modeling, HTTP/error validation, Keychain secure storage,
  SwiftData/Core Data persistence choice, and background tasks. Use when reviewing
  any networking call, model decoding, credential storage, local database code, or
  background sync. Emits per-issue findings with fixes.
version: 1.0.0
tier: foundation
---

# iOS Networking & Persistence Auditor

## Purpose
Catch insecure storage, unvalidated responses, fragile decoding, wrong persistence
choices, and background-task misuse before they ship.

## When to use
- Reviewing URLSession / Codable / error handling code.
- Credential or token storage of any kind.
- Choosing or reviewing SwiftData vs Core Data.
- Background refresh / upload / sync implementations.
- A "decode error" that is actually a non-2xx response.

## Workflow
1. **Transport.** Async URLSession; request has method, headers, body as needed.
2. **Validation.** HTTP status checked before any decode; typed error domain.
3. **Decoding.** Codable with deliberate key/date strategy; `Decimal` for money.
4. **Secrets.** Tokens in Keychain with `...ThisDeviceOnly`; never UserDefaults/plist.
5. **Persistence choice.** Mechanism matches data nature (see matrix).
6. **Layering.** URLSession not called directly from ViewModel; behind a protocol.
7. **Background.** Identifier registered; `expirationHandler` set; `setTaskCompleted`.
8. **Emit findings** grouped CRITICAL / WARNING / SUGGESTION.

## Persistence decision matrix
| Data | Use |
|---|---|
| Tokens, credentials, keys | Keychain (`...ThisDeviceOnly`) |
| Light non-sensitive flags | UserDefaults |
| Files, large caches | FileManager (Documents/Caches) |
| Relational / object graph | SwiftData (new SwiftUI) or Core Data (complex/migration/public CloudKit) |

## Rules
- MUST validate HTTP status before decoding.
- MUST store credentials in Keychain, never UserDefaults/plist.
- MUST use a typed error domain, not bare `Error`, at the service boundary.
- MUST use `Decimal` (not `Double`) for monetary values.
- MUST NOT call URLSession directly from ViewModel — hide behind a protocol.
- MUST set `expirationHandler` and call `setTaskCompleted` in background tasks.
- SHOULD wrap SwiftData/Core Data behind a Repository so business logic is framework-agnostic.
- SHOULD pick key/date decoding strategy explicitly and consistently.

## Coding standard
| Concern | Standard |
|---|---|
| HTTP | `try await session.data(for:)`, status validated |
| Errors | typed enum: `.unauthorized/.notFound/.server/.decoding` |
| Money | `Decimal` |
| Tokens | Keychain, `kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly` |
| New local DB | SwiftData `@Model`/`@Query`, behind Repository |
| Background | BGTaskScheduler + expiration + completion |

## Checklist
- [ ] Status validated before decode.
- [ ] Tokens in Keychain, device-only.
- [ ] Typed error domain at boundary.
- [ ] `Decimal` for money.
- [ ] URLSession behind a protocol, mockable.
- [ ] Persistence mechanism matches data nature.
- [ ] Background task completes + honors expiration.

## Example findings
```
[CRITICAL] Auth.swift:20 — `UserDefaults.standard.set(token, forKey: "jwt")`
Token in plaintext UserDefaults (readable via backup). Move to Keychain with
`...ThisDeviceOnly`.

[CRITICAL] API.swift:33 — decodes body without checking response
A 401/500 will surface as a misleading decoding error. Call `validate(resp)` first.

[WARNING] Order.swift:7 — `let total: Double`
Floating-point money loses precision. Use `Decimal`.

[SUGGESTION] OrdersVM.swift:12 — `URLSession.shared.data(...)` in ViewModel
Couples UI to transport. Inject a `NetworkService` protocol for testability.
```

## Anti-patterns
| Anti-pattern | Correct |
|---|---|
| Token in UserDefaults/plist | Keychain device-only |
| Decode then check status | Validate status first |
| `Double` for currency | `Decimal` |
| URLSession in ViewModel | protocol-abstracted service |
| Background task without completion | set expiration + `setTaskCompleted` |

## Handoff
- Auth refresh / interceptor / retry layering → (Module 10 networking-stack skill).
- Repository & layer boundaries → (Module 8–9 architecture skills).
- Concurrency of `@ModelActor` / async calls → `swift-concurrency-auditor`.
