# Orchard Vale Loading And Motion Frames

Category 12 asset pack for Orchard Vale HTML front-ends.

This pack contains transparent PNG sprite sheets and static fallback frames for small loading, saving, syncing, notification, writing, and completion states.

## Sprite Sheets

- `spritesheets/motion-gear-spin-spritesheet.png` - Spinning Gear, 8 frames, each `128x128` pixels, horizontal sheet `1024x128`.
- `spritesheets/motion-page-turn-spritesheet.png` - Turning Page, 8 frames, each `128x128` pixels, horizontal sheet `1024x128`.
- `spritesheets/motion-lantern-flicker-spritesheet.png` - Flickering Lantern, 8 frames, each `128x128` pixels, horizontal sheet `1024x128`.
- `spritesheets/motion-courier-delivery-spritesheet.png` - Courier Delivery, 8 frames, each `128x128` pixels, horizontal sheet `1024x128`.
- `spritesheets/motion-quill-writing-spritesheet.png` - Quill Writing, 8 frames, each `128x128` pixels, horizontal sheet `1024x128`.
- `spritesheets/motion-shield-check-complete-spritesheet.png` - Shield Check Complete, 8 frames, each `128x128` pixels, horizontal sheet `1024x128`.

## Static Fallbacks

- `static/motion-gear-spin-static.png` - Static fallback for Spinning Gear.
- `static/motion-page-turn-static.png` - Static fallback for Turning Page.
- `static/motion-lantern-flicker-static.png` - Static fallback for Flickering Lantern.
- `static/motion-courier-delivery-static.png` - Static fallback for Courier Delivery.
- `static/motion-quill-writing-static.png` - Static fallback for Quill Writing.
- `static/motion-shield-check-complete-static.png` - Static fallback for Shield Check Complete.

## Usage Guidance

- Use CSS `steps(8)` animation over the horizontal sprite sheet.
- Keep motion subtle and short; these are status accents, not page content.
- Respect reduced-motion preferences by swapping to the static fallback frame.
- Use `128px` display size by default; scale down to `64px` for dense panels if needed.

Example CSS:

```css
.orchard-motion {
  width: 128px;
  height: 128px;
  background-image: url('./spritesheets/motion-gear-spin-spritesheet.png');
  background-size: 1024px 128px;
  animation: orchard-motion-play 900ms steps(8) infinite;
}
@media (prefers-reduced-motion: reduce) {
  .orchard-motion {
    animation: none;
    background-image: url('./static/motion-gear-spin-static.png');
    background-size: 128px 128px;
  }
}
@keyframes orchard-motion-play {
  to { background-position: -1024px 0; }
}
```

## Files

- `motion-preview.html` shows all sprite sheets animated in a browser grid.
- `motion-contact-sheet.png` reviews every sprite sheet frame sequence.
