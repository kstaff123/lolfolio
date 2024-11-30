import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import rivensplashart from "./assets/rivensplashart.jpg";

import { Header } from "./Header";
import { ProfileCard } from "./ProfileCard";
import { Grid, MobileGrid } from "./Grid";
import { Match, MatchNoPlayers } from "./Match";
import { MatchHistory } from "./MatchHistory";
import { RankedSolo } from "./RankedSolo";
import { fetchAccountData } from "./riotapifetcher";
import { Background } from "./Background";

function App() {
  return (
    <div className="bg-background-purple min-h-screen relative overflow-hidden">
      {/* Background Art */}
      <Background />
      {/* Gradient Overlay */}

      {/* Content */}
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

export default App;
