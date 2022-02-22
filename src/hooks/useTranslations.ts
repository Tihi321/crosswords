import { locale } from "svelte-i18n";

import type { ELanguages } from "../constants";
import { useLocalStorage } from "./useLocalStorage";

export const useTranslations = () => {
  const { setLocalLanguage } = useLocalStorage();
  const { set, subscribe } = locale;

  const setState = (language: ELanguages) => {
    setLocalLanguage(language);
    set(language);
  };

  return {
    setStore: (state) => set(state),
    locale: {
      subscribe,
      set: (state) => setState(state),
    },
  };
};
