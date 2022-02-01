import map from "lodash/map"
import isEmpty from "lodash/isEmpty"

import { getRandomRangeItemsAndRemove } from "./array";
import { generateWordObject, addMatches} from "./words";
import type { TWordArray } from "../types";
import { addVerticalWords, ECrosswordInfo, generateInitalHorizontalRows, type TCrosswordItem, type TCrosswordItems, type TCrosswordTable } from "./table";

type TPopulateVerticalWords = {
  crosswordsTable: TCrosswordTable
};

const populateFilledWordsLetters = ({ crosswordsTable } :TPopulateVerticalWords): TCrosswordTable => {
  const wordsPopulating: any = {};

  return map(crosswordsTable, (rowData: TCrosswordItems, rowIndex: number) => {
    const firstRowSkipped = rowIndex !== 0;
    return map(rowData, (item: TCrosswordItem, itemIndex: number) => {
      if (firstRowSkipped) {
        const previousRowItem = crosswordsTable[rowIndex - 1][itemIndex];

        if (previousRowItem.top !== ECrosswordInfo.EmptySpace) {
          if (isEmpty(wordsPopulating[previousRowItem.top.name])) {
            wordsPopulating[previousRowItem.top.name] = {
              ...previousRowItem.top,
              charIndex: 1,
            };

            return {
              ...item,
              char: previousRowItem.top.name[previousRowItem.top.charIndex]
            }

          } else if(wordsPopulating[previousRowItem.top.name].name.length - 1 === wordsPopulating[previousRowItem.top.name].charIndex) {
            wordsPopulating[previousRowItem.top.name] = {};

            return {
              ...item,
              char: previousRowItem.top.name[previousRowItem.top.charIndex],
              top: ECrosswordInfo.EmptySpace
            }
          } else {
            wordsPopulating[previousRowItem.top.name] = {
              ...previousRowItem.top,
              charIndex: wordsPopulating[previousRowItem.top.name].charIndex + 1,
            };

            return {
              ...item,
              char: previousRowItem.top.name[previousRowItem.top.charIndex]
            }
          }


        } else {
          return item;
        }
      } else {
        return item;
      }
    }) 
  })
}

type TGenerateCrossword = {
  words: TWordArray,
  names: TWordArray,
};

export const generateCrosswordsTable = ({words: initialWords, names}: TGenerateCrossword): TCrosswordTable => {
  const {
    randomItems: selectedWords
  } = getRandomRangeItemsAndRemove(initialWords, 300);

  const selectedWordsData = map(selectedWords, (word: string) => generateWordObject(word));
  const selectedNamesData = map(names, (word: string) => generateWordObject(word));
  const selectedWordsWithTotalMatches = addMatches(selectedWordsData);

  const { crosswordsTable, availableWords } = generateInitalHorizontalRows(selectedWordsWithTotalMatches);

  const availableWordsWithNames = [...availableWords, ...selectedNamesData];
  const filledCrossWordTable = addVerticalWords({ availableWords: availableWordsWithNames, crosswordsTable });

  const populatedTable = populateFilledWordsLetters({crosswordsTable: filledCrossWordTable});

  return populatedTable
}