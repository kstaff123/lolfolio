import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import rivensplashart from "./assets/rivensplashart.jpg";
import rivenicon from "./assets/rivenicon.png";
import logo from "./assets/logo.png";
import diamond from "./assets/diamond.png";

document.getElementById("rivenicon").src = rivenicon;
document.getElementById("logo").src = logo;
document.getElementById("diamond").src = diamond;

function App() {
  return (
    <div className="bg-background-purple min-h-screen relative overflow-hidden">
      {/* Background Art */}
      <div className="relative">
        <div
          className="absolute z-0 h-[24rem] w-[36rem] bg-cover  bg-center left-[50%] translate-x-[-50%] translate-y-[15%] "
          style={{
            backgroundImage: `radial-gradient(circle, 
        rgba(51, 50, 80, 0) 0%, 
        rgba(51, 50, 80, .7) 80%, 
        rgba(51, 50, 80, .8) 80%, 
        rgba(51, 50, 80, 1) 100%),
      linear-gradient(to top, rgba(51, 50, 80, .95), rgba(51, 50, 80, 0)),
      linear-gradient(to right, rgba(51, 50, 80, .95), rgba(51, 50, 80, 0)),
      linear-gradient(to bottom, rgba(51, 50, 80, .2), rgba(51, 50, 80, 0)),
      linear-gradient(to left, rgba(51, 50, 80, .95), rgba(51, 50, 80, 0)),
      url("${rivensplashart}")`,
            willChange: "transform",
            imageRendering: "pixelated",
          }}
        ></div>
      </div>
      {/* Gradient Overlay */}

      {/* Content */}
      <div className="relative z-[100]">
        <Header />

        <ProfileCard />
        <Grid />
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="bg-neutral-700 flex h-20 font-montserrat w-full text-white font-extralight border-none drop-shadow-lg shadow-black">
      <div className="flex items-center mx-4 min-w-[300px]">
        <img
          id="logo"
          src="src/assets/logo.png"
          className="size-6 h-7 max-[450px]:size-9 max-[450px]:mr-4 hover:cursor-pointer"
        ></img>
        <h2 className="text-3xl pr-3 max-[450px]:hidden hover:cursor-pointer">
          olfolio
        </h2>
        <div className="bg-neutral-600 hover:bg-stone-400 focus:bg-stone-400 border-none outline-none w-[400px] min-w-[100px] h-10 my-4 rounded-3xl flex items-center group transition-all ease-in-out ">
          <input
            type="text"
            className="w-full max-w-full flex h-full rounded-3xl bg-transparent border-none outline-none text-lg font-normal px-4"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 mx-2 stroke-neutral-400 group-hover:stroke-white hover:cursor-pointer  stroke-2 flex-shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </div>
    </header>
  );
}

function ProfileCard() {
  return (
    <main className="font-montserrat flex justify-center">
      <div className="sm:w-5/6 w-11/12 flex mt-10 items-center justify-center">
        <div className="relative bg-gradient-to-b from-yellow-500 to-yellow-800 sm:min-w-[84px] sm:w-[84px] sm:h-[84px] min-w-[84px] w-[84px] h-[84px] flex justify-center items-center drop-shadow-lg">
          <img
            id="rivenicon"
            src="src/assets/rivenicon.png"
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

function Grid() {
  return (
    <section className="sm:mt-8 mt-2 flex justify-center">
      <div className="grid xl:grid-cols-12 grid-cols-2  gap-4 xl:w-5/6 w-11/12  text-white ">
        <RankedSolo />

        <div className="xl:col-span-6 p-4 bg-neutral-700 rounded-xl ">2</div>
        <div className="xl:col-span-3 p-4 bg-neutral-700 rounded-xl ">3</div>
        <div></div>
      </div>
    </section>
  );
}

function RankedSolo() {
  return (
    <div className="xl:col-span-3 col-span-1 p-1 xl:p-3 bg-neutral-700 rounded-xl drop-shadow-xl">
      <div className="flex flex-col">
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
            src="/src/assets/diamond.png"
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

export default App;
