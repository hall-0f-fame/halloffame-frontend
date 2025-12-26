"use client";

import { useEffect, useState } from "react";
import { useStacksWallet } from "@/hooks/useStacksWallet";
import { getCounter, incrementCounter, decrementCounter } from "@/lib/contract-calls";
import { ChevronUp, ChevronDown, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function CounterSection() {
  const { isConnected } = useStacksWallet();
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCount = async () => {
    const value = await getCounter();
    setCount(value);
  };

  useEffect(() => {
    fetchCount();
    // Poll every 10 seconds
    const interval = setInterval(fetchCount, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleOperation = async (operation: "increment" | "decrement") => {
    if (!isConnected) return;

    setLoading(true);
    try {
      if (operation === "increment") {
        await incrementCounter();
      } else {
        await decrementCounter();
      }
      // Wait a bit for transaction to be mined, then refresh
      setTimeout(fetchCount, 5000);
    } catch (error) {
      console.error("Operation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full py-12 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-8"
      >
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
            Global Counter
          </h2>
          <p className="text-white/40 text-sm tracking-widest uppercase">
            Community Interactions
          </p>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full" />
          <div className="relative w-48 h-48 rounded-full glass-panel flex items-center justify-center border-2 border-white/5">
            {count === null ? (
              <Loader2 className="w-8 h-8 animate-spin text-white/20" />
            ) : (
              <span className="text-7xl font-bold tabular-nums tracking-tighter text-white">
                {count}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            disabled={loading || !isConnected}
            onClick={() => handleOperation("decrement")}
            className="glass-button p-4 rounded-full hover:bg-red-500/10 hover:border-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <ChevronDown className="w-6 h-6 group-hover:text-red-400 transition-colors" />
          </button>
          <button
            disabled={loading || !isConnected}
            onClick={() => handleOperation("increment")}
            className="glass-button p-4 rounded-full hover:bg-green-500/10 hover:border-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <ChevronUp className="w-6 h-6 group-hover:text-green-400 transition-colors" />
          </button>
        </div>
        {!isConnected && (
          <p className="text-xs text-white/30">Connect wallet to interact</p>
        )}
      </motion.div>
    </section>
  );
}
