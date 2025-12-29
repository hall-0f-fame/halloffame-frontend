
import { fetchCallReadOnlyFunction, cvToJSON } from "@stacks/transactions";
import { STACKS_MAINNET } from "@stacks/network";

// Contract constants
export const CONTRACT_ADDRESS = "SP1GNDB8SXJ51GBMSVVXMWGTPRFHGSMWNNBEY25A4";
export const CONTRACT_NAME = "halloffame";

// Network configuration - Mainnet
export const NETWORK = STACKS_MAINNET;

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

    // Use cvToJSON for robust parsing
    const resultJSON = cvToJSON(result);
    // resultJSON might look like { type: 'success', value: { type: 'int', value: '1' } }
    
    if (resultJSON && resultJSON.value && resultJSON.value.value) {
        return Number(resultJSON.value.value);
    }
    return 0;

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

    const resultJSON = cvToJSON(result);
    // Expected: { type: 'success', value: { type: 'list', value: [ ... ] } }

    if (resultJSON && resultJSON.value && Array.isArray(resultJSON.value.value)) {
        const listData = resultJSON.value.value;
        return listData.map((item: any) => ({
             // item structure in JSON: { type: 'tuple', value: { player: { type: 'principal', value: '...' }, score: { type: 'uint', value: '...' } } }
            player: item.value.player.value,
            score: Number(item.value.score.value),
        }));
    }
    
    return [];

  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return [];
  }
}
