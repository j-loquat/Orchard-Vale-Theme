# AGENTS.md

This repository is the Orchard Vale Theme Kit. Treat this file as the working brief for coding agents modifying the project.

## Project Identity

Orchard Vale is a richly illustrated storybook-village UI theme for HTML front-ends. It combines practical SaaS/product UI with warm parchment panels, dark forest-green headers, brass trim, carved wood frames, heraldry, illustrated maps, woodland helper characters, and dense but readable interface layouts.

The theme should feel handcrafted, premium, cozy, organized, and useful. It should not feel like a generic fantasy tavern, a game HUD clone, childish clipart, or decorative art pasted over a product UI.

## Start Here

Before making design or code changes, inspect these files:

- `README.md` for the public repo overview.
- `DESIGN.md` for the quick design-system entry point.
- `docs/design.md` for the canonical Orchard Vale adaptive design guide.
- `docs/design-reference-dashboard.md` when recreating the original 1672×941 reference artboard.
- `src/theme/index.css` and `src/theme/orchard-vale.js` for the shipped CSS layers and JS helpers.
- `starter/index.html` for the setup guide and copy-ready HTML.
- `demo/index.html` for the full demo directory.
- `demo/asset-pattern-library.html` for the Developer Specimen Workbench exposing all 301 non-character assets.
- `demo/character-gallery.html` for the full character set.
- `docs/asset-inventory.md` for asset counts, formats, and manifest details.

When you need an example layout, start from `starter/index.html` or the closest existing demo instead of inventing a new visual system.

## Repository Map

```text
docs/
  design.md                         Canonical Orchard Vale adaptive design guide.
  design-reference-dashboard.md     Legacy 1672x941 pixel-faithful reference dashboard spec.
  asset-generation-plan.md          Asset category plan and progress record.
  asset-inventory.md                Runtime & archived asset inventory and manifest guide.
  github-publishing-checklist.md    Publishing checklist for GitHub and GitHub Pages.
  licensing-and-provenance.md       Licensing and asset-provenance notes.

art-sources/
  Archived raw PNG masters separated from the runtime asset tree. Not referenced by demos or theme.

references/
  Original reference mock-ups used to define the visual language.

pets/
  Optional Codex pets (orchard-badger). Temporary .pet-runs/ directories are gitignored.

src/assets/orchard-vale/
  asset-manifest.json / .js         Machine-readable index of all 321 runtime deliverables.
  backplates/       20 SVG button, field, ribbon, badge, tab, and label surfaces.
  characters/       20 WebP full-body helpers and avatars (+ contact sheets).
  data-viz/         50 SVG chart frames, meters, ledger rules, timeline plaques, tooltips.
  empty-states/     10 WebP horizontally centered empty-state and spot illustrations.
  heraldry/         17 WebP crests, seals, shields, laurel frames, status marks.
  icons/            58 SVG product icons for actions, navigation, status, data, workflow.
  maps/             9 WebP map backgrounds + 24 SVG markers, pins, and controls.
  motifs/           49 SVG domain motifs across AI, CRM, finance, operations, productivity, project, research.
  motion/           12 PNG assets (6 spritesheets + 6 static previews) for small animations.
  ornaments/        24 SVG corners, dividers, hinges, rivets, frames, scroll caps, flourishes.
  scenes/           20 WebP wide and ultrawide illustrated backdrops.
  textures/         7 WebP seamless surfaces + 1 PNG ink-speckle overlay.

src/theme/
  index.css                         Single-import entry point for the theme’s CSS layers.
  orchard-vale.css                  @layer ov.tokens & ov.base: tokens, subtree-safe .ov-theme, surface context, focus, motion, print.
  orchard-components.css            @layer ov.components: reusable controls, dialogs, tabs, toasts, and asset-backed craft utilities.
  orchard-layouts.css               @layer ov.layouts: responsive shells and layout recipes.
  orchard-vale.js                   Zero-dependency file://-safe helpers exposing window.OrchardVale.

demo/
  12 interactive static HTML/CSS/JS demos built on src/theme/index.css + orchard-vale.js.

starter/
  Minimal adoption page composed from src/theme/index.css + orchard-vale.js.

scripts/
  validate-theme.mjs                Validates HTML, CSS, JS syntax/paths, IDs, ARIA, image magic bytes, WCAG AA contrast, and links.
  optimize-html-images.mjs          Injects loading, decoding, and width/height dimensions on HTML <img> tags.
```

