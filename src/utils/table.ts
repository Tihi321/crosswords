import filter from "lodash/filter";
import forEach from "lodash/forEach";
import get from "lodash/get";
import includes from "lodash/includes";
import isEmpty from "lodash/isEmpty";
import map from "lodash/map";
import { rangeMap } from "tsl-utils";

import { ECrosswordInfo } from "../constants";
import type { TCrosswordItem, TCrosswordItems, TCrosswordTable, TWordObject } from "./../types";
import { getRandomArrayIndex } from "./array";

type TAddWords = {
  availableWords: TWordObject[];
  crosswordsTable: TCrosswordTable;
  skip: number;
};

type TAddWordsTable = {
  availableWords: TWordObject[];
  crosswordsTable: TCrosswordTable;
};

const emptySpace = {
  char: ECrosswordInfo.EmptySpace,
  top: ECrosswordInfo.EmptySpace,
  left: ECrosswordInfo.EmptySpace,
};

const skipItem = (index: number, skip: number) => index % skip !== 0;

export const generateEmptyInitialTable = (
  numberOfRows: number,
  numberOfColumns: number
): TCrosswordTable => rangeMap(numberOfRows, () => rangeMap(numberOfColumns, () => emptySpace));

export const addHorizontalWords = ({
  availableWords,
  crosswordsTable,
  skip,
}: TAddWords): TAddWordsTable => {
  let usedWordsNames = [];

  const updatedCrossword = map(crosswordsTable, (rowData: TCrosswordItems, rowIndex: number) => {
    const skippedRow = skipItem(rowIndex, skip);
    const numberOfItems = rowData.length;
    let noAvailableWords: boolean = false;
    let usedwordLastIndex: number;

    if (skippedRow) {
      return rowData;
    }

    return map(rowData, (item: TCrosswordItem, itemIndex: number) => {
      if ((usedwordLastIndex && itemIndex < usedwordLastIndex + 1) || noAvailableWords) {
        return item;
      }

      const maxWordLength = numberOfItems - itemIndex;

      const availableLengthWords = filter(
        availableWords,
        (word: TWordObject) =>
          word.chars.length < maxWordLength && !includes(usedWordsNames, word.name)
      );

      if (!isEmpty(availableLengthWords)) {
        const usedWord: TWordObject = get(availableLengthWords, [
          getRandomArrayIndex(availableLengthWords),
        ]);

        usedWordsNames = [...usedWordsNames, usedWord.name];

        const usedWordLength = usedWord.name.length;
        usedwordLastIndex = itemIndex + usedWordLength;

        return {
          ...item,
          left: {
            name: usedWord.name,
            detail: usedWord.detail,
            endIndex: itemIndex + usedWord.name.length,
          },
        };
      } else {
        noAvailableWords = true;
        return item;
      }
    });
  });

  return {
    crosswordsTable: updatedCrossword,
    availableWords: filter(availableWords, (word) => !includes(usedWordsNames, word.name)),
  };
};

export const addVerticalWords = ({
  availableWords,
  crosswordsTable,
  skip,
}: TAddWords): TAddWordsTable => {
  let usedWordsNames = [];

  const updatedCrossword = map(crosswordsTable, (rowData: TCrosswordItems, rowIndex: number) => {
    const isFirstRow = rowIndex === 0;

    return map(rowData, (item: TCrosswordItem, itemIndex: number) => {
      const skippedItem = skipItem(rowIndex, skip);
      const wordCanBeAdded = [];

      if (item.char !== ECrosswordInfo.EmptySpace && !skippedItem) {
        if (
          isFirstRow ||
          crosswordsTable[rowIndex - 1][itemIndex].char === ECrosswordInfo.EmptySpace
        ) {
          const wordsWithSameFirstLetter = filter(
            availableWords,
            (word: TWordObject) =>
              word.chars[0] === item.char && !includes(usedWordsNames, word.name)
          );

          forEach(wordsWithSameFirstLetter, (word: TWordObject) => {
            for (let index = 0; index < word.length; index++) {
              if (
                !crosswordsTable[rowIndex + index] ||
                (crosswordsTable[rowIndex + index][itemIndex].char !== ECrosswordInfo.EmptySpace &&
                  word.chars[index] !== crosswordsTable[rowIndex + index][itemIndex].char)
              ) {
                break;
              }

              if (index === word.length - 1) {
                const outOfBottomBoundry = !crosswordsTable[rowIndex + index + 1];
                const rowBelowEmpty =
                  crosswordsTable[rowIndex + index + 1] &&
                  crosswordsTable[rowIndex + index + 1][itemIndex].char ===
                    ECrosswordInfo.EmptySpace;

                if (outOfBottomBoundry || rowBelowEmpty) {
                  wordCanBeAdded.push(word);
                }
              }
            }
          });
        }
      }

      if (!isEmpty(wordCanBeAdded)) {
        const usedWord: TWordObject = get(wordCanBeAdded, [getRandomArrayIndex(wordCanBeAdded)]);

        usedWordsNames = [...usedWordsNames, usedWord.name];

        return {
          ...item,
          top: {
            name: usedWord.name,
            detail: usedWord.detail,
            endIndex: rowIndex + usedWord.name.length,
          },
        };
      } else {
        return item;
      }
    });
  });

  return {
    crosswordsTable: updatedCrossword,
    availableWords: filter(availableWords, (word) => !includes(usedWordsNames, word.name)),
  };
};
