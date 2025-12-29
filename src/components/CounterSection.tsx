"use client";

import { useEffect, useState } from "react";
import { getCounter, CONTRACT_ADDRESS, CONTRACT_NAME } from "@/lib/contract-calls";
import { ChevronUp, ChevronDown, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./CounterSection.module.css";
import { useConnect } from "@stacks/connect-react";
import { userSession } from "@/config";

export default function CounterSection() {
  const { doContractCall } = useConnect();
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  // Check authentication status
  useEffect(() => {
    if (userSession && userSession.isUserSignedIn()) {
      setIsConnected(true);
    }
  }, []);

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
    
    doContractCall({
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: operation,
      functionArgs: [],
      onFinish: (data) => {
        console.log("Transaction finished:", data);
        setLoading(false);
        // Optimistic update or wait for confirmation?
        // For simplicity, we just refetch after a delay
        setTimeout(fetchCount, 5000);
      },
      onCancel: () => {
        console.log("Transaction canceled");
        setLoading(false);
      },
    });
  };

  return (
    <section className={styles.section}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.container}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>
            Global Counter
          </h2>
          <p className={styles.subtitle}>
            Community Interactions
          </p>
        </div>

        <div className={styles.counterContainer}>
          <div className={styles.glow} />
          <div className={styles.counterCircle}>
            {count === null ? (
              <Loader2 className="w-8 h-8 animate-spin text-white/20" />
            ) : (
              <span className={styles.countValue}>
                {count}
              </span>
            )}
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button
            disabled={loading || !isConnected}
            onClick={() => handleOperation("decrement")}
            className={`${styles.actionButton} ${styles.decrementButton}`}
          >
            <ChevronDown width={24} height={24} />
          </button>
          <button
            disabled={loading || !isConnected}
            onClick={() => handleOperation("increment")}
            className={`${styles.actionButton} ${styles.incrementButton}`}
          >
            <ChevronUp width={24} height={24} />
          </button>
        </div>
        {!isConnected && (
          <p className={styles.connectPrompt}>Connect wallet to interact</p>
        )}
      </motion.div>
    </section>
  );
}
