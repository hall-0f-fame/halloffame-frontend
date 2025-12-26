import { STACKS_MOCKNET, STACKS_TESTNET, STACKS_MAINNET } from "@stacks/network";

// Contract constants
export const CONTRACT_ADDRESS = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM";
export const CONTRACT_NAME = "halloffame";

// Network configuration - using Mocknet for local development
// Change to STACKS_TESTNET or STACKS_MAINNET as needed
export const NETWORK = STACKS_MOCKNET;

// App metadata for wallet connection
export const APP_DETAILS = {
  name: "Hall of Fame",
  icon: typeof window !== "undefined" ? window.location.origin + "/icon.png" : "",
};
