---
name: ios-architecture-review
description: >
  Reviews iOS app architecture at principal level — MVC/MVVM/Clean/VIPER/TCA fit,
  layer separation, the Clean Architecture dependency rule, dependency inversion,
  use-case placement, and Massive View/ViewModel detection. Use when reviewing how
  a feature is structured, choosing an architecture for a project, or auditing
  layer boundaries and business-logic placement.
version: 1.0.0
tier: architecture
---

# iOS Architecture Review

## Purpose
Ensure business logic is testable, framework-independent, and placed in the right
layer — and that the chosen architecture matches the product's complexity rather
than fashion.

## When to use
- Reviewing a feature's structure (where logic, networking, state live).
- Choosing an architecture for a new project.
- Auditing layer boundaries / dependency direction.
- Diagnosing a Massive View Controller / Massive ViewModel.

## Workflow
1. **Detect bloat.** Flag Views/ViewModels that network, parse, store credentials, or navigate.
2. **Check layers.** Domain (entities, use cases, repository protocols) imports no framework.
3. **Check dependency rule.** All dependencies point inward to Domain.
4. **Check inversion.** Repository protocols in Domain; implementations in Data.
5. **Check use-case placement.** Business rules in use cases, not Views/Repositories.
6. **Check fit.** Architecture weight matches team size + complexity (matrix below).
7. **Emit findings** grouped CRITICAL / WARNING / SUGGESTION.

## Architecture fit matrix
| Pattern | Use when |
|---|---|
| MVVM | Small–medium, SwiftUI + Observation (modern default) |
| MVVM + Clean | Medium–large; testable domain + framework independence (enterprise sweet spot) |
| VIPER | Large team, complex stable modules, very strict boundaries |
| TCA | Large modular app, state predictability + composition, team invests in learning |

## Rules
- MUST keep Domain free of SwiftUI/UIKit/URLSession/SwiftData imports.
- MUST point all dependencies inward (Dependency Rule).
- MUST define repository protocols in Domain, implementations in Data.
- MUST place business rules in use cases, not Views or Repositories.
- MUST inject ViewModel dependencies (no self-construction).
- SHOULD prefer MVVM+Clean as default; escalate to TCA/VIPER only on real need.
- SHOULD NOT over-engineer small apps with heavy patterns.

## Coding standard
| Concern | Standard |
|---|---|
| Domain purity | No framework imports |
| Dependency rule | Inward to Domain |
| Inversion | Protocol in Domain, impl in Data |
| Business rules | Use cases |
| ViewModel deps | Constructor-injected protocols |

## Checklist
- [ ] No networking/parsing/credential/navigation in View/ViewModel.
- [ ] Domain imports no framework.
- [ ] Dependencies point inward.
- [ ] Repository protocols in Domain.
- [ ] Business rules in use cases.
- [ ] Architecture weight matches complexity.

## Example findings
```
[CRITICAL] CheckoutViewModel.swift:14 — calls URLSession + decodes JSON
Massive ViewModel. Move transport to NetworkService, mapping to a DTO in the data
layer, and call a use case from the ViewModel.

[WARNING] Domain/Order.swift:2 — `import SwiftUI`
Domain must be framework-free. Remove the import; move UI concerns to presentation.

[WARNING] OrderRepository defined in Data layer
Inversion broken. Declare the protocol in Domain; keep only the impl in Data.
```

## Anti-patterns
| Anti-pattern | Correct |
|---|---|
| Massive View Controller/ViewModel | Extract use cases + repository |
| `import SwiftUI` in Domain | Framework-free Domain |
| Repository protocol in Data | Protocol in Domain |
| Business rule in View | Rule in use case |
| TCA/VIPER on a 5-screen app | MVVM(+Clean) |

## Handoff
- Module split & DI wiring → `ios-modularization-di-architect`.
- SwiftUI state mechanics → `swiftui-component-generator`.
- Service protocol shape → `swift-protocol-api-designer`.
