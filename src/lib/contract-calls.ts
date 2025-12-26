import { request } from "@stacks/connect";
import { fetchCallReadOnlyFunction, uintCV, cvToJSON } from "@stacks/transactions";
import { CONTRACT_ADDRESS, CONTRACT_NAME, NETWORK, APP_DETAILS } from "./stacks-config";

// Read-only function: get counter value
export async function getCounter(): Promise<number> {
  try {
    const result = await fetchCallReadOnlyFunction({
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: "get-counter",
      functionArgs: [],
      network: NETWORK,
      senderAddress: CONTRACT_ADDRESS,
    });

    // result is ResponseOkCV, result.value is IntCV
    // @ts-ignore
    return Number(result.value.value);
  } catch (error) {
    console.error("Error fetching counter:", error);
    return 0;
  }
}

// Read-only function: get top ten leaderboard
export async function getTopTen(): Promise<Array<{ player: string; score: number }>> {
  try {
    const result = await fetchCallReadOnlyFunction({
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: "get-top-ten",
      functionArgs: [],
      network: NETWORK,
      senderAddress: CONTRACT_ADDRESS,
    });

    // result is ResponseOkCV, result.value is ListCV
    // @ts-ignore
    const listData = result.value.list;
    return listData.map((item: any) => ({
      player: item.data.player.value,
      score: Number(item.data.score.value),
    }));
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return [];
  }
}

// Write function: increment counter
export async function incrementCounter() {
  try {
    await request("stx_callContract", {
      appDetails: APP_DETAILS,
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: "increment",
      functionArgs: [],
      network: NETWORK,
    });
  } catch (error) {
    console.error("Error incrementing counter:", error);
    throw error;
  }
}

// Write function: decrement counter
export async function decrementCounter() {
  try {
    await request("stx_callContract", {
      appDetails: APP_DETAILS,
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: "decrement",
      functionArgs: [],
      network: NETWORK,
    });
  } catch (error) {
    console.error("Error decrementing counter:", error);
    throw error;
  }
}

// Write function: submit score
export async function submitScore(score: number) {
  try {
    await request("stx_callContract", {
      appDetails: APP_DETAILS,
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: "submit-score",
      functionArgs: [uintCV(score)],
      network: NETWORK,
    });
  } catch (error) {
    console.error("Error submitting score:", error);
    throw error;
  }
}
