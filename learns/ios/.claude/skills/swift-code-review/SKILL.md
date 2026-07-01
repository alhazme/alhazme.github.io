---
name: swift-code-review
description: >
  Review Swift source code at staff/principal engineer level, enforcing Swift 6.4
  language-mode idioms, value-semantics correctness, optional safety, error-handling
  discipline, and concurrency-safe foundations. Use whenever a user asks to "review my
  Swift code", "check this Swift file", "audit this struct/class/enum", pastes Swift code
  for feedback, or requests a foundation-level quality gate before merge. Posts one
  actionable finding per issue (file:line, problem, why it matters, exact fix) grouped by
  severity — never a single wall-of-text verdict. Anchored to Swift 6.4 (WWDC 2026),
  Swift 6 language mode with data-race safety, and main-actor-by-default app targets.
version: 1.0.0
baseline: Swift 6.4 · Xcode 27 · iOS 27 · Swift 6 language mode
---

# Skill: Swift Code Review (Foundation Tier)

## 1. Purpose

Operate as a **staff/principal iOS engineer reviewing Swift code**. The goal is not to
rewrite the author's solution but to raise every issue that a rigorous senior reviewer
would flag at a top-tier Apple-ecosystem team, with the **exact fix** attached to each.

This tier covers **language foundations** — type system, optionals, value vs reference
semantics, enums/state modeling, functions/closures, and error handling. Architecture,
SwiftUI, concurrency depth, testing, and performance are handled by sibling skills
(`ios-architecture-review`, `swiftui-component-generator`, `ios-performance-analyzer`,
`ios-test-generator`) and referenced — not duplicated — here.

## 2. When to Use

Trigger this skill when ANY of these is true:

- The user asks to review, audit, critique, or "check" Swift code.
- Swift code is pasted with an implicit request for feedback.
- A merge/PR gate on `.swift` files is requested.
- The user asks "is this idiomatic Swift?" or "is this production-grade?".

Do NOT use this skill for: pure SwiftUI layout review, full architecture audits,
test-suite generation, or Instruments/performance profiling — defer to the sibling skill
and say so explicitly.

## 3. Workflow

1. **Identify the unit.** Determine what the code is (model, service, view model, util)
   and its intended responsibility. State it in one line. If responsibility is unclear,
   flag that as the first finding (a unit without a clear job is itself a smell).
2. **Static pass — severity-ordered.** Scan for issues in this order: correctness/safety
   → semantics → error handling → API design → style. Stop reframing; if the code as
   written has a defect, report it as written.
3. **Tag each finding** with severity: `CRITICAL` (crash/data-loss/data-race),
   `WARNING` (latent bug, fragile invariant, semantic mismatch), `SUGGESTION` (idiom,
   readability, API polish).
4. **Attach an exact fix** to every finding — corrected code, not prose advice.
5. **Group output by severity.** One finding per issue. Never collapse into a paragraph.
6. **Close with a verdict line:** `APPROVE`, `APPROVE WITH NITS`, or `REQUEST CHANGES`,
   plus the single highest-leverage change.

## 4. Rules (non-negotiable)

- **No silent reframing.** If a request would require ignoring a real defect to look
  clean, report the defect. Past approval is never a reason to pass a new defect.
- **Every `!` is guilty until proven innocent.** Force-unwrap and implicitly-unwrapped
  optionals (`T!`) are `CRITICAL` unless accompanied by a proven invariant comment.
- **Default to `struct`.** A `class` used where a value type suffices is a `WARNING`.
  Require `class` only for identity, deliberate shared mutable state, ObjC/UIKit interop,
  or managed lifecycle.
- **Illegal states must be unrepresentable.** Boolean-flag combinations that admit
  invalid states (`isLoading` + `error` + `data`) are a `WARNING`; recommend an enum.
- **`let` by default.** Flag any `var` that is never mutated.
- **`guard` for early validation.** Nested `if let` pyramids are a `SUGGESTION` to flatten.
- **Errors are typed values, not strings.** `throw NSError(...)` or stringly-typed errors
  are a `WARNING`; recommend an `Error`-conforming enum.
- **No `throws` for programmer errors.** Logic invariants use `precondition`/`assert`,
  not catchable errors.
- **Concurrency-aware even at foundation tier.** Mutable reference type shared across
  isolation domains without `actor`/Sendable reasoning is `CRITICAL` under Swift 6 mode.
  Capture of `self` in escaping closures without `[weak self]` justification is `WARNING`.
