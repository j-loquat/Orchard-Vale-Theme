# Orchard Vale Design System

The canonical Orchard Vale design specification is [`docs/design.md`](docs/design.md). For pixel-faithful recreation of the original 1672×941 village operations artboard, see [`docs/design-reference-dashboard.md`](docs/design-reference-dashboard.md).

Before designing or modifying any user-facing interface, read `docs/design.md` in full and treat it as the visual source of truth.

## Production implementation

Import the single-entry theme bundle and optional progressive behavior helpers before creating new visual patterns:

- [`src/theme/index.css`](src/theme/index.css) — single-import entry point that loads the three CSS layers in cascade order (`@layer ov.tokens, ov.base, ov.components, ov.layouts`).
  - [`src/theme/orchard-vale.css`](src/theme/orchard-vale.css) — WCAG AA verified design tokens, subtree-safe `.ov-theme` base, automatic light/dark surface context, focus, reduced motion, and print-safe rules.
  - [`src/theme/orchard-components.css`](src/theme/orchard-components.css) — reusable panels, ribbons, controls, dialogs, tabs, toasts, tables, chips, callouts, charts, and asset-backed craft utilities.
  - [`src/theme/orchard-layouts.css`](src/theme/orchard-layouts.css) — responsive shells and layout recipes.
- [`src/theme/orchard-vale.js`](src/theme/orchard-vale.js) — zero-dependency, `file://`-safe helpers (`window.OrchardVale`) for accessible tabs, native `<dialog>` focus restoration, clipboard copy, toasts, screen-reader announcements, and `.ov-demo-bar` navigation.

Follow the [setup guide](starter/index.html) to create a working page. For layout examples, use the closest matching implementation under [`demo/`](demo/).

## Design intent

Orchard Vale is a practical product UI theme expressed through warm parchment surfaces, dark forest-green headers, brass and carved-wood framing, restrained storybook illustration, and dense but readable information layouts.

Preserve product ergonomics first. Illustration, textures, characters, heraldry, and decorative assets should support the workflow rather than replace real interface structure.

Do not reinterpret Orchard Vale from scratch. Reuse the established tokens, components, craft utilities, layouts, assets, and design rules documented in [`docs/design.md`](docs/design.md).
