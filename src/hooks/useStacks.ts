"use client";

import { useEffect, useState } from "react";
import { AppConfig, UserSession, showConnect } from "@stacks/connect";
import { appDetails } from "@/lib/stacks";

export function useStacks() {
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const appConfig = new AppConfig(["store_write", "publish_data"]);
    const session = new UserSession({ appConfig });
    setUserSession(session);

    if (session.isUserSignedIn()) {
      setUserData(session.loadUserData());
    } else if (session.isSignInPending()) {
      session.handlePendingSignIn().then((userData) => {
        setUserData(userData);
      });
    }
  }, []);

  const connect = () => {
    if (!userSession) return;
    
    showConnect({
      appDetails,
      onFinish: () => {
        setUserData(userSession.loadUserData());
      },
      userSession,
    });
  };

  const disconnect = () => {
    if (!userSession) return;
    userSession.signUserOut();
    setUserData(null);
  };

  return {
    userSession,
    userData,
    connect,
    disconnect,
    isClient,
    address: userData?.profile?.stxAddress?.testnet || userData?.profile?.stxAddress?.mainnet,
  };
}
