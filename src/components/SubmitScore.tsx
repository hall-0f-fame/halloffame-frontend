"use client";

import { useConnect } from "@stacks/connect-react";
import { userSession } from "@/config";
import { Send } from "lucide-react";
import { useState, useEffect } from "react";
import styles from "./SubmitScore.module.css";
import { uintCV } from "@stacks/transactions";
import { CONTRACT_ADDRESS, CONTRACT_NAME } from "@/lib/contract-calls";

export default function SubmitScore() {
  const { doContractCall } = useConnect();
  const [score, setScore] = useState("");
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (userSession && userSession.isUserSignedIn()) {
      setIsConnected(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!score || !isConnected) return;

    setLoading(true);

    doContractCall({
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: "submit-score",
      functionArgs: [uintCV(Number(score))],
      onFinish: (data) => {
        console.log("Transaction finished:", data);
        setScore("");
        setLoading(false);
      },
      onCancel: () => {
        console.log("Transaction canceled");
        setLoading(false);
      },
    });
  };

  if (!isConnected) return null;

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.textGroup}>
          <h3 className={styles.title}>Submit Record</h3>
          <p className={styles.description}>
            Enter a new high score to join the Hall of Fame.
          </p>
        </div>

        <div className={styles.inputGroup}>
          <input
            type="number"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            placeholder="0"
            min="0"
            className={styles.input}
          />
          <button
            type="submit"
            disabled={loading || !score}
            className={styles.submitButton}
          >
            {loading ? "Sending..." : "Submit"}
            {!loading && <Send width={16} height={16} />}
          </button>
        </div>
      </form>
    </div>
  );
}
