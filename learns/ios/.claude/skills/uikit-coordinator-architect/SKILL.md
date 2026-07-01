---
name: uikit-coordinator-architect
description: >
  Builds and reviews UIKit code and SwiftUI/UIKit interop at principal level for
  iOS 27 — UIViewController lifecycle correctness, programmatic Auto Layout,
  diffable data sources + compositional layout, the Coordinator pattern for
  navigation, and two-way bridging (UIViewRepresentable / UIHostingController).
  Use when writing or reviewing UIKit screens, list views, navigation, or
  incremental SwiftUI migration.
version: 1.0.0
tier: ui
---

# UIKit & Coordinator Architect

## Purpose
Keep UIKit code lifecycle-correct, layout-safe, crash-free in list updates, and
navigation-decoupled — and bridge cleanly to SwiftUI for incremental migration.

## When to use
- Writing/reviewing a `UIViewController` or UIKit list.
- Navigation logic living inside view controllers.
- Migrating a UIKit app toward SwiftUI screen-by-screen.
- Wrapping UIKit views into SwiftUI or hosting SwiftUI in UIKit.

## Workflow
1. **Lifecycle.** One-time setup in `viewDidLoad`; refresh in `viewWillAppear`;
   analytics in `viewDidAppear`; teardown in `viewWillDisappear`.
2. **Layout.** Programmatic anchors; `translatesAutoresizingMaskIntoConstraints = false`;
   add to hierarchy before activating; respect `safeAreaLayoutGuide`.
3. **Lists.** Diffable data source + snapshots; items `Hashable`; compositional layout for grids.
4. **Navigation.** Extract into a Coordinator; VCs emit events (closure/delegate), never push directly.
5. **Interop.** `UIViewRepresentable` for UIKit-in-SwiftUI; `UIHostingController` for SwiftUI-in-UIKit.
6. **Emit findings** grouped CRITICAL / WARNING / SUGGESTION.

## Rules
- MUST put one-time setup in `viewDidLoad`, dynamic refresh in `viewWillAppear`.
- MUST set `translatesAutoresizingMaskIntoConstraints = false` on manually constrained views.
- MUST add views to the hierarchy before activating constraints.
- MUST use `safeAreaLayoutGuide` for screen-edge constraints.
- MUST use diffable data sources for new list code.
- MUST keep navigation in a Coordinator; VCs expose events, not transitions.
- SHOULD migrate UIKit→SwiftUI screen-by-screen via `UIHostingController`, not big rewrites.
- SHOULD use `[weak self]` in coordinator/VC event closures.

## Coding standard
| Concern | Standard |
|---|---|
| One-time setup | `viewDidLoad` |
| Data refresh | `viewWillAppear` |
| Layout | programmatic anchors + safe area |
| Lists | diffable data source + snapshot |
| Navigation | Coordinator owns transitions |
| Interop | Representable / HostingController |

## Checklist
- [ ] Work placed in correct lifecycle callback.
- [ ] `translatesAutoresizing... = false` set; safe area used.
- [ ] Views added before constraint activation.
- [ ] Diffable data source for lists; items Hashable.
- [ ] Navigation extracted to Coordinator.
- [ ] Interop via Representable/HostingController.

## Example findings
```
[WARNING] OrderListVC.swift:18 — table view setup in viewWillAppear
Rebuilds subviews on every appearance. Move one-time setup to viewDidLoad.

[CRITICAL] ProfileVC.swift:40 — `present(EditVC(), animated: true)` inside VC
Navigation coupled to the VC. Expose `onEdit: (() -> Void)?` and let the
Coordinator perform the transition.

[WARNING] Cell.swift:7 — label constrained without translatesAutoresizing flag
Constraints will be ignored. Set `translatesAutoresizingMaskIntoConstraints = false`.
```

## Anti-patterns
| Anti-pattern | Correct |
|---|---|
| Setup in `viewWillAppear` | one-time in `viewDidLoad` |
| Classic dataSource/delegate for new lists | diffable data source |
| VC calls `push`/`present` itself | Coordinator owns navigation |
| Constrain to `view` ignoring notch | `safeAreaLayoutGuide` |
| Full UIKit→SwiftUI rewrite | screen-by-screen via HostingController |

## Handoff
- SwiftUI side of the bridge → `swiftui-component-generator`.
- Retain cycles in closures/delegates → `swift-concurrency-auditor`.
- Layer boundaries for coordinators → (Module 8–9 architecture skills).