## Demo Purposes

All 12 demos and `starter/index.html` run on `src/theme/index.css` + `src/theme/orchard-vale.js` with `.ov-demo-bar` navigation and real vanilla JS interactivity:

- `demo/index.html`: visual directory linking to every demo with purpose notes and recommended tour order.
- `demo/friendly-town.html`: simple editorial article and tone proof.
- `demo/town-notice-board.html`: medium-density civic/public information board with interactive filtering and detail views.
- `demo/orchard-morning-briefing.html`: generic mixed-information daily briefing template.
- `demo/orchard-research-report.html`: generic sourced-research report template with print-safe layout.
- `demo/hearthside-commons.html`: productivity suite for mail, calendar, and tasks.
- `demo/command-center.html`: flagship operations dashboard with interactive Village Tableau and 6 switchable district maps.
- `demo/guildhall-project-board.html`: flagship 3-column interactive Kanban project board (consolidating the retired `guildhall-planner.html`).
- `demo/scholars-hollow-workbench.html`: research-and-writing workbench with document editor, evidence cards, inline donut/report charts, and fact-check controls.
- `demo/prosperity-grove-ledger.html`: finance and household-ledger dashboard with real multi-month math, SVG income/expense & donut charts, and add-record dialog.
- `demo/character-gallery.html`: full character and avatar registry showcase.
- `demo/asset-pattern-library.html`: Developer Specimen Workbench exposing all 301 non-character assets with search, copy snippet, live motion playback, and UI recipes.
- `starter/index.html`: setup guide for new and existing pages, with copy-ready HTML and an interactive example.

## Design Rules

- Build real interface structure first. Use assets to support content, not replace it.
- Keep text readable and preserve the 44-pair WCAG AA contrast contract. Do not place body text directly over busy artwork unless the artwork is faded or isolated behind parchment.
- Use parchment surfaces for content, dark green signboards for major headers, brass/wood frames for structure, and restrained red/amber/green/blue/purple for status.
- Use characters intentionally. One or two characters can enrich a panel; too many can clutter a serious product workflow.
- Prefer existing Orchard Vale assets and `ov-*` craft utilities over new decorative SVG or CSS-only flourishes.
- Do not create a generic landing page when the request is for an app, tool, dashboard, or demo. Show the usable interface first.
- Avoid one-note palettes. The theme is forest green plus parchment, brass, walnut, soft sky, muted burgundy, and countryside greens.
- Use stable layout dimensions (`width`/`height` or `aspect-ratio`) for cards, boards, maps, icon grids, tabs, and toolbars so text and imagery do not shift awkwardly.
- Do not let images or decorative backgrounds obscure text.
- Do not use sci-fi neon, glassmorphism, generic corporate stock-photo styling, plastic cartoon UI, or copied game UI.

## Asset Usage Guidance

- Use `scenes/` (`.webp`) for wide atmospheric bands, workbench backdrops, and app context.
- Use `maps/` (`.webp` + `.svg`) for operational dashboards, route planning, district views, and location/status panels.
- Use `characters/fullbody/` (`.webp`) for large helpers, selected task panels, onboarding, empty states, and editorial moments.
- Use `characters/avatars/` (`.webp`) for comments, rosters, assignees, compact helpers, and team selectors.
- Use `heraldry/` (`.webp`) for app identity, trust marks, status seals, approval/review/blocked states, and section identity.
- Use `icons/` (`.svg`) for practical controls and status indicators at small sizes.
- Use `motifs/` (`.svg`) for larger domain category cards and richer feature panels.
- Use `backplates/` and `ornaments/` (`.svg`) for reusable UI surfaces and framing (or use `.ov-panel--ornate`, `.ov-divider`, `.ov-icon-badge`).
- Use `data-viz/` (`.svg`) around real chart/data structures (or `.ov-chart-frame`). Do not fake data with decoration alone.
- Use `textures/` (`.webp` + ink speckle `.png`, wired via `--ov-tex-*` tokens) as layered backgrounds under readable color overlays.
- Use `empty-states/` (`.webp`, horizontally centered) with `.ov-empty-state` when no data, no results, completed work, or clear calendars need visual support.
- Use `motion/` (`.png` spritesheets + `.ov-sprite--*`) sparingly for small feedback or loading moments.
- Never reference `art-sources/` from HTML, CSS, or JS; those are archived raw masters only.

