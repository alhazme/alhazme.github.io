---
name: swift-protocol-api-designer
description: >
  Designs and reviews protocol-oriented Swift APIs at principal level. Use when
  defining a new protocol/abstraction (Repository, Service, UseCase, DataSource),
  choosing between generics / `some` / `any`, deciding constraints, or refactoring
  a class-inheritance hierarchy into protocol composition. Targets Swift 6.4.
version: 1.0.0
tier: foundation
---

# Swift Protocol & API Designer

## Purpose
Produce Swift abstractions that are reusable, type-safe, and cost-aware. Enforce
protocol-oriented design over class inheritance, and force a deliberate choice
between zero-cost (generics / opaque) and flexible (existential) abstraction.

## When to use
- Defining a protocol that will have multiple conformers (Repository, Service, Mapper).
- A function signature uses a bare protocol type and you must decide `some` vs `any`.
- Reviewing code that uses `class` inheritance for shared behavior.
- Generic code fails to compile due to missing/over-tight constraints.
- Migrating pre-Swift-5.7 PAT code to primary associated types.

## Workflow
1. **Identify the abstraction boundary.** What varies? What stays fixed? Name the
   single responsibility of the protocol.
2. **Choose the mechanism** using the decision rule below — default to the cheapest
   that satisfies the requirement.
3. **Apply minimal-sufficient constraints.** Constrain to capability protocols
   (`Equatable`, `Hashable`, `Sendable`), never to concrete types.
4. **Push shared behavior into protocol extensions** as default implementations.
5. **Verify cost.** Flag every `any` and justify why heterogeneity is required.
6. **Emit per-issue findings** (severity-tagged), not a prose essay.

## Decision rule — some vs any vs generic
| Need | Use |
|---|---|
| One concrete type, hidden from caller, zero cost | `some P` (opaque return) |
| One algorithm over many types, known at compile time | generic `<T: P>` |
| Heterogeneous storage / runtime-chosen type | `any P` (existential) |
| Lightweight constraint on associated type | primary associated type `some P<X>` |

## Rules
- MUST mark existentials explicitly with `any` (Swift 6 language mode).
- MUST prefer `some`/generics; treat each `any` as a justified exception.
- MUST NOT introduce a base class purely to share methods — use a protocol extension.
- MUST give protocols a single responsibility; compose via protocol inheritance.
- MUST choose the loosest constraint that still compiles the body.
- SHOULD expose a primary associated type when conformers parameterize one type.
- SHOULD keep protocol requirements minimal; move conveniences to extensions.

## Coding standard
| Concern | Standard |
|---|---|
| Abstraction default | Generics / `some` first; `any` only for heterogeneity |
| Shared behavior | Protocol extension default implementation |
| Constraint target | Capability protocol, not concrete type |
| Naming | Capability protocols as adjectives (`Loadable`), role protocols as nouns (`Repository`) |
| Error surface | `throws` for inline; `Result` only when error becomes a value |

## Checklist (run before approving an API)
- [ ] Every existential is written `any` and justified.
- [ ] No base class used only for code sharing.
- [ ] Constraints are minimal-sufficient.
- [ ] Default behavior lives in protocol extensions, not duplicated.
- [ ] Primary associated type used where one type is parameterized.
- [ ] Protocol has a single, nameable responsibility.

## Example finding
```
[WARNING] PaymentService.swift:14 — `func handler() -> any EventHandler`
Returns existential but every call site uses one concrete type. Use opaque return
to remove boxing + dynamic dispatch.
Fix: func handler() -> some EventHandler
```

## Anti-patterns
| Anti-pattern | Why it's wrong | Correct |
|---|---|---|
| `class BaseViewModel` inherited everywhere | OOP drift, value types excluded | Small protocols + extensions |
| `[Any]` / bare protocol type | Hidden boxing cost, lost type info | `[any P]` only if heterogeneous, else generic |
| Over-constrained generic (`<T: ConcreteType>`) | Kills reusability | Constrain to capability protocol |
| Protocol with 12 requirements | God-protocol, hard to conform | Split + compose |

## Handoff
- Concurrency-sensitive members (`@Sendable`, actor isolation) → `swift-concurrency-auditor`.
- Implementation review of conformers → `swift-code-review`.
