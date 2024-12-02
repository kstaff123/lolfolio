import { Match } from "./Match";
import { MatchNoPlayers } from "./Match";
import rivensplashart from "./assets/rivensplashart.jpg";
import rivenicon from "./assets/rivenicon.png";

import diamond from "./assets/diamond.png";
import kindredIcon from "./assets/kindredicon.png";
import flash from "./assets/flash.png";
import conqueror from "./assets/conqueror.png";
import smite from "./assets/smite.png";
import domination from "./assets/domination.png";
import items from "./assets/items.png";
import players from "./assets/players.png";

export function MatchHistory() {
    return (
      <div className="xl:col-span-6 col-span-2 py-1 xl:py-3  bg-neutral-700 rounded-xl drop-shadow-xl min-[1600px]:max-w-[755px]  mb-10">
        <div className="flex flex-col ">
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
        <div className="flex bg-neutral-600 my-4 justify-between items-center px-4 py-2 drop-shadow-md">
          <div className="flex items-center">
            {/** winrate */}
            <div className="drop-shadow-lg flex justify-center items-center max-[640px]:w-[40px] pr-2 ">
              <svg
                class="-rotate-90"
                viewBox="0 0 50 50"
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                
              >
                {/** Background Circle */}
                <circle
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  class="stroke-current text-[#A56B6B]"
                  stroke-width="10"
                ></circle>
                {/** Progress Circle */}
                <circle
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  class="stroke-current text-[#6B7FFF]"
                  stroke-width="10"
                  stroke-dasharray="62.8 125.6"
                  stroke-dashoffset="0"
                ></circle>
              </svg>
            </div>
  
            <div className="flex flex-col">
              <h2 className="font-semibold sm:text-base text-2xs"> 50% Win Rate</h2>
              <h3 className="font-light sm:text-xs text-3xs">last 10 games</h3>
            </div>
          </div>
          <div className="flex items-center flex-col sm:text-base text-2xs">
            <h2 className="font-bold sm:text-base text-2xs">2.16 KDA</h2>
            <div className="flex">
              <h2 className="pr-1">11.4</h2>
              <p className="font-[100] text-neutral-400 pr-1">/</p>
              <h2 className="pr-1">11.4</h2>
              <p className="font-[100] text-neutral-400 pr-1">/</p>
              <h2 className="pr-1">11.4</h2>
            </div>
          </div>
          <div className="flex items-center">
            <img src={kindredIcon} className="size-6"></img>
            <div className="flex flex-col ">
              <div className=" pl-2 flex sm:text-sm text-2xs">
                <h3>50%</h3>
                <h3 className="pl-1">(5W 5L)</h3>
              </div>
              <div className="pl-2 flex sm:text-sm text-2xs">
                <div className="flex">
                  <h3>2.16</h3>
                  <h3 className="pl-1">KDA</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div className="max-[797px]:hidden">
          <Match />
        </div>
        <div className="min-[797px]:hidden">
          <MatchNoPlayers />
        </div>
  
        <div className="max-[797px]:hidden">
          <Match />
        </div>
        <div className="min-[797px]:hidden">
          <MatchNoPlayers />
        </div>
        <div className="max-[797px]:hidden">
          <Match />
        </div>
        <div className="min-[797px]:hidden">
          <MatchNoPlayers />
        </div>
        <div className="max-[797px]:hidden">
          <Match />
        </div>
        <div className="min-[797px]:hidden">
          <MatchNoPlayers />
        </div>
        <div className="max-[797px]:hidden">
          <Match />
        </div>
        <div className="min-[797px]:hidden">
          <MatchNoPlayers />
        </div>
        <div className="max-[797px]:hidden">
          <Match />
        </div>
        <div className="min-[797px]:hidden">
          <MatchNoPlayers />
        </div>
        <div className="max-[797px]:hidden">
          <Match />
        </div>
        <div className="min-[797px]:hidden">
          <MatchNoPlayers />
        </div>
        
  
  
      </div>
    );
  }