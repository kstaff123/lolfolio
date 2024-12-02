import rivensplashart from "./assets/rivensplashart.jpg";
import rivenicon from "./assets/rivenicon.png";
import React, {useState, useEffect} from "react";
import diamond from "./assets/diamond.png";
import kindredIcon from "./assets/kindredicon.png";
import flash from "./assets/flash.png";
import conqueror from "./assets/conqueror.png";
import smite from "./assets/smite.png";
import domination from "./assets/domination.png";
import items from "./assets/items.png";
import players from "./assets/players.png";
import { fetchMatchById } from "./riotapifetcher";
import { useProfile } from "./ProfileContext";






export function Match({ matchId }) {
  const { profile } = useProfile();
  const puuid = profile?.puuid;

  const [matchData, setMatchData] = useState(null);
  const [participantData, setParticipantData] = useState(null);

  useEffect(() => {
    const loadMatchData = async () => {
      const data = await fetchMatchById(matchId);
      setMatchData(data?.data || null); // Extract match data from response

      if (data?.data) {
        // Find participant index
        const participantIndex = data.data.metadata.participants.indexOf(puuid);

        if (participantIndex !== -1) {
          // Extract participant data
          const participantInfo = data.data.info.participants[participantIndex];
          setParticipantData(participantInfo);
        } else {
          console.error(`PUUID ${puuid} not found in participants.`);
        }
      }
    };

    loadMatchData();
  }, [matchId, puuid]);

  if (!matchData || !participantData) {
    return <p>Loading match...</p>;
  }

  const { gameMode, gameDuration } = matchData.info; // Overall match data
  const duration = `${Math.floor(gameDuration / 60)}:${gameDuration % 60}`;

  const {
    championName,
    kills,
    deaths,
    assists,
    totalMinionsKilled,
    visionScore,
    items,
  } = participantData; // Participant-specific data
  
  return (
    <div className="flex bg-[#323B7B] sm:mx-6 mx-2 my-2 items-center p-3 drop-shadow-md gap-2 sm:gap-4 text-center justify-between ">
      <MatchType gameMode={gameMode} gameDuration={gameDuration} />
      <MatchChamp championName={championName} />
      <MatchKD kills={kills} deaths={deaths} assists={assists} />
      <MatchItems items={items} />
    </div>
  );
}

  export function MatchNoPlayers() {
    return (
      <div className="flex bg-[#323B7B] sm:mx-6 mx-2  my-2 items-center p-3 drop-shadow-md gap-2 sm:gap-4 text-center justify-between ">
        <MatchType />
        <MatchChamp />
        <MatchKD />
        <MatchItems />
      </div>
    );
  }

  function MatchType({ gameMode, gameDuration }) {
    const duration = `${Math.floor(gameDuration / 60)}:${gameDuration % 60}`;
  
    return (
      <div className="flex flex-col items-center flex-shrink-0">
        <h2 className="sm:text-sm font-semibold text-2xs max-[640px]:leading-[12px]">
          {gameMode}
        </h2>
        <div className="flex sm:my-1">
          <h2 className="pr-1 font-bold sm:text-xs text-[#6C7FFF] text-2xs  max-[640px]:leading-[12px]">
            WIN
          </h2>
          <p className="font-thin sm:text-xs text-2xs max-[640px]:leading-[12px]">{duration}</p>
        </div>
      </div>
    );
  }
  
  function MatchChamp() {
    return (
      <div className="flex items-center flex-shrink-0 relative">
        <div className="relative">
          {/* Kindred Icon */}
          <img
            src={kindredIcon}
            className="size-10 sm:size-16 rounded-md relative"
            alt="Kindred Icon"
          />
  
          {/* Level Text */}
          <div className="bg-neutral-800 sm:w-4 sm:h-4 w-3 h-3 text-center rounded-bl-md flex items-center justify-center absolute bottom-0 left-0">
            <p className="sm:text-[10px] text-[8px] text-white leading-none">16</p>
          </div>
        </div>
  
        {/* Summoner Spells */}
        <div className="flex flex-col size-6 gap-[3px] ml-[2px] w-fit justify-center">
          <div className="flex gap-[2px]">
            <img
              src={flash}
              className="rounded-sm sm:w-[26px] sm:h-[26px] w-[18px] h-[18px]"
              alt="Flash"
            />
            <img
              src={conqueror}
              className="rounded-sm bg-neutral-700 sm:w-[26px] sm:h-[26px] w-[18px] h-[18px]"
              alt="Conqueror"
            />
          </div>
          <div className="flex gap-0.5">
            <img
              src={smite}
              className="rounded-sm sm:w-[26px] sm:h-[26px] w-[18px] h-[18px]"
              alt="Smite"
            />
            <img
              src={domination}
              className="rounded-sm bg-neutral-700 sm:w-[26px] sm:h-[26px] w-[18px] h-[18px]"
              alt="Domination"
            />
          </div>
        </div>
      </div>
    );
  }
  
  
  function MatchKD() {
    return (
      <div className="flex flex-col items-center flex-shrink-0 ">
        <div className="flex items-center  text-lg tracking-tighter flex-shrink-0 ">
          <div className="flex flex-shrink-0 sm:text-lg text-2xs leading-[16px]">
            <h2 className="pr-1">11</h2>
            <p className="font-[100] text-neutral-400 pr-1">/</p>
            <h2 className="pr-1">11</h2>
            <p className="font-[100] text-neutral-400 pr-1">/</p>
            <h2 className="pr-1">11</h2>
          </div>
        </div>
        <div className="flex  ">
          <h2 className="pr-1 font-bold sm:text-xs text-2xs text-[#6C7FFF] ">
            3.86
          </h2>
          <p className="font-thin sm:text-xs   text-2xs leading-[16px] ">KDA</p>
        </div>
        <div className="flex items-center  leading-[16px]">
          <p className="font-thin sm:text-xs  text-2xs leading-[16px]">191 CS (6.2)</p>
        </div>
        <div className="flex">
          <p className="font-thin sm:text-xs text-2xs leading-[16px]">27 vision</p>
        </div>
      </div>
    );
  }
  
  function MatchItems() {
    return (
      <div className="flex flex-shrink-0">
        <img src={items} className="min-h-full sm:w-32  w-24"></img>
      </div>
    );
  }
  
  function MatchPlayers() {
    return (
      <div className="flex flex-shrink-0 max-[1280px]:block max-[1600px]:hidden">
        <img src={players} className="min-h-full w-48" />
      </div>
    );
  }