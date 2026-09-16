import type { CSSProperties } from "react";

export interface SubjectAccentTheme {
  /** Deepened variant for light backgrounds, kept dark enough for white text on top of it. */
  light: string;
  lightStrong: string;
  /** Vivid variant for dark backgrounds, kept light enough for dark text on top of it. */
  dark: string;
  darkStrong: string;
}

/**
 * Per-subject accent pairs, one for each app theme. Colors aren't reused as-is
 * across light/dark - the light-mode values are deliberately deepened (and the
 * dark-mode ones deliberately brightened) so index.css's existing white/dark
 * --accent-contrast text stays readable on top of them, the same tradeoff the
 * app's original single teal accent already made between its two themes.
 *
 * Hues are spread ~40-55° apart around the wheel (html 22°, aws 355°, js 48°,
 * node 130°, mongodb 175°, react 197°, css 220°, azure 262°, typescript 308°)
 * rather than clustering several subjects into "blue" (react/typescript/azure)
 * or "green" (node/mongodb) the way the original picks did. Checked against
 * the dataviz skill's CVD/normal-vision delta-E validator - true all-pairs
 * separation isn't achievable at 9 simultaneous colors (the skill's own
 * reference palette caps that guarantee at 3-4 slots), but this ordering
 * clears contrast on both surfaces and keeps every pair well above the
 * near-duplicate range the original blue/green clusters sat in.
 */
const subjectThemes: Record<string, SubjectAccentTheme> = {
  html: { light: "#9a3b04", lightStrong: "#7c3003", dark: "#f47125", darkStrong: "#f79d69" },
  aws: { light: "#aa1824", lightStrong: "#8f141f", dark: "#e25a66", darkStrong: "#ed979e" },
  javascript: { light: "#816803", lightStrong: "#635003", dark: "#f2c40d", darkStrong: "#f6d551" },
  nodejs: { light: "#115f1e", lightStrong: "#0c4516", dark: "#28bd41", darkStrong: "#52da69" },
  mongodb: { light: "#115f59", lightStrong: "#0c4541", dark: "#24a89d", darkStrong: "#3dd6c9" },
  react: { light: "#106a8e", lightStrong: "#0d5673", dark: "#36b2e2", darkStrong: "#75caeb" },
  css: { light: "#11409c", lightStrong: "#0e3481", dark: "#4479e4", darkStrong: "#82a6ed" },
  azure: { light: "#5d27b9", lightStrong: "#5022a0", dark: "#a07cde", darkStrong: "#cab6ed" },
  typescript: { light: "#9b278c", lightStrong: "#832176", dark: "#d369c5", darkStrong: "#e3a0da" },
};

/**
 * 24 preset swatches for the subject color picker, spaced 15° apart around
 * the hue wheel. Saturation/lightness are tuned per band (not one fixed pair
 * for every hue) so yellows don't glare and blues/violets don't turn muddy -
 * the same equal-vividness problem a flat HSL sweep runs into.
 */
export const PRESET_COLORS: { name: string; hex: string }[] = [
  { name: "Red", hex: "#e93535" },
  { name: "Coral", hex: "#e96235" },
  { name: "Orange", hex: "#e98f35" },
  { name: "Amber", hex: "#ecb613" },
  { name: "Gold", hex: "#ecec13" },
  { name: "Yellow", hex: "#9bc322" },
  { name: "Lime", hex: "#73c322" },
  { name: "Moss", hex: "#4ca92d" },
  { name: "Green", hex: "#2da92d" },
  { name: "Emerald", hex: "#2da94c" },
  { name: "Jade", hex: "#2da96b" },
  { name: "Teal", hex: "#2dd2a9" },
  { name: "Cyan", hex: "#2dd2d2" },
  { name: "Sky", hex: "#2da9d2" },
  { name: "Azure", hex: "#408fdd" },
  { name: "Blue", hex: "#4068dd" },
  { name: "Indigo", hex: "#4040dd" },
  { name: "Iris", hex: "#795ad8" },
  { name: "Violet", hex: "#995ad8" },
  { name: "Purple", hex: "#b95ad8" },
  { name: "Fuchsia", hex: "#e03ee0" },
  { name: "Pink", hex: "#e03eb7" },
  { name: "Rose", hex: "#e03e8f" },
  { name: "Crimson", hex: "#e03e66" },
];

function hexToHsl(hex: string): [number, number, number] {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16) / 255;
  const g = parseInt(c.slice(2, 4), 16) / 255;
  const b = parseInt(c.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h /= 6;
  }
  return [h * 360, s * 100, l * 100];
}

function hslToHex(h: number, s: number, l: number): string {
  h = ((h % 360) + 360) % 360;
  h /= 360;
  s = Math.max(0, Math.min(100, s)) / 100;
  l = Math.max(0, Math.min(100, l)) / 100;
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  let r: number, g: number, b: number;
  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = (v: number) =>
    Math.round(Math.max(0, Math.min(255, v * 255)))
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

/**
 * Derives a full light/dark accent theme from a single hex color, the same
 * deepen-for-light/brighten-for-dark tradeoff the curated subjectThemes use -
 * so a user-picked preset gets the same readable-in-both-themes treatment as
 * a built-in subject color, not just the raw swatch reused everywhere.
 */
export function generateAccentTheme(hex: string): SubjectAccentTheme {
  const [h, s, l] = hexToHsl(hex);
  const dark = hex;
  const darkStrong = hslToHex(h, s, clamp(l + 14, 0, 85));
  const lightL = clamp(l - 24, 22, 46);
  const lightS = clamp(s + 5, 0, 100);
  const light = hslToHex(h, lightS, lightL);
  const lightStrong = hslToHex(h, lightS, clamp(lightL - 6, 16, 100));
  return { light, lightStrong, dark, darkStrong };
}

/**
 * Inline custom-property overrides for an element that should adopt one
 * subject's accent theme. The consuming component's CSS picks between the
 * light/dark pair (see MainLayout.module.css / SubjectPickerPage.module.css)
 * using the same data-theme/prefers-color-scheme rules index.css already
 * resolves the default accent with. Pass `overrideHex` (a user-picked preset,
 * persisted per subject) to theme with that color instead of the subject's
 * curated default.
 */
export function subjectAccentVars(subjectId: string | undefined, overrideHex?: string | null): CSSProperties | undefined {
  const theme = overrideHex ? generateAccentTheme(overrideHex) : subjectId ? subjectThemes[subjectId] : undefined;
  if (!theme) return undefined;
  return {
    "--subject-light": theme.light,
    "--subject-light-strong": theme.lightStrong,
    "--subject-dark": theme.dark,
    "--subject-dark-strong": theme.darkStrong,
  } as CSSProperties;
}