- **Cite Swift 6.4 idioms where relevant:** `if let x {}` shorthand, typed throws (only
  when the error set is closed), async `defer` (SE-0493) for async cleanup.

## 5. Coding Standard Enforced

| Area | Standard |
|---|---|
| Immutability | `let` first; `private(set)` for read-only-outside mutable state |
| Optionals | `guard let` / `if let` shorthand / `??`; zero unjustified `!` |
| Value semantics | `struct` for models/DTO/state; `class` only when justified |
| State modeling | enum + associated values; no flag-combination state |
| Error handling | `Error`-conforming enum; `do/catch`; `try?` only where nil is meaningful |
| API design | Argument labels read at call-site; no abbreviation soup |
| Naming | UpperCamelCase types, lowerCamelCase members, no Hungarian/prefix noise |
| Access control | Most restrictive that compiles; `private` by default |
| Closures | `[weak self]` for escaping captures of class instances |

## 6. Review Checklist

- [ ] Unit has one clear responsibility (stated).
- [ ] No force-unwrap / IUO without proven invariant.
- [ ] `struct` vs `class` choice justified; default is `struct`.
- [ ] No `var` that is never mutated; `let`-first applied.
- [ ] State modeled with enums; no illegal-state flag combinations.
- [ ] Optionals handled via `guard`/`if let`/`??`, validation early.
- [ ] Errors are `Error`-conforming types; recoverable vs programmer error separated.
- [ ] No retain cycle risk from escaping closures capturing `self`.
- [ ] Access control is least-privilege.
- [ ] Argument labels make call-sites read naturally.
- [ ] No deprecated patterns (manual `DispatchQueue` for state, `NSError` literals,
      pre-`if let`-shorthand binding noise) without migration note.

## 7. Examples

### Example finding format (one per issue)

```
[CRITICAL] PaymentService.swift:42 — Force-unwrap on dictionary lookup
  Problem: `let user = users[id]!` crashes when `id` is absent.
  Why: Dictionary subscript is inherently Optional; production traffic will hit nil.
  Fix:
      guard let user = users[id] else { return .failure(.unknownUser) }
```

```
[WARNING] Cart.swift:8 — Reference type used for a value model
  Problem: `class Cart { var items: [Item] }` is shared on assignment, inviting
           mutation from unexpected call-sites.
  Why: Cart is a value model with no identity requirement.
  Fix: Convert to `struct Cart { var items: [Item] }`; callers needing mutation use `var`.
```

```
[WARNING] ViewState.swift:3 — Illegal states representable
  Problem: `var isLoading: Bool; var error: Error?; var data: [Order]?` admits
           (isLoading == true && error != nil).
  Why: Combinations encode states that must never occur.
  Fix:
      enum ViewState { case loading; case loaded([Order]); case failed(Error) }
```

### Good full-review skeleton

```
Unit: `PaymentService` — charges a balance and returns a receipt.

CRITICAL
  1. [PaymentService.swift:42] Force-unwrap on dictionary lookup → guard let.

WARNING
  2. [PaymentService.swift:17] `class` where `struct` suffices → convert.
  3. [PaymentService.swift:55] Escaping closure captures `self` strongly → [weak self].

SUGGESTION
  4. [PaymentService.swift:31] `if let` pyramid → flatten with `guard`.

Verdict: REQUEST CHANGES — fix #1 first (crash on missing user).
```

## 8. Anti-Patterns To Flag

| Anti-pattern | Replace with |
|---|---|
| `value!` / `var x: T!` (unjustified) | `guard let` / `if let` / `??` |
| `class` for a pure data model | `struct` |
| `isLoading` + `error` + `data` flags | single `enum` state |
| `throw NSError(domain:...)` | `enum MyError: Error` |
| `try!` outside tests/proven invariants | `do/catch` or `try?` |
| Escaping closure captures `self` strongly | `[weak self] in guard let self` |
| `DispatchQueue.main.async` to mutate view state | `@MainActor` / main-actor-by-default |
| `if let token = token { }` (binding noise) | `if let token { }` (Swift 5.7+) |
| `var` never mutated | `let` |
| Stringly-typed status (`status == "ok"`) | enum with raw value |

## 9. Handoff

After review, if findings extend beyond foundations, name the sibling skill that owns it:
architecture/boundaries → `ios-architecture-review`; view composition → 
`swiftui-component-generator`; allocation/main-thread cost → `ios-performance-analyzer`;
missing coverage → `ios-test-generator`. Do not improvise those reviews here.
