import { useEffect } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import React from "react";
import "./App.css";

import { Header } from "./Header";
import { ProfileCard } from "./ProfileCard";
import { Grid, MobileGrid } from "./Grid";
import { Background } from "./Background";
import { useProfile } from "./ProfileContext.jsx";
import { handleAccountSearch } from "./apiHandler.js";

export function PlayerPage() {
  const { playerDashTag } = useParams(); // Extract "playerDashTag" from URL
  const { setLoading, setProfile, setCache, setMatchHistory } = useProfile();

  React.useEffect(() => {
    if (playerDashTag) {
      const [playername, tagline] = playerDashTag.split("-"); // Split by dash to get playername and tagline
      if (playername && tagline) {
        const searchInput = `${playername}#${tagline}`; // Convert back to expected format for API
        setLoading(true);
        handleAccountSearch(searchInput, { setProfile, setCache, setMatchHistory })
          .catch((err) => console.error("Error fetching player data:", err))
          .finally(() => setLoading(false));
      }
    }
  }, [playerDashTag]); // Re-run when "playerDashTag" changes

  return (
    <div className="bg-background-purple min-h-screen relative overflow-hidden">
      <Background />
      <div className="relative z-[100]">
        <div className="max-[1280px]:hidden">
          <Header />
          <ProfileCard />
          <Grid />
        </div>
        <div className="min-[1280px]:hidden">
          <Header />
          <ProfileCard />
          <MobileGrid />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<PlayerPage />} /> {/* Default route */}
      <Route path="/player/:playerDashTag" element={<PlayerPage />} /> {/* Dynamic route */}
    </Routes>
  );
}


export default App;