import type { EThemes } from "../constants";
import { useDevSettings } from "./useDevSettings";
import { useGameSettings } from "./useGameSettings";
import { useLocalStorage } from "./useLocalStorage";
import { useSettings } from "./useSettings";
import { useTheme } from "./useTheme";
import { useTranslations } from "./useTranslations";

export const useLocalSettings = () => {
  const { locale, setLocale } = useTranslations();
  const { setTheme, theme } = useTheme();
  const {
    getLocalTheme,
    getLocalLanguage,
    getLocalDevSettings,
    getLocalGameSettings,
    getLocalSettings,
  } = useLocalStorage();
  const { setStore: setDevStore } = useDevSettings();
  const { setStore: setGameStore, gameSettings } = useGameSettings();
  const { setStore: setSettingsStore } = useSettings();

  const setLocalStorageState = () => {
    const devSettings = getLocalDevSettings();
    const settingsLocal = getLocalSettings();
    const gameSettingsLocal = getLocalGameSettings();
    const localStorageTheme = getLocalTheme();
    const localLanguage = getLocalLanguage();

    if (localLanguage) {
      setLocale(localLanguage);
    }

    if (devSettings) {
      setDevStore(devSettings);
    }

    if (settingsLocal) {
      setSettingsStore(settingsLocal);
    }

    if (gameSettingsLocal) {
      setGameStore(gameSettingsLocal);
    }

    if (localStorageTheme) {
      setTheme(localStorageTheme as EThemes);
    }
  };

  return {
    theme,
    gameSettings,
    locale,
    setLocalStorageState,
  };
};
