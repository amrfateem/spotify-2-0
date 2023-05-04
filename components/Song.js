import React from "react";
import useSpotify from "../hooks/useSpotify";
import { millistiMiniutesAndSeconds } from "../lib/time";
import { isPlayingState, currentTrackIdState } from "../atoms/songAtom";
import { useRecoilState } from "recoil";

function Song({ order, track }) {
  const spotifyApi = useSpotify();

  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);

  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(track.track.id);
    setIsPlaying(true);
    spotifyApi.play({ uris: [track.track.uri] });
  };
  return (
    <div
      onClick={playSong}
      className=" cursor-pointer grid grid-cols-2 text-gray-500 hover:text-gray-300 p-4 rounded-lg hover:bg-gray-800 transition-all"
    >
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>

        <img
          className="w-10 h-10"
          src={track?.track?.album?.images[0].url}
          alt=""
        />
        <div>
          <p className="w-36 lg:w-64 truncate text-white">{track.track.name}</p>
          <p className="w-40">{track.track.artists[0].name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-40 hidden md:inline">{track.track.album.name}</p>
        <p>{millistiMiniutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  );
}

export default Song;
