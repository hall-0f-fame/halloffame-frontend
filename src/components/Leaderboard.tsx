"use client";

import { useEffect, useState } from "react";
import { getTopTen } from "@/lib/contract-calls";
import { Trophy, Crown } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./Leaderboard.module.css";

interface ScoreEntry {
  player: string;
  score: number;
}

export default function Leaderboard() {
  const [topTen, setTopTen] = useState<ScoreEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaderboard = async () => {
    setLoading(true);
    const data = await getTopTen();
    setTopTen(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchLeaderboard();
    // Poll every 15 seconds
    const interval = setInterval(fetchLeaderboard, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Trophy className={styles.trophyIcon} width={24} height={24} />
        <h2 className={styles.title}>Hall of Fame</h2>
      </div>

      <div className={styles.listContainer}>
        {loading ? (
          <div className={styles.loadingState}>Loading legends...</div>
        ) : topTen.length === 0 ? (
          <div className={styles.emptyState}>
            No scores yet. Be the first!
          </div>
        ) : (
          <div className={styles.list}>
            {topTen.map((entry, index) => (
              <motion.div
                key={`${entry.player}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${styles.entry} ${index === 0 ? styles.topEntry : ""}`}
              >
                <div className={styles.playerInfo}>
                  <div className={`${styles.rankCircle} ${index === 0 ? styles.rank1 : index === 1 ? styles.rank2 : index === 2 ? styles.rank3 : ""}`}>
                    {index <= 2 && (
                      <Crown className={styles.crown} width={12} height={12} />
                    )}
                    {index + 1}
                  </div>
                  <span className={styles.address}>
                    {entry.player.slice(0, 6)}...{entry.player.slice(-6)}
                  </span>
                </div>
                <span className={styles.score}>
                  {entry.score.toLocaleString()}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
