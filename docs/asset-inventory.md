# Orchard Vale Asset Inventory

Last updated: April 26, 2026.

The Orchard Vale kit now has a complete first pass across all planned asset categories. The main implementation principle still holds: text, controls, layout, charts, maps, and interaction should stay in HTML/CSS/SVG; raster art supplies atmosphere, characters, scenes, and large visual context.

## What We Have

| Area | Location | Contents | Best Use |
|---|---|---|---|
| Textures | `src/assets/orchard-vale/textures/` | Parchment, aged paper, wood, brass, green signboard, ink speckle, watercolor wash | Page backgrounds, panels, headers, overlays |
| Ornaments | `src/assets/orchard-vale/ornaments/` | Corners, flourishes, dividers, ribbons, rivets, hinges, frame overlays | Panel framing and section rhythm |
| Backplates | `src/assets/orchard-vale/backplates/` | Button states, badges, tabs, signboards, fields, seals | Real HTML controls with themed surfaces |
| Heraldry | `src/assets/orchard-vale/heraldry/` | Crests, wax seals, crowns, laurel frames | Identity, status, workspace and team marks |
| Icons | `src/assets/orchard-vale/icons/` | 58 functional SVG icons | Navigation, actions, statuses, workflow, finance, export formats |
| Data Viz | `src/assets/orchard-vale/data-viz/` | 50 SVG chart/table/timeline/meter ornaments | Chart chrome around real data |
| Characters | `src/assets/orchard-vale/characters/` | 10 avatars and 10 full-body helpers | Advisors, assignees, quotes, empty states |
| Empty States | `src/assets/orchard-vale/empty-states/` | 8 wide empty states and 2 spot illustrations | Friendly blank states and help panels |
| Scenes | `src/assets/orchard-vale/scenes/` | 10 scene backgrounds in 16:9 and 21:9 | App shells, article heroes, onboarding |
| Maps | `src/assets/orchard-vale/maps/` | 9 map backgrounds and 24 SVG markers/controls | Workflow maps, location dashboards |
| Motifs | `src/assets/orchard-vale/motifs/` | 49 domain motifs across 7 packs | Small contextual decoration by app category |
| Motion | `src/assets/orchard-vale/motion/` | 6 sprite sheets and 6 static fallbacks | Loading, saving, syncing, delivery, completion |

## Practical Demo Path

1. Simple editorial page: prove the visual language can support readable prose.
2. Article with interactive asides: add tooltips, tabs, map markers, and motion.
3. Small product page: show themed controls, buttons, badges, and forms.
4. Dashboard page: combine panels, charts, tables, avatars, statuses, and maps.
5. Full app shell: test navigation, responsive layout, data density, and state changes.

## First Design Risk To Watch

The asset kit is rich enough that overuse will be easy. The best Orchard Vale pages should use one strong environmental image, a few well-placed ornaments, and restrained characters. If every panel has every treatment, the theme becomes costume instead of interface.
