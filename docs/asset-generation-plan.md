# Orchard Vale Asset Generation Plan

This plan lists Orchard Vale image asset categories in the order we should generate them. The order matters: foundation assets make the theme usable first, then character and scene assets add personality. Text, controls, tables, charts, and layout should remain real HTML/CSS.

## Progress

Last updated: April 26, 2026.

| Order | Category | Status | Output Location | Notes |
|---:|---|---|---|---|
| 1 | Surface textures | Complete | `src/assets/orchard-vale/textures/` | Eight normalized `1024x1024` texture/overlay assets, contact sheet, tile preview, and README. |
| 2 | Borders, corners, and flourishes | Complete | `src/assets/orchard-vale/ornaments/` | SVG corner caps, dividers, ribbons, rivets, hinges, chain links, frame overlays, preview page, contact sheet, and README. |
| 3 | Buttons, badges, and UI backplates | Complete | `src/assets/orchard-vale/backplates/` | SVG button states, signboards, badges, pills, seals, fields, preview page, contact sheet, and README. |
| 4 | Crests, seals, and heraldry | Complete | `src/assets/orchard-vale/heraldry/` | Seventeen transparent `512x512` PNG crests, seals, heraldic frames, preview page, checker preview, contact sheet, source keyed images, and README. |
| 5 | Functional icons | Complete | `src/assets/orchard-vale/icons/` | Fifty-eight validated SVG icons for navigation, status, actions, data, workflow, infrastructure, finance, and export formats, plus preview page, contact sheet, and README. |
| 6 | Data visualization ornament | Complete | `src/assets/orchard-vale/data-viz/` | Fifty validated SVG assets for chart frames, gridlines, axis ornaments, ledger dividers, meter pieces, timeline plaques, tooltip shells, category symbols, compact charts, preview page, contact sheet, and README. |
| 7 | Illustrated characters | Complete | `src/assets/orchard-vale/characters/` | Ten transparent `512x512` medallion avatar PNGs, ten transparent `1024x1024` full-body helper PNGs, source keyed generations, preview page, contact sheets, and README. |
| 8 | Empty states and spot illustrations | Complete | `src/assets/orchard-vale/empty-states/` | Eight transparent `800x600` empty-state PNGs, two transparent `512x512` spot PNGs, source keyed generations, preview page, contact sheet, and README. |
| 9 | Scene backgrounds | Complete | `src/assets/orchard-vale/scenes/` | Ten generated scene sources, ten normalized `1920x1080` WebP `16x9` backgrounds, ten derived `2560x1080` WebP `21x9` backgrounds, preview page, contact sheets, and README. |
| 10 | Mini-maps and location art | Complete | `src/assets/orchard-vale/maps/` | Nine generated unlabeled `1600x900` WebP map backgrounds, original generated sources, twenty-four validated SVG markers/controls, preview page, contact sheets, and README. |
| 11 | App-specific motif packs | Complete | `src/assets/orchard-vale/motifs/` | Forty-nine validated SVG motifs across research, finance, productivity, project, AI, CRM, and operations packs, plus preview page, contact sheet, and README. |
| 12 | Loading and motion frames | Complete | `src/assets/orchard-vale/motion/` | Six transparent PNG sprite sheets, six static fallback PNGs, CSS preview page, contact sheet, and README. |

## Generation Order

| Order | Category | Why Now |
|---:|---|---|
| 1 | Surface textures | Gives every HTML component the Orchard Vale material feel immediately |
| 2 | Borders, corners, and flourishes | Turns plain panels into carved/parchment UI without needing large illustrations |
| 3 | Buttons, badges, and UI backplates | Supports real controls and labels with reusable themed frames |
| 4 | Crests, seals, and heraldry | Establishes identity, status, teams, workspaces, and app marks |
| 5 | Functional icons | Makes navigation, actions, statuses, and data controls theme-native |
| 6 | Data visualization ornament | Lets charts, timelines, ledgers, and meters fit the theme cleanly |
| 7 | Illustrated characters | Adds avatars, advisors, assignees, and warmth once the UI system exists |
| 8 | Empty states and spot illustrations | Uses characters and props for specific UX states |
| 9 | Scene backgrounds | Adds large environmental context for dashboards and hero work areas |
| 10 | Mini-maps and location art | Supports map/dashboard variants after the scene language is stable |
| 11 | App-specific motif packs | Fills out domain details for research, finance, productivity, kanban, CRM, and ops |
| 12 | Loading and motion frames | Adds polish after the static system works |

