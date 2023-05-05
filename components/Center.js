import { ChevronDownIcon, MenuAlt1Icon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistState, playlistIdState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";

function Center() {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playList, setPlayList] = useRecoilState(playlistState);

  let colors = [
    "from-indigo-500",
    "from-green-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
    "from-blue-500",
    "from-red-500",
  ];
  // later add change on playlist change
  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((res) => {
        setPlayList(res.body);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [spotifyApi, playlistId]);

  const openSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.remove("-translate-x-full");
  };
  const closeSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.add("-translate-x-full");
  };
  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide w-full">
      <header className="absolute flex items-center top-5 justify-between px-3 w-[-webkit-fill-available]">
        <div>
          <MenuAlt1Icon
            onClick={() => openSidebar()}
            className="w-10 h-10 md:hidden text-gray-100 hover:text-gray-300 transition-all"
          />
        </div>
        <div
          onClick={() => signOut()}
          className="cursor-pointer transition-all  bg-black rounded-full p-1 pr-2 flex items-center space-x-3 opacity-90 hover:opacity-80"
        >
          <img
            src={session?.user.image}
            className="rounded-full w-10 h-10"
            alt="User Image"
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`p-8 flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white `}
        onClick={() => closeSidebar()}
      >
        <img
          className="h-40 w-40 shadow-xl"
          src={playList?.images?.[0]?.url}
          alt=""
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playList?.name}
          </h1>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  );
}

export default Center;
