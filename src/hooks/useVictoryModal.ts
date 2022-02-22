import { generateSelector } from "tsl-utils";

import { getCustomSettingOptions, getNumberOfRetries } from "../selectors";
import type { TSettingOptions } from "../types";

export const useVictoryModal = () => {
  const getSettingsData = (settingsState): TSettingOptions => {
    const settingsStateSelector = generateSelector(settingsState);

    return getCustomSettingOptions(settingsStateSelector);
  };

  const getNumberOfRetriesNumber = (gameState) => {
    const gameStateSelector = generateSelector(gameState);

    return getNumberOfRetries(gameStateSelector);
  };

  return {
    getSettingsData,
    getNumberOfRetriesNumber,
  };
};