## Implementation Patterns

- Prefer plain static HTML/CSS/JS unless the user explicitly asks for a framework.
- Keep demos directly openable from the filesystem (`file://`) with zero build steps or external network dependencies.
- Import `src/theme/index.css` and `src/theme/orchard-vale.js` on every new page, and apply `class="ov-theme"` on `<body>` (full canvas) or on a host container (subtree-safe embedding).
- Keep page-specific CSS unlayered and minimal; because `src/theme/` uses `@layer ov.tokens, ov.base, ov.components, ov.layouts`, unlayered page styles override theme defaults cleanly without `!important`.
- Include `<nav data-ov-demo-bar></nav>` on demo pages so `orchard-vale.js` injects consistent cross-demo navigation.
- Use `window.OrchardVale` declarative hooks (`[data-ov-tabs]`, `[data-ov-dialog-open]`, `[data-ov-dialog-close]`, `[data-ov-copy]`) and JS helpers (`toast`, `announce`, `openDialog`, `closeDialog`, `copyText`) instead of re-implementing boilerplate.
- Use semantic HTML and accessible controls, especially for tabs, buttons, dialogs (`dialog.ov-dialog`), and disclosures.
- Add meaningful `alt` text for informative images; use `alt=""` for decorative images. Run `npm run optimize:images` when adding new `<img>` tags so `loading`, `decoding`, and `width`/`height` stay consistent.
- When creating new demo pages, link them from `demo/index.html`, add them to `DEMO_CATALOG` in `src/theme/orchard-vale.js`, and document them in `demo/README.md` and `README.md`.
- When adding major showcase screenshots, place polished captures in `demo/screenshots/`.

## Validation Checklist

Before finishing changes to demos, theme files, assets, or docs:

- Run `npm run validate` (checks HTML structure, CSS, JS syntax, JS asset paths, duplicate IDs, anchors/ARIA, image magic bytes, WCAG AA contrast pairs, and local Markdown/HTML references).
- Run `npm run optimize:images:check` to verify `<img>` dimensions and loading attributes.
- Open the affected page at desktop and mobile widths.
- Check that there are no broken images or browser console errors.
- Check that the page has exactly one `main` landmark and one `h1`.
- Check that there is no page-level horizontal overflow.
- Check that text does not overlap or sit on busy artwork.
- Check interactive controls with pointer and keyboard input (including Escape/focus restoration on dialogs and arrow keys on tabs).
- Capture or update screenshots if `README.md` or `demo/index.html` depends on them.

## Git And Publishing Notes

- The root `README.md` is the public GitHub landing page.
- `LICENSE` is MIT.
- `.gitignore` intentionally ignores temporary validation screenshots and `pets/.pet-runs/` while keeping polished `*-desktop.png` and `*-mobile.png` captures.
- Do not remove generated assets or screenshots unless replacing them with better versions and updating links.
- If adding or updating runtime assets, update `src/assets/orchard-vale/asset-manifest.json` and `asset-manifest.js`, update `docs/asset-inventory.md`, and verify `demo/asset-pattern-library.html`.

## Good Agent Behavior In This Repo

- Read `docs/design.md` before making visual changes.
- Reuse `src/theme/index.css`, `src/theme/orchard-vale.js`, and the closest existing demo as a model.
- Make small, coherent edits rather than broad refactors.
- Preserve the handcrafted theme while protecting readability, WCAG AA contrast, and product utility.
- Verify the result visually and technically (`npm run validate`) before reporting completion.
