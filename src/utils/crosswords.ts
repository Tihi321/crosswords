import { getRandomRangeItemsAndRemove } from "./array";
import { generateWordObject, addMatches } from "./words";
import map from "lodash/map"

export const generateCrosswordsArray = (initialWords: Array<string>) => {
  const {
    randomItems: selectedWords
  } = getRandomRangeItemsAndRemove(initialWords, 50);

  const selectedWordsData = map(selectedWords, (word: string) => generateWordObject(word));
  const selectedWordsWithTotalMatches = addMatches(selectedWordsData);

  console.log("selectedWordsWithTotalMatches", selectedWordsWithTotalMatches);

  return {
    selectedWords: selectedWordsData,
  }
}