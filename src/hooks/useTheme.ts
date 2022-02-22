import type { EThemes } from "../constants";
import { theme } from "../store/theme";
import { useLocalStorage } from "./useLocalStorage";

export const useTheme = () => {
  const { setLocalTheme } = useLocalStorage();
  const { set, subscribe } = theme;

  const setTheme = (newTheme: EThemes) => {
    set(newTheme);
  };

  const setState = (newTheme: EThemes) => {
    setLocalTheme(newTheme);
    set(newTheme);
  };

  return {
    setTheme,
    theme: {
      subscribe,
      set: (state) => setState(state),
    },
  };
};
