import rivenicon from "./assets/rivenicon.png";
import { useProfile } from "./ProfileContext.jsx";

export function ProfileCard() {
  const { profile, loading } = useProfile();

  // If loading, show a loading spinner or message
  if (loading) {
    return (
      <main className="font-montserrat flex justify-center m-11">
        <div role="status">
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
      </main>
    );
  }

  // If profile is null or undefined, show a fallback
  if (!profile) {
    return (
      <main className="font-montserrat flex justify-center m-11">
        <p className="text-white">No profile loaded. Search for a summoner.</p>
      </main>
    );
  }

  return (
    <main className="font-montserrat flex justify-center">
      <div className="min-[1600px]:w-[1526px] w-11/12 flex mt-10 items-center justify-center">
        <div className="relative bg-gradient-to-b from-yellow-500 to-yellow-800 sm:min-w-[84px] sm:w-[84px] sm:h-[84px] min-w-[84px] w-[84px] h-[84px] flex justify-center items-center drop-shadow-lg">
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/14.23.1/img/profileicon/${profile.icon}.png`}
            className="sm:size-20 sm:min-w-20 size-20 min-h-20"
            onError={(e) => (e.target.src = rivenicon)}
          ></img>
          <div className="text-white text-xs font-bold absolute px-1 bottom-[80px] sm:bottom-20 border-solid border-2 border-yellow-500 drop-shadow-lg bg-neutral-700/90">
            {profile.level}
          </div>
        </div>
        <div className="w-full h-full sm:mx-4 ml-4 py-2 flex items-start flex-col">
          <div className="flex">
            <h1 className="text-white font-bold sm:text-3xl text-xl max-w-fit max-h-fit">
              {profile.name}
            </h1>
            <h3 className="text-white font-semibold max-w-fit pl-2 sm:text-xl text-md">
              #{profile.tagline}
            </h3>
          </div>
          <div className="flex max-h-fit items-start">
            <h6 className="text-gray-300 text-sm sm:text-lg">Rank</h6>
            <h6 className="text-white font-bold pl-1 text-sm sm:text-lg">
              {profile.numberrank || "Unranked"}
            </h6>
            <h6 className="text-gray-300 pl-1 text-sm sm:text-lg">
              {profile.rankpercentile ? `(top ${profile.rankpercentile}%)` : ""}
            </h6>
          </div>
        </div>
      </div>
    </main>
  );
}
