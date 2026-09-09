// Single source of truth for motion timing — mirrors the CSS custom
// properties in variables.css (--ease-standard etc.) so JS-driven
// (Framer Motion) and CSS-driven animation stay visually consistent.

export const EASE_STANDARD = [0.22, 1, 0.36, 1];
export const EASE_OUT_SOFT = [0.16, 1, 0.3, 1];
// A slower, more deliberate ease-in-out — used for continuous scroll-linked
// motion (image pans, section blends) where a snappy UI-timing curve would
// read as mechanical rather than cinematic.
export const EASE_CINEMATIC = [0.83, 0, 0.17, 1];

export const DURATION = {
  fast: 0.2,
  base: 0.45,
  slow: 0.8,
};
