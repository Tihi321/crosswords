import every from "lodash/every";
import filter from "lodash/filter";
import flatten from "lodash/flatten";
import get from "lodash/get";
import isEqual from "lodash/isEqual";
import lowerCase from "lodash/lowerCase";
import map from "lodash/map";
import size from "lodash/size";
import uniqBy from "lodash/uniqBy";
import { objectMap } from "tsl-utils";

import type { TCrosswordTable, TDetails, TWordInputs, TWordsInfo } from "../types";

type TCrosswordArgs = {
  tableData: TCrosswordTable;
  wordDetails: TDetails;
  inputsState: TWordInputs;
  wordsInfo: TWordsInfo;
};

type TCrosswordData = {
  successRowIndex: number[];
  successColumnIndex: number[];
  successWordsNames: string[];
  tableData: TCrosswordTable;
  wordDetails: TDetails;
  allWordsSuccess: boolean;
};

const getWordsData = (wordsInfo: TWordsInfo, key: string) =>
  map(wordsInfo, (wordInfo) => get(wordInfo, [key]));

const getUniqueFlattenWordsData = (wordsInfo: TWordsInfo, key: string) =>
  uniqBy(flatten(getWordsData(wordsInfo, key)));

const updateSuccessWords = (wordsInfo: TWordsInfo, inputsState: TWordInputs): TWordsInfo =>
  objectMap(wordsInfo, (values) => {
    const updatedLettersWithSuccess = objectMap(get(values, ["letters"]), (value, key) => ({
      ...value,
      success: isEqual(
        lowerCase(get(inputsState, [key, "value"])),
        lowerCase(get(value, ["char"]))
      ),
    }));

    return {
      ...values,
      letters: updatedLettersWithSuccess,
      success: every(updatedLettersWithSuccess, (value) => get(value, ["success"])),
    };
  }) as TWordsInfo;

export const getCrosswordData = ({
  tableData,
  wordDetails,
  inputsState,
  wordsInfo,
}: TCrosswordArgs): TCrosswordData => {
  const updatedWordsInfo = updateSuccessWords(wordsInfo, inputsState);
  const successWordsData = filter(updatedWordsInfo, (wordInfo) => get(wordInfo, ["success"]));

  return {
    tableData,
    successRowIndex: getUniqueFlattenWordsData(successWordsData, "rowIndex"),
    successColumnIndex: getUniqueFlattenWordsData(successWordsData, "columnIndex"),
    successWordsNames: getWordsData(successWordsData, "name"),
    wordDetails,
    allWordsSuccess: isEqual(size(updatedWordsInfo), size(successWordsData)),
  };
};
