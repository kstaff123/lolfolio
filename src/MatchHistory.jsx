import React, { useState, useEffect } from "react";
import { fetchMatchHistory } from "./riotapifetcher"; // Fetch match IDs
import { useProfile } from "./ProfileContext";
import { Match, MatchNoPlayers } from "./Match";

export function MatchHistory() {
  const { profile } = useProfile();
  const puuid = profile?.puuid; // Safely access puuid

  const [matchIds, setMatchIds] = useState([]); // Store match IDs
  const [loading, setLoading] = useState(false); // Loading state
  const [start, setStart] = useState(0); // Start index for pagination
  const [hasMoreMatches, setHasMoreMatches] = useState(true); // Flag to check if more matches are available
  const count = 10; // Number of matches to fetch at a time

  // Load match IDs when the component mounts or the puuid changes
  useEffect(() => {
    if (!puuid) return; // Skip fetching if puuid is undefined
    setMatchIds([]); // Reset match IDs if puuid changes
    setStart(0); // Reset start index
    setHasMoreMatches(true); // Reset "has more" flag
    loadMoreMatches();
  }, [puuid]);

  const loadMoreMatches = async () => {
    if (!puuid || loading || !hasMoreMatches) return; // Prevent multiple fetches or fetch without puuid

    setLoading(true);
    try {
      const newMatchIds = await fetchMatchHistory(puuid, start, count); // Fetch only match IDs
      if (newMatchIds.length < count) {
        setHasMoreMatches(false); // No more matches to load
      }
      setMatchIds((prev) => [...prev, ...newMatchIds]); // Append new match IDs
      setStart((prev) => prev + count); // Update start index
    } catch (error) {
      console.error("Error fetching match history:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!profile || !puuid) {
    return (
      <main className="font-montserrat flex justify-center">
        <p className="text-white">No profile loaded. Search for a summoner.</p>
      </main>
    );
  }

  return (
    <div className="xl:col-span-6 col-span-2 py-1 xl:py-3 bg-neutral-700 rounded-xl drop-shadow-xl mb-10">
      <div className="flex flex-col">
        <div className="text-md flex align items-center px-1 xl:px-3">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 14.707 14.707"
              fill="#ffffff"
              stroke="#ffffff"
              className="w-3 h-4 sm:w-4 sm:h-5"
            >
              <rect x="6.275" y="0" width="1.158" height="14.707" />
            </svg>
          </div>
          <h3 className="font-light text-xs sm:text-base">Match History</h3>
        </div>
      </div>

      {/* Render matches */}
      {matchIds.map((matchId, index) => (
        <div key={index} className="max-[797px]:hidden">
          <Match matchId={matchId} />
        </div>
      ))}

      {matchIds.map((matchId, index) => (
        <div key={index} className="min-[797px]:hidden">
          <MatchNoPlayers matchId={matchId} />
        </div>
      ))}

      {/* Load more button */}
      <div className="text-center">
        {loading && <p>Loading...</p>}
        {!loading && hasMoreMatches && (
          <button
            onClick={loadMoreMatches}
            className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}
