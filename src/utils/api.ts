import get from "lodash/get";

import { ELanguages, Endpoints } from "../constants";
export const getLocalizedEndpoint = (language: string) =>
  language === ELanguages.Croatian ? Endpoints.CroatianWords : Endpoints.Words;

export const fetchWords = (url: string, callback: Function) => {
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      callback(get(res, ["data"]));
    });
};
