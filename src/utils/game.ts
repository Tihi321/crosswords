import every from "lodash/every";
import filter from "lodash/filter";
import get from "lodash/get";
import includes from "lodash/includes";
import isEmpty from "lodash/isEmpty";
import isEqual from "lodash/isEqual";
import lowerCase from "lodash/lowerCase";
import map from "lodash/map";
import reduce from "lodash/reduce";
import size from "lodash/size";
import { objectFilter, objectMap } from "tsl-utils";

import type {
  TCrosswordTable,
  TDetails,
  TLettersInfo,
  TWordInfo,
  TWordInputs,
  TWordsInfo,
} from "../types";

type TCrosswordArgs = {
  tableData: TCrosswordTable;
  wordDetails: TDetails;
  inputsState: TWordInputs;
  wordsInfo: TWordsInfo;
};

type TCrosswordData = {
  lettersState: TLettersInfo;
  successWordsNames: string[];
  tableData: TCrosswordTable;
  wordDetails: TDetails;
  allWordsUsed: boolean;
  allWordsSuccess: boolean;
};

const getWordsData = (wordsInfo: TWordsInfo, key: string) =>
  map(wordsInfo, (wordInfo) => get(wordInfo, [key]));

const getLettersState = (wordsInfo: TWordInfo[]): TLettersInfo =>
  reduce(
    map(wordsInfo, (wordInfo) => get(wordInfo, ["letters"])),
    (result, value) => ({
      ...result,
      ...value,
    })
  );

const updateWordsData = (wordsInfo: TWordsInfo, inputsState: TWordInputs): TWordsInfo =>
  objectMap(wordsInfo, (values) => {
    const word = get(values, ["name"]);

    const updatedLetters = objectMap(get(values, ["letters"]), (value, key) => {
      const inputUsed = !isEmpty(get(inputsState, [key, "value"]));

      return {
        ...value,
        shownChar: inputUsed ? get(inputsState, [key, "value"]) : get(value, ["char"]),
        used: inputUsed,
        included: inputUsed && includes(word, lowerCase(get(inputsState, [key, "value"]))),
        success: isEqual(lowerCase(get(inputsState, [key, "value"])), get(value, ["char"])),
      };
    });

    return {
      ...values,
      letters: updatedLetters,
      used: every(updatedLetters, (value) => get(value, ["used"])),
      success: every(updatedLetters, (value) => get(value, ["success"])),
    };
  }) as TWordsInfo;

export const getCrosswordData = ({
  tableData,
  wordDetails,
  inputsState,
  wordsInfo,
}: TCrosswordArgs): TCrosswordData => {
  const updatedWordsInfo = updateWordsData(wordsInfo, inputsState);
  const successWordsData = filter(updatedWordsInfo, (wordInfo) => get(wordInfo, ["success"]));
  const usedWordsData = filter(updatedWordsInfo, (wordInfo) => get(wordInfo, ["used"]));

  const updatedWordsNotEmpty = !isEqual(size(updatedWordsInfo), 0);

  return {
    tableData,
    wordDetails,
    lettersState: getLettersState(usedWordsData),
    successWordsNames: getWordsData(successWordsData, "name"),
    allWordsUsed: updatedWordsNotEmpty && isEqual(size(updatedWordsInfo), size(usedWordsData)),
    allWordsSuccess:
      updatedWordsNotEmpty && isEqual(size(updatedWordsInfo), size(successWordsData)),
  };
};

export const getSuccessWordsData = (
  wordsInfo: TWordsInfo,
  inputsState: TWordInputs
): TWordInfo[] => {
  const updatedWordsInfo = updateWordsData(wordsInfo, inputsState);

  return filter(updatedWordsInfo, (wordInfo) => get(wordInfo, ["success"]));
};

export const getSuccessFilledInputState = (
  wordsInfo: TWordsInfo,
  inputsState: TWordInputs
): TWordInputs => {
  const successWordsData = getSuccessWordsData(wordsInfo, inputsState);
  const successWordsLetterState = getLettersState(successWordsData);

  return objectFilter(
    inputsState,
    (_, key) => !isEmpty(get(successWordsLetterState, [key]))
  ) as TWordInputs;
};
