# Orchard Vale Asset Inventory

Last updated: November 2026 (v2.0).

Orchard Vale ships a complete, WebP-optimized asset pack across all 12 categories, backed by machine-readable manifests (`asset-manifest.json` and `asset-manifest.js`). The core implementation principle remains unchanged: text, controls, layout, charts, and interaction stay in real HTML/CSS/JS/SVG, while raster art supplies atmosphere, characters, scenes, heraldry, maps, and empty states.

## Runtime vs. Archived Footprint

In v2.0, runtime raster assets were converted to `.webp` and 66 raw source PNGs were moved out of the runtime tree into [`art-sources/`](../art-sources/), cutting the `src/assets/orchard-vale/` footprint by **~86%** (from ~221 MiB down to **30.6 MiB** / 32.1 MB on disk):

- **Manifest deliverables (`src/assets/orchard-vale/asset-manifest.json`):** **321 assets** (**225 SVG**, **83 WebP**, **13 PNG**; **20.0 MiB** payload).
- **Full runtime tree (`src/assets/orchard-vale/`):** **366 files**, **30.6 MiB** (includes the 321 deliverables plus character contact sheets and the JSON/JS manifests).
- **Archived raw masters (`art-sources/`):** **66 raw PNGs** + `README.md`, **162.4 MiB** (170.3 MB) across `characters/`, `empty-states/`, `heraldry/`, `maps/`, and `scenes/`. Never referenced by demos or `src/theme/`.

## Asset Families (321 Deliverables)

| Area | Location | Count & Format | Manifest Size | Best Use |
| --- | --- | --- | ---: | --- |
| Textures | `src/assets/orchard-vale/textures/` | 7 WebP, 1 PNG (8) | 1.35 MiB | Seamless parchment, aged paper, wood, walnut, brass, green signboard, watercolor wash, and subtle ink-speckle overlay (`--ov-tex-*`) |
| Ornaments | `src/assets/orchard-vale/ornaments/` | 24 SVG | 42 KB | Corners, flourishes, dividers, ribbons, rivets, hinges, frame overlays (`.ov-panel--ornate`, `.ov-divider`) |
| Backplates | `src/assets/orchard-vale/backplates/` | 20 SVG | 54 KB | Button states, badges, tabs, signboards, fields, seals |
| Heraldry | `src/assets/orchard-vale/heraldry/` | 17 WebP | 909 KB | Crests, wax seals, crowns, laurel frames, approval/status marks (`.ov-seal`, `.ov-demo-bar`) |
| Icons | `src/assets/orchard-vale/icons/` | 58 SVG | 56 KB | Navigation, actions, statuses, workflow, finance, export formats |
| Data Viz | `src/assets/orchard-vale/data-viz/` | 50 SVG | 45 KB | Chart frames, meters, ledger rules, timeline plaques, tooltips (`.ov-chart-frame`) |
| Characters | `src/assets/orchard-vale/characters/` | 20 WebP (10 avatars, 10 full-body) | 909 KB | Advisors, assignees, quotes, empty states, contextual helpers |
| Empty States | `src/assets/orchard-vale/empty-states/` | 10 WebP (8 wide, 2 spot; horizontally centered) | 628 KB | Friendly blank states and help panels (`.ov-empty-state`) |
| Scenes | `src/assets/orchard-vale/scenes/` | 20 WebP (16:9 and 21:9) | 10.84 MiB | App shells, article heroes, workbenches, onboarding |
| Maps | `src/assets/orchard-vale/maps/` | 9 WebP backgrounds, 24 SVG markers/controls (33) | 5.14 MiB | Interactive village/district maps, route planning, location dashboards |
| Motifs | `src/assets/orchard-vale/motifs/` | 49 SVG across 7 packs | 49 KB | Domain symbols for AI, CRM, finance, operations, productivity, project, and research |
| Motion | `src/assets/orchard-vale/motion/` | 12 PNG (6 spritesheets, 6 static fallbacks) | 24 KB | Loading, saving, syncing, delivery, completion (`.ov-sprite--*`) |

## Machine-Readable Manifests

Two generated indexes live at the root of the runtime asset directory:

- `src/assets/orchard-vale/asset-manifest.json` — JSON array of all 321 deliverables with family, path, format, dimensions, and byte size.
- `src/assets/orchard-vale/asset-manifest.js` — `file://`-safe script exposing the same manifest for static HTML pages without requiring `fetch()`.

[`demo/asset-pattern-library.html`](../demo/asset-pattern-library.html) loads `asset-manifest.js` to power the **Developer Specimen Workbench**, exposing all **301 non-character assets** with live search, family tabs, one-click HTML/CSS snippet copy, and live spritesheet playback. All 20 character assets (plus contact sheets) are showcased in [`demo/character-gallery.html`](../demo/character-gallery.html).

## Usage Across `src/theme/` And Demos

In v2.0, assets are wired directly into both the reusable theme layer and all 12 interactive demos plus [`starter/index.html`](../starter/index.html):

- **`src/theme/orchard-vale.css`** loads the 8 core texture tokens (`--ov-tex-parchment`, `--ov-tex-parchment-aged`, `--ov-tex-wood-dark`, `--ov-tex-walnut`, `--ov-tex-signboard`, `--ov-tex-brass`, `--ov-tex-watercolor`, `--ov-tex-speckle`).
- **`src/theme/orchard-components.css`** integrates ornaments, dividers, chart frames, empty states, and motion spritesheets into craft utilities (`.ov-panel--ornate`, `.ov-panel--wood-corners`, `.ov-divider--vine`, `.ov-icon-badge`, `.ov-chart-frame`, `.ov-empty-state`, `.ov-sprite--*`).
- **`src/theme/orchard-vale.js`** embeds the Orchard Tree crest (`heraldry/crest-orchard-tree-fullcolor-512.webp`) in `.ov-demo-bar`.
- **All 12 demos** exercise the full range of scenes, district maps, characters, heraldry, icons, motifs, data-viz chrome, empty states, and motion across editorial pages, briefings, reports, productivity suites (`hearthside-commons.html`), operations (`command-center.html`), Kanban (`guildhall-project-board.html`), research (`scholars-hollow-workbench.html`), and finance (`prosperity-grove-ledger.html`).

## Design Risk To Watch

The asset kit is rich enough that overuse is easy. The strongest Orchard Vale pages use one environmental image, a few well-placed ornaments, and restrained characters. If every panel has every treatment, the theme becomes costume instead of interface.
