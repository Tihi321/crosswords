import isUndefined from "lodash/isUndefined";

import { settings } from "../store/settings";
import type { TSettingsStore } from "../types";
import { useLocalStorage } from "./useLocalStorage";

export const useSettings = () => {
  const { subscribe, update } = settings;
  const { setLocalEndpoint, setLocalSettings, setLocalUseCustomEndpoint } = useLocalStorage();

  const setEndpoint = (newState: TSettingsStore) => {
    if (newState.endpoint) {
      setLocalEndpoint(newState.endpoint);
    }

    if (newState.useCustomEndpoint) {
      setLocalUseCustomEndpoint(newState.useCustomEndpoint);
    }

    update((state) => ({
      ...state,
      endpoint: newState.endpoint || state.endpoint,
      useCustomEndpoint: newState.useCustomEndpoint || state.useCustomEndpoint,
    }));
  };

  const setState = (newState: TSettingsStore) => {
    setLocalSettings(newState);
    update((state) => ({
      ...state,
      endpoint: newState.endpoint || state.endpoint,
      useCustomEndpoint: !isUndefined(newState.useCustomEndpoint)
        ? newState.useCustomEndpoint
        : state.useCustomEndpoint,
      numberOfRows: newState.numberOfRows || state.numberOfRows,
      numberOfColumns: newState.numberOfColumns || state.numberOfColumns,
      wordLimit: newState.wordLimit || state.wordLimit,
      skipHorizontal: newState.skipHorizontal || state.skipHorizontal,
      skipVertical: newState.skipVertical || state.skipVertical,
    }));
  };

  return {
    setEndpoint,
    setState,
    settings: {
      subscribe,
      set: (state) => setState(state),
    },
  };
};
