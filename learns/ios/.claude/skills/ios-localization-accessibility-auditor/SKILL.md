---
name: ios-localization-accessibility-auditor
description: >
  Reviews iOS localization, accessibility, and custom property wrappers at principal
  level — String Catalog usage (no concatenation), locale-aware formatting (IDR
  Decimal, id_ID dates, UTC↔local timezone), VoiceOver labels/hints/values/traits,
  Dynamic Type, and ABK-specific inclusive design (Reduce Motion, large targets,
  multi-sensory). Use when localizing, making UI accessible, or building property wrappers.
version: 1.0.0
tier: production
---

# iOS Localization & Accessibility Auditor

## Purpose
Ensure the app is releasable to multiple locales and usable by everyone — with
special care for the ABK (special-needs children) vertical.

## When to use
- Localizing UI or reviewing localized strings.
- Making views accessible (VoiceOver, Dynamic Type).
- Building/reviewing custom property wrappers.
- Auditing an ABK / child-facing app for inclusive design.

## Rules
- MUST use String Catalog + `Text(...)`/`String(localized:)`, never runtime concatenation.
- MUST use placeholder strings as single keys (word order varies per language).
- MUST use locale-aware formatting (`Decimal` + `.currency(code:)`; `id_ID` dates).
- MUST store/transmit UTC; convert to local time only at display.
- MUST give icon-only controls `.accessibilityLabel`; convey state via `.accessibilityValue`.
- MUST use semantic fonts (Dynamic Type), never fixed sizes.
- MUST not convey status by color alone (add icon/text).
- SHOULD honor Reduce Motion / Reduce Transparency, especially for ABK apps.
- SHOULD use ≥44×44pt touch targets; multi-sensory feedback for ABK.
- Property wrappers: `wrappedValue` required; `@AppStorage` (not custom) for reactive SwiftUI.

## Checklist
- [ ] No string concatenation for sentences.
- [ ] Locale-aware currency/date; UTC↔local handled.
- [ ] Icon-only controls labeled; state via accessibilityValue.
- [ ] Dynamic Type (semantic fonts); layout survives largest size.
- [ ] Status not color-only.
- [ ] Reduce Motion honored (critical for ABK).
- [ ] Property wrappers correct; @AppStorage for reactive state.

## Example findings
```
[WARNING] Cart.swift:12 — Text("Anda punya " + count + " pesan")
Concatenation breaks translation/plurals. Use one placeholder key or
`^[\(count) pesan](inflect: true)`.

[WARNING] Row.swift:8 — Button { Image(systemName: "heart") }
Icon-only control reads empty in VoiceOver. Add `.accessibilityLabel("Favorit")`
and `.accessibilityValue(isFav ? "Aktif" : "Nonaktif")`.

[WARNING] Total.swift:4 — let t: Double; Text("Rp\(t)")
Use Decimal + `.formatted(.currency(code: "IDR"))` for correct IDR formatting.

[SUGGESTION] Reward.swift:20 — confetti animation always plays
Honor `accessibilityReduceMotion` — ABK users may be overstimulated.
```

## Anti-patterns
| Anti-pattern | Correct |
|---|---|
| Sentence concatenation | Single placeholder key |
| `Double` for IDR | `Decimal` + currency format |
| Display UTC without conversion | Convert at display (TimeZone.current) |
| Icon-only, no label | `.accessibilityLabel` |
| Fixed font sizes | Semantic Dynamic Type fonts |
| Status by color only | color + icon/text |

## Handoff
- Money storage/format origin → `ios-networking-persistence-auditor`.
- Component structure → `swiftui-component-generator`.
- Release privacy/migration → `ios-release-readiness-auditor`.
