import rivensplashart from "./assets/rivensplashart.jpg";
import rivenicon from "./assets/rivenicon.png";
import kindredIcon from "./assets/kindredicon.png";
import flash from "./assets/flash.png";
import conqueror from "./assets/conqueror.png";
import smite from "./assets/smite.png";
import domination from "./assets/domination.png";
import items from "./assets/items.png";
import players from "./assets/players.png";
import { useProfile } from "./ProfileContext.jsx";
import iron from "./assets/Ranked Emblems Latest/Rank=Iron.png";
import bronze from "./assets/Ranked Emblems Latest/Rank=Bronze.png";
import silver from "./assets/Ranked Emblems Latest/Rank=Silver.png";
import gold from "./assets/Ranked Emblems Latest/Rank=Gold.png";
import platinum from "./assets/Ranked Emblems Latest/Rank=Platinum.png";
import emerald from "./assets/Ranked Emblems Latest/Rank=Emerald.png";
import diamond from "./assets/Ranked Emblems Latest/Rank=Diamond.png";
import master from "./assets/Ranked Emblems Latest/Rank=Master.png";
import grandmaster from "./assets/Ranked Emblems Latest/Rank=Grandmaster.png";
import challenger from "./assets/Ranked Emblems Latest/Rank=Challenger.png";

export function RankedSolo() {
  const { profile } = useProfile();
  console.log("RankedSolo Profile Data:", profile);
  const rankKey = profile?.soloduorank?.split(" ")[0]?.toLowerCase(); // Get rank (e.g., "Diamond")
  const rankicon = {
    iron,
    bronze,
    silver,
    gold,
    platinum,
    emerald,
    diamond,
    master,
    grandmaster,
    challenger,
  }[rankKey];

  if (!profile || !profile.soloduorank) {
    return (
      <div className="xl:col-span-3 col-span-1 p-1 xl:p-3 bg-neutral-700/90 rounded-xl drop-shadow-xl h-fit">
        <div role="status" className="flex justify-center">
          <svg
            aria-hidden="true"
            class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="xl:col-span-3 col-span-1 p-1 xl:p-3 bg-neutral-700/90 rounded-xl drop-shadow-xl h-fit">
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
            src={rankicon}
            className=" h-7 sm:h-11 drop-shadow-md pl-1"
          ></img>
          <div className="flex flex-col ml-2 w-full">
            <div className="flex justify-between w-full">
              <h2 className="text-xs sm:text-base font-semibold p-0">
                {profile.soloduorank}
              </h2>
              <h2 className="text-2xs sm:text-base font-light text-neutral-200">
                {profile.soloduogames !== undefined &&
                  `${profile.soloduogames} games`}
              </h2>
            </div>
            <div className="flex justify-between w-full">
              <h2 className="text-2xs sm:text-base font-light text-neutral-200">
                {profile.soloduolp !== undefined && `${profile.soloduolp} LP`}
              </h2>
              <h2 className="text-2xs sm:text-base font-light text-neutral-200">
                {profile.soloduowinrate !== undefined &&
                  `${profile.soloduowinrate}% winrate`}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
