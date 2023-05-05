import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";

function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((res) => {
        setPlaylists(res.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div
      id="sidebar"
      className="
    overflow-y-scroll h-screen scrollbar-hide text-xm lg:text-sm sm:max-w-[12rem] lg:max-w-[15rem]
   absolute transition-all z-10 bg-black md:inline-flex text-gray-500 p-5  text-sm border-r border-gray-600 -translate-x-full"
    >
      <div className="space-y-4">
        {/* When needed */}

        {/* <button className="flex items-center space-x-2 hover:text-white transition-all">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white transition-all">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white transition-all">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-500" />

        <button className="flex items-center space-x-2 hover:text-white transition-all ">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create List</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white transition-all">
          <HeartIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white transition-all">
          <RssIcon className="h-5 w-5" />
          <p>Your Episodes</p>
        </button> 

        <hr className="border-t-[0.1px] border-gray-500" />*/}

        {playlists.map((playlist) => (
          <p
            onClick={() => {
              setPlaylistId(playlist.id);
            }}
            key={playlist.id}
            className="cursor-pointer hover:text-white transition-all"
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
