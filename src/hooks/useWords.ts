import { apiWords, crossWords } from "../store/words";

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

  const setCrossWords = (data) => {
    crossWords.set(data);
  };

  return {
    setCrossWords,
    crossWords
  }
}