import filter from "lodash/filter"
import map from "lodash/map"
import forEach from "lodash/forEach"
import isEmpty from "lodash/isEmpty"
import { rangeMap } from "tsl-utils";

import { getRandomArrayIndex } from "./array";
import type { TWordObject } from "./../types";

type TAddWords = {
  availableWords: TWordObject[],
  crosswordsTable: TCrosswordTable
};

type TAddWordsTable = {
  availableWords: TWordObject[],
  crosswordsTable: TCrosswordTable
};

export enum ECrosswordInfo {
  NumberOfRows = 15,
  NumberOfColumns = 25,
  EmptySpace = 0,
}

export enum ECrosswordType {
  Left = "Left",
  Top = "Top"
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

const emptySpace = {
  char: ECrosswordInfo.EmptySpace,
  top: ECrosswordInfo.EmptySpace,
  left: ECrosswordInfo.EmptySpace
};

const everySecond = (index: number) => index % 2 !== 0;
const everyThird = (index: number) => index % 3 !== 0;

export const generateEmptyInitialTable = (): TCrosswordTable => rangeMap(ECrosswordInfo.NumberOfRows, () => rangeMap(ECrosswordInfo.NumberOfRows, () => emptySpace));

export const addHorizontalWords = ({ availableWords, crosswordsTable } :TAddWords): TAddWordsTable => {
  let usedAvailableWords = [...availableWords];

  const updatedCrossword = map(crosswordsTable, (rowData: TCrosswordItems, rowIndex: number) => {
    const skippedRow = everyThird(rowIndex);
    const numberOfItems = rowData.length;
    let noAvailableWords: boolean = false;
    let usedwordLastIndex: number;

    if (skippedRow) {
      return rowData;
    }
  
    return map(rowData, (item: TCrosswordItem, itemIndex: number) => {
      if (usedwordLastIndex && itemIndex < usedwordLastIndex + 1 || noAvailableWords) {
        return item;
      }

      const maxWordLength = numberOfItems - itemIndex;
      const availableLengthWords = filter(availableWords, (word: TWordObject) => word.chars.length < maxWordLength);
      if (!isEmpty(availableLengthWords)) {
        const usedWord :TWordObject = availableLengthWords[getRandomArrayIndex(availableLengthWords)];
        usedAvailableWords = filter(usedAvailableWords, (word: TWordObject) => word.name !== usedWord.name);
        const usedWordLength = usedWord.name.length;
        usedwordLastIndex = itemIndex + usedWordLength;

        return {
          ...item,
          left: {
            name: usedWord.name,
            detail: usedWord.detail,
            endIndex: itemIndex + usedWord.name.length
          }
        }
        
      } else {
        noAvailableWords = true;
        return item;
      }
    })
  })

  return {
    crosswordsTable: updatedCrossword,
    availableWords: usedAvailableWords
  };
}

export const addVerticalWords = ({ availableWords, crosswordsTable } :TAddWords): TAddWordsTable => {
  let usedAvailableWords = [...availableWords];

  const updatedCrossword = map(crosswordsTable, (rowData: TCrosswordItems, rowIndex: number) => {
    const isFirstRow = rowIndex === 0;
  
    return map(rowData, (item: TCrosswordItem, itemIndex: number) => {
      const skippedItem = everySecond(rowIndex);
      const wordCanBeAdded = [];

      if(item.char !== ECrosswordInfo.EmptySpace && !skippedItem) {
        if (isFirstRow || crosswordsTable[rowIndex - 1][itemIndex].char === ECrosswordInfo.EmptySpace) {
          const wordsWithSameFirstLetter = filter(usedAvailableWords, (word: TWordObject) => word.chars[0] === item.char);

          forEach(wordsWithSameFirstLetter, (word: TWordObject) => {
            for (let index = 0; index < word.length; index++) {
              if (!crosswordsTable[rowIndex + index] || crosswordsTable[rowIndex + index][itemIndex].char !== ECrosswordInfo.EmptySpace && word.chars[index] !== crosswordsTable[rowIndex + index][itemIndex].char) {
                break;
              }

              if (index === word.length - 1) {
                const outOfBottomBoundry = !crosswordsTable[rowIndex + index + 1];
                const rowBelowEmpty = crosswordsTable[rowIndex + index + 1] && crosswordsTable[rowIndex + index + 1][itemIndex].char === ECrosswordInfo.EmptySpace;
  
                if (outOfBottomBoundry || rowBelowEmpty) {
                  wordCanBeAdded.push(word);
                }
              }
            }
          });
        }
      }

      if (!isEmpty(wordCanBeAdded)) {
        const usedWord :TWordObject = wordCanBeAdded[getRandomArrayIndex(wordCanBeAdded)];
        usedAvailableWords = filter(usedAvailableWords, (word: TWordObject) => word.name !== usedWord.name);

        return {
          ...item,
          top: {
            name: usedWord.name,
            detail: usedWord.detail,
            endIndex: rowIndex + usedWord.name.length
          }
        }
      } else {
        return item;
      }
    })
  })

  return {
    crosswordsTable: updatedCrossword,
    availableWords: usedAvailableWords
  };
}
