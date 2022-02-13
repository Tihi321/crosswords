import isUndefined from "lodash/isUndefined";

import { ELocalStorage, EThemes } from "../constants";
import type { TSettingsStore } from "../types";

const getNumberValue = (value?: string) => value && Number(value);
const getBooleanValue = (value?: string) => value && value === "true";
const setBooleanStringValue = (value: boolean) => (value ? "true" : "false");

export const useLocalStorage = () => {
  const getItem = (key: string) => localStorage.getItem(key);
  const setItem = (key: string, value: string) => localStorage.setItem(key, value);

  const getLocalTheme = () => getItem(ELocalStorage.Theme);
  const setLocalTheme = (theme: EThemes) => setItem(ELocalStorage.Theme, theme);

  const getLocalEndpoint = () => getItem(ELocalStorage.Endpoint);
  const setLocalEndpoint = (endpoint: string) => setItem(ELocalStorage.Endpoint, endpoint);

  const getLocalUseCustomEndpoint = () => getBooleanValue(getItem(ELocalStorage.UseCustomEndpoint));
  const setLocalUseCustomEndpoint = (useEndpoint: boolean) =>
    setItem(ELocalStorage.UseCustomEndpoint, setBooleanStringValue(useEndpoint));

  const getLocalLanguage = () => getItem(ELocalStorage.Language);
  const setLocalLanguage = (language: string) => setItem(ELocalStorage.Language, language);

  const getLocalRows = () => getNumberValue(getItem(ELocalStorage.Rows));
  const setLocalRows = (rows: number) => setItem(ELocalStorage.Rows, `${rows}`);

  const getLocalColumns = () => getNumberValue(getItem(ELocalStorage.Columns));
  const setLocalColumns = (columns: number) => setItem(ELocalStorage.Columns, `${columns}`);

  const getLocalWordLimit = () => getNumberValue(getItem(ELocalStorage.WordLimit));
  const setLocalWordLimit = (limit: number) => setItem(ELocalStorage.WordLimit, `${limit}`);

  const getLocalSkipVertical = () => getNumberValue(getItem(ELocalStorage.SkipVertical));
  const setLocalSkipVertical = (skip: number) => setItem(ELocalStorage.SkipVertical, `${skip}`);

  const getLocalSkipHorizontal = () => getNumberValue(getItem(ELocalStorage.SkipHorizontal));
  const setLocalSkipHorizontal = (skip: number) => setItem(ELocalStorage.SkipHorizontal, `${skip}`);

  const setLocalSettings = (newState: TSettingsStore) => {
    const {
      endpoint,
      numberOfRows,
      numberOfColumns,
      wordLimit,
      skipHorizontal,
      skipVertical,
      useCustomEndpoint,
    } = newState;

    if (endpoint) {
      setLocalEndpoint(endpoint);
    }

    if (!isUndefined(useCustomEndpoint)) {
      setLocalUseCustomEndpoint(useCustomEndpoint);
    }

    if (skipVertical) {
      setLocalSkipVertical(skipVertical);
    }

    if (skipHorizontal) {
      setLocalSkipHorizontal(skipHorizontal);
    }

    if (wordLimit) {
      setLocalWordLimit(wordLimit);
    }

    if (numberOfColumns) {
      setLocalColumns(numberOfColumns);
    }

    if (numberOfRows) {
      setLocalRows(numberOfRows);
    }
  };

  return {
    getLocalLanguage,
    setLocalLanguage,
    setLocalSettings,
    getLocalEndpoint,
    setLocalEndpoint,
    getLocalUseCustomEndpoint,
    setLocalUseCustomEndpoint,
    getLocalRows,
    getLocalColumns,
    getLocalWordLimit,
    getLocalSkipVertical,
    getLocalSkipHorizontal,
    getLocalTheme,
    setLocalTheme,
  };
};
