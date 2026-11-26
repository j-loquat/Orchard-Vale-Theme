# Changelog

All notable changes to Orchard Vale are recorded here. The project follows semantic versioning for documented releases.

## Unreleased

- Refreshed the Village Overview and all six Command Center district maps with daylight artwork and aligned the live markers with their landmarks.
- Refreshed the countryside route map in the same daylight style with 12 blank waypoint sockets.
- Kept Asset Pattern Library thumbnails within their preview frames across family tabs and search results.
- Reworked the starter kit into a setup guide with readable navigation, complete starter HTML, and steps for new pages, existing pages, and coding assistants.
- Removed version labels from site copy and added reuse instructions to the Asset Pattern Library’s Component Examples tab.
- Added a downloadable research report kit with the editable template, offline example, and coding assistant instructions.
- Moved the Command Center controls and scale below the map on narrow screens.
- Expanded automated contrast coverage to all 44 documented token pairs and darkened light-surface links for parchment.
- Aligned the package version with the release, corrected asset sizes in both manifests, and added manifest and HTML image hint checks to CI.

## [2.0.0] - 2026-11-24

### Added

- **Single-import CSS entry point (`src/theme/index.css`)** organizing tokens, base styles, components, and layouts into explicit cascade layers (`@layer ov.tokens, ov.base, ov.components, ov.layouts`).
- **Zero-dependency progressive helpers (`src/theme/orchard-vale.js`)** exposing `window.OrchardVale` (`init`, `announce`, `toast`, `openDialog`, `closeDialog`, `copyText`, `enhanceDemoBar`) with declarative `[data-ov-tabs]`, `[data-ov-dialog-open]`, `[data-ov-dialog-close]`, `[data-ov-copy]`, and `[data-ov-demo-bar]` hooks.
- **Asset-backed craft utilities and UI components** in `src/theme/orchard-components.css`: `.ov-panel--ornate`, `.ov-panel--wood-corners`, `.ov-divider` / `.ov-divider--vine`, `.ov-icon-badge`, `.ov-chart-frame`, `.ov-empty-state`, `.ov-sprite--*`, `dialog.ov-dialog`, `.ov-tabs`, `.ov-card`, `.ov-nav-list`, `.ov-demo-bar`, `.ov-toast`, and `.ov-tooltip`.
- **Hearthside Commons (`demo/hearthside-commons.html`)** productivity demo for mail, calendar, and tasks.
- **Machine-readable asset manifests** (`src/assets/orchard-vale/asset-manifest.json` and `asset-manifest.js`) indexing all 321 runtime deliverables.
- **Archived raw art directory (`art-sources/`)** separating 66 raw PNG masters (~170 MB) from the runtime asset tree.
- **Standalone legacy artboard spec (`docs/design-reference-dashboard.md`)** separating the fixed 1672×941 pixel-faithful reference spec from the canonical adaptive design guide.

### Changed

- **86% runtime asset size reduction**: converted 7 opaque textures, 20 characters, 17 heraldry assets, and 10 horizontally centered empty states to `.webp`, reducing `src/assets/orchard-vale/` from ~221 MiB to ~30.6 MiB (321 deliverables: 225 SVG, 83 WebP, 13 PNG).
- **Subtree-safe `.ov-theme` and automatic surface context**: `.ov-theme` can now theme embedded subtrees without leaking onto host pages, while light and dark surfaces automatically adapt link, kicker, and focus tokens.
- **WCAG AA contrast compliance**: verified and refined tokens across all 44 foreground/background pairs (`--ov-ink-muted`, `--ov-blue`, `--ov-red-ink`, `--ov-amber-ink`, and light/dark link/focus tokens).
- **Unified demo suite**: migrated all 12 demos and `starter/index.html` onto `src/theme/index.css` + `src/theme/orchard-vale.js` with real vanilla JS interactivity and `.ov-demo-bar` navigation.
- **Consolidated Kanban flagship**: retired `demo/guildhall-planner.html` and merged its workflow capabilities into the 3-column interactive `demo/guildhall-project-board.html`.
- **Rebuilt flagship demos**:
  - `demo/command-center.html`: interactive Village Tableau plus 6 switchable district maps.
  - `demo/scholars-hollow-workbench.html`: improved mobile layout, live donut chart, interactive document editor, and fact-check controls.
  - `demo/prosperity-grove-ledger.html`: real multi-month financial calculations with live SVG income/expense and donut charts.
  - `demo/asset-pattern-library.html`: rebuilt as a Developer Specimen Workbench exposing all 301 non-character assets with search, copyable snippets, and live motion playback.
- **Print and reduced-motion safeguards**: layered `!important` print rules ensure crisp dark-ink-on-white printing across every themed page; reduced-motion rules zero both durations and delays.
- **Documentation refresh**: updated `README.md`, `AGENTS.md`, `DESIGN.md`, `docs/design.md`, `docs/asset-inventory.md`, `demo/README.md`, and `docs/github-publishing-checklist.md` (including `Orchard-Vale-Theme` casing consistency).

### Improved

- **Expanded validation (`scripts/validate-theme.mjs`)**: added JS syntax checks, JS asset path verification, duplicate ID detection, anchor/ARIA checks, image magic-byte verification, and WCAG AA contrast validation.
- **HTML image optimizer (`scripts/optimize-html-images.mjs`)**: now injects `width` and `height` dimensions alongside `loading` and `decoding` attributes.
- **Git hygiene**: untracked and gitignored `pets/.pet-runs/`.

## 1.1.0 - 2026-07-11

### Added

- Reusable theme foundation, component, and layout CSS layers.
- Minimal static HTML starter.
- Generic Morning Briefing content-template demo.
- Generic Scholar's Field Report research-template demo.
- Prosperity Grove finance and ledger demo with working period and record controls.
- Automated HTML, CSS, JavaScript, and local-reference validation.
- Image loading and decoding optimization helper.
- Licensing and asset-provenance guidance.

### Improved

- Pattern Library dialog semantics, focus trapping, and focus restoration.
- Research workbench toolbar labels and small-text floor.
- Reduced-motion and focus treatment across showcase pages.
- Asset-preview landmarks and mobile scene-preview overflow.
- Demo inventory, counts, documentation, and public entry points.

## 1.0.0 - 2026-04-27

- Initial public theme kit, asset library, design guide, and eight-demo showcase.
