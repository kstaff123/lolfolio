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

export function RankedSolo() {
    return (
      <div className="xl:col-span-3 col-span-1 p-1 xl:p-3 bg-neutral-700 rounded-xl drop-shadow-xl h-fit">
        <div flex flex-col>
          <div className="text-md flex align items-center">
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
            <h3 className="font-light text-xs sm:text-base">Ranked Solo</h3>
          </div>
          <div className="flex items-center sm:mt-2 mt-1 sm:mb-4 mb-2">
            <img
              id="diamond"
              src={diamond}
              className=" h-7 sm:h-11 drop-shadow-md pl-1"
            ></img>
            <div className="flex flex-col ml-2 w-full">
              <div className="flex justify-between w-full">
                <h2 className="text-xs sm:text-base font-semibold p-0">
                  Diamond 1
                </h2>
                <h2 className="text-2xs sm:text-base font-thin ">23 games</h2>
              </div>
              <div className="flex justify-between w-full">
                <h2 className="text-2xs sm:text-base font-thin">100 LP</h2>
                <h2 className="text-2xs sm:text-base font-thin ">52% winrate</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }