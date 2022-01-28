import { apiWords, crossWords } from "../store/words";

export const useApiWords = () => {

  const setApiWords = (data) => {
    apiWords.set(data);
  };

  return {
    setApiWords,
    apiWords
  }
}

export const useCrowwWords = () => {

  const setCrossWords = (data) => {
    crossWords.set(data);
  };

  return {
    setCrossWords,
    crossWords
  }
}