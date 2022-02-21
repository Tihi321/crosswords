import { writable } from "svelte/store";

import { EGameDifficulty, ETableSize, EWordsLanguages, EZoomLevel } from "../constants";

export const gameSettings = writable({
  difficulty: EGameDifficulty.Normal,
  size: ETableSize.Medium,
  zoom: EZoomLevel.Normal,
  wordsLanguage: EWordsLanguages.English,
});
