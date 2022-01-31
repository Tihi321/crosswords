import { combineSelector } from "tsl-utils";
import map from "lodash/map";
import get from "lodash/get";
import shuffle from "lodash/shuffle";
import slice from "lodash/slice";

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
  state => slice(shuffle(state), 0, 500)
)

export const getSelectedRandomLastNames = (peopleNamesDataSelector) => combineSelector(
  getPeopleLastNames(peopleNamesDataSelector),
  state => slice(shuffle(state), 0, 500)
)

export const getRandomPeopleNames = (peopleNamesDataSelector) => combineSelector(
  getSelectedRandomNames(peopleNamesDataSelector),
  getSelectedRandomLastNames(peopleNamesDataSelector),
  (names, lastnames) => map(names, (name, index) => {
    const lastname = get(lastnames, [index], "");
    return ({
      name,
      lastname: lastname,
      fullName: `${name} ${lastname}`,
      inicials: `${get(name, [0], "")}${get(lastname, [0], "")}`
    })
  })
)