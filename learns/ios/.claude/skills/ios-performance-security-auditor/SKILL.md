---
name: ios-performance-security-auditor
description: >
  Audits iOS performance and security at principal level — Instruments-driven
  profiling, memory (retain cycles, image downsampling, bounded caches), main-thread
  hangs and rendering, battery/energy, OWASP MASVS domains (storage/network/auth/
  code/platform/privacy), biometric gating, and certificate pinning. Use when
  profiling performance, diagnosing jank/leaks/battery drain, or hardening an app.
version: 1.0.0
tier: advanced
---

# iOS Performance & Security Auditor

## Purpose
Optimize what is measured and secure against real threats, with defense-in-depth and
fail-closed defaults.

## When to use
- Diagnosing jank, hangs, leaks, or battery drain.
- Reviewing memory/rendering hot paths.
- Hardening storage, network, auth, or adding pinning/biometrics.
- Pre-release security review.

## Two guiding principles
- **Performance:** measure, don't guess. Profile (Release + device) before optimizing.
- **Security:** defense-in-depth, fail closed. Authoritative control on the server.

## Workflow
1. **Profile** with Instruments (Time Profiler, Allocations, Leaks, Hitches), Release + device.
2. **Memory.** Find retain cycles (Leaks/Memory Graph); downsample images; bound caches (NSCache).
3. **Rendering.** Offload heavy work off the main actor (`@concurrent`); lazy containers; light cells.
4. **Battery.** Batch network; minimal location accuracy; stop background work when idle.
5. **Security (MASVS).** Keychain storage; HTTPS/ATS; server-side auth; no hardcoded secrets;
   jailbreak detection for high-risk; privacy minimization.
6. **Pinning/biometrics** for sensitive endpoints/actions, with rotation planning.
7. **Emit findings** grouped CRITICAL / WARNING / SUGGESTION.

## Rules
- MUST profile on Release builds on a physical device.
- MUST fix retain cycles with `[weak self]`/`weak`; verify via deinit + Memory Graph.
- MUST downsample images to display size.
- MUST offload CPU-heavy work off the main actor.
- MUST store secrets in Keychain; never log tokens/PII; no hardcoded keys.
- MUST keep authoritative authorization on the server (client is never trusted).
- MUST pin to public key with a backup pin + rotation plan (sensitive endpoints only).
- SHOULD gate sensitive actions with biometrics; fail closed.

## Checklist
- [ ] Profiled Release on device before optimizing.
- [ ] No retain cycles; images downsampled; caches bounded.
- [ ] No heavy work on the main actor.
- [ ] Battery: batched network, minimal location, idle cleanup.
- [ ] Secrets in Keychain; no token/PII logging; no hardcoded keys.
- [ ] Server-side authorization enforced.
- [ ] Pinning to public key + backup + rotation (if used).

## Example findings
```
[CRITICAL] Feed.swift:30 — parseHugeJSON runs on MainActor
Blocks UI (hang). Offload with `@concurrent`; assign result back on main.

[CRITICAL] Auth.swift:8 — `Logger.log("token=\(jwt)")`
Token leaks into logs/crash reports. Never log secrets/PII.

[WARNING] ImageCell.swift:12 — full-resolution UIImage in list
Memory blowup + scroll jank. Downsample to display size.

[WARNING] Pinning pins full certificate
Breaks on renew. Pin public key + backup pin + rotation plan.
```

## Anti-patterns
| Anti-pattern | Correct |
|---|---|
| Optimize by guessing | Profile first (Release + device) |
| Full-res images in lists | Downsample |
| Heavy work on main actor | `@concurrent` offload |
| Token/PII in logs | Never log secrets |
| Client-side authorization as authority | Server-side enforcement |
| Pin full cert, no backup | Public-key pin + backup + rotation |

## Handoff
- Concurrency offload mechanics → `swift-concurrency-auditor`.
- Secure storage patterns → `ios-networking-persistence-auditor`.
- Obfuscation in release pipeline → `ios-cicd-pipeline-engineer`.
