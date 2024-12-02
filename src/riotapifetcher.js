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

export const fetchMatchHistory = async (puuid, start = 0, count = 10) => {
  try {
    const response = await fetch(`/api/match-history/${puuid}?start=${start}&count=${count}`);
    if (!response.ok) throw new Error("Failed to fetch match history");
    return response.json(); // Returns array of match IDs
  } catch (error) {
    console.error("Error fetching match history:", error);
    return [];
  }
};


export const fetchMatchById = async (matchId) => {
  try {
    const response = await fetch(`/api/match/${matchId}`);
    if (!response.ok) throw new Error("Failed to fetch match data");
    return response.json(); // Returns { id: matchId, data: matchData }
  } catch (error) {
    console.error(`Error fetching match ${matchId}:`, error);
    return null;
  }
};





