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
