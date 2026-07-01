---
name: ios-app-scaffolder
description: >
  Scaffolds and reviews iOS app foundation at principal level for Xcode 27 /
  iOS 27 — project structure, targets/schemes/xcconfig for multi-environment,
  SwiftUI App + Scene lifecycle, AppDelegate adaptor wiring, bundle/resource
  access, and just-in-time permission flows. Use when starting a new app,
  restructuring a massive app target, or adding a permission.
version: 1.0.0
tier: foundation
---

# iOS App Scaffolder

## Purpose
Stand up an iOS app whose structure, environments, lifecycle, and permissions are
production-grade from commit one — avoiding the massive-app-target and
scattered-`#if DEBUG` anti-patterns.

## When to use
- New app project: structure, schemes, configurations.
- Adding dev/staging/prod separation.
- Wiring SwiftUI lifecycle or bridging an SDK that needs AppDelegate.
- Adding a permission (camera, notifications, location, photos).
- Reviewing project organization for architectural drift.

## Workflow
1. **Structure first.** App / Features / Core / Resources / Packages, dependency
   direction inward (Features → Core → frameworks).
2. **Environments.** One build configuration + scheme per environment; values in
   `.xcconfig`, surfaced through Info.plist — never inline literals.
3. **Lifecycle.** SwiftUI `@main App` + `scenePhase`; bridge SDKs via
   `@UIApplicationDelegateAdaptor` only when required.
4. **Resources.** `Bundle.main` for app target, `Bundle.module` inside packages.
5. **Permissions.** Add Info.plist usage string; request just-in-time with async
   API; handle `denied` with a degradation path.
6. **Concurrency baseline.** Confirm MainActor default + Approachable + Strict
   Complete on the app target.

## Rules
- MUST keep dependency direction inward; features never import each other directly.
- MUST store environment values in `.xcconfig`, not scattered `#if DEBUG`.
- MUST request permissions just-in-time, never all at launch.
- MUST add the matching Info.plist usage string before any permission request.
- MUST handle `denied` (route to Settings + alternative path).
- MUST use `Bundle.module` for resources inside SPM packages.
- SHOULD prefer SwiftUI lifecycle; use AppDelegate adaptor only for SDK hooks.
- SHOULD persist critical state on `.background`, not `.inactive`.

## Coding standard
| Concern | Standard |
|---|---|
| Entry point | `@main struct App: App` returning a `Scene` |
| Lifecycle state | `@Environment(\.scenePhase)` + `.onChange` |
| Environments | build config + scheme + `.xcconfig` per env |
| Secrets/URLs | Info.plist (from xcconfig), read at runtime |
| Permission timing | Just-in-time, with priming when sensitive |

## Checklist
- [ ] Dependency direction inward; no cross-feature imports.
- [ ] One scheme + config per environment; values in xcconfig.
- [ ] SwiftUI lifecycle; AppDelegate only for SDK hooks.
- [ ] Each permission has Info.plist string + denied handling.
- [ ] Package resources use `Bundle.module`.
- [ ] Concurrency defaults confirmed on the target.

## Example finding
```
[WARNING] NetworkConfig.swift:6 — `#if DEBUG let base = "...staging" #else ...`
Environment value inlined with compile flags. Move to Staging/Production xcconfig
and read from Info.plist so CI and QA share one source of truth.
```

## Anti-patterns
| Anti-pattern | Correct |
|---|---|
| All code in one app target | Features/Core split, SPM packages |
| `#if DEBUG` env values everywhere | `.xcconfig` per configuration |
| Request all permissions at launch | Just-in-time per feature |
| Token/URL literals in source | Info.plist via xcconfig; token in Keychain |
| `Bundle.main` for package resource | `Bundle.module` |

## Handoff
- Network/persistence code under Core → `ios-networking-persistence-auditor`.
- Layer boundaries & DI → (Module 8–9 architecture skills).
- Release signing & flavors → (Module 14 CI/CD skill).
