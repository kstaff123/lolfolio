import rivenicon from "./assets/rivenicon.png";

export function ProfileCard() {
    return (
      <main className="font-montserrat flex justify-center">
        <div className="min-[1600px]:w-[1526px] w-11/12 flex mt-10 items-center justify-center">
          <div className="relative bg-gradient-to-b from-yellow-500 to-yellow-800 sm:min-w-[84px] sm:w-[84px] sm:h-[84px] min-w-[84px] w-[84px] h-[84px] flex justify-center items-center drop-shadow-lg">
            <img
              src={rivenicon}
              className="sm:size-20 sm:min-w-20 size-20 min-h-20"
            ></img>
            <div className="text-white text-xs font-bold absolute px-1 bottom-[80px] sm:bottom-20 border-solid border-2 border-yellow-500 drop-shadow-lg bg-neutral-700">
              411
            </div>
          </div>
          <div className="w-full h-full sm:mx-4 ml-4 py-2 flex items-start flex-col">
            <div className="flex">
              <h1 className="text-white font-bold sm:text-3xl text-xl max-w-fit max-h-fit">
                Legends Fate
              </h1>
              <h3 className="text-white font-semibold max-w-fit pl-2 sm:text-xl text-md">
                #NA1
              </h3>
            </div>
            <div className="flex max-h-fit items-start">
              <h6 className="text-gray-300 text-sm sm:text-lg">Rank</h6>
              <h6 className="text-white font-bold pl-1 text-sm sm:text-lg">
                #249,289
              </h6>
              <h6 className="text-gray-300 pl-1 text-sm sm:text-lg">
                (top 27.7%)
              </h6>
            </div>
          </div>
        </div>
      </main>
    );
  }