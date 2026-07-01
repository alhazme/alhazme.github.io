---
name: swiftui-component-generator
description: >
  Generates and reviews SwiftUI views, components, and state at principal level for
  iOS 27 — Observation framework (@Observable, @State, @Bindable, @Environment),
  NavigationStack typed routing, reusable components with ButtonStyle/ViewModifier,
  and centralized design tokens. Use when building a SwiftUI screen/component,
  wiring state, setting up navigation, or migrating ObservableObject to @Observable.
version: 1.0.0
tier: ui
---

# SwiftUI Component Generator

## Purpose
Produce SwiftUI UI that uses the modern Observation system correctly, re-renders
narrowly, and stays consistent through a token-driven design system.

## When to use
- Building a SwiftUI view, screen, or reusable component.
- Choosing among `@State` / `@Observable` / `@Bindable` / `@Environment`.
- Setting up NavigationStack + typed destinations / a Router.
- Migrating `ObservableObject + @Published` to `@Observable`.
- Reviewing SwiftUI for over-rendering or ad-hoc styling.

## State decision rule
| Situation | Tool |
|---|---|
| Local value UI state (toggle, text) | `@State` (value) |
| Reference model owned by this view | `@State private var m = Model()` |
| Observable model owned elsewhere, needs bindings | `@Bindable var m: Model` |
| Shared dependency for many distant views | `@Environment(Model.self)` |
| Model class | `@Observable final class` (no `@Published`) |

## Workflow
1. **Model.** Business state as `@Observable final class`; derive computed values.
2. **Ownership.** Pick state wrapper via the rule above.
3. **Composition.** Break large `body` into small subviews to bound re-render.
4. **Navigation.** `NavigationStack(path:)` + `navigationDestination(for:)`; Router for programmatic.
5. **Design system.** Tokens (color/spacing/radius) + `ButtonStyle`/`ViewModifier`/generic containers.
6. **Preview.** Provide previews / Widgetbook use cases for each component.

## Rules
- MUST use `@Observable`, never `ObservableObject + @Published`, for new models.
- MUST use `@State` for view-owned models (not `@StateObject`).
- MUST use `NavigationStack`, never `NavigationView`.
- MUST derive computed state, not store duplicated/denormalized state.
- MUST route styling through tokens + reusable styles, not inline literals per view.
- SHOULD split large `body` to narrow re-render scope.
- SHOULD keep `@Environment` for genuinely shared dependencies only.

## Coding standard
| Concern | Standard |
|---|---|
| Model | `@Observable final class`, computed derivations |
| View-owned model | `@State private var` |
| Bindings into model | `@Bindable` |
| Navigation | `NavigationStack(path:)` + typed destinations |
| Styling | tokens + `ButtonStyle`/`ViewModifier` |

## Checklist
- [ ] No `ObservableObject`/`@Published` in new code.
- [ ] State wrapper matches ownership.
- [ ] No stored derived state.
- [ ] `NavigationStack` typed routing.
- [ ] Styling via tokens + reusable styles.
- [ ] Previews/use cases present.

## Example finding
```
[WARNING] CartView.swift:9 — `@StateObject private var vm = CartVM()` (ObservableObject)
Legacy observation. Convert CartVM to `@Observable`, drop `@Published`, use
`@State private var cart = CartModel()`. Gains granular re-render.
```

## Anti-patterns
| Anti-pattern | Correct |
|---|---|
| `ObservableObject + @Published` | `@Observable` |
| `NavigationView` | `NavigationStack` |
| Storing `total` alongside `items` | computed `total` |
| Inline colors/padding per view | design tokens + styles |
| Everything in `@Environment` | Environment only for shared deps |

## Handoff
- Concurrency of async model methods → `swift-concurrency-auditor`.
- UIKit interop / wrapping → `uikit-coordinator-architect`.
- Protocol shape of services the view consumes → `swift-protocol-api-designer`.
