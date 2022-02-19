import get from "lodash/get";
import isEqual from "lodash/isEqual";
import lowerCase from "lodash/lowerCase";
import map from "lodash/map";
import shuffle from "lodash/shuffle";
import { combineSelector } from "tsl-utils";

import { EGameDifficulty, EGamePresets, ETableSize, SIZE_PRESETS } from "../constants";

export const gatCustomSettingsEnabled = (devSettingsStateSelector) =>
  combineSelector(devSettingsStateSelector, (state) => get(state, ["enable"]));

export const getCustomSettingsShown = (settingsStateSelector) =>
  combineSelector(settingsStateSelector, (state) => get(state, ["devSettings"]));

export const getIsCustomGame = (settingsStateSelector, devSettingsStateSelector) =>
  combineSelector(
    getCustomSettingsShown(settingsStateSelector),
    gatCustomSettingsEnabled(devSettingsStateSelector),
    (customSettingsShown, customSettingsEnabled) => customSettingsShown && customSettingsEnabled
  );

export const gatGameDifficulty = (gameSettingsSelector) =>
  combineSelector(gameSettingsSelector, (state) => get(state, ["difficulty"]));

export const gatGameSize = (gameSettingsSelector) =>
  combineSelector(gameSettingsSelector, (state) => get(state, ["size"]));

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

export const getCustomSettingOptions = (settingsStateSelector) =>
  combineSelector(settingsStateSelector, (state) => ({
    numberOfRows: get(state, ["numberOfRows"]),
    numberOfColumns: get(state, ["numberOfColumns"]),
    wordLimit: get(state, ["wordLimit"]),
    skipHorizontal: get(state, ["skipHorizontal"]),
    skipVertical: get(state, ["skipVertical"]),
  }));

export const getGameSettingOptions = (gameSettingsSelector) =>
  combineSelector(gatGameSize(gameSettingsSelector), (tableSize) => {
    let numberOfColumns: number;
    let numberOfRows: number;

    switch (tableSize) {
      case ETableSize.Big:
        numberOfColumns = SIZE_PRESETS.COLUMNS.BIG;
        numberOfRows = SIZE_PRESETS.ROWS.BIG;
        break;
      case ETableSize.Medium:
        numberOfColumns = SIZE_PRESETS.COLUMNS.MEDIUM;
        numberOfRows = SIZE_PRESETS.ROWS.MEDIUM;
        break;

      default:
        numberOfColumns = SIZE_PRESETS.COLUMNS.SMALL;
        numberOfRows = SIZE_PRESETS.ROWS.SMALL;
    }

    return {
      numberOfRows: numberOfRows,
      numberOfColumns: numberOfColumns,
      wordLimit: EGamePresets.WordLimit,
      skipHorizontal: EGamePresets.SkipRows,
      skipVertical: EGamePresets.SkipColumns,
    };
  });
