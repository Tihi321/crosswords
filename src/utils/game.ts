import flatten from "lodash/flatten";
import uniqBy from "lodash/uniqBy";
import map from "lodash/map";
import filter from "lodash/filter";
import isEqual from "lodash/isEqual";
import get from "lodash/get";
import every from "lodash/every";
import lowerCase from "lodash/lowerCase";
import { objectMap } from "tsl-utils";

import type { TCrosswordTable } from "./table"
import type { TDetails, TWordInputs, TWordsInfo } from "../types"

type TCrosswordArgs = {
  tableData: TCrosswordTable,
  wordDetails: TDetails,
  inputsState: TWordInputs,
  wordsInfo: TWordsInfo
}

type TCrosswordData = {
  successRowIndex: number[],
  successColumnIndex: number[],
  successWordsNames: string[],
  tableData: TCrosswordTable,
  wordDetails: TDetails
}

const getWordsData = (wordsInfo: TWordsInfo, key:string) => map(wordsInfo, wordInfo => get(wordInfo, [key]));

const getUniqueFlattenWordsData = (wordsInfo: TWordsInfo, key:string) => uniqBy(flatten(getWordsData(wordsInfo, key)));

const updateSuccessWords = (wordsInfo: TWordsInfo, inputsState: TWordInputs): TWordsInfo => objectMap(wordsInfo, values => {
  const updatedLettersWithSuccess = objectMap(get(values, ["letters"]), (values, key) => {
    return {
      ...values,
      success: isEqual(lowerCase(get(inputsState, [key, "value"])), lowerCase(get(values, ["char"])))
    }
  });

  return {
    ...values,
    letters: updatedLettersWithSuccess,
    success: every(updatedLettersWithSuccess, values => get(values, ["success"]))
  }
}) as TWordsInfo

export const getCrosswordData = ({tableData, wordDetails, inputsState, wordsInfo}: TCrosswordArgs): TCrosswordData => {
  const updatedWordsInfo = updateSuccessWords(wordsInfo, inputsState);
  const successWordsData = filter(updatedWordsInfo, wordsInfo => get(wordsInfo, ["success"]));

  return {
    tableData,
    successRowIndex: getUniqueFlattenWordsData(successWordsData, "rowIndex"),
    successColumnIndex: getUniqueFlattenWordsData(successWordsData, "columnIndex"),
    successWordsNames: getWordsData(successWordsData, "name"),
    wordDetails
  }
}