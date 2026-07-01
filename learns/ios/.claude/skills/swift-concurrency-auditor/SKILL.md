---
name: swift-concurrency-auditor
description: >
  Audits Swift concurrency and memory safety at principal level for Swift 6.4 /
  Xcode 27 (Default Actor Isolation = MainActor, Approachable Concurrency, Strict
  Concurrency = Complete). Use when reviewing async/await code, actor isolation,
  Sendable conformance, data-race-safety errors, retain cycles, or when splitting
  code into SPM packages. Emits per-issue findings with fixes.
version: 1.0.0
tier: foundation
---

# Swift Concurrency & Memory Auditor

## Purpose
Catch data races, isolation mistakes, structured-concurrency violations, and
retain cycles before they reach runtime. Calibrated to the Xcode 27 default where
code is MainActor-isolated unless explicitly opted out.

## Baseline assumed
- Default Actor Isolation = **MainActor** (every decl implicitly `@MainActor`).
- Approachable Concurrency = **Yes** (`nonisolated(nonsending)` active — nonisolated
  async inherits caller isolation; `@concurrent` forces the global executor).
- Strict Concurrency = **Complete** (data races are compile errors).
- SPM packages do **not** inherit these defaults; check `defaultIsolation` per target.

## When to use
- Reviewing any `async`/`await`, `Task`, `actor`, or `@MainActor` code.
- A data-race-safety / Sendable compile error needs a correct (not suppressed) fix.
- Heavy CPU work may be blocking the main actor.
- A `class` with stored mutable state crosses isolation boundaries.
- Suspected retain cycle (closure stored on `self`, delegate kept strong).
- Moving code into an SPM package and isolation behavior changes.

## Workflow
1. **Map isolation.** For each declaration, state its actor (MainActor by default,
   or `nonisolated` / `@concurrent` / custom actor).
2. **Trace every `await`.** Mark it a suspension point; check no invariant is assumed
   to survive it (actor reentrancy).
3. **Check Sendability** of every value crossing an isolation boundary.
4. **Check structure.** No leaked tasks; cancellation honored; `Task.detached`
   justified.
5. **Check offloading.** CPU-bound work marked `@concurrent`, not left on MainActor.
6. **Check memory.** Stored escaping closures capturing `self` use `[weak self]`.
7. **Emit findings** grouped CRITICAL / WARNING / SUGGESTION.

## Rules
- MUST NOT silence a data-race error with `@unchecked Sendable` unless real
  synchronization (lock) plus a justification comment exists.
- MUST re-verify state after each `await` inside an actor (reentrancy).
- MUST mark CPU-bound async work `@concurrent`; never block MainActor.
- MUST use structured concurrency (`async let`, task groups) over detached tasks.
- MUST honor cancellation in loops (`try Task.checkCancellation()`).
- MUST use `[weak self]` for escaping closures stored on the owning object.
- SHOULD set `.defaultIsolation(MainActor.self)` on SPM targets that hold UI/state.
- SHOULD prefer `actor` over manual `NSLock`/serial-queue synchronization.

## Coding standard
| Concern | Standard |
|---|---|
| UI / view-model state | MainActor (default), no manual `DispatchQueue.main` |
| Shared mutable state | `actor`, not lock-guarded class |
| CPU-bound async | `@concurrent` to reach the global executor |
| Cross-domain value | `Sendable`; closures `@Sendable` |
| Async bridging legacy | `withCheckedThrowingContinuation`, resume exactly once |
| Reference cycles | `[weak self]` on stored closures; `weak`/`unowned` deliberately |

## Checklist
- [ ] Every `await` examined for reentrancy.
- [ ] No `@unchecked Sendable` without real synchronization.
- [ ] CPU-bound work offloaded with `@concurrent`.
- [ ] No leaked / unjustified `Task.detached`.
- [ ] Cancellation honored in long loops.
- [ ] Continuations resumed exactly once on all paths.
- [ ] Stored escaping closures use `[weak self]`.
- [ ] SPM target isolation set intentionally.

## Example findings
```
[CRITICAL] BalanceStore.swift:22 — `if cache[id] == nil { let v = await fetch(id); cache[id] = v }`
Actor reentrancy: another task may populate cache during the await. Re-check after
suspension or track an in-flight task.

[CRITICAL] Sync.swift:8 — `final class Box: @unchecked Sendable { var items = [] }`
Suppresses data-race checking without synchronization. Convert to `actor`, or add a
lock and document the invariant.

[WARNING] Import.swift:31 — `func parse(_ d: Data) async -> [Row]` runs on MainActor
Heavy parse blocks UI. Mark `@concurrent` to run on the global executor.

[SUGGESTION] Feed.swift:14 — stored closure `onRefresh = { self.reload() }`
Retain cycle. Use `{ [weak self] in self?.reload() }`.
```

## Anti-patterns
| Anti-pattern | Correct |
|---|---|
| `DispatchQueue.main.async { self.x = y }` | MainActor isolation (default) |
| `@unchecked Sendable` to mute errors | `actor` or real lock + justification |
| `Task.detached` as default | structured `Task {}` / `async let` |
| Two serial `await` calls that could be parallel | `async let` both, await together |
| `unowned` "to be safe" | `weak` unless lifetime is guaranteed |

## Handoff
- Protocol/API shape of the audited type → `swift-protocol-api-designer`.
- Broad implementation review → `swift-code-review`.
- Deep memory-graph / Instruments work → (Module 15 performance skill).
