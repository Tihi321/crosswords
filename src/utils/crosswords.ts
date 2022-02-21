import forEach from "lodash/forEach";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import isEqual from "lodash/isEqual";
import map from "lodash/map";

import { ECrosswordInfo, ECrosswordType } from "../constants";
import type {
  TCrosswordItem,
  TCrosswordItems,
  TCrosswordTable,
  TCrosswordTableData,
  TFocusChar,
  TLettersInfo,
  TSettingOptions,
  TWordArray,
  TWordRowInfo,
} from "../types";
import { getRandomRangeItemsAndRemove } from "./array";
import {
  generateWordRowInformation,
  populateHorizontalTableLetters,
  populateVerticalTableLetters,
} from "./populate";
import { addHorizontalWords, addVerticalWords, generateEmptyInitialTable } from "./table";
import {
  generateIndexKey,
  generateWordObject,
  getWordsDetails,
  getWordsInformation,
} from "./words";

const getWordsTableData = (crosswordsTable: TCrosswordTable): TCrosswordTableData => {
  let words: TWordRowInfo[] = [];
  let updatedCrosswordTable = [...crosswordsTable];

  forEach(updatedCrosswordTable, (rowData: TCrosswordItems, rowIndex: number) => {
    forEach(rowData, (item: TCrosswordItem, itemIndex: number) => {
      if (item.top !== ECrosswordInfo.EmptySpace) {
        words = [
          ...words,
          generateWordRowInformation({
            rowIndex,
            itemIndex,
            word: item.top,
            type: ECrosswordType.Top,
          }),
        ];
      }
      if (item.left !== ECrosswordInfo.EmptySpace) {
        words = [
          ...words,
          generateWordRowInformation({
            rowIndex,
            itemIndex,
            word: item.left,
            type: ECrosswordType.Left,
          }),
        ];
      }
    });
  });

  forEach(words, ({ rowIndex, itemIndex, type }: TWordRowInfo, index: number) => {
    const wordIndex = index + 1;

    updatedCrosswordTable = map(
      updatedCrosswordTable,
      (rows: TCrosswordItems, rowInnerIndex: number) =>
        map(rows, (item: TCrosswordItem, itemInnerIndex: number) => {
          if (rowIndex === rowInnerIndex && itemIndex === itemInnerIndex) {
            if (type === ECrosswordType.Top) {
              return {
                ...item,
                top: {
                  ...item.top,
                  index: wordIndex,
                },
              };
            } else {
              return {
                ...item,
                left: {
                  ...item.left,
                  index: wordIndex,
                },
              };
            }
          }

          return item;
        })
    );
  });

  return {
    details: getWordsDetails(words),
    words: getWordsInformation(words),
    table: updatedCrosswordTable,
  };
};

export const checkIfInputExist = (item: TCrosswordItem) =>
  item && item.char && typeof item.char === "string" && !item.show;

export const addCharInfo = (
  tableData: TCrosswordTable,
  lettersState: TLettersInfo,
  focusItem: TFocusChar
): TCrosswordTable => {
  const updatedData = map(tableData, (rowData: TCrosswordItems, rowIndex: number) =>
    map(rowData, (itemData: TCrosswordItem, columnIndex: number) => ({
      ...itemData,
      shownChar: get(lettersState, [generateIndexKey(rowIndex, columnIndex), "shownChar"]),
      success: get(lettersState, [generateIndexKey(rowIndex, columnIndex), "success"], false),
      included: get(lettersState, [generateIndexKey(rowIndex, columnIndex), "included"], false),
      show: !isEmpty(get(lettersState, [generateIndexKey(rowIndex, columnIndex)])),
      focus:
        isEqual(get(focusItem, ["rowIndex"]), rowIndex) &&
        isEqual(get(focusItem, ["itemIndex"]), columnIndex),
    }))
  );

  return updatedData;
};

type TGenerateCrossword = {
  words: TWordArray;
  settings: TSettingOptions;
};

export const generateCrosswordsTable = ({
  words: initialWords,
  settings: { numberOfRows, numberOfColumns, wordLimit, skipHorizontal, skipVertical },
}: TGenerateCrossword): TCrosswordTableData => {
  const { randomItems: selectedWords } = getRandomRangeItemsAndRemove(initialWords, wordLimit);

  const selectedWordsData = map(selectedWords, (word: string) => generateWordObject(word));

  const emptyTable = generateEmptyInitialTable(numberOfRows, numberOfColumns);

  const { crosswordsTable: horizontalWordTable, availableWords: availableHorizontalWords } =
    addHorizontalWords({
      availableWords: selectedWordsData,
      crosswordsTable: emptyTable,
      skip: skipHorizontal,
    });

  const populatedHorizontalTable = populateHorizontalTableLetters(horizontalWordTable);

  const { crosswordsTable: verticalWordTable } = addVerticalWords({
    availableWords: availableHorizontalWords,
    crosswordsTable: populatedHorizontalTable,
    skip: skipVertical,
  });
  const populatedTable = populateVerticalTableLetters(verticalWordTable);

  return getWordsTableData(populatedTable);
};
