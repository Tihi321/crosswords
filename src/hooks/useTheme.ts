import { theme } from "../store/theme";
import { EThemes } from "../constants";
import { useLocalStorage } from "./useLocalStorage";

export const useTheme = () => {
  const { setLocalTheme } = useLocalStorage();

  const setLightTheme = () => {
    theme.update((state) => ({
      ...state,
      theme: EThemes.Light
    }));
  };

  const setDarkTheme = () => {
    theme.update((state) => ({
      ...state,
      theme: EThemes.Dark
    }));
  };

  const switchTheme = () => {
    theme.update((state) => {
      const theme = state.theme === EThemes.Light ? EThemes.Dark : EThemes.Light;
    
      setLocalTheme(theme);
      return ({
        ...state,
        theme
      })
    });
  };

  return {
    setLightTheme,
    setDarkTheme,
    switchTheme,
    theme
  }
}