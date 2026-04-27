# Contributing

Orchard Vale is a visual theme kit, so contributions should preserve both usability and atmosphere.

## Design Principles

- Keep interfaces readable before adding ornament.
- Use storybook assets to support real controls, content, tables, charts, forms, and layouts.
- Prefer warm parchment surfaces, dark green headers, brass trim, carved wood frames, and restrained status colors.
- Avoid generic medieval tavern styling, sci-fi neon, childish clipart, and decoration that competes with interface content.

## Adding A Demo

1. Add the page under `demo/`.
2. Keep the demo static and directly openable in a browser when possible.
3. Add a screenshot under `demo/screenshots/`.
4. Link the page from `demo/index.html` and `demo/README.md`.
5. Update the root `README.md` if the demo becomes a major showcase.

## Adding Assets

1. Place assets under the matching `src/assets/orchard-vale/` family.
2. Keep filenames descriptive and lowercase with hyphens.
3. Add or update the family `README.md` when adding a meaningful batch.
4. Update `docs/asset-inventory.md` if the inventory changes substantially.

## Validation

Before publishing changes, open the affected demo pages at desktop and mobile widths and check:

- No broken images.
- No horizontal page overflow.
- Text remains readable and does not sit over busy artwork.
- Interactive controls still work with keyboard and pointer input.
