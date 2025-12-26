"use client";

import { useState, useEffect } from "react";
import { request } from "@stacks/connect";
import { APP_DETAILS } from "@/lib/stacks-config";

export function useStacksWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Check if already connected (from localStorage or session)
    const savedAddress = localStorage.getItem("stacksAddress");
    if (savedAddress) {
      setAddress(savedAddress);
      setIsConnected(true);
    }
  }, []);

  const connect = async () => {
    try {
      const response = await request("stx_getAddresses", {
        appDetails: APP_DETAILS,
      });

      if (response && response.result && response.result.addresses) {
        const userAddress = response.result.addresses[0].address;
        setAddress(userAddress);
        setIsConnected(true);
        localStorage.setItem("stacksAddress", userAddress);
      }
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  const disconnect = () => {
    setAddress(null);
    setIsConnected(false);
    localStorage.removeItem("stacksAddress");
  };

  return {
    address,
    isConnected,
    connect,
    disconnect,
    isClient,
  };
}
