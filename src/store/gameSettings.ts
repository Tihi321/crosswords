import { writable } from "svelte/store";

import { EGameDifficulty, ETableSize, EZoomLevel } from "../constants";

export const gameSettings = writable({
  difficulty: EGameDifficulty.Normal,
  size: ETableSize.Medium,
  zoom: EZoomLevel.Normal,
  devSettings: false,
});
