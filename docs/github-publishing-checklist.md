# GitHub Publishing Checklist

Use this checklist before publishing Orchard Vale as a public GitHub repository.

## Before First Push

- Create the repository with `Orchard-Vale-Theme` as the repo root (matching the GitHub Pages URLs in `README.md` and `docs/design.md`).
- Confirm `README.md` renders correctly in GitHub Desktop or on GitHub.
- Confirm the screenshots used by `README.md` are staged:
  - `demo/screenshots/index-desktop.png`
  - `demo/screenshots/command-center-desktop.png`
  - `demo/screenshots/hearthside-commons-desktop.png`
  - `demo/screenshots/guildhall-project-board-desktop.png`
  - `demo/screenshots/scholars-hollow-workbench-desktop.png`
  - `demo/screenshots/orchard-morning-briefing-desktop.png`
  - `demo/screenshots/orchard-research-report-desktop.png`
  - `demo/screenshots/prosperity-grove-ledger-desktop.png`
  - `demo/screenshots/character-gallery-desktop.png`
  - `demo/screenshots/asset-pattern-library-desktop.png`
- Confirm temporary debug screenshots and `pets/.pet-runs/` ignored by `.gitignore` are not staged.
- Confirm `LICENSE` is staged.
- Run `npm run validate` and `npm run optimize:images:check` and confirm the GitHub Actions validation workflow passes with zero errors (including HTML/CSS/JS checks, image magic bytes, WCAG AA contrast, and local Markdown links).

## License

The repository uses MIT for the full kit. That is simple and permissive for code, demos, documentation, and bundled assets. See [`docs/licensing-and-provenance.md`](licensing-and-provenance.md) for full provenance notes.

## GitHub Pages

After the repo is public:

1. Open repository settings.
2. Go to Pages.
3. Publish from the default branch.
4. Use this path as the main demo entry:

```text
demo/index.html
```

The root-level `index.html` redirects to `demo/index.html`, so the GitHub Pages root opens the demo directory immediately.

## Suggested Repository Description

```text
A richly illustrated storybook-village UI theme kit for HTML front-ends, with interactive demos, WebP-optimized assets, and design docs.
```

## Suggested Topics

```text
html css ui design-system theme-kit dashboard fantasy-ui storybook-ui frontend assets
```
