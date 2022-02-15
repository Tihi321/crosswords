import { devSettings } from "../store/devSettings";
import type { TDevSettingsStore } from "../types";
import { useLocalStorage } from "./useLocalStorage";

export const useDevSettings = () => {
  const { subscribe, set } = devSettings;
  const { setLocalDevSettings } = useLocalStorage();

  const setState = (newState: TDevSettingsStore) => {
    setLocalDevSettings(newState);
    set(newState);
  };

  return {
    setStore: (state) => set(state),
    devSettings: {
      subscribe,
      set: (state) => setState(state),
    },
  };
};
