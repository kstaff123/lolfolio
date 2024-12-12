import React, { useState, useEffect } from "react";
import { fetchMatchHistory } from "./riotapifetcher"; // Fetch match IDs
import { useProfile } from "./ProfileContext";
import { MatchContainer } from "./Match";

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

    // Clear previous match data when a new profile is loaded
    setMatchIds([]); // Reset match IDs
    setStart(0); // Reset start index
    setHasMoreMatches(true); // Reset "has more" flag

    // Fetch the first batch of matches immediately
    const fetchInitialMatches = async () => {
      setLoading(true); // Start loading
      try {
        const initialMatches = await fetchMatchHistory(puuid, 0, count); // Fetch the first batch
        if (initialMatches.length < count) {
          setHasMoreMatches(false); // No more matches to load
        }
        setMatchIds(initialMatches); // Set the initial match IDs
      } catch (error) {
        console.error("Error fetching match history:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchInitialMatches(); // Call the fetch function
  }, [puuid]);

  // Load more matches when "Load More" is clicked
  const loadMoreMatches = async () => {
    if (!puuid || loading || !hasMoreMatches) return; // Prevent multiple fetches or fetch without puuid

    setLoading(true);
    try {
      const newMatchIds = await fetchMatchHistory(puuid, start + count, count); // Fetch additional match IDs
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
      <main className="font-montserrat flex justify-center xl:col-span-6 col-span-2 py-1 xl:py-3 bg-neutral-700 rounded-xl drop-shadow-xl mb-10">
        <div role="status" className="flex justify-center">
          <svg
            aria-hidden="true"
            class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </main>
    );
  }

  return (
    <div className="xl:col-span-6 col-span-2 py-1 xl:py-3 bg-neutral-700/90 rounded-xl drop-shadow-xl mb-10">
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
        <MatchContainer key={index} matchId={matchId} />
      ))}

      {/* Load more button */}
      <div className="text-center flex justify-center">
        {loading && (
          <div role="status">
            <svg
              aria-hidden="true"
              class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        )}
        {!loading && hasMoreMatches && (
          <button
            onClick={loadMoreMatches}
            className="px-4 py-2 my-4 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}
