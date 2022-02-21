import get from "lodash/get";

import { Endpoints, EWordsLanguages } from "../constants";
export const getLocalizedEndpoint = (language: string) =>
  language === EWordsLanguages.Croatian ? Endpoints.CroatianWords : Endpoints.Words;

export const fetchWords = (url: string, callback: Function) => {
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      callback(get(res, ["data"]));
    });
};
