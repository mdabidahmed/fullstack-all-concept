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
