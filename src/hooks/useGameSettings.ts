import { gameSettings } from "../store/gameSettings";
import type { TGameSettingsStore } from "../types";
import { useLocalStorage } from "./useLocalStorage";

export const useGameSettings = () => {
  const { subscribe, set } = gameSettings;
  const { setLocalGameSettings } = useLocalStorage();

  const setState = (newState: TGameSettingsStore) => {
    setLocalGameSettings(newState);
    set(newState);
  };

  return {
    setStore: (state) => set(state),
    gameSettings: {
      subscribe,
      set: (state) => setState(state),
    },
  };
};
