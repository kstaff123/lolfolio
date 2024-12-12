import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "./ProfileContext.jsx";
import { handleAccountSearch } from "./apiHandler.js"; // Import the new handler
import logo from "./assets/logo.png";

export function Header() {
  const { setLoading, setProfile, setCache, setMatchHistory } = useProfile();
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    setLoading(true);
    try {
      const [name, tagline] = searchInput.includes("#")
        ? searchInput.split("#")
        : [searchInput, "na1"]; // Default tagline to "na1" if not provided

      await handleAccountSearch(`${name}#${tagline}`, {
        setProfile,
        setCache,
        setMatchHistory,
      }); // Fetch data
      navigate(`/player/${name}-${tagline}`); // Navigate to new URL format
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="bg-neutral-700 flex h-20 font-montserrat w-full text-white font-extralight border-none drop-shadow-lg shadow-black">
      <div className="flex items-center mx-4 min-w-[300px]">
        <img
          id="logo"
          src={logo}
          className="size-6 h-7 max-[450px]:size-9 max-[450px]:mr-4 hover:cursor-pointer"
          alt="Olfolio Logo"
          onClick={() => navigate("/")} // Navigate to homepage on logo click
        />
        <h2
          className="text-3xl pr-3 max-[450px]:hidden hover:cursor-pointer"
          onClick={() => navigate("/")}
        >
          olfolio
        </h2>
        <div className="bg-neutral-600 hover:bg-stone-400 focus:bg-stone-400 border-none outline-none w-[400px] min-w-[100px] h-10 my-4 rounded-3xl flex items-center group transition-all ease-in-out hover:placeholder-white ">
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
      </div>
    </header>
  );
}
