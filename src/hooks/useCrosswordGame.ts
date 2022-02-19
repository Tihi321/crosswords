import { generateSelector } from "tsl-utils";

import {
  getCrosswordTableData,
  getCrosswordTableDetails,
  getCrosswordTableInputs,
  getCrosswordTableWords,
  getCustomSettingOptions,
  getGameSettingOptions,
  getIsCustomGame,
  getRandomizedWordsData,
} from "../selectors";
import type {
  TCrosswordTable,
  TDetails,
  TDevSettingsStore,
  TGameSettingsStore,
  TSettingOptions,
  TSettingsStore,
  TWordArray,
  TWordInputs,
  TWordsInfo,
} from "../types";
import { generateCrosswordsTable, getCrosswordData } from "../utils";
import { useCrossWord } from "./useCrossWord";

export const useCrosswordGame = () => {
  const { addCrosswordTable, addCrosswordDetails, addCrosswordWords } = useCrossWord();

  const getSettingsData = (settingsState, gameSettingsState, devSettingsState): TSettingOptions => {
    const settingsStateSelector = generateSelector(settingsState);
    const gameSettingsStateSelector = generateSelector(gameSettingsState);
    const devSettingsStateSelector = generateSelector(devSettingsState);

    const isCustomGame = getIsCustomGame(settingsStateSelector, devSettingsStateSelector);

    return isCustomGame
      ? getCustomSettingOptions(devSettingsStateSelector)
      : getGameSettingOptions(gameSettingsStateSelector);
  };

  const getWordsArray = (wordsState): TWordArray => {
    const wordsStateSelector = generateSelector(wordsState);

    return getRandomizedWordsData(wordsStateSelector);
  };

  const generateNewCrosswordData = ({
    wordsState,
    settingsState,
    gameSettingsState,
    devSettingsState,
  }: {
    wordsState: any;
    settingsState: TSettingsStore;
    gameSettingsState: TGameSettingsStore;
    devSettingsState: TDevSettingsStore;
  }) => {
    const wordsData = getWordsArray(wordsState);
    const settingsData = getSettingsData(settingsState, gameSettingsState, devSettingsState);

    const { table, details, words } = generateCrosswordsTable({
      words: wordsData,
      settings: settingsData,
    });

    addCrosswordWords(words);
    addCrosswordDetails(details);
    addCrosswordTable(table);
  };

  const generateTableData = (crossWordState) => {
    const crosswordStateSelector = generateSelector(crossWordState);

    return getCrosswordData({
      tableData: getCrosswordTableData(crosswordStateSelector) as TCrosswordTable,
      wordDetails: getCrosswordTableDetails(crosswordStateSelector) as TDetails,
      inputsState: getCrosswordTableInputs(crosswordStateSelector) as TWordInputs,
      wordsInfo: getCrosswordTableWords(crosswordStateSelector) as TWordsInfo,
    });
  };

  return {
    generateNewCrosswordData,
    getTableData: (crossWord) => generateTableData(crossWord),
  };
};
