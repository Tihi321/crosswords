import { combineSelector } from "tsl-utils";
import get from "lodash/get";
import shuffle from "lodash/shuffle";

export const getCrosswordTableDetails = (crosswordsStateSelector) => combineSelector(
  crosswordsStateSelector,
  state => get(state, ["details"], [])
)

export const getCrosswordTableInputs = (crosswordsStateSelector) => combineSelector(
  crosswordsStateSelector,
  state => get(state, ["inputs"], {})
)

export const getCrosswordTableWords = (crosswordsStateSelector) => combineSelector(
  crosswordsStateSelector,
  state => get(state, ["words"], [])
)

export const getCrosswordTableData = (crosswordsStateSelector) => combineSelector(
  crosswordsStateSelector,
  state => get(state, ["table"], [])
)

export const getWordsData = (wordsStateSelector) => combineSelector(
  wordsStateSelector,
  state => get(state, ["words"], [])
)

export const getRandomizedWordsData = (wordsStateSelector) => combineSelector(
  getWordsData(wordsStateSelector),
  state => shuffle(state)
)

export const getSettingOptions = (settingsStateSelector) => combineSelector(
  settingsStateSelector,
  state => ({
    numberOfRows: get(state, ["numberOfRows"]),
    numberOfColumns: get(state, ["numberOfColumns"]),
    wordLimit: get(state, ["wordLimit"]),
    skipHorizontal: get(state, ["skipHorizontal"]),
    skipVertical: get(state, ["skipVertical"]),
  })
)