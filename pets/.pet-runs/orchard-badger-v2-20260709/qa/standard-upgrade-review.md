# Standard-row upgrade review

Source: `C:\Users\david\.codex\pets\orchard-badger\spritesheet.webp` (v1, 1536x1872).

Rows 0-8 were preserved by direct cell-boundary extraction from the existing atlas. The deterministic frame inspection reports no errors. It records the deliberate `stable-slots` extraction mode for each existing row; the contact sheet and generated motion previews were visually reviewed and retain the original badger identity, complete silhouettes, baseline placement, directional gait, and row semantics.

The source WebP has hidden RGB values under fully transparent pixels. Those are not visible-source defects and will be cleared by the required single final v2 despill pass after rows 9-10 are assembled.
