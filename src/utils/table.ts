import filter from "lodash/filter"
import map from "lodash/map"
import forEach from "lodash/forEach"
import isEmpty from "lodash/isEmpty"
import { rangeMap } from "tsl-utils";

import { getRandomArrayIndex } from "./array";
import type { TWordObject } from "./../types";


export enum ECrosswordInfo {
  NumberOfRows = 15,
  NumberOfColumns = 25,
  EmptySpace = 0,
}

export type TCrosswordWord = {
  name: string;
  detail: string;
};

export type TCrosswordItem = {
  char: string | ECrosswordInfo.EmptySpace;
  top: TCrosswordWord | ECrosswordInfo.EmptySpace;
  left: TCrosswordWord | ECrosswordInfo.EmptySpace;
};

export type TCrosswordItems = Array<TCrosswordItem>
export type TCrosswordTable = Array<TCrosswordItems>

const emptySpace = {
  char: ECrosswordInfo.EmptySpace,
  top: ECrosswordInfo.EmptySpace,
  left: ECrosswordInfo.EmptySpace
};

export const generateInitalHorizontalRows = (initialWords: TWordObject[]): { crosswordsTable: TCrosswordTable; availableWords: TWordObject[]; } => {
  let availableWords = [...initialWords];
  let usedWords = [];

  const crosswordsTable: TCrosswordTable = rangeMap(ECrosswordInfo.NumberOfRows, rowsIndex => {
    const skippedRow = rowsIndex % 3 !== 0;
    let noWordsAvailable: boolean;
    let usedWord: TWordObject;
    let usedWordIndex: number;
  
    const rowItems: TCrosswordItems = rangeMap(ECrosswordInfo.NumberOfColumns, columnsIndex => {
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
            left: {
              name: usedWord.name,
              detail: usedWord.detail,
            }
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
            left: ECrosswordInfo.EmptySpace
          }
        } else {
          usedWord = undefined;
          return emptySpace;
        }
      }
    });

    return rowItems;
  });

  return {
    crosswordsTable,
    availableWords,
  }

}

type TAddVerticalWords = {
  availableWords: TWordObject[],
  crosswordsTable: TCrosswordTable
};

export const addVerticalWords = ({ availableWords, crosswordsTable } :TAddVerticalWords): TCrosswordTable => {
  let usedAvailableWords = [...availableWords];

  const updatedCrossword = map(crosswordsTable, (rowData: TCrosswordItems, rowIndex: number) => {
    const isFirstRow = rowIndex === 0;
  
    return map(rowData, (item: TCrosswordItem, itemIndex: number) => {
      const skippedItem = itemIndex % 2 !== 0;
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
          }
        }
      } else {
        return item;
      }
    })
  })

  return updatedCrossword;
}
