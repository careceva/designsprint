# Advantage design sprint

Static HTML prototypes for Advantage. There is no build step: open any page in a browser.

`advantage-main.html` is the live prototype. It stays at the root, under this name.

## Layout

```
advantage-main.html        the live prototype
PRODUCT.md                 product context (the impeccable tooling reads it from the root)
assets/                    images, logos and icons shared by every page

forks/                     full copies of the main file that went their own way
  advantage-main/
    v2-nav-redesign/         stacked icon rail, assistant in the app bar
    v3-collapsible-rail/     v2 with the collapsible rail and the assistant ask block back

explorations/              one feature studied off the main file, in versions
  index.html                 a page linking every exploration
  agreement-hero/v1/         agreement page hero: logo, Spending × Discount, reports
  areas-heroes/v1/           hero treatments for the Areas page
  calc-charts/v1/            the Tune calculator as a chart, five approaches
  content-feedback/v1/       copy and content feedback on the agreement and category pages
  finops-overview/v1/        the Overview as a high-density cost dashboard
  finops-overview/v2-stripe-home/  the same, calmed into a payments-style home
  own-agreement/v1/          the company's own supplier agreements beside the negotiated ones
  sales-analysis/v1/         the sales-analysis table integration
  tune-states/v1/            Tune calculator states a–d
  suppliers-filter/v1/       filter bar directions for Suppliers and Agreements

research/                  design-sprint discovery, by topic
  sprint-plan/  interviews/  maps/  analysis/  customer-journey/

archive/                   finished work, kept for reference
  concepts/                  the August concept rounds, one folder per round
  hubs/                      index pages that link across the concept rounds
  backups/                   .bak snapshots
  design-sprint-bundle/      the self-contained onboarding hand-off, with its own assets
```

## Naming

Every piece of work has one address:

```
<section>/<topic>/v<N>-<what-changed>/<topic>-v<N>.html
```

- **section**: `forks`, `explorations`, `research` or `archive`.
- **topic**: what it is, in lowercase kebab-case. No `advantage-` prefix, since everything here is Advantage. The exception is forks, which keep `advantage-main` because they are copies of it.
- **version folder**: `v1`, `v2`, … plus an optional label of two or three words saying what that version changed (`v2-nav-redesign`). Each version gets its own folder, including the first one.
- **file**: `<topic>-v<N>.html`, so no two open editor tabs share a name. A version made of several pages uses `index.html` as its entry, next to the other pages.

Research is organised by topic and has no version folders. Archived files keep their original names so the hub pages and old links still match them.

## Starting a new version

1. Copy the latest version folder to the next number with a new label, for example `explorations/areas-heroes/v1/` → `explorations/areas-heroes/v2-ring-only/`.
2. Rename the file to match: `areas-heroes-v2.html`.
3. Keep the asset paths relative. A page three folders deep reaches the shared assets through `../../../assets/`.

When a fork or an exploration is ported into `advantage-main.html`, leave its folder where it is. Move it to `archive/` only once nobody is working on it, and keep the same topic and version shape there.

## Previews

Every push publishes the branch to GitHub Pages (`.github/workflows/preview.yml`): `advantage-main.html`, `assets/`, and the `.html` pages under the four sections. It leaves out `explorations/tune-states`, `explorations/suppliers-filter`, `research/customer-journey`, `archive/backups` and `archive/design-sprint-bundle`, as well as every Markdown, JSON and office file.

Pages used to sit at the repository root. `.github/moved-pages.tsv` maps each old address to its new one, and the workflow writes a forwarding page at every old address so shared links keep working. If you move a published page again, add it there.
