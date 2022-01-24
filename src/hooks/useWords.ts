import { words } from "../store/words";

export const useWords = () => {

  const setWords = (data) => {
    words.set(data);
  };

  return {
    setWords,
    words
  }
}