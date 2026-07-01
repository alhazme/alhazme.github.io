---
name: ios-permissions-frameworks-auditor
description: >
  Reviews native iOS framework usage and permission handling at principal level —
  the permission lifecycle (notDetermined/authorized/denied/restricted/limited/
  provisional), mandatory Info.plist usage strings, per-framework best practice
  (Camera/Mic AVFoundation, Location CoreLocation When-In-Use vs Always + precise,
  Photos PHPicker vs PHPhotoLibrary .limited, Notifications provisional, StoreKit 2
  entitlements/restore), denial handling (Settings deep-link), and graceful
  degradation. Use when adding camera/location/photos/notifications/purchases, or
  auditing permission flows.
version: 1.0.0
tier: production
---

# iOS Permissions & Native Frameworks Auditor

## Purpose
Access sensitive system APIs correctly: request at the right time, handle every
state including denial, and degrade gracefully — passing App Review and respecting users.

## When to use
- Adding camera, microphone, location, photos, notifications, or in-app purchase.
- Reviewing a permission flow or denial handling.
- Auditing for missing Info.plist strings or over-broad permission requests.

## The three core rules
1. Info.plist usage string is MANDATORY — calling the API without it crashes.
2. Request just-in-time (when the feature is used), never at launch; prime sensitive ones.
3. `denied` cannot be re-prompted — route to Settings + degrade gracefully.

## Per-framework guidance
| Framework | Best practice |
|---|---|
| Camera/Mic (AVFoundation) | `requestAccess(for:)`; distinguish denied (→Settings) vs restricted (locked) |
| Location (CoreLocation) | When-In-Use first, Always only if truly needed; precise only when required |
| Photos (PhotosUI/Photos) | Prefer **PHPicker (no permission)**; treat `.limited` as valid, not denied |
| Notifications (UserNotifications) | `requestAuthorization`; consider `.provisional`; re-register token each launch |
| StoreKit 2 | `currentEntitlements` is source of truth; **Restore button required**; verify signature (ideally server-side) |

## Rules
- MUST add the correct, descriptive Info.plist usage string before calling any permission API.
- MUST request permissions just-in-time, not at launch.
- MUST handle denied by routing to Settings (`openSettingsURLString`) + graceful degradation.
- MUST NOT re-call request after denial (it does nothing).
- MUST request the least access (When-In-Use, PHPicker, approximate) that suffices.
- MUST treat Photos `.limited` as a valid state (show subset, offer to manage).
- MUST provide a Restore Purchases action and check `currentEntitlements` (not a local flag).
- SHOULD wrap permissions behind a uniform protocol for consistency and testability.
- SHOULD verify StoreKit transactions server-side for high-value entitlements.

## Checklist
- [ ] Info.plist strings present + descriptive.
- [ ] Requests are just-in-time (not at launch).
- [ ] Denied handled → Settings + degradation; no re-prompt.
- [ ] Least-access chosen (When-In-Use / PHPicker / approximate).
- [ ] Photos `.limited` handled.
- [ ] Push token re-registered each launch.
- [ ] StoreKit: Restore present; entitlements are source of truth.

## Example findings
```
[CRITICAL] Scanner.swift:12 — AVCaptureDevice used, no NSCameraUsageDescription
App crashes on request. Add a descriptive usage string to Info.plist.

[CRITICAL] Store.swift:30 — UserDefaults["isPremium"] used as access source
Stale after refund/expiry. Use `Transaction.currentEntitlements`; add a Restore button.

[WARNING] Location.swift:8 — requestAlwaysAuthorization at launch
High denial + App Review scrutiny. Request When-In-Use just-in-time; upgrade to Always
only when a background feature needs it.

[WARNING] Picker.swift:5 — PHPhotoLibrary permission just to pick one photo
Over-asking. Use PHPicker (no permission).

[SUGGESTION] .limited treated as denied
Show the permitted subset and offer presentLimitedLibraryPicker.
```

## Anti-patterns
| Anti-pattern | Correct |
|---|---|
| Call API without Info.plist string | Add usage string first |
| Ask permission at launch | Just-in-time + priming |
| Re-prompt after denied | Route to Settings + degrade |
| Ask Always / full library / precise by default | Least access that suffices |
| `.limited` treated as denied | Valid state; show subset |
| Local `isPremium` flag | `currentEntitlements` + Restore |

## Handoff
- Push token → server flow → `ios-saas-integration-reviewer`.
- ATT / privacy manifest → `ios-release-readiness-auditor`.
- Secure token storage → `ios-networking-persistence-auditor`.
- StoreKit vs gateway boundary → `ios-saas-integration-reviewer`.
