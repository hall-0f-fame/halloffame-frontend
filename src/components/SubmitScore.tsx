"use client";

import { useStacksWallet } from "@/hooks/useStacksWallet";
import { submitScore } from "@/lib/contract-calls";
import { Send } from "lucide-react";
import { useState } from "react";

export default function SubmitScore() {
  const { isConnected } = useStacksWallet();
  const [score, setScore] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!score || !isConnected) return;

    setLoading(true);
    try {
      await submitScore(Number(score));
      setScore("");
    } catch (error) {
      console.error("Submit failed:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) return null;

  return (
    <div className="w-full max-w-md mx-auto mt-12 mb-24">
      <form onSubmit={handleSubmit} className="glass-panel p-6 space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-bold">Submit Record</h3>
          <p className="text-sm text-white/40">
            Enter a new high score to join the Hall of Fame.
          </p>
        </div>

        <div className="flex gap-2">
          <input
            type="number"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            placeholder="0"
            min="0"
            className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 transition-colors"
          />
          <button
            type="submit"
            disabled={loading || !score}
            className="glass-button bg-violet-600/20 hover:bg-violet-600/30 text-violet-200 border-violet-500/30 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Submit"}
            {!loading && <Send className="w-4 h-4" />}
          </button>
        </div>
      </form>
    </div>
  );
}
