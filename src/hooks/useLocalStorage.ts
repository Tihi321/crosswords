import { ELocalStorage, EThemes } from "../constants";
import type { TDevSettingsStore, TGameSettingsStore, TSettingsStore } from "../types";

export const useLocalStorage = () => {
  const getItem = (key: string) => localStorage.getItem(key);
  const setItem = (key: string, value: string) => localStorage.setItem(key, value);

  const setJSONItem = (key: string, value: any) => {
    setItem(key, JSON.stringify(value));
  };
  const getJSONItem = (key: string) => {
    let output = undefined;
    const localJSONSettings = getItem(key);

    if (localJSONSettings) {
      output = JSON.parse(localJSONSettings);
    }

    return output;
  };

  const getLocalTheme = () => getItem(ELocalStorage.Theme);
  const setLocalTheme = (theme: EThemes) => setItem(ELocalStorage.Theme, theme);

  const getLocalLanguage = () => getItem(ELocalStorage.Language);
  const setLocalLanguage = (language: string) => setItem(ELocalStorage.Language, language);

  const getLocalDevSettings = (): TDevSettingsStore | undefined =>
    getJSONItem(ELocalStorage.DevSettings);
  const setLocalDevSettings = (newState: TDevSettingsStore) =>
    setJSONItem(ELocalStorage.DevSettings, newState);

  const getLocalGameSettings = (): TGameSettingsStore | undefined =>
    getJSONItem(ELocalStorage.GameSettings);
  const setLocalGameSettings = (newState: TGameSettingsStore) =>
    setJSONItem(ELocalStorage.GameSettings, newState);

  const getLocalSettings = (): TSettingsStore | undefined => getJSONItem(ELocalStorage.Settings);
  const setLocalSettings = (newState: TSettingsStore) =>
    setJSONItem(ELocalStorage.Settings, newState);

  return {
    getLocalLanguage,
    setLocalLanguage,
    getLocalSettings,
    setLocalSettings,
    setLocalDevSettings,
    getLocalDevSettings,
    getLocalGameSettings,
    setLocalGameSettings,
    getLocalTheme,
    setLocalTheme,
  };
};
