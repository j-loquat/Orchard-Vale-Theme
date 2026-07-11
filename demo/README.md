# Orchard Vale Demo

This folder holds working HTML demo pages for testing the Orchard Vale theme kit.

## Pages

- `index.html` - A visual demo directory that explains and links to every Orchard Vale demo page, with screenshots, purpose notes, and a recommended tour order.
- `friendly-town.html` - A simple editorial article about Orchard Vale as a friendly town. This is the first proof page for scenes, textures, ornaments, heraldry, characters, maps, motifs, and motion in one readable layout.
- `town-notice-board.html` - A medium-complexity public information board with notices, events, steward avatars, status badges, requests, map markers, motifs, and motion.
- `guildhall-planner.html` - A complex workflow dashboard with an app sidebar, command header, metrics, Kanban lanes, selected-work dossier, timeline, district map, roster, supply ledger, badges, buttons, progress meters, avatars, and responsive app behavior.
- `command-center.html` - A flagship operations dashboard with a watchtower command shell, live situation map, alert queue, system-health charts, response workflow, dependency threads, steward roster, event ledger, command actions, motion, maps, motifs, characters, heraldry, icons, and responsive dense-layout behavior.
- `scholars-hollow-workbench.html` - A close imitation of the Scholar's Hollow research-and-writing mock-up, with top report metrics, study library, source collections, central document editor, inline report charts, large character helpers, evidence cards, citations, fact-check status, source timeline, recent updates, and export controls.
- `guildhall-project-board.html` - A close imitation of the Guildhall Planner projects mock-up, with a board-first five-lane Kanban layout, top workspace/team/filter controls, dense task cards, many character helpers, selected-card details below the board, milestone timeline, and activity feed.
- `orchard-morning-briefing.html` - A generic content-template demo for daily briefings, with three priorities, consulting watch, schedule/free blocks, a seven-day lookahead, email triage, news, suggested replies, source chips, and data health.
- `orchard-research-report.html` - A generic content-template demo for sourced research, with key takeaways, a short answer, confirmed/inferred/watch callouts, comparison tables, practical implications, confidence gaps, and a complete source list.
- `prosperity-grove-ledger.html` - A finance and household-ledger dashboard with balances, budget meters, cash-flow bars, transactions, goals, upcoming bills, a period selector, and an accessible add-record dialog.
- `character-gallery.html` - A character registry and asset showcase that displays every final Orchard Vale full-body helper and matching avatar at generous sizes, plus contact sheets for the complete character set.
- `asset-pattern-library.html` - A tabbed specimen-book gallery for the non-character asset families: scenes, maps, frames, panels, heraldry, icons, motifs, data visualization pieces, textures, empty states, motion stills, and composed UI recipes.

## Interaction Scope

The original dashboard and mock-up pages are static interface studies. Their controls are visual specimens unless the page description says otherwise. `asset-pattern-library.html` includes keyboard tabs and an accessible image-preview dialog. `prosperity-grove-ledger.html` includes a working period selector and add-record flow. Native links, selects, and disclosure controls remain functional throughout the content templates.

## Shared Theme Layer

The Morning Briefing, Scholar's Field Report, Prosperity Grove Ledger, and `starter/index.html` use the reusable files in `src/theme/`. Older demos keep their page-scoped CSS so they remain directly openable and preserve their original compositions.
