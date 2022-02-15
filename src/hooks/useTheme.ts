import { EThemes } from "../constants";
import { theme } from "../store/theme";
import { useLocalStorage } from "./useLocalStorage";

export const useTheme = () => {
  const { setLocalTheme } = useLocalStorage();

  const setTheme = (newTheme: EThemes) => {
    theme.update((state) => ({
      ...state,
      theme: newTheme,
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
    setTheme,
    switchTheme,
    theme,
  };
};
