import type { EThemes } from "../constants";
import type { TCrosswordTable, TDetail } from "../types";
import type { TWordInputs } from "./word";

export type TSettingsStore = {
  endpoint?: string;
  useCustomEndpoint?: boolean;
  numberOfRows?: number;
  numberOfColumns?: number;
  wordLimit?: number;
  skipHorizontal?: number;
  skipVertical?: number;
};

export type TCrosswordStore = {
  table: TCrosswordTable;
  details: TDetail[];
  inputs: TWordInputs;
  words: any;
};

export type TThemeStore = {
  theme: EThemes;
};
