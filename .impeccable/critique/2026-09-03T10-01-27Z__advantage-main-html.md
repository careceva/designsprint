---
target: advantage-main.html
total_score: 29
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 4
timestamp: 2026-09-03T10-01-27Z
slug: advantage-main-html
---
# Critique — advantage-main.html

Method: dual-agent (A: design review · B: detector scan)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Request pills, dated stepper, aria-live filters — but header search does nothing and "Weekly discovery · 4 new findings" never resolves to findings |
| 2 | Match System / Real World | 4 | Bookkeeper vocabulary, ledger written as arithmetic; English-only copy is the acknowledged gap |
| 3 | User Control and Freedom | 2 | Business case promises "cancel from Agreements any time" — no cancel control exists anywhere; activations irreversible |
| 4 | Consistency and Standards | 3 | One card/dialog system, but "Talk to my advisor" routes to two different flows depending on where it's clicked |
| 5 | Error Prevention | 3 | "Nothing is sent yet" footers, editable drafts — but #catTabActivate fires a real commitment in one click, no confirm, no undo |
| 6 | Recognition Rather Than Recall | 4 | Breadcrumbs with origin+scroll restore, subject chips, requests visible in three synced places |
| 7 | Flexibility and Efficiency | 2 | ⌘K badge rendered with no handler and no shortcut bound; no bulk activation; ⌘J is the only accelerator |
| 8 | Aesthetic and Minimalist Design | 3 | Disciplined tokens/hairlines, but prototype dev controls (page-look skin toggle, card-style seg) ship in the UI |
| 9 | Error Recovery | 2 | No failure state exists: uploads always succeed, ERP always connects, export/specialist buttons are alert() placeholders |
| 10 | Help and Documentation | 3 | Spotlight tour, welcome modal teaching with real artifacts, "How we calculate this" — but no help on how to actually buy |
| **Total** | | **29/40** | **Good — solid foundation, address weak areas** |

## Design Specificity Verdict

Strongly authored for this product, not category-interchangeable. The estimated-vs-verified distinction is baked into the number-formatting layer itself (verified figures print exact, estimates print as ±15% ranges, `saveFig`/`estRange` ~9812); login headline figures are derived from the agreement roster so the front door can never contradict the app (~5948); da-DK numerals, real Danish supplier roster with sampled brand inks, volume-bonus tiers, a price-challenge letter arguing with group volume. Caveat: Unsplash photo cards and a heart-favourite on framework agreements are consumer-marketplace grammar, not bookkeeper grammar.

Deterministic scan (degraded mode — parser deps unavailable, regex fallback; contrast/selector checks did not run): 15 findings, 5 rules. ~5 outright false positives (2 broken-image resolved at runtime in JS; monotonous-spacing, dark-glow, radial-halo all artifacts of the degraded mode misreading a light page). ~7 matched-but-intentional micro-fill transitions. 3 credible performance findings: whole-layout `transition: width` on the sidebar rail (852), assistant panel (1027), and activity rail (3528) — each reflows the entire app body per frame.

Browser visualization skipped: no browser automation exposed in this session.

## Overall Impression

An unusually careful prototype whose craft peaks in the wrong place. The honesty system (verified vs estimated), the single arithmetic that makes every surface reconcile, and the request lifecycle are genuinely excellent. But the business's stated success metric — a correctly-priced first order — has no UI at all; the emotional peak (activation) ends flat with dead celebration code; and the Tune calculator quietly violates its own cardinal rule on 4 of 5 pages. The biggest opportunity: move the craft budget from the login page to the commitment-and-first-order moment.

## What's Working

1. **The estimated/verified honesty system is carried in the format, not in disclaimers.** Exact figures for verified, ±15% ranges for estimates, "typically" never "up to"; the welcome modal teaches the model with the app's real artifacts; the dashboard reserves the height of both honesty states so nothing jumps. Positioning made physical.
2. **One arithmetic, everywhere.** Every surface derives from ROWS/`peerProfile()`/`rpModel()`; totals reconcile by construction; the assistant answers from the same data so it cannot contradict the screen. Directly serves the sceptical bookkeeper.
3. **The request lifecycle is honestly modelled.** Sent requests appear in three synced places (localStorage + cross-tab storage events); stage copy asserts only what the product does; withdraw exists. Focus management, reduced-motion coverage, and aria-valuetext on sliders show the same discipline.

## Business-Case Alignment

- **"Comparison must resolve into action, not stop at activate": CONTRADICTED.** No how-to-buy zone anywhere — no customer number, order channels, supplier contact, price list, or first-order checklist. A regression from what the gap analysis records as built in v7. Dormant-agreement detection (12053) mitigates downstream but nothing helps place the first order.
- **"Category pages argue before they list": PARTIAL — and quietly half-abandoned.** Hero argues spend/rate/money, but no coverage gap, no peer percentile, no diagnosis; the file's own comment reverses the bet ("the agreements ARE the page", ~2004).
- **"Notifications ≠ timeline": DELIVERED structurally, two leaks.** Activity rail's "See all" opens the notifications popover, re-merging the concepts; user-set rules (the gap analysis's "engine") are absent — volume presets are not rules.
- **Single-user assumption: RESPECTED, one quiet breach.** "Contact the buyer" drafts a message to a colleague who cannot exist in the user model — designs around the gap in fiction instead of flagging it.
- **Core promise (invoice-verified → first correct order): HALF.** Verification half is the best-executed idea in the file; the order half is missing.

