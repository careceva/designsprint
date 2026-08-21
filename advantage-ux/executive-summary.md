# Advantage — UX project, executive summary

**Visma Advantage Nordic · 2026-08-21 · based on the design-sprint Miro alignment and the advantage-v2-visual prototype**

## The product

Advantage is a procurement-savings portal for Nordic SMB customers. Its promise: *your invoices already know where the money is going*. The customer connects spend data (ERP or uploaded spend report), and the product turns it into a living picture of their procurement — agreements, suppliers, spend — then proactively finds savings: better terms, better-fitting suppliers, and more spend moved onto Advantage agreements. Value is expressed in three currencies the customer can defend internally: realized savings, potential savings, and the accumulated customer bonus. An AI procurement agent ("saving assistant") answers questions and recommends where to focus next.

## The customer, in two states

The design deliberately models two entry realities, embodied by the prototype's login personas. **Bob Iversen** (Nordvik Byg A/S) is the established customer: data connected, every figure verified, visiting on a weekly-discovery cadence. **Fanny Kristensen** (Kristensen Elektro ApS) is the new customer with no data — and the sprint's key strategic decision applies to her: **no cold starts**. Instead of an empty dashboard, she lands on AI-derived peer benchmarks for her industry and size (148 peers), clearly marked as estimates, with the value of connecting real data as the conversion argument. Fanny's journey through stages 1–3 is effectively the product's sales funnel; once through it, she becomes Bob.

## The journey the team landed on

Ten stages in four phases:

1. **Get in & connect** — Log in (driven by need, notification, or overview) → Connect spend data (ERP vs upload; ERP unlocks off-agreement detection).
2. **Understand** — Understand current position (agreements, suppliers, spend) → See realized & potential value (Savings Dashboard, notifications; the "7 mil NOK" reveal is the emotional peak of the journey).
3. **Act on savings** — Discover opportunity (proactive categories + AI agent) → Review business case (savings, spend, recommended agreement, why relevant) → Evaluate (terms, risk, effort, business sense) → Decide (proceed, request offer, approve switch, or involve an advisor).
4. **Sustain the loop** — Prove value (paid bonus; supplier & compliance documentation incl. the Transparency Act) → Prioritize next opportunity (realized results + AI recommendations feed the next cycle; notifications for new supplier matches and unused savings potential).

The journey is intentionally a loop, not a funnel: stage 10 feeds stages 4–5 on the next visit.

## Where the prototype stands

advantage-v2-visual.html proves the heart of the journey — stages 3–6 (current position, value dashboard, opportunity discovery, business case) are fully built, including the anti-cold-start benchmark dashboard and the estimated-vs-verified honesty model. Six stages are partial. The material gaps, in priority order: the end-to-end **connect-data flow** exists only in the separate onboarding prototype; **Evaluate** lacks a terms/risk/effort comparison (named decision inputs on the Miro board); **Decide** has no post-decision state or tracking; **compliance documentation** (Transparency Act) has no screen; and the **loop-closing logic** — recommendations that visibly reference realized results — is not yet demonstrated.

## What this UX project delivers

A single source of truth in `dev/DS/advantage-ux/`: **journey.json**, a machine-readable spec carrying, per stage, the user goal, actions, system/AI behavior, per-persona emotions, prototype coverage, and gaps — each stage mapped to the exact prototype view and JS hook so the spec can drive a guided-tour/scenario mode inside the prototype; and **journey-map.html**, an interactive one-page map (persona toggle, emotion curves, coverage chips) rendered from the same data, doubling as the gap backlog for the next prototype iteration.

## Recommended next steps

Wire the guided-tour mode into the prototype using journey.json, and close the highest-leverage gap first: the Evaluate comparison, since it sits immediately before the decision moment and is where credibility is won or lost.
