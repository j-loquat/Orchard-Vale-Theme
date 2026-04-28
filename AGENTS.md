# AGENTS.md

This repository is the Orchard Vale Theme Kit. Treat this file as the working brief for coding agents modifying the project.

## Project Identity

Orchard Vale is a richly illustrated storybook-village UI theme for HTML front-ends. It combines practical SaaS/product UI with warm parchment panels, dark forest-green headers, brass trim, carved wood frames, heraldry, illustrated maps, woodland helper characters, and dense but readable interface layouts.

The theme should feel handcrafted, premium, cozy, organized, and useful. It should not feel like a generic fantasy tavern, a game HUD clone, childish clipart, or decorative art pasted over a product UI.

## Start Here

Before making design or code changes, inspect these files:

- `README.md` for the public repo overview.
- `docs/design.md` for the canonical design guide.
- `demo/index.html` for the full demo directory.
- `demo/asset-pattern-library.html` for the reusable asset families and UI recipes.
- `demo/character-gallery.html` for the full character set.
- `docs/asset-inventory.md` for a compact asset overview.

When you need an example layout, start from the closest existing demo instead of inventing a new visual system.

## Repository Map

```text
docs/
  design.md                         Canonical Orchard Vale design guide.
  asset-generation-plan.md          Asset category plan and progress record.
  asset-inventory.md                Compact inventory of generated assets.
  github-publishing-checklist.md    Publishing checklist.

references/
  Original reference mock-ups used to define the visual language.

src/assets/orchard-vale/
  backplates/       Button, field, ribbon, badge, tab, and label surfaces.
  characters/       Full-body helpers, avatars, contact sheets, source-keyed assets.
  data-viz/         Chart frames, meters, ledger rules, timeline plaques, tooltips.
  empty-states/     Larger empty-state illustrations and spot art.
  heraldry/         Crests, seals, shields, laurel frames, status marks.
  icons/            32px product icons for actions, navigation, status, data, workflow.
  maps/             Map backgrounds, route maps, markers, pins, controls.
  motifs/           96px domain motifs for AI, CRM, finance, operations, productivity, project, research.
  motion/           Static previews and spritesheets for small animations.
  ornaments/        Corners, dividers, hinges, rivets, frames, scroll caps, flourishes.
  scenes/           Wide and ultrawide illustrated backdrops.
  textures/         Parchment, signboard, wood, brass, watercolor, ink overlays.

src/theme/
  Early CSS token and theme foundation files.

demo/
  Static HTML/CSS demos. These are currently the most complete implementations of the theme.
```

## Demo Purposes

- `demo/friendly-town.html`: simple editorial article and tone proof.
- `demo/town-notice-board.html`: medium-density civic/public information board.
- `demo/guildhall-planner.html`: complex workflow/productivity dashboard.
- `demo/command-center.html`: flagship operations dashboard.
- `demo/scholars-hollow-workbench.html`: research-and-writing mock-up imitation.
- `demo/guildhall-project-board.html`: project/Kanban mock-up imitation.
- `demo/character-gallery.html`: full character and avatar showcase.
- `demo/asset-pattern-library.html`: tabbed specimen book for non-character assets and UI recipes.
- `demo/index.html`: visual directory linking to every demo.

## Design Rules

- Build real interface structure first. Use assets to support content, not replace it.
- Keep text readable. Do not place body text directly over busy artwork unless the artwork is faded or isolated.
- Use parchment surfaces for content, dark green signboards for major headers, brass/wood frames for structure, and restrained red/amber/green/blue/purple for status.
- Use characters intentionally. One or two characters can enrich a panel; too many can clutter a serious product workflow.
- Prefer existing Orchard Vale assets over new decorative SVG or CSS-only flourishes.
- Do not create a generic landing page when the request is for an app, tool, dashboard, or demo. Show the usable interface first.
- Avoid one-note palettes. The theme is forest green plus parchment, brass, walnut, soft sky, muted burgundy, and countryside greens.
- Use stable layout dimensions for cards, boards, maps, icon grids, tabs, and toolbars so text and imagery do not shift awkwardly.
- Do not let images or decorative backgrounds obscure text.
- Do not use sci-fi neon, glassmorphism, generic corporate stock-photo styling, plastic cartoon UI, or copied game UI.

## Asset Usage Guidance

- Use `scenes/` for wide atmospheric bands, workbench backdrops, and app context.
- Use `maps/` for operational dashboards, route planning, district views, and location/status panels.
- Use `characters/fullbody/` for large helpers, selected task panels, onboarding, empty states, and editorial moments.
- Use `characters/avatars/` for comments, rosters, assignees, compact helpers, and team selectors.
- Use `heraldry/` for app identity, trust marks, status seals, approval/review/blocked states, and section identity.
- Use `icons/` for practical controls and status indicators at small sizes.
- Use `motifs/` for larger domain category cards and richer feature panels.
- Use `backplates/` and `ornaments/` for reusable UI surfaces and framing.
- Use `data-viz/` around real chart/data structures. Do not fake data with decoration alone.
- Use `textures/` as layered backgrounds under readable color overlays.
- Use `empty-states/` when no data, no results, completed work, or clear calendars need visual support.
- Use `motion/` sparingly for small feedback or loading moments.

## Implementation Patterns

- Prefer plain static HTML/CSS/JS unless the user explicitly asks for a framework.
- Keep demos directly openable from the filesystem where possible.
- Keep CSS scoped per demo unless intentionally extracting shared theme CSS.
- Use semantic HTML and accessible controls, especially for tabs, buttons, modals, and lightboxes.
- Add alt text for meaningful images. Decorative images can use empty alt text.
- When creating new pages, link them from `demo/index.html` and document them in `demo/README.md`.
- When adding major showcase screenshots, place polished captures in `demo/screenshots/`.

## Validation Checklist

Before finishing changes to demos or assets:

- Open the affected page at desktop and mobile widths.
- Check that there are no broken images.
- Check browser console for errors.
- Check that the page has exactly one main `h1`.
- Check that there is no page-level horizontal overflow.
- Check that text does not overlap or sit on busy artwork.
- Check interactive controls with pointer and keyboard where relevant.
- Capture or update screenshots if the public README or demo index depends on them.

## Git And Publishing Notes

- The root `README.md` is the public GitHub landing page.
- `LICENSE` is MIT.
- `.gitignore` intentionally ignores temporary validation screenshots while keeping polished `*-desktop.png` and `*-mobile.png` captures.
- Do not remove generated assets or screenshots unless replacing them with better versions and updating links.
- If adding a new asset family, update `docs/asset-inventory.md` and consider adding it to `demo/asset-pattern-library.html`.

## Good Agent Behavior In This Repo

- Read the design guide before making visual changes.
- Reuse the closest existing demo as a model.
- Make small, coherent edits rather than broad refactors.
- Preserve the handcrafted theme while protecting readability and product utility.
- Verify the result visually and technically before reporting completion.
