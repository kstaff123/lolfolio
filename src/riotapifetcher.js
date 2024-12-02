export const fetchAccountData = async (gameName,tagLine) => {
  try {
    const response = await fetch(`/api/account/${gameName}/${tagLine}`);
    if (!response.ok) throw new Error("Failed to fetch account data");
    console.log("Response:", response);
    return response.json();
  } catch (error) {
    console.error("Error fetching account data:", error);
    return null;
  }
};


export const FetchAccountLevel = async (PUUID) => {
  try {
    const response = await fetch(`/api/summoner/${PUUID}`);
    if (!response.ok) throw new Error("Failed to fetch account data");
    console.log("Response:", response);
    return response.json();

  } catch (error) {
    console.error("Error fetching account data:", error);
    return null;
  }
};

export const fetchRankedData = async (encryptedSummonerId) => {
  try {
    const response = await fetch(`/api/league/${encryptedSummonerId}`);
    if (!response.ok) throw new Error("Failed to fetch ranked data");
    console.log("Response:", response);
    return response.json();
  } catch (error) {
    console.error("Error fetching ranked data:", error);
    return null;
  }
};

export const fetchRankPercentile = async (summonerId) => {
  try {
    const response = await fetch(`/api/player/${summonerId}`);
    if (!response.ok) throw new Error("Failed to fetch player data");
    console.log("Fetched rank percentile:", response);
    return response.json();
  } catch (error) {
    console.error("Error fetching player rank percentile:", error);
    return null;
  }
};

