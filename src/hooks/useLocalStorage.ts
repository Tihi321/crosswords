import { ELocalStorage, EThemes } from "../constants";

export const useLocalStorage = () => {
  const getItem = (key: string) => localStorage.getItem(key);
  const setItem = (key: string, value: string) => localStorage.setItem(key, value);

  const getLocalTheme = () => getItem(ELocalStorage.Theme);
  const setLocalTheme = (theme: EThemes) => setItem(ELocalStorage.Theme, theme);

  return {
    getLocalTheme,
    setLocalTheme
  }
}