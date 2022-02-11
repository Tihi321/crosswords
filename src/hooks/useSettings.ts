import isUndefined from "lodash/isUndefined";
import { settings } from "../store/settings";
import { useLocalStorage } from "./useLocalStorage";
import type { TSettingsStore } from "../types";

export const useSettings = () => {
  const { setLocalEndpoint, setLocalSettings, setLocalUseCustomEndpoint } = useLocalStorage();

  const setEndpoint = (newState: TSettingsStore) => {
    if (newState.endpoint) {
      setLocalEndpoint(newState.endpoint);
    }

    if (newState.useCustomEndpoint) {
      setLocalUseCustomEndpoint(newState.useCustomEndpoint);
    }

    settings.update((state) => ({
      ...state,
      endpoint: newState.endpoint || state.endpoint,
      useCustomEndpoint: newState.useCustomEndpoint || state.useCustomEndpoint,
    }));
  };

  const setState = (newState: TSettingsStore) => {
    setLocalSettings(newState);
    settings.update((state) => ({
      ...state,
      endpoint: newState.endpoint || state.endpoint,
      useCustomEndpoint: !isUndefined(newState.useCustomEndpoint) ? newState.useCustomEndpoint : state.useCustomEndpoint,
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