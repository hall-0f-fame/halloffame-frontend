import { STACKS_MOCKNET } from "@stacks/network";

// Contract constants
export const CONTRACT_ADDRESS = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM";
export const CONTRACT_NAME = "halloffame";
export const CONTRACT_FULL = `${CONTRACT_ADDRESS}.${CONTRACT_NAME}`;

// Network configuration
// Using Mocknet for local development (clarity-cli/clarinet usually runs on mocknet ports)
// Adjust as needed for Testnet/Mainnet
export const network = STACKS_MOCKNET;

export function getUserData() {
  // Check if we are in the browser
  if (typeof window === "undefined") return null;
  // @ts-ignore - stackProvider is injected by the wallet
  return window.stacks?.userData;
}

export const appDetails = {
  name: "Hall of Fame",
  icon: typeof window !== "undefined" ? window.location.origin + "/icon.png" : "",
};
