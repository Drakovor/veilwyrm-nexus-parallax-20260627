# Review Notes

## Major Changes

- Rebuilt the page around a pinned GSAP ScrollTrigger hero instead of minimal scroll math.
- Added a multi-scene scroll flow: Threshold, Dominion, Vault, and Build Review.
- Added independent parallax layers for base art, rear mist, foreground mist, embers, and halo glow.
- Added per-element reveal timing so chapter text arrives before it becomes the main visible content.
- Reworked typography to use stable responsive breakpoints instead of viewport-scaled type.
- Added mobile verification targets so text does not overflow the viewport.

## Validation

- `node --check script.js`
- HTML parser smoke check
- CDN checks for GSAP and ScrollTrigger
- In-app browser desktop visual check
- In-app browser mobile 390px text overflow check
- In-app browser console error/warning check

## Scope

This repo is standalone. It does not reuse or inspect any old GitHub projects.
