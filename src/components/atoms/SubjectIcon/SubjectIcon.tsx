/** A brand-ish accent color per subject, used to tint its icon chip and card accent. */
export const subjectAccentColor: Record<string, string> = {
  react: "#22d3ee",
  html: "#f97316",
  css: "#3b82f6",
  javascript: "#eab308",
  typescript: "#3178c6",
  nodejs: "#22c55e",
  mongodb: "#10b981",
  aws: "#ff9900",
};

interface SubjectIconProps {
  subjectId: string;
}

/** A small line-icon glyph per subject, for quick visual scanning on the subject picker. */
export function SubjectIcon({ subjectId }: SubjectIconProps) {
  switch (subjectId) {
    case "react":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="2.2" />
          <ellipse cx="12" cy="12" rx="9" ry="3.8" />
          <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(120 12 12)" />
        </svg>
      );
    case "html":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 6 4 12l5 6" />
          <path d="M15 6l5 6-5 6" />
        </svg>
      );
    case "css":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11Z" />
        </svg>
      );
    case "javascript":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16v16H4z" />
          <path d="M9 16.5c.4.7 1 1.2 1.8 1.2 1 0 1.5-.6 1.5-1.6V9M17.5 10.5c-.4-.6-1-1-1.7-1-1 0-1.6.6-1.6 1.4 0 .9.6 1.3 1.6 1.7 1.1.4 1.9 1 1.9 2.1 0 1.2-.9 1.9-2 1.9-.9 0-1.6-.4-2-1.1" />
        </svg>
      );
    case "typescript":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16v16H4z" />
          <path d="M8 8h5M10.5 8v8M14 15c.4.7 1 1.1 1.8 1.1.9 0 1.5-.5 1.5-1.3 0-.8-.5-1.1-1.5-1.5-1-.4-1.7-.8-1.7-1.7 0-.8.6-1.3 1.5-1.3.7 0 1.2.3 1.6.9" />
        </svg>
      );
    case "nodejs":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2 20 6.5v11L12 22 4 17.5v-11Z" />
          <path d="M12 8v8M9 9.5l3-1.5 3 1.5" />
        </svg>
      );
    case "mongodb":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2c3 4 5 7.5 5 10.5a5 5 0 0 1-10 0C7 9.5 9 6 12 2Z" />
          <path d="M12 15v6" />
        </svg>
      );
    case "aws":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 18a4 4 0 0 1-1-7.9 5 5 0 0 1 9.8-1.7A4.5 4.5 0 0 1 17 18H7Z" />
        </svg>
      );
    default:
      return null;
  }
}
