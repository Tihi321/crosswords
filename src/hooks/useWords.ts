import { apiWords } from "../store/words";

export const useApiWords = () => {

  const addApiVocaularyWords = (data) => {
    apiWords.update((state) => ({
      ...state,
      words: data
    }));
  };

  return {
    addApiVocaularyWords,
    apiWords
  }
}