import get from "lodash/get";
import map from "lodash/map";
import shuffle from "lodash/shuffle";
import { combineSelector } from "tsl-utils";

import { ECrosswordSize } from "../constants";

export const getCrosswordTableWords = (crosswordsStateSelector) =>
  combineSelector(crosswordsStateSelector, (state) => get(state, ["words"], []));

export const getCrosswordTableDetails = (crosswordsStateSelector) =>
  combineSelector(crosswordsStateSelector, (state) => get(state, ["details"], []));

export const getCrosswordTableInputs = (crosswordsStateSelector) =>
  combineSelector(crosswordsStateSelector, (state) => get(state, ["inputs"], {}));

export const getCrosswordTableData = (crosswordsStateSelector) =>
  combineSelector(crosswordsStateSelector, (state) => get(state, ["table"], []));

export const getWordsData = (wordsStateSelector) =>
  combineSelector(wordsStateSelector, (state) => get(state, ["words"], []));

export const getWordsRemovedSpacesData = (wordsStateSelector) =>
  combineSelector(getWordsData(wordsStateSelector), (words) =>
    map(words, (word) => ({
      ...word,
      name: word.name.replace(/\s/g, ""),
    }))
  );

export const getRandomizedWordsData = (wordsStateSelector) =>
  combineSelector(getWordsRemovedSpacesData(wordsStateSelector), (state) => shuffle(state));

export const getSettingOptions = (settingsStateSelector) =>
  combineSelector(settingsStateSelector, (state) => ({
    numberOfRows: get(state, ["numberOfRows"]),
    numberOfColumns: get(state, ["numberOfColumns"]),
    wordLimit: get(state, ["wordLimit"]),
    skipHorizontal: get(state, ["skipHorizontal"]),
    skipVertical: get(state, ["skipVertical"]),
    crosswordSize:
      get(state, ["numberOfRows"]) * get(state, ["numberOfColumns"]) > 350
        ? ECrosswordSize.Large
        : ECrosswordSize.Medium,
  }));
