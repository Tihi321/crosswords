import get from "lodash/get";

import { ELanguages, Endpoints, EWordsLanguages } from "../constants";
export const getLocalizedEndpoint = (language: string) =>
  language === EWordsLanguages.Croatian ? Endpoints.WordsCro : Endpoints.WordsEng;

export const getApiLanguageBasedOnPageLanguage = (language: string) =>
  language === ELanguages.Croatian ? EWordsLanguages.Croatian : EWordsLanguages.English;

export const fetchWords = (url: string, callback: Function) => {
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      callback(get(res, ["data"]));
    });
};
