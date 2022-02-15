import { writable } from "svelte/store";

import { EGameDifficulty } from "../constants";

export const gameSettings = writable({
  difficulty: EGameDifficulty.Normal,
});
