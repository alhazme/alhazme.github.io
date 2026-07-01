---
name: ios-modularization-di-architect
description: >
  Designs and reviews iOS modularization and dependency injection at principal
  level — SPM local package structure, public-API boundaries, dependency direction
  (no circular / cross-feature imports), constructor injection, composition root,
  and the Repository pattern. Use when splitting an app into modules, wiring DI,
  setting up a composition root, or reviewing module dependency graphs.
version: 1.0.0
tier: architecture
---

# iOS Modularization & DI Architect

## Purpose
Make a large codebase buildable, ownable, and reusable across clients by splitting
it into well-bounded SPM modules wired through clean dependency injection.

## When to use
- Splitting an app into SPM local packages.
- Designing or reviewing module dependency direction.
- Setting up a composition root / DI container.
- Reviewing Repository implementations and cache strategy placement.

## Workflow
1. **Module map.** Core (networking, persistence, design system) → Domain → Features.
2. **Boundaries.** Expose only `public` API; keep internals hidden.
3. **Direction.** Features → Domain → Core; features never import features.
4. **Isolation.** UI modules `.defaultIsolation(MainActor.self)`; logic modules nonisolated.
5. **DI.** Constructor injection of protocols; assemble graph in composition root.
6. **Repository.** Hide data source; centralize cache/offline strategy.
7. **Emit findings** grouped CRITICAL / WARNING / SUGGESTION.

## Rules
- MUST flow dependencies Features → Domain → Core, never reversed.
- MUST NOT let one feature import another feature directly.
- MUST expose cross-feature needs via shared protocols in Domain/Core.
- MUST prefer constructor injection; avoid global singletons as primary DI.
- MUST assemble the dependency graph in a single composition root.
- MUST keep cache/offline strategy inside the Repository, not ViewModels.
- SHOULD set package isolation intentionally (MainActor for UI modules).
- SHOULD keep only `public` what is genuinely part of the module API.

## Coding standard
| Concern | Standard |
|---|---|
| Module deps | path-based SPM packages, inward direction |
| Boundary | `public` API only |
| DI | constructor injection of protocols |
| Assembly | composition root near entry point |
| Data access | Repository hides source + cache |

## Checklist
- [ ] Features depend on Domain/Core, not each other.
- [ ] No circular dependencies.
- [ ] Cross-feature needs via shared protocol.
- [ ] Constructor injection; no singleton-as-DI.
- [ ] Graph assembled in composition root.
- [ ] Cache/offline logic inside Repository.
- [ ] Package isolation set intentionally.

## Example findings
```
[CRITICAL] FeatureOrders/Cart.swift:3 — `import FeatureAuth`
Cross-feature import → circular risk, broken independence. Depend on an
`AuthStateProviding` protocol in Core; inject the impl at the composition root.

[WARNING] OrderViewModel.swift:9 — `OrderRepositoryImpl(network: .init())`
Self-constructed dependency, not mockable. Inject `OrderRepository` via init.

[SUGGESTION] OrdersVM handles cache-then-network branching
Move cache/offline strategy into the Repository so the ViewModel stays thin.
```

## Anti-patterns
| Anti-pattern | Correct |
|---|---|
| Feature imports feature | Shared protocol in Domain/Core |
| `.shared` singletons as DI | Constructor injection |
| Self-built dependencies | Injected protocols |
| Cache logic in ViewModel | Cache in Repository |
| Everything `public` | Public only the module API |

## Handoff
- Layer/use-case correctness → `ios-architecture-review`.
- Package concurrency isolation → `swift-concurrency-auditor`.
- Library-based DI (Swinject) → (Module 11 ecosystem skill).
