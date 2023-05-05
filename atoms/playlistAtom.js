import { atom } from "recoil";
import spotifyApi from "../lib/spotify";

export const playlistState = atom({ key: "playlistState", default: "null" });

export const playlistIdState = atom({
  key: "playlistId",
  default: null,
});
