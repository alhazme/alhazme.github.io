# iOS Native Engineering Workshop — Staff/Principal Track

Workshop offline lengkap membangun aplikasi iOS **production-grade** (fintech, e-commerce, SaaS, enterprise) dengan Swift 6.4 / Xcode 27 / iOS 27. Berisi **18 modul HTML** + **18 Claude Skill**.

Buka `index.html` di browser sebagai titik masuk. Semua materi offline, tanpa dependency internet. Progress checklist tersimpan lokal (localStorage) per browser.

Baseline ekosistem: **Juni 2026** — Swift 6.4, Xcode 27 (MainActor-by-default + Approachable + Strict Concurrency Complete), Swift 6 language mode dengan data-race safety.

---

## Struktur

```
ios-native-workshop/
├─ index.html              # course hub + progress tracker
├─ modules/                # 18 lesson HTML (module-01 … module-18)
└─ .claude/skills/         # 18 SKILL.md untuk Claude Code
```

## Peta Modul

| Fase | # | Modul |
|---|---|---|
| 1 — Swift Foundation | 01–03 | Swift Foundation · Advanced (Generics/POP) · Concurrency & Memory |
| 2 — iOS Fundamental | 04–05 | Xcode & Lifecycle · Networking & Persistence |
| 3 — UI | 06–07 | SwiftUI & Observation · UIKit & Coordinator |
| 4 — Enterprise Architecture | 08–09 | Architecture Patterns · Modularization & DI |
| 5 — Library Mastery | 10–11 | Networking Stack · Ecosystem Libraries |
| 6 — Production Project | 12 | Enterprise SaaS Build |
| 7 — Testing | 13 | Testing Strategy (Swift Testing) |
| 8 — DevOps | 14 | Git, Fastlane & CI/CD |
| 9 — Advanced | 15 | Performance & Security |
| 10 — Senior Engineer | 16 | System Design & Leadership |
| Pelengkap — Production Readiness | 17–19 | Property Wrappers, L10n & A11y · Migration, Privacy & Feature Flags · Native Frameworks & Permissions |

## Cara Memakai Skill di Claude Code

Skill membuat AI agent bekerja pada standar principal (review per-isu bertingkat severity, generate sesuai pola workshop).

1. Salin folder skill ke lokasi yang dibaca Claude Code:
   ```
   cp -r .claude/skills/* ~/.claude/skills/     # global
   # atau taruh .claude/skills/ di root project   # per-project
   ```
2. Skill fire otomatis saat konteks relevan (mis. review kode Swift → `swift-code-review`).

### Peta Skill → Modul

| Skill | Modul | Fungsi |
|---|---|---|
| `swift-code-review` | 01 | Review Swift enterprise per-isu |
| `swift-protocol-api-designer` | 02 | Desain protocol / some vs any |
| `swift-concurrency-auditor` | 03 | Audit isolation, Sendable, data race, retain cycle |
| `ios-app-scaffolder` | 04 | Struktur project, environment, lifecycle, permission |
| `ios-networking-persistence-auditor` | 05 | Audit data layer (Keychain, response, persistence) |
| `swiftui-component-generator` | 06 | Generate/review view SwiftUI modern |
| `uikit-coordinator-architect` | 07 | UIKit, coordinator, interop |
| `ios-architecture-review` | 08 | Fit arsitektur & layer boundary |
| `ios-modularization-di-architect` | 09 | Module graph & DI |
| `ios-networking-stack-architect` | 10 | Auth/refresh/retry/layering |
| `ios-ecosystem-library-advisor` | 11 | Keputusan library (5 pertanyaan) |
| `ios-saas-integration-reviewer` | 12 | Titik temu fitur (RBAC, offline, payment) |
| `ios-test-generator` | 13 | Generate Swift Testing suite |
| `ios-cicd-pipeline-engineer` | 14 | Pipeline & signing |
| `ios-performance-security-auditor` | 15 | Audit performa & keamanan |
| `ios-system-design-advisor` | 16 | System design, ADR, review at scale |
| `ios-localization-accessibility-auditor` | 17 | L10n, a11y, property wrapper |
| `ios-release-readiness-auditor` | 18 | Migration, privacy manifest, kill-switch |
| `ios-permissions-frameworks-auditor` | 19 | Izin & framework native (kamera/lokasi/foto/notif/StoreKit) |

---

## Cheat Sheet — Deprecated → Modern (2026)

| Deprecated / lama | Modern (baseline workshop) | Modul |
|---|---|---|
| `DispatchQueue.main.async` untuk UI | MainActor-by-default | 03 |
| Completion handler | `async/await` | 03 |
| `NSLock` / serial queue | `actor` | 03 |
| Existential telanjang | `any` eksplisit / `some` | 02 |
| `ObservableObject` + `@Published` | `@Observable` macro | 06 |
| `@StateObject` (owned) | `@State` | 06 |
| `NavigationView` | `NavigationStack(path:)` | 06 |
| `NavigationLink(destination:)` | `NavigationLink(value:)` + `navigationDestination` | 06 |
| AppDelegate + SceneDelegate (lifecycle) | SwiftUI `App` + `scenePhase` | 04 |
| `dataTask(...).resume()` | `try await session.data(for:)` | 05 |
| Classic `UITableViewDataSource` | Diffable data source | 07 |
| XCTest (`XCTAssert…`) | Swift Testing (`@Test` / `#expect`) | 13 |
| `.strings` + `NSLocalizedString` | String Catalog + `String(localized:)` | 17 |
| Realm (local DB) | SwiftData / Core Data (Realm deprecated) | 05, 11 |

## Prinsip Inti (benang merah 18 modul)

- **Abstraksi & boundary** — protocol, layer, modul: sembunyikan detail, tukar implementasi, uji dengan mock.
- **Klien tak pernah dipercaya** — keamanan otoritatif di server; klien = UX + defense-in-depth.
- **Measure & decide** — profil sebelum optimasi; nyatakan trade-off; catat keputusan (ADR).
- **Automasi & dokumentasi** — jika berjalan > 2×, otomasikan; pengetahuan tak tertulis akan hilang.
- **Current, bukan deprecated** — lihat cheat sheet di atas.

## Catatan Epistemik

Ekosistem iOS bergerak. Beberapa modul menandai area yang perlu **diverifikasi terhadap rilis terkini** saat mengadopsi: TCA (API berevolusi), SwiftData (kematangan migration), status library pihak ketiga (Realm deprecated, Combine melambat), dan kebijakan App Store (privacy manifest, IAP). Selalu cek dokumentasi resmi Apple/Swift.org saat memulai proyek nyata.

---

*Disusun sebagai referensi internal Alhazme. Design system: Birchline.*
