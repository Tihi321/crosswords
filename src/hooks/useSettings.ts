import { settings } from "../store/settings";
import type { TSettingsStore } from "../types";
import { useLocalStorage } from "./useLocalStorage";

export const useSettings = () => {
  const { subscribe, set } = settings;
  const { setLocalSettings } = useLocalStorage();

  const setState = (newState: TSettingsStore) => {
    setLocalSettings(newState);
    set(newState);
  };

  return {
    setStore: (state) => set(state),
    settings: {
      subscribe,
      set: (state) => setState(state),
    },
  };
};