## 1. Surface Textures

Purpose: foundational CSS backgrounds for panels, frames, buttons, headers, and page shells.

Generate:

- Seamless parchment texture.
- Aged parchment with faint stains.
- Dark carved wood grain.
- Walnut wood plank texture.
- Brass/gold hammered metal texture.
- Green painted signboard texture.
- Subtle ink speckle/noise overlay.
- Soft watercolor countryside wash.

Recommended outputs:

- Seamless tiles at `512x512` or `1024x1024`.
- Low-contrast texture so text remains readable.
- No embedded text, labels, icons, or strong focal objects.

Example filenames:

```text
texture-parchment-seamless-1024.png
texture-parchment-aged-soft-1024.png
texture-wood-dark-carved-1024.png
texture-brass-hammered-512.png
texture-green-signboard-1024.png
overlay-ink-speckle-subtle-1024.png
```

## 2. Borders, Corners, And Flourishes

Purpose: reusable ornament layered over real HTML panels.

Generate:

- Brass corner caps.
- Dark wood corner caps.
- Thin ivy corner flourishes.
- Horizontal leaf dividers.
- Scroll end caps.
- Ribbon tails.
- Small rivets, tacks, hinges, and chain links.
- Ornate frame overlays for large panels.

Recommended outputs:

- Prefer SVG for corners, dividers, ribbons, and simple ornaments.
- Use transparent PNG for painterly details.
- Generate mirrored pairs for left/right and top/bottom use.
- Keep ornament outside text-heavy content areas.

Example filenames:

```text
corner-brass-ivy-top-left.svg
corner-brass-ivy-top-right.svg
divider-leaf-horizontal-gold.svg
rivet-brass-small-64.png
chain-link-brass-vertical.svg
ribbon-tail-green-left.svg
```

## 3. Buttons, Badges, And UI Backplates

Purpose: decorative plates behind real HTML text and controls.

Generate:

- Blank green signboard header.
- Blank parchment button plate.
- Blank brass primary button plate.
- Blank red warning seal.
- Blank amber review seal.
- Blank blue selection tab.
- Blank purple category badge.
- Blank scroll ribbon.
- Blank small count badge.
- Blank square icon button plate.

Recommended outputs:

- SVG or nine-slice-compatible PNG.
- No text baked into the asset.
- Designed to stretch horizontally without distortion.
- Include normal, hover, pressed, and disabled visual states where useful.

Example filenames:

```text
backplate-button-parchment-default.svg
backplate-button-brass-primary.svg
backplate-header-green-signboard.svg
badge-seal-red-blank.svg
badge-tab-blue-selected.svg
ribbon-scroll-blank-wide.svg
```

## 4. Crests, Seals, And Heraldry

Purpose: brand marks, workspace icons, team badges, status seals, section markers, and app identity.

Generate:

- Orchard tree crest.
- Crossed tools crest.
- Book/quill crest.
- Shield/check crest.
- Gear/shield crest.
- Coin/tree finance crest.
- Mail/calendar productivity crest.
- Project board/guildhall crest.
- Wax seals for approved, draft, blocked, review, urgent, archived.
- Small laurels, crowns, and badge frames.

Recommended outputs:

- SVG where possible for crisp UI scaling.
- Transparent PNG fallback at `512x512`.
- Monochrome ink variant and full-color brass/green variant.

Example filenames:

```text
crest-orchard-tree-fullcolor-512.png
crest-book-quill-fullcolor-512.png
crest-finance-coin-tree-512.png
seal-approved-green.svg
seal-blocked-red.svg
frame-badge-laurel-gold.svg
```

## 5. Functional Icons

Purpose: functional UI icons with Orchard Vale styling.

Generate:

