import rivenicon from "./assets/rivenicon.png";
import { useProfile } from "./ProfileContext.jsx";

export function ProfileCard() {
  const { profile, loading } = useProfile();

  // If loading, show a loading spinner or message
  if (loading) {
    return (
      <main className="font-montserrat flex justify-center m-11">
        <p className="text-white">Loading...</p>
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
          <div className="text-white text-xs font-bold absolute px-1 bottom-[80px] sm:bottom-20 border-solid border-2 border-yellow-500 drop-shadow-lg bg-neutral-700">
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
              {profile.rankpercentile
                ? `(top ${profile.rankpercentile}%)`
                : ""}
            </h6>
          </div>
        </div>
      </div>
    </main>
  );
}
