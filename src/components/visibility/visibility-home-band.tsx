import Link from "next/link";
import styles from "./visibility-home-band.module.css";

export function VisibilityHomeBand() {
  return (
    <section className={styles.band}>
      <div className={styles.inner}>
        <p className={styles.kicker}>Free community give-back</p>
        <h2 className={styles.title}>
          Your business deserves to be easier to <em>find</em>.
        </h2>
        <p className={styles.copy}>
          A short teaser only. The full seven-step audit lives on its own page so the rest of the
          site stays put.
        </p>
        <Link href="/audit" className={styles.button}>
          Open the visibility audit →
        </Link>
      </div>
    </section>
  );
}
