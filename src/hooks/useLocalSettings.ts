import type { EThemes } from "../constants";
import { useDevSettings } from "./useDevSettings";
import { useGameSettings } from "./useGameSettings";
import { useLocalStorage } from "./useLocalStorage";
import { useTheme } from "./useTheme";
import { useTranslations } from "./useTranslations";

export const useLocalSettings = () => {
  const { locale, setLocale } = useTranslations();
  const { setTheme, theme } = useTheme();
  const { getLocalTheme, getLocalLanguage, getLocalDevSettings, getLocalGameSettings } =
    useLocalStorage();
  const { setStore: setDevStore } = useDevSettings();
  const { setStore: setGameStore } = useGameSettings();

  const setLocalStorageState = () => {
    const devSettings = getLocalDevSettings();
    const gameSettings = getLocalGameSettings();
    const localStorageTheme = getLocalTheme();
    const localLanguage = getLocalLanguage();

    if (localLanguage) {
      setLocale(localLanguage);
    }

    if (devSettings) {
      setDevStore(devSettings);
    }

    if (gameSettings) {
      setGameStore(gameSettings);
    }

    if (localStorageTheme) {
      setTheme(localStorageTheme as EThemes);
    }
  };

  return {
    theme,
    locale,
    setLocalStorageState,
  };
};
