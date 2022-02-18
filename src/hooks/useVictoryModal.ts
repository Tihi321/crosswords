import { generateSelector } from "tsl-utils";

import { ECrosswordSize, EModals } from "../constants";
import { getCustomSettingOptions, getNumberOfRetries, getRandomizedWordsData } from "../selectors";
import type { TSettingOptions, TWordArray } from "../types";
import { generateCrosswordsTable } from "../utils";
import { useCrossWord } from "./useCrossWord";
import { useModals } from "./useModals";

export const useVictoryModal = () => {
  const { resetCrossWord, addCrosswordTable, addCrosswordDetails, addCrosswordWords } =
    useCrossWord();
  const { closeModal } = useModals();

  const closeVictoryModal = () => closeModal(EModals.Victory);

  const getSettingsData = (settingsState): TSettingOptions => {
    const settingsStateSelector = generateSelector(settingsState);

    return getCustomSettingOptions(settingsStateSelector);
  };

  const getWordsArray = (wordsState): TWordArray => {
    const wordsStateSelector = generateSelector(wordsState);

    return getRandomizedWordsData(wordsStateSelector);
  };

  const generateNewCrossword = (wordsData: TWordArray, settingsData) => {
    const { table, details, words } = generateCrosswordsTable({
      words: wordsData,
      settings: settingsData,
    });

    addCrosswordWords(words);
    addCrosswordDetails(details);
    addCrosswordTable(table);
  };

  const resetGame = (wordsState, settingsState) => {
    const wordsData = getWordsArray(wordsState);
    const settingsData = getSettingsData(settingsState);

    resetCrossWord();
    generateNewCrossword(wordsData, settingsData);
    closeVictoryModal();
  };

  const getIsLargeVictory = (settingsState) => {
    const settingsData = getSettingsData(settingsState);

    return settingsData.crosswordSize === ECrosswordSize.Large;
  };

  const getNumberOfRetriesNumber = (gameState) => {
    const gameStateSelector = generateSelector(gameState);

    return getNumberOfRetries(gameStateSelector);
  };

  return {
    resetGame,
    getIsLargeVictory,
    getSettingsData,
    getNumberOfRetriesNumber,
  };
};
