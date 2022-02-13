import { EThemes } from "../constants";
import { theme } from "../store/theme";
import { useLocalStorage } from "./useLocalStorage";

export const useTheme = () => {
  const { setLocalTheme } = useLocalStorage();

  const setLightTheme = () => {
    theme.update((state) => ({
      ...state,
      theme: EThemes.Light,
    }));
  };

  const setDarkTheme = () => {
    theme.update((state) => ({
      ...state,
      theme: EThemes.Dark,
    }));
  };

  const switchTheme = () => {
    theme.update((state) => {
      const newTheme = state.theme === EThemes.Light ? EThemes.Dark : EThemes.Light;

      setLocalTheme(newTheme);
      return {
        ...state,
        theme: newTheme,
      };
    });
  };

  return {
    setLightTheme,
    setDarkTheme,
    switchTheme,
    theme,
  };
};