## Challenging the Initial Bets

1. **Tune violates its own rule off-dashboard.** `tuneWrite` mutates canonical ROWS (~8054); Reports and drill-downs never check `tuneActive()`, so tuned figures print under "came off your invoices" (12662) and "Read off 1.284 invoices" (13310). The rule holds on one page of five.
2. **"Argue before listing" was half-abandoned in code but not in PRODUCT.md** — either build the diagnosis or update the principle; currently the strategy doc and the prototype disagree.
3. **"How-to-buy above terms" cannot be evaluated — the zone doesn't exist.** Terms survived the port from v7; the operational zone did not.
4. **Context-bound assistant: delivered, then sabotaged.** Fully working seeded assistant one panel away, while the category page's "Ask the AI assistant" button fires `alert('Not part of this prototype…')` (10382).
5. **The trust surface is partly fabricated.** Invented member counts presented as leverage facts, procedurally generated "invoice lines" captioned as the user's own invoices, an unverifiable "variance under 2%" claim. For a product whose moat is "we read, we don't estimate", the prototype teaches stakeholders to decorate verification with invented specifics.

## Priority Issues

1. **[P1] The core promise's second half is missing: no how-to-buy zone.** Success is defined as a correctly-priced first order; the user activates and is abandoned. Fix: required zone on activated agreements — customer number, order channels (fastest marked), named contact, first-order checklist — above "What you get". Suggested command: /impeccable shape
2. **[P1] Tuned figures render under invoice-provenance claims in Reports and drill-downs.** A stakeholder who drags a slider then opens Reports watches the app lie about its one legal-grade claim. Fix: thread `tuneActive()` into `rpModel()`/drill provenance copy, or fork tuned state instead of mutating ROWS. Suggested command: /impeccable harden
3. **[P1] Placeholder/split primary CTAs on the money pages.** "Ask the AI assistant" → alert() while the assistant exists; "Talk to a specialist" → alert(); one advisor label, two flows. These are the Decide-stage buttons. Fix: route through `openAssistantAbout`; distinct labels for the two advisor flows. Suggested command: /impeccable harden
4. **[P1] Dialogs assert aria-modal but are not focus-trapped and the background is never inerted.** Keyboard/SR users Tab out of the business-case dialog into the hidden page — the decision moment disintegrates. Fix: set #app inert while any dialog is open, or add a trap to flowDom. Suggested command: /impeccable harden
5. **[P2] Dead affordances that teach distrust:** ⌘K badge with no handler, "Weekly discovery · 4 new findings" resolving to the plain Overview, promised cancel that doesn't exist, activity rail vanishing below 1440px with no way back. Fix: bind or remove ⌘K; findings view or demote the nav item; add cancel to requested-stage agreements; collapse rail to 76px strip instead of hiding. Suggested commands: /impeccable harden, /impeccable adapt

## Persona Red Flags

**Alex (power user):** ⌘K dead; search field has no handler; loudest nav item leads nowhere; no bulk activation; on a 1366px laptop the "Next best actions" queue simply doesn't exist and nothing says so.

**Sam (screen reader/keyboard):** no modal focus trap (the one cliff in an otherwise unusually good a11y skeleton); nested button inside `role="button"` cards (agr-fav heart) is invalid ARIA; hidden-scrollbar agreement row only scrollable via snav arrows. Genuinely good: aria-valuetext on sliders, role="img" chart labels, aria-live filter counts, :focus-visible reveal of hover chips.

**Sceptical Nordic bookkeeper:** opens "Invoice lines · Q8" to cross-check against her ledger and finds seeded fake lines captioned "What was bought" — first cross-check fails, claim collapses; "94 members" is invented leverage behind a letter she signs; "variance under 2%" has no drill to the three invoices; methodology exists but there is no dispute/adjust path on a specific figure.

## Minor Observations

- Peer-count inconsistency: rail deliberately withholds "148 companies" while Savings and drill print it.
- `bc-steps` progress strip rendered hidden, never unhidden — vestigial.
- Unsplash stock on Danish industrial suppliers; portability claim (inlined logos) breaks in photo mode (hotlinked images).
- `.up-f` #a3a3a3 at 13px and some 11–12px labels below 4.5:1.
- Escape bound globally ~8 times with no stacking discipline.
- Detector-confirmed: whole-layout width transitions on rail (852), assistant panel (1027), activity rail (3528) reflow the app per frame — animate transform/grid instead.
- The inline comment culture (decisions carry rationale) is itself a design asset; keep it.

## Questions to Consider

1. If one slider drag rewrites ROWS — the same object the "verified" claims read from — is "verified" a property of the data or just of the label? Should tuned state be a fork, not an overwrite?
2. The craft budget peaks at login and flatlines at commitment. If peak-end is real, is the most authored moment pointed at the wrong end of the journey?
3. What survives contact with real data? If the backend can only say "9% under, on 530.700 kr." — is the design still convincing without the invented baskets, member counts and variance claims?
