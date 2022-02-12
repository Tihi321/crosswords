import type { ECrosswordInfo, ECrosswordType } from "../constants";
import type { TDetails, TWordsInfo } from "./word";

export type TCrosswordTableData = {
  details: TDetails;
  table: TCrosswordTable;
  words: TWordsInfo;
}


export type TCrosswordWord = {
  name: string;
  detail: string;
  index?: number;
  endIndex: number;
};

export type TCrosswordItem = {
  char: string | ECrosswordInfo.EmptySpace;
  show: boolean;
  top: TCrosswordWord | ECrosswordInfo.EmptySpace;
  left: TCrosswordWord | ECrosswordInfo.EmptySpace;
  leftEnd?: boolean;
  topEnd?: boolean;
};

export type TCrosswordItems = Array<TCrosswordItem>
export type TCrosswordTable = Array<TCrosswordItems>

export type TWordRowInfo = {
  rowIndex: number;
  itemIndex: number;
  word: TCrosswordWord;
  type: ECrosswordType;
};