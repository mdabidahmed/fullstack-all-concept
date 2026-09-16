import { useEffect, useRef, useState } from "react";
import { PRESET_COLORS } from "../../../data/subjectTheme";
import styles from "./SubjectColorPicker.module.css";

interface SubjectColorPickerProps {
  /** The user's saved override for the current subject, or null to use its default color. */
  color: string | null;
  onChange: (color: string | null) => void;
}

/** Navbar trigger + popover letting the user recolor the current subject's whole theme. */
export function SubjectColorPicker({ color, onChange }: SubjectColorPickerProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Change subject color"
        title="Change subject color"
      >
        {color ? (
          <span className={styles.swatch} style={{ background: color }} aria-hidden="true" />
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" />
            <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" />
            <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" />
            <circle cx="6.5" cy="12.5" r="0.5" fill="currentColor" />
            <path d="M12 22a10 10 0 1 1 0-20 6 6 0 0 1 0 12h-1a2 2 0 0 0 0 4h1Z" />
          </svg>
        )}
      </button>

      {open && (
        <div className={styles.panel} role="dialog" aria-label="Subject color">
          <div className={styles.arrow} aria-hidden="true" />
          <p className={styles.title}>Subject color</p>
          <p className={styles.description}>Pick a color to theme this subject with, or use its default.</p>
          <div className={styles.swatchRow}>
            {PRESET_COLORS.map((preset) => {
              const selected = color === preset.hex;
              return (
                <button
                  key={preset.hex}
                  type="button"
                  className={styles.swatchButton}
                  style={{ background: preset.hex }}
                  aria-label={preset.name}
                  aria-pressed={selected}
                  title={preset.name}
                  onClick={() => {
                    onChange(preset.hex);
                    setOpen(false);
                  }}
                >
                  {selected && (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            className={styles.resetButton}
            disabled={!color}
            onClick={() => {
              onChange(null);
              setOpen(false);
            }}
          >
            Reset to default
          </button>
        </div>
      )}
    </div>
  );
}
