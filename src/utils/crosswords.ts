import filter from "lodash/filter"
import map from "lodash/map"
import isEmpty from "lodash/isEmpty"
import { rangeMap } from "tsl-utils";

import { getRandomRangeItemsAndRemove, getRandomArrayItemAndRemove } from "./array";
import { generateWordObject, addMatches, type TWordObject } from "./words";

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

const generateArrayRows = (initialWords: TWordObject[]): void => {
  let availableWords = [...initialWords];
  let usedWords = [];
  let lastRowItems: TCrosswordRow = [];

  const crosswordsArray: TCrosswordData = rangeMap(ECrosswordInfo.NumberOfRows, rowsIndex => {
    const isFirstRow = rowsIndex === 0;
    let noWordsAvailable: boolean;
    let usedWord: TWordObject;
  
    const rowItems: TCrosswordRow = rangeMap(ECrosswordInfo.NumberOfColumns, columnsIndex => {
      const isfirstColumn = columnsIndex === 0;

      if (noWordsAvailable) {
        return emptySpace;
      }

      if(isEmpty(usedWord)) {
        const maxWordLength = ECrosswordInfo.NumberOfColumns - columnsIndex;
        const availableLengthWords = filter(availableWords, (word: TWordObject) => word.lenght < maxWordLength);

        if (!isEmpty(availableLengthWords)) {
          usedWord = {...availableLengthWords[0]};
          availableWords = filter(availableWords, (word: TWordObject) => word.name !== usedWord.name);
          usedWords = [...usedWords, usedWord]

          return {
            char: usedWord.chars.pop(),
            top: ECrosswordInfo.EmptySpace,
            left: columnsIndex !== 0 ? {
              name: usedWord.name,
              detail: usedWord.detail,
              charIndex: 0,
              end: false
            } : ECrosswordInfo.EmptySpace
          }
        } else {
          noWordsAvailable = true;

          return emptySpace;
        }
      }
    });

    lastRowItems = rowItems;
    return rowItems;
  });

}

export const generateCrosswordsArray = (initialWords: Array<string>) => {
  const {
    randomItems: selectedWords
  } = getRandomRangeItemsAndRemove(initialWords, 300);

  const selectedWordsData = map(selectedWords, (word: string) => generateWordObject(word));
  const selectedWordsWithTotalMatches = addMatches(selectedWordsData);

  generateArrayRows(selectedWordsWithTotalMatches);

  return {
    selectedWords: selectedWordsData,
  }
}