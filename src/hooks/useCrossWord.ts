import { generateSelector } from "tsl-utils";
import {crossWord } from "../store/words";
import type { TWordInputData, TDetails, TWordInputs, TWordsInfo } from "../types";
import { generateIndexKey } from "../utils/words";
import { getCrosswordData, type TCrosswordTable } from "../utils";
import { getCrosswordTableData, getCrosswordTableDetails, getCrosswordTableInputs, getCrosswordTableWords } from "../selectors";

export const useCrossWord = () => {

  const resetCrossWord = () => {
    crossWord.set({
      table: [],
      details: [],
      words: [],
      inputs: {}
    });
  };

  const addCrosswordTable = (data) => {
    crossWord.update((state) => ({
      ...state,
      table: data
    }));
  };

  const addCrosswordDetails = (data) => {
    crossWord.update((state) => ({
      ...state,
      details: data
    }));
  };

  const updateCrosswordInput = ({ value, rowIndex, itemIndex }: TWordInputData) => {
    crossWord.update((state) => ({
      ...state,
      inputs: {
        ...state.inputs,
        [generateIndexKey(rowIndex, itemIndex)]: {
          value,
          rowIndex,
          itemIndex
        }
      }
    }));
  };

  const addCrosswordWords = (data) => {
    crossWord.update((state) => ({
      ...state,
      words: data
    }));
  };

  const updateCrosswordWord = (name, data) => {
    crossWord.update((state) => ({
      ...state,
      words: {
        ...state.words,
        [name]: data
      }
    }));
  };

  const generateTableData = (crossWordState) => {
    const crosswordStateSelector = generateSelector(crossWordState);
  
    return getCrosswordData({
      tableData: getCrosswordTableData(crosswordStateSelector) as TCrosswordTable,
      wordDetails: getCrosswordTableDetails(crosswordStateSelector) as TDetails,
      inputsState:  getCrosswordTableInputs(crosswordStateSelector) as TWordInputs,
      wordsInfo: getCrosswordTableWords(crosswordStateSelector) as TWordsInfo
    })
  }

  return {
    resetCrossWord,
    addCrosswordDetails,
    addCrosswordTable,
    updateCrosswordInput,
    updateCrosswordWord,
    addCrosswordWords,
    crossWord,
    generateTableData,
  }
}