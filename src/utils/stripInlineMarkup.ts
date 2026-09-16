/** Matches RichText's inline syntax: `code`, **bold**, ==highlight==, *italic*. */
const INLINE_MARKUP = /`([^`]+)`|\*\*([^*]+)\*\*|==([^=]+)==|\*([^*]+)\*/g;

/**
 * Reduces RichText's lightweight markup to plain text, for contexts (like a
 * truncated card preview) that render a snippet outside of `<RichText>` and
 * would otherwise show the raw `**`/`==` syntax to the user.
 */
export function stripInlineMarkup(text: string): string {
  return text.replace(INLINE_MARKUP, (_match, code, bold, highlight, italic) => code ?? bold ?? highlight ?? italic ?? "");
}

/**
 * Reduces a RichText-formatted explanation to a single plain-text summary
 * sentence/paragraph, for a truncated card preview. Takes only the text up
 * to the first blank line, since every topic's shortExplanation opens with
 * a complete summary before any supporting bullet list - collapsing the
 * full text (list markers included) into one line otherwise leaves orphaned
 * "- " dashes where list items ran together.
 */
export function toCardSummary(text: string): string {
  const firstParagraph = text.split(/\n\s*\n/)[0];
  return stripInlineMarkup(firstParagraph).trim();
}
