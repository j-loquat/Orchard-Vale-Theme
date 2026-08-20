# Orchard Vale Design System

The canonical Orchard Vale design specification is [`docs/design.md`](docs/design.md).

Before designing or modifying any user-facing interface, read that document in full and treat it as the visual source of truth.

## Production implementation

Use the existing theme layers before creating new visual patterns:

- [`src/theme/orchard-vale.css`](src/theme/orchard-vale.css) — design tokens, typography, base surfaces, focus, and motion.
- [`src/theme/orchard-components.css`](src/theme/orchard-components.css) — reusable panels, controls, tables, chips, callouts, charts, and content patterns.
- [`src/theme/orchard-layouts.css`](src/theme/orchard-layouts.css) — responsive shells and layout recipes.

For examples, start from the closest matching implementation under [`demo/`](demo/) instead of inventing a new visual system.

## Design intent

Orchard Vale is a practical product UI theme expressed through warm parchment surfaces, dark forest-green headers, brass and carved-wood framing, restrained storybook illustration, and dense but readable information layouts.

Preserve product ergonomics first. Illustration, textures, characters, heraldry, and decorative assets should support the workflow rather than replace real interface structure.

Do not reinterpret Orchard Vale from scratch. Reuse the established tokens, components, layouts, assets, and design rules documented in the canonical guide.
