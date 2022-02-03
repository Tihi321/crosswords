import map from "lodash/map"
import forEach from "lodash/forEach"
import shuffle from "lodash/shuffle"

import { getRandomRangeItemsAndRemove } from "./array";
import { generateWordObject} from "./words";
import type { TWordArray } from "../types";
import { addVerticalWords, ECrosswordInfo, generateInitalHorizontalRows, type TCrosswordItem, type TCrosswordItems, type TCrosswordTable, type TCrosswordWord } from "./table";

type TWordRowInfo = {
  rowIndex: number;
  itemIndex: number;
  word: TCrosswordWord
};
const generateWordRowInformation = ({rowIndex, itemIndex, word}): TWordRowInfo => ({
  rowIndex,
  itemIndex,
  word
})

const populateFilledWordsLetters = (crosswordsTable :TCrosswordTable): TCrosswordTable => {
  let topWords: TWordRowInfo[] = [];
  const updatedCrosswordTable = [...crosswordsTable];

  forEach(crosswordsTable, (rowData: TCrosswordItems, rowIndex: number) => {
    forEach(rowData, (item: TCrosswordItem, itemIndex: number) => {
      if(item.top !== ECrosswordInfo.EmptySpace) {
        topWords = [...topWords, generateWordRowInformation({
          rowIndex,
          itemIndex,
          word: item.top
        })]
      }
    }) 
  });

  forEach(topWords, (item: TWordRowInfo) => {
    const letters = item.word.name.split("");

    forEach(letters, (letter: string, index: number) => {
      updatedCrosswordTable[item.rowIndex + index][item.itemIndex] = {
       ...updatedCrosswordTable[item.rowIndex + index][item.itemIndex],
       char: letter
      }
    })
  })

  return updatedCrosswordTable;
}

const getWordsInformation = (crosswordsTable :TCrosswordTable): void => {
  let topWords: TWordRowInfo[] = [];
  let leftWords: TWordRowInfo[] = [];
  const updatedCrosswordTable = [...crosswordsTable];

  forEach(updatedCrosswordTable, (rowData: TCrosswordItems, rowIndex: number) => {
    forEach(rowData, (item: TCrosswordItem, itemIndex: number) => {
      if(item.top !== ECrosswordInfo.EmptySpace) {
        topWords = [...topWords, generateWordRowInformation({
          rowIndex,
          itemIndex,
          word: item.top
        })]
      }
      if(item.left !== ECrosswordInfo.EmptySpace) {
        leftWords = [...leftWords, generateWordRowInformation({
          rowIndex,
          itemIndex,
          word: item.left
        })]
      }
    }) 
  });

  console.log("topWords", topWords);
  console.log("leftWords", leftWords);

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

  const { crosswordsTable, availableWords } = generateInitalHorizontalRows(selectedWordsData);

  const availableWordsWithNames = shuffle([...availableWords, ...selectedNamesData]);
  const filledCrossWordTable = addVerticalWords({ availableWords: availableWordsWithNames, crosswordsTable });

  const populatedTable = populateFilledWordsLetters(filledCrossWordTable);
  getWordsInformation(populatedTable);

  return populatedTable
}