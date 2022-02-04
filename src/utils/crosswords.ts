import map from "lodash/map"
import forEach from "lodash/forEach"
import shuffle from "lodash/shuffle"

import { getRandomRangeItemsAndRemove } from "./array";
import { generateWordObject} from "./words";
import type { TWordArray } from "../types";
import { addVerticalWords, ECrosswordInfo, ECrosswordType, generateInitalHorizontalRows, type TCrosswordItem, type TCrosswordItems, type TCrosswordTable, type TCrosswordWord } from "./table";

type TWordRowInfo = {
  rowIndex: number;
  itemIndex: number;
  word: TCrosswordWord;
  type: ECrosswordType;
};
const generateWordRowInformation = ({rowIndex, itemIndex, word, type}): TWordRowInfo => ({
  rowIndex,
  itemIndex,
  word,
  type
})

const populateFilledWordsLetters = (crosswordsTable :TCrosswordTable): TCrosswordTable => {
  let topWords: TWordRowInfo[] = [];
  let updatedCrosswordTable = [...crosswordsTable];

  forEach(crosswordsTable, (rowData: TCrosswordItems, rowIndex: number) => {
    forEach(rowData, (item: TCrosswordItem, itemIndex: number) => {
      if(item.top !== ECrosswordInfo.EmptySpace) {
        topWords = [...topWords, generateWordRowInformation({
          rowIndex,
          itemIndex,
          word: item.top,
          type: ECrosswordType.Top
        })]
      }
    }) 
  });

  forEach(topWords, ({ rowIndex, itemIndex, word }: TWordRowInfo) => {
    const letters = word.name.split("");

    forEach(letters, (letter: string, index: number) => {
      updatedCrosswordTable = map(updatedCrosswordTable, (rows: TCrosswordItems, rowInnerIndex: number) => {
        return map(rows, (item: TCrosswordItem, itemInnerIndex: number) => {
          const letterRowIndex = rowIndex + index;
          if (letterRowIndex === rowInnerIndex && itemIndex === itemInnerIndex) {
            return {
              ...item,
              char: letter
            }
          }
  
          return item;
        })
      });
    })
  })

  return updatedCrosswordTable;
}

const getWordsInformation = (crosswordsTable :TCrosswordTable): any => {
  let words: TWordRowInfo[] = [];
  let wordsData: any[] = [];
  let updatedCrosswordTable = [...crosswordsTable];
  let details: any = [];

  forEach(updatedCrosswordTable, (rowData: TCrosswordItems, rowIndex: number) => {
    forEach(rowData, (item: TCrosswordItem, itemIndex: number) => {
      if(item.top !== ECrosswordInfo.EmptySpace) {
        words = [...words, generateWordRowInformation({
          rowIndex,
          itemIndex,
          word: item.top,
          type: ECrosswordType.Top
        })]
      }
      if(item.left !== ECrosswordInfo.EmptySpace) {
        words = [...words, generateWordRowInformation({
          rowIndex,
          itemIndex,
          word: item.left,
          type: ECrosswordType.Left
        })]
      }
    }) 
  });

  forEach(words, ({ rowIndex, itemIndex, word, type }: TWordRowInfo, index: number) => {
    const wordIndex = index + 1;
  
    const detail = {
      id: word.name,
      index: wordIndex,
      word
    };

    wordsData = [...wordsData, {
      word,
      rowIndex,
      itemIndex
    }];
  
    details = [...details, detail];

    updatedCrosswordTable = map(updatedCrosswordTable, (rows: TCrosswordItems, rowInnerIndex: number) => {
      return map(rows, (item: TCrosswordItem, itemInnerIndex: number) => {
        if (rowIndex === rowInnerIndex && itemIndex === itemInnerIndex) {
          if (type === ECrosswordType.Top) {
            return {
              ...item,
              top: {
                ...item.top,
                index: wordIndex
              }, 
            }
          } else {
            return {
              ...item,
              left: {
                ...item.left,
                index: wordIndex
              }, 
            }
          }
        }

        return item;
      })
    });
  });

  return {
    details,
    wordsData,
    table: updatedCrosswordTable
  };

}

type TGenerateCrossword = {
  words: TWordArray,
  names: TWordArray,
};

export const generateCrosswordsTable = ({words: initialWords, names}: TGenerateCrossword): any => {
  const {
    randomItems: selectedWords
  } = getRandomRangeItemsAndRemove(initialWords, 300);

  const selectedWordsData = map(selectedWords, (word: string) => generateWordObject(word));
  const selectedNamesData = map(names, (word: string) => generateWordObject(word));

  const { crosswordsTable, availableWords } = generateInitalHorizontalRows(selectedWordsData);

  const availableWordsWithNames = shuffle([...availableWords, ...selectedNamesData]);
  const filledCrossWordTable = addVerticalWords({ availableWords: availableWordsWithNames, crosswordsTable });

  const populatedTable = populateFilledWordsLetters(filledCrossWordTable);
  const { table: tableWithDetails, details, wordsData } = getWordsInformation(populatedTable);

  return {
    table: tableWithDetails,
    details,
    wordsData
  }
}