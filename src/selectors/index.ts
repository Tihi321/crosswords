import get from "lodash/get";
import isEqual from "lodash/isEqual";
import lowerCase from "lodash/lowerCase";
import map from "lodash/map";
import shuffle from "lodash/shuffle";
import { combineSelector } from "tsl-utils";

import { ECrosswordSize, EGameDifficulty } from "../constants";

export const gatGameDifficulty = (gameSettingsSelector) =>
  combineSelector(gameSettingsSelector, (state) => get(state, ["difficulty"]));

export const isEasyDifficulty = (gameSettingsSelector) =>
  combineSelector(gatGameDifficulty(gameSettingsSelector), (difficulty) =>
    isEqual(difficulty, EGameDifficulty.Easy)
  );

export const isNotHardDifficulty = (gameSettingsSelector) =>
  combineSelector(
    gatGameDifficulty(gameSettingsSelector),
    (difficulty) => !isEqual(difficulty, EGameDifficulty.Hard)
  );

export const getNumberOfRetries = (gameStateSelector) =>
  combineSelector(gameStateSelector, (state) => get(state, ["retries"]));

export const getCrosswordTableWords = (crosswordsStateSelector) =>
  combineSelector(crosswordsStateSelector, (state) => get(state, ["words"], []));

export const getCrosswordTableDetails = (crosswordsStateSelector) =>
  combineSelector(crosswordsStateSelector, (state) => get(state, ["details"], []));

export const getCrosswordTableInputs = (crosswordsStateSelector) =>
  combineSelector(crosswordsStateSelector, (state) => get(state, ["inputs"], {}));

export const getCrosswordTableData = (crosswordsStateSelector) =>
  combineSelector(crosswordsStateSelector, (state) => get(state, ["table"], []));

export const getWordsDataState = (wordsStateSelector) =>
  combineSelector(wordsStateSelector, (state) => get(state, ["words"], []));

export const getWordsRemovedSpacesData = (wordsStateSelector) =>
  combineSelector(getWordsDataState(wordsStateSelector), (words) =>
    map(words, (word) => ({
      ...word,
      name: lowerCase(word.name.replace(/\s/g, "")),
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
