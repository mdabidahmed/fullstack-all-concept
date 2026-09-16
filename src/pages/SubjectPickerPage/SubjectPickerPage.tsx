import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { subjects, getTopicsForSubject } from "../../data/subjects";
import { SubjectIcon, subjectAccentColor } from "../../components/atoms/SubjectIcon/SubjectIcon";
import { ProgressBar } from "../../components/atoms/ProgressBar/ProgressBar";
import { readStorage } from "../../utils/storage";
import styles from "./SubjectPickerPage.module.css";

export function SubjectPickerPage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <h1 className={styles.title}>
          What do you want to <span className={styles.accent}>learn</span> today?
        </h1>
        <p className={styles.subtitle}>
          Pick a subject to see topic explanations, runnable examples, and a quiz to test what you know.
        </p>
      </header>

      <div className={styles.grid}>
        {subjects.map((subject) => {
          const topicCount = getTopicsForSubject(subject.id).length;
          const completedCount = subject.comingSoon
            ? 0
            : readStorage<string[]>(`rac:completed-topics:${subject.id}`, []).length;
          const percent = topicCount === 0 ? 0 : Math.round((completedCount / topicCount) * 100);
          const accentColor = subjectAccentColor[subject.id];

          const card = (
            <>
              <div className={styles.cardTop}>
                <span
                  className={styles.iconChip}
                  style={{ "--subject-accent": accentColor } as CSSProperties}
                >
                  <SubjectIcon subjectId={subject.id} />
                </span>
                {subject.comingSoon && <span className={styles.badge}>Coming soon</span>}
              </div>
              <h2 className={styles.cardTitle}>{subject.name}</h2>
              <p className={styles.cardTagline}>{subject.tagline}</p>
              <p className={styles.cardDescription}>{subject.description}</p>
              {!subject.comingSoon && (
                <div className={styles.progressRow}>
                  <ProgressBar percent={percent} label={`${subject.name} progress`} />
                  <span className={styles.cardMeta}>
                    {completedCount > 0 ? `${completedCount}/${topicCount} topics · ${percent}%` : `${topicCount} topics`}
                  </span>
                </div>
              )}
              {!subject.comingSoon && (
                <span className={styles.cardArrow} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              )}
            </>
          );

          return subject.comingSoon ? (
            <div key={subject.id} className={[styles.card, styles.cardDisabled].join(" ")}>
              {card}
            </div>
          ) : (
            <Link
              key={subject.id}
              to={`/${subject.id}`}
              className={styles.card}
              style={{ "--subject-accent": accentColor } as CSSProperties}
            >
              {card}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
