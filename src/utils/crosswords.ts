import filter from "lodash/filter"
import map from "lodash/map"
import isEmpty from "lodash/isEmpty"
import { rangeMap } from "tsl-utils";

import { getRandomRangeItemsAndRemove, getRandomArrayItemAndRemove } from "./array";
import { generateWordObject, addMatches, type TWordObject } from "./words";
import type { TPeopleNamesInfo, TWordApi } from "../types";

enum ECrosswordInfo {
  NumberOfRows = 30,
  NumberOfColumns = 30,
  EmptySpace = 0,
}

type TCrosswordWord = {
  name: string;
  detail: string;
  charIndex: number;
  end: boolean;
  start: boolean;
};

type TCrosswordSpace = {
  char: string | ECrosswordInfo.EmptySpace;
  top: TCrosswordWord | ECrosswordInfo.EmptySpace;
  left: TCrosswordWord | ECrosswordInfo.EmptySpace;
};

type TCrosswordRow = Array<TCrosswordSpace>
type TCrosswordData = Array<TCrosswordRow>

const emptySpace = {
  char: ECrosswordInfo.EmptySpace,
  top: ECrosswordInfo.EmptySpace,
  left: ECrosswordInfo.EmptySpace
};

const generateInitalHorizontalRows = (initialWords: TWordObject[]): { crosswordsArray: TCrosswordData; availableWords: TWordObject[]; } => {
  let availableWords = [...initialWords];
  let usedWords = [];
  let lastRowItems: TCrosswordRow = [];

  const crosswordsArray: TCrosswordData = rangeMap(ECrosswordInfo.NumberOfRows, rowsIndex => {
    const skippedRow = rowsIndex % 3 !== 0;
    let noWordsAvailable: boolean;
    let usedWord: TWordObject;
    let usedWordIndex: number;
  
    const rowItems: TCrosswordRow = rangeMap(ECrosswordInfo.NumberOfColumns, columnsIndex => {
      if (noWordsAvailable || skippedRow) {
        return emptySpace;
      }

      if(isEmpty(usedWord)) {
        const maxWordLength = ECrosswordInfo.NumberOfColumns - columnsIndex;
        const availableLengthWords = filter(availableWords, (word: TWordObject) => word.chars.length < maxWordLength);

        if (!isEmpty(availableLengthWords)) {
          usedWord = {...availableLengthWords[0]};
          availableWords = filter(availableWords, (word: TWordObject) => word.name !== usedWord.name);
          usedWords = [...usedWords, usedWord];
          usedWordIndex = 0;

          return {
            char: usedWord.chars.shift(),
            top: ECrosswordInfo.EmptySpace,
            left: columnsIndex !== 0 ? {
              name: usedWord.name,
              detail: usedWord.detail,
              charIndex: 0,
              end: false,
              start: true
            } : ECrosswordInfo.EmptySpace
          }
        } else {
          noWordsAvailable = true;

          return emptySpace;
        }
      } else {
        if (usedWord.chars.length > 0) {
          usedWordIndex = usedWordIndex + 1;
          return {
            char: usedWord.chars.shift(),
            top: ECrosswordInfo.EmptySpace,
            left: columnsIndex !== 0 ? {
              name: usedWord.name,
              detail: usedWord.detail,
              charIndex: usedWordIndex,
              end: usedWord.chars.length === 0,
              start: false
            } : ECrosswordInfo.EmptySpace
          }
        } else {
          usedWord = undefined;
          return emptySpace;
        }
      }
    });

    lastRowItems = rowItems;
    return rowItems;
  });

  return {
    crosswordsArray,
    availableWords,
  }

}

type TGenerateCrossword = {
  words: TWordApi,
  names: TPeopleNamesInfo

};

export const generateCrosswordsArray = ({words: initialWords, names}: TGenerateCrossword) => {
  const {
    randomItems: selectedWords
  } = getRandomRangeItemsAndRemove(initialWords, 300);

  const selectedWordsData = map(selectedWords, (word: string) => generateWordObject(word));
  const selectedWordsWithTotalMatches = addMatches(selectedWordsData);

  const { crosswordsArray, availableWords } = generateInitalHorizontalRows(selectedWordsWithTotalMatches);

  console.log("crosswordsArray", crosswordsArray);
  console.log("availableWords", availableWords);
  console.log("names", names);

  return {
    selectedWords: selectedWordsData,
  }
}