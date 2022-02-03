import get from "lodash/get";
import lowerCase from "lodash/lowerCase";
import type { TWordItem, TWordObject } from "../types";

export const generateWordItem = (name: string, detail: string): TWordItem => ({
  detail,
  name: lowerCase(name)
})

export const generateWordObject = (word: string): TWordObject => {
  const name: string = lowerCase(get(word, ["name"]));
  const charsArray = name.split("");

  return ({
    name,
    detail: get(word, ["detail"]),
    length: charsArray.length,
    chars: charsArray,
  })
}