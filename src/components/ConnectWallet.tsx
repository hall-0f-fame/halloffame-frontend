"use client";

import { useStacksWallet } from "@/hooks/useStacksWallet";
import { Loader2, Wallet } from "lucide-react";

export default function ConnectWallet() {
  const { address, isConnected, connect, disconnect, isClient } = useStacksWallet();

  if (!isClient) {
    return (
      <button className="glass-button opacity-50 cursor-not-allowed">
        <Loader2 className="w-4 h-4 animate-spin" />
      </button>
    );
  }

  if (isConnected && address) {
    return (
      <button
        onClick={disconnect}
        className="glass-button flex items-center gap-2 hover:bg-red-500/10 hover:border-red-500/30 transition-all group"
      >
        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
        <span className="text-sm font-medium">
          {address.slice(0, 4)}...{address.slice(-4)}
        </span>
        <span className="hidden group-hover:block text-xs text-red-400 ml-1">
          Disconnect
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={connect}
      className="glass-button flex items-center gap-2 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 hover:from-violet-600/30 hover:to-fuchsia-600/30 border-violet-500/30"
    >
      <Wallet className="w-4 h-4" />
      <span>Connect Wallet</span>
    </button>
  );
}
