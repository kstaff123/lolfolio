import rivensplashart from "./assets/rivensplashart.jpg";
import rivenicon from "./assets/rivenicon.png";
import React, {useState, useEffect} from "react";
import diamond from "./assets/diamond.png";
import kindredIcon from "./assets/kindredicon.png";
import flash from "./assets/flash.png";
import conqueror from "./assets/conqueror.png";
import smite from "./assets/smite.png";
import domination from "./assets/domination.png";
import players from "./assets/players.png";
import { fetchMatchById } from "./riotapifetcher";
import { useProfile } from "./ProfileContext";
import queueData from ".//queuetypes.json";


export const computeMatchData = async (matchId, puuid) => {
  const data = await fetchMatchById(matchId);

  if (!data?.data) throw new Error("Match data not found");

  const matchData = data.data;
  const participantIndex = matchData.metadata.participants.indexOf(puuid);
  if (participantIndex === -1) throw new Error(`PUUID ${puuid} not found in participants`);

  const participantData = matchData.info.participants[participantIndex];

  const { gameDuration } = matchData.info; // Overall match data
  const duration = `${Math.floor(gameDuration / 60)}:${gameDuration % 60}`;
  console.log(matchId);

  console.log("Rune 1:", participantData.perks.styles[0].selections[0].perk);
  console.log("Rune 2:", participantData.perks.styles[1].style);
  
  const {
    championName,
    kills,
    deaths,
    assists,
    totalMinionsKilled,
    visionScore,
    summoner1Id,
    summoner2Id,
    champLevel,
    neutralMinionsKilled,
    win, // Extract win status

  } = participantData; // Participant-specific data
  
    const summonerSpellsMap = {
      1: "Cleanse",
      2202: "Flash",
      2201: "Flee",
      14: "Dot",
      3: "Exhaust",
      4: "Flash",
      6: "Ghost",
      7: "Heal",
      13: "Clarity",
      30: "To the King!",
      31: "Poro Toss",
      11: "Smite",
      39: "Snowball",
      32: "Snowball",
      12: "Teleport",
      54: "Placeholder",
      55: "Placeholder and Attack-Smite",
      21: "Barrier",
    };

    const allRunes = [
      { treeId: 8000, treeKey: "Precision", id: 8005, key: "PressTheAttack" },
      { treeId: 8000, treeKey: "Precision", id: 8008, key: "LethalTempo" },
      { treeId: 8000, treeKey: "Precision", id: 8010, key: "Conqueror" },
      { treeId: 8100, treeKey: "Domination", id: 8112, key: "Electrocute" },
      { treeId: 8100, treeKey: "Domination", id: 8128, key: "DarkHarvest" },
      { treeId: 8100, treeKey: "Domination", id: 9923, key: "HailOfBlades" },
      { treeId: 8200, treeKey: "Sorcery", id: 8214, key: "SummonAery" },
      { treeId: 8200, treeKey: "Sorcery", id: 8229, key: "ArcaneComet" },
      { treeId: 8200, treeKey: "Sorcery", id: 8230, key: "PhaseRush" },
      { treeId: 8300, treeKey: "Inspiration", id: 8351, key: "GlacialAugment" },
      { treeId: 8300, treeKey: "Inspiration", id: 8360, key: "UnsealedSpellbook" },
      { treeId: 8300, treeKey: "Inspiration", id: 8369, key: "FirstStrike" },
      { treeId: 8400, treeKey: "Resolve", id: 8437, key: "GraspOfTheUndying" },
      { treeId: 8400, treeKey: "Resolve", id: 8439, key: "Aftershock" },
      { treeId: 8400, treeKey: "Resolve", id: 8465, key: "Guardian" },
    ];
    
    console.log("Full participantData:", participantData);
    console.log("Summoner Spells:", summoner1Id, summoner2Id);

    const spell1 = summonerSpellsMap[participantData.summoner1Id];
  const spell2 = summonerSpellsMap[participantData.summoner2Id];
  console.log("Spell1:", spell1);
  console.log("Spell2:", spell2);

  const rune1 = participantData?.perks?.styles?.[0]?.selections?.[0]?.perk || null;


const rune1style = participantData.perks.styles[0].style; // Tree ID
const rune2 = participantData?.perks?.styles?.[1]?.style || null;

// Find the tree key for the primary rune
const tree1 = allRunes.find((rune) => rune.treeId === rune1style)?.treeKey;

// Find the rune key for the specific rune
const rune1Key = allRunes.find((rune) => rune.id === rune1)?.key;

const rune2Key = allRunes.find((rune) => rune.treeId === rune2)?.treeKey;

const runeTreeIcons = [
  {id: 8000, link: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7201_Precision.png"},
  {id: 8100, link:  "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7200_Domination.png"},
  {id: 8200, link:  "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7202_Sorcery.png"},
  {id: 8300, link:  "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7203_Whimsy.png"},
  {id: 8400, link:  "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7204_Resolve.png"},
];

  const rune1Link = `https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/${tree1}/${rune1Key}/${rune1Key}.png`;
  const rune2Link = runeTreeIcons.find((rune) => rune.id === rune2)?.link;
  console.log("rune 2 link", rune2Link);

  function getQueueType(queueId) {
    const queue = queueData.find((q) => q.queueId === queueId);
    return queue ? queue.description || "No description available" : "Queue not found";
  }

  const { queueId } = matchData.info;
  const gameMode = getQueueType(queueId);

  function formatTimestampToMMDD(gameCreation) {
    const date = new Date(gameCreation);
    const month = date.getMonth() + 1; // getMonth() returns 0-11, so add 1
    const day = date.getDate();
    return `${month}/${day}`;
  }
  const date = formatTimestampToMMDD(matchData.info.gameCreation);


  const isRanked = !gameMode.includes("Ranked");


  const participants = matchData.info.participants.map((participant) => {
    const { championName, summonerName } = participant;
    return { championName, summonerName };
  });

  const items = [
    participantData.item0 || 0,
    participantData.item1 || 0,
    participantData.item2 || 0,
    participantData.item3 || 0,
    participantData.item4 || 0,
    participantData.item5 || 0,
    participantData.item6 || 0,
  ];

  return {
    gameMode,
    gameDuration,
    win,
    date,
    isRanked,
    championName,
    spell1,
    spell2,
    rune1Link,
    rune2Link,
    champLevel,
    kills,
    deaths,
    assists,
    totalMinionsKilled,
    visionScore,
    neutralMinionsKilled,
    items,
    participants,
  };
}




export function MatchContainer({ matchId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { profile } = useProfile();

  useEffect(() => {
    const loadData = async () => {
      try {
        const matchData = await computeMatchData(matchId, profile?.puuid);
        setData(matchData);
      } catch (error) {
        console.error("Error fetching match data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [matchId, profile?.puuid]);

  if (loading) return <p>Loading match data...</p>;
  if (!data) return <p>Match data not available.</p>;

  // Use CSS to conditionally render the components based on screen size
  return (
    <>
      <div className="max-[797px]:hidden">
        <Match {...data} />
      </div>
      <div className="min-[797px]:hidden">
        <MatchNoPlayers {...data} />
      </div>
    </>
  );
}




export function Match({ gameMode, gameDuration, win, date, isRanked, championName, spell1, spell2, rune1Link, rune2Link, champLevel, kills, deaths, assists, totalMinionsKilled, visionScore, neutralMinionsKilled, items, participants}) {
  

  return (
    <div className={`flex ${win ? 'bg-[#323B7B]' : 'bg-[#5C2A42]'} sm:mx-6 mx-2 my-2 items-center p-3 drop-shadow-xl gap-2 sm:gap-4 text-center justify-between`}>
      <MatchType gameMode={gameMode} gameDuration={gameDuration} win={win} date={date} isRanked={isRanked}/>
      <MatchChamp championName={championName} spell1={spell1} spell2={spell2} rune1Link={rune1Link} rune2Link={rune2Link} champLevel={champLevel}/>
      <MatchKD kills={kills} deaths={deaths} assists={assists} totalMinionsKilled={totalMinionsKilled} visionScore={visionScore} gameDuration={gameDuration} neutralMinionsKilled={neutralMinionsKilled}/>
      <MatchItems items={items || []} win={win} />
      <MatchPlayers participants={participants} />
    </div>
  );
}

export function MatchNoPlayers({ gameMode, gameDuration, win, date, isRanked, championName, spell1, spell2, rune1Link, rune2Link, champLevel, kills, deaths, assists, totalMinionsKilled, visionScore, neutralMinionsKilled, items, participants }) {
  return (
    <div className={`flex ${win ? 'bg-[#323B7B]' : 'bg-[#5C2A42]'} sm:mx-6 mx-2  my-2 items-center p-3 drop-shadow-md gap-2 sm:gap-4 text-center justify-between `}>
      <MatchType gameMode={gameMode} gameDuration={gameDuration} win={win} date={date} isRanked={isRanked}/>
      <MatchChamp championName={championName} spell1={spell1} spell2={spell2} rune1Link={rune1Link} rune2Link={rune2Link} champLevel={champLevel}/>
      <MatchKD kills={kills} deaths={deaths} assists={assists} totalMinionsKilled={totalMinionsKilled} visionScore={visionScore} gameDuration={gameDuration} neutralMinionsKilled={neutralMinionsKilled}/>
      <MatchItems items={items || []} win={win} />
    </div>
  );
}

function MatchType({ gameMode, gameDuration, win, date, isRanked }) {
  const duration = `${Math.floor(gameDuration / 60)}:${gameDuration % 60}`;
  const result = win ? "WIN" : "LOSS";
  const remake = gameDuration < 300;

  return (
    <div className="flex flex-col items-center flex-shrink-0 justify-center text-center">
      <h2 className="sm:text-sm font-semibold text-2xs max-[640px]:leading-[12px]">
        {gameMode}
      </h2>
      <p className="sm:text-xs font-reg text-2xs max-[640px]:leading-[12px] text-[#cddcfe]">{date}</p>
      <div className={`flex items-center space-x-2 ${isRanked ? `hidden` : 'visible'} `}>
          <svg 
            width="9"
            height="5"
            viewBox="0 0 9 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transform: win ? "rotate(0deg)" : "rotate(180deg)", // Rotate based on win
            }}
          >
            <path d="M4.5 0L8.39711 4.5H0.602886L4.5 0Z" fill={win ? "#6C7FFF" : "#FF6C6C"} />
          </svg>
          <h1 className="font-semibold sm:text-lg max-[640px]:leading-[12px] text-2xs">{!remake ? Math.floor(Math.random() * 9) + 20 : 0} LP</h1>
        
        </div>
            <div className="flex">
              <h2 className={`pr-1 font-bold sm:text-xs text-2xs max-[640px]:leading-[12px] ${win ? 'text-[#6C7FFF]' : 'text-[#FF6C6C]'} `}>
                {remake ? "REMAKE" : result}
              </h2>
              <p className="font-reg sm:text-xs text-2xs max-[640px]:leading-[12px] text-[#cddcfe]">{duration}</p>
            </div>
    </div>
  );
}

function MatchChamp({championName, spell1, spell2, rune1Link, rune2Link, champLevel}) {
  return (
    <div className="flex items-center flex-shrink-0 relative">
      <div className="relative">
        {/* Kindred Icon */}
        <img
  src={`https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/${championName || "Unknown"}.png`}
  alt={championName || "Unknown Champion"}
  className="size-10 sm:size-16 rounded-md"
/>


        {/* Level Text */}
        <div className="bg-neutral-800 sm:w-4 sm:h-4 w-3 h-3 text-center rounded-bl-md flex items-center justify-center absolute bottom-0 left-0">
          <p className="sm:text-[10px] text-[8px] text-white leading-none">{champLevel}</p>
        </div>
      </div>

      {/* Summoner Spells */}
      <div className="flex flex-col size-6 gap-[3px] ml-[2px] w-fit justify-center">
        <div className="flex gap-[2px]">
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/14.23.1/img/spell/Summoner${spell1}.png`}
            className="rounded-sm sm:w-[26px] sm:h-[26px] w-[18px] h-[18px]"
            alt={`${spell1}`}
          />
          <img
            src={rune1Link || "fallback_image_url"}
            className="rounded-sm bg-neutral-700 sm:w-[26px] sm:h-[26px] w-[18px] h-[18px]"
            alt="Conqueror"
          />
        </div>
        <div className="flex gap-0.5">
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/14.23.1/img/spell/Summoner${spell2}.png`}
            className="rounded-sm sm:w-[26px] sm:h-[26px] w-[18px] h-[18px]"
            alt={`${spell2}`}
          />
          <img
            src={rune2Link}
            className="rounded-sm bg-neutral-700 sm:w-[26px] sm:h-[26px] w-[18px] h-[18px]"
            alt="Domination"
          />
        </div>
      </div>
    </div>
  );
}

function MatchKD({ kills, deaths, assists, totalMinionsKilled, visionScore, gameDuration, neutralMinionsKilled }) {
  const kda = ((kills + assists) / (deaths || 1)).toFixed(2);
  const csPerMinute = ((totalMinionsKilled + neutralMinionsKilled) / (gameDuration / 60)).toFixed(1);
  console.log("CS per minute:", csPerMinute);

  return (
    <div className="flex flex-col items-center flex-shrink-0 ">
      <div className="flex items-center  text-lg tracking-tighter flex-shrink-0 ">
        <div className="flex flex-shrink-0 sm:text-lg text-2xs leading-[16px] font-semibold">
          <h2 className="pr-1">{kills}</h2>
          <p className="font-[100] text-neutral-400 pr-1">/</p>
          <h2 className="pr-1 text-[#ff4e50]">{deaths}</h2>
          <p className="font-[100] text-neutral-400 pr-1">/</p>
          <h2 className="pr-1">{assists}</h2>
        </div>
      </div>
      <div className="flex  ">
        <h2 className="pr-1 font-bold sm:text-xs text-2xs text-[#6C7FFF] ">
          {kda}
        </h2>
        <p className="font-reg sm:text-xs   text-2xs leading-[16px]  text-[#cddcfe] ">KDA</p>
      </div>
      <div className="flex items-center  leading-[16px] text-[#cddcfe]">
        <p className="font-reg sm:text-xs  text-2xs leading-[16px]">{totalMinionsKilled + neutralMinionsKilled} CS ({csPerMinute})</p>
      </div>
      <div className="flex">
        <p className="font-reg sm:text-xs text-2xs leading-[16px] text-[#cddcfe]">{visionScore} vision</p>
      </div>
    </div>
  );
}

function MatchItems({ items = [], win }) {
  // Ensure 6 regular items and 1 ward item
  const regularItems = items.slice(0, 6); // First 6 items
  const wardItem = items[6] || 3340; // Default to Warding Totem if no ward is present

  // Add placeholders for empty slots
  const gridItems = [...regularItems, ...Array(6 - regularItems.length).fill(0)];

  return (
    <div className="flex flex-shrink-0">
    <div className="grid grid-cols-3 gap-1">
      {gridItems.map((item, index) => (
        <div
          key={index}
          className={`sm:w-6 sm:h-6 w-4  flex items-center justify-center rounded-md ${win ? 'bg-[#23366b]' : 'bg-[#53263e]'}`}
        >
          {item !== 0 && (
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/${item}.png`}
              alt={`Item ${item}`}
              className="sm:w-6 sm:h-6 w-4 rounded-md"
            />
          )}
        </div>
      ))}

      {/* Warding Totem (always on the bottom-right corner) */}
      
    </div>
    <div
    className="sm:w-6 sm:h-6 w-4 bg-[#32274d] flex items-center justify-center rounded-md ml-1 h-fit"
  >
    <img
      src={`https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/${wardItem}.png`}
      alt="Warding Totem"
      className="sm:w-6 sm:h-6 w-4 rounded-md"
    />
  </div>
  </div>
  );
}




function MatchPlayers({ participants = [] }) {
  const [isHidden, setIsHidden] = useState(false); // Visibility state

  useEffect(() => {
    // Function to handle screen size changes
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      // Hide the element if screen width is between 1280px and 1600px
      if (screenWidth >= 1280 && screenWidth < 1600) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
    };

    // Initial check
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Ensure participants is an array
  const team1 = participants?.slice(0, 5) || [];
  const team2 = participants?.slice(5, 10) || [];

  return (
    <div
      className="flex justify-center gap-5 flex-shrink-0 min-w-[212px]"
      style={{
        display: isHidden ? "none" : "flex", // Use `visibility` to control display
      }}
    >
      {/* Team 1 */}
      <div className="flex flex-col items-start gap-1">
        {team1.map((player, index) => (
          <div key={index} className="flex items-center gap-3">
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/${player?.championName || "Unknown"}.png`}
              alt={player?.championName || "Unknown"}
              className="w-5 h-5 rounded-md"
            />
            <p className="text-white font-light text-xs whitespace-nowrap overflow-hidden text-ellipsis max-w-16">
              {player?.summonerName || "Unknown Player"}
            </p>
          </div>
        ))}
      </div>

      {/* Team 2 */}
      <div className="flex flex-col items-start gap-1 flex-shrink-0">
        {team2.map((player, index) => (
          <div key={index} className="flex items-center gap-3">
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/${player?.championName || "Unknown"}.png`}
              alt={player?.championName || "Unknown"}
              className="w-5 h-5 rounded-md"
            />
            <p className="text-white font-light text-xs whitespace-nowrap overflow-hidden text-ellipsis max-w-16">
              {player?.summonerName || "Unknown Player"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
