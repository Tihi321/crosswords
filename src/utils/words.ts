import forEach from "lodash/forEach"
import get from "lodash/get";
import lowerCase from "lodash/lowerCase";
import type { TDetail, TDetails, TLettersInfo, TWordInfo, TWordItem, TWordObject, TWordsInfo } from "../types";
import type { TWordRowInfo } from "./populate";
import { ECrosswordType } from "./table";

export const generateWordItem = (name: string, detail: string): TWordItem => ({
  detail,
  name: lowerCase(name)
})

export const generateWordObject = (word: string): TWordObject => {
  const name: string = lowerCase(get(word, ["name"]));
  const charsArray = name.split("");

  return ({
    name,
    detail: get(word, ["detail"]),
    length: charsArray.length,
    chars: charsArray,
  })
}

export const generateIndexKey = (rowIndex: number, itemIndex: number): string => `${rowIndex}${itemIndex}`

export const getWordsDetails = (words: TWordRowInfo[]): TDetails => {
  let details: TDetails = {};

  forEach(words, ({ word }: TWordRowInfo, index: number) => {
    const wordIndex = index + 1;
  
    const detail: TDetail = {
      id: word.name,
      index: wordIndex,
      description: word.detail,
      success: false
    };

    details = {
      ...details,
      [word.name]: detail
    };
  });

  return details;
}

export const getWordsInformation = (words: TWordRowInfo[]): TWordsInfo => {
  let wordsData: TWordsInfo = {}
  forEach(words, ({ rowIndex, itemIndex, word, type }: TWordRowInfo, index: number) => {
    const isLeft = type === ECrosswordType.Left;
    const letters = word.name.split("");
    let lettersData: TLettersInfo = {};

    forEach(letters, (letter: string, index: number) => {
      if(isLeft) {
        const letterItemIndex = itemIndex + index;
        lettersData = {
          ...lettersData,
          [generateIndexKey(rowIndex, letterItemIndex)]: {
            char: letter,
            success: false,
          }
        };
      } else {
        const letterRowIndex = rowIndex + index;
    
        lettersData = {
          ...lettersData,
          [generateIndexKey(letterRowIndex, itemIndex)]: {
            char: letter,
            success: false
          }
        };
      }
    });

    const wordInfo: TWordInfo = {
      wordIndex: index + 1,
      name: word.name,
      letters: lettersData,
      success: false
    }

    wordsData = {
      ...wordsData,
      [word.name]: wordInfo
    }
  });

  return wordsData;
}