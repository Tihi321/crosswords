import type {
  EGameDifficulty,
  ESettingsModalRoutes,
  ETableSize,
  EThemes,
  EWordsLanguages,
  EZoomLevel,
} from "../constants";
import type { TCrosswordTable, TDetail } from "../types";
import type { TWordInputs } from "./word";

export type TDevSettingsStore = {
  enable: boolean;
  endpoint: string;
  useCustomEndpoint: boolean;
  numberOfRows: number;
  numberOfColumns: number;
  wordLimit: number;
  skipHorizontal: number;
  skipVertical: number;
};

export type TSettingsStore = {
  devSettings: boolean;
  settingsRoute: ESettingsModalRoutes;
};

export type TGameSettingsStore = {
  difficulty: EGameDifficulty;
  size: ETableSize;
  zoom: EZoomLevel;
  wordsLanguage: EWordsLanguages;
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
