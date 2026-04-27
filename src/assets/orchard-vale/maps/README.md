# Orchard Vale Mini-Maps And Location Art

Category 10 asset pack for Orchard Vale HTML front-ends.

This pack contains unlabeled map backgrounds plus SVG controls and markers. Labels, status text, route names, and interactive elements should be drawn with HTML/SVG on top of the raster maps.

## Map Backgrounds

- `backgrounds/map-base-parchment-blank-16x9.webp` - Base Parchment Blank
- `backgrounds/map-district-forge-unlabeled-16x9.webp` - District Forge
- `backgrounds/map-district-guildhall-unlabeled-16x9.webp` - District Guildhall
- `backgrounds/map-district-library-unlabeled-16x9.webp` - District Library
- `backgrounds/map-district-market-unlabeled-16x9.webp` - District Market
- `backgrounds/map-district-stables-unlabeled-16x9.webp` - District Stables
- `backgrounds/map-district-watermill-unlabeled-16x9.webp` - District Watermill
- `backgrounds/map-route-countryside-empty-16x9.webp` - Route Countryside Empty
- `backgrounds/map-village-overview-unlabeled-16x9.webp` - Village Overview

## Controls And Markers

- `controls/compass-rose-brass.svg` - Compass Rose Brass
- `controls/map-control-home.svg` - Home
- `controls/map-control-layers.svg` - Layers
- `controls/map-control-locate.svg` - Locate
- `controls/map-control-zoom-in.svg` - Zoom In
- `controls/map-control-zoom-out.svg` - Zoom Out
- `controls/map-label-ribbon-blank.svg` - Label Ribbon Blank
- `controls/map-scale-plaque.svg` - Scale Plaque
- `controls/marker-current-location-brass.svg` - Current Location Brass
- `controls/marker-pin-amber.svg` - Pin Amber
- `controls/marker-pin-blue.svg` - Pin Blue
- `controls/marker-pin-gray.svg` - Pin Gray
- `controls/marker-pin-green.svg` - Pin Green
- `controls/marker-pin-purple.svg` - Pin Purple
- `controls/marker-pin-red.svg` - Pin Red
- `controls/marker-route-node-empty.svg` - Route Node Empty
- `controls/marker-shield-amber.svg` - Shield Amber
- `controls/marker-shield-blue.svg` - Shield Blue
- `controls/marker-shield-gray.svg` - Shield Gray
- `controls/marker-shield-green.svg` - Shield Green
- `controls/marker-shield-purple.svg` - Shield Purple
- `controls/marker-shield-red.svg` - Shield Red
- `controls/route-line-dashed-brass.svg` - Route Line Dashed Brass
- `controls/route-line-solid-green.svg` - Route Line Solid Green

## Usage Guidance

- Use map backgrounds as static contextual layers with `object-fit: cover` or inside fixed-aspect map panels.
- Place shield markers, pin markers, labels, and status badges as live HTML/SVG overlays so state remains accessible and editable.
- Keep actual district names and route text out of the image assets; the generated maps are intentionally unlabeled.
- Use `map-base-parchment-blank-16x9.webp` when the app needs to draw all routes and nodes dynamically.
- Pair marker colors with the established status palette: green success/healthy, amber warning/review, red urgent/error, blue active/info, purple category, gray archived/disabled.

## Files

- `maps-preview.html` shows all map and control assets in a browser grid.
- `maps-contact-sheet.png` reviews the raster map backgrounds.
- `map-controls-contact-sheet.png` reviews the SVG overlay assets.
- `maps-and-controls-contact-sheet.png` combines both sheets.
- `source-originals/` preserves the original generated PNG map sources.
