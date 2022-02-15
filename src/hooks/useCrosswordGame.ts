import { generateSelector } from "tsl-utils";

import {
  getCrosswordTableData,
  getCrosswordTableDetails,
  getCrosswordTableInputs,
  getCrosswordTableWords,
  getRandomizedWordsData,
  getSettingOptions,
} from "../selectors";
import type {
  TCrosswordTable,
  TDetails,
  TSettingOptions,
  TWordArray,
  TWordInputs,
  TWordsInfo,
} from "../types";
import { generateCrosswordsTable, getCrosswordData } from "../utils";
import { useCrossWord } from "./useCrossWord";

export const useCrosswordGame = () => {
  const { addCrosswordTable, addCrosswordDetails, addCrosswordWords } = useCrossWord();

  const getSettingsData = (settingsState): TSettingOptions => {
    const settingsStateSelector = generateSelector(settingsState);

    return getSettingOptions(settingsStateSelector);
  };

  const getWordsArray = (wordsState): TWordArray => {
    const wordsStateSelector = generateSelector(wordsState);

    return getRandomizedWordsData(wordsStateSelector);
  };

  const generateNewCrosswordData = (wordsState, settingsState) => {
    const wordsData = getWordsArray(wordsState);
    const settingsData = getSettingsData(settingsState);

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
