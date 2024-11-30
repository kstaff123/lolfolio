import { RankedSolo } from "./RankedSolo";
import { MatchHistory } from "./MatchHistory";

export function Grid() {
    return (
      <section className="sm:mt-8 mt-2 flex justify-center">
        <div className="grid xl:grid-cols-12 grid-cols-2  gap-4 min-[1600px]:max-w-[1526px] w-11/12  text-white auto-rows-fr ">
          <RankedSolo />
          <MatchHistory />
          <RankedSolo />
        </div>
      </section>
    );
  }

  export function MobileGrid() {
    return (
      <section className="sm:mt-8 mt-2 flex justify-center ">
        <div className="grid xl:grid-cols-12 grid-cols-2  gap-4 xl:w-5/6 w-11/12  text-white">
          <RankedSolo />
          <RankedSolo />
          <MatchHistory />
        </div>
      </section>
    );
  }