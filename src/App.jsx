import { useEffect } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import React from "react";
import "./App.css";

import { Header } from "./Header";
import { ProfileCard } from "./ProfileCard";
import { Grid, MobileGrid } from "./Grid";
import { Background } from "./Background";
import { useProfile } from "./ProfileContext.jsx";
import { handleAccountSearch } from "./apiHandler.js";
import logo from "./assets/logo.png";

// Homepage Component
function HomePage() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = React.useState("");

  const handleSearch = () => {
    const [playername, tagline] = searchInput.split("#");
    if (playername && tagline) {
      const playerDashTag = `${playername}-${tagline}`; // Format for the dynamic route
      navigate(`/player/${playerDashTag}`);
    } else {
      alert("Please enter a valid search (e.g., PlayerName#1234)");
    }
  };

  return (
    <div className="bg-background-purple min-h-screen relative overflow-hidden">
      <Background />
      <div className="relative z-[100]">
        <div>
          <Header />
        </div>
        <div className="flex relative items-center justify-center top-32 text-white text-6xl font-thin flex-col ">
          <img
            id="logo"
            src={logo}
            className="w-[62px]  hover:cursor-pointer shadow-2xl"
            alt="Olfolio Logo"
          />
          <div className="bg-neutral-600 hover:bg-stone-400 focus:bg-stone-400 border-none outline-none w-1/4 min-w-[300px] h-12 my-4 rounded-3xl flex items-center group transition-all ease-in-out hover:placeholder-white shadow-2xl">
            <input
              placeholder="AccountName[#tag]"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              type="text"
              className="w-full max-w-full flex h-full rounded-3xl bg-transparent border-none outline-none text-lg font-normal px-4 hover:placeholder:text-inherit"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Trigger search on Enter key
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 mx-2 stroke-neutral-400 group-hover:stroke-white hover:cursor-pointer stroke-2 flex-shrink-0"
              onClick={handleSearch} // Trigger search on click
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
          <div className="flex min-w-fit min-h-[400px] bg-neutral-600 rounded-2xl text-white text-center items-center flex-col p-4 w-1/4 shadow-2xl">
            <h3 className="text-4xl font-semibold mt-2">Documentation:</h3>
            <hr className="bg-white w-64 h-[2px]"></hr>
            <h4 className="mt-6 text-xl font-semibold">Frontend:</h4>
            <hr className="bg-white w-24 h-[2px]"></hr>
            <a
              className="mt-2 text-sm text-blue-300"
              href="https://github.com/kstaff123/lolfolio"
              target="_blank"
            >
              https://github.com/kstaff123/lolfolio
            </a>
            <p className="mt-2 text-lg">React with Vite & TailwindCSS</p>
            <h4 className="mt-6 text-xl font-semibold">Backend:</h4>
            <hr className="bg-white w-24 h-[2px]"></hr>
            <a
              className="mt-2 text-sm text-blue-300"
              href="https://github.com/kstaff123/lolfolio_backend/"
              target="_blank"
            >
              https://github.com/kstaff123/lolfolio_backend/
            </a>
            <p className="mt-2 text-lg">
              Node, Express, & Redis deployed with Railway
            </p>
            <h4 className="mt-6 text-xl font-semibold">Youtube Demo:</h4>
            <hr className="bg-white w-36 h-[2px]"></hr>
            <a
              className="mt-2 text-sm text-blue-300"
              href="https://www.youtube.com/watch?v=s3IdMOB_iow"
              target="_blank"
            >
              https://www.youtube.com/watch?v=s3IdMOB_iow
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Player Page Component
export function PlayerPage() {
  const { playerDashTag } = useParams(); // Extract "playerDashTag" from URL
  const { setLoading, setProfile, setCache, setMatchHistory } = useProfile();
  const [isLoading, setIsLoading] = React.useState(true); // Local loading state

  React.useEffect(() => {
    if (playerDashTag) {
      const [playername, tagline] = playerDashTag.split("-"); // Split by dash to get playername and tagline
      if (playername && tagline) {
        const searchInput = `${playername}#${tagline}`; // Convert back to expected format for API
        setLoading(true);
        handleAccountSearch(searchInput, {
          setProfile,
          setCache,
          setMatchHistory,
        })
          .catch((err) => console.error("Error fetching player data:", err))
          .finally(() => {
            setLoading(false);
            setIsLoading(false); // Update local loading state
          });
      }
    }
  }, [playerDashTag]);

  if (isLoading) {
    return (
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
    );
  }

  return (
    <div className="bg-background-purple min-h-screen relative overflow-hidden">
      <Background />
      <div className="relative z-[100]">
        <div className="max-[1280px]:hidden">
          <Header />
          <ProfileCard />
          <Grid />
        </div>
        <div className="min-[1280px]:hidden">
          <Header />
          <ProfileCard />
          <MobileGrid />
        </div>
      </div>
    </div>
  );
}

// App Component
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} /> {/* Homepage */}
      <Route path="/player/:playerDashTag" element={<PlayerPage />} />{" "}
      {/* Dynamic route */}
    </Routes>
  );
}

export default App;
