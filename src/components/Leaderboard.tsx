"use client";

import { useEffect, useState } from "react";
import { getTopTen } from "@/lib/contract-calls";
import { Trophy, Crown } from "lucide-react";
import { motion } from "framer-motion";

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
    <div className="w-full max-w-2xl mx-auto py-12">
      <div className="flex items-center gap-3 mb-8">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <h2 className="text-2xl font-bold font-display">Hall of Fame</h2>
      </div>

      <div className="glass-panel p-1">
        {loading ? (
          <div className="p-8 text-center text-white/30">Loading legends...</div>
        ) : topTen.length === 0 ? (
          <div className="p-8 text-center text-white/30">
            No scores yet. Be the first!
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            {topTen.map((entry, index) => (
              <motion.div
                key={`${entry.player}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  relative flex items-center justify-between p-4 rounded-xl transition-colors
                  ${
                    index === 0
                      ? "bg-gradient-to-r from-yellow-500/10 to-transparent border border-yellow-500/20"
                      : "hover:bg-white/5"
                  }
                `}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`
                    relative w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                    ${
                      index === 0
                        ? "bg-yellow-500 text-black"
                        : index === 1
                        ? "bg-gray-400 text-black"
                        : index === 2
                        ? "bg-orange-700 text-white"
                        : "bg-white/10 text-white/60"
                    }
                  `}
                  >
                    {index <= 2 && (
                      <Crown className="w-3 h-3 absolute -top-1 -left-1 transform -rotate-12 text-yellow-400" />
                    )}
                    {index + 1}
                  </div>
                  <span className="font-mono text-sm text-white/80">
                    {entry.player.slice(0, 6)}...{entry.player.slice(-6)}
                  </span>
                </div>
                <span className="font-display font-bold text-lg tabular-nums text-white">
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
