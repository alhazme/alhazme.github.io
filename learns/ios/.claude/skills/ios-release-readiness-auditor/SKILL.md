---
name: ios-release-readiness-auditor
description: >
  Audits iOS release readiness at principal level — SwiftData/Core Data schema
  migration safety (lightweight vs custom, test from real old data), Privacy
  Manifest (PrivacyInfo.xcprivacy, required-reason APIs, App Privacy label
  consistency), App Tracking Transparency, and feature flags / kill-switch /
  gradual rollout. Use before a release, when changing a data model, adding an SDK,
  or planning safe rollout.
version: 1.0.0
tier: production
---

# iOS Release Readiness Auditor

## Purpose
Catch the failures that only bite on the *second* release: migration crashes,
App Review privacy rejections, and un-killable broken features.

## When to use
- Before submitting a release.
- Changing a `@Model` / Core Data entity.
- Adding or updating a third-party SDK.
- Planning rollout / kill-switch for a risky feature.

## Rules
- MUST version schemas and provide a migration plan for non-trivial model changes.
- MUST NOT add a required field without a default (crash on migrate).
- MUST test migration from real previous-version data, not an empty store.
- MUST ship `PrivacyInfo.xcprivacy` declaring collected data, tracking, and
  required-reason APIs (including those pulled in by SDKs).
- MUST keep the App Privacy label consistent with the manifest.
- MUST add `NSUserTrackingUsageDescription` and request ATT before any tracking.
- MUST put risky features behind flags with a safe (fail-closed) default.
- MUST design a kill-switch before shipping risky features (no instant rollback on iOS).
- SHOULD use gradual rollout and monitor crash/metrics per stage.

## Checklist
- [ ] Schema versioned; migration plan for non-trivial changes.
- [ ] No required-without-default fields.
- [ ] Migration tested from real old data (seed DB in CI).
- [ ] PrivacyInfo.xcprivacy present + complete (incl. SDK APIs).
- [ ] App Privacy label matches manifest.
- [ ] ATT + usage description if tracking.
- [ ] Risky features flagged, fail-closed default.
- [ ] Kill-switch + rollout plan in place.

## Example findings
```
[CRITICAL] Order.swift:5 — new `currency: String` with no default
Migration will crash existing users on launch. Add a default or a custom migration stage.

[CRITICAL] Project — no PrivacyInfo.xcprivacy but uses UserDefaults + Firebase
Required-reason APIs undeclared → App Store rejection. Add the privacy manifest and
verify SDKs ship their own.

[CRITICAL] Analytics.swift:9 — ATT requested without NSUserTrackingUsageDescription
Crashes on call. Add the Info.plist key; handle denial without breaking core features.

[WARNING] newCheckout shipped with no kill-switch
iOS has no instant rollback. Gate behind a flag with a safe default and a remote kill-switch.
```

## Anti-patterns
| Anti-pattern | Correct |
|---|---|
| Required field, no default | Default or custom migration |
| Test migration from empty DB | Test from real old data |
| No privacy manifest | Complete PrivacyInfo.xcprivacy |
| Manifest ≠ App Privacy label | Keep consistent |
| ATT without usage string | Add key; handle denial |
| Risky feature, no kill-switch | Flag + fail-closed + remote disable |

## Handoff
- Persistence design → `ios-networking-persistence-auditor`.
- Rollout in the pipeline → `ios-cicd-pipeline-engineer`.
- SDK/dependency privacy → `ios-ecosystem-library-advisor`.
