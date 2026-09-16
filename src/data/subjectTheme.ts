import type { CSSProperties } from "react";

interface SubjectAccentTheme {
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
 * Inline custom-property overrides for an element that should adopt one
 * subject's accent theme. The consuming component's CSS picks between the
 * light/dark pair (see MainLayout.module.css / SubjectPickerPage.module.css)
 * using the same data-theme/prefers-color-scheme rules index.css already
 * resolves the default accent with.
 */
export function subjectAccentVars(subjectId: string | undefined): CSSProperties | undefined {
  const theme = subjectId ? subjectThemes[subjectId] : undefined;
  if (!theme) return undefined;
  return {
    "--subject-light": theme.light,
    "--subject-light-strong": theme.lightStrong,
    "--subject-dark": theme.dark,
    "--subject-dark-strong": theme.darkStrong,
  } as CSSProperties;
}
