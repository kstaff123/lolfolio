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
        <div className="flex relative items-center justify-center top-32 text-white text-6xl font-thin flex-col">
          <img
            id="logo"
            src={logo}
            className="w-[62px] max-[450px]:size-9 max-[450px]:mr-4 hover:cursor-pointer"
            alt="Olfolio Logo"
            onClick={() => navigate("/")} // Navigate to homepage on logo click
          />
          <div className="bg-neutral-600 hover:bg-stone-400 focus:bg-stone-400 border-none outline-none w-1/4 min-w-[300px] h-12 my-4 rounded-3xl flex items-center group transition-all ease-in-out hover:placeholder-white ">
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
          <div className="flex min-w-fit min-h-[400px] bg-neutral-600 rounded-2xl text-white text-center items-center flex-col p-4 w-1/4">
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
      <p className="text-white text-center mt-10">Loading player data...</p>
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
