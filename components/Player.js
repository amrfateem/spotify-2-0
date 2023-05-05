import { useSession } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";
import { isPlayingState, currentTrackIdState } from "../atoms/songAtom";
import { useRecoilState } from "recoil";
import { useCallback, useEffect, useState } from "react";
import useSongInfo from "../hooks/useSongInfo";
import {
  RewindIcon,
  SwitchHorizontalIcon,
  VolumeOffIcon,
} from "@heroicons/react/solid";
import { PauseIcon, PlayIcon } from "@heroicons/react/solid";
import {
  ReplyIcon,
  SwitchVerticalIcon,
  VolumeUpIcon,
} from "@heroicons/react/outline";
import { debounce } from "lodash";

function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);

  let buttonStyle =
    " cursor-pointer hover:scale-125 transition transform duration-100 ease-in-out";

  const songInfo = useSongInfo();

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        console.log(data);
        setCurrentTrackId(data.body?.item?.id);

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackIdState, spotifyApi, session]);

  // get spotify shuffle state and toggle it
  const handleShuffle = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.shuffle_state) {
        spotifyApi.setShuffle(false);
      } else {
        spotifyApi.setShuffle(true);
      }
    });
  };

  return (
    <div className="h-24 grid grid-cols-2 text-xs md:text-base px-2 md:px-3 text-white bg-gradient-to-b from-black to-gray-500">
      {/* Left */}
      <div className="flex items-center space-x-4">
        <img
          className="hidden md:inline h-10 w-10"
          src={songInfo?.album.images?.[0]?.url}
          alt=""
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>
      {/* Right */}
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon
          onClick={() => {
            handleShuffle();
          }}
          className={`w-5 h-5 ${buttonStyle} `}
        />
        {isPlaying ? (
          <PauseIcon
            onClick={() => {
              handlePlayPause();
            }}
            className={`w-10 h-10 ${buttonStyle}`}
          />
        ) : (
          <PlayIcon
            onClick={() => {
              handlePlayPause();
            }}
            className={`w-10 h-10 ${buttonStyle} `}
          />
        )}
        <ReplyIcon
          onClick={() => {
            spotifyApi.seek(0);
          }}
          className={`w-5 h-5 ${buttonStyle} `}
        ></ReplyIcon>
      </div>
    </div>
  );
}

export default Player;
