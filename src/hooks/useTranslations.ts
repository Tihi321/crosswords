import { locale } from "svelte-i18n";
import { ELanguages } from "../constants";
import { useLocalStorage } from "./useLocalStorage";

export const useTranslations = () => {
  const { setLocalLanguage } = useLocalStorage();
  const setLocale = (key: string) => {
    locale.set(key)
  }

  const setCroatian = () => {
    setLocalLanguage(ELanguages.Croatian);
    setLocale(ELanguages.Croatian)
  }

  const setEnglish = () => {
    setLocalLanguage(ELanguages.English);
    setLocale(ELanguages.English)
  }

  return {
    setEnglish,
    setCroatian,
    setLocale,
    locale
  }
}