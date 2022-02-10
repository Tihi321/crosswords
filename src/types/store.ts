import type { TDetail } from "../types";
import type { TCrosswordTable } from "../utils/table";
import type { TWordInputs } from "./word";
import type { EThemes } from "../constants";

export type TSettingsStore = {
  endpoint: string,
  numberOfRows: number,
  numberOfColumns: number,
  wordLimit: number,
  skipHorizontal: number,
  skipVertical: number,
}

export type TCrosswordStore = {
  table: TCrosswordTable,
  details: TDetail[],
  inputs: TWordInputs,
  words: any,
}

export type TThemeStore = {
  theme: EThemes,
}