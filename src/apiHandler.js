import { fetchAccountData, FetchAccountLevel, fetchRankedData, fetchRankPercentile } from "./riotapifetcher";

// Handler for account search
export const handleAccountSearch = async (searchInput, { setProfile, setCache, setMatchHistory }) => {
  // Parse input
  const [inputName, inputTagline] = searchInput.includes("#")
    ? searchInput.split("#")
    : [searchInput, ""];

  if (!inputName) throw new Error("Invalid input: Account name is required.");

  const cacheKey = `${inputName.toLowerCase()}#${inputTagline.toLowerCase()}`;

  // Check cache
  const cachedProfile = getCache(cacheKey);
  if (cachedProfile) {
    console.log("Loading profile from cache");
    setProfile(cachedProfile);
    return;
  }

  try {
    // Fetch account data
    const accountData = await fetchAccountData(inputName, inputTagline);
    if (!accountData) throw new Error("Invalid API response for account data.");

    // Fetch account level
    const accountLevel = await FetchAccountLevel(accountData.puuid);
    if (!accountLevel) throw new Error("Invalid API response for account level.");

    // Fetch ranked data
    const rankedData = await fetchRankedData(accountLevel.id);

    // Fetch rank percentile
    const rankPercentile = await fetchRankPercentile(accountLevel.id);
    console.log("Rank percentile:", rankPercentile);

    const puuid = accountData.puuid;

    // Helper functions for formatting rank
    const romanToNumber = (roman) => {
      const romanNumerals = {
        I: 1,
        II: 2,
        III: 3,
        IV: 4,
        V: 5,
      };
      return romanNumerals[roman] || roman; // Default to roman if not found
    };

    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    // Handle Solo/Duo Rank Data
    const soloDuoRankData = rankedData?.find((entry) => entry.queueType === "RANKED_SOLO_5x5") || {};
    const soloduorank = soloDuoRankData.tier
      ? `${capitalizeFirstLetter(soloDuoRankData.tier)} ${romanToNumber(soloDuoRankData.rank)}`
      : "Unranked";
    const soloduowinrate = soloDuoRankData.wins
      ? ((soloDuoRankData.wins / (soloDuoRankData.wins + soloDuoRankData.losses)) * 100).toFixed(2)
      : "N/A";

    // Handle Flex Rank Data
    const rankedFlexData = rankedData?.find((entry) => entry.queueType === "RANKED_FLEX_SR") || {};
    const flexrank = rankedFlexData.tier
      ? `${capitalizeFirstLetter(rankedFlexData.tier)} ${romanToNumber(rankedFlexData.rank)}`
      : "Unranked";
    const flexwinrate = rankedFlexData.wins
      ? ((rankedFlexData.wins / (rankedFlexData.wins + rankedFlexData.losses)) * 100).toFixed(2)
      : "N/A";

    // Build profile data
    const profileData = {
      name: accountData.gameName,
      tagline: accountData.tagLine,
      icon: accountLevel.profileIconId,
      level: accountLevel.summonerLevel,
      soloduorank,
      soloduowins: soloDuoRankData.wins || 0,
      soloduolosses: soloDuoRankData.losses || 0,
      soloduolp: soloDuoRankData.leaguePoints || 0,
      soloduogames: (soloDuoRankData.wins || 0) + (soloDuoRankData.losses || 0),
      soloduowinrate,
      flexrank,
      flexwins: rankedFlexData.wins || 0,
      flexlosses: rankedFlexData.losses || 0,
      flexlp: rankedFlexData.leaguePoints || 0,
      flexgames: (rankedFlexData.wins || 0) + (rankedFlexData.losses || 0),
      flexwinrate,
      rankpercentile: rankPercentile?.percentile || "Unknown",
      numberrank: rankPercentile?.rank || "Unknown",
      puuid: puuid,
    };

    // Cache and update profile
    setCache((prev) => ({ ...prev, [cacheKey]: profileData }));
    setProfile(profileData);
    setMatchHistory([]); // Reset match history
  } catch (error) {
    console.error("Error fetching profile:", error);

    // Build a fallback profile with available data or placeholders
    const fallbackProfile = {
      name: "Unknown Player",
      tagline: "",
      icon: 0,
      level: "N/A",
      soloduorank: "Unranked",
      soloduowins: 0,
      soloduolosses: 0,
      soloduolp: 0,
      soloduogames: 0,
      soloduowinrate: "N/A",
      flexrank: "Unranked",
      flexwins: 0,
      flexlosses: 0,
      flexlp: 0,
      flexgames: 0,
      flexwinrate: "N/A",
      rankpercentile: "Unknown",
      numberrank: "Unknown",
      puuid: "",
    };

    setProfile(fallbackProfile);
    setMatchHistory([]); // Reset match history
  }
};

// Mocked cache retrieval (replace with actual cache logic if needed)
const getCache = (cacheKey) => {
  return null; // Replace with your actual caching logic
};