- Navigation: inbox, calendar, tasks, archive, search, settings, filters.
- Status: healthy, warning, error, blocked, done, pending, in progress, review.
- Actions: add, edit, delete, reply, export, publish, share, download, upload.
- Data: chart, ledger, table, timeline, map, source, citation, document.
- Workflow: bug, enhancement, epic, note, sprint, release, dependency.
- Infrastructure: gear, server, shield, pipeline, code, test flask, package, crown.
- Finance: coin stack, purse, bank, card, bill, savings, investment tree.

Recommended outputs:

- SVG icon set with consistent stroke/fill language.
- `24px`, `32px`, and `48px` display targets.
- Dark ink outline with restrained fills.
- Icons must be readable without relying on text labels.

Example filenames:

```text
icon-status-healthy-32.svg
icon-action-export-32.svg
icon-nav-calendar-32.svg
icon-workflow-bug-32.svg
icon-data-ledger-32.svg
icon-finance-coin-stack-32.svg
```

## 6. Data Visualization Ornament

Purpose: make real charts, ledgers, timelines, and meters feel native without hurting readability.

Generate:

- Chart frame corners.
- Ledger row divider ornaments.
- Axis tick flourishes.
- Donut chart center medallions.
- Timeline milestone plaques.
- Progress meter end caps.
- Tiny category symbols.
- Tooltip parchment shells.

Recommended outputs:

- Mostly SVG.
- Use with real chart libraries or CSS-rendered charts.
- Keep ornament outside plotted data whenever possible.
- Avoid baked-in numbers or labels.

Example filenames:

```text
chart-frame-corner-brass.svg
ledger-divider-thin-ornament.svg
timeline-milestone-plaque-green.svg
meter-endcap-brass-left.svg
tooltip-parchment-shell.svg
```

## 7. Illustrated Characters

Purpose: avatars, advisors, helpers, assignees, empty states, onboarding moments, and status context.

Generate:

- Portrait avatars in circular/medallion crops.
- Full-body seated/standing helper poses.
- Small action poses for cards and empty states.
- Role-specific variants with consistent clothing and props.
- Neutral, happy, concerned, busy, and celebrating expressions.

Character set:

- Badger: orchestrator, steward, reviewer, finance advisor.
- Fox: implementer, strategist, messenger, support specialist.
- Owl: scholar, researcher, analyst, fact-checker.
- Rabbit: planner, coordinator, calendar assistant.
- Squirrel: inventory, savings, resource manager.
- Deer: documentation, governance, quality.
- Mouse: clerk, note-taker, junior helper.
- Mole: CI engineer, infrastructure, database specialist.
- Otter: customer success, communications, facilitation.
- Robin: courier, notifications, lightweight alerts.

Recommended outputs:

- `avatars/character-role-expression.png`, transparent background.
- `characters/fullbody-character-role-pose.png`, transparent background.
- At least `512x512` for avatars and `1024x1024` for full-body figures.
- Keep clothing and rendering consistent across the set.

Example filenames:

```text
avatar-badger-orchestrator-neutral-512.png
avatar-fox-implementer-focused-512.png
avatar-owl-scholar-neutral-512.png
character-rabbit-planner-standing-1024.png
character-mole-engineer-working-1024.png
```

## 8. Empty States And Spot Illustrations

Purpose: soften empty queues, no results, loading states, completed workflows, and errors.

Generate:

- Fox sorting mail.
- Owl reading an empty ledger.
- Badger reviewing a checklist.
- Rabbit placing calendar markers.
- Mole inspecting pipes/gears.
- Squirrel organizing coins/resources.
- Deer writing documentation.
- Courier robin delivering a note.
- Quiet village notice board.
- Empty desk with quill and lantern.

Recommended outputs:

- Transparent PNG.
- `800x600` and `512x512` variants.
- Composition should leave room for HTML text beside it.
- No baked-in explanatory copy.

Example filenames:

```text
empty-fox-mail-sorted-800.png
empty-owl-ledger-no-results-800.png
empty-badger-checklist-complete-800.png
empty-rabbit-calendar-clear-800.png
spot-desk-quill-lantern-512.png
```

## 9. Scene Backgrounds

