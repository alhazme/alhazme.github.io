---
name: ios-ecosystem-library-advisor
description: >
  Advises on and reviews third-party iOS library choices at principal level for
  2026 — DI (Swinject vs manual), reactive (async/await/Observation vs Combine vs
  RxSwift), persistence libraries (Realm deprecation), image (Kingfisher vs
  AsyncImage), animation (Lottie), analytics/crash (Firebase/Sentry) behind
  vendor-agnostic protocols, and testing libraries (Quick/Nimble vs Swift Testing).
  Use when adding/removing a dependency or auditing a dependency list.
version: 1.0.0
tier: library
---

# iOS Ecosystem Library Advisor

## Purpose
Keep the dependency set minimal, current, and replaceable — every library hidden
behind an abstraction and justified against its native alternative.

## Five questions before adding any dependency
1. What problem does it solve?
2. What is the native equivalent now?
3. How active is maintenance / how large the community?
4. What is the build-time / binary-size cost?
5. How hard is it to remove later?

## 2026 status notes (verify against current releases)
| Area | Guidance |
|---|---|
| DI | Manual composition root (compile-checked) for small/medium; Swinject for large graphs |
| Reactive | async/await + Observation first; Combine for debounce/merge; RxSwift mostly legacy |
| Persistence | SwiftData/Core Data; **Realm deprecated by MongoDB, Device Sync EOL Sep 2025 — avoid for new projects** |
| Image | AsyncImage for simple; Kingfisher for image-heavy (cache/downsample/prefetch) |
| Animation | Lottie for delight, measured; native SwiftUI for normal transitions |
| Analytics/Crash | Firebase/Sentry **behind a protocol** |
| Testing | Swift Testing native default; Quick/Nimble for legacy |

## Rules
- MUST evaluate the five questions before adding a dependency.
- MUST wrap vendor SDKs (analytics, crash) behind app-owned protocols.
- MUST NOT choose Realm for new projects (deprecated, sync EOL).
- MUST prefer native (AsyncImage, async/await, Swift Testing) when sufficient.
- SHOULD prefer manual DI over Swinject unless the graph is large.
- SHOULD flag dependencies now replaceable by native APIs for removal.
- SHOULD state uncertainty: library status changes — recommend verifying current releases.

## Checklist
- [ ] Five questions answered for each dependency.
- [ ] Vendor SDKs behind protocols.
- [ ] No Realm in new projects.
- [ ] Native used where sufficient.
- [ ] DI choice matches graph size.
- [ ] Removable (native-replaceable) deps flagged.

## Example findings
```
[WARNING] Persistence/Realm — new project on Realm
MongoDB deprecated Realm; Device Sync EOL Sep 2025. Use SwiftData/Core Data;
keep access behind a Repository so the data layer can migrate in isolation.

[WARNING] Analytics.logEvent(Firebase) called in 80 files
Vendor lock-in. Introduce an AnalyticsTracking protocol; keep Firebase in one impl.

[SUGGESTION] AsyncImage suffices for the single avatar
Drop Kingfisher here; reserve it for the image-heavy product list.
```

## Anti-patterns
| Anti-pattern | Correct |
|---|---|
| Vendor SDK called app-wide | protocol-wrapped, one impl |
| Realm for a new app | SwiftData/Core Data |
| Library where native suffices | native API |
| Swinject for a tiny graph | manual composition root |
| RxSwift for new reactive code | async/await + Observation |

## Handoff
- Networking-specific libraries (Alamofire/Moya) → `ios-networking-stack-architect`.
- DI graph wiring → `ios-modularization-di-architect`.
- Native test framework setup → (Module 13 testing skill).
