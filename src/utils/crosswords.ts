import { getRandomArrayItemAndRemove, getRandomRangeItemsAndRemove } from "./array";

export const generateCrosswordsArray = (initialWords: Array<string>) => {
  const {
    randomItems: selectedWords,
    filteredItems: backupWords
  } = getRandomRangeItemsAndRemove(initialWords, 100);

  const {
    item: startWords,
    items: selectedWordsWithoutStart
  } = getRandomArrayItemAndRemove(selectedWords);

  console.log(startWords);
  console.log(selectedWordsWithoutStart);
}