Purpose: large contextual backgrounds for dashboards, empty states, login/onboarding, and map-like work areas.

Generate:

- Wide Orchard Vale village panorama.
- Research library / study hall.
- Prosperity Grove finance garden.
- Hearthside mailroom and calendar desk.
- Guildhall planning room.
- Workshop/forge build area.
- Watermill automation area.
- Stables deployment area.
- Watchtower monitoring area.
- Countryside route/map background.

Recommended outputs:

- `16:9` and `21:9` variants.
- No text baked into the image.
- Leave calmer negative-space zones where HTML panels can sit.
- Make foreground contrast lower when the image will sit behind UI.

Example filenames:

```text
scene-orchard-vale-village-wide-16x9.webp
scene-library-studyhall-wide-16x9.webp
scene-guildhall-planner-wide-16x9.webp
scene-watchtower-monitoring-wide-16x9.webp
scene-watermill-automation-wide-16x9.webp
```

## 10. Mini-Maps And Location Art

Purpose: dashboards, navigation previews, workflow maps, and status overviews.

Generate:

- Full village mini-map.
- District maps for forge, library, market, watermill, stables, guildhall.
- Route map with empty marker positions.
- Blank parchment map base.
- Map marker shields in multiple colors.
- Compass rose and map controls.

Recommended outputs:

- Background maps as PNG/WebP.
- Markers and controls as SVG or transparent PNG.
- No labels baked in; labels should be HTML.

Example filenames:

```text
map-village-overview-unlabeled-16x9.webp
map-district-guildhall-unlabeled.webp
map-base-parchment-route-empty.webp
marker-shield-green.svg
marker-shield-red.svg
compass-rose-brass.svg
```

## 11. App-Specific Motif Packs

Purpose: each product category gets a small vocabulary of supporting images.

Generate:

### Research / Documentation

- Books, scrolls, quills, citations, evidence cards, magnifying glass, library shelves.

### Finance / Ledger

- Coins, bank, bill, purse, investment tree, savings jar, budget ledger.

### Mail / Calendar / Tasks

- Envelopes, calendar tiles, stamps, task scrolls, inbox trays, notification bells.

### Project / Kanban

- Work boards, sprint banners, task plaques, bug jars, release crates, dependency chains.

### AI / Orchestration

- Agent medallions, context books, token scrolls, compute gears, risk shields, pipeline icons.

### CRM / Contacts

- Roster books, handshake seals, contact cards, meeting table, relationship threads.

### Inventory / Operations

- Crates, shelves, wagons, stock ledgers, route markers, workshop tools.

Recommended outputs:

- Small transparent PNGs and SVG icons.
- Keep each motif readable at `32-96px`.
- Use these as domain flavor, not primary controls.

Example filenames:

```text
motif-research-evidence-card-96.png
motif-finance-savings-jar-96.png
motif-productivity-calendar-tile-96.png
motif-project-release-crate-96.png
motif-ai-token-scroll-96.png
```

## 12. Loading And Motion Frames

Purpose: small animated states for loading, saving, syncing, and processing.

Generate:

- Spinning gear/watermill wheel frames.
- Turning page frames.
- Flickering lantern frames.
- Courier bird delivery frames.
- Quill writing frames.
- Shield check completion frames.

Recommended outputs:

- Sprite sheets or short transparent WebM/Lottie only if needed.
- Also create a static fallback frame.
- Motion should be subtle and not childish.
- Use after the static asset set is working in HTML.

Example filenames:

```text
motion-gear-spin-spritesheet.png
motion-quill-writing-spritesheet.png
motion-lantern-flicker-spritesheet.png
motion-courier-delivery.webm
motion-shield-check-complete.webm
```

## Naming Convention

Use clear, stable filenames:

```text
category-subcategory-description-variant-size.ext
```

Examples:

```text
avatar-badger-orchestrator-neutral-512.png
crest-orchard-tree-fullcolor-512.png
texture-parchment-seamless-1024.png
corner-brass-ivy-top-left.svg
icon-status-healthy-32.svg
scene-guildhall-planner-wide-16x9.webp
empty-owl-ledger-no-results-800.png
```
