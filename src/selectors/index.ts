import { combineSelector } from "tsl-utils";
import map from "lodash/map";
import forEach from "lodash/forEach";
import uniq from "lodash/uniq";
import get from "lodash/get";
import shuffle from "lodash/shuffle";
import slice from "lodash/slice";
import { generateWordItem } from "../utils";

export const getWordsData = (peopleNamesDataSelector) => combineSelector(
  peopleNamesDataSelector,
  state => get(state, ["words"], [])
)

export const getRandomizedWordsData = (peopleNamesDataSelector) => combineSelector(
  getWordsData(peopleNamesDataSelector),
  state => shuffle(state)
)

export const getPeopleNames = (peopleNamesDataSelector) => combineSelector(
  peopleNamesDataSelector,
  state => get(state, ["names"], [])
)

export const getPeopleLastNames = (peopleNamesDataSelector) => combineSelector(
  peopleNamesDataSelector,
  state => get(state, ["lastnames"], [])
)

export const getSelectedRandomNames = (peopleNamesDataSelector) => combineSelector(
  getPeopleNames(peopleNamesDataSelector),
  state => slice(shuffle(state), 0, 200)
)

export const getSelectedRandomLastNames = (peopleNamesDataSelector) => combineSelector(
  getPeopleLastNames(peopleNamesDataSelector),
  state => slice(shuffle(state), 0, 200)
)

export const getRandomPeopleNames = (peopleNamesDataSelector) => combineSelector(
  getSelectedRandomNames(peopleNamesDataSelector),
  getSelectedRandomLastNames(peopleNamesDataSelector),
  (names, lastnames) => map(names, (name, index) => {
    const lastname = get(lastnames, [index], "");
    return ({
      fullName: `${name}${lastname}`,
      inicials: `${get(name, [0], "")}${get(lastname, [0], "")}`
    })
  })
)

export const getRandomNameWords = (peopleNamesDataSelector) => combineSelector(
  getRandomPeopleNames(peopleNamesDataSelector),
  (names) => {
    let onlyInitialWords = [];
    let onlyNames = [];
    forEach(names, name => {
      onlyInitialWords = [...onlyInitialWords, get(name, ["inicials"])];
      onlyNames = [...onlyNames, get(name, ["fullName"])];
    });

    const nameWords = map(onlyNames, name => generateWordItem(name, "name"));
    const initialWords = map(uniq(onlyInitialWords), initial => generateWordItem(initial, "initial"));

    return shuffle([...initialWords, ...nameWords]);
  }
)