"use client";

import { useConnect } from "@stacks/connect-react";
import { userSession } from "@/config";
import { useEffect, useState } from "react";
import { Loader2, Wallet } from "lucide-react";
import styles from "./ConnectWallet.module.css";

export default function ConnectWallet() {
  const { authenticate } = useConnect();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [userAddress, setUserAddress] = useState<string>('');

  useEffect(() => {
    setIsMounted(true);
    if (userSession && userSession.isUserSignedIn()) {
      setIsSignedIn(true);
      const userData = userSession.loadUserData();
      // Try to get testnet address first for dev, fall back to mainnet
      const address = userData.profile?.stxAddress?.testnet || userData.profile?.stxAddress?.mainnet || '';
      setUserAddress(address);
    }
  }, []);

  const handleConnect = () => {
    authenticate({
      appDetails: {
        name: 'Hall of Fame',
        icon: window.location.origin + '/next.svg',
      },
      redirectTo: '/',
      onFinish: () => {
        const userData = userSession.loadUserData();
        setIsSignedIn(true);
        const address = userData.profile?.stxAddress?.testnet || userData.profile?.stxAddress?.mainnet || '';
        setUserAddress(address);
      },
      userSession,
    });
  }

  const handleDisconnect = () => {
    userSession.signUserOut();
    setIsSignedIn(false);
    setUserAddress('');
  }

  if (!isMounted) {
    return (
      <button className={`${styles.connectButton} ${styles.loadingButton}`}>
        <Loader2 className={styles.spinner} />
      </button>
    );
  }

  if (isSignedIn && userAddress) {
    return (
      <button
        onClick={handleDisconnect}
        className={styles.connectedButton}
      >
        <div className={styles.indicator} />
        <span className={styles.addressText}>
          {userAddress.slice(0, 4)}...{userAddress.slice(-4)}
        </span>
        <span className={styles.disconnectText}>
          Disconnect
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={handleConnect}
      className={styles.connectButton}
    >
      <Wallet width={16} height={16} />
      <span>Connect Wallet</span>
    </button>
  );
}
