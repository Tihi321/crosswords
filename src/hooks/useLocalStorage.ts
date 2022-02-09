import { ELocalStorage, EThemes } from "../constants";

export const useLocalStorage = () => {
  const getItem = (key: string) => localStorage.getItem(key);
  const setItem = (key: string, value: string) => localStorage.setItem(key, value);

  const getLocalTheme = () => getItem(ELocalStorage.Theme);
  const setLocalTheme = (theme: EThemes) => setItem(ELocalStorage.Theme, theme);

  const getLocalEndpoint = () => getItem(ELocalStorage.Endpoint);
  const setLocalEndpoint = (endpoint: string) => setItem(ELocalStorage.Endpoint, endpoint);

  return {
    getLocalEndpoint,
    setLocalEndpoint,
    getLocalTheme,
    setLocalTheme
  }
}