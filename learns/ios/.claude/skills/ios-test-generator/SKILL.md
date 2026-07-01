---
name: ios-test-generator
description: >
  Generates and reviews iOS tests at principal level for 2026 — Swift Testing
  (@Test, #expect, #require, @Suite, parameterized, async/throws), unit tests for
  use cases and repositories with protocol-based mocks (stub/spy/fake), XCUITest
  for critical flows, snapshot tests for the design system, and coverage strategy.
  Use when writing tests, migrating XCTest to Swift Testing, or auditing a test
  suite's balance and mocking.
version: 1.0.0
tier: testing
---

# iOS Test Generator

## Purpose
Produce fast, deterministic, high-value tests that follow the testing pyramid and
exploit the app's clean architecture for cheap unit coverage.

## When to use
- Writing tests for a use case, repository, or component.
- Migrating XCTest to Swift Testing.
- Choosing test doubles (stub/spy/fake).
- Auditing suite balance (too many UI tests, over-mocking, low-value coverage).

## Workflow
1. **Framework.** Swift Testing for new code (`import Testing`, `@Test`, `#expect`).
2. **Target the pyramid base.** Many unit tests (use cases, repositories); few UI tests.
3. **Inject + mock boundaries.** Protocol-based stub/spy/fake for network/DB/clock.
4. **Cover logic that matters.** Business rules, edge cases, error paths.
5. **UI tests** only for critical happy paths, with accessibility IDs + stubbed network.
6. **Coverage gate** on Domain/Data logic, not blind global %.
7. **Emit findings** grouped CRITICAL / WARNING / SUGGESTION.

## Rules
- MUST use Swift Testing for new tests; keep XCUITest for UI.
- MUST inject and mock only boundaries (network, DB, time, randomness).
- MUST NOT mock the domain types under test.
- MUST keep unit tests deterministic (no real network/time).
- MUST use accessibility identifiers + stubbed network in UI tests.
- SHOULD prefer parameterized tests over many near-duplicate functions.
- SHOULD target coverage at business logic, not trivial accessors.

## Swift Testing quick reference
| XCTest | Swift Testing |
|---|---|
| `XCTAssertEqual(a,b)` | `#expect(a == b)` |
| `XCTUnwrap(x)` | `try #require(x)` |
| `XCTAssertThrowsError` | `#expect(throws:) { }` |
| test class + `test` prefix | `@Test` free functions / `@Suite` |

## Checklist
- [ ] New tests use Swift Testing.
- [ ] Pyramid respected (unit-heavy).
- [ ] Only boundaries mocked.
- [ ] Deterministic (no real network/time).
- [ ] UI tests use a11y IDs + stubbed network.
- [ ] Coverage focused on valuable logic.

## Example findings
```
[WARNING] OrdersTests.swift — 12 UI tests, 3 unit tests
Inverted pyramid: slow, flaky. Move price/mapping logic to fast unit tests; keep one
critical UI happy-path.

[WARNING] CartTests.swift:20 — mocks Cart (a domain type under test)
Over-mocking hides real behavior. Test Cart directly; mock only the boundary.

[SUGGESTION] passwordStrength has 6 near-identical test functions
Use `@Test(arguments:)` parameterization.
```

## Anti-patterns
| Anti-pattern | Correct |
|---|---|
| Inverted pyramid (UI-heavy) | Unit-heavy base |
| Mocking domain under test | Test it directly |
| UI test hitting real server | Stub network via launch arg |
| Chasing 100% global coverage | Cover valuable logic/paths |
| Many duplicate test functions | Parameterized `@Test` |

## Handoff
- Mockable architecture / DI → `ios-modularization-di-architect`.
- Coverage gate in CI → (Module 14 CI/CD skill).
- Feature flows to cover → `ios-saas-integration-reviewer`.
