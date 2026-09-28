# Advantage UX — journey project

UX source-of-truth for the Advantage customer journey, created 2026-08-21 from
the Miro alignment board (the 10 stages the team landed on) mapped against the
current prototype `../advantage-v2-visual.html`.

## Files

| File | What it is |
|---|---|
| `journey.json` | **Source of truth.** Machine-readable journey spec: 10 stages with user goals, actions, system/AI behavior, emotions per persona, prototype screen mapping (view ids + JS hooks), and gaps. |
| `journey-map.html` | Interactive journey map rendered from an embedded copy of the same data. Persona toggle (Bob / Fanny), emotion curve, phase bands, coverage chips, gap lists. Open directly in a browser. |
| `journey-map.template.html` | The map without data. Rebuild `journey-map.html` after editing `journey.json` (see below). |

## The model

- **10 stages** in 4 phases: Get in & connect (1–2) · Understand (3–4) · Act on savings (5–8) · Sustain the loop (9–10).
- **2 personas**, matching the prototype's login: **Bob Iversen** (existing customer, data connected, verified figures) and **Fanny Kristensen** (new customer, peer-benchmark estimates). They diverge hardest at stages 2–3.
- **Coverage per stage** vs `advantage-v2-visual.html`: `built` / `partial` / `missing`. Every `partial` stage lists concrete gaps — this doubles as the prototype backlog.

## Using it in a prototype

Each stage's `prototype.screens[]` carries the view id and JS hook from
`advantage-v2-visual.html`, e.g.:

```json
{ "view": "viewSavings", "name": "Savings dashboard", "hook": "openSavings()" }
```

So you can load `journey.json` in the prototype and drive a **guided tour /
scenario mode**: step through stages, call the hook, highlight the view.
Available hooks: `loginAs()`, `openSavings()`, `openDataCenter()`,
`openOpportunity()`, `openCase()`, `askAssistant()`, `renderNotes()`, `catTabUrl()`.

## Current gap backlog (from the coverage flags)

1. **Connect spend data** — the end-to-end connect flow (sources → analyzing → confirm → value reveal) lives in `advantage-onboarding.html`; v2-visual only has the Data center. (v2-visual still ships the CSS for those onboarding screens but the markup was removed.)
2. **Evaluate** — no terms / risk / switching-effort comparison; no current-vs-recommended agreement side-by-side.
3. **Decide** — no post-decision state (confirmation, next steps, offer/switch tracking).
4. **Prove value** — supplier & compliance documentation (Transparency Act) has no screen; no export of the value story.
5. **Prioritize next** — new-supplier-match and unused-potential notifications not simulated; recommendations don't reference realized results.
6. **Log in** — notification deep-link entry path not demonstrated.

## Updating the map

Edit `journey.json`, then re-embed it into the template:

```bash
python3 - <<'EOF'
import json
tpl = open('journey-map.template.html').read()
j = open('journey.json').read().strip()
# keep the existing logo data-URI from the current build
import re
cur = open('journey-map.html').read()
logo = re.search(r'src="(data:image/svg\+xml;base64,[^"]+)"', cur).group(1)
open('journey-map.html','w').write(tpl.replace('__LOGO_SRC__', logo).replace('__JOURNEY_JSON__', j))
EOF
```

Or just ask Claude to update it.
