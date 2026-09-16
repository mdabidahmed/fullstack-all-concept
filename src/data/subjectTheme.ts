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
 */
const subjectThemes: Record<string, SubjectAccentTheme> = {
  react: { light: "#078598", lightStrong: "#066c7b", dark: "#22d3ee", darkStrong: "#64e0f3" },
  html: { light: "#9f4100", lightStrong: "#803500", dark: "#f97316", darkStrong: "#fb9d5c" },
  css: { light: "#044abd", lightStrong: "#033e9f", dark: "#3b82f6", darkStrong: "#7faef9" },
  javascript: { light: "#846401", lightStrong: "#654d01", dark: "#eab308", darkStrong: "#f9cc41" },
  typescript: { light: "#17416f", lightStrong: "#123356", dark: "#3178c6", darkStrong: "#659cd9" },
  nodejs: { light: "#107435", lightStrong: "#0c5a29", dark: "#22c55e", darkStrong: "#4ee084" },
  mongodb: { light: "#077d56", lightStrong: "#066042", dark: "#10b981", darkStrong: "#24ecaa" },
  aws: { light: "#8f5600", lightStrong: "#704300", dark: "#ff9900", darkStrong: "#ffb647" },
  azure: { light: "#004b85", lightStrong: "#003a66", dark: "#0078d4", darkStrong: "#1c9dff" },
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
