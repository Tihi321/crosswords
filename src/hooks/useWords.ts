import { apiWords, crossWord } from "../store/words";

export const useApiWords = () => {

  const addApiVocaularyWords = (data) => {
    apiWords.update((state) => ({
      ...state,
      words: data
    }));
  };

  const addApiNamesWords = (data) => {
    apiWords.update((state) => ({
      ...state,
      names: data
    }));
  };

  const addApiLastNamesWords = (data) => {
    apiWords.update((state) => ({
      ...state,
      lastnames: data
    }));
  };

  return {
    addApiNamesWords,
    addApiLastNamesWords,
    addApiVocaularyWords,
    apiWords
  }
}

export const useCrossWords = () => {

  const resetCrossWord = () => {
    crossWord.set({});
  };

  const addCrosswordTable = (data) => {
    crossWord.update((state) => ({
      ...state,
      table: data
    }));
  };

  const updateCrosswordOpenWords = (data) => {
    crossWord.update((state) => ({
      ...state,
      openWords: []
    }));
  };

  return {
    resetCrossWord,
    addCrosswordTable,
    updateCrosswordOpenWords,
    crossWord
  }
}