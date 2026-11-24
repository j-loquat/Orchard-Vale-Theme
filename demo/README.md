# Orchard Vale Demos

This folder holds 12 interactive static HTML/CSS/JS demo pages built on the shared Orchard Vale v2.0 theme (`src/theme/index.css` + `src/theme/orchard-vale.js`), alongside [`../starter/index.html`](../starter/index.html) as a minimal adoption template. Every page opens directly from the filesystem (`file://`) with zero build steps.

## Pages

- `index.html` — Visual demo directory linking to every Orchard Vale demo with screenshots, purpose notes, and a recommended tour order.
- `friendly-town.html` — Simple editorial article and tone proof demonstrating scenes, parchment rhythm, ornaments, heraldry, characters, maps, and motifs in a readable layout.
- `town-notice-board.html` — Medium-density civic/public information board with interactive notice filters, event details, steward avatars, status badges, and map markers.
- `orchard-morning-briefing.html` — Generic mixed-information daily briefing template with top priorities, consulting watch, schedule/free blocks, seven-day lookahead, email triage, news, disclosure replies, and source health.
- `orchard-research-report.html` — Generic sourced-research template with key takeaways, short answer, confirmed/inferred/watch callouts, comparison tables, practical implications, confidence gaps, complete source list, and print-safe layout.
- `hearthside-commons.html` — Productivity suite for mail, calendar, and tasks featuring folder switching, interactive message reading, a ruled calendar view, and task management.
- `command-center.html` — Flagship operations dashboard featuring the interactive Village Tableau, 6 switchable district maps, alert queue, system-health charts, response workflow, steward roster, and live event ledger.
- `guildhall-project-board.html` — Flagship 3-column interactive Kanban project board (consolidating the retired `guildhall-planner.html`) with workspace/assignee filters, card movement, task details, milestone timeline, and activity feed.
- `scholars-hollow-workbench.html` — Research-and-writing workbench with interactive document editing, study library, inline report/donut charts, evidence cards, citations, fact-check controls, and export actions.
- `prosperity-grove-ledger.html` — Finance and household-ledger dashboard with real multi-month math, live SVG income/expense and donut charts, budget meters, transactions, goals, bills, and an accessible add-record dialog.
- `character-gallery.html` — Large-format interactive Character Registry displaying every final WebP full-body helper, matching avatar, and contact sheet.
- `asset-pattern-library.html` — Developer Specimen Workbench powered by `asset-manifest.js`, exposing all 301 non-character assets with live search, family tabs, one-click copyable snippets, live motion playback, and composed UI recipes.

## Interaction Scope

All 12 demos and [`../starter/index.html`](../starter/index.html) include real vanilla JS interactivity powered by `src/theme/orchard-vale.js` (`window.OrchardVale`) and page-specific scripts:

- Unified top `.ov-demo-bar` navigation across every demo and the starter.
- Accessible tabs (`[data-ov-tabs]`), native `<dialog class="ov-dialog">` modals with focus restoration, clipboard copy (`[data-ov-copy]`), toast notifications, and screen-reader announcements.
- Working domain controls in each showcase (filters, card movement, district map switching, folder/message/task switching, document editing/fact-check toggles, live multi-month financial calculations and SVG charts, and asset search/playback).

## Shared Theme Layer

Every demo in this folder—plus [`../starter/index.html`](../starter/index.html)—imports [`../src/theme/index.css`](../src/theme/index.css) and [`../src/theme/orchard-vale.js`](../src/theme/orchard-vale.js). Because the shared theme lives inside `@layer ov.tokens, ov.base, ov.components, ov.layouts`, each demo's scoped `*.css` file stays small and overrides defaults cleanly without `!important`.
