import React, { createContext, useContext, useState } from "react";

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [cache, setCache] = useState({}); // Cache for summoner data
  const [profile, setProfile] = useState(null); // Current summoner profile
  const [loading, setLoading] = useState(false); // Loading state
  const [matchHistory, setMatchHistory] = useState([]); // Match history

  return (
    <ProfileContext.Provider
      value={{
        cache,
        setCache,
        profile,
        setProfile,
        loading,
        setLoading,
        matchHistory,
        setMatchHistory,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
