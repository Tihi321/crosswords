import type { TCrosswordTable } from "./table"
import type { TDetails, TWordInputs, TWordsInfo } from "../types"

type TCrosswordArgs = {
  tableData: TCrosswordTable,
  wordDetails: TDetails,
  inputsState: TWordInputs,
  wordsInfo: TWordsInfo
}

type TCrosswordData = {
  tableData: TCrosswordTable,
  wordDetails: TDetails
}
export const getCrosswordData = ({tableData, wordDetails, inputsState, wordsInfo}: TCrosswordArgs): TCrosswordData => {
  console.log("inputsState", inputsState);
  console.log("wordsInfo", wordsInfo);

  return {
    tableData,
    wordDetails
  }
}