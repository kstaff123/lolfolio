import React, { useState } from "react";
import { useProfile } from "./ProfileContext.jsx";
import { fetchAccountData, FetchAccountLevel } from "./riotapifetcher";
import logo from "./assets/logo.png";

export function Header() {
  const { cache, setCache, setProfile, setLoading, setMatchHistory } = useProfile();
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = async () => {
    setLoading(true);
  
    // Parse input into name and tagline
    const [inputName, inputTagline] = searchInput.includes("#")
      ? searchInput.split("#")
      : [searchInput, ""]; // Default to empty tagline if no `#`
  
    if (!inputName) {
      console.error("Invalid input: Account name is required.");
      setLoading(false);
      return;
    }
  
    const cacheKey = `${inputName.toLowerCase()}#${inputTagline.toLowerCase()}`; // Normalize cache key for consistent lookups
  
    // Check cache for existing data
    if (cache[cacheKey]) {
      console.log("Loading profile from cache");
      setProfile(cache[cacheKey]);
      setLoading(false);
      return;
    }
  
    try {
      // Fetch account data from the API
      const accountData = await fetchAccountData(inputName, inputTagline); // Fetch API data
      if (!accountData || !accountData.gameName || !accountData.tagLine) {
        console.error("Invalid response from API. Ensure the account exists.");
        setLoading(false);
        return;
      }

      const accountLevel = await FetchAccountLevel(accountData.puuid); // Fetch Account Level with PUUID from prev response
      if (!accountLevel || !accountLevel.summonerLevel || !accountLevel.profileIconId) {
        console.error("Invalid response from API. Ensure the account exists.");
        setLoading(false);
        return;
      }
  
      // Extract the properly formatted name and tagline from API response
      const formattedName = accountData.gameName; // Proper casing for name
      const formattedTagline = accountData.tagLine; // Proper casing for tag
  
      // Build the profile data
      const profileData = {
        name: formattedName,
        tagline: formattedTagline,
        icon: accountLevel.profileIconId, // Example additional field
        level: accountLevel.summonerLevel, // Example additional field
      };
  
      // Cache and update profile
      setCache((prev) => ({ ...prev, [cacheKey]: profileData })); // Cache response
      setProfile(profileData); // Update context with profile data
      setMatchHistory([]); // Reset match history (if applicable)
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };
  
  
  
  return (
    <header className="bg-neutral-700 flex h-20 font-montserrat w-full text-white font-extralight border-none drop-shadow-lg shadow-black">
      <div className="flex items-center mx-4 min-w-[300px]">
        <img
          id="logo"
          src={logo}
          className="size-6 h-7 max-[450px]:size-9 max-[450px]:mr-4 hover:cursor-pointer"
          alt="Olfolio Logo"
        />
        <h2 className="text-3xl pr-3 max-[450px]:hidden hover:cursor-pointer">
          olfolio
        </h2>
        <div className="bg-neutral-600 hover:bg-stone-400 focus:bg-stone-400 border-none outline-none w-[400px] min-w-[100px] h-10 my-4 rounded-3xl flex items-center group transition-all ease-in-out hover:placeholder-white ">
          <input
            placeholder="AccountName[#tag]"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            className="w-full max-w-full flex h-full rounded-3xl bg-transparent border-none outline-none text-lg font-normal px-4 hover:placeholder:text-inherit"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Trigger search on Enter key
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 mx-2 stroke-neutral-400 group-hover:stroke-white hover:cursor-pointer stroke-2 flex-shrink-0"
            onClick={handleSearch} // Trigger search on click
            
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </div>
    </header>
  );
}
