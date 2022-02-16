import type { EGameDifficulty, ETableSize, EThemes, EZoomLevel } from "../constants";
import type { TCrosswordTable, TDetail } from "../types";
import type { TWordInputs } from "./word";

export type TDevSettingsStore = {
  endpoint: string;
  useCustomEndpoint: boolean;
  numberOfRows: number;
  numberOfColumns: number;
  wordLimit: number;
  skipHorizontal: number;
  skipVertical: number;
};

export type TGameSettingsStore = {
  difficulty: EGameDifficulty;
  size: ETableSize;
  zoom: EZoomLevel;
};

export type TCrosswordStore = {
  table: TCrosswordTable;
  details: TDetail[];
  inputs: TWordInputs;
  words: any;
};

export type TGameStore = {
  started: boolean;
  retries: number;
};

export type TThemeStore = {
  theme: EThemes;
};
