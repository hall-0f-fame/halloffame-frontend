import CounterSection from "@/components/CounterSection";
import Leaderboard from "@/components/Leaderboard";
import SubmitScore from "@/components/SubmitScore";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>
          LEGENDS
        </h1>
        <p className={styles.heroDescription}>
          Eternalize your achievements on the Stacks blockchain. Compete for the crown.
        </p>
      </div>

      <CounterSection />

      <div className={styles.contentGrid}>
        <Leaderboard />
        <SubmitScore />
      </div>
    </div>
  );
}
