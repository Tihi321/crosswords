import { settings } from "../store/settings";
import { useLocalStorage } from "./useLocalStorage";
import type { TSettingsStore } from "../types";

export const useSettings = () => {
  const { setLocalEndpoint, setLocalSettings } = useLocalStorage();

  const setEndpoint = (newEndpoint: string) => {
    setLocalEndpoint(newEndpoint);
    settings.update((state) => ({
      ...state,
      endpoint: newEndpoint
    }));
  };

  const setState = (newState: TSettingsStore) => {
    setLocalSettings(newState);
    settings.update((state) => ({
      ...state,
      endpoint: newState.endpoint || state.endpoint,
      numberOfRows: newState.numberOfRows || state.numberOfRows,
      numberOfColumns: newState.numberOfColumns || state.numberOfColumns,
      wordLimit: newState.wordLimit || state.wordLimit,
      skipHorizontal: newState.skipHorizontal || state.skipHorizontal,
      skipVertical: newState.skipVertical || state.skipVertical
    }));
  };

  return {
    setEndpoint,
    setState,
    settings
  }
}