import rivenSplashArt from "./assets/rivensplashart.jpg";
import { useProfile } from "./ProfileContext";
import React from "react";

export function Background() {
  // Ensure hooks are used inside the component body
  const { profile } = useProfile();
  const splashArtLink = profile?.bestChampion
    ? `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${profile.bestChampion}_0.jpg`
    : rivenSplashArt;

  return (
    <div className="relative">
      <div></div>
      <div
        className="absolute z-0 min-h-[700px]  bg-center left-[50%] translate-x-[-50%] translate-y-[5%] w-[1200px] bg-no-repeat min-w-[300px]"
        style={{
          backgroundImage: splashArtLink
            ? `linear-gradient(180deg,rgba(51,50,80,.28),#333250),linear-gradient(270deg,#333250 2.27%,rgba(51,50,80,0) 37.69%),linear-gradient(90deg,#333250 2.27%,rgba(51,50,80,0) 37.69%),radial-gradient(60% 60% at 50% 20.89%,rgba(51,50,80,0) 0,#333250 70%),
          url("${splashArtLink}")`
            : "none",
          willChange: "transform",
          imageRendering: "pixelated",
        }}
      ></div>
    </div>
  );
}
