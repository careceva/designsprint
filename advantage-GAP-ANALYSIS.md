# Advantage — feature gap analysis

**21 Aug 2026 · based on vinst.no, seiva.se, and a self-audit of the v3–v6 prototypes**

## What the market actually ships

**Vinst** (Visma, Norway) — Avtaler by category, a Leverandører supplier directory, industry pages
(Bygg og anlegg, Skoler og barnehager…), a free benchmark tool, Guider, a Reisepolicy template,
Åpenhetsloven statement, tiered plans (Standard from kr 949/mo · Advanced from kr 1,899/mo · Executive
with a dedicated innkjøpsrådgiver), free trial, renegotiation as a service.

**Seiva** (Sweden) — 100+ agreements, 100,000+ contracted articles, personal purchasing coaches
(20+ years' experience), 30 days free, "average saving 34,500 SEK/year", industry verticals
(hotel/restaurant, school, healthcare, office, logistics), LogBuy employee-benefits portal.

**What neither shows evidence of:** notifications, messaging/chat, document storage, roles and
permissions, requisition or ordering workflows, reporting/export. These are unclaimed in this market —
not merely missing from our prototypes.

## The gaps, ranked

### Tier 1 — built in v7

1. **Notifications ≠ activity timeline.** We had a bell and a history feed, but no *attention* model:
   no read/unread, no severity, no deep-link, no snooze, and critically **no user-set rules**. A rule
   like "tell me when an agreement is within 90 days of expiry" is the product's engine — it is what
   makes tomorrow's dashboard non-empty. Built, with 6 editable rules, per-rule channel, digest
   cadence and quiet hours.
2. **Messaging.** The advisor was a button, not a conversation: no thread, no history, no attachments,
   no forward-to-colleague, and no inbound channel — so every price change we detected had nowhere to
   be discussed. Built as a two-pane inbox with context-bound threads.
3. **"How do I actually buy on this agreement?"** We activated agreements and then abandoned the user.
   Activation is not the outcome; the **first correctly-priced order** is. Neither competitor solves
   this. Built as a required zone on every agreement page: customer number, order channels with the
   fastest marked, named supplier contact, price list, first-order checklist, tell-my-buyers.
4. **Detail drawers instead of pages.** A drawer cannot hold terms + benefits + a commitment decision,
   and cannot be linked, bookmarked, or sent to a colleague — fatal for a page whose job is to be
   forwarded internally. Replaced with real routed pages.

### Tier 2 — recommended next, not built

5. **Multi-user, roles and approvals.** Every prototype still assumes one person is the company. Real
   SMBs have an owner, a bookkeeper and site managers; the journey says "involve an advisor" but
   nobody can invite a colleague, delegate an approval, or see who did what. This is the single
   largest remaining structural gap.
6. **Adoption and leakage by site or person.** An agreement activated centrally is worthless until
   sites use it. "Who is still buying off-agreement, and where" is the most actionable question we
   never ask. Commercially powerful; needs care on the surveillance dimension.
7. **Savings methodology transparency.** We claim "verified from invoices" everywhere with no "how we
   calculate this" and no dispute/adjustment path. First thing a sceptical CFO pokes.
8. **Global search (⌘K).** 112 agreements, 14 categories, suppliers, documents — and no search.
9. **Renewal / lifecycle calendar.** Expiries exist as chips; there is no calendar, no renewal
   workflow, no owner or date per renewal.
10. **Bonus settlement detail.** Bonus is a number with no statement of how it accrues, when it pays,
    or per-supplier breakdown.

### Tier 3 — worth a decision, cheap to add

11. **Nordic language switching** (NO/DK/SE) — we are English-only in a Nordic product.
12. **Scheduled reporting** — monthly PDF/email to the board, CSV export, accountant share link.
13. **Trust & security surface** — what data we read from the ERP, who can see it, GDPR posture. For a
    product that ingests every invoice, its absence is conspicuous.
14. **Mobile "can I buy this here?"** — a site manager's lookup on a phone.
15. **Category personalization** — hide irrelevant categories (the v2-visual prototype already hints
    at this).
16. **Employee benefits adjacency** (LogBuy-style) — a decision to take deliberately, not by drift.

## Design challenges to the brief

- **Standalone agreement pages: agreed, with an addition.** Terms and benefits are the brochure. The
  decisive zone is *what changes for me operationally* — delivery, order channel, who to call, whether
  my supplier relationship survives. That is why "How to buy" sits above Terms in the built pages.
- **Category pages with heavier agreements: agreed, with a caveat.** Weight alone produces a wall of
  cards. Each category page therefore **argues before it lists**: your spend, coverage, the gap in
  kroner, and the peer percentile with a plain-language diagnosis — then agreements as the answer to
  that diagnosis.
- **The AI assistant as secondary CTA: only if context-bound.** A generic chat launcher next to a
  phone number is decoration. Every assistant entry point in v7 is seeded with the entity in view.
- **Keep notifications and the timeline separate.** They feel like one feature and are two: history
  versus attention. The Today variant makes the three-way division explicit — queue (things with your
  name on them) · notifications (things to know) · inbox (things to discuss).
