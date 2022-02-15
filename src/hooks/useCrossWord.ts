import { crossWord } from "../store/words";
import type { TWordInputData } from "../types";
import { generateIndexKey } from "../utils/words";

export const useCrossWord = () => {
  const resetCrossWord = () => {
    crossWord.set({
      table: [],
      details: [],
      words: [],
      inputs: {},
    });
  };

  const addCrosswordTable = (data) => {
    crossWord.update((state) => ({
      ...state,
      table: data,
    }));
  };

  const addCrosswordInputs = (data) => {
    crossWord.update((state) => ({
      ...state,
      inputs: data,
    }));
  };

  const addCrosswordDetails = (data) => {
    crossWord.update((state) => ({
      ...state,
      details: data,
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
          itemIndex,
        },
      },
    }));
  };

  const addCrosswordWords = (data) => {
    crossWord.update((state) => ({
      ...state,
      words: data,
    }));
  };

  const updateCrosswordWord = (name, data) => {
    crossWord.update((state) => ({
      ...state,
      words: {
        ...state.words,
        [name]: data,
      },
    }));
  };

  return {
    resetCrossWord,
    addCrosswordInputs,
    addCrosswordDetails,
    addCrosswordTable,
    updateCrosswordInput,
    updateCrosswordWord,
    addCrosswordWords,
    crossWord,
  };
};
