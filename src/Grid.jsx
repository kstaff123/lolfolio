import { RankedSolo } from "./RankedSolo";
import { MatchHistory } from "./MatchHistory";
import { RankedFlex } from "./RankedFlex";
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
export function Grid() {
    return (
      <section className="sm:mt-8 mt-2 flex justify-center">
        <div className="grid xl:grid-cols-12 grid-cols-2  gap-4 min-[1600px]:max-w-[1526px] w-11/12  text-white auto-rows-fr ">
          <RankedSolo />
          <MatchHistory />
          <RankedFlex />
        </div>
      </section>
    );
  }

  export function MobileGrid() {
    return (
      <section className="sm:mt-8 mt-2 flex justify-center ">
        <div className="grid xl:grid-cols-12 grid-cols-2  gap-4 xl:w-5/6 w-11/12  text-white">
          <RankedSolo />
          <RankedFlex />
          <MatchHistory />
        </div>
      </section>
    );
  }