# Orchard Badger look mechanics

Orchard Badger is a compact, upright badger conductor with a broad striped face, small round ears, an emerald cloak, a baton held on the viewer's left, and a task board held on the viewer's right. The lower body and feet stay planted at the existing idle baseline. Looking is carried primarily by the head, muzzle, eyes, ears, and a restrained upper-body follow-through; the whole sprite must not rotate, skew, or tilt.

The head and snout lead each 22.5-degree step. The pupils/eye surfaces, nose tip, brow line, and muzzle turn together as one facial construction. The ears and cloak collar follow by a subtle, continuous amount. The baton and task board remain attached to their existing paws; they may lag by one or two pixels with the shoulders but never float, swap sides, or become new props. Keep the same body scale, grounded feet, cloak silhouette, palette, and pixel-art edge treatment in every cell.

## Cardinal pose families

- **000 up:** face remains broadly frontal; pupils, nose/muzzle angle, brows, and ear tilt aim toward the top edge. Chin and upper cloak lift very slightly while feet stay anchored.
- **090 screen-right:** the face and nose tip clearly shift toward the image's right edge, with the screen-right face plane more visible and the screen-left cheek more occluded. The shoulders bend slightly right; the board stays hand-attached and may lag subtly.
- **180 down:** face remains broadly frontal; pupils, brow, muzzle, and nose angle aim toward the bottom edge. Eyelids/brows lower a little and the chin/upper torso compresses slightly, without a whole-body bow.
- **270 screen-left:** inverse of 090: the face and nose tip clearly shift toward the image's left edge, with the screen-left face plane more visible and the screen-right cheek more occluded. The shoulders bend slightly left; the baton remains hand-attached and may lag subtly.

## Continuity budget

Each adjacent pose advances the same parts by a small, even amount. Diagonals interpolate both named axes: up-right, down-right, down-left, and up-left. There must be no face reversal, side swap, sudden prop shift, size pop, or baseline movement at the 157.5-to-180 and 337.5-to-000 boundaries. Each directional cell must read as a distinct look from the neutral idle pose at normal pet size.
