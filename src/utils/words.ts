import includes from "lodash/includes";
import get from "lodash/get";
import { rangeEach } from "tsl-utils";

export type TWordObject = {
  detail: string;
  name: string;
  lenght: number;
  chars: string[];
  firstChar: string;
  matches: any;
}

export const generateWordObject = (word: string): TWordObject => {

  const name = get(word, ["name"]);

  return ({
    name,
    detail: get(word, ["detail"]),
    lenght: name.lenght,
    chars: name.split(""),
    firstChar: get(name, [0]),
    matches: {},
  })
}

export const addMatches = (wordsArray: TWordObject[]): TWordObject[] => {
  let returnArray = [];

  rangeEach(wordsArray.length, wordsArrayIndex => {
    const wordItem = {...wordsArray[wordsArrayIndex]};

    rangeEach(wordItem.chars.length, wordCharsIndex => {
      const charItem = wordItem.chars[wordCharsIndex];

      rangeEach(wordsArray.length, innerWordsArrayIndex => {
        const innerWordItem = wordsArray[innerWordsArrayIndex];
        const defaultTotalMatches = wordItem.matches[charItem] || [];

        if (wordItem.name !== innerWordItem.name) {
          if (!includes(defaultTotalMatches, innerWordItem.name)) {
            wordItem.matches = {
              ...wordItem.matches,
              [charItem]: charItem === innerWordItem.chars[0] ? [...defaultTotalMatches, innerWordItem.name] : defaultTotalMatches
            };
          }
        }
      });
    });

    returnArray = [...returnArray, wordItem];
  });

  return returnArray;
}