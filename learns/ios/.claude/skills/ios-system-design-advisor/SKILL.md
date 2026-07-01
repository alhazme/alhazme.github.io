---
name: ios-system-design-advisor
description: >
  Advises on iOS system design and technical leadership at principal level —
  structured design (requirements → constraints → data → architecture → trade-offs),
  Architecture Decision Records, code review at scale, RFCs, tech-debt management,
  and team/module scaling. Use when designing a system, writing an ADR/RFC,
  reviewing at scale, or planning how to modularize and scale ownership.
version: 1.0.0
tier: leadership
---

# iOS System Design & Leadership Advisor

## Purpose
Turn build skill into decision skill: reason about whole systems, record decisions,
review to raise the team, and structure code + ownership so more people can
contribute without colliding.

## When to use
- Designing an iOS system (interview or real).
- Writing an ADR or RFC.
- Reviewing a large/risky PR at scale.
- Planning modularization, ownership, or onboarding as the team grows.

## System design flow
1. **Requirements** — what it must do.
2. **Constraints** — memory, battery, cache size, offline, team size.
3. **Data & API** — entities, pagination, sync shape.
4. **Architecture** — layers (Clean), modules, source of truth.
5. **iOS dimensions** — offline-first, state flow, scale (lists/memory/concurrency), resilience.
6. **Trade-offs** — state what is sacrificed and why, explicitly.

## ADR rules
- Write ADRs for decisions that are expensive to reverse or affect many modules/people.
- Include Status, Context, Decision, Consequences (+/−), Alternatives considered.
- ADRs are immutable; supersede with a new ADR rather than editing.

## Code review at scale (priority order)
1. Correctness & security (data races, authz, secret leaks).
2. Architecture & boundaries (dependency direction, layer placement).
3. Testability & tests present.
4. Clarity (naming, complexity).
5. Style — automate via linter; don't hand-review.

## Rules
- MUST connect each design choice to a requirement/constraint and name trade-offs.
- MUST write ADRs for significant, hard-to-reverse decisions; keep them immutable.
- MUST review by priority (correctness/architecture/tests over style); automate style.
- MUST phrase review as questions + references, distinguish blockers from nits.
- MUST record tech debt as a conscious, prioritized decision.
- SHOULD use RFCs for large decisions to build consensus early.
- SHOULD scale via clear module ownership + stable public contracts + automated standards.
- SHOULD treat documentation (ADR/RFC/README/runbook) as first-class.

## Checklist
- [ ] Design traces choices to requirements/constraints + trade-offs.
- [ ] ADRs for significant decisions; immutable; alternatives noted.
- [ ] Reviews prioritize correctness/architecture/tests; style automated.
- [ ] Reviews constructive (questions, references, blocker vs nit).
- [ ] Tech debt recorded and prioritized.
- [ ] Scaling via ownership + contracts + automation.

## Example guidance
```
[DESIGN] "Offline feed" answered by jumping to SwiftData
Back up: state requirements (read/post offline, sync), constraints (memory/battery),
then data → architecture → trade-offs. Name the staleness-vs-freshness trade-off.

[ADR] Decision to adopt TCA for payments has no record
Write ADR: context (complex state), decision (TCA for payments only), consequences
(+ predictability / − learning curve), alternatives (MVVM+Clean rejected here).

[REVIEW] Comment "this is wrong" on a boundary violation
Reframe: "ViewModel calls networking directly — hard to test / crosses the boundary.
Move behind NetworkService? (see M10)." Question + reference, not attack.
```

## Anti-patterns
| Anti-pattern | Correct |
|---|---|
| Buzzword list instead of trade-offs | Choices tied to constraints + trade-offs |
| Undocumented big decisions | ADR/RFC recorded |
| Review nitpicks style, misses architecture | Priority-ordered review |
| Untracked tech debt | Conscious, prioritized debt |
| Add people to a monolith | Modules + contracts + automation |

## Handoff
- Layer/pattern specifics → `ios-architecture-review`.
- Module split & DI → `ios-modularization-di-architect`.
- Per-issue code review → `swift-code-review` and sibling review skills.
