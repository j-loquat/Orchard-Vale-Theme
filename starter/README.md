# Orchard Vale Starter Kit (v2.0)

Open `starter/index.html` directly in any browser (`file://` or HTTP) to see a working, zero-dependency Orchard Vale workspace.

## Lightweight Adoption (~400 KB Core)

You do **not** need to copy the entire illustration library to use Orchard Vale in an app. Start with two small folders:

1. **Theme stylesheets & helper** (`src/theme/`, ~35 KB total):
   - `src/theme/index.css` — single import entry (loads `orchard-vale.css`, `orchard-components.css`, and `orchard-layouts.css` in `@layer` order).
   - `src/theme/orchard-vale.js` — optional zero-dependency IIFE exposing `window.OrchardVale`.
2. **Core WebP textures** (`src/assets/orchard-vale/textures/`, ~400 KB total):
   - `texture-parchment-seamless-1024.webp`
   - `texture-parchment-aged-soft-1024.webp`
   - `texture-wood-dark-carved-1024.webp`
   - `texture-wood-walnut-panel-1024.webp`
   - `texture-green-signboard-1024.webp`
   - `texture-brass-hammered-1024.webp`
   - `texture-watercolor-countryside-wash-1024.webp`
   - `overlay-ink-speckle-subtle-1024.png`

Then cherry-pick only the specific SVG icons, ornaments, data-viz frames, heraldry crests, or empty-state `.webp` files your screens actually reference. Keep `src/assets/orchard-vale` at the same relative path from `src/theme/`, or override the `--ov-tex-*` CSS variables in `:root`.

## Quick Start

```html
<link rel="stylesheet" href="src/theme/index.css">
<script src="src/theme/orchard-vale.js" defer></script>
```

### Full-Page App

Add `class="ov-theme"` to `<body>` for the dark carved-wood page canvas, parchment panels, and responsive shell:

```html
<body class="ov-theme">
  <div class="ov-page">
    <main class="ov-shell ov-frame">
      <section class="ov-panel ov-panel--ornate">
        <h1 class="ov-panel-title">My Workspace</h1>
        <div class="ov-panel__body">...</div>
      </section>
    </main>
  </div>
</body>
```

### Subtree Embedding

All typography, links, and focus rules are scoped to `.ov-theme`, and every theme rule lives inside `@layer ov.tokens, ov.base, ov.components, ov.layouts`. To embed an Orchard Vale widget inside an existing app without affecting the rest of the page, place `class="ov-theme"` on the widget container instead of `<body>` — any unlayered host CSS overrides theme defaults cleanly without `!important`.

## Key v2.0 Primitives

- **Surfaces & Craft Utilities**: `.ov-frame`, `.ov-panel`, `.ov-panel--aged`, `.ov-panel--green`, `.ov-panel--ornate`, `.ov-panel--wood-corners`, `.ov-card`, `.ov-divider` / `.ov-divider--vine`, `.ov-icon-badge`, `.ov-chart-frame`, `.ov-seal`, `.ov-timeline-plaque`, `.ov-empty-state`, `.ov-sprite` (`--gear`, `--quill`, `--shield`, `--page`, `--courier`, `--lantern`).
- **Interactive Components**: `.ov-tabs` / `.ov-tablist` / `.ov-tab` / `.ov-tabpanel`, `dialog.ov-dialog`, `.ov-nav-list`, `.ov-field-group` / `.ov-label` / `.ov-input` / `.ov-check` / `.ov-field-hint` / `.ov-field-error`, `.ov-toast`, `.ov-tooltip`, `.ov-kbd`, `.ov-demo-bar`.
- **JavaScript Helpers (`window.OrchardVale`)**:
  - `[data-ov-tabs]` (add `data-ov-tabs-hash` for URL hash sync) — click + arrow/Home/End keyboard tabs.
  - `[data-ov-dialog-open="id"]` & `[data-ov-dialog-close]` — modal open/close, backdrop click, focus restoration.
  - `[data-ov-copy]` (optional `data-ov-copy-target="#selector"`) — clipboard copy with label swap and toast.
  - `[data-ov-demo-bar]` — shared top navigation bar across demos and starter.
  - `OrchardVale.toast(message, tone)` and `OrchardVale.announce(message)`.
