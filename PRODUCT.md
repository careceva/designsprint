# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary user is the SMB owner or bookkeeper — the person who represents the whole company in the product today. They are comparing the business's actual spend against negotiated agreements and deciding whether to activate a better deal. Prototypes currently assume a single user per company; multi-user roles/approvals are a known future gap, not yet built (see Capabilities and Constraints).

## Product Purpose

Advantage surfaces where a small/medium business is overpaying versus available pre-negotiated agreements, by category (e.g. insurance, telecom, energy, office supplies), and lets the owner/bookkeeper activate a better agreement. Success is a correctly-priced first order placed on an activated agreement, not just activation itself (per `advantage-GAP-ANALYSIS.md`).

## Positioning

Savings figures are verified from the customer's actual invoice/ERP data rather than estimated or self-reported, and the product goes from comparison straight to activation of a real pre-negotiated agreement — closer to the Nordic agreement-marketplace model (vinst.no, seiva.se) than a generic price-comparison site. A generic comparison site could not truthfully claim invoice-verified savings or direct activation.

## Operating Context

Nordic SMB market (Norway/Sweden/Denmark). Agreements are organized by category (14 categories referenced in gap analysis) with per-category savings/coverage diagnostics, individual agreement pages (terms, benefits, how-to-buy), and a dashboard of opportunities. Current copy is English-only; NO/SE/DK language switching is an acknowledged, unbuilt gap.

## Capabilities and Constraints

- Static HTML prototypes (no build framework/package.json) — each `advantage-*.html` file is a self-contained iteration; `advantage-v2-visual.html` is the most actively maintained one per recent history.
- Nordic market only (NO/SE/DK); UI copy is English-only for now — do not add other-language copy without it being a deliberate, confirmed change.
- Single-user assumption in current prototypes: no roles, invites, approvals, or multi-user activity. Treat this as current-state, not a locked-in constraint — flag rather than silently design around it if a task implies multiple users.
- Savings/verification language ("verified from invoices") is a real product claim already in use; do not weaken or fabricate variations of it without checking `advantage-GAP-ANALYSIS.md`.

## Evidence on Hand

- `advantage-GAP-ANALYSIS.md` — competitive analysis (vinst.no, seiva.se) and ranked feature gaps across the v3–v8 prototypes; treat as current strategic ground truth.
- `advantage-ux/` and `advantage-ux/journey.json` — UX research artifacts (journey map, interview field kit, pain map, sales-rep interview).
- No customer testimonials, logos, or real pricing are on hand — do not fabricate any for future design work.

## Product Principles

- Comparison must resolve into action: every savings claim should point at how to actually buy on the better agreement, not stop at "activate."
- Category pages argue before they list: show spend, coverage gap, and peer percentile diagnosis before the agreement cards.
- Keep "attention" (notifications/rules) and "history" (activity timeline) conceptually separate rather than merging them into one feed.
- Don't assume multi-user structure exists yet; design for the single owner/bookkeeper unless a task explicitly extends this.
</content>
