import { apiWords } from "../store/words";
import { fetchWords } from "../utils";

export const useApiWords = () => {
  const addApiVocaularyWords = (data) => {
    apiWords.update((state) => ({
      ...state,
      words: data,
    }));
  };

  const fetchApiVocabularyWords = (url) => {
    fetchWords(url, (data) => {
      addApiVocaularyWords(data);
    });
  };

  return {
    fetchApiVocabularyWords,
    addApiVocaularyWords,
    apiWords,
  };
};
