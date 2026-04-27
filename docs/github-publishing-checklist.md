# GitHub Publishing Checklist

Use this checklist before publishing Orchard Vale as a public GitHub repository.

## Before First Push

- Create the repository with `orchard-vale-theme` as the repo root.
- Confirm `README.md` renders correctly in GitHub Desktop or on GitHub.
- Confirm the screenshots used by `README.md` are staged:
  - `demo/screenshots/index-desktop.png`
  - `demo/screenshots/command-center-desktop.png`
  - `demo/screenshots/guildhall-project-board-desktop.png`
  - `demo/screenshots/scholars-hollow-workbench-desktop.png`
  - `demo/screenshots/character-gallery-desktop.png`
  - `demo/screenshots/asset-pattern-library-desktop.png`
- Confirm the debug screenshots ignored by `.gitignore` are not staged.
- Confirm `LICENSE` is staged.

## License

The repository currently uses MIT for the full kit. That is simple and permissive for code, demos, documentation, and bundled assets.

## GitHub Pages

After the repo is public:

1. Open repository settings.
2. Go to Pages.
3. Publish from the default branch.
4. Use this path as the main demo entry:

```text
demo/index.html
```

Optional later improvement: add a root-level `index.html` redirect to `demo/index.html` so the GitHub Pages root opens the demo index immediately.

## Suggested Repository Description

```text
A richly illustrated storybook-village UI theme kit for HTML front-ends, with demos, assets, and design docs.
```

## Suggested Topics

```text
html css ui design-system theme-kit dashboard fantasy-ui storybook-ui frontend assets
```
