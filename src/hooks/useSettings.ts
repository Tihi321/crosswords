import { settings } from "../store/settings";
import { useLocalStorage } from "./useLocalStorage";
import type { TSettingsStore } from "../types";

export const useSettings = () => {
  const { setLocalEndpoint, setLocalRows, setLocalColumns, setLocalWordLimit, setLocalSkipVertical, setLocalSkipHorizontal } = useLocalStorage();

  const setEndpoint = (newEndpoint: string) => {
    setLocalEndpoint(newEndpoint);
    settings.update((state) => ({
      ...state,
      endpoint: newEndpoint
    }));
  };

  const setRows = (numberOfRows: number) => {
    setLocalRows(numberOfRows);
    settings.update((state) => ({
      ...state,
      numberOfRows
    }));
  };

  const setColumns = (numberOfColumns: number) => {
    setLocalColumns(numberOfColumns);
    settings.update((state) => ({
      ...state,
      numberOfColumns
    }));
  };

  const setWordLimit = (wordLimit: number) => {
    setLocalWordLimit(wordLimit);
    settings.update((state) => ({
      ...state,
      wordLimit
    }));
  };

  const setSkipHorizontal = (skipHorizontal: number) => {
    setLocalSkipHorizontal(skipHorizontal);
    settings.update((state) => ({
      ...state,
      skipHorizontal
    }));
  };

  const setSkipVertical = (skipVertical: number) => {
    setLocalSkipVertical(skipVertical);
    settings.update((state) => ({
      ...state,
      skipVertical
    }));
  };

  const setState = (newState: TSettingsStore) => {
    const { endpoint, numberOfRows, numberOfColumns, wordLimit, skipHorizontal, skipVertical } = newState;

    setLocalEndpoint(endpoint);
    setLocalSkipVertical(skipVertical);
    setLocalSkipHorizontal(skipHorizontal);
    setLocalWordLimit(wordLimit);
    setLocalColumns(numberOfColumns);
    setLocalRows(numberOfRows);
  
    settings.update((state) => ({
      ...state,
      endpoint,
      numberOfRows,
      numberOfColumns,
      wordLimit,
      skipHorizontal,
      skipVertical
    }));
  };

  return {
    setEndpoint,
    setRows,
    setColumns,
    setWordLimit,
    setSkipHorizontal,
    setSkipVertical,
    setState,
    settings
  }
}