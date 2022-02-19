import { gameSettings } from "../store/gameSettings";
import type { TGameSettingsStore } from "../types";
import { useLocalStorage } from "./useLocalStorage";
import { useSettings } from "./useSettings";

export const useGameSettings = () => {
  const { subscribe, set } = gameSettings;
  const { setLocalGameSettings } = useLocalStorage();
  const { settings } = useSettings();

  const setState = (newState: TGameSettingsStore) => {
    setLocalGameSettings(newState);
    set(newState);
  };

  return {
    setStore: (state) => set(state),
    settings,
    gameSettings: {
      subscribe,
      set: (state) => setState(state),
    },
  };
};
